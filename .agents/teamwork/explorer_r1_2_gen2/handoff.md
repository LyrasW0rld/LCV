# Dedicated Return Node Visualization in 2D Nodes Graph (Requirement R2)
**Investigation & Architecture Report**
**Agent**: Explorer 2 (`explorer_r1_2_gen2`)  
**Target Requirement**: R2 (Dedicated Return Node Visualization in 2D Nodes)  
**Date**: 2026-10-28T19:57:00Z  

---

## Executive Summary
This report provides a complete, evidence-based investigation of **Requirement R2** for the LCV code visualizer.
Currently, return statements in source code are explicitly skipped by the parser (`codeParser.ts:407`) and never rendered in the 2D Nodes graph view.
To satisfy Requirement R2 and all corresponding acceptance criteria:
1. `NodeKind.RETURN = 'RETURN'` must be added to `frontend/types.ts` along with an optional `returnExpression?: string` on `CodeNode`.
2. A dedicated return statement extractor must be introduced in `frontend/services/codeParser.ts` inside `parseSourceFileToNodes` using a regex pattern that detects return statements across C, C++, C#, Java, Python, and Rust, parenting them to either the current conditional branch (`if`/`else`/loop) or the function itself.
3. In `frontend/components/Microscope2DCanvas.tsx`, specialized pink/rose styling (`bg-[#351424]`, `border-rose-500/80`, `shadow-[0_0_15px_rgba(244,63,94,0.22)]`, `[RET]` header badge) must be applied to `NodeKind.RETURN` nodes with the label/title `"return"`.
4. Return nodes must possess a single input pin displaying the returned value/expression and line number (e.g. `0 l146`, `color_mode l204`), and strictly omit any output pins.
5. In `Microscope2DCanvas.tsx`, the 2D box layout is expanded to accommodate 4 columns (Class -> Function -> Branches/Direct Returns -> Branch Returns), eliminating overlaps and ensuring clean left-to-right electronic wire routing.

---

## 1. Observation

### Obs 1: Explicit Skipping of Return Statements in AST Parser
**File**: `frontend/services/codeParser.ts`  
**Lines**: 401–412  
```typescript
// Level 3: Sub-Function Call Statements inside a True/False branch or function
const callMatch = trimmed.match(subCallStmtRegex);
if (
  callMatch &&
  currentFunction &&
  nodes.length < 85 &&
  !trimmed.startsWith('return') &&
  !trimmed.startsWith('if') &&
  !trimmed.startsWith('for') &&
  !trimmed.startsWith('while')
) {
```
- Direct observation: Line 407 explicitly specifies `!trimmed.startsWith('return')`.
- Nowhere else in `frontend/services/codeParser.ts` is `return` handled or parsed. As a result, return statements are completely ignored and zero nodes are produced for them.

### Obs 2: NodeKind Definition and CodeNode Interface
**File**: `frontend/types.ts`  
**Lines**: 17–24, 28–52  
```typescript
export enum NodeKind {
  CLASS = 'CLASS',
  FUNCTION = 'FUNCTION',
  CONDITION = 'CONDITION',
  LOOP = 'LOOP',
  STATEMENT = 'STATEMENT',
  RECURSION = 'RECURSION'
}

export interface CodeNode {
  id: string;
  symbolName: string;
  label: string;
  kind: NodeKind;
  fileId: string;
  fileName: string;
  className: string;
  language: SupportedLanguage;
  lineStart: number;
  lineEnd: number;
  codeSnippet: string; // Full function or class block
  explanation: string;
  parentId?: string;
  childrenIds: string[];
  callsIds: string[]; // Outgoing calls
  calledByIds: string[]; // Incoming callers
  isRecursive?: boolean;
  complexity: number;
  memoryBytes: number;
  color: string;
  x?: number;
  y?: number;
  z?: number;
}
```
- `NodeKind` currently lacks a `RETURN` member.
- `CodeNode` has properties for `label`, `symbolName`, `lineStart`, `lineEnd`, and `parentId`. Storing the returned expression in an optional `returnExpression?: string` on `CodeNode` allows all consumers to access the exact returned expression cleanly.

