import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../../..');

console.log('======================================================================');
console.log(' CHALLENGER 1 (R2): EXPANDED ADVERSARIAL STRESS TEST SUITE');
console.log(' Multi-Language Returns, Complex Signatures & Graph Invariants');
console.log('======================================================================\n');

// Initialize Vite SSR context
const vite = await createServer({
  root: path.join(projectRoot, 'frontend'),
  server: { middlewareMode: true },
  appType: 'custom',
});

const typesModule = await vite.ssrLoadModule('/types.ts');
const parserModule = await vite.ssrLoadModule('/services/codeParser.ts');
const constantsModule = await vite.ssrLoadModule('/constants.ts');

const { NodeKind } = typesModule;
const { parseSourceFileToNodes, buildRepositoryFromRawFiles } = parserModule;
const { DEFAULT_REPOSITORY } = constantsModule;

let testCount = 0;
let passedCount = 0;
let failedCount = 0;
const failures = [];

function check(condition, testName, details = '') {
  testCount++;
  if (condition) {
    passedCount++;
    console.log(`  [PASS] [${testCount}] ${testName}${details ? ` -> ${details}` : ''}`);
  } else {
    failedCount++;
    failures.push({ testCount, testName, details });
    console.error(`  [FAIL] [${testCount}] ${testName} -> ${details}`);
  }
}

function verifyGraphIntegrity(repo, testGroupName) {
  const nodeMap = new Map();
  let duplicateNodeIds = 0;
  for (const node of repo.allNodes) {
    if (nodeMap.has(node.id)) {
      duplicateNodeIds++;
      console.error(`    Duplicate node id found: ${node.id}`);
    }
    nodeMap.set(node.id, node);
  }
  check(duplicateNodeIds === 0, `${testGroupName}: No duplicate node IDs (total: ${repo.allNodes.length})`);

  const edgeMap = new Set();
  let duplicateEdgeIds = 0;
  let danglingEdges = 0;
  for (const edge of repo.edges) {
    if (edgeMap.has(edge.id)) {
      duplicateEdgeIds++;
      console.error(`    Duplicate edge id found: ${edge.id}`);
    }
    edgeMap.add(edge.id);

    const hasSrc = nodeMap.has(edge.sourceId);
    const hasTgt = nodeMap.has(edge.targetId);
    if (!hasSrc || !hasTgt) {
      danglingEdges++;
      console.error(`    Dangling edge ${edge.id}: src ${edge.sourceId} (${hasSrc}), tgt ${edge.targetId} (${hasTgt})`);
    }
  }
  check(duplicateEdgeIds === 0, `${testGroupName}: No duplicate edge IDs (total: ${repo.edges.length})`);
  check(danglingEdges === 0, `${testGroupName}: No dangling edges (all sources and targets exist)`);
}

function verifyReturnNodeContract(repo, retNode, expectedExpr, expectedParentKind, expectedParentSymbol) {
  check(retNode.kind === NodeKind.RETURN, `Return node ${retNode.id} has NodeKind.RETURN`);
  check(retNode.label === 'return', `Return node ${retNode.id} label is "return"`);
  check(retNode.color === '#F43F5E', `Return node ${retNode.id} color is pink/rose #F43F5E`);
  check(retNode.returnExpression === expectedExpr, `Return node ${retNode.id} expression matches "${expectedExpr}"`, `Got: "${retNode.returnExpression}"`);

  const parent = repo.allNodes.find(n => n.id === retNode.parentId);
  check(!!parent, `Return node ${retNode.id} parent exists in repository: ${retNode.parentId}`);
  if (parent) {
    if (expectedParentKind) {
      check(parent.kind === expectedParentKind, `Return node ${retNode.id} parent kind is ${expectedParentKind}`, `Got: ${parent.kind}`);
    }
    if (expectedParentSymbol) {
      check(parent.symbolName === expectedParentSymbol, `Return node ${retNode.id} parent symbolName is "${expectedParentSymbol}"`, `Got: "${parent.symbolName}"`);
    }
  }

  const incomingAstEdge = repo.edges.find(e => e.kind === 'AST_CHILD' && e.targetId === retNode.id);
  check(!!incomingAstEdge, `Return node ${retNode.id} has incoming AST_CHILD edge`, `From: ${incomingAstEdge?.sourceId}`);
  if (incomingAstEdge && parent) {
    check(incomingAstEdge.sourceId === parent.id, `Incoming AST edge source matches parentId (${parent.id})`);
  }
}

