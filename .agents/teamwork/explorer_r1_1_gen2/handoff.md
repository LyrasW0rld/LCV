# Investigation Report: R1 (Persistent 2D/3D View Navigation) & R4 (Local Testing Batch Script)

## 1. Observation

### 1.1 Architecture & View State Structure
- **Root Workspace (`package.json`)**:
  - Line 7-9: Declares `"workspaces": ["frontend"]`.
  - Line 10-16: Declares root scripts:
    - `"dev": "npm run dev --prefix frontend"`
    - `"build": "npm run build --prefix frontend"`
    - `"postbuild": "node scripts/postbuild.js"`
    - `"preview": "npm run preview --prefix frontend"`
    - `"test": "node scripts/verify-build.js"`
- **Frontend Workspace (`frontend/package.json`)**:
  - Line 9-13: `"dev": "vite"`, `"build": "vite build"`, `"preview": "vite preview"`.
  - Dependencies: `lucide-react` (0.475.0), `react` (18.3.1), `react-dom` (18.3.1), `three` (0.160.0).
  - Dev dependencies: `@vitejs/plugin-react` (4.3.4), `typescript` (5.7.3), `vite` (5.4.14).
- **Core View Mode Definitions (`frontend/types.ts`)**:
  - Line 1-4:
    ```typescript
    export enum VisualizerMode {
      MODE_2D = '2D',
      MODE_3D = '3D',
    }
    ```
  - Line 11-15:
    ```typescript
    export enum Render3DStyle {
      VIRTUAL_CODE = 'VIRTUAL_CODE',
      CODE_CITY = 'CODE_CITY',
      FORCE_GRAPH = 'FORCE_GRAPH',
    }
    ```
- **State Management & Persistence (`frontend/App.tsx`)**:
  - Lines 49-122: `detectInitialUrlViewConfig()` evaluates URL search/hash parameters (`?Code-City`, `?3DForce-Graph`, `?Virtual-Code-3D`, `?V=2D`, `?V=3D`) and falls back to persistent cookies (`lcv_view_dimension` and `lcv_3d_style`).
  - Lines 135-136: Active states are stored via React hooks:
    ```typescript
    const [mode, setMode] = useState<VisualizerMode>(initialConfig.current.mode);
    const [render3DStyle, setRender3DStyle] = useState<Render3DStyle>(initialConfig.current.style3D);
    ```
  - Lines 388-399: Switching logic handles dimension and 3D styles:
    ```typescript
    const toggle2D3D = () => {
      setMode((prev) => {
        const next = prev === VisualizerMode.MODE_2D ? VisualizerMode.MODE_3D : VisualizerMode.MODE_2D;
        setPreferenceCookie('lcv_view_dimension', next);
        return next;
      });
    };

    const handleChangeRender3DStyle = (nextStyle: Render3DStyle) => {
      setRender3DStyle(nextStyle);
      setPreferenceCookie('lcv_3d_style', nextStyle);
    };
    ```
  - Lines 668-719: Main view conditionally mounts either `<Microscope2DCanvas>` or `<Recon3DCanvas>`:
    ```tsx
    <div className="flex-1 h-full relative overflow-hidden">
      {mode === VisualizerMode.MODE_2D ? (
        <Microscope2DCanvas ... />
      ) : (
        <Recon3DCanvas
          repository={repository}
          graphFocusMode={graphFocusMode}
          render3DStyle={render3DStyle}
          onChangeRender3DStyle={handleChangeRender3DStyle}
          ...
        />
      )}
    </div>
    ```

