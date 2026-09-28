import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const loginPagePath = path.resolve(__dirname, '../src/pages/LoginPage.ts');

console.log('🔄 [Reset] Restoring original locator in LoginPage.ts...');

let content = fs.readFileSync(loginPagePath, 'utf8');

if (content.includes("name: 'Log in to Portal'")) {
  content = content.replace("name: 'Log in to Portal'", "name: 'Sign in'");
  fs.writeFileSync(loginPagePath, content, 'utf8');
  console.log('✅ [Reset] Button locator restored to "Sign in".');
} else {
  console.log('ℹ️ [Reset] Locator is already clean.');
}
