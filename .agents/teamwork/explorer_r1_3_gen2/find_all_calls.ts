import { INITIAL_LCV_FILES } from '../../../frontend/constants';
import { parseSourceFileToNodes, buildRepositoryFromRawFiles } from '../../../frontend/services/codeParser';

const repo = buildRepositoryFromRawFiles('TestRepo', INITIAL_LCV_FILES);

console.log('=== INVESTIGATING ALL FILES AND CALLS ===\n');

INITIAL_LCV_FILES.forEach((f, fIdx) => {
  console.log(`\n=================== FILE: ${f.name} ===================`);
  const lines = f.content.split(/\r?\n/);
  
  // Find all function names across all files
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

  lines.forEach((l, idx) => {
    const lineNum = idx + 1;
    allFunctionNames.forEach(fnName => {
      const reg = new RegExp(`\\b${fnName}\\s*\\(`);
      if (reg.test(l) && !l.includes(`void ${fnName}`) && !l.includes(`fn ${fnName}`) && !l.includes(`def ${fnName}`)) {
        // Find if an edge exists for this line
        const edge = repo.edges.find(e => e.sourceFile === f.name && e.callLine === lineNum);
        if (edge) {
          console.log(`[FOUND EDGE] L${lineNum}: ${fnName}() -> Edge ${edge.id} (kind: ${edge.kind}, src: ${edge.sourceId}, tgt: ${edge.targetId})`);
        } else {
          console.log(`[MISSING EDGE!!] L${lineNum}: ${fnName}() in "${l.trim()}"`);
        }
      }
    });
  });
});
