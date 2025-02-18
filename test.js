import dotenv from "dotenv";
import CatalogueFlow from "./index.js";

dotenv.config();

const main = async () => {
    const client = new CatalogueFlow({
        appKey: process.env.APP_KEY,
        secretKey: process.env.SECRET_KEY,
    });

    try {
        // Example product data
        const product = {
            "name": "Silla de ruedas",
            "imageUrl": "https://www.quirumed.com/media/catalog/product/1/1/1154YM120_Foto_variante_83bfd505-4232-43a6-a230-a0fabe494eb7.jpg",
            "language": "spanish"
        };

        const testObject = {
            product,
            "format": "<p>{{description}}</p>",
            "instructions": "The full description must have exactly 200 characters.",
            "stream": false
        }

        // Test metaTitle
        const title = await client.metaTitle(product);
        console.log("Meta Title:", title);

        // Test metaDescription
        const metaDescription = await client.metaDescription(product);
        console.log("Meta Description:", metaDescription);

        // Test richDescription
        const format = "<h1>{{name}}</h1><p>{{description}}</p>";
        const richDescription = await client.richDescription(product, format);
        console.log("Rich Description:", richDescription);

        // Test imageDescription
        const imageDescription = await client.imageDescription(product, false); // Non-streamed
        console.log("Image Description:", imageDescription);

        // Test imageDescription with streaming
        const streamedImageDescription = await client.imageDescription(product, true); // Streamed
        console.log("Streamed Image Description:", streamedImageDescription);

        // Test translateContent
        const translation = await client.translateContent(product, "spanish");
        console.log("Translation:", translation);

        // Test rich description
        const richFullDescription = await client.richDescriptionFullProduct(testObject);
        console.log("richDescription:", richFullDescription);

        // Test plain description
        const plainDescription = await client.plainDescriptionFullProduct(testObject);
        console.log("plainDescription:", plainDescription);

    } catch (error) {
        console.error("Error:", error);
    }
};

main();
