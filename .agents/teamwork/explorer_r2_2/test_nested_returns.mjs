import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { createServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../../..');

const codeParserPath = path.join(projectRoot, 'frontend/services/codeParser.ts');
let codeParserSource = fs.readFileSync(codeParserPath, 'utf-8');

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

// Original return parent resolution at line 413:
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

// Original statement parent resolution at line 465:
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
patchedSource = patchedSource.replace(originalReturnParent, proposedReturnParent);
patchedSource = patchedSource.replace(originalStmtParent, proposedStmtParent);

const tempFilePath = path.join(projectRoot, 'frontend/services/tempNestedTest.ts');
fs.writeFileSync(tempFilePath, patchedSource, 'utf-8');

try {
  const vite = await createServer({
    root: path.join(projectRoot, 'frontend'),
    server: { middlewareMode: true },
    appType: 'custom',
  });

  const parserModule = await vite.ssrLoadModule('/services/tempNestedTest.ts');
  const { buildRepositoryFromRawFiles } = parserModule;

  const nestedCode = `
class NestedTest {
public:
    int Foo(int x, int y) {
        if (x > 0) {
            if (y > 0) {
                return 1;
            }
            return 2;
        }
        return 0;
    }
};
`;

  const repo = buildRepositoryFromRawFiles('NestedRepo', [
    {
      name: 'NestedTest.cpp',
      path: 'src/NestedTest.cpp',
      size: nestedCode.length,
      date: '2026-10-28',
      content: nestedCode,
    },
  ]);

  const returns = repo.allNodes.filter(n => n.kind === 'RETURN');
  console.log(`Found ${returns.length} returns in NestedTest:`);
  for (const r of returns) {
    const parent = repo.allNodes.find(n => n.id === r.parentId);
    console.log(`  Return "${r.symbolName}" -> Parent: [${parent?.kind}] "${parent?.symbolName}" (${parent?.id})`);
  }

  await vite.close();
} finally {
  if (fs.existsSync(tempFilePath)) fs.unlinkSync(tempFilePath);
}