### Obs 3: Automatic Pin Generation and Default Pin Sockets
**File**: `frontend/components/Microscope2DCanvas.tsx`  
**Lines**: 416–446, 459–472  
```typescript
filteredEdges.forEach((edge) => {
  const inList = inPinsByNode.get(edge.targetId) || [];
  inList.push({
    edgeId: edge.id,
    edge,
    label: `in l${edge.callLine}`,
    pinType: 'IN',
    line: edge.callLine,
  });
  inPinsByNode.set(edge.targetId, inList);

  const outList = outPinsByNode.get(edge.sourceId) || [];
  const isTrue = edge.branchOutcome === 'TRUE';
  const isFalse = edge.branchOutcome === 'FALSE';

  outList.push({
    edgeId: edge.id,
    edge,
    label: isTrue
      ? `True l${edge.callLine}`
      : isFalse
      ? `False l${edge.callLine}`
      : `out l${edge.callLine}`,
    pinType: isTrue ? 'TRUE' : isFalse ? 'FALSE' : 'OUT',
    line: edge.callLine,
  });
  outPinsByNode.set(edge.sourceId, outList);
});
...
const computeNodeHeight = (nodeId: string, baseLine: number) => {
  const ins = inPinsByNode.get(nodeId) || [];
  const outs = outPinsByNode.get(nodeId) || [];
  if (ins.length === 0) {
    ins.push({ edgeId: `default_in_${nodeId}`, label: `in l${baseLine}`, pinType: 'IN', line: baseLine });
    inPinsByNode.set(nodeId, ins);
  }
  if (outs.length === 0) {
    outs.push({ edgeId: `default_out_${nodeId}`, label: `out l${baseLine}`, pinType: 'OUT', line: baseLine });
    outPinsByNode.set(nodeId, outs);
  }
  const maxPins = Math.max(ins.length, outs.length, 1);
  return HEADER_HEIGHT + PIN_TOP_PAD + maxPins * PIN_ROW_HEIGHT + 8;
};
```
- Line 424 hardcodes `label: in l${edge.callLine}` for all incoming pins.
- Lines 466–469 automatically inject a default `OUT` pin (`out l${baseLine}`) whenever `outs.length === 0`.
- For Requirement R2 ("omit any output pins" and "possesses an input pin displaying the returned expression/value and line information"):
  1. Return nodes must NOT have default out pins added in `computeNodeHeight`.
  2. Return nodes must have `outPinsByNode.set(nodeId, [])`.
  3. The input pin label must display the returned expression and line number, e.g. `${expr} l${edge.callLine}` (or `in l${edge.callLine}` for void returns).

### Obs 4: 2D Node Card Rendering and Styling
**File**: `frontend/components/Microscope2DCanvas.tsx`  
**Lines**: 1561–1582, 1601–1634, 1640–1705  
```typescript
let headerBg = 'bg-[#202027] text-zinc-100 border-b border-zinc-700';
let borderClass = 'border-zinc-700';

if (node.kind === NodeKind.CLASS) {
  headerBg =
    'bg-[#281E10] text-[#F7D794] font-semibold border-b border-[#E5A93C]/60';
  borderClass = 'border-[#E5A93C]/80';
} else if (hasSelfLoop) {
  headerBg = 'bg-[#0F2238] text-sky-200 font-semibold border-b border-sky-500/60';
  borderClass = 'border-sky-500/80';
} else if (node.kind === NodeKind.FUNCTION) {
  headerBg =
    'bg-[#191920] text-[#F3C66F] font-semibold border-b border-[#E5A93C]/40';
  borderClass = 'border-zinc-600';
} else if (node.kind === NodeKind.CONDITION) {
  const isElse = node.label.toLowerCase().startsWith('else');
  headerBg = isElse
    ? 'bg-[#2D1418] text-red-200 font-semibold border-b border-red-500/40'
    : 'bg-[#12291D] text-emerald-200 font-semibold border-b border-emerald-500/40';
  borderClass = isElse ? 'border-red-500/60' : 'border-emerald-500/60';
}
```
- In `Microscope2DCanvas.tsx`, nodes are rendered as custom DOM elements with absolute positioning on a pan/zoom canvas, connected by SVG electronic circuit wires. There is no external React Flow library in use.
- Each node type has a tailored `headerBg` and `borderClass`.
- A dedicated branch for `node.kind === NodeKind.RETURN` can set:
  - `headerBg = 'bg-[#351424] text-rose-200 font-semibold border-b border-rose-500/60'`
  - `borderClass = 'border-rose-500/80 shadow-[0_0_15px_rgba(244,63,94,0.22)]'`
  - Input socket dot: `bg-[#F43F5E]` (rose-500)
  - Selected/hovered ring: `ring-2 ring-rose-400`
  - Header badge: `[RET]`
  - Header title: `"return"` (rendered from `displayLabel`, which is initialized to `node.label === 'return'`)

