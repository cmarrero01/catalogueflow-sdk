import axios, { AxiosInstance } from "axios";

export function createApiClient(baseUrl: string, appKey: string, secretKey: string): AxiosInstance {
  if (!appKey || !secretKey) {
    throw new Error("appKey and secretKey are required");
  }

  return axios.create({
    baseURL: baseUrl,
    headers: {
      "Content-Type": "application/json",
      "x-app-key": appKey,
      "x-secret-key": secretKey,
    },
  });
}
