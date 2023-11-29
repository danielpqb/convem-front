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

export const payloadsApi = { search };
