import React from "react";
import { payloadsApi } from "@/api/payload";
import { TBody, THead, Table, Td, Tr } from "@/components/Table";
import { monetaryNumberToString } from "@/utils/monetary-value-converter";
import { useQuery } from "@tanstack/react-query";

const typesEnum = {
  debit: "Débito",
  credit: "Crédito",
};

const mockPayloads: TPayloadSearchResponse = [
  { idempotencyId: "dec0dtxewiqdaD2WdDq", amount: 100, type: "credit" },
  { idempotencyId: "dec1dtxewiqdaD2WdDq", amount: 2000, type: "debit" },
];
export default function Home() {
  // const payloadsQuery = useQuery({
  //   queryKey: ["payloads"],
  //   queryFn: payloadsApi.search,
  // });

  return (
    <main className="flex min-h-screen flex-col justify-start items-center p-4 bg-zinc-800">
      <Table title="Payloads">
        <THead data={["Id", "Valor", "Tipo"]} />
        <TBody>
          {mockPayloads.map((payload, idx) => {
            return (
              <Tr key={idx}>
                <Td type="first">{payload.idempotencyId}</Td>
                <Td>
                  R${" "}
                  {(payload.amount / 100).toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </Td>
                <Td type="last">{typesEnum[payload.type]}</Td>
              </Tr>
            );
          })}
        </TBody>
      </Table>
    </main>
  );
}
