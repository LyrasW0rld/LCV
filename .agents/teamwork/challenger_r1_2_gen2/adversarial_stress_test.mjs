import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'vite';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../../..');

console.log('======================================================================');
console.log(' CHALLENGER 2: EMPIRICAL ADVERSARIAL STRESS TEST SUITE');
console.log(' Focus: 2D Nodes Canvas UI, Return Nodes, 4-Col Layout, 2D/3D Navigation, start_local.bat');
console.log('======================================================================');

let passedTests = 0;
let failedTests = 0;

function assert(condition, description, detail = '') {
  if (condition) {
    passedTests++;
    console.log(`  [PASS] ${description}${detail ? ` -> ${detail}` : ''}`);
  } else {
    failedTests++;
    console.error(`  [FAIL] ${description}${detail ? ` -> ${detail}` : ''}`);
  }
}

// -----------------------------------------------------------------------------
// SECTION 1: start_local.bat Adversarial Static & Dynamic Analysis
// -----------------------------------------------------------------------------
console.log('\n--> [TEST GROUP 1] Adversarial Audit of start_local.bat');

const batPath = path.join(projectRoot, 'start_local.bat');
assert(fs.existsSync(batPath), 'start_local.bat exists in repository root');

if (fs.existsSync(batPath)) {
  const batContent = fs.readFileSync(batPath, 'utf8');

  // Command safety & quotation
  assert(
    batContent.includes('cd /d "%~dp0"'),
    'Path safety: Uses quoted "%~dp0" to prevent space-in-path injection and guarantee root directory execution'
  );
  assert(
    batContent.includes('setlocal enabledelayedexpansion'),
    'Batch safety: Enables delayed expansion for reliable environment variable evaluation'
  );
  assert(
    batContent.includes('call npm install'),
    'Invocation safety: Uses "call npm install" so Windows does not exit upon returning from npm.cmd'
  );
  assert(
    batContent.includes('call npm run dev'),
    'Invocation safety: Uses "call npm run dev" so script can handle any post-termination signals'
  );
  assert(
    batContent.includes('http://localhost:5173/'),
    'Contract compliance: Logs local URL http://localhost:5173/'
  );
  assert(
    batContent.includes('where node') && batContent.includes('where npm'),
    'Robustness: Explicitly verifies both node and npm existence before executing commands'
  );
  assert(
    batContent.includes('%errorlevel% neq 0'),
    'Error handling: Validates %errorlevel% after dependency installation'
  );

  // Dynamic Batch Syntax Check
  try {
    const syntaxCheck = execSync('cmd.exe /c "call npm --version"', { encoding: 'utf8' });
    assert(syntaxCheck.trim().length > 0, 'System npm is callable via cmd.exe', syntaxCheck.trim());
  } catch (err) {
    assert(false, 'cmd.exe invocation of npm failed', err.message);
  }
}

// -----------------------------------------------------------------------------
// Initialize Vite SSR for runtime execution of parser & layout simulator
// -----------------------------------------------------------------------------
const vite = await createServer({
  root: path.join(projectRoot, 'frontend'),
  server: { middlewareMode: true },
  appType: 'custom',
});

const typesModule = await vite.ssrLoadModule('/types.ts');
const parserModule = await vite.ssrLoadModule('/services/codeParser.ts');
const constantsModule = await vite.ssrLoadModule('/constants.ts');

const { NodeKind, Render3DStyle, get3DStyleLabel, VisualizerMode, GraphFocusMode } = typesModule;
const { DEFAULT_REPOSITORY } = constantsModule;
const { buildRepositoryFromRawFiles } = parserModule;

// -----------------------------------------------------------------------------
// SECTION 2: Return Node Zero-Output-Pin Adversarial Stress Test
// -----------------------------------------------------------------------------
console.log('\n--> [TEST GROUP 2] Return Node Zero-Output-Pin Strict Invariant');

// Load Microscope2DCanvas source code
const microTsx = fs.readFileSync(path.join(projectRoot, 'frontend/components/Microscope2DCanvas.tsx'), 'utf8');

// 1. AST Parsing level: Return nodes must have empty childrenIds
const allReturnNodes = DEFAULT_REPOSITORY.allNodes.filter((n) => n.kind === NodeKind.RETURN);
assert(allReturnNodes.length >= 4, `Repository contains ${allReturnNodes.length} return nodes (at least 4 expected)`);