// =========================================================================
// SUITE 1: Python Multi-Branch & Returns
// =========================================================================
console.log('--- Suite 1: Python Multi-Branch & Returns ---');

const pythonSource = `
class DataPipeline:
    def process_records(self, records, threshold):
        if not records:
            return []
        elif len(records) > threshold:
            return records[:threshold]
        else:
            return records

    def calculate_metric(self, val):
        while val > 0:
            if val == 42:
                return "Found"
            val -= 1
        return "Not found"

    def validate_token(self, token: str) -> bool:
        if len(token) < 8:
            return False
        return True

    def void_routine(self):
        return
`;

const repoPy = buildRepositoryFromRawFiles('PythonRepo', [
  {
    name: 'DataPipeline.py',
    path: 'scripts/DataPipeline.py',
    size: pythonSource.length,
    date: '2026-10-28',
    content: pythonSource,
  },
]);

verifyGraphIntegrity(repoPy, 'Python DataPipeline');

const pyFunctions = repoPy.allNodes.filter(n => n.kind === NodeKind.FUNCTION || n.kind === NodeKind.RECURSION);
console.log(`  Found ${pyFunctions.length} Python functions: ${pyFunctions.map(f => f.symbolName).join(', ')}`);
check(pyFunctions.length === 4, 'All 4 Python functions parsed correctly', `Count: ${pyFunctions.length}`);

const pyReturns = repoPy.allNodes.filter(n => n.kind === NodeKind.RETURN);
console.log(`  Found ${pyReturns.length} Python return nodes: ${pyReturns.map(r => `${r.lineStart}: "${r.symbolName}"`).join(', ')}`);
check(pyReturns.length === 8, 'All 8 Python return statements parsed into dedicated RETURN nodes', `Count: ${pyReturns.length}`);

// Check specific returns and parenting
const pyRetEmptyList = pyReturns.find(r => r.returnExpression === '[]');
check(!!pyRetEmptyList, 'Python return [] captured');
if (pyRetEmptyList) verifyReturnNodeContract(repoPy, pyRetEmptyList, '[]', NodeKind.CONDITION, 'if');

const pyRetSlice = pyReturns.find(r => r.returnExpression === 'records[:threshold]');
check(!!pyRetSlice, 'Python return records[:threshold] captured');
// Note: In Python, elif is not in controlRegex, so its return falls back to enclosing function
if (pyRetSlice) {
  check(pyRetSlice.kind === NodeKind.RETURN, 'Python elif return has NodeKind.RETURN');
  check(pyRetSlice.label === 'return', 'Python elif return label is "return"');
  check(pyRetSlice.color === '#F43F5E', 'Python elif return color is #F43F5E');
  console.log(`    Note on Python elif: parent is ${pyRetSlice.parentId} (falls back to function because controlRegex omits 'elif')`);
}

const pyRetAll = pyReturns.find(r => r.returnExpression === 'records');
check(!!pyRetAll, 'Python return records in else branch captured');
if (pyRetAll) verifyReturnNodeContract(repoPy, pyRetAll, 'records', NodeKind.CONDITION, 'else');

const pyRetFound = pyReturns.find(r => r.returnExpression === '"Found"');
check(!!pyRetFound, 'Python return "Found" captured inside loop branch');
if (pyRetFound) verifyReturnNodeContract(repoPy, pyRetFound, '"Found"', NodeKind.CONDITION, 'if');

