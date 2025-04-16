import { AxiosInstance } from "axios";

/**
 * Standard POST request.
 * @param client    - Axios instance.
 * @param endpoint  - API endpoint to call.
 * @param data      - Payload to send.
 */
export async function _request<T>(client: AxiosInstance, endpoint: string, data: unknown): Promise<T> {
  try {
    const response = await client.post(endpoint, data);
    return response.data as T;
  } catch (error: any) {
    console.error(`Error in CatalogueFlow SDK [${endpoint}]:`, error.response?.data || error.message);
    throw error.response?.data || error;
  }
}

/**
 * Streaming POST request.
 * @param client    - Axios instance.
 * @param endpoint  - API endpoint to call.
 * @param data      - Payload to send.
 */
export async function _streamRequest(client: AxiosInstance, endpoint: string, data: unknown): Promise<string> {
  try {
    const response = await client.post(endpoint, data, { responseType: "stream" });
    const chunks: string[] = [];

    for await (const chunk of response.data) {
      chunks.push(chunk.toString());
    }
    return chunks.join("");
  } catch (error: any) {
    console.error(`Error streaming response [${endpoint}]:`, error.message);
    throw error.response?.data || error;
  }
}
