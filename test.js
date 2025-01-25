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
            name: "Wheelchair",
            description: "Durable and lightweight wheelchair for easy mobility.",
            imageUrl: "https://example.com/wheelchair.jpg",
            language: "english",
        };

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
        const content = "Durable wheelchair for mobility.";
        const translation = await client.translateContent(content, "spanish");
        console.log("Translation:", translation);
    } catch (error) {
        console.error("Error:", error);
    }
};

main();