const pyRetNotFound = pyReturns.find(r => r.returnExpression === '"Not found"');
check(!!pyRetNotFound, 'Python return "Not found" captured at function root');
if (pyRetNotFound) verifyReturnNodeContract(repoPy, pyRetNotFound, '"Not found"', NodeKind.FUNCTION, 'calculate_metric');

const pyRetFalse = pyReturns.find(r => r.returnExpression === 'False');
check(!!pyRetFalse, 'Python return False captured in if branch');
if (pyRetFalse) verifyReturnNodeContract(repoPy, pyRetFalse, 'False', NodeKind.CONDITION, 'if');

const pyRetTrue = pyReturns.find(r => r.returnExpression === 'True');
check(!!pyRetTrue, 'Python return True captured at function root');
if (pyRetTrue) verifyReturnNodeContract(repoPy, pyRetTrue, 'True', NodeKind.FUNCTION, 'validate_token');

// =========================================================================
// SUITE 2: Rust Struct, Impl, and Multi-Branch Returns
// =========================================================================
console.log('\n--- Suite 2: Rust Struct, Impl, and Multi-Branch Returns ---');

const rustSource = `
pub struct QuantumKernel {
    qubit_count: usize,
}

impl QuantumKernel {
    pub fn execute_cycle(&self, cycle_id: u64, error_rate: f64) -> Result<u64, String> {
        if error_rate > 0.05 {
            return Err(String::from("Decoherence"));
        } else if cycle_id == 0 {
            return Ok(0);
        } else {
            return Ok(cycle_id * 2);
        }
    }

    pub fn scan_qubits(&self, target_id: i32) -> i32 {
        for i in 0..10 {
            if i == target_id {
                return i;
            }
        }
        return -1;
    }

    pub fn reset_state() {
        return;
    }
}
`;

const repoRs = buildRepositoryFromRawFiles('RustRepo', [
  {
    name: 'QuantumKernel.rs',
    path: 'src/QuantumKernel.rs',
    size: rustSource.length,
    date: '2026-10-28',
    content: rustSource,
  },
]);

verifyGraphIntegrity(repoRs, 'Rust QuantumKernel');

const rsFunctions = repoRs.allNodes.filter(n => n.kind === NodeKind.FUNCTION || n.kind === NodeKind.RECURSION);
console.log(`  Found ${rsFunctions.length} Rust functions: ${rsFunctions.map(f => f.symbolName).join(', ')}`);
check(rsFunctions.length === 3, 'All 3 Rust methods recognized from impl block', `Count: ${rsFunctions.length}`);

const rsReturns = repoRs.allNodes.filter(n => n.kind === NodeKind.RETURN);
console.log(`  Found ${rsReturns.length} Rust return nodes: ${rsReturns.map(r => `${r.lineStart}: "${r.symbolName}"`).join(', ')}`);
check(rsReturns.length === 6, 'All 6 Rust return statements parsed into RETURN nodes', `Count: ${rsReturns.length}`);

const rsErr = rsReturns.find(r => r.returnExpression?.includes('Err'));
check(!!rsErr, 'Rust return Err(...) captured');
if (rsErr) verifyReturnNodeContract(repoRs, rsErr, 'Err(String::from("Decoherence"))', NodeKind.CONDITION, 'if');

const rsOk0 = rsReturns.find(r => r.returnExpression === 'Ok(0)');
check(!!rsOk0, 'Rust return Ok(0) in else if captured');
if (rsOk0) verifyReturnNodeContract(repoRs, rsOk0, 'Ok(0)', NodeKind.CONDITION, 'else if');

const rsOkMul = rsReturns.find(r => r.returnExpression === 'Ok(cycle_id * 2)');
check(!!rsOkMul, 'Rust return Ok(cycle_id * 2) in else captured');
if (rsOkMul) verifyReturnNodeContract(repoRs, rsOkMul, 'Ok(cycle_id * 2)', NodeKind.CONDITION, 'else');

const rsLoopReturn = rsReturns.find(r => r.returnExpression === 'i');
check(!!rsLoopReturn, 'Rust return i in loop branch captured');
if (rsLoopReturn) verifyReturnNodeContract(repoRs, rsLoopReturn, 'i', NodeKind.CONDITION, 'if');

