Enhance the LCV code visualizer with persistent 2D/3D navigation switching, dedicated return node visualization for functions, verified function call edge rendering, and an automated Windows batch test script for production use.

Working directory: c:\Users\jerem\Documents\Projekte\LCV
Integrity mode: development

## Requirements

### R1. Persistent 2D/3D View Navigation
Provide a direct 2D/3D switch button that remains visible and accessible across both 3D visualization modes (Code City, 3D Force Graph, and Virtual Code) and the 2D Nodes graph. Clicking the button must toggle directly between the 2D Nodes graph and the most recently active 3D visualization view so the user can quickly switch back and forth between corresponding representations.

### R2. Dedicated Return Node Visualization in 2D Nodes
When visualizing functions in the 2D Nodes graph, every return statement—whether located inside conditional branches (`if`/`else`) or at the end of a function—must be rendered as a dedicated, specialized node rather than a standard code node. The return node must feature pink/rose header styling or accents, display "return" as its label/title, provide an input pin displaying the returned value/expression (and line), and omit any output pins.

### R3. Function Call Edge Visualization in 2D Nodes
Verify and ensure that every function call made within visualized code is detected and rendered as an edge/connection between caller nodes and callee function nodes in the 2D Nodes graph view.

### R4. Automated Local Testing Batch Script
Provide a Windows batch script (`start_local.bat` in the repository root) that automatically installs all required workspace dependencies via `npm install` and starts the local Vite development server (`npm run dev`) so the website can be tested immediately in a browser.

## Acceptance Criteria

### Navigation
- [ ] A 2D/3D toggle button is displayed in 3D views (Code City, 3D Force Graph, Virtual Code) and in the 2D Nodes graph.
- [ ] Clicking the 2D/3D toggle button in any 3D view switches directly to the 2D Nodes graph view.
- [ ] Clicking the 2D/3D toggle button from the 2D Nodes graph view returns directly to the previously active 3D view.

### Return Node Visualization
- [ ] In the 2D Nodes graph, functions with return statements display a dedicated return node for each return statement (including returns inside `if`, `else`, and at the end of the function).
- [ ] Each return node has visible pink/rose styling/accenting distinct from standard nodes.
- [ ] Each return node displays "return" as its header/title.
- [ ] Each return node possesses an input pin displaying the returned expression/value and line information.
- [ ] Return nodes have no output pin.

### Function Call Edges
- [ ] In the 2D Nodes graph, directed edges are rendered representing function calls from caller nodes to the corresponding callee function nodes across parsed code.

### Local Testing Script
- [ ] A `.bat` file exists in the repository root that executes dependency installation (`npm install`) across the workspace.
- [ ] The `.bat` file automatically launches the local Vite development server upon completion of dependency installation.
- [ ] Running the script provides the local URL (e.g. `http://localhost:5173`) where the application runs without build or runtime errors.

## Verification Resources
- Use the built-in default repositories and sample code in LCV (e.g. `DEFAULT_REPOSITORY` in `frontend/constants.ts`) to verify 2D/3D switching, return node rendering, and function call edges.
