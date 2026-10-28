import assert from 'assert';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../../..');

console.log('======================================================================');
console.log(' REVIEWER 2 INDEPENDENT ADVERSARIAL & INTEGRITY STRESS SUITE');
console.log('======================================================================\n');

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
let failed = 0;

function runTest(name, fn) {
  total++;
  try {
    fn();
    console.log(`  [PASS] #${total}: ${name}`);
    passed++;
  } catch (err) {
    console.error(`  [FAIL] #${total}: ${name} ->`, err.message);
    failed++;
  }
}

// ============================================================================
// SUITE 1: Return Node Enclosing Branch Parenting Stress Tests
// ============================================================================
console.log('--> Suite 1: Deep Branch & Loop Return Parenting');

// Test 1.1: Returns in while loop inside else branch
const loopInElseCode = `
class ComplexFlow {
public:
    int RunFlow(int mode) {
        if (mode == 1) {
            return 10;
        } else {
            while (mode > 0) {
                if (mode == 5) {
                    return 55;
                }
                mode--;
            }
            return 99;
        }
        return -1;
    }
};
`;

const nodes1 = parseSourceFileToNodes('f1', 'ComplexFlow.cpp', loopInElseCode, 0);
const returns1 = nodes1.filter(n => n.kind === NodeKind.RETURN);

runTest('Loop in Else: Found exactly 4 return nodes', () => {
  assert.strictEqual(returns1.length, 4);
});

runTest('Loop in Else: mode == 1 return parented to first if branch', () => {
  const r10 = returns1.find(r => r.returnExpression === '10');
  assert(r10, 'return 10 found');
  const bIf = nodes1.find(n => n.kind === NodeKind.CONDITION && n.label.includes('mode == 1'));
  assert(bIf, 'bIf found');
  assert.strictEqual(r10.parentId, bIf.id);
});

runTest('Loop in Else: mode == 5 return parented to inner if branch', () => {
  const r55 = returns1.find(r => r.returnExpression === '55');
  assert(r55, 'return 55 found');
  const bInner = nodes1.find(n => n.kind === NodeKind.CONDITION && n.label.includes('mode == 5'));
  assert(bInner, 'bInner found');
  assert.strictEqual(r55.parentId, bInner.id);
});

runTest('Loop in Else: return 99 parented to else branch', () => {
  const r99 = returns1.find(r => r.returnExpression === '99');
  assert(r99, 'return 99 found');
  const bElse = nodes1.find(n => n.kind === NodeKind.CONDITION && n.label.toLowerCase().startsWith('else'));
  assert(bElse, 'bElse found');
  assert.strictEqual(r99.parentId, bElse.id);
});

runTest('Loop in Else: return -1 parented to function RunFlow', () => {
  const rNeg = returns1.find(r => r.returnExpression === '-1');
  assert(rNeg, 'return -1 found');
  const fn = nodes1.find(n => n.kind === NodeKind.FUNCTION);
  assert(fn, 'fn found');
  assert.strictEqual(rNeg.parentId, fn.id);
});

// Test 1.2: Loop with multiple returns and break-like structure
const loopMultipleReturnsCode = `
class SearchEngine {
public:
    int FindFirst(int* arr, int size, int target) {
        for (int i = 0; i < size; i++) {
            if (arr[i] == target) {
                return i;
            } else if (arr[i] < 0) {
                return -2;
            }
        }
        return -1;
    }
};
`;

const nodes2 = parseSourceFileToNodes('f2', 'SearchEngine.cpp', loopMultipleReturnsCode, 1);
const returns2 = nodes2.filter(n => n.kind === NodeKind.RETURN);

runTest('Loop Multi-Return: Found 3 return nodes', () => {
  assert.strictEqual(returns2.length, 3);
});

runTest('Loop Multi-Return: arr[i] == target return parented to inner if', () => {
  const r = returns2.find(n => n.returnExpression === 'i');
  assert(r, 'return i found');
  const b = nodes2.find(n => n.kind === NodeKind.CONDITION && n.label.includes('arr[i] == target'));
  assert(b, 'b found');
  assert.strictEqual(r.parentId, b.id);
});

runTest('Loop Multi-Return: arr[i] < 0 return parented to else if', () => {
  const r = returns2.find(n => n.returnExpression === '-2');
  assert(r, 'return -2 found');
  const b = nodes2.find(n => n.kind === NodeKind.CONDITION && n.label.includes('arr[i] < 0'));
  assert(b, 'b found');
  assert.strictEqual(r.parentId, b.id);
});