### Obs 5: 2D Box Layout Grid and Column Widths
**File**: `frontend/components/Microscope2DCanvas.tsx`  
**Lines**: 498–559  
- Current layout uses a 3-column architecture inside `networkBoxes`:
  - Column 0: Class node at `boxX + 24` (width 210)
  - Column 1: Function nodes at `boxX + 285` (width 245)
  - Column 2: Branches at `boxX + 610` (width 250)
  - Total `BOX_WIDTH = 980`
- Line 526 currently filters only direct function branches:
  `const fnBranches = file.nodes.filter((b) => b.parentId === fn.id);`
  Descendants of branches (such as return nodes inside `if`/`else` branches) are not placed if the filter only looks for `b.parentId === fn.id`.
- Expanding the box to 4 columns (`BOX_WIDTH = 1240`):
  - Column 0: Class at `boxX + 24`
  - Column 1: Function at `boxX + 285`
  - Column 2: Branches & Direct Returns at `boxX + 610`
  - Column 3: Branch Return Nodes at `boxX + 940`
  This cleanly routes electronic wires left-to-right (`x1 < x2`).

### Obs 6: Existing Sample Return Statements in `constants.ts`
**File**: `frontend/constants.ts`  
- `HypervisorBridge.rs` (Lines 143–148):
  ```rust
  pub fn BypassHypervisorGuard(fw_target: usize) -> usize {
      if fw_target < 400 {
          RestoreOriginalNvsBackup();
          return 0;
      }
  ```
  `return 0;` is an explicit return statement inside an `if` conditional branch.
- `TelemetryLogger.py` (Lines 199–205):
  ```python
  def UpdateLedStatusIndicator(color_mode):
      if color_mode > 1:
          VerifyChecksumCrc32(color_mode)
      else:
          RestoreOriginalNvsBackup()
      return color_mode
  ```
  `return color_mode` is an explicit return statement at the end of a function.
- In `TelemetryLogger.py`, updating the `if`/`else` branch to also return values (e.g. `return 1` inside `if`, `return 0` inside `else`, and `return color_mode` at the end) allows all three acceptance criteria (returns inside `if`, inside `else`, and at the end of the function) to be visible immediately in the default repository without requiring file uploads.

### Obs 7: Test Harness Graph Invariants
**File**: `scripts/empirical-stress-test.mjs`  
**Lines**: 443–469  
```javascript
function verifyGraphInvariants(repo, label) {
  const nodeIds = new Set(repo.allNodes.map(n => n.id));
  recordTest('Suite 7', `[${label}] All node IDs unique`, nodeIds.size === repo.allNodes.length);
  let danglingEdgeCount = 0;
  for (const edge of repo.edges) {
    if (!nodeIds.has(edge.sourceId) || !nodeIds.has(edge.targetId)) {
      danglingEdgeCount++;
    }
  }
  recordTest('Suite 7', `[${label}] Zero dangling edges`, danglingEdgeCount === 0);
  ...
}
```
- Invariants checked: unique IDs, 0 dangling edges, `complexity > 0`, `memoryBytes >= 0`, `lineStart > 0`, `lineEnd >= lineStart`.
- Return nodes must assign unique IDs (`${fileId}_return_${line}`), valid numeric values, and valid AST edges connecting to their parent node to pass the verification suite.

---

## 2. Logic Chain

1. **Premise 1 (from Obs 1 & Obs 2)**:  
   Because return statements are currently filtered out with `!trimmed.startsWith('return')`, the parser produces 0 nodes for return statements. Adding `NodeKind.RETURN = 'RETURN'` in `frontend/types.ts` provides the required type identifier for dedicated return nodes.

2. **Premise 2 (Syntax Patterns across Supported Languages)**:  
   Return statements across C, C++, C#, Java, Python, and Rust follow the pattern:
   `return [<expression>][;]`
   Stripping inline comments (`//...` and `#...`) allows a regex:
   `^\s*(?:}\s*)?(?:else\s+)?\breturn\b(?:\s+(.*?))?\s*;?\s*$`
   to match:
   - `return 0;` -> expression: `'0'`
   - `return color_mode` -> expression: `'color_mode'`
   - `return;` -> expression: `''`
   - `} else return false;` -> expression: `'false'`
   - `return (x > 0);` -> expression: `'(x > 0)'`

