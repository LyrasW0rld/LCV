import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../../..');
const batPath = path.join(projectRoot, 'start_local.bat');

console.log('======================================================================');
console.log(' WORKER R2 LIVE VERIFICATION OF ROOT start_local.bat');
console.log('======================================================================\n');

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

check(fs.existsSync(batPath), 'start_local.bat exists in project root');
const batContent = fs.readFileSync(batPath, 'utf8');

check(batContent.includes('cd /d "%~dp0"'), 'start_local.bat uses cd /d "%~dp0"');
check(batContent.includes('where node') && batContent.includes('where npm'), 'start_local.bat checks node & npm in PATH');
check(batContent.includes('call npm install'), 'start_local.bat executes call npm install');
check(batContent.includes('%errorlevel% neq 0'), 'start_local.bat checks %errorlevel%');
check(batContent.includes('http://localhost:5173/'), 'start_local.bat outputs URL http://localhost:5173/');
check(batContent.includes('call npm run dev'), 'start_local.bat executes call npm run dev');
check(batContent.includes('^(v18.x - v22.x recommended^)'), 'start_local.bat escapes parentheses on line with recommended versions');

console.log('\nExecuting cmd.exe /c start_local.bat --dry-run:');
try {
  const output = execSync(`cmd.exe /c "${batPath}" --dry-run`, { encoding: 'utf8', cwd: projectRoot });
  check(output.includes('http://localhost:5173/'), 'Output contains URL');
  check(output.includes('Dependencies successfully installed'), 'Output contains dependencies success');
  check(output.includes('Dry run verification successful'), 'Output contains dry run success');
  check(!output.includes('syntaktisch an dieser Stelle nicht verarbeitet werden'), 'Zero cmd.exe syntax errors');
  console.log(`\nResult: ${pass} Passed, ${fail} Failed.`);
  if (fail > 0) process.exit(1);
} catch (e) {
  console.error('Real cmd.exe execution failed:', e);
  process.exit(1);
}
