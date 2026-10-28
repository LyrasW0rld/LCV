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

const typesModule = await vite.ssrLoadModule('/types.ts');
const parserModule = await vite.ssrLoadModule('/services/codeParser.ts');

const { NodeKind } = typesModule;
const { buildRepositoryFromRawFiles } = parserModule;

const complexSignaturesCpp = `
#include <vector>
#include <string>
#include <memory>

class MultiEngine {
public:
    static inline const unsigned long long int CalculateChecksum(const char* buffer, size_t length) {
        if (length == 0) {
            return 0ULL;
        }
        return 42ULL;
    }

    virtual std::vector<std::string> FilterTokens(const std::vector<std::string>& inputs) {
        for (int i = 0; i < 10; i++) {
            if (i > 5) {
                return inputs;
            }
        }
        return inputs;
    }

    std::shared_ptr<int> CreateSharedPointer(int initialValue) {
        return std::make_shared<int>(initialValue);
    }

    template<typename T>
    T MaxValue(T a, T b) {
        if (a > b) {
            return a;
        } else {
            return b;
        }
    }
};
`;

// Let's test lines with our regex directly
const templateL1 = '<[^<>]*>';
const templateL2 = '<(?:[^<>]|' + templateL1 + ')*>';
const templateL3 = '<(?:[^<>]|' + templateL2 + ')*>';

const templatePrefix = '(?:template\\s*<[^>]*>\\s+)?';
const qualifiers = '(?:(?:export|default|public|private|protected|internal|pub(?:\\([^)]+\\))?|static|virtual|inline|async|unsafe|extern|final|override|constexpr|explicit|friend|const|template\\s*<[^>]*>)\\s+)*';
const typeKeywords = '\\b(?:void|int|float|double|bool|boolean|string|char|auto|size_t|int8_t|int16_t|int32_t|int64_t|uint8_t|uint16_t|uint32_t|uint64_t|uint\\d+_t|int\\d+_t|intptr_t|uintptr_t|ptrdiff_t|ssize_t|wchar_t|char16_t|char32_t|byte|unsigned|signed|long|short)\\b';
const multiWordModifiers = '(?:(?:unsigned|signed|long|short)\\s+)*';
const qualifiedOrClassType = '(?:(?:struct|class|typename)\\s+)?(?:(?:[a-zA-Z_][a-zA-Z0-9_]*::)+[a-zA-Z_][a-zA-Z0-9_]*|[A-Z][a-zA-Z0-9_]*|[a-zA-Z0-9_]+_t|[a-zA-Z_][a-zA-Z0-9_]*(?:' + templateL3 + '))';
const pointerRefConst = '(?:\\s*(?:\\*+|&{1,2}|\\bconst\\b))*';
const returnTypePart = '(?:(?:const\\s+)?' + multiWordModifiers + '(?:' + typeKeywords + '|' + qualifiedOrClassType + ')' + '(?:' + templateL3 + ')?' + pointerRefConst + '\\s+)';
const fnIntro = '(?:(?:def|fn|function|func)\\s+|' + returnTypePart + ')';
const fnName = '((?:[a-zA-Z_][a-zA-Z0-9_]*::)*[a-zA-Z_][a-zA-Z0-9_]*)';
const arrowFn = '^\\s*(?:const|let|var)\\s+([a-zA-Z_][a-zA-Z0-9_]*)\\s*=\\s*(?:async\\s*)?\\([^)]*\\)\\s*=>';

const fullRegex = new RegExp('^\\s*' + qualifiers + fnIntro + fnName + '\\s*\\(([^)]*)\\)|' + arrowFn);

console.log('Testing each line in MultiEngine.cpp against fullRegex:');
complexSignaturesCpp.split('\n').forEach((line, idx) => {
  const trimmed = line.trim();
  const m = trimmed.match(fullRegex);
  if (m && !trimmed.startsWith('if') && !trimmed.startsWith('for') && !trimmed.startsWith('while') && !trimmed.startsWith('else')) {
    const rawFnName = m[1] || m[3];
    const cleanFnName = rawFnName.split('::').pop() || rawFnName;
    console.log(`  Line ${idx + 1}: Found function "${cleanFnName}" (raw: "${rawFnName}")`);
  }
});

await vite.close();
