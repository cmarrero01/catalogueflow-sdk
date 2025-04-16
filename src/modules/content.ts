import { AxiosInstance } from "axios";
import { _request } from "../api/request.js";

export interface DescriptionPayload {
  product?: Record<string, any>;
  format?: string;
  instructions?: string;
  stream?: boolean;
}

export class ContentModule {
  private client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  async richDescriptionFullProduct(payload: DescriptionPayload) {
    if (!payload.format) {
      throw new Error("The 'format' field is required.");
    }
    return _request<{ html: string }>(this.client, "/content/description", payload);
  }

  async plainDescriptionFullProduct(payload: DescriptionPayload) {
    return _request<{ description: string }>(this.client, "/content/plain-description", payload);
  }
}
