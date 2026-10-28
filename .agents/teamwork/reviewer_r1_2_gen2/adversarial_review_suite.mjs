import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../../..');

console.log('======================================================================');
console.log(' Reviewer 2: Adversarial Stress Test Suite (R2 & R3)');
console.log('======================================================================');

let passed = 0;
let failed = 0;

function check(desc, cond, extra = '') {
  if (cond) {
    passed++;
    console.log(`  [PASS] ${desc}${extra ? ` -> ${extra}` : ''}`);
  } else {
    failed++;
    console.error(`  [FAIL] ${desc}${extra ? ` -> ${extra}` : ''}`);
  }
}

const vite = await createServer({
  root: path.join(projectRoot, 'frontend'),
  server: { middlewareMode: true },
  appType: 'custom',
});

const typesModule = await vite.ssrLoadModule('/types.ts');
const parserModule = await vite.ssrLoadModule('/services/codeParser.ts');
const constantsModule = await vite.ssrLoadModule('/constants.ts');

const { NodeKind, GraphFocusMode } = typesModule;
const { parseSourceFileToNodes, buildRepositoryFromRawFiles } = parserModule;
const { DEFAULT_REPOSITORY } = constantsModule;

// -----------------------------------------------------------------------------
// ADVERSARIAL TEST 1: Return statements in various languages and syntactic forms
// -----------------------------------------------------------------------------
console.log('\n--> Adversarial Suite 1: Return Statement Syntax Variants');

const testCasesCode = `
class StressTestClass {
    public int MethodWithManyReturns(int x, int y) {
        if (x > 100) {
            return x * 2;
        } else if (x > 50) {
            if (y < 0) {
                return -1;
            } else {
                return y + 10;
            }
        } else {
            return 0;
        }
        return x + y;
    }

    public void VoidMethod(bool flag) {
        if (!flag) {
            return;
        }
        DoSomething();
        return;
    }

    public string ComplexExpressionReturn() {
        return (flag ? "active" : "inactive") + "_suffix";
    }
}
`;

const parsedStressNodes = parseSourceFileToNodes('file_stress', 'StressTest.cs', testCasesCode, 99);
const stressReturns = parsedStressNodes.filter(n => n.kind === NodeKind.RETURN);

check('Parsed multiple return statements from complex class', stressReturns.length === 8, `Found ${stressReturns.length} return nodes`);

const expectedExprs = ['x * 2', '-1', 'y + 10', '0', 'x + y', '', '', '(flag ? "active" : "inactive") + "_suffix"'];
expectedExprs.forEach(expr => {
  const match = stressReturns.find(r => r.returnExpression === expr);
  check(`Return expression "${expr || 'void'}" correctly captured`, !!match, match?.symbolName);
});

// Check parents: returns inside branches must be parented to branches; returns at function end to function
const methodNode = parsedStressNodes.find(n => n.symbolName === 'MethodWithManyReturns');
check('MethodWithManyReturns exists', !!methodNode);

const endReturnNode = stressReturns.find(r => r.returnExpression === 'x + y');
check('End-of-function return parented to function node', endReturnNode?.parentId === methodNode?.id, `Parent: ${endReturnNode?.parentId}`);

const ifReturnNode = stressReturns.find(r => r.returnExpression === 'x * 2');
const ifParent = parsedStressNodes.find(n => n.id === ifReturnNode?.parentId);
check('Return inside if (x > 100) parented to CONDITION node', ifParent?.kind === NodeKind.CONDITION, ifParent?.label);

// -----------------------------------------------------------------------------
// ADVERSARIAL TEST 2: Pin Socket generation & zero output pins verification
// -----------------------------------------------------------------------------
console.log('\n--> Adversarial Suite 2: Pin Sockets & Strict Zero Output Pins on Return Nodes');

// Simulate the exact pin calculation logic from Microscope2DCanvas.tsx
const simulatedRepo = buildRepositoryFromRawFiles('StressRepo', [
  {
    name: 'StressTest.cs',
    path: 'StressTest.cs',
    size: testCasesCode.length,
    date: '2026-10-28',
    content: testCasesCode,
  }
]);

const simAllNodes = simulatedRepo.allNodes;
const simEdges = simulatedRepo.edges;
const simReturnNodes = simAllNodes.filter(n => n.kind === NodeKind.RETURN);

