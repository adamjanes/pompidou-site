import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const SVG_PATH = path.join(process.cwd(), 'public', 'og-image.svg');
const PNG_PATH = path.join(process.cwd(), 'public', 'og-image.png');

async function generateOGImage() {
  try {
    // Read the SVG file
    const svgBuffer = fs.readFileSync(SVG_PATH);

    // Convert SVG to PNG with exact dimensions
    await sharp(svgBuffer, { density: 150 })
      .resize(1200, 630, {
        fit: 'cover',
        withoutEnlargement: false,
        position: 'center'
      })
      .png({ quality: 90 })
      .toFile(PNG_PATH);

    console.log(`✓ Generated OG image: ${PNG_PATH}`);
    console.log(`✓ Dimensions: 1200x630px`);
    console.log(`✓ Format: PNG`);
  } catch (error) {
    console.error('Error generating OG image:', error);
    process.exit(1);
  }
}

generateOGImage();