### 1.2 View Navigation Deficiencies Directly Observed
- **Header Button in `frontend/App.tsx` (Lines 482-499)**:
  - The existing button renders:
    ```tsx
    <button
      type="button"
      onClick={toggle2D3D}
      className="px-3 py-1.5 rounded bg-[#231B0E] hover:bg-[#2F2412] border border-[#E5A93C]/70 text-[#F7D794] font-sans text-xs font-semibold flex items-center gap-1.5 transition shadow-xs"
      title="Switch between 2D Electronic Graph (?V=2D) and 3D Views (?Code-City, ?3DForce-Graph, ?Virtual-Code-3D)"
    >
      {mode === VisualizerMode.MODE_2D ? (
        <>
          <Box className="w-3.5 h-3.5 text-[#E5A93C]" />
          <span>Switch 2D / 3D ({mode})</span>
        </>
      ) : (
        <>
          <Layers className="w-3.5 h-3.5 text-[#E5A93C]" />
          <span>Switch 2D / 3D ({mode})</span>
        </>
      )}
    </button>
    ```
  - Defect: The label `Switch 2D / 3D (2D)` does not indicate which 3D visualization style will be activated when toggling from 2D.
- **In-Canvas 3D View Controls (`frontend/components/Recon3DCanvas.tsx`, Lines 1568-1640)**:
  - The top-left floating bar (`absolute top-3 left-3 z-20`) exclusively contains buttons for `Code City 3D`, `3D Force-Graph`, and `Virtual Code 3D`.
  - Defect: There is no 2D switch button inside the 3D viewport canvas. Users interacting with 3D modes lack a direct in-view control to return to 2D Nodes.
- **In-Canvas 2D View Controls (`frontend/components/Microscope2DCanvas.tsx`, Lines 1195-1215)**:
  - The top-left floating element (`absolute top-3 left-3 z-20`) is a non-interactive legend with CSS class `pointer-events-none`.
  - Defect: There is no 3D switch button inside the 2D Nodes viewport canvas.

### 1.3 Batch Script & Local Server Observation
- Currently, no `.bat` file exists anywhere in the repository (`Get-ChildItem -Filter *.bat -Recurse` yielded zero files).
- Executing `npm run dev` directly launches `vite` in `frontend/`, which initializes in ~450ms and binds to `http://localhost:5173/`.
- Executing `npm run build` runs `vite build` + `node scripts/postbuild.js`, outputting static bundles to `../dist/` in ~5.8s.
- Executing `npm test` runs `node scripts/verify-build.js`, passing 23 static integrity checks.

---

## 2. Logic Chain

1. **View State Retention**:
   - `render3DStyle` state in `frontend/App.tsx` (line 136) is updated whenever `handleChangeRender3DStyle` is invoked (line 396).
   - In `toggle2D3D` (line 388), only `mode` is flipped between `MODE_2D` and `MODE_3D`. `render3DStyle` is never reset.
   - Therefore, when switching from any 3D view (e.g. `3D Force-Graph` or `Virtual Code 3D`) to `MODE_2D`, `render3DStyle` remains unchanged in memory and in the `lcv_3d_style` cookie.
   - When the user subsequently toggles back from `MODE_2D` to `MODE_3D`, `Recon3DCanvas` receives the preserved `render3DStyle`.
   - Consequently, to satisfy R1's requirement to "remember and toggle to the most recently active 3D visualization view", no new global state container is required; exposing `render3DStyle` as `active3DStyle` to the UI components allows dynamic button labels and seamless bi-directional toggling.

2. **Persistent & Accessible Button Placement**:
   - The user request specifies: "A 2D/3D toggle button is displayed in 3D views (Code City, 3D Force Graph, Virtual Code) and in the 2D Nodes graph."
   - To make this navigation robust and accessible:
     a. **Header Bar (`frontend/App.tsx`)**: Update the persistent top navigation button to dynamically display `Switch to 3D (<Active 3D Style>)` (e.g., `Switch to 3D (Code City 3D)`, `Switch to 3D (3D Force-Graph)`, or `Switch to 3D (Virtual Code 3D)`) when in 2D mode, and `Switch to 2D Nodes` when in 3D mode.
     b. **3D Canvas Toolbar (`frontend/components/Recon3DCanvas.tsx`)**: Add a prominent `Switch to 2D Nodes` button at the left edge of the top-left floating switcher bar (`absolute top-3 left-3 z-20`), preceding the three 3D mode buttons.
     c. **2D Canvas Overlay (`frontend/components/Microscope2DCanvas.tsx`)**: Add an interactive `Switch to 3D (<Active 3D Style>)` button at `absolute top-3 left-3 z-20` immediately alongside the pin legend.
   - This ensures the button remains visible and reachable whether the user is looking at the global header or working directly inside the canvas viewports.