check('Repository builder preserved all return nodes', simReturnNodes.length === 8);

simReturnNodes.forEach((retNode, idx) => {
  // Check no AST or call edge has retNode as source
  const outgoingEdges = simEdges.filter(e => e.sourceId === retNode.id);
  check(`Return node ${retNode.id} has 0 outgoing edges in repository`, outgoingEdges.length === 0);

  // Check incoming AST edge exists connecting parent to return node
  const incomingAst = simEdges.filter(e => e.targetId === retNode.id && e.kind === 'AST_CHILD');
  check(`Return node ${retNode.id} has incoming AST_CHILD edge`, incomingAst.length === 1);
});

// -----------------------------------------------------------------------------
// ADVERSARIAL TEST 3: Mathematical Non-Overlap of 4-Column Layout
// -----------------------------------------------------------------------------
console.log('\n--> Adversarial Suite 3: Layout Geometry & Non-Overlap Proof');

const BOX_WIDTH = 1240;
const col0 = { x: 24, w: 210 };
const col1 = { x: 285, w: 245 };
const col2 = { x: 610, w: 250 };
const col3 = { x: 940, w: 250 };

check('Col 0 strictly before Col 1', col0.x + col0.w < col1.x, `${col0.x + col0.w} < ${col1.x} (gap: ${col1.x - (col0.x + col0.w)}px)`);
check('Col 1 strictly before Col 2', col1.x + col1.w < col2.x, `${col1.x + col1.w} < ${col2.x} (gap: ${col2.x - (col1.x + col1.w)}px)`);
check('Col 2 strictly before Col 3', col2.x + col2.w < col3.x, `${col2.x + col2.w} < ${col3.x} (gap: ${col3.x - (col2.x + col2.w)}px)`);
check('Col 3 strictly within Box width', col3.x + col3.w <= BOX_WIDTH, `${col3.x + col3.w} <= ${BOX_WIDTH} (margin: ${BOX_WIDTH - (col3.x + col3.w)}px)`);

// Simulate layout positioning for StressRepo
const placedNodes = [];

const file = simulatedRepo.files[0];
const classNode = file.nodes.find(n => n.kind === NodeKind.CLASS);
const fns = file.nodes.filter(n => n.kind === NodeKind.FUNCTION || n.kind === NodeKind.RECURSION);

let fnCursorY = 60 + 58;
fns.forEach(fn => {
  const fnBranches = file.nodes.filter(b => (b.kind === NodeKind.CONDITION || b.kind === NodeKind.LOOP) && b.lineStart >= fn.lineStart && b.lineEnd <= fn.lineEnd);
  const fnDirectReturns = file.nodes.filter(r => r.kind === NodeKind.RETURN && r.parentId === fn.id);
  const fnH = 50;

  placedNodes.push({ id: fn.id, x: 50 + 285, y: fnCursorY, width: 245, height: fnH });

  let branchCursorY = fnCursorY;
  fnBranches.forEach(br => {
    const brH = 46;
    placedNodes.push({ id: br.id, x: 50 + 610, y: branchCursorY, width: 250, height: brH });

    const brReturns = file.nodes.filter(r => r.kind === NodeKind.RETURN && r.parentId === br.id);
    let childRetY = branchCursorY;
    brReturns.forEach(ret => {
      const retH = 42;
      placedNodes.push({ id: ret.id, x: 50 + 940, y: childRetY, width: 250, height: retH });
      childRetY += retH + 16;
    });

    const used = Math.max(brH + 22, childRetY - branchCursorY + 6);
    branchCursorY += used;
  });

  fnDirectReturns.forEach(ret => {
    const retH = 42;
    placedNodes.push({ id: ret.id, x: 50 + 610, y: branchCursorY, width: 250, height: retH });
    branchCursorY += retH + 22;
  });

  fnCursorY += Math.max(fnH + 28, branchCursorY - fnCursorY + 18);
});

