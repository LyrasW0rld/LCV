import { execSync } from 'child_process';
import assert from 'assert';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../../..');

console.log('======================================================================');
console.log(' WORKER R2 COMPREHENSIVE REMEDIATION VERIFICATION SUITE');
console.log('======================================================================\n');

// Initialize Vite SSR context
const vite = await createServer({
  root: path.join(projectRoot, 'frontend'),
  server: { middlewareMode: true },
  appType: 'custom',
});

const typesModule = await vite.ssrLoadModule('/types.ts');
const parserModule = await vite.ssrLoadModule('/services/codeParser.ts');

const { NodeKind } = typesModule;
const { parseSourceFileToNodes, buildRepositoryFromRawFiles } = parserModule;

let total = 0;
let passed = 0;

function test(name, fn) {
  total++;
  try {
    fn();
    console.log(`  [PASS] #${total}: ${name}`);
    passed++;
  } catch (err) {
    console.error(`  [FAIL] #${total}: ${name} ->`, err.message);
  }
}

// -----------------------------------------------------------------------------
// 1. start_local.bat Real Execution & Syntax Test
// -----------------------------------------------------------------------------
console.log('--> Testing start_local.bat in Windows cmd.exe:');
test('start_local.bat runs with --dry-run without syntax errors', () => {
  const batPath = path.join(projectRoot, 'start_local.bat');
  const output = execSync(`cmd.exe /c "${batPath}" --dry-run`, { encoding: 'utf8', cwd: projectRoot });
  assert(output.includes('http://localhost:5173/'), 'Outputs local URL');
  assert(output.includes('Dry run verification successful'), 'Finishes dry run successfully');
  assert(!output.includes('kann syntaktisch an dieser Stelle nicht verarbeitet werden'), 'No German cmd syntax error');
  assert(!output.includes('was unexpected at this time'), 'No English cmd syntax error');
});

// -----------------------------------------------------------------------------
// 2. Multi-Branch K&R extractFullFunctionBlock & Return Node Parenting
// -----------------------------------------------------------------------------
console.log('\n--> Testing Multi-branch return parenting:');
const multiBranchCode = `
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

const nodesMulti = parseSourceFileToNodes('file_multi', 'ReturnEngine.cpp', multiBranchCode, 0);
const retNodesMulti = nodesMulti.filter(n => n.kind === NodeKind.RETURN);
const branchNodesMulti = nodesMulti.filter(n => n.kind === NodeKind.CONDITION);

test('Multi-branch: Found 5 return nodes', () => {
  assert.strictEqual(retNodesMulti.length, 5);
});

test('Multi-branch: if return is parented to if branch', () => {
  const r = retNodesMulti.find(n => n.returnExpression === 'foo(bar(x + 1))');
  assert(r, 'return foo(...) found');
  const b = branchNodesMulti.find(bn => bn.label.includes('x > 100'));
  assert(b, 'if branch found');
  assert.strictEqual(r.parentId, b.id);
});

test('Multi-branch: first else if return is parented to first else if branch', () => {
  const r = retNodesMulti.find(n => n.returnExpression === 'a > b ? x : y');
  assert(r, 'ternary return found');
  const b = branchNodesMulti.find(bn => bn.label.includes('x > 50'));
  assert(b, 'else if (x > 50) branch found');
  assert.strictEqual(r.parentId, b.id);
});

test('Multi-branch: second else if return is parented to second else if branch', () => {
  const r = retNodesMulti.find(n => n.returnExpression === '(a + b) * (x - 1)');
  assert(r, 'second else if return found');
  const b = branchNodesMulti.find(bn => bn.label.includes('x > 20'));
  assert(b, 'else if (x > 20) branch found');
  assert.strictEqual(r.parentId, b.id);
});

test('Multi-branch: else return is parented to else branch', () => {
  const r = retNodesMulti.find(n => n.returnExpression === '-1');
  assert(r, 'else return found');
  const b = branchNodesMulti.find(bn => bn.label.toLowerCase().startsWith('else') && !bn.label.includes('if'));
  assert(b, 'else branch found');
  assert.strictEqual(r.parentId, b.id);
});

test('Multi-branch: function end return is parented to function node', () => {
  const r = retNodesMulti.find(n => n.returnExpression === '0');
  assert(r, 'function end return found');
  const fn = nodesMulti.find(n => n.kind === NodeKind.FUNCTION);
  assert(fn, 'function node found');
  assert.strictEqual(r.parentId, fn.id);
});

// -----------------------------------------------------------------------------
// 3. Deeply Nested Return Statements
// -----------------------------------------------------------------------------
console.log('\n--> Testing Nested Conditionals Return Parenting:');
const nestedCode = `
class NestedEngine {
public:
    int Compute(int a, int b) {
        if (a > 0) {
            if (b > 0) {
                return 100;
            }
            return 50;
        }
        return 0;
    }
};
`;

const nodesNested = parseSourceFileToNodes('file_nested', 'NestedEngine.cpp', nestedCode, 1);
const retNested = nodesNested.filter(n => n.kind === NodeKind.RETURN);
const branchesNested = nodesNested.filter(n => n.kind === NodeKind.CONDITION);

test('Nested: Inner return 100 parented to inner if branch', () => {
  const r100 = retNested.find(n => n.returnExpression === '100');
  const bInner = branchesNested.find(bn => bn.label.includes('b > 0'));
  assert(r100 && bInner, 'r100 and bInner found');
  assert.strictEqual(r100.parentId, bInner.id);
});

test('Nested: Outer return 50 parented to outer if branch', () => {
  const r50 = retNested.find(n => n.returnExpression === '50');
  const bOuter = branchesNested.find(bn => bn.label.includes('a > 0'));
  assert(r50 && bOuter, 'r50 and bOuter found');
  assert.strictEqual(r50.parentId, bOuter.id);
});

test('Nested: Function return 0 parented to Compute function', () => {
  const r0 = retNested.find(n => n.returnExpression === '0');
  const fn = nodesNested.find(n => n.kind === NodeKind.FUNCTION);
  assert(r0 && fn, 'r0 and fn found');
  assert.strictEqual(r0.parentId, fn.id);
});

// -----------------------------------------------------------------------------
// 4. Complex Function Signatures and Qualifiers
// -----------------------------------------------------------------------------
console.log('\n--> Testing Complex Signatures in MultiEngine.cpp:');
const complexCode = `
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

