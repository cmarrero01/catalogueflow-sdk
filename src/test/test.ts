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
      imageUrl: "https://www.quirumed.com/media/catalog/product/1/1/1154YM120_Foto_variante_83bfd505-4232-43a6-a230-a0fabe494eb7.jpg",
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

    const testImageObject = {
      "product": {
        "name": "Silla de ruedas",
        "imageUrl": "https://www.quirumed.com/media/catalog/product/1/1/1154YM120_Foto_variante_83bfd505-4232-43a6-a230-a0fabe494eb7.jpg"
      },
      "instructions": "Please, provide an image with a nice environment with two old people using the wheelchair."
    };
    const imageUrl = await client.content.generateImage(testImageObject);
    console.log("Image URL:", imageUrl);

  } catch (error) {
    console.error("Error:", error);
  }
})();
