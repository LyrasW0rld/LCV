import { INITIAL_LCV_FILES } from '../../../frontend/constants';
import { NodeKind, SupportedLanguage } from '../../../frontend/types';

const NATGEO_PALETTE = ['#E5A93C', '#38BDF8', '#F3C66F', '#A855F7', '#2DD4BF', '#FB923C'];

function detectLanguage(filename: string): { lang: SupportedLanguage; kindLabel: string } {
  const lower = filename.toLowerCase();
  if (lower.endsWith('.c') || lower.endsWith('.h')) return { lang: 'C', kindLabel: 'C' };
  if (lower.endsWith('.cpp') || lower.endsWith('.hpp') || lower.endsWith('.cc') || lower.endsWith('.cxx')) {
    return { lang: 'C++', kindLabel: 'C++' };
  }
  if (lower.endsWith('.java')) return { lang: 'Java', kindLabel: 'Java' };
  if (lower.endsWith('.py')) return { lang: 'Python', kindLabel: 'Python' };
  if (lower.endsWith('.rs')) return { lang: 'Rust', kindLabel: 'Rust' };
  if (lower.endsWith('.cs')) return { lang: 'C#', kindLabel: 'C#' };
  if (lower.endsWith('.js') || lower.endsWith('.jsx') || lower.endsWith('.ts') || lower.endsWith('.tsx') || lower.endsWith('.mjs')) {
    return { lang: 'JavaScript', kindLabel: 'JS' };
  }
  return { lang: 'C++', kindLabel: 'Src' };
}

function extractFullFunctionBlock(lines: string[], startLineIdx: number, lang: SupportedLanguage): { snippet: string; endLine: number } {
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
  }

  return {
    snippet: lines.slice(startLineIdx, Math.max(startLineIdx + 1, endIdx)).join('\n'),
    endLine: endIdx,
  };
}

function findCallOccurrencesWithLineAndOutcome(
  snippet: string,
  lineStart: number,
  targetSymbol: string,
  callerKind: NodeKind,
  callerLabel: string
): { callLine: number; outcome: 'TRUE' | 'FALSE' }[] {
  const lines = snippet.split(/\r?\n/);
  const escaped = targetSymbol.replace(/[^a-zA-Z0-9_]/g, '');
  if (!escaped) return [];
  const callRegex = new RegExp(`\\b${escaped}\\s*\\(`);

  const results: { callLine: number; outcome: 'TRUE' | 'FALSE' }[] = [];
  let currentOutcome: 'TRUE' | 'FALSE' = callerLabel.toLowerCase().startsWith('else')
    ? 'FALSE'
    : 'TRUE';

  for (let idx = 0; idx < lines.length; idx++) {
    if (idx === 0 && (callerKind === NodeKind.FUNCTION || callerKind === NodeKind.RECURSION)) {
      continue;
    }
    const t = lines[idx].trim();
    if (/^(?:}\s*)?else\b/.test(t)) {
      currentOutcome = 'FALSE';
    } else if (/^if\s*[\s(]/.test(t)) {
      currentOutcome = 'TRUE';
    }

    if (
      callRegex.test(t) &&
      !t.startsWith('void ') &&
      !t.startsWith('public ') &&
      !t.startsWith('private ') &&
      !t.startsWith('def ') &&
      !t.startsWith('fn ') &&
      !t.startsWith('function ')
    ) {
      results.push({
        callLine: lineStart + idx,
        outcome: currentOutcome,
      });
    }
  }

  return results;
}