runTest('Loop Multi-Return: return -1 parented to FindFirst function', () => {
  const r = returns2.find(n => n.returnExpression === '-1');
  assert(r, 'return -1 found');
  const fn = nodes2.find(n => n.kind === NodeKind.FUNCTION);
  assert(fn, 'fn found');
  assert.strictEqual(r.parentId, fn.id);
});

// ============================================================================
// SUITE 2: Function Signature Regex Stress Tests (R3)
// ============================================================================
console.log('\n--> Suite 2: Complex Function Signatures and Qualifiers');

const complexSignaturesCode = `
class AdvancedSignatures {
public:
    constexpr const unsigned int GetVersion() const {
        return 101U;
    }

    explicit AdvancedSignatures(int val) {
    }

    virtual inline const std::vector<std::string>& QueryTokens(const std::string& prefix) const {
        return m_tokens;
    }

    static std::shared_ptr<AdvancedSignatures> CreateInstance() {
        return std::make_shared<AdvancedSignatures>(42);
    }

    std::pair<int, double> ComputePair(int x) {
        return {x, x * 1.5};
    }

    template<typename T, typename U>
    std::tuple<T, U> Combine(T a, U b) {
        return std::make_tuple(a, b);
    }

    uint64_t ProcessBuffer(const uint8_t* data, size_t len) {
        return len * 8ULL;
    }
};
`;

const nodes3 = parseSourceFileToNodes('f3', 'AdvancedSignatures.cpp', complexSignaturesCode, 2);
const fns3 = nodes3.filter(n => n.kind === NodeKind.FUNCTION);
const returns3 = nodes3.filter(n => n.kind === NodeKind.RETURN);

runTest('Signatures: GetVersion recognized', () => {
  assert(fns3.some(f => f.symbolName === 'GetVersion'));
});

runTest('Signatures: QueryTokens recognized', () => {
  assert(fns3.some(f => f.symbolName === 'QueryTokens'));
});

runTest('Signatures: CreateInstance recognized', () => {
  assert(fns3.some(f => f.symbolName === 'CreateInstance'));
});

runTest('Signatures: ComputePair recognized', () => {
  assert(fns3.some(f => f.symbolName === 'ComputePair'));
});

runTest('Signatures: Combine recognized', () => {
  assert(fns3.some(f => f.symbolName === 'Combine'));
});

runTest('Signatures: ProcessBuffer recognized', () => {
  assert(fns3.some(f => f.symbolName === 'ProcessBuffer'));
});

runTest('Signatures: All returns inside recognized functions parsed into RETURN nodes', () => {
  assert.strictEqual(returns3.length, 6);
  returns3.forEach(r => {
    assert.strictEqual(r.kind, NodeKind.RETURN);
    assert.strictEqual(r.color, '#F43F5E');
    assert.strictEqual(r.label, 'return');
  });
});

// ============================================================================
// SUITE 3: Call Graph & Call Edges Verification (R3)
// ============================================================================
console.log('\n--> Suite 3: Call Graph Directed Edge Resolution');

const fileA = `
class ClientA {
public:
    void ExecuteWorkflow() {
        StepOne();
        if (CheckCondition()) {
            StepTwo();
        } else {
            StepThree();
        }
    }

    void StepOne() {
        LogMessage();
    }

    bool CheckCondition() {
        return true;
    }

    void StepTwo() {
        LogMessage();
    }

    void StepThree() {
        LogMessage();
    }

    void LogMessage() {
    }
};
`;

const fileB = `
class ServiceB {
public:
    void Forward() {
        ClientA a;
        a.ExecuteWorkflow();
    }
};
`;

const repo = buildRepositoryFromRawFiles('TestRepo', [
  { name: 'ClientA.cpp', path: 'ClientA.cpp', size: fileA.length, date: '2026-10-28', content: fileA },
  { name: 'ServiceB.cpp', path: 'ServiceB.cpp', size: fileB.length, date: '2026-10-28', content: fileB },
]);

runTest('Call Graph: All node IDs unique', () => {
  const ids = new Set();
  repo.allNodes.forEach(n => {
    assert(!ids.has(n.id), `Duplicate id ${n.id}`);
    ids.add(n.id);
  });
});

runTest('Call Graph: Zero dangling edges (all sources & targets exist)', () => {
  const nodeMap = new Map(repo.allNodes.map(n => [n.id, n]));
  repo.edges.forEach(e => {
    assert(nodeMap.has(e.sourceId), `Dangling edge source ${e.sourceId}`);
    assert(nodeMap.has(e.targetId), `Dangling edge target ${e.targetId}`);
  });
});

const callEdges = repo.edges.filter(e => e.kind === 'INTERNAL_CALL' || e.kind === 'CROSS_FILE_CALL');

