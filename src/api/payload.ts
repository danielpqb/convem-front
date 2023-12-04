import apiRequest from "./axios";
import { API } from "@/endpoints";

const search = async () => {
  const { data } = await apiRequest
    .get<TPayloadSearchResponse>(API.PAYLOADS.SEARCH)
    .catch((err) => {
      throw err;
    });
  return data;
};

const create = async (body: Partial<TPayloadCreateRequest>) => {
  const { data } = await apiRequest
    .post(API.PAYLOADS.CREATE, body)
    .catch((err) => {
      throw err;
    });
  return data;
};

const clear = async () => {
  const { data } = await apiRequest
    .delete(API.PAYLOADS.CLEAR)
    .catch((err) => {
      throw err;
    });
  return data;
};

export const payloadsApi = { search, create, clear };