function parseSourceFileToNodes(
  fileId: string,
  fileName: string,
  content: string,
  fileIndex: number
) {
  const { lang } = detectLanguage(fileName);
  const baseColor = NATGEO_PALETTE[fileIndex % NATGEO_PALETTE.length];
  const lines = content.split(/\r?\n/);
  const nodes = [];

  const defaultClassName = fileName.replace(/\.[a-zA-Z0-9]+$/, '');
  const classNodeId = `${fileId}_class_root`;

  let detectedClassName = defaultClassName;
  let classLine = 1;
  const classRegex = /\b(?:class|struct|interface|impl|module)\s+([a-zA-Z_][a-zA-Z0-9_]*)/;
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(classRegex);
    if (m && m[1]) {
      detectedClassName = m[1];
      classLine = i + 1;
      break;
    }
  }

  const classRootNode = {
    id: classNodeId,
    symbolName: detectedClassName,
    label: fileName,
    kind: NodeKind.CLASS,
    fileId,
    fileName,
    className: detectedClassName,
    language: lang,
    lineStart: classLine,
    lineEnd: lines.length,
    codeSnippet: lines.slice(0, Math.min(lines.length, 95)).join('\n'),
    explanation: '',
    childrenIds: [],
    callsIds: [],
    calledByIds: [],
    complexity: 1,
    memoryBytes: content.length,
    color: baseColor,
  };
  nodes.push(classRootNode);

  let currentFunction = null;
  let currentConditionOrLoop = null;

  const fnRegex =
    /^\s*(?:(?:export\s+)?(?:public|private|protected|internal|pub(?:\([^)]+\))?|static|virtual|inline|async|unsafe|extern|final)\s+)*(?:(?:def|fn|function)\s+|(?:\b(?:void|int|float|double|bool|boolean|string|char|auto|size_t|uint\d+_t|int\d+_t|[A-Z][a-zA-Z0-9_<>:*&]*)\b(?:\s*\*|\s*&)?\s+))([a-zA-Z_][a-zA-Z0-9_]*)\s*\(([^)]*)\)|^\s*(?:const|let|var)\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*(?:async\s*)?\([^)]*\)\s*=>/;
  const controlRegex = /^\s*(?:}\s*)?(if|else\s+if|else|for|while|switch|match)\b(.*)$/;
  const subCallStmtRegex = /^\s*([a-zA-Z_][a-zA-Z0-9_.:]*\s*\([^;{}]*\))\s*;?\s*$/;

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();
    if (!trimmed || trimmed.startsWith('//') || trimmed.startsWith('#') || trimmed.startsWith('/*') || trimmed.startsWith('*')) {
      continue;
    }

    // Level 1: Function definition
    const fnMatch = trimmed.match(fnRegex);
    if (fnMatch && !trimmed.startsWith('if') && !trimmed.startsWith('for') && !trimmed.startsWith('while') && !trimmed.startsWith('else')) {
      const rawFnName = fnMatch[1] || fnMatch[3] || `fn_${i + 1}`;
      const cleanFnName = rawFnName.split('::').pop() || rawFnName;

      const { snippet, endLine } = extractFullFunctionBlock(lines, i, lang);
      const bodyOnly = snippet.split('\n').slice(1).join('\n');
      const escapedName = cleanFnName.replace(/[^a-zA-Z0-9_]/g, '');
      const recursionRegex = escapedName ? new RegExp(`\\b${escapedName}\\s*\\(`) : null;
      const isRecursive = recursionRegex ? recursionRegex.test(bodyOnly) : false;

      const fnNode = {
        id: `${fileId}_fn_${i + 1}`,
        symbolName: cleanFnName,
        label: `${cleanFnName}()`,
        kind: isRecursive ? NodeKind.RECURSION : NodeKind.FUNCTION,
        fileId,
        fileName,
        className: detectedClassName,
        language: lang,
        lineStart: i + 1,
        lineEnd: endLine,
        codeSnippet: snippet,
        explanation: '',
        parentId: classNodeId,
        childrenIds: [],
        callsIds: [],
        calledByIds: [],
        isRecursive,
        complexity: isRecursive ? 8 : 3,
        memoryBytes: snippet.length * 4,
        color: isRecursive ? '#38BDF8' : baseColor,
      };

      classRootNode.childrenIds.push(fnNode.id);
      nodes.push(fnNode);
      currentFunction = fnNode;
      currentConditionOrLoop = null;
      continue;
    }

    // Level 2: Control
    const ctrlMatch = trimmed.match(controlRegex);
    if (ctrlMatch && currentFunction && nodes.length < 75) {
      const keyword = ctrlMatch[1];
      const cleanLabel = trimmed.replace(/^}\s*/, '').replace(/\{$/, '').trim().slice(0, 46);
      const isLoop = keyword === 'for' || keyword === 'while';
      const isFalseElse = keyword.startsWith('else');

      const parentNode =
        currentConditionOrLoop &&
        currentConditionOrLoop.kind === NodeKind.LOOP &&
        !isLoop &&
        i + 1 <= currentConditionOrLoop.lineEnd
          ? currentConditionOrLoop
          : currentFunction;

      const { snippet, endLine } = extractFullFunctionBlock(lines, i, lang);

      const ctrlNode = {
        id: `${fileId}_branch_${i + 1}`,
        symbolName: keyword,
        label: cleanLabel,
        kind: isLoop ? NodeKind.LOOP : NodeKind.CONDITION,
        fileId,
        fileName,
        className: detectedClassName,
        language: lang,
        lineStart: i + 1,
        lineEnd: endLine,
        codeSnippet: snippet,
        explanation: '',
        parentId: parentNode.id,
        childrenIds: [],
        callsIds: [],
        calledByIds: [],
        isRecursive: isLoop,
        complexity: isLoop ? 4 : 2,
        memoryBytes: 128,
        color: isLoop ? '#38BDF8' : isFalseElse ? '#EF4444' : '#22C55E',
      };

      parentNode.childrenIds.push(ctrlNode.id);
      nodes.push(ctrlNode);
      currentConditionOrLoop = ctrlNode;
      continue;
    }

    // Level 3: Call Statement
    const callMatch = trimmed.match(subCallStmtRegex);
    if (
      callMatch &&
      currentFunction &&
      nodes.length < 85 &&
      !trimmed.startsWith('return') &&
      !trimmed.startsWith('if') &&
      !trimmed.startsWith('for') &&
      !trimmed.startsWith('while')
    ) {
      const rawCall = callMatch[1].trim();
      const fnCalledName = rawCall.split('(')[0].split('.').pop()?.trim() || rawCall;
      const parentBranch =
        currentConditionOrLoop && i + 1 <= currentConditionOrLoop.lineEnd
          ? currentConditionOrLoop
          : currentFunction;

      const isParentFalse = parentBranch.label.toLowerCase().startsWith('else');
      const stmtNode = {
        id: `${fileId}_stmt_${i + 1}`,
        symbolName: fnCalledName,
        label: rawCall.slice(0, 40),
        kind: NodeKind.STATEMENT,
        fileId,
        fileName,
        className: detectedClassName,
        language: lang,
        lineStart: i + 1,
        lineEnd: Math.min(lines.length, i + 3),
        codeSnippet: lines.slice(Math.max(0, i - 1), Math.min(lines.length, i + 4)).join('\n'),
        explanation: '',
        parentId: parentBranch.id,
        childrenIds: [],
        callsIds: [],
        calledByIds: [],
        complexity: 1,
        memoryBytes: 64,
        color: isParentFalse ? '#EF4444' : '#22C55E',
      };

      parentBranch.childrenIds.push(stmtNode.id);
      nodes.push(stmtNode);
    }
  }

  return nodes;
}