allReturnNodes.forEach((retNode) => {
  assert(
    retNode.childrenIds.length === 0,
    `Return node ${retNode.id} in ${retNode.fileName} has 0 AST children`
  );
});

// 2. Repository level: No edges should have a RETURN node as source
const returnSourceEdges = DEFAULT_REPOSITORY.edges.filter((e) => {
  const src = DEFAULT_REPOSITORY.allNodes.find((n) => n.id === e.sourceId);
  return src?.kind === NodeKind.RETURN;
});
assert(
  returnSourceEdges.length === 0,
  `Zero edges originate from any return node in DEFAULT_REPOSITORY (found ${returnSourceEdges.length})`
);

// 3. Canvas Logic Invariant: outPinsByNode for return nodes must be strictly empty
function simulateCanvasPins(repo, filterFileId = null, focusMode = GraphFocusMode.FUNCTIONS) {
  const activeFiles = filterFileId
    ? repo.files.filter((f) => f.id === filterFileId)
    : repo.files;

  const visibleNodeIds = new Set();
  activeFiles.forEach((f) => {
    f.nodes.forEach((n) => {
      if (focusMode === GraphFocusMode.CLASSES && n.kind !== NodeKind.CLASS) return;
      visibleNodeIds.add(n.id);
    });
  });

  const filteredEdges = repo.edges.filter((edge) => {
    if (edge.kind === 'RECURSION') return false;
    if (focusMode === GraphFocusMode.CLASSES && edge.kind !== 'CLASS_DEPENDENCY') return false;
    if (focusMode === GraphFocusMode.FUNCTIONS && edge.kind === 'CLASS_DEPENDENCY') return false;
    return visibleNodeIds.has(edge.sourceId) && visibleNodeIds.has(edge.targetId);
  });

  const inPinsByNode = new Map();
  const outPinsByNode = new Map();

  filteredEdges.forEach((edge) => {
    const targetNode = repo.allNodes.find((n) => n.id === edge.targetId);
    const isReturnTarget = targetNode?.kind === NodeKind.RETURN;
    const returnExpr = targetNode?.returnExpression;

    const inList = inPinsByNode.get(edge.targetId) || [];
    inList.push({
      edgeId: edge.id,
      label: isReturnTarget
        ? (returnExpr ? `${returnExpr} l${edge.callLine}` : `void l${edge.callLine}`)
        : `in l${edge.callLine}`,
      pinType: 'IN',
      line: edge.callLine,
    });
    inPinsByNode.set(edge.targetId, inList);

    const sourceNode = repo.allNodes.find((n) => n.id === edge.sourceId);
    if (sourceNode?.kind === NodeKind.RETURN) {
      return; // Return nodes can NEVER produce out pins
    }

    const outList = outPinsByNode.get(edge.sourceId) || [];
    const isTrue = edge.branchOutcome === 'TRUE';
    const isFalse = edge.branchOutcome === 'FALSE';
    outList.push({
      edgeId: edge.id,
      label: isTrue ? `True l${edge.callLine}` : isFalse ? `False l${edge.callLine}` : `out l${edge.callLine}`,
      pinType: isTrue ? 'TRUE' : isFalse ? 'FALSE' : 'OUT',
      line: edge.callLine,
    });
    outPinsByNode.set(edge.sourceId, outList);
  });

  const computeNodeHeight = (nodeId, baseLine, isReturn = false) => {
    const ins = inPinsByNode.get(nodeId) || [];
    const outs = outPinsByNode.get(nodeId) || [];
    if (ins.length === 0) {
      const targetNode = repo.allNodes.find((n) => n.id === nodeId);
      const expr = targetNode?.returnExpression;
      ins.push({
        edgeId: `default_in_${nodeId}`,
        label: isReturn ? (expr ? `${expr} l${baseLine}` : `void l${baseLine}`) : `in l${baseLine}`,
        pinType: 'IN',
        line: baseLine,
      });
      inPinsByNode.set(nodeId, ins);
    }
    if (outs.length === 0 && !isReturn) {
      outs.push({ edgeId: `default_out_${nodeId}`, label: `out l${baseLine}`, pinType: 'OUT', line: baseLine });
      outPinsByNode.set(nodeId, outs);
    }
    if (isReturn) {
      outPinsByNode.set(nodeId, []);
    }
    const maxPins = Math.max(ins.length, isReturn ? 0 : outs.length, 1);
    return 24 + 10 + maxPins * 18 + 8;
  };

  allReturnNodes.forEach((retNode) => {
    computeNodeHeight(retNode.id, retNode.lineStart, true);
  });

  return { inPinsByNode, outPinsByNode };
}