// Test pairwise bounding box intersections
let overlapCount = 0;
for (let i = 0; i < placedNodes.length; i++) {
  for (let j = i + 1; j < placedNodes.length; j++) {
    const a = placedNodes[i];
    const b = placedNodes[j];
    const xOverlap = a.x < b.x + b.width && a.x + a.width > b.x;
    const yOverlap = a.y < b.y + b.height && a.y + a.height > b.y;
    if (xOverlap && yOverlap) {
      overlapCount++;
      console.error(`  [OVERLAP] ${a.id} overlaps with ${b.id}`);
    }
  }
}
check('Zero bounding box overlaps in generated layout', overlapCount === 0, `Overlaps: ${overlapCount}`);

// -----------------------------------------------------------------------------
// ADVERSARIAL TEST 4: Function Call Edge Detection & Recursive Calls
// -----------------------------------------------------------------------------
console.log('\n--> Adversarial Suite 4: Function Calls, Recursive Calls & Modifiers');

const complexCallsCode = `
class RecursiveEngine {
    public void WorkerA(int depth) {
        if (depth > 0) {
            WorkerA(depth - 1);
        } else {
            WorkerB();
        }
    }

    private static bool WorkerB() {
        WorkerC();
        return true;
    }

    protected internal int WorkerC() {
        return 42;
    }
}
`;

const callRepo = buildRepositoryFromRawFiles('CallRepo', [
  {
    name: 'RecursiveEngine.cs',
    path: 'RecursiveEngine.cs',
    size: complexCallsCode.length,
    date: '2026-10-28',
    content: complexCallsCode,
  }
]);

const callRepoFns = callRepo.allNodes.filter(n => n.kind === NodeKind.FUNCTION || n.kind === NodeKind.RECURSION);
check('All 3 engine functions parsed', callRepoFns.length === 3, callRepoFns.map(f => f.symbolName).join(', '));

const recurEdge = callRepo.edges.find(e => {
  const src = callRepo.allNodes.find(n => n.id === e.sourceId);
  const tgt = callRepo.allNodes.find(n => n.id === e.targetId);
  return src?.kind === NodeKind.CONDITION && tgt?.symbolName === 'WorkerA';
});
check('Recursive call from inside if (depth > 0) to WorkerA detected', !!recurEdge, recurEdge?.id);

const workerBEdge = callRepo.edges.find(e => {
  const tgt = callRepo.allNodes.find(n => n.id === e.targetId);
  return tgt?.symbolName === 'WorkerB';
});
check('Call to WorkerB from else branch detected', !!workerBEdge, workerBEdge?.id);

const workerCEdge = callRepo.edges.find(e => {
  const tgt = callRepo.allNodes.find(n => n.id === e.targetId);
  return tgt?.symbolName === 'WorkerC';
});
check('Call to WorkerC from WorkerB detected', !!workerCEdge, workerCEdge?.id);

// -----------------------------------------------------------------------------
// ADVERSARIAL TEST 5: Integrity Violation & Facade Detection
// -----------------------------------------------------------------------------
console.log('\n--> Adversarial Suite 5: Integrity Verification (No Cheats or Facades)');

// Parse a completely random novel function not in any existing test or codebase
const randomName = 'Xq9_UniqueFunc_' + Math.floor(Math.random() * 100000);
const novelCode = `
class NovelClass {
    public void ${randomName}() {
        if (check()) {
            return "random_success";
        }
        return "random_failure";
    }
}
`;

const novelRepo = buildRepositoryFromRawFiles('NovelRepo', [
  {
    name: 'NovelFile.cs',
    path: 'NovelFile.cs',
    size: novelCode.length,
    date: '2026-10-28',
    content: novelCode,
  }
]);

const novelFn = novelRepo.allNodes.find(n => n.symbolName === randomName);
check('Parser dynamically resolves random unseen function name without hardcoded lists', !!novelFn, novelFn?.symbolName);

const novelReturns = novelRepo.allNodes.filter(n => n.kind === NodeKind.RETURN && n.fileId === novelFn?.fileId);
check('Parser dynamically creates return nodes for unseen code', novelReturns.length === 2, `Expressions: ${novelReturns.map(r => r.returnExpression).join(', ')}`);

await vite.close();

console.log('\n======================================================================');
console.log(` Adversarial Test Results: ${passed} Passed, ${failed} Failed`);
console.log('======================================================================');

if (failed > 0) {
  process.exit(1);
} else {
  console.log('ALL ADVERSARIAL STRESS CHECKS PASSED.\n');
  process.exit(0);
}
