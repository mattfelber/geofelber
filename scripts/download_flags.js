import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the flags.ts file
const flagsContent = fs.readFileSync(path.join(__dirname, '../src/data/flags.ts'), 'utf8');

// Extract country codes using regex
const countryCodeRegex = /code: '([A-Z]{2})'/g;
const matches = [...flagsContent.matchAll(countryCodeRegex)];
const countryCodes = matches.map(match => match[1]);

// Function to download a flag image
function downloadFlag(countryCode) {
  const url = `https://flagcdn.com/w640/${countryCode.toLowerCase()}.png`;
  const filePath = path.join(__dirname, '../public/flags', `${countryCode.toLowerCase()}.png`);

  https.get(url, (response) => {
    if (response.statusCode === 200) {
      const fileStream = fs.createWriteStream(filePath);
      response.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`Downloaded flag for ${countryCode}`);
      });
    } else {
      console.error(`Failed to download flag for ${countryCode}`);
    }
  }).on('error', (err) => {
    console.error(`Error downloading flag for ${countryCode}:`, err.message);
  });
}

// Download all flags
countryCodes.forEach(code => downloadFlag(code));
