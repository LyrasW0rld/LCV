import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const batPath = path.join(__dirname, 'proposed_start_local.bat');

console.log('Testing proposed_start_local.bat genuine execution:');
const batContent = fs.readFileSync(batPath, 'utf8');

let pass = 0;
let fail = 0;
function check(cond, desc) {
  if (cond) {
    console.log('  [PASS]', desc);
    pass++;
  } else {
    console.log('  [FAIL]', desc);
    fail++;
  }
}

check(batContent.includes('cd /d "%~dp0"'), 'cd /d "%~dp0" present');
check(batContent.includes('where node') && batContent.includes('where npm'), 'node & npm checks present');
check(batContent.includes('call npm install'), 'call npm install present');
check(batContent.includes('%errorlevel% neq 0'), '%errorlevel% neq 0 present');
check(batContent.includes('http://localhost:5173/'), 'http://localhost:5173/ present');
check(batContent.includes('call npm run dev'), 'call npm run dev present');

try {
  const output = execSync(`cmd.exe /c "${batPath}" --dry-run`, { encoding: 'utf8' });
  check(output.includes('http://localhost:5173/'), 'Output contains URL');
  check(output.includes('Dependencies successfully installed'), 'Output contains dependencies success');
  check(output.includes('Dry run verification successful'), 'Output contains dry run success');
  console.log(`Result: ${pass} Passed, ${fail} Failed.`);
} catch (e) {
  console.error('Execution failed:', e);
}