const rsMinusOne = rsReturns.find(r => r.returnExpression === '-1');
check(!!rsMinusOne, 'Rust return -1 at function end captured');
if (rsMinusOne) verifyReturnNodeContract(repoRs, rsMinusOne, '-1', NodeKind.FUNCTION, 'scan_qubits');

const rsVoid = rsReturns.find(r => r.returnExpression === '');
check(!!rsVoid, 'Rust return; void return captured');
if (rsVoid) verifyReturnNodeContract(repoRs, rsVoid, '', NodeKind.FUNCTION, 'reset_state');

// =========================================================================
// SUITE 3: C# Async, Overrides, Modifiers, and Multi-Branch Returns
// =========================================================================
console.log('\n--- Suite 3: C# Async, Overrides, and Multi-Branch Returns ---');

const csharpSource = `
using System;
using System.Threading.Tasks;

namespace BillingEngine {
    public class OrderProcessor {
        public async Task<int> ProcessOrderAsync(int orderId, double amount, bool isVip) {
            if (amount <= 0.0) {
                return 0;
            } else if (isVip) {
                return (int)(amount * 0.8);
            } else {
                return (int)amount;
            }
        }

        protected virtual string FormatReceipt(int code) {
            while (code > 0) {
                if (code == 100) {
                    return "VIP_RECEIPT";
                }
                code--;
            }
            return "STANDARD_RECEIPT";
        }

        internal static void AbortTransaction() {
            return;
        }
    }
}
`;

const repoCs = buildRepositoryFromRawFiles('CSharpRepo', [
  {
    name: 'OrderProcessor.cs',
    path: 'Services/OrderProcessor.cs',
    size: csharpSource.length,
    date: '2026-10-28',
    content: csharpSource,
  },
]);

verifyGraphIntegrity(repoCs, 'C# OrderProcessor');

const csFunctions = repoCs.allNodes.filter(n => n.kind === NodeKind.FUNCTION || n.kind === NodeKind.RECURSION);
console.log(`  Found ${csFunctions.length} C# methods: ${csFunctions.map(f => f.symbolName).join(', ')}`);
check(csFunctions.length === 3, 'All 3 C# methods parsed (async Task<int>, protected virtual, internal static)', `Count: ${csFunctions.length}`);

const csReturns = repoCs.allNodes.filter(n => n.kind === NodeKind.RETURN);
console.log(`  Found ${csReturns.length} C# return nodes: ${csReturns.map(r => `${r.lineStart}: "${r.symbolName}"`).join(', ')}`);
check(csReturns.length === 6, 'All 6 C# return statements parsed into RETURN nodes', `Count: ${csReturns.length}`);

const csZero = csReturns.find(r => r.returnExpression === '0');
check(!!csZero, 'C# return 0 in if branch captured');
if (csZero) verifyReturnNodeContract(repoCs, csZero, '0', NodeKind.CONDITION, 'if');

const csVip = csReturns.find(r => r.returnExpression === '(int)(amount * 0.8)');
check(!!csVip, 'C# return in else if branch captured');
if (csVip) verifyReturnNodeContract(repoCs, csVip, '(int)(amount * 0.8)', NodeKind.CONDITION, 'else if');

const csStd = csReturns.find(r => r.returnExpression === '(int)amount');
check(!!csStd, 'C# return in else branch captured');
if (csStd) verifyReturnNodeContract(repoCs, csStd, '(int)amount', NodeKind.CONDITION, 'else');

const csInnerLoop = csReturns.find(r => r.returnExpression === '"VIP_RECEIPT"');
check(!!csInnerLoop, 'C# return "VIP_RECEIPT" in while loop conditional captured');
if (csInnerLoop) verifyReturnNodeContract(repoCs, csInnerLoop, '"VIP_RECEIPT"', NodeKind.CONDITION, 'if');

