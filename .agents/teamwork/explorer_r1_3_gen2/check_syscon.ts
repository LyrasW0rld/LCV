import { DEFAULT_REPOSITORY } from '../../../frontend/constants';

const sysconFile = DEFAULT_REPOSITORY.files.find(f => f.name === 'SysconController.cs');
console.log('SysconController file nodes:');
sysconFile?.nodes.forEach(n => {
  console.log(`- [${n.kind}] id=${n.id} symbol=${n.symbolName} label="${n.label}" lineStart=${n.lineStart}`);
});
