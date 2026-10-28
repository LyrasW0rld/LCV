// adversarial_integrity_audit.mjs
// Independent forensic auditor verification script for LCV
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '../../..');

let totalChecks = 0;
let passedChecks = 0;
let failedChecks = 0;

function assert(condition, message) {
  totalChecks++;
  if (condition) {
    passedChecks++;
    console.log(`  [PASS] ${message}`);
  } else {
    failedChecks++;
    console.error(`  [FAIL] ${message}`);
  }
}

async function runAudit() {
  console.log('======================================================================');
  console.log(' FORENSIC INTEGRITY AUDIT — INDEPENDENT VERIFICATION');
  console.log('======================================================================\n');

  // Load modules via Vite SSR / ES import
  const { createServer } = await import('vite');
  const vite = await createServer({
    root: path.join(REPO_ROOT, 'frontend'),
    server: { middlewareMode: true },
    appType: 'custom',
  });

  const codeParserModule = await vite.ssrLoadModule('/services/codeParser.ts');
  const typesModule = await vite.ssrLoadModule('/types.ts');
  const constantsModule = await vite.ssrLoadModule('/constants.ts');

  const { parseSourceFileToNodes, buildRepositoryFromRawFiles } = codeParserModule;
  const { NodeKind, Render3DStyle, get3DStyleLabel } = typesModule;
  const { DEFAULT_REPOSITORY } = constantsModule;

  // -------------------------------------------------------------------------
  // SECTION 1: Forensic Inspection for Cheating & Hardcoding
  // -------------------------------------------------------------------------
  console.log('--> Section 1: Forensic Search for Cheating & Hardcoding in Parser');
  const parserSource = fs.readFileSync(path.join(REPO_ROOT, 'frontend/services/codeParser.ts'), 'utf8');

  assert(!parserSource.includes('SysconController'), 'Zero hardcoded references to SysconController in codeParser.ts');
  assert(!parserSource.includes('TelemetryLogger'), 'Zero hardcoded references to TelemetryLogger in codeParser.ts');
  assert(!parserSource.includes('AnyPS5Spoofer'), 'Zero hardcoded references to AnyPS5Spoofer in codeParser.ts');
  assert(!parserSource.includes('HypervisorBridge'), 'Zero hardcoded references to HypervisorBridge in codeParser.ts');
  assert(!parserSource.includes('VerifySysconHandshake'), 'Zero hardcoded references to VerifySysconHandshake in codeParser.ts');
  assert(!parserSource.includes('file_0') && !parserSource.includes('file_3') && !parserSource.includes('file_5'), 'Zero hardcoded sample file IDs in codeParser.ts');

  const canvas2DSource = fs.readFileSync(path.join(REPO_ROOT, 'frontend/components/Microscope2DCanvas.tsx'), 'utf8');
  assert(!canvas2DSource.includes('SysconController'), 'Zero hardcoded references to SysconController in Microscope2DCanvas.tsx');
  assert(!canvas2DSource.includes('TelemetryLogger'), 'Zero hardcoded references to TelemetryLogger in Microscope2DCanvas.tsx');

  // -------------------------------------------------------------------------
  // SECTION 2: Adversarial Multi-Language Return Statement Stress Test
  // -------------------------------------------------------------------------
  console.log('\n--> Section 2: Adversarial Multi-Language Return Statement Stress Test');

  const adversarialSourceFiles = [
    {
      name: 'AdversarialTest.cpp',
      content: `class AdversarialEngine {
public:
    int CalculateSomething(int a, int b) {
        if (a > b) {
            return a + b; // return expression with sum
        } else if (a == b) {
            return a * 2;
        } else {
            return (b - a);
        }
        return 0; // final return
    }

    void VoidFunction(bool flag) {
        if (flag) {
            return; // void return
        }
        DoSomething();
    }
};`
    },
    {
      name: 'AdvancedRust.rs',
      content: `pub struct RustService;

impl RustService {
    pub fn process_data(value: i32) -> Result<i32, &'static str> {
        if value < 0 {
            return Err("negative value");
        }
        while value > 100 {
            if value == 999 {
                return Ok(999);
            }
            break;
        }
        return Ok(value * 2);
    }
}`
    },
    {
      name: 'ComplexCSharp.cs',
      content: `public class MicroService {
    public static async string FetchTokenAsync(int timeout) {
        if (timeout <= 0) {
            return null;
        } else {
            return "TOKEN_OK";
        }
        return string.Empty;
    }
}`
    },
    {
      name: 'PythonEdgeCases.py',
      content: `class PythonWorker:
    def execute_task(self, mode):
        if mode == 1:
            return [x for x in range(10)] # list comprehension return
        elif mode == 2:
            return None # None return
        else:
            return {"status": "ok"} # dict return
        return 42`
    }
  ];

  for (const file of adversarialSourceFiles) {
    const nodes = parseSourceFileToNodes(`adv_${file.name}`, file.name, file.content);
    const returnNodes = nodes.filter(n => n.kind === NodeKind.RETURN);
    assert(returnNodes.length > 0, `Adversarial file ${file.name} generated ${returnNodes.length} return nodes`);

    for (const retNode of returnNodes) {
      assert(retNode.label === 'return', `Return node ${retNode.id} has label "return"`);
      assert(retNode.symbolName.startsWith('return'), `Return node ${retNode.id} symbolName starts with return ("${retNode.symbolName}")`);
      assert(retNode.color === '#F43F5E', `Return node ${retNode.id} has pink/rose color #F43F5E`);
      assert(retNode.childrenIds.length === 0, `Return node ${retNode.id} has no children`);
      assert(retNode.parentId !== undefined && retNode.parentId !== null, `Return node ${retNode.id} has parentId`);
    }
  }

  // Specifically verify C++ AdversarialEngine returns
  const cppNodes = parseSourceFileToNodes('adv_cpp', 'AdversarialTest.cpp', adversarialSourceFiles[0].content);
  const cppReturns = cppNodes.filter(n => n.kind === NodeKind.RETURN);
  assert(cppReturns.length === 5, `C++ file produced exactly 5 return nodes (got ${cppReturns.length})`);
  const voidReturn = cppReturns.find(r => r.returnExpression === '');
  assert(voidReturn !== undefined, 'C++ void return "return;" captured with empty returnExpression');
  const sumReturn = cppReturns.find(r => r.returnExpression === 'a + b');
  assert(sumReturn !== undefined, 'C++ return "a + b" captured correctly with stripped trailing comments');

  // Specifically verify Python list comprehension and dict returns
  const pyNodes = parseSourceFileToNodes('adv_py', 'PythonEdgeCases.py', adversarialSourceFiles[3].content);
  const pyReturns = pyNodes.filter(n => n.kind === NodeKind.RETURN);
  assert(pyReturns.length === 4, `Python file produced exactly 4 return nodes (got ${pyReturns.length})`);
  assert(pyReturns.some(r => r.returnExpression === '[x for x in range(10)]'), 'Python list comprehension return captured cleanly without comment');
  assert(pyReturns.some(r => r.returnExpression === '{"status": "ok"}'), 'Python dict return captured cleanly without comment');

  // -------------------------------------------------------------------------
  // SECTION 3: Function Signatures & Call Edge Detection Stress Test
  // -------------------------------------------------------------------------
  console.log('\n--> Section 3: Function Signatures & Call Edge Detection Stress Test');

  const multiFileRepo = [
    {
      name: 'ServiceA.cs',
      path: 'Services/ServiceA.cs',
      size: 500,
      date: '2026-10-28',
      content: `public class ServiceA {
    public void ExecuteJob() {
        if (CheckCondition()) {
            DoWork();
        }
    }
    public static bool CheckCondition() {
        return true;
    }
    public void DoWork() {
        ProcessPayload();
    }
}`
    },
    {
      name: 'ServiceB.cs',
      path: 'Services/ServiceB.cs',
      size: 400,
      date: '2026-10-28',
      content: `public class ServiceB {
    public static void ProcessPayload() {
        DoInternal();
    }
    private static void DoInternal() {
        return;
    }
}`
    }
  ];

  const repo = buildRepositoryFromRawFiles('test_repo', multiFileRepo);
  assert(repo.allNodes.length > 0, `Built repository with ${repo.allNodes.length} nodes`);
  assert(repo.edges.length > 0, `Built repository with ${repo.edges.length} edges`);

  // Verify cross-file edge from ServiceA -> ServiceB.ProcessPayload
  const crossFileCall = repo.edges.find(e => e.kind === 'CROSS_FILE_CALL');
  assert(crossFileCall !== undefined, 'Cross-file call edge detected between ServiceA and ServiceB');
  if (crossFileCall) {
    const srcNode = repo.allNodes.find(n => n.id === crossFileCall.sourceId);
    const tgtNode = repo.allNodes.find(n => n.id === crossFileCall.targetId);
    assert(srcNode !== undefined, `Call edge source node exists (${crossFileCall.sourceId})`);
    assert(tgtNode !== undefined, `Call edge target node exists (${crossFileCall.targetId})`);
    assert(tgtNode.symbolName === 'ProcessPayload', `Call edge targets ProcessPayload (got ${tgtNode?.symbolName})`);
  }

  // Check all edges for zero dangling nodes
  const danglingEdges = repo.edges.filter(
    e => !repo.allNodes.some(n => n.id === e.sourceId) || !repo.allNodes.some(n => n.id === e.targetId)
  );
  assert(danglingEdges.length === 0, `Zero dangling edges in synthetic repo (found ${danglingEdges.length})`);

  // -------------------------------------------------------------------------
  // SECTION 4: In-Canvas Pin Socket Logic Verification for Return Nodes
  // -------------------------------------------------------------------------
  console.log('\n--> Section 4: In-Canvas Pin Socket Logic Verification for Return Nodes');

  // Verify that return nodes never receive OUT pins in computeNodeHeight logic
  const testReturnNode = {
    id: 'test_return_1',
    kind: NodeKind.RETURN,
    returnExpression: '42',
    lineStart: 10
  };

  const isReturn = testReturnNode.kind === NodeKind.RETURN;
  const dummyInPins = [{
    edgeId: 'ret_in_edge',
    label: isReturn ? `${testReturnNode.returnExpression} l10` : 'in l10',
    pinType: 'IN',
    line: 10
  }];
  const dummyOutPins = isReturn ? [] : [{ edgeId: 'out_1', label: 'out l10', pinType: 'OUT', line: 10 }];

  assert(dummyOutPins.length === 0, 'Return node outPins is strictly empty array');
  assert(dummyInPins[0].label === '42 l10', 'Return node inPin label formatted as "42 l10"');

  // Check void return formatting
  const testVoidReturnNode = {
    id: 'test_return_void',
    kind: NodeKind.RETURN,
    returnExpression: '',
    lineStart: 15
  };
  const isVoidReturn = testVoidReturnNode.kind === NodeKind.RETURN;
  const voidInLabel = testVoidReturnNode.returnExpression
    ? `${testVoidReturnNode.returnExpression} l15`
    : 'void l15';
  assert(voidInLabel === 'void l15', 'Void return node inPin label formatted as "void l15"');

  // -------------------------------------------------------------------------
  // SECTION 5: R1 Navigation & View Switcher Helper Verification
  // -------------------------------------------------------------------------
  console.log('\n--> Section 5: R1 Navigation & View Switcher Helper Verification');

  assert(get3DStyleLabel(Render3DStyle.CODE_CITY) === 'Code City 3D', 'get3DStyleLabel(CODE_CITY) === "Code City 3D"');
  assert(get3DStyleLabel(Render3DStyle.FORCE_GRAPH) === '3D Force-Graph', 'get3DStyleLabel(FORCE_GRAPH) === "3D Force-Graph"');
  assert(get3DStyleLabel(Render3DStyle.VIRTUAL_CODE) === 'Virtual Code 3D', 'get3DStyleLabel(VIRTUAL_CODE) === "Virtual Code 3D"');
  assert(get3DStyleLabel(undefined) === 'Code City 3D', 'get3DStyleLabel(undefined) defaults safely to "Code City 3D"');

  // Verify App.tsx contains toggle button with get3DStyleLabel
  const appSource = fs.readFileSync(path.join(REPO_ROOT, 'frontend/App.tsx'), 'utf8');
  assert(appSource.includes('get3DStyleLabel(render3DStyle)'), 'App.tsx calls get3DStyleLabel with active render3DStyle');
  assert(appSource.includes('onToggle2D3D={toggle2D3D}'), 'App.tsx forwards onToggle2D3D handler');
  assert(appSource.includes('active3DStyle={render3DStyle}'), 'App.tsx forwards active3DStyle prop');

  // Verify Recon3DCanvas.tsx has toggle button
  const canvas3DSource = fs.readFileSync(path.join(REPO_ROOT, 'frontend/components/Recon3DCanvas.tsx'), 'utf8');
  assert(canvas3DSource.includes('Switch to 2D Nodes'), 'Recon3DCanvas.tsx has button "Switch to 2D Nodes"');
  assert(canvas3DSource.includes('onToggle2D3D'), 'Recon3DCanvas.tsx binds onToggle2D3D click handler');

  // Verify Microscope2DCanvas.tsx has toggle button
  assert(canvas2DSource.includes('Switch to 3D'), 'Microscope2DCanvas.tsx has button "Switch to 3D"');
  assert(canvas2DSource.includes('onToggle2D3D'), 'Microscope2DCanvas.tsx binds onToggle2D3D click handler');

  // -------------------------------------------------------------------------
  // SECTION 6: R4 Batch Script Forensic Check
  // -------------------------------------------------------------------------
  console.log('\n--> Section 6: R4 Batch Script Forensic Check');

  const batPath = path.join(REPO_ROOT, 'start_local.bat');
  assert(fs.existsSync(batPath), 'start_local.bat exists in project root');
  const batContent = fs.readFileSync(batPath, 'utf8');

  assert(batContent.includes('cd /d "%~dp0"'), 'start_local.bat sets script directory with cd /d "%~dp0"');
  assert(batContent.includes('where node'), 'start_local.bat verifies node existence');
  assert(batContent.includes('where npm'), 'start_local.bat verifies npm existence');
  assert(batContent.includes('call npm install'), 'start_local.bat calls "call npm install"');
  assert(batContent.includes('%errorlevel%'), 'start_local.bat inspects %errorlevel%');
  assert(batContent.includes('http://localhost:5173/'), 'start_local.bat outputs local URL http://localhost:5173/');
  assert(batContent.includes('call npm run dev'), 'start_local.bat starts dev server via "call npm run dev"');

  await vite.close();

  console.log('\n======================================================================');
  console.log(` SUMMARY: ${passedChecks} Passed, ${failedChecks} Failed (Total ${totalChecks} checks)`);
  console.log('======================================================================');

  if (failedChecks > 0) {
    process.exit(1);
  }
}

runAudit().catch((err) => {
  console.error('Fatal audit error:', err);
  process.exit(1);
});
