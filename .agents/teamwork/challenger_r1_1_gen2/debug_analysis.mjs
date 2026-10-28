import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../../..');

const vite = await createServer({
  root: path.join(projectRoot, 'frontend'),
  server: { middlewareMode: true },
  appType: 'custom',
});

const parserModule = await vite.ssrLoadModule('/services/codeParser.ts');
const { parseSourceFileToNodes } = parserModule;

console.log('=== DEBUG GROUP 1 NODES ===');
const complexReturnFile = `
class ReturnEngine {
public:
    int EvaluateExpressions(int x, int a, int b) {
        if (x > 100) {
            return foo(bar(x + 1));
        } else if (x > 50) {
            return a > b ? x : y;
        } else if (x > 20) {
            return (a + b) * (x - 1);
        } else {
            return -1;
        }
        return 0;
    }
};
`;

const nodes1 = parseSourceFileToNodes('file_0', 'ReturnEngine.cpp', complexReturnFile, 0);
nodes1.forEach(n => {
  console.log(`Node: id=${n.id}, kind=${n.kind}, symbolName="${n.symbolName}", label="${n.label}", parentId=${n.parentId}`);
});

console.log('\n=== DEBUG GROUP 2 FUNCTION MATCHING ===');
const lines2 = [
  '    static inline const unsigned long long int CalculateChecksum(const char* buffer, size_t length) {',
  '    virtual std::vector<std::string> FilterTokens(const std::vector<std::string>& inputs) {',
  '    std::shared_ptr<int> CreateSharedPointer(int initialValue) {',
  '    template<typename T>',
  '    T MaxValue(T a, T b) {',
];

const fnRegex =
  /^\s*(?:(?:export\s+)?(?:public|private|protected|internal|pub(?:\([^)]+\))?|static|virtual|inline|async|unsafe|extern|final)\s+)*(?:(?:def|fn|function)\s+|(?:\b(?:void|int|float|double|bool|boolean|string|char|auto|size_t|uint\d+_t|int\d+_t|[A-Z][a-zA-Z0-9_<>:*&]*)\b(?:\s*\*|\s*&)?\s+))([a-zA-Z_][a-zA-Z0-9_]*)\s*\(([^)]*)\)|^\s*(?:const|let|var)\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*(?:async\s*)?\([^)]*\)\s*=>/;

lines2.forEach((l, idx) => {
  const m = l.match(fnRegex);
  console.log(`Line ${idx}: "${l.trim()}" -> Match: ${!!m}, captured: ${m ? m[1] : 'none'}`);
});

await vite.close();
