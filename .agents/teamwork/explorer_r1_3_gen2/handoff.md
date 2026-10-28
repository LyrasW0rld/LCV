# Investigation Report: Requirement R3 — Function Call Edge Visualization in 2D Nodes

## 1. Observation

### 1.1 Codebase Structure and Entry Points
- **Parsing & Edge Generation**: `frontend/services/codeParser.ts`
  - Function detection: lines 285–343 (`fnRegex`, `extractFullFunctionBlock`, node generation)
  - Branch detection: lines 346–399 (`controlRegex`, `extractFullFunctionBlock`)
  - Call occurrence matching: lines 180–225 (`findCallOccurrencesWithLineAndOutcome`)
  - Graph assembly & Edge generation: lines 456–684 (`buildRepositoryFromRawFiles`)
- **Default Sample Repository**: `frontend/constants.ts`
  - `INITIAL_LCV_FILES` (lines 6–206): 6 source files across C++, C#, Rust, C, Python (`AnyPS5Spoofer.cpp`, `SysconController.cs`, `NvsStorageManager.cpp`, `HypervisorBridge.rs`, `ChecksumValidator.c`, `TelemetryLogger.py`)
  - `DEFAULT_REPOSITORY` (lines 208–211): initialized at module load via `buildRepositoryFromRawFiles('boykopovar/AnyPS5', INITIAL_LCV_FILES)`
- **2D Nodes Graph Rendering**: `frontend/components/Microscope2DCanvas.tsx`
  - Visible node and edge filtering: lines 397–415
  - Pin generation (`inPinsByNode`, `outPinsByNode`): lines 416–472
  - Node layout positioning (`map` of `Positioned2DNode`): lines 474–587
  - Circuit edge calculation (`circuitEdges`): lines 672–740
  - SVG wire and arrow rendering: lines 1390–1459
  - Pin sockets rendering: lines 1635–1706
- **Code Inspector Synchronization**: `frontend/components/NodeCodeInspector.tsx`
  - Edge hover / callLine inspector highlight: lines 202–224

---

### 1.2 Verbatim Observations and Diagnosed Bugs

#### Bug 1: Missing Function Parsing in C#/Java/C++ with Access Modifiers (`fnRegex`)
- **Location**: `frontend/services/codeParser.ts:285–286`
- **Current Code**:
  ```ts
  const fnRegex =
    /(?:(?:public|private|protected|static|virtual|inline|async|unsafe|extern|pub|fn|def|function)\s+)+([a-zA-Z_][a-zA-Z0-9_<>:]*)\s*\(([^)]*)\)|^\s*(?:const|let|var)\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*(?:async\s*)?\([^)]*\)\s*=>|^\s*(?:void|int|float|double|bool|string|char|auto|Node|SimpleNode\s*\*|Transform|GameObject|size_t)\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(([^)]*)\)/;
  ```
- **Observed Failure**:
  - In `SysconController.cs`, line 6: `public void VerifySysconHandshake(int portIndex) {`
  - The first alternative `(?:(?:...)\s+)+` matches `public `, but `void` is NOT in the modifier list! Thus, `([a-zA-Z_][a-zA-Z0-9_<>:]*)` matches `void`, expecting an open parenthesis immediately after `void`. Since `VerifySysconHandshake` follows `void`, the match fails!
  - The third alternative requires the line to start with `void` (`^\s*(?:void|...)`), which fails because of the leading `public` keyword.
  - Testing verbatim with Node.js:
    ```js
    fnRegex.test('public void VerifySysconHandshake(int portIndex)') // returns false!
    ```
- **Direct Impact on Graph**:
  - ALL 3 functions in `SysconController.cs` (`VerifySysconHandshake`, `ReadSysconEepromBlocks`, `ResetUartBusConnection`) fail to parse.
  - `SysconController.cs` yields ONLY 1 node: `[CLASS] SysconController` (0 functions).
  - All 9 outgoing calls from `SysconController.cs` are lost.
  - All 3 incoming calls targeting `SysconController.cs` from other files (`AnyPS5Spoofer.cpp:13`, `NvsStorageManager.cpp:30`, `TelemetryLogger.py:7`) fail symbol lookup in `symbolMap` and are lost.

#### Bug 2: Missing Calls from Recursive Functions Inside Branches
- **Location**: `frontend/services/codeParser.ts:562`
- **Current Code**:
  ```ts
  symbolMap.forEach((targetNode, symbolName) => {
    if (fnNode.id === targetNode.id) return; // <-- Drops recursive calls
    if (targetNode.kind === NodeKind.CLASS) return;
  ```
