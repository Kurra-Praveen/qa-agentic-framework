import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const loginPagePath = path.resolve(__dirname, '../src/pages/LoginPage.ts');

console.log('⚡ [Simulation] Simulating UI/DOM Drift in LoginPage.ts...');

let content = fs.readFileSync(loginPagePath, 'utf8');

if (content.includes("name: 'Sign in'")) {
  content = content.replace("name: 'Sign in'", "name: 'Log in to Portal'");
  fs.writeFileSync(loginPagePath, content, 'utf8');
  console.log('✅ [Simulation] Button locator altered to "Log in to Portal".');
  console.log('👉 Run "npm test" to observe the locator failure.');
  console.log('👉 Then prompt the agent: "Diagnose and heal the failing test in tests/specs/auth.spec.ts".');
} else {
  console.log('⚠️ [Simulation] Target text not found or already simulated.');
}
