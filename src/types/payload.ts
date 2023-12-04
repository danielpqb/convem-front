type TPayload = {
  idempotencyId: string;
  amount: number;
  type: "credit" | "debit";
};

type TPayloadCreateRequest = Omit<TPayload, "idempotencyId">;

type TPayloadSearchResponse = {
  success: boolean;
  message: string;
  data: { Count: number; Items: TPayload[] };
  nextCursor?: string
};