- **Observed Failure**:
  - In `AnyPS5Spoofer.cpp`, line 29: `ApplyKernelPatches(1000);` inside the `else` branch of `ApplyKernelPatches(int fwVersion)`.
  - In `HypervisorBridge.rs`, line 23: `DecryptSblKeyslot(slot_id - 1);` inside `if slot_id > 0` of `DecryptSblKeyslot(slot_id: usize)`.
  - Because `fnNode.id === targetNode.id`, line 562 unconditionally returns early.
  - Neither call edge is generated, even though the call is originating from a specific conditional branch node (`file_0_branch_28` and `file_3_branch_22`) directed back to the function node.

#### Bug 3: Missing Child Branches in Nested Structures
- **Location 1**: `frontend/services/codeParser.ts:557–559`
  ```ts
  const childBranches = allNodes.filter(
    (b) => b.parentId === fnNode.id && (b.kind === NodeKind.CONDITION || b.kind === NodeKind.LOOP)
  );
  ```
- **Location 2**: `frontend/components/Microscope2DCanvas.tsx:526`
  ```ts
  const fnBranches = file.nodes.filter((b) => b.parentId === fn.id);
  ```
- **Observed Failure**:
  - In `AnyPS5Spoofer.cpp:32–38`:
    ```cpp
    for (int bank = 0; bank < 4; bank++) {
        if (bank == 0) {
            SyncConsoleIdBlock(bank);
        } else {
            LogTelemetryEvent("BANK_SKIP", bank);
        }
    }
    ```
  - The node `if (bank == 0)` (`file_0_branch_16`) has `parentId: file_0_branch_15` (the `for` loop).
  - In `codeParser.ts`, `b.parentId === fnNode.id` evaluates to `false` for `file_0_branch_16`. The call at line 17 (`SyncConsoleIdBlock`) is instead attributed to the outer `for` loop node rather than the `if` branch.
  - In `Microscope2DCanvas.tsx`, `file.nodes.filter((b) => b.parentId === fn.id)` excludes `file_0_branch_16` from `map`. As a result, line 691 (`if (!src || !tgt) return;`) drops any edge connected to `file_0_branch_16`.

---

### 1.3 Quantified Measurement of Call Edges
By analyzing all 6 source files in `INITIAL_LCV_FILES`:
- **Total Function Calls Written in Source Code**: 39
- **Current Implementation Output**:
  - Found Call Edges: 25
  - Missing Call Edges: 14 (35.9% missing!)
- Breakdown of Missing Calls:
  1. `AnyPS5Spoofer.cpp:13`: `VerifySysconHandshake(0);` (Target missing)
  2. `AnyPS5Spoofer.cpp:29`: `ApplyKernelPatches(1000);` (Skipped by `fnNode.id === targetNode.id`)
  3. `SysconController.cs:9`: `ReadSysconEepromBlocks(portIndex);` (Caller missing)
  4. `SysconController.cs:10`: `UpdateLedStatusIndicator(1);` (Caller missing)
  5. `SysconController.cs:13`: `ResetUartBusConnection();` (Caller missing)
  6. `SysconController.cs:14`: `LogTelemetryEvent("SYSCON_FAIL", portIndex);` (Caller missing)
  7. `SysconController.cs:21`: `DecryptSblKeyslot(sector);` (Caller missing)
  8. `SysconController.cs:23`: `VerifyChecksumCrc32(sector);` (Caller missing)
  9. `SysconController.cs:26`: `SyncConsoleIdBlock(startBlock);` (Caller missing)
  10. `SysconController.cs:31`: `UpdateLedStatusIndicator(0);` (Caller missing)
  11. `SysconController.cs:33`: `LogTelemetryEvent("UART_ACTIVE", 1);` (Caller missing)
  12. `NvsStorageManager.cpp:30`: `ResetUartBusConnection();` (Target missing)
  13. `HypervisorBridge.rs:23`: `DecryptSblKeyslot(slot_id - 1);` (Skipped by `fnNode.id === targetNode.id`)
  14. `TelemetryLogger.py:7`: `ResetUartBusConnection()` (Target missing)

---

## 2. Logic Chain

