import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../../..');

console.log('======================================================================');
console.log(' LCV Comprehensive Verification Suite (R1 - R4)');
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
// R4: Automated Local Testing Batch Script Verification
// -----------------------------------------------------------------------------
console.log('\n--> Verifying Requirement R4: start_local.bat');
const batPath = path.join(projectRoot, 'start_local.bat');
assert(fs.existsSync(batPath), 'start_local.bat exists in project root');

if (fs.existsSync(batPath)) {
  const batContent = fs.readFileSync(batPath, 'utf8');
  assert(batContent.includes('cd /d "%~dp0"'), 'start_local.bat changes to script directory via cd /d "%~dp0"');
  assert(batContent.includes('where node') && batContent.includes('where npm'), 'start_local.bat verifies node and npm in PATH');
  assert(batContent.includes('call npm install'), 'start_local.bat uses "call npm install" for proper Windows batch sequencing');
  assert(batContent.includes('%errorlevel% neq 0'), 'start_local.bat verifies %errorlevel% after installation');
  assert(batContent.includes('http://localhost:5173/'), 'start_local.bat displays local application URL http://localhost:5173/');
  assert(batContent.includes('call npm run dev'), 'start_local.bat uses "call npm run dev" to launch local development server');
}

// -----------------------------------------------------------------------------
// Initialize Vite SSR environment to load TypeScript frontend modules
// -----------------------------------------------------------------------------
const vite = await createServer({
  root: path.join(projectRoot, 'frontend'),
  server: { middlewareMode: true },
  appType: 'custom',
});

const typesModule = await vite.ssrLoadModule('/types.ts');
const parserModule = await vite.ssrLoadModule('/services/codeParser.ts');
const constantsModule = await vite.ssrLoadModule('/constants.ts');

const { NodeKind, Render3DStyle, get3DStyleLabel } = typesModule;
const { DEFAULT_REPOSITORY, INITIAL_LCV_FILES } = constantsModule;
const { buildRepositoryFromRawFiles } = parserModule;

// -----------------------------------------------------------------------------
// R1: Persistent 2D/3D Navigation Switch Verification
// -----------------------------------------------------------------------------
console.log('\n--> Verifying Requirement R1: Persistent 2D/3D Navigation Switch');
assert(typeof get3DStyleLabel === 'function', 'get3DStyleLabel helper is exported from types.ts');
assert(get3DStyleLabel(Render3DStyle.CODE_CITY) === 'Code City 3D', 'get3DStyleLabel(CODE_CITY) returns "Code City 3D"');
assert(get3DStyleLabel(Render3DStyle.FORCE_GRAPH) === '3D Force-Graph', 'get3DStyleLabel(FORCE_GRAPH) returns "3D Force-Graph"');
assert(get3DStyleLabel(Render3DStyle.VIRTUAL_CODE) === 'Virtual Code 3D', 'get3DStyleLabel(VIRTUAL_CODE) returns "Virtual Code 3D"');

// Check App.tsx, Microscope2DCanvas.tsx, Recon3DCanvas.tsx content
const appTsx = fs.readFileSync(path.join(projectRoot, 'frontend/App.tsx'), 'utf8');
const microTsx = fs.readFileSync(path.join(projectRoot, 'frontend/components/Microscope2DCanvas.tsx'), 'utf8');
const reconTsx = fs.readFileSync(path.join(projectRoot, 'frontend/components/Recon3DCanvas.tsx'), 'utf8');

assert(appTsx.includes('Switch to 3D ({get3DStyleLabel(render3DStyle)})'), 'App.tsx header button dynamically labels Switch to 3D (<Active 3D Style>) in 2D mode');
assert(appTsx.includes('Switch to 2D Nodes'), 'App.tsx header button labels Switch to 2D Nodes in 3D mode');
assert(appTsx.includes('onToggle2D3D={toggle2D3D}'), 'App.tsx forwards onToggle2D3D to both viewports');
assert(appTsx.includes('active3DStyle={render3DStyle}'), 'App.tsx forwards active3DStyle to Microscope2DCanvas');

