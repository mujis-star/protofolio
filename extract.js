const fs = require('fs');

const html = fs.readFileSync('C:/Users/723/.gemini/antigravity/brain/38cae159-9e5b-44ee-b126-13b07ae3efde/.system_generated/steps/974/content.md', 'utf8');

// Regex to remove scripts, styles, and tags
const text = html
  .replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, '')
  .replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, '')
  .replace(/<[^>]+>/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

console.log(text.substring(0, 5000));
