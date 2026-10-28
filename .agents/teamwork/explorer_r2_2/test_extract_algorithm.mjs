function extractFullFunctionBlock(lines, startLineIdx, lang) {
  if (lang === 'Python') {
    const startLine = lines[startLineIdx] || '';
    const baseIndent = startLine.search(/\S|$/);
    let endIdx = startLineIdx + 1;
    while (endIdx < lines.length && endIdx < startLineIdx + 90) {
      const l = lines[endIdx];
      if (l.trim() !== '' && !l.trim().startsWith('#')) {
        const indent = l.search(/\S|$/);
        if (indent <= baseIndent) break;
      }
      endIdx++;
    }
    return {
      snippet: lines.slice(startLineIdx, endIdx).join('\n'),
      endLine: endIdx,
    };
  }

  let braceDepth = 0;
  let foundOpenBrace = false;
  let endIdx = startLineIdx;

  for (let i = startLineIdx; i < lines.length && i < startLineIdx + 120; i++) {
    const rawLine = lines[i];
    // Strip strings and comments so braces inside them do not alter braceDepth
    const sanitized = rawLine
      .replace(/"(?:[^"\\]|\\.)*"/g, '""')
      .replace(/'(?:[^'\\]|\\.)*'/g, "''")
      .replace(/\/\/.*$/, '')
      .replace(/#.*$/, '');

    for (let c = 0; c < sanitized.length; c++) {
      if (sanitized[c] === '}') {
        if (foundOpenBrace) {
          braceDepth--;
          if (braceDepth <= 0) {
            endIdx = i + 1;
            return {
              snippet: lines.slice(startLineIdx, endIdx).join('\n'),
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
  }

  return {
    snippet: lines.slice(startLineIdx, Math.max(startLineIdx + 1, endIdx)).join('\n'),
    endLine: endIdx,
  };
}

// Edge case 1: Allman style (opening brace on next line)
const allmanCode = [
  'void test()',
  '{',
  '    if (x > 100)',
  '    {',
  '        return 1;',
  '    }',
  '    else',
  '    {',
  '        return 2;',
  '    }',
  '}'
];
console.log("\n=== Edge Case 1: Allman Style ===");
const allmanFn = extractFullFunctionBlock(allmanCode, 0, 'C++');
console.log("Allman fn: lineStart=1, endLine=" + allmanFn.endLine + " (expected 11)");
const allmanIf = extractFullFunctionBlock(allmanCode, 2, 'C++');
console.log("Allman if: lineStart=3, endLine=" + allmanIf.endLine + " (expected 6)");
const allmanElse = extractFullFunctionBlock(allmanCode, 6, 'C++');
console.log("Allman else: lineStart=7, endLine=" + allmanElse.endLine + " (expected 10)");

// Edge case 2: Comments containing braces
const commentCode = [
  'if (x > 100) {',
  '    // Note: check { later }',
  '    return 1;',
  '}'
];
console.log("\n=== Edge Case 2: Comments with braces ===");
const commentBlock = extractFullFunctionBlock(commentCode, 0, 'C++');
console.log("Comment block: lineStart=1, endLine=" + commentBlock.endLine + " (expected 4)");

// Edge case 3: Strings containing braces
const stringCode = [
  'if (x > 100) {',
  '    std::string s = "Closing brace } and open brace {";',
  '    return s;',
  '}'
];
console.log("\n=== Edge Case 3: Strings with braces ===");
const stringBlock = extractFullFunctionBlock(stringCode, 0, 'C++');
console.log("String block: lineStart=1, endLine=" + stringBlock.endLine + " (expected 4)");

// Edge case 4: Single line block
const singleLineCode = [
  'if (x > 100) { return 1; }',
  'return 0;'
];
console.log("\n=== Edge Case 4: Single-line block ===");
const singleBlock = extractFullFunctionBlock(singleLineCode, 0, 'C++');
console.log("Single line block: lineStart=1, endLine=" + singleBlock.endLine + " (expected 1)");

// Edge case 5: Unmatched braces (pathological)
const brokenCode = [
  'void broken() {',
  '    if (x > 0) {',
  '        return 1;'
];
console.log("\n=== Edge Case 5: Pathological Unmatched Braces ===");
const brokenBlock = extractFullFunctionBlock(brokenCode, 0, 'C++');
console.log("Broken block does not crash: endLine=" + brokenBlock.endLine + ", snippet lines=" + brokenBlock.snippet.split('\n').length);
