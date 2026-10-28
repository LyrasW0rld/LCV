import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { createServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../../..');

// Load codeParser.ts source code
const codeParserPath = path.join(projectRoot, 'frontend/services/codeParser.ts');
const codeParserSource = fs.readFileSync(codeParserPath, 'utf-8');

// Apply Proposed Fix 1 to extractFullFunctionBlock
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

console.log("Original block found in source:", codeParserSource.includes(originalBlock));

const patchedSourceWithFix1 = codeParserSource.replace(originalBlock, proposedBlock);

// Write to a temporary file in frontend/services/ so Vite resolves imports cleanly
const tempFilePath = path.join(projectRoot, 'frontend/services/tempCodeParser.ts');
fs.writeFileSync(tempFilePath, patchedSourceWithFix1, 'utf-8');

try {
  const vite = await createServer({
    root: path.join(projectRoot, 'frontend'),
    server: { middlewareMode: true },
    appType: 'custom',
  });

  const typesModule = await vite.ssrLoadModule('/types.ts');
  const parserModule = await vite.ssrLoadModule('/services/tempCodeParser.ts');

  const { NodeKind } = typesModule;
  const { buildRepositoryFromRawFiles } = parserModule;

  const complexReturnFile = [
    'class ReturnEngine {',
    'public:',
    '    int EvaluateExpressions(int x, int a, int b) {',
    '        if (x > 100) {',
    '            return foo(bar(x + 1));',
    '        } else if (x > 50) {',
    '            return a > b ? x : y;',
    '        } else if (x > 20) {',
    '            return (a + b) * (x - 1);',
    '        } else {',
    '            return -1;',
    '        }',
    '        return 0;',
    '    }',
    '',
    '    void EarlyExitRoutine(int code) {',
    '        if (code < 0) {',
    '            return;',
    '        }',
    '        doWork();',
    '        return;',
    '    }',
    '',
    '    double TrailingCommentReturn(double v) {',
    '        if (v == 0.0) {',
    '            return 0.0; // Early zero return',
    '        }',
    '        return v * 2.5; // Final computed value',
    '    }',
    '};',
  ].join('\n');

  const repo1 = buildRepositoryFromRawFiles('ComplexReturnsRepo', [
    {
      name: 'ReturnEngine.cpp',
      path: 'src/ReturnEngine.cpp',
      size: complexReturnFile.length,
      date: '2026-10-28',
      content: complexReturnFile,
    },
  ]);

  const returnNodes1 = repo1.allNodes.filter(n => n.kind === NodeKind.RETURN);
  console.log(`Found ${returnNodes1.length} return nodes in ReturnEngine.cpp:`);
  for (const ret of returnNodes1) {
    const parent = repo1.allNodes.find(n => n.id === ret.parentId);
    console.log(`  Return: "${ret.symbolName}" (line ${ret.lineStart}) -> Parent: [${parent?.kind}] "${parent?.symbolName}" (${parent?.id})`);
  }

  await vite.close();
} finally {
  if (fs.existsSync(tempFilePath)) {
    fs.unlinkSync(tempFilePath);
  }
}