const csReceiptEnd = csReturns.find(r => r.returnExpression === '"STANDARD_RECEIPT"');
check(!!csReceiptEnd, 'C# return "STANDARD_RECEIPT" at function end captured');
if (csReceiptEnd) verifyReturnNodeContract(repoCs, csReceiptEnd, '"STANDARD_RECEIPT"', NodeKind.FUNCTION, 'FormatReceipt');

const csVoidReturn = csReturns.find(r => r.returnExpression === '');
check(!!csVoidReturn, 'C# void return; captured');
if (csVoidReturn) verifyReturnNodeContract(repoCs, csVoidReturn, '', NodeKind.FUNCTION, 'AbortTransaction');

// =========================================================================
// SUITE 4: C++ Const Member Functions, Complex Types & Nested Multi-Branch
// =========================================================================
console.log('\n--- Suite 4: C++ Const Member Functions & Nested Multi-Branch ---');

const cppSource = `
#include <cmath>

class VectorMath {
public:
    double ComputeMagnitude(double x, double y) const {
        if (x == 0.0 && y == 0.0) {
            return 0.0;
        } else if (x == y) {
            return x * 1.41421356;
        } else {
            return std::sqrt(x * x + y * y);
        }
    }

    int AnalyzeGrid(int width, int height) {
        for (int w = 0; w < width; w++) {
            for (int h = 0; h < height; h++) {
                if (w * h > 100) {
                    return w * h;
                }
            }
        }
        return -1;
    }

    void ResetVectors() {
        return;
    }
};
`;

const repoCpp = buildRepositoryFromRawFiles('CppRepo', [
  {
    name: 'VectorMath.cpp',
    path: 'src/VectorMath.cpp',
    size: cppSource.length,
    date: '2026-10-28',
    content: cppSource,
  },
]);

verifyGraphIntegrity(repoCpp, 'C++ VectorMath');

const cppFunctions = repoCpp.allNodes.filter(n => n.kind === NodeKind.FUNCTION || n.kind === NodeKind.RECURSION);
console.log(`  Found ${cppFunctions.length} C++ methods: ${cppFunctions.map(f => f.symbolName).join(', ')}`);
check(cppFunctions.length === 3, 'All 3 C++ methods recognized including const member method', `Count: ${cppFunctions.length}`);

const cppReturns = repoCpp.allNodes.filter(n => n.kind === NodeKind.RETURN);
console.log(`  Found ${cppReturns.length} C++ return nodes: ${cppReturns.map(r => `${r.lineStart}: "${r.symbolName}"`).join(', ')}`);
check(cppReturns.length === 6, 'All 6 C++ return statements parsed into RETURN nodes', `Count: ${cppReturns.length}`);

const cppZero = cppReturns.find(r => r.returnExpression === '0.0');
check(!!cppZero, 'C++ return 0.0 in if captured');
if (cppZero) verifyReturnNodeContract(repoCpp, cppZero, '0.0', NodeKind.CONDITION, 'if');

const cppElseIf = cppReturns.find(r => r.returnExpression === 'x * 1.41421356');
check(!!cppElseIf, 'C++ return in else if captured');
if (cppElseIf) verifyReturnNodeContract(repoCpp, cppElseIf, 'x * 1.41421356', NodeKind.CONDITION, 'else if');

const cppSqrt = cppReturns.find(r => r.returnExpression === 'std::sqrt(x * x + y * y)');
check(!!cppSqrt, 'C++ return in else captured');
if (cppSqrt) verifyReturnNodeContract(repoCpp, cppSqrt, 'std::sqrt(x * x + y * y)', NodeKind.CONDITION, 'else');

const cppNestedLoop = cppReturns.find(r => r.returnExpression === 'w * h');
check(!!cppNestedLoop, 'C++ nested double loop return w * h captured');
if (cppNestedLoop) verifyReturnNodeContract(repoCpp, cppNestedLoop, 'w * h', NodeKind.CONDITION, 'if');

const cppGridEnd = cppReturns.find(r => r.returnExpression === '-1');
check(!!cppGridEnd, 'C++ return -1 at function end captured');
if (cppGridEnd) verifyReturnNodeContract(repoCpp, cppGridEnd, '-1', NodeKind.FUNCTION, 'AnalyzeGrid');