1. **Premise 1 (Function Detection)**: An AST/code visualizer cannot create call edges if either the caller function or the callee function is not indexed.
   - Observation: `SysconController.cs` has 3 methods (`VerifySysconHandshake`, `ReadSysconEepromBlocks`, `ResetUartBusConnection`), all starting with `public void`.
   - Observation: `codeParser.ts:285` uses a regex where `public` matches the modifier group and `void` is captured as the function name, failing `\s*\(`.
   - Deduction: Because these 3 methods were never parsed as nodes, they were absent from `symbolMap` and `functionNodes`. This directly caused 12 of the 14 missing call edges.

2. **Premise 2 (Recursive Calls Inside Branches)**: A recursive call inside an `if`/`else` branch is a directed invocation from a conditional sub-branch node to the root function node.
   - Observation: `codeParser.ts:562` executes `if (fnNode.id === targetNode.id) return;` before checking child branches.
   - Deduction: This suppresses calls from `branchNode -> fnNode`. Removing this premature return and allowing `branchNode` to target `fnNode` recovers the 2 remaining missing call edges (`AnyPS5Spoofer.cpp:29` and `HypervisorBridge.rs:23`).

3. **Premise 3 (Canvas Visibility & Pin Binding)**: In `Microscope2DCanvas.tsx`, an edge is rendered if and only if both its `sourceId` and `targetId` exist in `finalNodesMap` (line 691).
   - Observation: `Microscope2DCanvas.tsx:526` populated `fnBranches` with `file.nodes.filter((b) => b.parentId === fn.id)`.
   - Deduction: Nested branches whose `parentId` is another branch or loop are omitted from `finalNodesMap`. Replacing this with line-range containment (`b.lineStart >= fn.lineStart && b.lineEnd <= fn.lineEnd`) guarantees that all branches and their call edges are included and rendered.

4. **Premise 4 (Experimental Verification)**:
   - When the improved parser was simulated on `INITIAL_LCV_FILES`:
     - Functions parsed: 13/13 (100%)
     - Call edges detected: 45 (covering 39/39 source call statements, with multi-branch occurrences)
     - Rendered on 2D Canvas: 45/45 (0 dropped)
     - TypeScript compilation & Vite build: succeeded with 0 errors.

---

## 3. Caveats

1. **Direct Function-Level Self-Loops**:
   - When a function calls itself directly from its root body (outside of any `if`/`else`/`for`/`while` branch), it is handled via the dedicated angular blue SVG `[LOOP]` wire in `Microscope2DCanvas.tsx` (lines 1461–1552). Linear circuit wires should only be drawn when the caller is a distinct sub-branch node (`branchNode.id !== targetNode.id`).
2. **Duplicate Symbol Names Across Files**:
   - If two different files define a function with the identical name (e.g. `Init()`), `symbolMap` should prioritize intra-file matching (`targetNode.fileId === fnNode.fileId`) before falling back to cross-file matching.
3. **Coordination with Requirement R2 (Return Nodes)**:
   - When Explorer 2 / implementer introduces dedicated return nodes (`NodeKind.RETURN` or return pins), any function call made inside a return statement expression (e.g. `return DecryptSblKeyslot(...);`) will be associated with that return node or its enclosing branch/function.

---

## 4. Conclusion & Proposed Code Modifications

All 14 missing function call edges can be resolved by applying localized edits to two files: `frontend/services/codeParser.ts` and `frontend/components/Microscope2DCanvas.tsx`.

### Modification 1: `frontend/services/codeParser.ts`

#### A. Refined `fnRegex` and Name Extraction
**Target File**: `frontend/services/codeParser.ts`  
**Lines**: 285–286, 300–301  
**Rationale**: Support access modifiers (`public`, `private`, `protected`, `pub`, `internal`, `static`, etc.) followed by return types (`void`, `int`, `bool`, custom types) across C++, C#, Rust, Java, Python, and TypeScript.

