import { DEFAULT_REPOSITORY } from '../../../frontend/constants';

console.log('=== DEFAULT REPOSITORY STATS ===');
console.log('Total files:', DEFAULT_REPOSITORY.files.length);
console.log('Total nodes:', DEFAULT_REPOSITORY.allNodes.length);
console.log('Total edges:', DEFAULT_REPOSITORY.edges.length);
console.log('Stats:', DEFAULT_REPOSITORY.stats);

console.log('\n=== ALL NODES ===');
DEFAULT_REPOSITORY.allNodes.forEach((n) => {
  console.log(`- [${n.kind}] id=${n.id} symbol=${n.symbolName} label="${n.label}" file=${n.fileName} lineStart=${n.lineStart} parent=${n.parentId}`);
});

console.log('\n=== ALL EDGES ===');
DEFAULT_REPOSITORY.edges.forEach((e) => {
  console.log(`- [${e.kind}] id=${e.id} source=${e.sourceId} target=${e.targetId} line=${e.callLine} outcome=${e.branchOutcome} label="${e.label || ''}"`);
});
