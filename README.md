# CatalogueFlow SDK

The **CatalogueFlow SDK** is a Node.js client that simplifies interaction with the [CatalogueFlow API](https://catalogueflow.com). It allows you to generate SEO-optimized titles, meta descriptions, rich HTML descriptions, detailed image descriptions, and regionalized translations for your products.

---

## Installation

Install the SDK using npm:

\`\`\`bash
npm install catalogueflow-sdk
\`\`\`

---

## Getting Started

### Step 1: Register on CatalogueFlow

1. Visit [CatalogueFlow](https://catalogueflow.com) and sign up for an account.
2. Once registered, log in and navigate to **Settings > API Configuration**.
3. Copy your **App Key** and **Secret Key**.

### Step 2: Configure Your Environment

Create a \`.env\` file in your project root with the following content:

\`\`\`plaintext
APP_KEY=your-app-key
SECRET_KEY=your-secret-key
\`\`\`

Replace \`your-app-key\` and \`your-secret-key\` with the credentials you obtained from CatalogueFlow.

### Step 3: Instantiate the SDK

Import the SDK and create an instance using your credentials:

\`\`\`javascript
import CatalogueFlow from "catalogueflow-sdk";

const client = new CatalogueFlow({
appKey: process.env.APP_KEY,
secretKey: process.env.SECRET_KEY,
});
\`\`\`

---

## Available Methods

### 1. \`metaTitle(product)\`

Generate an SEO-optimized title for a product.

#### Parameters:

- \`product\`: An object with:
  - \`name\` (string): The product's name.
  - \`description\` (string, optional): A description of the product.

#### Example:

\`\`\`javascript
const product = { name: "Wheelchair", description: "Durable and lightweight" };

(async () => {
const title = await client.metaTitle(product);
console.log("Meta Title:", title);
})();
\`\`\`

#### Response:

A JSON object containing the optimized title:
\`\`\`json
{ "name": "Lightweight Durable Wheelchair" }
\`\`\`

---

### 2. \`metaDescription(product)\`

Generate an SEO-optimized meta description for a product.

#### Parameters:

- \`product\`: An object with:
  - \`name\` (string): The product's name.
  - \`description\` (string, optional): A description of the product.

#### Example:

\`\`\`javascript
const product = { name: "Wheelchair", description: "Durable and lightweight" };

(async () => {
const metaDescription = await client.metaDescription(product);
console.log("Meta Description:", metaDescription);
})();
\`\`\`

#### Response:

A JSON object containing the meta description:
\`\`\`json
{ "description": "Durable and lightweight wheelchair designed for comfort and mobility." }
\`\`\`

---

### 3. \`richDescription(product, format)\`

Generate a detailed HTML description for a product based on a custom format.

#### Parameters:

- \`product\`: An object with:
  - \`name\` (string): The product's name.
  - \`description\` (string, optional): A description of the product.
- \`format\` (string): The desired HTML structure.

#### Example:

\`\`\`javascript
const product = { name: "Wheelchair", description: "Durable and lightweight" };
const format = "<h1>{{name}}</h1><p>{{description}}</p>";

(async () => {
const richDescription = await client.richDescription(product, format);
console.log("Rich Description:", richDescription);
})();
\`\`\`

#### Response:

A JSON object containing the HTML description:
\`\`\`json
{ "description": "<h1>Wheelchair</h1><p>Durable and lightweight</p>" }
\`\`\`

---

### 4. \`imageDescription(product, stream = false)\`

Generate a detailed description for a product image.

#### Parameters:

- \`product\`: An object with:
  - \`name\` (string): The product's name.
  - \`imageUrl\` (string): The URL of the product's image.
- \`stream\` (boolean, optional): Whether to stream the response (default: \`false\`).

#### Example:

\`\`\`javascript
const product = {
name: "Wheelchair",
imageUrl: "https://example.com/image.jpg",
};

(async () => {
const imageDescription = await client.imageDescription(product);
console.log("Image Description:", imageDescription);
})();
\`\`\`

#### Response:

A JSON object containing the image description:
\`\`\`json
{ "description": "A durable wheelchair with black padding and silver frame, set on a smooth surface." }
\`\`\`

---

### 5. \`translateContent(content, language)\`

Translate content into a specified language with cultural and regional adaptation.

#### Parameters:

- \`content\` (string): The text to translate.
- \`language\` (string): The target language.

#### Example:

\`\`\`javascript
const content = "Durable wheelchair for mobility.";
const language = "spanish";

(async () => {
const translation = await client.translateContent(content, language);
console.log("Translation:", translation);
})();
\`\`\`

#### Response:

A JSON object containing the translated text:
\`\`\`json
{ "translation": "Silla de ruedas duradera para movilidad." }
\`\`\`

---

## Error Handling

All methods throw detailed error messages if something goes wrong. Use \`try-catch\` blocks to handle errors:

\`\`\`javascript
try {
const title = await client.metaTitle(product);
console.log("Meta Title:", title);
} catch (error) {
console.error("Error:", error.message);
}
\`\`\`

---

## Support

For support or inquiries, please contact us at [support@catalogueflow.com](mailto:support@catalogueflow.com).

---

## License

This SDK is released under the MIT License.
