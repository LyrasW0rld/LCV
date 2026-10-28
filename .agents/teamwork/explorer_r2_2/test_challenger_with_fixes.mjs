import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../../..');

// Load codeParser.ts source code
const codeParserPath = path.join(projectRoot, 'frontend/services/codeParser.ts');
const codeParserSource = fs.readFileSync(codeParserPath, 'utf-8');

// Proposed Fix 1: extractFullFunctionBlock
const originalBlock = `  let braceDepth = 0;
  let foundOpenBrace = false;
  let endIdx = startLineIdx;

  for (let i = startLineIdx; i < lines.length && i < startLineIdx + 120; i++) {
    const line = lines[i];
    for (let c = 0; c < line.length; c++) {
      if (line[c] === '{') {
        braceDepth++;
        foundOpenBrace = true;
      } else if (line[c] === '}') {
        braceDepth--;
      }
    }
    endIdx = i + 1;
    if (foundOpenBrace && braceDepth <= 0) {
      break;
    }
  }`;

const proposedBlock = `  let braceDepth = 0;
  let foundOpenBrace = false;
  let endIdx = startLineIdx;

  for (let i = startLineIdx; i < lines.length && i < startLineIdx + 120; i++) {
    const rawLine = lines[i];
    // Strip strings and comments so braces inside them do not alter braceDepth
    const sanitized = rawLine
      .replace(/"(?:[^"\\\\]|\\\\.)*"/g, '""')
      .replace(/'(?:[^'\\\\]|\\\\.)*'/g, "''")
      .replace(/\\/\\/.*$/, '')
      .replace(/#.*$/, '');

    for (let c = 0; c < sanitized.length; c++) {
      if (sanitized[c] === '}') {
        if (foundOpenBrace) {
          braceDepth--;
          if (braceDepth <= 0) {
            endIdx = i + 1;
            return {
              snippet: lines.slice(startLineIdx, endIdx).join('\\n'),
              endLine: endIdx,
            };
          }
        }
      } else if (sanitized[c] === '{') {
        braceDepth++;
        foundOpenBrace = true;
      }
    }
    endIdx = i + 1;
    if (foundOpenBrace && braceDepth <= 0) {
      break;
    }
  }`;

// Proposed Fix 2 (from Challenger 1 report): fnRegex
const originalFnRegex = `  const fnRegex =
    /^\\s*(?:(?:export\\s+)?(?:public|private|protected|internal|pub(?:\\([^)]+\\))?|static|virtual|inline|async|unsafe|extern|final)\\s+)*(?:(?:def|fn|function)\\s+|(?:\\b(?:void|int|float|double|bool|boolean|string|char|auto|size_t|uint\\d+_t|int\\d+_t|[A-Z][a-zA-Z0-9_<>:*&]*)\\b(?:\\s*\\*|\\s*&)?\\s+))([a-zA-Z_][a-zA-Z0-9_]*)\\s*\\(([^)]*)\\)|^\\s*(?:const|let|var)\\s+([a-zA-Z_][a-zA-Z0-9_]*)\\s*=\\s*(?:async\\s*)?\\([^)]*\\)\\s*=>/;`;

const proposedFnRegex = `  const fnRegex =
    /^\\s*(?:(?:export\\s+)?(?:public|private|protected|internal|pub(?:\\([^)]+\\))?|static|virtual|inline|async|unsafe|extern|final|const)\\s+)*(?:(?:def|fn|function)\\s+|(?:(?:const\\s+)?(?:(?:unsigned|signed|long|short)\\s+)*(?:\\b(?:void|int|float|double|bool|boolean|string|char|auto|size_t|uint\\d+_t|int\\d+_t)\\b|(?:[a-zA-Z_][a-zA-Z0-9_]*::)*[a-zA-Z_][a-zA-Z0-9_<>:*&]*)(?:\\s*\\*|\\s*&)?\\s+))([a-zA-Z_][a-zA-Z0-9_]*)\\s*\\(([^)]*)\\)|^\\s*(?:const|let|var)\\s+([a-zA-Z_][a-zA-Z0-9_]*)\\s*=\\s*(?:async\\s*)?\\([^)]*\\)\\s*=>/;`;