3. **Premise 3 (AST Hierarchy & Parent Branch Resolution)**:  
   In `frontend/services/codeParser.ts`, lines are iterated sequentially inside a function.
   - If a return statement occurs while `currentConditionOrLoop` is active and `i + 1 <= currentConditionOrLoop.lineEnd`, the return statement is located inside that conditional branch (`if`, `else`, or loop). Its `parentId` is `currentConditionOrLoop.id`.
   - If `currentConditionOrLoop` is null or `i + 1 > currentConditionOrLoop.lineEnd`, the return statement is at the function level. Its `parentId` is `currentFunction.id`.
   - In both cases, `parentBranch.childrenIds.push(returnNode.id)` ensures the parent tracks the return node as a child.

4. **Premise 4 (Edge Generation)**:  
   In `codeParser.ts:512–532`, `allNodes.forEach` iterates over all nodes with a `parentId` and generates an `AST_CHILD` edge:
   `sourceId: parent.id`, `targetId: returnNode.id`, `callLine: returnNode.lineStart`.
   - If the parent is an `if` branch, `branchOutcome` is `'TRUE'` (green wire).
   - If the parent is an `else` branch, `branchOutcome` is `'FALSE'` (red wire).
   - If the parent is the function root, `branchOutcome` is `undefined` (standard wire).
   Because both `sourceId` and `targetId` exist in `allNodes`, 0 dangling edges are created, satisfying graph invariants (Obs 7).

5. **Premise 5 (Pin Sockets & Omission of Output Pins)**:  
   From Obs 3 and Requirement R2:
   - For `edge.targetId === returnNode.id`, an input pin socket is added to `inPinsByNode`.
   - The label is formatted as `${returnExpression ? `${returnExpression} ` : ''}l${edge.callLine}` (e.g. `0 l146`, `color_mode l204`, or `void l35`).
   - For `edge.sourceId === returnNode.id`, no output pins are added (`outPinsByNode` stays empty).
   - In `computeNodeHeight`, default out pins (`default_out_${nodeId}`) are suppressed for return nodes.
   - In JSX rendering, output pins are omitted completely.
   This guarantees that every return node has an input pin showing expression and line, and zero output pins.

6. **Premise 6 (Styling & Visual Differentiation)**:  
   From Obs 4 and Requirement R2:
   - Applying `bg-[#351424] text-rose-200 border-b border-rose-500/60` to the header and `border-rose-500/80 shadow-[0_0_15px_rgba(244,63,94,0.22)]` to the node card provides distinct pink/rose accents.
   - Setting `label: 'return'` ensures the header displays `"return"`.
   - Adding a `[RET]` badge in the header reinforces its identity.
   - Adding a legend item in the canvas header ("Return Node (Pink / Rose)") provides visual clarity.

7. **Premise 7 (2D Layout Grid & Overlap Prevention)**:  
   From Obs 5:
   Direct return nodes of a function belong in Column 2 (`boxX + 610`) alongside branches.
   Return nodes inside branches belong in Column 3 (`boxX + 940`) directly downstream of their parent branch.
   Expanding `BOX_WIDTH = 1240` and sequencing vertical Y coordinates (`currentBranchY` and `childY`) ensures all wires flow left-to-right with zero node overlaps.

---

## 3. Caveats

1. **Multi-line return expressions**:  
   If a return statement spans multiple lines (e.g., returning a large multi-line object literal or JSX block), the single-line regex captures the first line. For typical C/C++/C#/Java/Python/Rust functions in LCV, return expressions are concise (single line). Truncating expressions over 24 characters with an ellipsis ensures clean display inside the 250px node width.
2. **Terminal leaf node behavior**:  
   Return nodes terminate the control flow path and do not sprout downstream twigs. Any function called within a return expression (e.g. `return DecryptSblKeyslot(page);`) is detected by the call scanner and represented as a function call edge in accordance with R3, while the return node itself still possesses zero output pins.
3. **No third-party node library changes**:  
   LCV uses a custom DOM/SVG canvas in `Microscope2DCanvas.tsx` rather than React Flow. All modifications are localized to native React state, DOM elements, and SVG polylines.

---

## 4. Conclusion & Concrete Implementation Plan

### Step-by-Step Implementation Guide

#### 1. Modify `frontend/types.ts`
- **Line 24**: Add `RETURN = 'RETURN'` to `enum NodeKind`.
- **Line 52**: Add optional `returnExpression?: string;` to `interface CodeNode`.