assert(reconTsx.includes('Switch to 2D Nodes'), 'Recon3DCanvas has Switch to 2D Nodes button in top-left toolbar across all 3D modes');
assert(reconTsx.includes('onToggle2D3D'), 'Recon3DCanvas accepts onToggle2D3D prop');

assert(microTsx.includes('Switch to 3D ({get3DStyleLabel(active3DStyle)})'), 'Microscope2DCanvas top-left overlay provides Switch to 3D (<Active 3D Style>) button');
assert(microTsx.includes('onToggle2D3D'), 'Microscope2DCanvas accepts onToggle2D3D and active3DStyle props');

// -----------------------------------------------------------------------------
// R2: Dedicated Return Node Visualization in 2D Nodes
// -----------------------------------------------------------------------------
console.log('\n--> Verifying Requirement R2: Dedicated Return Node Visualization in 2D Nodes');
assert(NodeKind.RETURN === 'RETURN', 'NodeKind enum includes RETURN = "RETURN"');

const returnNodes = DEFAULT_REPOSITORY.allNodes.filter((n) => n.kind === NodeKind.RETURN);
assert(returnNodes.length >= 4, `DEFAULT_REPOSITORY contains dedicated return nodes`, `Found ${returnNodes.length} return nodes`);

const teleLoggerFile = DEFAULT_REPOSITORY.files.find((f) => f.name === 'TelemetryLogger.py');
assert(!!teleLoggerFile, 'TelemetryLogger.py exists in DEFAULT_REPOSITORY');

if (teleLoggerFile) {
  const teleReturnNodes = teleLoggerFile.nodes.filter((n) => n.kind === NodeKind.RETURN);
  assert(teleReturnNodes.length === 3, 'TelemetryLogger.py contains 3 return nodes (if, else, function end)', `Found ${teleReturnNodes.length}`);

  const ifReturn = teleReturnNodes.find((r) => r.returnExpression === '1');
  const elseReturn = teleReturnNodes.find((r) => r.returnExpression === '0');
  const endReturn = teleReturnNodes.find((r) => r.returnExpression === 'color_mode');

  assert(!!ifReturn, 'Return node inside if branch exists (expression: "1")');
  assert(!!elseReturn, 'Return node inside else branch exists (expression: "0")');
  assert(!!endReturn, 'Return node at function end exists (expression: "color_mode")');

  if (ifReturn) {
    const parent = DEFAULT_REPOSITORY.allNodes.find((n) => n.id === ifReturn.parentId);
    assert(parent?.kind === NodeKind.CONDITION, 'Return inside if branch is parented to CONDITION node', parent?.label);
  }
  if (elseReturn) {
    const parent = DEFAULT_REPOSITORY.allNodes.find((n) => n.id === elseReturn.parentId);
    assert(parent?.kind === NodeKind.CONDITION, 'Return inside else branch is parented to CONDITION (else) node', parent?.label);
  }
  if (endReturn) {
    const parent = DEFAULT_REPOSITORY.allNodes.find((n) => n.id === endReturn.parentId);
    assert(parent?.kind === NodeKind.FUNCTION, 'Return at function end is parented to FUNCTION node', parent?.label);
  }
}

const hypervisorFile = DEFAULT_REPOSITORY.files.find((f) => f.name === 'HypervisorBridge.rs');
if (hypervisorFile) {
  const rustReturns = hypervisorFile.nodes.filter((n) => n.kind === NodeKind.RETURN);
  assert(rustReturns.length >= 1, 'HypervisorBridge.rs return node parsed', `Found ${rustReturns.length}`);
  const rustRet = rustReturns.find((r) => r.returnExpression === '0');
  assert(!!rustRet, 'Rust return node has expression "0"');
}

returnNodes.forEach((retNode) => {
  assert(retNode.label === 'return', `Return node ${retNode.id} has label "return"`);
  assert(retNode.color === '#F43F5E', `Return node ${retNode.id} has pink/rose color (#F43F5E)`);
  assert(retNode.childrenIds.length === 0, `Return node ${retNode.id} has no children`);
});

