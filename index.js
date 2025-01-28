import axios from "axios";

/**
 * CatalogueFlow SDK for interacting with the CatalogueFlow API.
 */
class CatalogueFlow {
    /**
     * Initialize the SDK with API credentials and configuration.
     * @param {Object} options - Configuration options for the SDK.
     * @param {string} options.appKey - The application key provided by CatalogueFlow.
     * @param {string} options.secretKey - The secret key provided by CatalogueFlow.
     * @param {string} [options.baseUrl] - The base URL of the API (default: "https://public.catalogflow.ai/v1").
     */
    constructor({ appKey, secretKey, baseUrl = "https://public.catalogflow.ai/v1/seo" }) {
        if (!appKey || !secretKey) {
            throw new Error("appKey and secretKey are required");
        }

        this.appKey = appKey;
        this.secretKey = secretKey;
        this.baseUrl = baseUrl;

        // Configure Axios client with default headers
        this.client = axios.create({
            baseURL: this.baseUrl,
            headers: {
                "Content-Type": "application/json",
                "x-app-key": this.appKey,
                "x-secret-key": this.secretKey,
            },
        });
    }

    /**
     * Generate an SEO-optimized meta title for a product.
     * @param {Object} product - The product object containing details.
     * @returns {Promise<Object>} - The generated meta title.
     */
    async metaTitle(product) {
        return this._request("/meta-title", { product });
    }

    /**
     * Generate an SEO-optimized meta description for a product.
     * @param {Object} product - The product object containing details.
     * @returns {Promise<Object>} - The generated meta description.
     */
    async metaDescription(product) {
        return this._request("/meta-description", { product });
    }

    /**
     * Generate a detailed HTML description for a product.
     * @param {Object} product - The product object containing details.
     * @param {string} format - The format for the HTML description.
     * @returns {Promise<Object>} - The generated rich HTML description.
     */
    async richDescription(product, format) {
        if (!format) {
            throw new Error("The 'format' field is required.");
        }
        return this._request("/rich-description", { product, format });
    }

    /**
     * Generate a detailed image description for a product.
     * @param {Object} product - The product object containing image details.
     * @param {boolean} [stream=false] - Whether to stream the response.
     * @returns {Promise<string|Object>} - The generated image description or stream chunks.
     */
    async imageDescription(product, stream = false) {
        if (!product || !product.imageUrl || typeof product.imageUrl !== "string") {
            throw new Error("The 'product.imageUrl' field is required and must be a valid URL.");
        }

        const endpoint = "/image-description";

        if (stream) {
            return this._streamRequest(endpoint, { product, stream });
        } else {
            return this._request(endpoint, { product, stream });
        }
    }

    /**
     * Translate content with cultural and regional adaptation.
     * @param {string} content - The text to translate.
     * @param {string} language - The target language for translation.
     * @returns {Promise<Object>} - The translated content.
     */
    async translateContent(product, language) {
        if (!product || typeof product !== "object") {
            throw new Error("The 'product' field is required and must be an object.");
        }

        if (!language || typeof language !== "string") {
            throw new Error("The 'language' field is required and must be a string.");
        }

        return this._request("/translate", { product, language, stream : false });
    }

    /**
     * Make a standard API request to the CatalogueFlow API.
     * @param {string} endpoint - The API endpoint to call.
     * @param {Object} data - The payload to send to the API.
     * @returns {Promise<Object>} - The API response.
     */
    async _request(endpoint, data) {
        try {
            const response = await this.client.post(endpoint, data);
            return response.data;
        } catch (error) {
            console.error(`Error in CatalogueFlow SDK [${endpoint}]:`, error.response?.data || error.message);
            throw error.response?.data || error;
        }
    }

    /**
     * Make a streaming API request to the CatalogueFlow API.
     * @param {string} endpoint - The API endpoint to call.
     * @param {Object} data - The payload to send to the API.
     * @returns {Promise<string>} - The concatenated stream response.
     */
    async _streamRequest(endpoint, data) {
        try {
            const response = await this.client.post(endpoint, data, {
                responseType: "stream",
            });

            const chunks = [];
            for await (const chunk of response.data) {
                chunks.push(chunk.toString());
            }

            return chunks.join("");
        } catch (error) {
            console.error(`Error streaming response [${endpoint}]:`, error.message);
            throw error.response?.data || error;
        }
    }
}

export default CatalogueFlow;
