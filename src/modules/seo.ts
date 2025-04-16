import { AxiosInstance } from "axios";
import { _request, _streamRequest } from "../api/request.js";

/**
 * Interface of product data (example).
 * You may refine or rename these fields as needed.
 */
export interface Product {
  name?: string;
  imageUrl?: string;
  language?: string;
  stream?: boolean;
}

export class SeoModule {
  private client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  async metaTitle(product: Product, stream = false) {
    return _request<{ title: string }>(this.client, "/seo/meta-title", { product, stream});
  }

  async metaDescription(product: Product, stream = false) {
    return _request<{ description: string }>(this.client, "/seo/meta-description", { product, stream });
  }

  async richDescription(product: Product, format: string, stream = false) {
    if (!format) {
      throw new Error("The 'format' field is required.");
    }
    return _request<{ html: string }>(this.client, "/seo/rich-description", { product, format, stream });
  }

  async imageDescription(product: Product, stream = false) {
    if (!product || !product.imageUrl || typeof product.imageUrl !== "string") {
      throw new Error("The 'product.imageUrl' field is required and must be a valid URL.");
    }

    const endpoint = "/seo/image-description";
    if (stream) {
      return _streamRequest(this.client, endpoint, { product, stream });
    } else {
      return _request<{ description: string }>(this.client, endpoint, { product, stream });
    }
  }

  async translateContent(product: Product, language: string, stream = false) {
    if (!product || typeof product !== "object") {
      throw new Error("The 'product' field is required and must be an object.");
    }
    if (!language || typeof language !== "string") {
      throw new Error("The 'language' field is required and must be a string.");
    }

    return _request<{ translated: string }>(this.client, "/seo/translate", { product, language, stream });
  }
}