function buildRepo(rawFiles) {
  const sourceFiles = [];
  const allNodes = [];
  const edges = [];

  rawFiles.forEach((raw, idx) => {
    const fileId = `file_${idx}`;
    const { lang, kindLabel } = detectLanguage(raw.name);
    const nodes = parseSourceFileToNodes(fileId, raw.name, raw.content, idx);
    nodes.forEach(n => allNodes.push(n));
    sourceFiles.push({ id: fileId, name: raw.name, nodes });
  });

  const nodeById = new Map();
  const symbolMap = new Map();
  const classNodeByFileId = new Map();

  allNodes.forEach((node) => {
    nodeById.set(node.id, node);
    if (node.kind === NodeKind.CLASS) {
      classNodeByFileId.set(node.fileId, node);
    }
    if (
      (node.kind === NodeKind.CLASS || node.kind === NodeKind.FUNCTION || node.kind === NodeKind.RECURSION) &&
      node.symbolName.length > 2
    ) {
      symbolMap.set(node.symbolName, node);
    }
  });

  // Call edges
  const functionNodes = allNodes.filter(
    (n) => n.kind === NodeKind.FUNCTION || n.kind === NodeKind.RECURSION
  );

  functionNodes.forEach((fnNode) => {
    const childBranches = allNodes.filter(
      (b) => (b.parentId === fnNode.id || (nodeById.get(b.parentId)?.parentId === fnNode.id)) &&
             (b.kind === NodeKind.CONDITION || b.kind === NodeKind.LOOP)
    );

    symbolMap.forEach((targetNode, symbolName) => {
      if (targetNode.kind === NodeKind.CLASS) return;

      let matchedInChildBranch = false;
      childBranches.forEach((branchNode) => {
        const occurrences = findCallOccurrencesWithLineAndOutcome(
          branchNode.codeSnippet,
          branchNode.lineStart,
          symbolName,
          branchNode.kind,
          branchNode.label
        );
        occurrences.forEach((occ, occIdx) => {
          matchedInChildBranch = true;
          const isCrossFile = fnNode.fileId !== targetNode.fileId;
          edges.push({
            id: `call_${branchNode.id}_${targetNode.id}_L${occ.callLine}_${occIdx}`,
            sourceId: branchNode.id,
            targetId: targetNode.id,
            kind: isCrossFile ? 'CROSS_FILE_CALL' : 'INTERNAL_CALL',
            sourceFile: branchNode.fileName,
            targetFile: targetNode.fileName,
            callLine: occ.callLine,
            label: `${fnNode.symbolName} [${occ.outcome} L${occ.callLine}] → ${targetNode.symbolName}`,
            branchOutcome: occ.outcome,
          });
        });
      });

      if (!matchedInChildBranch && fnNode.id !== targetNode.id) {
        const directOccurrences = findCallOccurrencesWithLineAndOutcome(
          fnNode.codeSnippet,
          fnNode.lineStart,
          symbolName,
          fnNode.kind,
          fnNode.label
        );
        directOccurrences.forEach((occ, occIdx) => {
          const isCrossFile = fnNode.fileId !== targetNode.fileId;
          edges.push({
            id: `call_${fnNode.id}_${targetNode.id}_L${occ.callLine}_${occIdx}`,
            sourceId: fnNode.id,
            targetId: targetNode.id,
            kind: isCrossFile ? 'CROSS_FILE_CALL' : 'INTERNAL_CALL',
            sourceFile: fnNode.fileName,
            targetFile: targetNode.fileName,
            callLine: occ.callLine,
            label: `${fnNode.symbolName} [${occ.outcome} L${occ.callLine}] → ${targetNode.symbolName}`,
            branchOutcome: occ.outcome,
          });
        });
      }
    });
  });

  return { allNodes, edges };
}

