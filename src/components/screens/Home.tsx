"use client";

import { useState } from "react";
import { payloadsApi } from "@/api/payload";
import { TBody, THead, Table, Td, Tr } from "@/components/Table";
import { monetaryNumberToString } from "@/utils/monetary-value-converter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "../Button";

const typesEnum = {
  debit: "Débito",
  credit: "Crédito",
};

export default function Home() {
  const [pageCursor, setPageCursor] = useState(1);
  const queryClient = useQueryClient();

  const payloadsQuery = useQuery({
    queryKey: ["payloads"],
    queryFn: payloadsApi.search,
  });

  const createPayloadMutation = useMutation({
    mutationFn: async (body: Partial<TPayloadCreateRequest>) => {
      payloadsApi.create(body);
    },
    mutationKey: ["createPayload"],
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: ["payloads"] });
    },
  });

  const CURSOR_OFFSET = pageCursor * 10;
  const PAYLOADS_COUNT =
    payloadsQuery.status === "success"
      ? payloadsQuery.data.data.Items.length
      : 0;

  return (
    <>
      {payloadsQuery.status === "success" && (
        <>
          <div className="flex gap-6 mb-5">
            {/* <Button
              onClick={async () => {
                for (let i = 0; i < 100; i++) {
                  await createPayloadMutation.mutateAsync({});
                }
              }}
            >
              Criar 100 Registros
            </Button> */}
            <Button
              onClick={async () => {
                await createPayloadMutation.mutateAsync({});
                setTimeout(() => {
                  queryClient.resetQueries({ queryKey: ["payloads"] });
                }, 500);
              }}
            >
              Criar Registro Aleatório
            </Button>
          </div>

          <Table title={`Payloads (${PAYLOADS_COUNT})`}>
            <THead data={["Id", "Valor", "Tipo"]} />
            <TBody>
              {payloadsQuery.data.data.Items.slice(0, CURSOR_OFFSET).map(
                (payload, idx) => {
                  return (
                    <Tr key={idx}>
                      <Td type="first">{payload.idempotencyId}</Td>
                      <Td>R$ {monetaryNumberToString(payload.amount)}</Td>
                      <Td type="last">{typesEnum[payload.type]}</Td>
                    </Tr>
                  );
                }
              )}
            </TBody>
          </Table>
          {CURSOR_OFFSET <= PAYLOADS_COUNT && (
            <div className="flex p-4">
              <Button
                onClick={() => {
                  setPageCursor((old) => old + 1);
                }}
              >
                Load More
              </Button>
            </div>
          )}
        </>
      )}
      {payloadsQuery.isError && <div>{payloadsQuery.error.message}</div>}
      {payloadsQuery.isPending && <div>Loading...</div>}
    </>
  );
}