```ts
<<<< BEFORE (Line 285-286, 300-301)
  const fnRegex =
    /(?:(?:public|private|protected|static|virtual|inline|async|unsafe|extern|pub|fn|def|function)\s+)+([a-zA-Z_][a-zA-Z0-9_<>:]*)\s*\(([^)]*)\)|^\s*(?:const|let|var)\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*(?:async\s*)?\([^)]*\)\s*=>|^\s*(?:void|int|float|double|bool|string|char|auto|Node|SimpleNode\s*\*|Transform|GameObject|size_t)\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(([^)]*)\)/;
...
      const rawFnName = fnMatch[1] || fnMatch[3] || fnMatch[4] || `fn_${i + 1}`;
====
>>>> AFTER
  const fnRegex =
    /^\s*(?:(?:export\s+)?(?:public|private|protected|internal|pub(?:\([^)]+\))?|static|virtual|inline|async|unsafe|extern|final)\s+)*(?:(?:def|fn|function)\s+|(?:\b(?:void|int|float|double|bool|boolean|string|char|auto|size_t|uint\d+_t|int\d+_t|[A-Z][a-zA-Z0-9_<>:*&]*)\b(?:\s*\*|\s*&)?\s+))([a-zA-Z_][a-zA-Z0-9_]*)\s*\(([^)]*)\)|^\s*(?:const|let|var)\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*(?:async\s*)?\([^)]*\)\s*=>/;
...
      const rawFnName = fnMatch[1] || fnMatch[2] || `fn_${i + 1}`;
>>>>
```

#### B. Complete Branch Collection and Recursive Call Resolution
**Target File**: `frontend/services/codeParser.ts`  
**Lines**: 557–570, 603–606  
**Rationale**: Include all nested branches inside `fnNode` so nested calls (e.g. within `if` inside `for`) are attributed to their immediate branch, and allow recursive calls from branches to target the function node.

```ts
<<<< BEFORE (Line 557-564, 603-605)
  functionNodes.forEach((fnNode) => {
    const childBranches = allNodes.filter(
      (b) => b.parentId === fnNode.id && (b.kind === NodeKind.CONDITION || b.kind === NodeKind.LOOP)
    );

    symbolMap.forEach((targetNode, symbolName) => {
      if (fnNode.id === targetNode.id) return;
      if (targetNode.kind === NodeKind.CLASS) return;

      let matchedInChildBranch = false;
...
      if (!matchedInChildBranch) {
        const directOccurrences = findCallOccurrencesWithLineAndOutcome(
====
>>>> AFTER
  functionNodes.forEach((fnNode) => {
    const childBranches = allNodes.filter(
      (b) =>
        b.fileId === fnNode.fileId &&
        (b.kind === NodeKind.CONDITION || b.kind === NodeKind.LOOP) &&
        b.lineStart >= fnNode.lineStart &&
        b.lineEnd <= fnNode.lineEnd
    );

    symbolMap.forEach((targetNode, symbolName) => {
      if (targetNode.kind === NodeKind.CLASS) return;

      let matchedInChildBranch = false;
...
      if (!matchedInChildBranch && fnNode.id !== targetNode.id) {
        const directOccurrences = findCallOccurrencesWithLineAndOutcome(
>>>>
```

---

### Modification 2: `frontend/components/Microscope2DCanvas.tsx`

#### A. Include Nested Branches in 2D Node Positioning
**Target File**: `frontend/components/Microscope2DCanvas.tsx`  
**Line**: 526  
**Rationale**: Ensure all conditional and loop branches within a function are positioned in the 2D canvas column, allowing edges to connect to them.

```ts
<<<< BEFORE (Line 526)
          const fnBranches = file.nodes.filter((b) => b.parentId === fn.id);
====
>>>> AFTER
          const fnBranches = file.nodes.filter(
            (b) =>
              (b.kind === NodeKind.CONDITION || b.kind === NodeKind.LOOP) &&
              b.lineStart >= fn.lineStart &&
              b.lineEnd <= fn.lineEnd
          );
>>>>
```

---

## 5. Verification Method

1. **Parse & Call Edge Verification**:
   Execute the verification test script against `DEFAULT_REPOSITORY`:
   ```bash
   npx --prefix frontend vite-node c:\Users\jerem\Documents\Projekte\LCV\.agents\teamwork\explorer_r1_3_gen2\test_full_repo.ts
   ```
   **Expected Result**:
   - Total nodes: 90
   - Total call edges: 45
   - Total calls in code verified: 39/39 (100% matched, 0 missing)

2. **2D Canvas Edge Rendering Simulation**:
   Execute the canvas simulator to ensure no edges are dropped:
   ```bash
   npx --prefix frontend vite-node c:\Users\jerem\Documents\Projekte\LCV\.agents\teamwork\explorer_r1_3_gen2\sim_canvas.ts
   ```
   **Expected Result**:
   - `Rendered call edges on 2D canvas: 45/45, Dropped: 0`

3. **Production Build Validation**:
   Execute the Vite production build to guarantee type safety and bundle integrity:
   ```bash
   npm --prefix frontend run build
   ```
   **Expected Result**: Build completes cleanly with exit code 0.
