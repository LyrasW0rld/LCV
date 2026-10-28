import { INITIAL_LCV_FILES } from '../../../frontend/constants';
import { buildRepositoryFromRawFiles } from '../../../frontend/services/codeParser';

const repo = buildRepositoryFromRawFiles('TestRepo', INITIAL_LCV_FILES);

console.log('=== CHECKING CALL EDGES (INTERNAL_CALL & CROSS_FILE_CALL) ===\n');

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

let totalCallsInCode = 0;
let totalFoundCallEdges = 0;
let totalMissingCallEdges = 0;

INITIAL_LCV_FILES.forEach((f) => {
  console.log(`\n=================== FILE: ${f.name} ===================`);
  const lines = f.content.split(/\r?\n/);

  lines.forEach((l, idx) => {
    const lineNum = idx + 1;
    allFunctionNames.forEach(fnName => {
      const reg = new RegExp(`\\b${fnName}\\s*\\(`);
      if (reg.test(l) && !l.includes(`void ${fnName}`) && !l.includes(`fn ${fnName}`) && !l.includes(`def ${fnName}`)) {
        totalCallsInCode++;
        const callEdge = repo.edges.find(e => (e.kind === 'INTERNAL_CALL' || e.kind === 'CROSS_FILE_CALL') && e.sourceFile === f.name && e.callLine === lineNum);
        if (callEdge) {
          totalFoundCallEdges++;
          const target = repo.allNodes.find(n => n.id === callEdge.targetId);
          console.log(`[CALL EDGE OK] L${lineNum}: ${fnName}() -> edge ${callEdge.id} (target: ${target?.fileName}::${target?.symbolName})`);
        } else {
          totalMissingCallEdges++;
          console.log(`[CALL EDGE MISSING!!] L${lineNum}: call to ${fnName}() in "${l.trim()}"`);
        }
      }
    });
  });
});

console.log(`\nSUMMARY: Total calls in code = ${totalCallsInCode}, Found call edges = ${totalFoundCallEdges}, Missing call edges = ${totalMissingCallEdges}`);
