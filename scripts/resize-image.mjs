import sharp from "sharp";
import { writeFileSync } from "fs";

const response = await fetch(
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_7655.JPG-LlsRPBDbWwPsOJ8Z48WR8dgQ88gmIE.jpeg"
);
const buffer = Buffer.from(await response.arrayBuffer());

// Resize to 800px wide (plenty for the modal) with high quality
const resized = await sharp(buffer)
  .resize(800, null, {
    withoutEnlargement: true,
    kernel: sharp.kernel.lanczos3,
  })
  .jpeg({ quality: 95, mozjpeg: true })
  .toBuffer();

writeFileSync("public/images/sthavir.jpg", resized);
console.log("Image resized successfully to 800px wide at 95% quality");
