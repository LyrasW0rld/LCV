# Scope: LCV Visualizer Enhancements (R1 - R4)

## Architecture
- **Frontend Framework**: React 18 with TypeScript and Tailwind CSS, bundled with Vite.
- **2D Nodes Graph**: SVG/HTML electronic canvas in `frontend/components/Microscope2DCanvas.tsx` displaying functions, branches, statements, and return nodes with animated directional wiring and pin sockets.
- **3D Visualization Modes**: Three.js viewport in `frontend/components/Recon3DCanvas.tsx` supporting Code City (`CODE_CITY`), 3D Force-Graph (`FORCE_GRAPH`), and Virtual Code (`VIRTUAL_CODE`).
- **Parsing Engine**: `frontend/services/codeParser.ts` extracting AST nodes, control flow branches, and call edges across C++, C#, Rust, Python, and C.
- **Batch Automation**: Windows batch script `start_local.bat` in the repository root for automated `npm install` and `npm run dev`.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | R1: Persistent 2D/3D Navigation Switch | Direct 2D/3D toggle button in header, 3D canvas toolbar, and 2D canvas overlay; remembers and toggles to the most recently active 3D mode | M1 | ORIGINAL_REQUEST § R1 |
| 2 | R2: Dedicated Return Node Visualization | Specialized return node for all return statements (in functions and if/else branches) with pink/rose styling, "return" title, input pin (`${expr} l${line}`), no output pins | M1 | ORIGINAL_REQUEST § R2 |
| 3 | R3: Function Call Edge Visualization | Detect all function calls (including access modifier functions, recursive calls, and nested branches) and render directed edges from callers to callee functions | M1 | ORIGINAL_REQUEST § R3 |
| 4 | R4: Automated Local Testing Batch Script | `start_local.bat` in root executing `call npm install`, verifying `%errorlevel%`, displaying `http://localhost:5173/`, and launching `call npm run dev` | M1 | ORIGINAL_REQUEST § R4 |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Full Visualizer Enhancement & Test Automation | R1 (Persistent 2D/3D Navigation), R2 (Dedicated Return Nodes), R3 (Function Call Edges), R4 (start_local.bat) | none | DONE |

## Interface Contracts & Data Models

### 1. Types & Data Structures (`frontend/types.ts`)
```typescript
export enum NodeKind {
  CLASS = 'CLASS',
  FUNCTION = 'FUNCTION',
  CONDITION = 'CONDITION',
  LOOP = 'LOOP',
  STATEMENT = 'STATEMENT',
  RECURSION = 'RECURSION',
  RETURN = 'RETURN' // R2 addition
}

export interface CodeNode {
  // Existing fields ...
  returnExpression?: string; // R2 addition: captures expression returned
}

export function get3DStyleLabel(style: Render3DStyle): string {
  switch (style) {
    case Render3DStyle.CODE_CITY: return 'Code City 3D';
    case Render3DStyle.FORCE_GRAPH: return '3D Force-Graph';
    case Render3DStyle.VIRTUAL_CODE: return 'Virtual Code 3D';
    default: return '3D View';
  }
}
```

### 2. AST Parsing & Graph Construction (`frontend/services/codeParser.ts`)
- **Return Statement Parsing**:
  - Regex: `/^\s*(?:}\s*)?(?:else\s+)?\breturn\b(?:\s+(.*?))?\s*;?\s*$/`
  - Creates `CodeNode` with `kind: NodeKind.RETURN`, `label: 'return'`, `symbolName: expr ? 'return ' + expr : 'return'`, `color: '#F43F5E'`.
  - Links AST edge from enclosing branch (`currentConditionOrLoop`) or `currentFunction` to return node.
- **Function Detection (`fnRegex`)**:
  - Updated regex matching access modifiers followed by return types:
    `/^\s*(?:(?:export\s+)?(?:public|private|protected|internal|pub(?:\([^)]+\))?|static|virtual|inline|async|unsafe|extern|final)\s+)*(?:(?:def|fn|function)\s+|(?:\b(?:void|int|float|double|bool|boolean|string|char|auto|size_t|uint\d+_t|int\d+_t|[A-Z][a-zA-Z0-9_<>:*&]*)\b(?:\s*\*|\s*&)?\s+))([a-zA-Z_][a-zA-Z0-9_]*)\s*\(([^)]*)\)|^\s*(?:const|let|var)\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*(?:async\s*)?\([^)]*\)\s*=>/`
- **Call Edge Generation**:
  - Find all branches using line-range containment within the function (`b.lineStart >= fnNode.lineStart && b.lineEnd <= fnNode.lineEnd`).
  - Allow recursive branch-to-function calls (`if (!matchedInChildBranch && fnNode.id !== targetNode.id)`).

### 3. Canvas Rendering & UI (`frontend/components/Microscope2DCanvas.tsx`, `Recon3DCanvas.tsx`, `App.tsx`)
- **R1 Navigation**:
  - Global Header (`App.tsx`): Displays `Switch to 3D (${get3DStyleLabel(render3DStyle)})` in 2D mode, and `Switch to 2D Nodes` in 3D mode.
  - 3D Viewport (`Recon3DCanvas.tsx`): Button `Switch to 2D Nodes` in the top-left switcher bar.
  - 2D Viewport (`Microscope2DCanvas.tsx`): Button `Switch to 3D (${get3DStyleLabel(render3DStyle)})` in top-left overlay.
- **R2 Return Node Styling & Pins**:
  - Card background: `bg-[#351424]`, border: `border-rose-500/80`, shadow: `shadow-[0_0_15px_rgba(244,63,94,0.22)]`.
  - Header: `bg-[#4C1D35] text-rose-200 border-b border-rose-500/60`, badge `[RET]`, title `"return"`.
  - Input pin: Displays `${returnExpression || 'void'} l${callLine}`.
  - Output pin: Strictly omitted (no output pins for `NodeKind.RETURN`).
  - Layout: 4 columns (`BOX_WIDTH = 1240`) for clean hierarchy and wire routing.
- **R3 Edge Rendering**:
  - Filter child branches via line-range containment so nested branch nodes and their call edges are included in the positioned node map.
  - Ensure all call edges render directed circuit wires from caller pins to callee function pins.

### 4. Windows Batch Script (`start_local.bat`)
- Location: root directory `start_local.bat`.
- Uses `cd /d "%~dp0"` to guarantee correct path.
- Checks `node` and `npm` in PATH.
- Executes `call npm install`.
- Verifies `%errorlevel% == 0`.
- Outputs local URL `http://localhost:5173/`.
- Executes `call npm run dev`.

## Code Layout & File Boundaries
- `frontend/types.ts`: NodeKind enum, CodeNode interface, get3DStyleLabel helper.
- `frontend/services/codeParser.ts`: Function regex, return statement parser, call edge resolution.
- `frontend/components/Microscope2DCanvas.tsx`: Return node styling/pins, 2D/3D switch button, 4-column layout, nested branch inclusion.
- `frontend/components/Recon3DCanvas.tsx`: Switch to 2D Nodes button in 3D toolbar.
- `frontend/App.tsx`: Header 2D/3D toggle button label and props forwarding.
- `frontend/constants.ts`: Ensure sample code contains return statements across branches for immediate visual verification.
- `start_local.bat`: Automated local setup script in workspace root.
