// Comprehensive test script for function signature regex
const templateL1 = '<[^<>]*>';
const templateL2 = '<(?:[^<>]|' + templateL1 + ')*>';
const templateL3 = '<(?:[^<>]|' + templateL2 + ')*>';

const qualifiers = '(?:(?:export|default|public|private|protected|internal|pub(?:\\([^)]+\\))?|static|virtual|inline|async|unsafe|extern|final|override|constexpr|explicit|friend|const|template\\s*<[^>]*>)\\s+)*';

const typeKeywords = '\\b(?:void|int|float|double|bool|boolean|string|char|auto|size_t|int8_t|int16_t|int32_t|int64_t|uint8_t|uint16_t|uint32_t|uint64_t|uint\\d+_t|int\\d+_t|intptr_t|uintptr_t|ptrdiff_t|ssize_t|wchar_t|char16_t|char32_t|byte|unsigned|signed|long|short)\\b';

const multiWordModifiers = '(?:(?:unsigned|signed|long|short)\\s+)*';

const qualifiedOrClassType = '(?:(?:struct|class|typename)\\s+)?(?:(?:[a-zA-Z_][a-zA-Z0-9_]*::)+[a-zA-Z_][a-zA-Z0-9_]*|[A-Z][a-zA-Z0-9_]*|[a-zA-Z0-9_]+_t|[a-zA-Z_][a-zA-Z0-9_]*(?:' + templateL3 + '))';

const pointerRefConst = '(?:\\s*(?:\\*+|&{1,2}|\\[\\]|\\bconst\\b))*';

const returnTypePart = '(?:(?:const\\s+)?' + multiWordModifiers + '(?:' + typeKeywords + '|' + qualifiedOrClassType + ')' + '(?:' + templateL3 + ')?' + pointerRefConst + '\\s+)';

const fnIntro = '(?:(?:def|fn|function|func)\\s+|' + returnTypePart + ')';

const fnName = '((?:[a-zA-Z_][a-zA-Z0-9_]*::)*[a-zA-Z_][a-zA-Z0-9_]*)';

const arrowFn = '^\\s*(?:const|let|var)\\s+([a-zA-Z_][a-zA-Z0-9_]*)\\s*=\\s*(?:async\\s*)?\\([^)]*\\)\\s*=>';

const fullRegex = new RegExp('^\\s*' + qualifiers + fnIntro + fnName + '\\s*\\(([^)]*)\\)|' + arrowFn);

console.log('Regex length:', fullRegex.source.length);
console.log('REGEX_LITERAL:\n' + fullRegex.toString());