const testRepo = buildRepo(INITIAL_LCV_FILES);
console.log('Total nodes:', testRepo.allNodes.length);
console.log('Total call edges:', testRepo.edges.length);

const allFunctionNames = [
  'InitializeAnyPS5Core',
  'ApplyKernelPatches',
  'VerifySysconHandshake',
  'ReadSysconEepromBlocks',
  'ResetUartBusConnection',
  'MountVirtualNvsPartition',
  'SyncConsoleIdBlock',
  'RestoreOriginalNvsBackup',
  'BypassHypervisorGuard',
  'DecryptSblKeyslot',
  'VerifyChecksumCrc32',
  'LogTelemetryEvent',
  'UpdateLedStatusIndicator'
];

let callsFound = 0;
let callsMissing = 0;
INITIAL_LCV_FILES.forEach(f => {
  const lines = f.content.split(/\r?\n/);
  lines.forEach((l, idx) => {
    const lineNum = idx + 1;
    allFunctionNames.forEach(fnName => {
      const reg = new RegExp(`\\b${fnName}\\s*\\(`);
      if (reg.test(l) && !l.includes(`void ${fnName}`) && !l.includes(`fn ${fnName}`) && !l.includes(`def ${fnName}`)) {
        const edge = testRepo.edges.find(e => e.sourceFile === f.name && e.callLine === lineNum);
        if (edge) {
          callsFound++;
          console.log(`[CALL OK] L${lineNum} in ${f.name}: ${fnName}() -> ${edge.id}`);
        } else {
          callsMissing++;
          console.log(`[CALL MISSING] L${lineNum} in ${f.name}: ${fnName}() -> "${l.trim()}"`);
        }
      }
    });
  });
});

console.log(`\nResult: Found ${callsFound}, Missing ${callsMissing}`);