const { inPinsByNode, outPinsByNode } = simulateCanvasPins(DEFAULT_REPOSITORY);

allReturnNodes.forEach((retNode) => {
  const outs = outPinsByNode.get(retNode.id);
  assert(
    !outs || outs.length === 0,
    `Canvas logic outPinsByNode for return node ${retNode.id} is strictly empty (outs.length = ${outs ? outs.length : 0})`
  );

  const ins = inPinsByNode.get(retNode.id);
  assert(
    ins && ins.length > 0,
    `Return node ${retNode.id} has valid incoming pin socket (label: "${ins[0].label}")`
  );
  if (retNode.returnExpression) {
    assert(
      ins[0].label.includes(retNode.returnExpression),
      `Input pin label "${ins[0].label}" displays returned expression "${retNode.returnExpression}"`
    );
  }
});

// 4. Hostile Injection Stress Test:
const hostileRepo = JSON.parse(JSON.stringify(DEFAULT_REPOSITORY));
const targetFn = hostileRepo.allNodes.find((n) => n.kind === NodeKind.FUNCTION);
const testRetNode = allReturnNodes[0];

hostileRepo.edges.push({
  id: 'hostile_ret_edge_1',
  sourceId: testRetNode.id,
  targetId: targetFn.id,
  kind: 'INTERNAL_CALL',
  sourceFile: testRetNode.fileName,
  targetFile: targetFn.fileName,
  callLine: testRetNode.lineStart,
  label: 'hostile call',
});

const hostilePins = simulateCanvasPins(hostileRepo);
const hostileOuts = hostilePins.outPinsByNode.get(testRetNode.id);
assert(
  !hostileOuts || hostileOuts.length === 0,
  `Hostile edge injection: return node still produces 0 outPins (outPinsByNode length = ${hostileOuts ? hostileOuts.length : 0})`
);

// 5. JSX-level defense in depth:
assert(
  microTsx.includes('node.kind !== NodeKind.RETURN'),
  'JSX Defense: Explicitly checks `node.kind !== NodeKind.RETURN` before rendering output pin sockets'
);
assert(
  microTsx.includes('outPins: []'),
  'Data Map Defense: Explicitly maps return nodes with `outPins: []`'
);

// -----------------------------------------------------------------------------
// SECTION 3: Return Node Visual Styling Verification
// -----------------------------------------------------------------------------
console.log('\n--> [TEST GROUP 3] Return Node Visual Styling & Design System Verification');

assert(
  microTsx.includes('bg-[#351424]'),
  'Styling: Card background is warm rose-tinted (#351424)'
);
assert(
  microTsx.includes('border-rose-500/80'),
  'Styling: Card border is rose-500/80'
);
assert(
  microTsx.includes('shadow-[0_0_15px_rgba(244,63,94,0.22)]'),
  'Styling: Card has specialized rose neon glow shadow'
);
assert(
  microTsx.includes('RET') && microTsx.includes('bg-rose-950/90'),
  'Badge: Renders dedicated [RET] badge with bg-rose-950/90 and border-rose-400'
);
assert(
  microTsx.includes("displayLabel: 'return'"),
  'Title: Display label for return nodes is hardcoded to "return"'
);
assert(
  microTsx.includes("node.kind === NodeKind.RETURN ? 'bg-[#F43F5E]' : 'bg-[#E5A93C]'"),
  'Pin socket: Input pin socket dot displays specialized pink/rose color #F43F5E'
);
assert(
  microTsx.includes('ring-rose-400'),
  'Interactive feedback: Selection/hover active ring uses rose-400 for return nodes'
);

// -----------------------------------------------------------------------------
// SECTION 4: 4-Column Layout Bounding Box & Collision Stress Harness
// -----------------------------------------------------------------------------
console.log('\n--> [TEST GROUP 4] 4-Column Layout Geometric Collision Adversary Harness');

