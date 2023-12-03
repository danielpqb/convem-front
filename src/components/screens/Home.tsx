"use client";

import React from "react";
import { payloadsApi } from "@/api/payload";
import { TBody, THead, Table, Td, Tr } from "@/components/Table";
import { monetaryNumberToString } from "@/utils/monetary-value-converter";
import { useQuery } from "@tanstack/react-query";

const typesEnum = {
  debit: "Débito",
  credit: "Crédito",
};

export default function Home() {
  const payloadsQuery = useQuery({
    queryKey: ["payloads"],
    queryFn: payloadsApi.search,
  });

  return (
    <>
      {payloadsQuery.isSuccess && (
        <Table title="Payloads">
          <THead data={["Id", "Valor", "Tipo"]} />
          <TBody>
            {payloadsQuery.data.data.Items.map((payload, idx) => {
              return (
                <Tr key={idx}>
                  <Td type="first">{payload.idempotencyId}</Td>
                  <Td>R$ {monetaryNumberToString(payload.amount)}</Td>
                  <Td type="last">{typesEnum[payload.type]}</Td>
                </Tr>
              );
            })}
          </TBody>
        </Table>
      )}
      {payloadsQuery.isError && <div>{payloadsQuery.error.message}</div>}
      {payloadsQuery.isPending && <div>Loading...</div>}
    </>
  );
}