```typescript
// frontend/types.ts
export enum NodeKind {
  CLASS = 'CLASS',
  FUNCTION = 'FUNCTION',
  CONDITION = 'CONDITION',
  LOOP = 'LOOP',
  STATEMENT = 'STATEMENT',
  RECURSION = 'RECURSION',
  RETURN = 'RETURN', // <-- Requirement R2
}

export interface CodeNode {
  ...
  returnExpression?: string; // <-- Requirement R2: Expression returned by return statement
}
```

#### 2. Modify `frontend/services/codeParser.ts`
- **In `buildHumanExplanation` (Line 132)**: Add explanation for `NodeKind.RETURN`:
```typescript
if (kind === NodeKind.RETURN) {
  return `Return statement "${label}" in ${className} (${fileName}). Terminates execution of the enclosing routine and returns the computed result.`;
}
```

- **In `parseSourceFileToNodes` (Line 400)**: Add dedicated return statement detector before subCall statements:
```typescript
// Level 3a: Dedicated Return Node for every return statement (Requirement R2)
const strippedLine = trimmed.replace(/\/\/.*$/, '').replace(/#.*$/, '').trim();
const returnMatch = strippedLine.match(/^\s*(?:}\s*)?(?:else\s+)?\breturn\b(?:\s+(.*?))?\s*;?\s*$/);

if (returnMatch && currentFunction && nodes.length < 120) {
  const rawExpr = (returnMatch[1] || '').trim();
  const cleanExpr = rawExpr.replace(/;+$/, '').trim();

  // Resolve parent: conditional branch if inside active block, otherwise function root
  const parentBranch =
    currentConditionOrLoop && i + 1 <= currentConditionOrLoop.lineEnd
      ? currentConditionOrLoop
      : currentFunction;

  const returnNode: CodeNode = {
    id: `${fileId}_return_${i + 1}`,
    symbolName: cleanExpr ? `return ${cleanExpr}` : 'return',
    label: 'return',
    kind: NodeKind.RETURN,
    fileId,
    fileName,
    className: detectedClassName,
    language: lang,
    lineStart: i + 1,
    lineEnd: i + 1,
    codeSnippet: lines.slice(Math.max(0, i - 1), Math.min(lines.length, i + 2)).join('\n'),
    explanation: buildHumanExplanation(
      NodeKind.RETURN,
      cleanExpr ? `return ${cleanExpr}` : 'return',
      detectedClassName,
      fileName,
      false
    ),
    parentId: parentBranch.id,
    childrenIds: [],
    callsIds: [],
    calledByIds: [],
    complexity: 1,
    memoryBytes: 32,
    color: '#F43F5E', // Pink/Rose
    returnExpression: cleanExpr,
  };

  parentBranch.childrenIds.push(returnNode.id);
  nodes.push(returnNode);
  continue;
}
```

#### 3. Modify `frontend/components/Microscope2DCanvas.tsx`
- **Socket and Pin Generation (Lines 419–472)**:
  - When `edge.targetId` is a return node, format input pin label with returned expression and line:
    ```typescript
    const targetNode = repository.allNodes.find((n) => n.id === edge.targetId);
    const isReturn = targetNode?.kind === NodeKind.RETURN;
    const expr = targetNode?.returnExpression;
    const inLabel = isReturn
      ? (expr ? `${expr} l${edge.callLine}` : `in l${edge.callLine}`)
      : `in l${edge.callLine}`;
    ```
  - When `edge.sourceId` is a return node, do NOT add any out pin (`if (srcNode?.kind === NodeKind.RETURN) return;`).
  - In `computeNodeHeight`:
    ```typescript
    const computeNodeHeight = (nodeId: string, baseLine: number, isReturn = false) => {
      const ins = inPinsByNode.get(nodeId) || [];
      const outs = outPinsByNode.get(nodeId) || [];
      if (ins.length === 0) {
        const targetNode = repository.allNodes.find((n) => n.id === nodeId);
        const expr = targetNode?.returnExpression;
        ins.push({
          edgeId: `default_in_${nodeId}`,
          label: isReturn
            ? (expr ? `${expr} l${baseLine}` : `in l${baseLine}`)
            : `in l${baseLine}`,
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
      return HEADER_HEIGHT + PIN_TOP_PAD + maxPins * PIN_ROW_HEIGHT + 8;
    };
    ```

- **Layout Grid & Box Dimensions (Lines 500–565)**:
  - Increase `BOX_WIDTH = 1240`.
  - For each function `fn`:
    - Position `fn` at `boxX + 285`.
    - Position branches at `boxX + 610`.
    - For each branch, position its child return nodes at `boxX + 940`.
    - For direct return nodes of `fn`, position at `boxX + 610` below branches.
    - Advance Y coordinates without overlaps.

