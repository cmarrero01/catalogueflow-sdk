import { AxiosInstance } from "axios";
import { createApiClient } from "./api/client.js";
import { SeoModule } from "./modules/seo.js";
import { ContentModule } from "./modules/content.js";

/**
 * Options for initializing the SDK.
 */
export interface CatalogueFlowOptions {
  appKey: string;
  secretKey: string;
  baseUrl?: string;
}

/**
 * The main class that exposes modules to interact with CatalogueFlow API.
 */
export class CatalogueFlow {
  private client: AxiosInstance;

  public seo: SeoModule;
  public content: ContentModule;

  constructor({ appKey, secretKey, baseUrl = "https://public.catalogflow.ai/v1" }: CatalogueFlowOptions) {
    this.client = createApiClient(baseUrl, appKey, secretKey);

    // Inicializa módulos
    this.seo = new SeoModule(this.client);
    this.content = new ContentModule(this.client);

  }
}

// Export por defecto si prefieres
export default CatalogueFlow;