// Line 302 check:
const originalFnCheck = `if (fnMatch && !trimmed.startsWith('if') && !trimmed.startsWith('for') && !trimmed.startsWith('while') && !trimmed.startsWith('else')) {`;
const proposedFnCheck = `if (fnMatch && !trimmed.startsWith('if') && !trimmed.startsWith('for') && !trimmed.startsWith('while') && !trimmed.startsWith('else') && !trimmed.startsWith('return')) {`;

// Proposed Fix 3: Enclosing branch search for return parenting and statements
const originalReturnParent = `      // Resolve parent: conditional branch if inside active block, otherwise function root
      const parentBranch =
        currentConditionOrLoop && i + 1 <= currentConditionOrLoop.lineEnd
          ? currentConditionOrLoop
          : currentFunction;`;

const proposedReturnParent = `      // Resolve parent: deepest active enclosing branch (CONDITION or LOOP), otherwise function root
      let parentBranch: CodeNode = currentFunction;
      for (let nIdx = nodes.length - 1; nIdx >= 0; nIdx--) {
        const candidate = nodes[nIdx];
        if (
          (candidate.kind === NodeKind.CONDITION || candidate.kind === NodeKind.LOOP) &&
          candidate.lineStart <= i + 1 &&
          i + 1 <= candidate.lineEnd
        ) {
          parentBranch = candidate;
          break;
        }
      }`;

const originalStmtParent = `      const parentBranch =
        currentConditionOrLoop && i + 1 <= currentConditionOrLoop.lineEnd
          ? currentConditionOrLoop
          : currentFunction;`;

const proposedStmtParent = `      let parentBranch: CodeNode = currentFunction;
      for (let nIdx = nodes.length - 1; nIdx >= 0; nIdx--) {
        const candidate = nodes[nIdx];
        if (
          (candidate.kind === NodeKind.CONDITION || candidate.kind === NodeKind.LOOP) &&
          candidate.lineStart <= i + 1 &&
          i + 1 <= candidate.lineEnd
        ) {
          parentBranch = candidate;
          break;
        }
      }`;

let patchedSource = codeParserSource.replace(originalBlock, proposedBlock);
patchedSource = patchedSource.replace(originalFnRegex, proposedFnRegex);
patchedSource = patchedSource.replace(originalFnCheck, proposedFnCheck);
patchedSource = patchedSource.replace(originalReturnParent, proposedReturnParent);
patchedSource = patchedSource.replace(originalStmtParent, proposedStmtParent);

const tempFilePath = path.join(projectRoot, 'frontend/services/tempCodeParser.ts');
fs.writeFileSync(tempFilePath, patchedSource, 'utf-8');

const stressTestPath = path.join(projectRoot, '.agents/teamwork/challenger_r1_1_gen2/adversarial_stress_test.mjs');
let stressTestSource = fs.readFileSync(stressTestPath, 'utf-8');
stressTestSource = stressTestSource.replace("'/services/codeParser.ts'", "'/services/tempCodeParser.ts'");

const tempStressTestPath = path.join(__dirname, 'temp_stress_test.mjs');
fs.writeFileSync(tempStressTestPath, stressTestSource, 'utf-8');

try {
  const { execSync } = await import('child_process');
  const output = execSync('node ' + tempStressTestPath, { encoding: 'utf-8' });
  console.log(output);
} catch (e) {
  console.error("Test execution output:");
  console.error(e.stdout);
  console.error(e.stderr);
} finally {
  if (fs.existsSync(tempFilePath)) fs.unlinkSync(tempFilePath);
  if (fs.existsSync(tempStressTestPath)) fs.unlinkSync(tempStressTestPath);
}