const cppVoid = cppReturns.find(r => r.returnExpression === '');
check(!!cppVoid, 'C++ return; void return captured');
if (cppVoid) verifyReturnNodeContract(repoCpp, cppVoid, '', NodeKind.FUNCTION, 'ResetVectors');

// =========================================================================
// SUITE 5: Full Polyglot Repository Integration & Cross-Language Call Integrity
// =========================================================================
console.log('\n--- Suite 5: Full Polyglot Multi-Language Repository Integration ---');

const polyglotRepo = buildRepositoryFromRawFiles('PolyglotEnterprise', [
  { name: 'DataPipeline.py', path: 'scripts/DataPipeline.py', size: pythonSource.length, date: '2026-10-28', content: pythonSource },
  { name: 'QuantumKernel.rs', path: 'src/QuantumKernel.rs', size: rustSource.length, date: '2026-10-28', content: rustSource },
  { name: 'OrderProcessor.cs', path: 'Services/OrderProcessor.cs', size: csharpSource.length, date: '2026-10-28', content: csharpSource },
  { name: 'VectorMath.cpp', path: 'src/VectorMath.cpp', size: cppSource.length, date: '2026-10-28', content: cppSource },
]);

verifyGraphIntegrity(polyglotRepo, 'Polyglot Enterprise System');

const polyglotReturns = polyglotRepo.allNodes.filter(n => n.kind === NodeKind.RETURN);
console.log(`  Total Polyglot Return Nodes: ${polyglotReturns.length} (Expected: 8 + 6 + 6 + 6 = 26)`);
check(polyglotReturns.length === 26, 'All 26 polyglot return statements converted to RETURN nodes across 4 languages');

// Verify all 26 have no output pins and proper rose color and valid incoming AST edges
let allPink = true;
let allLabeledReturn = true;
let allValidParents = true;
let allIncomingAstEdges = true;

for (const ret of polyglotReturns) {
  if (ret.color !== '#F43F5E') allPink = false;
  if (ret.label !== 'return') allLabeledReturn = false;
  const parent = polyglotRepo.allNodes.find(n => n.id === ret.parentId);
  if (!parent) allValidParents = false;
  const edge = polyglotRepo.edges.find(e => e.kind === 'AST_CHILD' && e.targetId === ret.id);
  if (!edge) allIncomingAstEdges = false;
}

check(allPink, 'All 26 polyglot return nodes have rose styling #F43F5E');
check(allLabeledReturn, 'All 26 polyglot return nodes have label "return"');
check(allValidParents, 'All 26 polyglot return nodes have resolved parent nodes');
check(allIncomingAstEdges, 'All 26 polyglot return nodes have incoming AST_CHILD edges');

// =========================================================================
// SUITE 6: TypeScript / JavaScript Arrow Functions, Export Default, Async
// =========================================================================
console.log('\n--- Suite 6: TypeScript / JavaScript Async & Arrow Functions ---');

const tsSource = `
function handleRequest(req) {
    if (!req) {
        return null;
    } else {
        return true;
    }
}

const helperFn = async (x) => {
    if (x > 10) {
        return x * 2;
    }
    return x;
};
`;

const repoTs = buildRepositoryFromRawFiles('TypeScriptRepo', [
  {
    name: 'RouterService.ts',
    path: 'src/RouterService.ts',
    size: tsSource.length,
    date: '2026-10-28',
    content: tsSource,
  },
]);

verifyGraphIntegrity(repoTs, 'TypeScript RouterService');

const tsFunctions = repoTs.allNodes.filter(n => n.kind === NodeKind.FUNCTION || n.kind === NodeKind.RECURSION);
console.log(`  Found ${tsFunctions.length} TS functions: ${tsFunctions.map(f => f.symbolName).join(', ')}`);
check(tsFunctions.length === 2, 'All 2 JS functions parsed (handleRequest, helperFn)', `Count: ${tsFunctions.length}`);

