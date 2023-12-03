
import { API } from "@/endpoints";
import axios from "axios";

export const apiRequest = axios.create({
  baseURL: `${API.BASE_URL}`,
});

// export const setToken = (token: string) => {
//   apiRequest.defaults.headers.common['Authorization'] = `Bearer ${token}`
// }

export default apiRequest;
