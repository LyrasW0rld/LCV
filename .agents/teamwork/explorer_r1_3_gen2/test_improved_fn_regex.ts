import { INITIAL_LCV_FILES } from '../../../frontend/constants';

// Let's test an improved fnRegex
// Original:
// /(?:(?:public|private|protected|static|virtual|inline|async|unsafe|extern|pub|fn|def|function)\s+)+([a-zA-Z_][a-zA-Z0-9_<>:]*)\s*\(([^)]*)\)|^\s*(?:const|let|var)\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*(?:async\s*)?\([^)]*\)\s*=>|^\s*(?:void|int|float|double|bool|string|char|auto|Node|SimpleNode\s*\*|Transform|GameObject|size_t)\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(([^)]*)\)/;

// Improved fnRegex:
// Can match:
// 1. Modifiers (public/private/protected/internal/static/virtual/override/inline/async/unsafe/extern/pub)
// 2. Optional return type or keyword (void/int/bool/def/fn/function/etc.)
// 3. Function name followed by (
const testRegex = /(?:(?:export|public|private|protected|internal|static|virtual|override|inline|async|unsafe|extern|final)\s+)*(?:(?:def|fn|function)\s+|(?:\w+(?:<[^>]+>)?(?:\s*\*|\s*&)?\s+))?([a-zA-Z_][a-zA-Z0-9_]*)\s*\(([^)]*)\)/;

INITIAL_LCV_FILES.forEach(f => {
  console.log(`\nTesting file: ${f.name}`);
  const lines = f.content.split(/\r?\n/);
  lines.forEach((l, idx) => {
    const t = l.trim();
    if (!t || t.startsWith('//') || t.startsWith('#') || t.startsWith('/*') || t.startsWith('*')) return;
    if (t.startsWith('if') || t.startsWith('for') || t.startsWith('while') || t.startsWith('else') || t.startsWith('switch') || t.startsWith('return')) return;
    
    // Check if line looks like function definition
    const m = t.match(testRegex);
    if (m && !m[1].startsWith('if') && !m[1].startsWith('for') && !m[1].startsWith('while')) {
      console.log(`  Line ${idx + 1}: name="${m[1]}" full="${t}"`);
    }
  });
});