3. **Windows Batch Script (`start_local.bat`) Requirements**:
   - On Windows, `npm` is a command script (`npm.cmd`). Invoking `npm install` without `call` in a `.bat` file causes Windows `cmd.exe` to hand over execution permanently, terminating the batch file before `npm run dev` can run.
   - Using `call npm install` and `call npm run dev` guarantees proper sequencing.
   - Using `cd /d "%~dp0"` guarantees correct working directory execution even if invoked from outside the root or double-clicked via Windows Explorer.
   - Checking `%errorlevel%` after `npm install` guarantees that build/dependency errors are caught and reported without blindly launching the Vite dev server.

---

## 3. Caveats

- **No Caveats** regarding architecture or state retention: React state and cookies already retain `render3DStyle` during toggling.
- **URL Synchronization**: The application does not alter `window.location.search` during runtime in-memory mode switches (it relies on cookies and React state for runtime persistence, which aligns with the existing architecture). If deep linking is desired at launch time, URL parameters (`?V=2D`, `?Code-City`, etc.) continue to be handled by `detectInitialUrlViewConfig()`.

---

## 4. Conclusion & Proposed Code Modifications

### 4.1 R1 Code Modifications

#### A. Add Helper in `frontend/types.ts`
At line 16, insert the helper function to derive human-readable labels from `Render3DStyle`:
```typescript
export function get3DStyleLabel(style?: Render3DStyle): string {
  switch (style) {
    case Render3DStyle.CODE_CITY:
      return 'Code City 3D';
    case Render3DStyle.FORCE_GRAPH:
      return '3D Force-Graph';
    case Render3DStyle.VIRTUAL_CODE:
      return 'Virtual Code 3D';
    default:
      return 'Code City 3D';
  }
}
```

#### B. Update `frontend/App.tsx`
1. Import `get3DStyleLabel` from `./types` at line 13.
2. In the header button (lines 482-499), update title and labels:
```tsx
<button
  type="button"
  onClick={toggle2D3D}
  className="px-3 py-1.5 rounded bg-[#231B0E] hover:bg-[#2F2412] border border-[#E5A93C]/70 text-[#F7D794] font-sans text-xs font-semibold flex items-center gap-1.5 transition shadow-xs"
  title={
    mode === VisualizerMode.MODE_2D
      ? `Switch directly to 3D View (${get3DStyleLabel(render3DStyle)})`
      : 'Switch directly to 2D Nodes Graph'
  }
>
  {mode === VisualizerMode.MODE_2D ? (
    <>
      <Box className="w-3.5 h-3.5 text-[#E5A93C]" />
      <span>Switch to 3D ({get3DStyleLabel(render3DStyle)})</span>
    </>
  ) : (
    <>
      <Layers className="w-3.5 h-3.5 text-[#E5A93C]" />
      <span>Switch to 2D Nodes</span>
    </>
  )}
</button>
```
3. Pass `onToggle2D3D={toggle2D3D}` and `active3DStyle={render3DStyle}` to `<Microscope2DCanvas>` (lines 670-698).
4. Pass `onToggle2D3D={toggle2D3D}` to `<Recon3DCanvas>` (lines 699-718).