const nodesComplex = parseSourceFileToNodes('file_complex', 'MultiEngine.cpp', complexCode, 2);
const fnsComplex = nodesComplex.filter(n => n.kind === NodeKind.FUNCTION);
const retComplex = nodesComplex.filter(n => n.kind === NodeKind.RETURN);

test('Complex: All 4 functions parsed', () => {
  assert.strictEqual(fnsComplex.length, 4);
  assert(fnsComplex.some(f => f.symbolName === 'CalculateChecksum'), 'CalculateChecksum parsed');
  assert(fnsComplex.some(f => f.symbolName === 'FilterTokens'), 'FilterTokens parsed');
  assert(fnsComplex.some(f => f.symbolName === 'CreateSharedPointer'), 'CreateSharedPointer parsed');
  assert(fnsComplex.some(f => f.symbolName === 'MaxValue'), 'MaxValue parsed');
});

test('Complex: All 7 return statements parsed into RETURN nodes', () => {
  assert.strictEqual(retComplex.length, 7);
});

// -----------------------------------------------------------------------------
// 5. String & Comment Sanitization during Brace Counting
// -----------------------------------------------------------------------------
console.log('\n--> Testing Braces in Strings and Comments:');
const stringBraceCode = `
class StringEngine {
public:
    std::string Process() {
        std::string open = "{";
        std::string close = "}"; // Note: } in comment
        if (open.length() > 0) {
            std::string nested = "foo { bar } baz";
            return nested;
        }
        return "done";
    }
};
`;

const nodesString = parseSourceFileToNodes('file_str', 'StringEngine.cpp', stringBraceCode, 3);
const fnStr = nodesString.find(n => n.kind === NodeKind.FUNCTION);
const retStr = nodesString.filter(n => n.kind === NodeKind.RETURN);

test('String Braces: Function endLine correctly encompasses entire function', () => {
  assert(fnStr, 'Process function parsed');
  assert(fnStr.codeSnippet.includes('return "done";'), 'Snippet contains return done');
});

test('String Braces: Returns correctly captured and parented', () => {
  assert.strictEqual(retStr.length, 2);
  const rNested = retStr.find(r => r.returnExpression === 'nested');
  assert(rNested, 'return nested captured');
  const bIf = nodesString.find(n => n.kind === NodeKind.CONDITION);
  assert.strictEqual(rNested.parentId, bIf.id);
});

await vite.close();

console.log('\n======================================================================');
console.log(` Summary: ${passed}/${total} Tests Passed`);
console.log('======================================================================');

if (passed !== total) {
  process.exit(1);
}
