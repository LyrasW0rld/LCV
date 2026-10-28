import { DEFAULT_REPOSITORY } from '../../../frontend/constants';
import { NodeKind } from '../../../frontend/types';

console.log('=== CALL EDGES SUMMARY ===');
const callEdges = DEFAULT_REPOSITORY.edges.filter(e => e.kind === 'INTERNAL_CALL' || e.kind === 'CROSS_FILE_CALL');
console.log(`Total call edges: ${callEdges.length}`);

// Group by source node kind
const sourceKindMap = new Map();
const targetKindMap = new Map();

callEdges.forEach(e => {
  const srcNode = DEFAULT_REPOSITORY.allNodes.find(n => n.id === e.sourceId);
  const tgtNode = DEFAULT_REPOSITORY.allNodes.find(n => n.id === e.targetId);
  const srcKind = srcNode ? srcNode.kind : 'UNKNOWN';
  const tgtKind = tgtNode ? tgtNode.kind : 'UNKNOWN';
  sourceKindMap.set(srcKind, (sourceKindMap.get(srcKind) || 0) + 1);
  targetKindMap.set(tgtKind, (targetKindMap.get(tgtKind) || 0) + 1);
});

console.log('Call edge source kinds:', Object.fromEntries(sourceKindMap));
console.log('Call edge target kinds:', Object.fromEntries(targetKindMap));

console.log('\n=== LIST OF ALL CALL EDGES ===');
callEdges.forEach(e => {
  const src = DEFAULT_REPOSITORY.allNodes.find(n => n.id === e.sourceId);
  const tgt = DEFAULT_REPOSITORY.allNodes.find(n => n.id === e.targetId);
  console.log(`${e.id}: [${src?.fileName}] ${src?.label} (${src?.kind}) -> [${tgt?.fileName}] ${tgt?.label} (${tgt?.kind}) [Line ${e.callLine}, outcome ${e.branchOutcome}]`);
});