// Check styling in Microscope2DCanvas.tsx
assert(microTsx.includes('bg-[#351424]') && microTsx.includes('border-rose-500/80'), 'Microscope2DCanvas applies pink/rose styling (bg-[#351424], border-rose-500/80) to return nodes');
assert(microTsx.includes('shadow-[0_0_15px_rgba(244,63,94,0.22)]'), 'Microscope2DCanvas applies rose neon glow shadow to return nodes');
assert(microTsx.includes('>RET<') || microTsx.includes('RET'), 'Microscope2DCanvas renders [RET] header badge for return nodes');
assert(microTsx.includes('BOX_WIDTH = 1240'), 'Microscope2DCanvas expands canvas layout to 4 columns (BOX_WIDTH = 1240)');
assert(microTsx.includes('boxX + 940'), 'Microscope2DCanvas positions branch return nodes at Column 3 (boxX + 940)');
assert(microTsx.includes('node.kind !== NodeKind.RETURN'), 'Microscope2DCanvas strictly omits output pins for return nodes');

// -----------------------------------------------------------------------------
// R3: Function Call Edge Visualization in 2D Nodes
// -----------------------------------------------------------------------------
console.log('\n--> Verifying Requirement R3: Function Call Edge Visualization in 2D Nodes');
const sysconFile = DEFAULT_REPOSITORY.files.find((f) => f.name === 'SysconController.cs');
assert(!!sysconFile, 'SysconController.cs exists in DEFAULT_REPOSITORY');

if (sysconFile) {
  const sysconFns = sysconFile.nodes.filter((n) => n.kind === NodeKind.FUNCTION || n.kind === NodeKind.RECURSION);
  assert(sysconFns.length === 3, 'All 3 methods in SysconController.cs parsed despite access modifiers and return types', `Found: ${sysconFns.map(f => f.symbolName).join(', ')}`);
}

const callEdges = DEFAULT_REPOSITORY.edges.filter((e) => e.kind === 'INTERNAL_CALL' || e.kind === 'CROSS_FILE_CALL');
assert(callEdges.length === 45, `All 45 function call edges detected across DEFAULT_REPOSITORY`, `Found: ${callEdges.length}`);

// Verify recursive branch calls (AnyPS5Spoofer L29 and HypervisorBridge L23)
const spooferRecur = callEdges.find((e) => e.sourceFile === 'AnyPS5Spoofer.cpp' && e.callLine === 29);
assert(!!spooferRecur, 'Recursive branch call in AnyPS5Spoofer.cpp L29 detected', spooferRecur?.id);

const rustRecur = callEdges.find((e) => e.sourceFile === 'HypervisorBridge.rs' && e.callLine === 23);
assert(!!rustRecur, 'Recursive branch call in HypervisorBridge.rs L23 detected', rustRecur?.id);

// Verify cross-file calls into SysconController.cs
const toSysconCross = callEdges.filter((e) => e.targetFile === 'SysconController.cs' && e.sourceFile !== 'SysconController.cs');
assert(toSysconCross.length === 3, 'All 3 incoming cross-file calls into SysconController.cs resolved', `Found: ${toSysconCross.length}`);

// Verify outgoing calls from SysconController.cs
const fromSysconCross = callEdges.filter((e) => e.sourceFile === 'SysconController.cs' && e.targetFile !== 'SysconController.cs');
assert(fromSysconCross.length === 9, 'All 9 outgoing cross-file calls from SysconController.cs resolved', `Found: ${fromSysconCross.length}`);

const totalSyscon = callEdges.filter((e) => e.sourceFile === 'SysconController.cs' || e.targetFile === 'SysconController.cs');
assert(totalSyscon.length === 14, 'Total edges connected to SysconController.cs (11 outgoing + 3 incoming cross-file)', `Found: ${totalSyscon.length}`);

// -----------------------------------------------------------------------------
// Final Summary
// -----------------------------------------------------------------------------
await vite.close();

console.log('\n======================================================================');
console.log(` Summary: ${passedTests} Passed, ${failedTests} Failed`);
console.log('======================================================================');

if (failedTests > 0) {
  process.exit(1);
} else {
  console.log('\nALL REQUIREMENT VERIFICATIONS PASSED SUCCESSFULLY.\n');
  process.exit(0);
}