- **Node Card Header & Border Styling (Lines 1561–1585)**:
  ```typescript
  } else if (node.kind === NodeKind.RETURN) {
    headerBg = 'bg-[#351424] text-rose-200 font-semibold border-b border-rose-500/60';
    borderClass = 'border-rose-500/80 shadow-[0_0_15px_rgba(244,63,94,0.22)]';
  }
  ```

- **Node Header Content (Line 1605)**:
  ```tsx
  {node.kind === NodeKind.RETURN && (
    <span className="px-1.5 py-0.2 bg-rose-950/90 border border-rose-400 text-rose-300 font-mono text-[9px] font-bold shrink-0">
      RET
    </span>
  )}
  <span className="truncate" title="Return Statement">
    {displayLabel}
  </span>
  ```

- **Input Socket Dot & Output Pin Omission (Lines 1660, 1668)**:
  - Socket dot: `<span className={`w-2 h-2 inline-block shrink-0 ${node.kind === NodeKind.RETURN ? 'bg-[#F43F5E]' : 'bg-[#E5A93C]'}`} />`
  - Output pin: `{outPin && node.kind !== NodeKind.RETURN ? ( ... ) : <span />}`

- **Canvas Top Legend (Line 1215)**:
  ```tsx
  <span className="flex items-center gap-1.5 text-rose-400 font-semibold">
    <span className="w-2.5 h-2.5 rounded-xs bg-[#F43F5E] inline-block" />
    Return Node (Pink / Rose)
  </span>
  ```

#### 4. Update `frontend/constants.ts` (Sample Files)
- Update `TelemetryLogger.py` in `INITIAL_LCV_FILES` so that `UpdateLedStatusIndicator` contains return statements inside `if`, inside `else`, and at the end of the function:
```python
    def UpdateLedStatusIndicator(color_mode):
        if color_mode > 1:
            VerifyChecksumCrc32(color_mode)
            return 1
        else:
            RestoreOriginalNvsBackup()
            return 0
        return color_mode
```
This enables immediate visual verification across all three acceptance conditions when testing `DEFAULT_REPOSITORY`.

---

## 5. Verification Method

To independently verify Requirement R2:

### Command-Line & Test Invariant Verification
1. **Compilation and Static Verification**:
   ```powershell
   npm run build
   node scripts/verify-build.js
   ```
   *Expected result*: TypeScript compiles with zero errors; build output generates cleanly in `dist/`.

2. **Empirical Stress Test Verification**:
   ```powershell
   node scripts/empirical-stress-test.mjs
   ```
   *Expected result*:
   - Suite 7 `verifyGraphInvariants` passes: `All node IDs unique` = PASS, `Zero dangling edges` = PASS, `Zero NaN or inverted line numbers in nodes` = PASS.

3. **Dedicated Return Node Assertion Script**:
   Run a node script verifying that `parseSourceFileToNodes` on sample code returns nodes with:
   - `kind === 'RETURN'`
   - `label === 'return'`
   - `returnExpression` accurately populated
   - `parentId` matching the enclosing branch (`if`/`else`) or function
   - `childrenIds.length === 0`

### Browser / Visual Verification
1. Run local development server:
   ```powershell
   npm run dev
   ```
2. Open `http://localhost:5173/` in a browser.
3. Switch to the **2D Nodes** graph view.
4. Select `TelemetryLogger.py` (or `HypervisorBridge.rs`).
5. Observe the dedicated return nodes:
   - Visible pink/rose header styling (`bg-[#351424]`, `border-rose-500/80`, rose glow).
   - Node title displayed as `"return"` with `[RET]` badge.
   - Input pin socket displays returned expression and line (e.g. `1 l201`, `0 l204`, `color_mode l205`).
   - Node possesses NO output pin on the right side.
   - Directed electronic wires connect from the `if` True pin (green wire) to `return 1`, from the `else` False pin (red wire) to `return 0`, and from the function (amber wire) to `return color_mode`.
6. Clicking or hovering a return node displays its enclosing function in the right-hand Code Inspector with the exact return line highlighted and scrolled into view.

### Invalidation Conditions
The implementation is invalid if:
- Any return statement is rendered as a standard statement node rather than a specialized return node.
- A return node renders an output pin on the right.
- A return node lacks pink/rose header or border styling.
- A return node's title is not "return".
- A return node fails to display its returned expression and line on its input pin.
- Return nodes inside `else` or nested branches fail to render or trigger dangling edges.
