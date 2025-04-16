import dotenv from "dotenv";
import CatalogueFlow from "../index.js";
// O si quieres testear directamente contra /src, usa: import CatalogueFlow from "../src/index.js";

dotenv.config();

(async () => {
  const client = new CatalogueFlow({
    appKey: process.env.APP_KEY || "",
    secretKey: process.env.SECRET_KEY || "",
  });

  try {
    const product = {
      name: "Silla de ruedas",
      imageUrl: "https://example.com/silla.jpg",
      language: "spanish"
    };

    // Test metaTitle
    const title = await client.seo.metaTitle(product);
    console.log("Meta Title:", title);

    // Test metaDescription
    const metaDescription = await client.seo.metaDescription(product);
    console.log("Meta Description:", metaDescription);

    // Test richDescription
    const format = "<h1>{{name}}</h1><p>{{description}}</p>";
    const richDescription = await client.seo.richDescription(product, format);
    console.log("Rich Description:", richDescription);

    // Test imageDescription
    const imageDescription = await client.seo.imageDescription(product, false);
    console.log("Image Description:", imageDescription);

    // Test imageDescription with streaming
    const streamedImageDescription = await client.seo.imageDescription(product, true);
    console.log("Streamed Image Description:", streamedImageDescription);

    // Test translateContent
    const translation = await client.seo.translateContent(product, "spanish");
    console.log("Translation:", translation);

    // Test rich description
    const testObject = {
      product,
      format: "<p>{{description}}</p>",
      instructions: "The full description must have exactly 200 characters.",
      stream: false
    };
    const richFullDescription = await client.content.richDescriptionFullProduct(testObject);
    console.log("richDescription:", richFullDescription);

    // Test plain description
    const plainDescription = await client.content.plainDescriptionFullProduct(testObject);
    console.log("plainDescription:", plainDescription);

  } catch (error) {
    console.error("Error:", error);
  }
})();
