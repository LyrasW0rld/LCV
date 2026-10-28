import { INITIAL_LCV_FILES } from '../../../frontend/constants';

console.log('=== CHECKING ALL FUNCTIONS IN INITIAL_LCV_FILES ===');
INITIAL_LCV_FILES.forEach(file => {
  console.log(`\nFile: ${file.name}`);
  const lines = file.content.split(/\r?\n/);
  lines.forEach((l, idx) => {
    // print any line that looks like a function header
    if (/\b(?:void|def|fn|function|[A-Z]\w+)\s+\w+\s*\(/.test(l) || /^\s*(?:public|private|protected|static).*\([^)]*\)/.test(l)) {
      console.log(`  Line ${idx + 1}: ${l.trim()}`);
    }
  });
});
