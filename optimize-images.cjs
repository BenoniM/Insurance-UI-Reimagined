const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesToProcess = [
  'src/assets/ChannelsHero/ChatGPT Image Jul 14, 2026, 11_01_40 AM.png',
  'src/assets/ChannelsHero/ChatGPT Image Jul 14, 2026, 11_07_50 AM.png',
  'src/assets/ClaimsHero/ChatGPT Image Jul 14, 2026, 10_45_52 AM.png',
  'src/assets/ContactHero/ChatGPT Image Jul 14, 2026, 09_59_56 AM.png',
  'src/assets/CsrHero/ChatGPT Image Jul 14, 2026, 10_23_32 AM.png'
];

async function processImages() {
  for (const file of imagesToProcess) {
    if (fs.existsSync(file)) {
      const ext = path.extname(file);
      const output = file.replace(ext, '.webp');
      try {
        await sharp(file)
          .webp({ quality: 80 })
          .toFile(output);
        console.log(`Converted ${file} to ${output}`);
      } catch (err) {
        console.error(`Error processing ${file}:`, err);
      }
    } else {
      console.log(`File not found: ${file}`);
    }
  }
}

processImages();