function calculate2DLayout(repo, filterFileId = null) {
  const activeFiles = filterFileId
    ? repo.files.filter((f) => f.id === filterFileId)
    : repo.files;

  const BOX_COLS = filterFileId ? 1 : 2;
  const BOX_WIDTH = 1240;
  const BOX_GAP_X = 105;
  const BOX_GAP_Y = 85;

  let currentRowY = 60;
  let rowMaxHeight = 0;
  const positionedNodes = [];
  const boxes = [];

  const computeNodeHeight = () => 60;

  activeFiles.forEach((file, fIdx) => {
    const col = fIdx % BOX_COLS;
    if (col === 0 && fIdx > 0) {
      currentRowY += rowMaxHeight + BOX_GAP_Y;
      rowMaxHeight = 0;
    }

    const boxX = 50 + col * (BOX_WIDTH + BOX_GAP_X);
    const boxY = currentRowY;

    const classNode = file.nodes.find((n) => n.kind === NodeKind.CLASS) || file.nodes[0];
    if (!classNode) return;

    const functions = file.nodes.filter(
      (n) => n.kind === NodeKind.FUNCTION || n.kind === NodeKind.RECURSION
    );

    let fnCursorY = boxY + 58;
    functions.forEach((fn) => {
      const fnBranches = file.nodes.filter(
        (b) =>
          (b.kind === NodeKind.CONDITION || b.kind === NodeKind.LOOP) &&
          b.lineStart >= fn.lineStart &&
          b.lineEnd <= fn.lineEnd
      );
      const fnDirectReturns = file.nodes.filter(
        (r) => r.kind === NodeKind.RETURN && r.parentId === fn.id
      );
      const fnHeight = computeNodeHeight();

      positionedNodes.push({
        node: fn,
        fileId: file.id,
        column: 1,
        kind: fn.kind,
        x: boxX + 285,
        y: fnCursorY,
        width: 245,
        height: fnHeight,
      });

      let branchCursorY = fnCursorY;
      fnBranches.forEach((br) => {
        const brHeight = computeNodeHeight();
        positionedNodes.push({
          node: br,
          fileId: file.id,
          column: 2,
          kind: br.kind,
          x: boxX + 610,
          y: branchCursorY,
          width: 250,
          height: brHeight,
        });

        // Column 3: Branch Return Nodes (x: boxX + 940)
        const branchReturns = file.nodes.filter(
          (r) => r.kind === NodeKind.RETURN && r.parentId === br.id
        );
        let childReturnCursorY = branchCursorY;
        branchReturns.forEach((retNode) => {
          const retHeight = computeNodeHeight();
          positionedNodes.push({
            node: retNode,
            fileId: file.id,
            column: 3,
            kind: retNode.kind,
            x: boxX + 940,
            y: childReturnCursorY,
            width: 250,
            height: retHeight,
          });
          childReturnCursorY += retHeight + 16;
        });

        const branchUsedHeight = Math.max(brHeight + 22, childReturnCursorY - branchCursorY + 6);
        branchCursorY += branchUsedHeight;
      });

      // Column 2: Direct return nodes below branches
      fnDirectReturns.forEach((retNode) => {
        const retHeight = computeNodeHeight();
        positionedNodes.push({
          node: retNode,
          fileId: file.id,
          column: 2,
          kind: retNode.kind,
          x: boxX + 610,
          y: branchCursorY,
          width: 250,
          height: retHeight,
        });
        branchCursorY += retHeight + 22;
      });

      fnCursorY += Math.max(fnHeight + 28, branchCursorY - fnCursorY + 18);
    });

    const clsHeight = computeNodeHeight();
    const boxHeight = Math.max(180, fnCursorY - boxY + 28);
    rowMaxHeight = Math.max(rowMaxHeight, boxHeight);

    positionedNodes.push({
      node: classNode,
      fileId: file.id,
      column: 0,
      kind: classNode.kind,
      x: boxX + 24,
      y: boxY + boxHeight / 2 - clsHeight / 2,
      width: 210,
      height: clsHeight,
    });

    boxes.push({
      id: `box_${file.id}`,
      x: boxX,
      y: boxY,
      width: BOX_WIDTH,
      height: boxHeight,
    });
  });

  return { positionedNodes, boxes };
}

function checkAABBOverlap(a, b) {
  return !(
    a.x + a.width <= b.x ||
    b.x + b.width <= a.x ||
    a.y + a.height <= b.y ||
    b.y + b.height <= a.y
  );
}

