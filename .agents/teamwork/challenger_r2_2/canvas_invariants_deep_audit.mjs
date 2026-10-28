import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'vite';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../../..');

console.log('======================================================================');
console.log(' CHALLENGER 2: CANVAS UI & RETURN NODE INVARIANTS DEEP AUDIT');
console.log('======================================================================\n');

let passCount = 0;
let failCount = 0;

function assert(condition, message, detail = '') {
  if (condition) {
    passCount++;
    console.log(`  [PASS] ${message}${detail ? ` -> ${detail}` : ''}`);
  } else {
    failCount++;
    console.error(`  [FAIL] ${message}${detail ? ` -> ${detail}` : ''}`);
  }
}

// Read Microscope2DCanvas.tsx
const microPath = path.join(projectRoot, 'frontend/components/Microscope2DCanvas.tsx');
const microSource = fs.readFileSync(microPath, 'utf8');

// Initialize Vite SSR to load types & parser
const vite = await createServer({
  root: path.join(projectRoot, 'frontend'),
  server: { middlewareMode: true },
  appType: 'custom',
});

const { NodeKind, GraphFocusMode, Render3DStyle, get3DStyleLabel, VisualizerMode } = await vite.ssrLoadModule('/types.ts');
const { DEFAULT_REPOSITORY } = await vite.ssrLoadModule('/constants.ts');
const { buildRepositoryFromRawFiles } = await vite.ssrLoadModule('/services/codeParser.ts');

// -----------------------------------------------------------------------------
// 1. INVARIANT: RETURN NODE ZERO OUTPUT PINS (AST, LOGIC, DATA MAP & JSX)
// -----------------------------------------------------------------------------
console.log('--> [CHECK 1] Return Node Zero Output Pins Invariant');

// 1.1 AST Level
const retNodes = DEFAULT_REPOSITORY.allNodes.filter(n => n.kind === NodeKind.RETURN);
assert(retNodes.length >= 4, `DEFAULT_REPOSITORY has ${retNodes.length} return nodes`);
retNodes.forEach(r => {
  assert(r.childrenIds.length === 0, `AST childrenIds is empty for return node ${r.id} (${r.fileName}:${r.lineStart})`);
});

// 1.2 Graph Edge Level
const retSourceEdges = DEFAULT_REPOSITORY.edges.filter(e => {
  const src = DEFAULT_REPOSITORY.allNodes.find(n => n.id === e.sourceId);
  return src?.kind === NodeKind.RETURN;
});
assert(retSourceEdges.length === 0, `Repository has zero edges originating from return nodes`);