#### C. Update `frontend/components/Recon3DCanvas.tsx`
1. Add `Layers` to lucide-react import (line 28).
2. Extend `Recon3DCanvasProps` interface (line 30) with `onToggle2D3D?: () => void;`.
3. Destructure `onToggle2D3D` in component parameters (line 172).
4. In the top-left floating bar (line 1569), insert the 2D switch button:
```tsx
{/* Top-Left 3D Mode Switcher: 2D Nodes Toggle | Code City 3D | 3D Force-Graph | Virtual Code 3D */}
<div className="absolute top-3 left-3 z-20 flex flex-wrap items-center gap-2 bg-[#0D0D12]/95 border border-zinc-800 p-1.5 rounded text-xs font-sans shadow-xl">
  {onToggle2D3D && (
    <>
      <button
        type="button"
        onClick={onToggle2D3D}
        className="px-3 py-1 rounded flex items-center gap-1.5 font-semibold transition bg-[#231B0E] hover:bg-[#2F2412] text-[#F7D794] border border-[#E5A93C]/80 shadow-xs"
        title="Switch directly to 2D Nodes Graph"
      >
        <Layers className="w-3.5 h-3.5 text-[#E5A93C]" />
        <span>Switch to 2D Nodes</span>
      </button>
      <div className="w-[1px] h-4 bg-zinc-700/80 my-auto" />
    </>
  )}

  <button
    type="button"
    onClick={() => onChangeRender3DStyle(Render3DStyle.CODE_CITY)}
    className={`px-3 py-1 rounded flex items-center gap-1.5 font-semibold transition ${
      render3DStyle === Render3DStyle.CODE_CITY
        ? 'bg-[#231B0E] border border-[#E5A93C] text-[#F7D794]'
        : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200'
    }`}
    title="URL Parameter: ?Code-City"
  >
    <Building2 className="w-3.5 h-3.5 text-[#E5A93C]" />
    <span>Code City 3D</span>
  </button>
```

#### D. Update `frontend/components/Microscope2DCanvas.tsx`
1. Add `Box` to lucide-react imports (line 13).
2. Import `Render3DStyle, get3DStyleLabel` from `../types` (line 2).
3. Extend `Microscope2DCanvasProps` interface (line 26) with:
   `onToggle2D3D?: () => void;`
   `active3DStyle?: Render3DStyle;`
4. Destructure `onToggle2D3D, active3DStyle` in component parameters (line 272).
5. At line 1195, wrap top-left controls with the interactive 3D switch button:
```tsx
{/* Top-Left View Switcher & Legend */}
<div className="absolute top-3 left-3 z-20 flex flex-wrap items-center gap-2">
  {onToggle2D3D && (
    <button
      type="button"
      onClick={onToggle2D3D}
      className="px-3 py-1.5 rounded bg-[#231B0E] hover:bg-[#2F2412] border border-[#E5A93C]/80 text-[#F7D794] font-sans text-xs font-semibold flex items-center gap-1.5 transition shadow-xl"
      title={`Switch directly to 3D View (${get3DStyleLabel(active3DStyle)})`}
    >
      <Box className="w-3.5 h-3.5 text-[#E5A93C]" />
      <span>Switch to 3D ({get3DStyleLabel(active3DStyle)})</span>
    </button>
  )}

  <div className="pointer-events-none flex flex-wrap items-center gap-4 bg-[#0D0D12]/95 border border-zinc-800 px-3 py-1.5 rounded text-xs font-sans">
    <span className="flex items-center gap-1.5 text-[#F7D794] font-semibold">
      <span className="w-2.5 h-2.5 rounded-xs bg-[#E5A93C] inline-block" />
      Line-Numbered Pins (in lXX / out lXX)
    </span>
    ...
  </div>
</div>
```

---

### 4.2 R4 Batch Script Design: `start_local.bat`