runTest('Call Graph: Internal calls in ClientA detected', () => {
  const stepOneCalls = callEdges.filter(e => e.label.includes('StepOne'));
  assert(stepOneCalls.length > 0, 'StepOne call detected');
  const stepTwoCalls = callEdges.filter(e => e.label.includes('StepTwo'));
  assert(stepTwoCalls.length > 0, 'StepTwo call detected');
  const stepThreeCalls = callEdges.filter(e => e.label.includes('StepThree'));
  assert(stepThreeCalls.length > 0, 'StepThree call detected');
  const checkCondCalls = callEdges.filter(e => e.label.includes('CheckCondition'));
  assert(checkCondCalls.length > 0, 'CheckCondition call detected');
});

runTest('Call Graph: Cross-file call from ServiceB to ClientA.ExecuteWorkflow detected', () => {
  const cross = repo.edges.find(e => e.kind === 'CROSS_FILE_CALL');
  assert(cross, 'Cross file call found');
  assert(cross.label.includes('ExecuteWorkflow'), 'Cross file call targets ExecuteWorkflow');
});

// ============================================================================
// SUITE 4: Integrity & Non-Hardcoding Audit
// ============================================================================
console.log('\n--> Suite 4: Integrity and Non-Hardcoding Audit');

// Test with randomly generated identifiers to ensure no hardcoded symbol names
const randomSuffix = Math.floor(Math.random() * 900000 + 100000);
const genFn1 = `DynamicRtn_${randomSuffix}`;
const genFn2 = `DynamicTarget_${randomSuffix}`;

const dynamicCode = `
class DynamicContainer_${randomSuffix} {
public:
    int ${genFn1}(int val) {
        if (val > 42) {
            ${genFn2}();
            return val * 2;
        } else if (val < 0) {
            return -100;
        } else {
            return 0;
        }
        return -1;
    }

    void ${genFn2}() {
    }
};
`;

const dynamicNodes = parseSourceFileToNodes('dyn_file', `Dyn_${randomSuffix}.cpp`, dynamicCode, 3);
const dynFns = dynamicNodes.filter(n => n.kind === NodeKind.FUNCTION);
const dynReturns = dynamicNodes.filter(n => n.kind === NodeKind.RETURN);

runTest('Integrity: Dynamic generated function recognized without hardcoding', () => {
  assert(dynFns.some(f => f.symbolName === genFn1), `${genFn1} recognized`);
  assert(dynFns.some(f => f.symbolName === genFn2), `${genFn2} recognized`);
});

runTest('Integrity: Dynamic return statements properly parsed and parented', () => {
  assert.strictEqual(dynReturns.length, 4);
  const rVal2 = dynReturns.find(r => r.returnExpression === 'val * 2');
  assert(rVal2, 'return val * 2 found');
  const bIf = dynamicNodes.find(n => n.kind === NodeKind.CONDITION && n.label.includes('val > 42'));
  assert.strictEqual(rVal2.parentId, bIf.id);

  const rNeg100 = dynReturns.find(r => r.returnExpression === '-100');
  const bElseIf = dynamicNodes.find(n => n.kind === NodeKind.CONDITION && n.label.includes('val < 0'));
  assert.strictEqual(rNeg100.parentId, bElseIf.id);

  const rZero = dynReturns.find(r => r.returnExpression === '0');
  const bElse = dynamicNodes.find(n => n.kind === NodeKind.CONDITION && n.label.toLowerCase().startsWith('else') && !n.label.includes('if'));
  assert.strictEqual(rZero.parentId, bElse.id);

  const rNeg1 = dynReturns.find(r => r.returnExpression === '-1');
  const fn1 = dynFns.find(f => f.symbolName === genFn1);
  assert.strictEqual(rNeg1.parentId, fn1.id);
});

const dynamicRepo = buildRepositoryFromRawFiles('DynRepo', [
  { name: `Dyn_${randomSuffix}.cpp`, path: `Dyn_${randomSuffix}.cpp`, size: dynamicCode.length, date: '2026-10-28', content: dynamicCode }
]);

runTest('Integrity: Call edge generated for dynamically generated symbols', () => {
  const edge = dynamicRepo.edges.find(e => e.kind === 'INTERNAL_CALL');
  assert(edge, 'Call edge found');
  assert(edge.label.includes(genFn2), 'Call edge targets dynamic callee');
});

await vite.close();

console.log('\n======================================================================');
console.log(` Summary: ${passed}/${total} Tests Passed (${failed} Failed)`);
console.log('======================================================================');

if (failed > 0) {
  process.exit(1);
}