const testCases = [
  // C++ complex functions (should MATCH)
  { line: 'static inline const unsigned long long int CalculateChecksum(const char* buffer, size_t length) {', expectedMatch: true, expectedName: 'CalculateChecksum' },
  { line: 'virtual std::vector<std::string> FilterTokens(const std::vector<std::string>& inputs) {', expectedMatch: true, expectedName: 'FilterTokens' },
  { line: 'std::shared_ptr<int> CreateSharedPointer(int initialValue) {', expectedMatch: true, expectedName: 'CreateSharedPointer' },
  { line: 'template<typename T> T MaxValue(T a, T b) {', expectedMatch: true, expectedName: 'MaxValue' },
  { line: 'T MaxValue(T a, T b) {', expectedMatch: true, expectedName: 'MaxValue' },
  { line: 'int EvaluateExpressions(int x, int a, int b) {', expectedMatch: true, expectedName: 'EvaluateExpressions' },
  { line: 'void EarlyExitRoutine(int code) {', expectedMatch: true, expectedName: 'EarlyExitRoutine' },
  { line: 'double TrailingCommentReturn(double v) {', expectedMatch: true, expectedName: 'TrailingCommentReturn' },
  { line: 'const char* GetName(int id)', expectedMatch: true, expectedName: 'GetName' },
  { line: 'char* const* GetMatrix()', expectedMatch: true, expectedName: 'GetMatrix' },
  { line: 'std::map<std::string, std::vector<int>> GetMapping(int key)', expectedMatch: true, expectedName: 'GetMapping' },
  { line: 'std::pair<int, double> GetPair()', expectedMatch: true, expectedName: 'GetPair' },
  { line: 'void ReturnEngine::EvaluateExpressions(int x, int a, int b)', expectedMatch: true, expectedName: 'ReturnEngine::EvaluateExpressions' },
  { line: 'unsigned int GetFlags()', expectedMatch: true, expectedName: 'GetFlags' },
  { line: 'long long GetTimestamp()', expectedMatch: true, expectedName: 'GetTimestamp' },
  { line: 'unsigned Calculate()', expectedMatch: true, expectedName: 'Calculate' },
  { line: 'const std::vector<std::string>& GetNames()', expectedMatch: true, expectedName: 'GetNames' },
  { line: 'public byte[] GetData()', expectedMatch: true, expectedName: 'GetData' },
  { line: 'String[] getNames()', expectedMatch: true, expectedName: 'getNames' },
  { line: 'protected Task<IActionResult> HandleAsync()', expectedMatch: true, expectedName: 'HandleAsync' },

  // Rust functions (should MATCH)
  { line: 'pub fn BypassHypervisorGuard(fw_target: usize) -> usize {', expectedMatch: true, expectedName: 'BypassHypervisorGuard' },
  { line: 'pub fn DecryptSblKeyslot(slot_id: usize) {', expectedMatch: true, expectedName: 'DecryptSblKeyslot' },
  { line: 'pub(crate) fn internal_helper()', expectedMatch: true, expectedName: 'internal_helper' },
  { line: 'fn simple_rust()', expectedMatch: true, expectedName: 'simple_rust' },

  // Python functions (should MATCH)
  { line: 'def LogTelemetryEvent(tag_name, status_code):', expectedMatch: true, expectedName: 'LogTelemetryEvent' },
  { line: 'async def fetch_data(url):', expectedMatch: true, expectedName: 'fetch_data' },

  // JS/TS functions (should MATCH)
  { line: 'export async function fetchData(url: string)', expectedMatch: true, expectedName: 'fetchData' },
  { line: 'function add(a, b)', expectedMatch: true, expectedName: 'add' },
  { line: 'const calculate = (x) =>', expectedMatch: true, expectedName: 'calculate' },
  { line: 'let process = async (data) =>', expectedMatch: true, expectedName: 'process' },

  // Non-function statements (MUST NOT MATCH!)
  { line: 'return foo(bar(x + 1));', expectedMatch: false },
  { line: 'return 0;', expectedMatch: false },
  { line: 'return -1;', expectedMatch: false },
  { line: 'return a > b ? x : y;', expectedMatch: false },
  { line: 'if (x > 100) {', expectedMatch: false },
  { line: 'else if (x > 50) {', expectedMatch: false },
  { line: 'while (running) {', expectedMatch: false },
  { line: 'for (int i = 0; i < 10; i++) {', expectedMatch: false },
  { line: 'doWork();', expectedMatch: false },
  { line: 'throw std::runtime_error("error");', expectedMatch: false },
  { line: 'delete ptr;', expectedMatch: false },
  { line: 'x = compute(a, b);', expectedMatch: false },
  { line: 'a.b(c);', expectedMatch: false }
];

let failed = 0;
for (const tc of testCases) {
  const m = tc.line.trim().match(fullRegex);
  const matched = !!m;
  const capturedName = m ? (m[1] || m[3]) : null;

  if (matched !== tc.expectedMatch) {
    console.error(`FAILED: "${tc.line}" -> expected match=${tc.expectedMatch}, got match=${matched}`);
    failed++;
  } else if (matched && tc.expectedName && capturedName !== tc.expectedName) {
    console.error(`FAILED NAME: "${tc.line}" -> expected name="${tc.expectedName}", got name="${capturedName}"`);
    failed++;
  } else {
    console.log(`PASSED: "${tc.line.slice(0, 45).padEnd(46)}" -> matched=${matched}${capturedName ? `, name="${capturedName}"` : ''}`);
  }
}

console.log(`\nResult: ${testCases.length - failed}/${testCases.length} tests passed.`);
process.exit(failed > 0 ? 1 : 0);