Create `start_local.bat` in the repository root (`c:\Users\jerem\Documents\Projekte\LCV\start_local.bat`):
```bat
@echo off
setlocal enabledelayedexpansion

:: ======================================================================
:: LCV (Lyra's Code Visualizer) — Automated Local Development Launcher
:: ======================================================================

echo ======================================================================
echo  LCV (Lyra's Code Visualizer) - Automated Local Development Launcher
echo ======================================================================
echo.

:: Ensure working directory is the repository root containing this script
cd /d "%~dp0"
echo [LCV] Working Directory: %CD%

:: Check for Node.js
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Node.js was not found in your system PATH!
    echo Please install Node.js (v18.x - v22.x recommended) from https://nodejs.org/
    echo.
    pause
    exit /b 1
)

:: Check for npm
where npm >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] npm was not found in your system PATH!
    echo Please ensure npm is installed and added to your system PATH.
    echo.
    pause
    exit /b 1
)

:: Log Node and npm versions
for /f "tokens=*" %%v in ('node -v') do set NODE_VER=%%v
for /f "tokens=*" %%v in ('npm -v') do set NPM_VER=%%v
echo [LCV] Node.js Version: %NODE_VER%
echo [LCV] npm Version:     %NPM_VER%
echo.

:: Step 1: Install all workspace dependencies via root npm install
echo ======================================================================
echo  Step 1/2: Installing workspace dependencies (npm install)...
echo ======================================================================
call npm install
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Dependency installation failed with exit code %errorlevel%!
    echo Please review the npm error messages above.
    echo.
    pause
    exit /b %errorlevel%
)
echo [LCV] Dependencies successfully installed and verified.
echo.

:: Step 2: Start Vite development server
echo ======================================================================
echo  Step 2/2: Starting local Vite development server (npm run dev)...
echo ======================================================================
echo.
echo  LCV Local Application URL:
echo  ----------------------------------------
echo  Local:   http://localhost:5173/
echo  ----------------------------------------
echo.
echo  The development server is launching now.
echo  Open your web browser at http://localhost:5173/ to test LCV.
echo  Press Ctrl+C in this console window to stop the server anytime.
echo.

call npm run dev
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Vite development server stopped with error code %errorlevel%.
    echo.
    pause
    exit /b %errorlevel%
)
```

---

## 5. Verification Method

### 5.1 Verification Commands
1. **Compilation & Static Integrity Check**:
   ```powershell
   npm run build
   npm test
   ```
   Both commands must exit with code 0. `npm test` must verify all 23 static bundle checks.
2. **Local Development Server Verification**:
   ```powershell
   npm run dev
   ```
   Must display `VITE ready` and report local URL `http://localhost:5173/`.
3. **Batch Script Execution**:
   ```powershell
   cmd.exe /c start_local.bat
   ```
   Verify that:
   - Working directory is set correctly to repository root.
   - Node and npm versions are logged.
   - `npm install` completes successfully.
   - The banner announces `http://localhost:5173/`.
   - The Vite dev server starts without halting.

### 5.2 Interactive Navigation Test Sequence
1. Open browser at `http://localhost:5173/`.
2. Notice initial view is 2D Nodes graph.
3. Observe toggle button: Displays `Switch to 3D (Code City 3D)` in both header and top-left canvas bar.
4. Click toggle button -> view transitions immediately to Code City 3D.
5. In Code City 3D, click `3D Force-Graph` button. View updates to 3D Force-Graph.
6. Observe toggle button: Displays `Switch to 2D Nodes` in both header and 3D canvas toolbar.
7. Click `Switch to 2D Nodes` -> view transitions immediately to 2D Nodes graph.
8. In 2D Nodes graph, observe toggle button: Displays `Switch to 3D (3D Force-Graph)`.
9. Click toggle button -> view returns directly to 3D Force-Graph (not resetting to Code City).
10. In 3D view, click `Virtual Code 3D`. Click `Switch to 2D Nodes`. Observe button displays `Switch to 3D (Virtual Code 3D)`. Click it -> returns directly to Virtual Code 3D.

### 5.3 Invalidation Conditions
- Any change where `toggle2D3D` resets `render3DStyle` to default instead of preserving `render3DStyle`.
- Omitting `call` before `npm` in `.bat`, which causes premature termination in Windows cmd.
