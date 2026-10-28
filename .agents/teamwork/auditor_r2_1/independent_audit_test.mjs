import { createServer } from 'vite';

async function runIndependentAudit() {
  console.log('======================================================================');
  console.log(' FORENSIC AUDITOR 1: INDEPENDENT EMPIRICAL INTEGRITY TEST');
  console.log('======================================================================\n');

  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });

  const { parseSourceFileToNodes, buildRepositoryFromRawFiles } = await vite.ssrLoadModule('/frontend/services/codeParser.ts');
  const { DEFAULT_REPOSITORY } = await vite.ssrLoadModule('/frontend/constants.ts');
  const { NodeKind, get3DStyleLabel, Render3DStyle } = await vite.ssrLoadModule('/frontend/types.ts');

  let passed = 0;
  let failed = 0;

  function assert(cond, msg) {
    if (cond) {
      console.log(`  [PASS] ${msg}`);
      passed++;
    } else {
      console.error(`  [FAIL] ${msg}`);
      failed++;
    }
  }

  // 1. Verify get3DStyleLabel
  console.log('--> Checking 2D/3D Navigation helper contracts:');
  assert(get3DStyleLabel(Render3DStyle.CODE_CITY) === 'Code City 3D', 'get3DStyleLabel(CODE_CITY)');
  assert(get3DStyleLabel(Render3DStyle.FORCE_GRAPH) === '3D Force-Graph', 'get3DStyleLabel(FORCE_GRAPH)');
  assert(get3DStyleLabel(Render3DStyle.VIRTUAL_CODE) === 'Virtual Code 3D', 'get3DStyleLabel(VIRTUAL_CODE)');
  assert(get3DStyleLabel(undefined) === 'Code City 3D', 'get3DStyleLabel(undefined) fallback');

  // 2. Nested control flow and return resolution
  console.log('\n--> Checking deeply nested return statement parsing & parenting:');
  const nestedCode = `
class MathEngine {
    int ComputeDeepValue(int x) {
        if (x > 100) {
            if (x > 500) {
                return x * 10;
            } else {
                return x * 5;
            }
        } else if (x < 0) {
            if (x < -100) {
                return -999;
            }
            return -1;
        } else {
            return 0;
        }
        return x;
    }
}
`;
  const nodes = parseSourceFileToNodes('file_math', 'MathEngine.cpp', nestedCode, 0);
  const returns = nodes.filter(n => n.kind === NodeKind.RETURN);
  assert(returns.length === 6, `Found all 6 return nodes (got ${returns.length})`);

  const r10 = returns.find(r => r.returnExpression === 'x * 10');
  const r5 = returns.find(r => r.returnExpression === 'x * 5');
  const r999 = returns.find(r => r.returnExpression === '-999');
  const rNeg1 = returns.find(r => r.returnExpression === '-1');
  const rZero = returns.find(r => r.returnExpression === '0');
  const rFinal = returns.find(r => r.returnExpression === 'x');

  assert(r10 && r10.parentId.includes('branch'), 'r10 parent is an inner branch');
  assert(r5 && r5.parentId.includes('branch'), 'r5 parent is an inner branch');
  assert(r999 && r999.parentId.includes('branch'), 'r999 parent is an inner branch');
  assert(rNeg1 && rNeg1.parentId.includes('branch'), 'rNeg1 parent is an else if branch');
  assert(rZero && rZero.parentId.includes('branch'), 'rZero parent is an else branch');
  assert(rFinal && rFinal.parentId.includes('fn'), 'rFinal parent is the function root');

  // Verify all returns have pink/rose color and zero output pins
  returns.forEach(r => {
    assert(r.color === '#F43F5E', `Return node ${r.id} color is #F43F5E`);
    assert(r.childrenIds.length === 0, `Return node ${r.id} has no children`);
  });

  // 3. Check DEFAULT_REPOSITORY
  console.log('\n--> Checking DEFAULT_REPOSITORY graph structure:');
  const defaultReturns = DEFAULT_REPOSITORY.allNodes.filter(n => n.kind === NodeKind.RETURN);
  assert(defaultReturns.length >= 4, `DEFAULT_REPOSITORY has at least 4 return nodes (got ${defaultReturns.length})`);

  // Verify no edge originates from any return node
  const returnIds = new Set(defaultReturns.map(r => r.id));
  const badEdges = DEFAULT_REPOSITORY.edges.filter(e => returnIds.has(e.sourceId));
  assert(badEdges.length === 0, `Zero edges originate from return nodes in DEFAULT_REPOSITORY (got ${badEdges.length})`);

  await vite.close();

  console.log(`\n======================================================================`);
  console.log(` Summary: ${passed} Passed, ${failed} Failed`);
  console.log(`======================================================================`);

  if (failed > 0) process.exit(1);
}

runIndependentAudit().catch(err => {
  console.error(err);
  process.exit(1);
});
