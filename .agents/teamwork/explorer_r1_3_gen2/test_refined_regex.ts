import { INITIAL_LCV_FILES } from '../../../frontend/constants';

const fnRegex =
  /^\s*(?:(?:export\s+)?(?:public|private|protected|internal|pub(?:\([^)]+\))?|static|virtual|inline|async|unsafe|extern|final)\s+)*(?:(?:def|fn|function)\s+|(?:\b(?:void|int|float|double|bool|boolean|string|char|auto|size_t|uint\d+_t|int\d+_t|[A-Z][a-zA-Z0-9_<>:*&]*)\b(?:\s*\*|\s*&)?\s+))([a-zA-Z_][a-zA-Z0-9_]*)\s*\(([^)]*)\)|^\s*(?:const|let|var)\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*(?:async\s*)?\([^)]*\)\s*=>/;

INITIAL_LCV_FILES.forEach(f => {
  console.log(`\nTesting file: ${f.name}`);
  const lines = f.content.split(/\r?\n/);
  lines.forEach((l, idx) => {
    const trimmed = l.trim();
    if (!trimmed || trimmed.startsWith('//') || trimmed.startsWith('#') || trimmed.startsWith('/*') || trimmed.startsWith('*')) return;
    if (trimmed.startsWith('if') || trimmed.startsWith('for') || trimmed.startsWith('while') || trimmed.startsWith('else') || trimmed.startsWith('switch')) return;

    const m = trimmed.match(fnRegex);
    if (m) {
      const fnName = m[1] || m[2];
      console.log(`  Line ${idx + 1}: fnName="${fnName}" (line: ${trimmed})`);
    }
  });
});