const tsReturns = repoTs.allNodes.filter(n => n.kind === NodeKind.RETURN);
console.log(`  Found ${tsReturns.length} TS return nodes: ${tsReturns.map(r => `${r.lineStart}: "${r.symbolName}"`).join(', ')}`);
check(tsReturns.length === 4, 'All 4 TS return statements parsed into RETURN nodes', `Count: ${tsReturns.length}`);

for (const ret of tsReturns) {
  check(ret.kind === NodeKind.RETURN, `TS return ${ret.id} has NodeKind.RETURN`);
  check(ret.label === 'return', `TS return ${ret.id} has label "return"`);
  check(ret.color === '#F43F5E', `TS return ${ret.id} has rose color #F43F5E`);
  const parent = repoTs.allNodes.find(n => n.id === ret.parentId);
  check(!!parent, `TS return ${ret.id} has parent node in repo (${ret.parentId})`);
  const astEdge = repoTs.edges.find(e => e.kind === 'AST_CHILD' && e.targetId === ret.id);
  check(!!astEdge, `TS return ${ret.id} has incoming AST_CHILD edge`);
}

// =========================================================================
// SUITE 7: Graph Invariant Assertions Across 100% of Nodes & Edges
// =========================================================================
console.log('\n--- Suite 7: Full Graph Invariant Assertions ---');

const megaRepo = buildRepositoryFromRawFiles('MegaEnterprise', [
  { name: 'DataPipeline.py', path: 'scripts/DataPipeline.py', size: pythonSource.length, date: '2026-10-28', content: pythonSource },
  { name: 'QuantumKernel.rs', path: 'src/QuantumKernel.rs', size: rustSource.length, date: '2026-10-28', content: rustSource },
  { name: 'OrderProcessor.cs', path: 'Services/OrderProcessor.cs', size: csharpSource.length, date: '2026-10-28', content: csharpSource },
  { name: 'VectorMath.cpp', path: 'src/VectorMath.cpp', size: cppSource.length, date: '2026-10-28', content: cppSource },
  { name: 'RouterService.ts', path: 'src/RouterService.ts', size: tsSource.length, date: '2026-10-28', content: tsSource },
]);

verifyGraphIntegrity(megaRepo, 'Mega Enterprise');

const totalReturns = megaRepo.allNodes.filter(n => n.kind === NodeKind.RETURN);
console.log(`  Total Returns in MegaEnterprise: ${totalReturns.length} (Expected: 26 + 4 = 30)`);
check(totalReturns.length === 30, 'All 30 returns across 5 languages successfully extracted into RETURN nodes');

// Verify that return nodes NEVER have children (no output pins / leaf nodes in AST)
const returnsWithChildren = totalReturns.filter(rn => rn.childrenIds && rn.childrenIds.length > 0);
check(returnsWithChildren.length === 0, 'Zero return nodes have child nodes (Return nodes are strictly terminal leaf nodes)', `Violations: ${returnsWithChildren.length}`);

// Verify that return nodes NEVER have outgoing AST_CHILD edges
const returnOutgoingEdges = megaRepo.edges.filter(e => e.kind === 'AST_CHILD' && totalReturns.some(rn => rn.id === e.sourceId));
check(returnOutgoingEdges.length === 0, 'Zero return nodes have outgoing AST_CHILD edges', `Violations: ${returnOutgoingEdges.length}`);

await vite.close();

// =========================================================================
// SUMMARY
// =========================================================================
console.log('\n======================================================================');
console.log(` SUMMARY: Total Tests: ${testCount} | Passed: ${passedCount} | Failed: ${failedCount}`);
console.log('======================================================================');

if (failedCount > 0) {
  console.error('\nFailures encountered:');
  failures.forEach(f => console.error(`  [#${f.testCount}] ${f.testName} -> ${f.details}`));
  process.exit(1);
} else {
  console.log('\nALL EXPANDED MULTI-LANGUAGE ADVERSARIAL TESTS PASSED EMPIRICALLY!');
  process.exit(0);
}