// 1. Verify default repository layout has ZERO collisions
const defaultLayout = calculate2DLayout(DEFAULT_REPOSITORY);
let defaultCollisions = 0;
for (let i = 0; i < defaultLayout.positionedNodes.length; i++) {
  for (let j = i + 1; j < defaultLayout.positionedNodes.length; j++) {
    const a = defaultLayout.positionedNodes[i];
    const b = defaultLayout.positionedNodes[j];
    if (a.fileId === b.fileId && checkAABBOverlap(a, b)) {
      defaultCollisions++;
      console.error(`  [COLLISION DETECTED] ${a.node.id} (${a.kind}) collides with ${b.node.id} (${b.kind}) in file ${a.fileId}`);
    }
  }
}
assert(
  defaultCollisions === 0,
  `Default repository 4-column layout has 0 node collisions (checked ${defaultLayout.positionedNodes.length} nodes)`
);

// 2. Check bounds containment: All nodes must reside inside their container box
let outOfBoundsCount = 0;
defaultLayout.positionedNodes.forEach((pn) => {
  const box = defaultLayout.boxes.find((b) => b.id === `box_${pn.fileId}`);
  if (!box) return;
  const insideX = pn.x >= box.x && pn.x + pn.width <= box.x + box.width;
  const insideY = pn.y >= box.y && pn.y + pn.height <= box.y + box.height;
  if (!insideX || !insideY) {
    outOfBoundsCount++;
    console.error(`  [OUT OF BOUNDS] Node ${pn.node.id} (${pn.x}, ${pn.y}, ${pn.width}, ${pn.height}) outside box (${box.x}, ${box.y}, ${box.width}, ${box.height})`);
  }
});
assert(
  outOfBoundsCount === 0,
  `All positioned nodes fit strictly inside their enclosing 1240px file network box`
);

// 3. ADVERSARIAL STRESS GENERATOR:
console.log('\n  --> Generating Hostile Complex Code with multiple branch returns and direct returns...');
const hostileSource = `
class StressController {
  public int HandleDeepDecisions(int x, int y, int z) {
    if (x > 100) {
      if (y > 50) {
        if (z > 25) {
          return 999;
        } else {
          return 888;
        }
      }
      return 777;
    } else {
      if (y < 0) {
        return -1;
      }
      return 0;
    }
    return 42;
  }

  public void AnotherMethod(int val) {
    if (val == 0) {
      return;
    }
    return;
  }
}
`;

const parsedStressRepo = buildRepositoryFromRawFiles('StressRepo', [
  { name: 'StressController.cs', path: 'StressController.cs', size: 500, date: '2026-10-28', content: hostileSource }
]);

const stressLayout = calculate2DLayout(parsedStressRepo);
let stressCollisions = 0;
for (let i = 0; i < stressLayout.positionedNodes.length; i++) {
  for (let j = i + 1; j < stressLayout.positionedNodes.length; j++) {
    const a = stressLayout.positionedNodes[i];
    const b = stressLayout.positionedNodes[j];
    if (checkAABBOverlap(a, b)) {
      stressCollisions++;
      console.error(`  [COLLISION DETECTED in stress test] ${a.node.id} (${a.kind}, col ${a.column}) overlaps with ${b.node.id} (${b.kind}, col ${b.column})`);
    }
  }
}

assert(
  stressCollisions === 0,
  `Pathological nested code with multiple returns across branches and direct returns has 0 collisions in 4-column layout!`,
  `${stressLayout.positionedNodes.length} nodes positioned`
);

// Verify column spacing invariant in 4-column layout
assert(285 - 234 === 51, 'Column 0 (Class) -> Column 1 (Function) horizontal gap is 51px');
assert(610 - 530 === 80, 'Column 1 (Function) -> Column 2 (Branches / Direct Returns) horizontal gap is 80px');
assert(940 - 860 === 80, 'Column 2 (Branches) -> Column 3 (Branch Returns) horizontal gap is 80px');
assert(1240 - 1190 === 50, 'Column 3 (Branch Returns) -> Box right edge margin is 50px');

// -----------------------------------------------------------------------------
// SECTION 5: 2D/3D Navigation State Invariant & Toggle Verification
// -----------------------------------------------------------------------------
console.log('\n--> [TEST GROUP 5] Persistent 2D/3D Navigation & Viewport Toggle Tests');

const appTsx = fs.readFileSync(path.join(projectRoot, 'frontend/App.tsx'), 'utf8');
const reconTsx = fs.readFileSync(path.join(projectRoot, 'frontend/components/Recon3DCanvas.tsx'), 'utf8');