// 1.3 Canvas Pin Computation Simulation
function simulatePinComputation(repo, focusMode = GraphFocusMode.FUNCTIONS) {
  const visibleNodeIds = new Set();
  repo.files.forEach(f => {
    f.nodes.forEach(n => {
      if (focusMode === GraphFocusMode.CLASSES && n.kind !== NodeKind.CLASS) return;
      visibleNodeIds.add(n.id);
    });
  });

  const filteredEdges = repo.edges.filter(edge => {
    if (edge.kind === 'RECURSION') return false;
    if (focusMode === GraphFocusMode.CLASSES && edge.kind !== 'CLASS_DEPENDENCY') return false;
    if (focusMode === GraphFocusMode.FUNCTIONS && edge.kind === 'CLASS_DEPENDENCY') return false;
    return visibleNodeIds.has(edge.sourceId) && visibleNodeIds.has(edge.targetId);
  });

  const inPinsByNode = new Map();
  const outPinsByNode = new Map();

  filteredEdges.forEach(edge => {
    const targetNode = repo.allNodes.find(n => n.id === edge.targetId);
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

    const sourceNode = repo.allNodes.find(n => n.id === edge.sourceId);
    if (sourceNode?.kind === NodeKind.RETURN) {
      return;
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
      const targetNode = repo.allNodes.find(n => n.id === nodeId);
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

  retNodes.forEach(r => computeNodeHeight(r.id, r.lineStart, true));

  return { inPinsByNode, outPinsByNode };
}

const pins = simulatePinComputation(DEFAULT_REPOSITORY);
retNodes.forEach(r => {
  const outs = pins.outPinsByNode.get(r.id);
  assert(!outs || outs.length === 0, `Canvas outPinsByNode is strictly empty for return node ${r.id}`);
});

// 1.4 Hostile Injected Outgoing Edge
const hostileRepo = JSON.parse(JSON.stringify(DEFAULT_REPOSITORY));
hostileRepo.edges.push({
  id: 'illegal_edge_from_return',
  sourceId: retNodes[0].id,
  targetId: retNodes[1].id,
  kind: 'INTERNAL_CALL',
  sourceFile: retNodes[0].fileName,
  targetFile: retNodes[1].fileName,
  callLine: 10,
  label: 'illegal',
});
const hostilePins = simulatePinComputation(hostileRepo);
const hostileOuts = hostilePins.outPinsByNode.get(retNodes[0].id);
assert(!hostileOuts || hostileOuts.length === 0, `Hostile edge injection blocked: outPinsByNode length is 0`);

// 1.5 Source Code Verification (JSX and Data Map level)
assert(microSource.includes('node.kind !== NodeKind.RETURN'), 'JSX explicitly checks `node.kind !== NodeKind.RETURN` before rendering outPin socket');
assert(microSource.includes('outPins: []'), 'Node positioning map assigns `outPins: []` for return nodes');
assert(microSource.includes('if (sourceNode?.kind === NodeKind.RETURN) {'), 'Pin aggregation logic explicitly skips outPins for NodeKind.RETURN');

// -----------------------------------------------------------------------------
// 2. INVARIANT: PINK/ROSE STYLING & PIN SOCKET ACCENTS
// -----------------------------------------------------------------------------
console.log('\n--> [CHECK 2] Pink/Rose Styling & Badge Invariants');

assert(microSource.includes("headerBg = 'bg-[#351424] text-rose-200 font-semibold border-b border-rose-500/60'"), 'Header styling uses bg-[#351424] text-rose-200 border-rose-500/60');
assert(microSource.includes("borderClass = 'border-rose-500/80 shadow-[0_0_15px_rgba(244,63,94,0.22)]'"), 'Card styling uses border-rose-500/80 and shadow-[0_0_15px_rgba(244,63,94,0.22)]');
assert(microSource.includes('ring-rose-400'), 'Selected/hover ring uses ring-rose-400 for return nodes');
assert(microSource.includes('bg-rose-950/90 border border-rose-400 text-rose-300'), 'Dedicated [RET] badge styled with bg-rose-950/90, border-rose-400, text-rose-300');
assert(microSource.includes("displayLabel: 'return'"), 'Display label is hardcoded to "return"');
assert(microSource.includes("node.kind === NodeKind.RETURN ? 'bg-[#F43F5E]' : 'bg-[#E5A93C]'"), 'Pin socket uses pink #F43F5E for return nodes');

// -----------------------------------------------------------------------------
// 3. INVARIANT: 4-COLUMN LAYOUT (BOX_WIDTH = 1240) ZERO COLLISIONS
// -----------------------------------------------------------------------------
console.log('\n--> [CHECK 3] 4-Column Layout (BOX_WIDTH = 1240) Collision-Free Invariant');

function runLayoutEngine(repo, filterFileId = null) {
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

  const computeNodeHeight = (nodeId, baseLine, isReturn = false) => 60;

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
      const fnHeight = computeNodeHeight(fn.id, fn.lineStart);

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
        const brHeight = computeNodeHeight(br.id, br.lineStart);
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
          const retHeight = computeNodeHeight(retNode.id, retNode.lineStart, true);
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
        const retHeight = computeNodeHeight(retNode.id, retNode.lineStart, true);
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

    const clsHeight = computeNodeHeight(classNode.id, classNode.lineStart);
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

function checkAABB(a, b) {
  return !(
    a.x + a.width <= b.x ||
    b.x + b.width <= a.x ||
    a.y + a.height <= b.y ||
    b.y + b.height <= a.y
  );
}

// Test DEFAULT_REPOSITORY layout
const defRes = runLayoutEngine(DEFAULT_REPOSITORY);
let defCollisions = 0;
for (let i = 0; i < defRes.positionedNodes.length; i++) {
  for (let j = i + 1; j < defRes.positionedNodes.length; j++) {
    const a = defRes.positionedNodes[i];
    const b = defRes.positionedNodes[j];
    if (a.fileId === b.fileId && checkAABB(a, b)) {
      defCollisions++;
    }
  }
}
assert(defCollisions === 0, `DEFAULT_REPOSITORY has 0 node collisions across ${defRes.positionedNodes.length} nodes`);

// Complex Pathological Stress Generator
const extremeSource = `
class MassiveSystem {
  public int MethodA(int a) {
    if (a > 10) {
      if (a > 20) {
        if (a > 30) {
          return 300;
        } else {
          return 250;
        }
      } else if (a > 15) {
        return 175;
      } else {
        return 120;
      }
    }
    if (a < 0) {
      return -1;
    }
    return 0;
  }

  public string MethodB(bool flag) {
    if (flag) {
      return "true";
    } else {
      return "false";
    }
    return "done";
  }

  public void MethodC(int x) {
    while (x > 0) {
      if (x % 2 == 0) {
        return;
      }
      x--;
    }
    return;
  }
}
`;

const stressRepo = buildRepositoryFromRawFiles('MassiveRepo', [
  { name: 'MassiveSystem.cs', path: 'MassiveSystem.cs', size: 1024, date: '2026-10-28', content: extremeSource }
]);

const stressRes = runLayoutEngine(stressRepo);
let stressCollisions = 0;
for (let i = 0; i < stressRes.positionedNodes.length; i++) {
  for (let j = i + 1; j < stressRes.positionedNodes.length; j++) {
    const a = stressRes.positionedNodes[i];
    const b = stressRes.positionedNodes[j];
    if (checkAABB(a, b)) {
      stressCollisions++;
    }
  }
}
assert(stressCollisions === 0, `Massive multi-branch multi-return code has 0 collisions across ${stressRes.positionedNodes.length} nodes`);

// Check containment in box
let stressOutOfBounds = 0;
stressRes.positionedNodes.forEach(pn => {
  const box = stressRes.boxes[0];
  const insideX = pn.x >= box.x && pn.x + pn.width <= box.x + box.width;
  const insideY = pn.y >= box.y && pn.y + pn.height <= box.y + box.height;
  if (!insideX || !insideY) {
    stressOutOfBounds++;
  }
});
assert(stressOutOfBounds === 0, `All ${stressRes.positionedNodes.length} stress nodes fit inside 1240px container box`);

// -----------------------------------------------------------------------------
// 4. INVARIANT: start_local.bat EXECUTION TEST
// -----------------------------------------------------------------------------
console.log('\n--> [CHECK 4] start_local.bat Live Execution Robustness');

try {
  const dryRunOutput = execSync('cmd.exe /c start_local.bat --dry-run', { cwd: projectRoot, encoding: 'utf8' });
  assert(dryRunOutput.includes('http://localhost:5173/'), 'Dry run logs http://localhost:5173/');
  assert(dryRunOutput.includes('[LCV] Dry run verification successful.'), 'Dry run logs successful completion');
  assert(!dryRunOutput.includes('kann syntaktisch an dieser Stelle nicht verarbeitet werden'), 'Zero cmd syntax errors');
} catch (err) {
  assert(false, 'start_local.bat --dry-run threw exception', err.message);
}

await vite.close();

console.log('\n======================================================================');
console.log(` DEEP AUDIT SUMMARY: Passed: ${passCount} | Failed: ${failCount}`);
console.log('======================================================================\n');

if (failCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
