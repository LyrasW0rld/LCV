## 2026-10-28T19:01:54Z
You are Worker 1 (Full Stack & Systems Worker) for the LCV visualizer enhancement milestone.
Your working directory is: c:\Users\jerem\Documents\Projekte\LCV\.agents\teamwork\worker_r1_1_gen2\

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

You MUST read the following specification and investigation files before beginning implementation:
1. Original Request: c:\Users\jerem\Documents\Projekte\LCV\.agents\teamwork\ORIGINAL_REQUEST.md
2. Project Scope & Architecture: c:\Users\jerem\Documents\Projekte\LCV\.agents\teamwork\orchestrator_r1\SCOPE.md
3. Explorer 1 Report (R1 Navigation & R4 Batch Script): c:\Users\jerem\Documents\Projekte\LCV\.agents\teamwork\explorer_r1_1_gen2\handoff.md
4. Explorer 2 Report (R2 Dedicated Return Nodes): c:\Users\jerem\Documents\Projekte\LCV\.agents\teamwork\explorer_r1_2_gen2\handoff.md
5. Explorer 3 Report (R3 Function Call Edges): c:\Users\jerem\Documents\Projekte\LCV\.agents\teamwork\explorer_r1_3_gen2\handoff.md

Your task is to implement all 4 requirements:
- **R1 (Persistent 2D/3D Navigation Switch)**:
  - Add `get3DStyleLabel` helper in `frontend/types.ts`.
  - Pass `render3DStyle` and `onToggle2D3D` where needed.
  - Update `frontend/App.tsx` global header button to show `Switch to 3D (<Active 3D Style>)` in 2D mode and `Switch to 2D Nodes` in 3D mode.
  - Add `Switch to 2D Nodes` button in `frontend/components/Recon3DCanvas.tsx` top-left toolbar across all 3D modes (Code City, 3D Force-Graph, Virtual Code).
  - Add `Switch to 3D (<Active 3D Style>)` button in `frontend/components/Microscope2DCanvas.tsx` top-left overlay.
  - Verify toggling back from 2D opens the most recently active 3D view.

- **R2 (Dedicated Return Node Visualization in 2D Nodes)**:
  - Add `NodeKind.RETURN = 'RETURN'` and `returnExpression?: string` in `frontend/types.ts`.
  - In `frontend/services/codeParser.ts`, parse return statements inside functions and conditional branches (`if`/`else`/loops) into dedicated `NodeKind.RETURN` nodes.
  - In `frontend/components/Microscope2DCanvas.tsx`, style return nodes with pink/rose headers and accents (`bg-[#351424]`, `border-rose-500/80`, `shadow-[0_0_15px_rgba(244,63,94,0.22)]`), title `"return"`, badge `[RET]`.
  - Render an input pin displaying `${returnExpression || 'void'} l${callLine}` and strictly omit all output pins.
  - Expand canvas layout to 4 columns (`BOX_WIDTH = 1240`) to cleanly route direct and branch return nodes without overlapping.
  - Update `frontend/constants.ts` sample code if helpful so return statements in `if`, `else`, and at the end of functions can be verified immediately.

- **R3 (Function Call Edge Visualization in 2D Nodes)**:
  - In `frontend/services/codeParser.ts`, update `fnRegex` to match functions with access modifiers followed by return types across languages (resolving methods in `SysconController.cs` and other files).
  - Include all nested child branches via line-range containment and resolve branch-to-function recursive calls.
  - In `frontend/components/Microscope2DCanvas.tsx`, position nested branches so all 45 call edges across `DEFAULT_REPOSITORY` are rendered without dropping.

- **R4 (Automated Local Testing Batch Script)**:
  - Create `start_local.bat` in the repository root.
  - Use `cd /d "%~dp0"`, check for `node` and `npm`, run `call npm install`, check `%errorlevel%`, print the local URL (`http://localhost:5173/`), and launch `call npm run dev`.

File Write Ownership:
You have exclusive write ownership of:
- `frontend/types.ts`
- `frontend/services/codeParser.ts`
- `frontend/components/Microscope2DCanvas.tsx`
- `frontend/components/Recon3DCanvas.tsx`
- `frontend/App.tsx`
- `frontend/constants.ts`
- `start_local.bat`
- Files in your working directory `c:\Users\jerem\Documents\Projekte\LCV\.agents\teamwork\worker_r1_1_gen2\`

Verification Requirements:
- Run typecheck and production build (`npm run build`).
- Verify no TypeScript or Vite build errors occur.
- Run tests (`npm test` and any node verification scripts).
- Document all modified files, diffs, build output, and verification results in:
  `c:\Users\jerem\Documents\Projekte\LCV\.agents\teamwork\worker_r1_1_gen2\handoff.md`

When complete, notify the orchestrator via message.