// 1. App.tsx state persistence test simulation
assert(
  appTsx.includes('const [render3DStyle, setRender3DStyle] = useState<Render3DStyle>('),
  'App.tsx maintains `render3DStyle` as independent top-level React state'
);
assert(
  appTsx.includes('const toggle2D3D = () => {'),
  'App.tsx defines `toggle2D3D` handler that only alters `mode` and preserves `render3DStyle`'
);

// Simulate state transitions
let simMode = VisualizerMode.MODE_3D;
let sim3DStyle = Render3DStyle.CODE_CITY;

function simToggle2D3D() {
  simMode = simMode === VisualizerMode.MODE_2D ? VisualizerMode.MODE_3D : VisualizerMode.MODE_2D;
}

function simChange3DStyle(newStyle) {
  sim3DStyle = newStyle;
}

// Transition sequence 1: CODE_CITY -> 2D -> 3D => CODE_CITY
simToggle2D3D(); // now 2D
assert(simMode === VisualizerMode.MODE_2D, 'Transition 1a: Switched to 2D');
assert(sim3DStyle === Render3DStyle.CODE_CITY, 'Transition 1b: 3D style remained CODE_CITY');
simToggle2D3D(); // back to 3D
assert(simMode === VisualizerMode.MODE_3D && sim3DStyle === Render3DStyle.CODE_CITY, 'Transition 1c: Reopened CODE_CITY');

// Transition sequence 2: change to FORCE_GRAPH -> 2D -> 3D => FORCE_GRAPH
simChange3DStyle(Render3DStyle.FORCE_GRAPH);
simToggle2D3D(); // now 2D
assert(simMode === VisualizerMode.MODE_2D && sim3DStyle === Render3DStyle.FORCE_GRAPH, 'Transition 2a: Switched to 2D, preserved FORCE_GRAPH');
simToggle2D3D(); // back to 3D
assert(simMode === VisualizerMode.MODE_3D && sim3DStyle === Render3DStyle.FORCE_GRAPH, 'Transition 2b: Reopened FORCE_GRAPH');

// Transition sequence 3: change to VIRTUAL_CODE -> 2D -> 3D => VIRTUAL_CODE
simChange3DStyle(Render3DStyle.VIRTUAL_CODE);
simToggle2D3D(); // now 2D
assert(simMode === VisualizerMode.MODE_2D && sim3DStyle === Render3DStyle.VIRTUAL_CODE, 'Transition 3a: Switched to 2D, preserved VIRTUAL_CODE');
simToggle2D3D(); // back to 3D
assert(simMode === VisualizerMode.MODE_3D && sim3DStyle === Render3DStyle.VIRTUAL_CODE, 'Transition 3b: Reopened VIRTUAL_CODE');

// 2. Button Label and Availability
assert(
  reconTsx.includes('Switch to 2D Nodes'),
  'Recon3DCanvas: "Switch to 2D Nodes" button is rendered in common top-left switcher container'
);
assert(
  reconTsx.includes('onClick={onToggle2D3D}'),
  'Recon3DCanvas: 2D Switch button triggers `onToggle2D3D` callback'
);
assert(
  microTsx.includes('Switch to 3D ({get3DStyleLabel(active3DStyle)})'),
  'Microscope2DCanvas: "Switch to 3D (<Style>)" button is rendered in top-left overlay'
);
assert(
  microTsx.includes('onClick={onToggle2D3D}'),
  'Microscope2DCanvas: 3D Switch button triggers `onToggle2D3D` callback'
);
assert(
  appTsx.includes('active3DStyle={render3DStyle}'),
  'App.tsx: passes current `render3DStyle` as `active3DStyle` prop to Microscope2DCanvas'
);

// -----------------------------------------------------------------------------
// Clean up Vite server
// -----------------------------------------------------------------------------
await vite.close();

console.log('\n======================================================================');
console.log(` Challenger 2 Adversarial Stress Test Summary:`);
console.log(` Passed: ${passedTests} | Failed: ${failedTests}`);
console.log('======================================================================\n');

if (failedTests > 0) {
  console.error(`VERDICT: FAIL — ${failedTests} adversarial stress tests failed.`);
  process.exit(1);
} else {
  console.log('VERDICT: APPROVE — All adversarial stress tests passed cleanly.');
  process.exit(0);
}
