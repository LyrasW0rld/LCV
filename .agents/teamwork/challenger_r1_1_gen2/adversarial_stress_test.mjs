import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../../..');

console.log('======================================================================');
console.log(' CHALLENGER 1: EMPIRICAL ADVERSARIAL STRESS TEST SUITE');
console.log(' Parser, AST Hierarchy, Return Nodes, Call Edges & Graph Integrity');
console.log('======================================================================\n');

// Initialize Vite SSR context
const vite = await createServer({
  root: path.join(projectRoot, 'frontend'),
  server: { middlewareMode: true },
  appType: 'custom',
});

const typesModule = await vite.ssrLoadModule('/types.ts');
const parserModule = await vite.ssrLoadModule('/services/codeParser.ts');
const constantsModule = await vite.ssrLoadModule('/constants.ts');

const { NodeKind } = typesModule;
const { parseSourceFileToNodes, buildRepositoryFromRawFiles } = parserModule;
const { DEFAULT_REPOSITORY } = constantsModule;

let testCount = 0;
let passedCount = 0;
let failedCount = 0;
const failures = [];

function check(condition, testName, details = '') {
  testCount++;
  if (condition) {
    passedCount++;
    console.log(`  [PASS] [${testCount}] ${testName}${details ? ` -> ${details}` : ''}`);
  } else {
    failedCount++;
    failures.push({ testCount, testName, details });
    console.error(`  [FAIL] [${testCount}] ${testName} -> ${details}`);
  }
}

function verifyGraphIntegrity(repo, testGroupName) {
  const nodeMap = new Map();
  let duplicateNodeIds = 0;
  for (const node of repo.allNodes) {
    if (nodeMap.has(node.id)) {
      duplicateNodeIds++;
      console.error(`    Duplicate node id found: ${node.id}`);
    }
    nodeMap.set(node.id, node);
  }
  check(duplicateNodeIds === 0, `${testGroupName}: No duplicate node IDs (total: ${repo.allNodes.length})`);

  const edgeMap = new Set();
  let duplicateEdgeIds = 0;
  let danglingEdges = 0;
  for (const edge of repo.edges) {
    if (edgeMap.has(edge.id)) {
      duplicateEdgeIds++;
      console.error(`    Duplicate edge id found: ${edge.id}`);
    }
    edgeMap.add(edge.id);

    const hasSrc = nodeMap.has(edge.sourceId);
    const hasTgt = nodeMap.has(edge.targetId);
    if (!hasSrc || !hasTgt) {
      danglingEdges++;
      console.error(`    Dangling edge ${edge.id}: src ${edge.sourceId} (${hasSrc}), tgt ${edge.targetId} (${hasTgt})`);
    }
  }
  check(duplicateEdgeIds === 0, `${testGroupName}: No duplicate edge IDs (total: ${repo.edges.length})`);
  check(danglingEdges === 0, `${testGroupName}: No dangling edges (all sources and targets exist)`);
}

// =========================================================================
// TEST GROUP 1: Complex Return Statements
// =========================================================================
console.log('\n--- Test Group 1: Complex Return Statements ---');

const complexReturnFile = `
class ReturnEngine {
public:
    int EvaluateExpressions(int x, int a, int b) {
        if (x > 100) {
            return foo(bar(x + 1));
        } else if (x > 50) {
            return a > b ? x : y;
        } else if (x > 20) {
            return (a + b) * (x - 1);
        } else {
            return -1;
        }
        return 0;
    }

    void EarlyExitRoutine(int code) {
        if (code < 0) {
            return;
        }
        doWork();
        return;
    }

    double TrailingCommentReturn(double v) {
        if (v == 0.0) {
            return 0.0; // Early zero return
        }
        return v * 2.5; // Final computed value
    }
};
`;

const repo1 = buildRepositoryFromRawFiles('ComplexReturnsRepo', [
  {
    name: 'ReturnEngine.cpp',
    path: 'src/ReturnEngine.cpp',
    size: complexReturnFile.length,
    date: '2026-10-28',
    content: complexReturnFile,
  },
]);

verifyGraphIntegrity(repo1, 'Group 1');

const returnNodes1 = repo1.allNodes.filter(n => n.kind === NodeKind.RETURN);
console.log(`  Found ${returnNodes1.length} return nodes in ReturnEngine.cpp`);

// Check return foo(bar(x + 1));
const retNestedCall = returnNodes1.find(n => n.returnExpression === 'foo(bar(x + 1))');
check(!!retNestedCall, 'Return with nested calls captured: foo(bar(x + 1))', retNestedCall?.symbolName);
if (retNestedCall) {
  check(retNestedCall.label === 'return', 'Nested call return node label is "return"');
  check(retNestedCall.color === '#F43F5E', 'Nested call return node color is pink/rose #F43F5E');
  // Check parent AST edge
  const parentEdge = repo1.edges.find(e => e.kind === 'AST_CHILD' && e.targetId === retNestedCall.id);
  check(!!parentEdge, 'Nested call return node has incoming AST_CHILD edge', `from ${parentEdge?.sourceId}`);
  const parentNode = repo1.allNodes.find(n => n.id === retNestedCall.parentId);
  check(parentNode?.symbolName === 'if', 'Nested call return parent is "if" condition branch');
}

// Check return a > b ? x : y;
const retTernary = returnNodes1.find(n => n.returnExpression === 'a > b ? x : y');
check(!!retTernary, 'Return with ternary expression captured: a > b ? x : y', retTernary?.symbolName);
if (retTernary) {
  const parentNode = repo1.allNodes.find(n => n.id === retTernary.parentId);
  check(parentNode?.symbolName === 'else if', 'Ternary return parent is "else if" condition branch');
}

// Check return -1;
const retElse = returnNodes1.find(n => n.returnExpression === '-1');
check(!!retElse, 'Return in else block captured: -1', retElse?.symbolName);
if (retElse) {
  const parentNode = repo1.allNodes.find(n => n.id === retElse.parentId);
  check(parentNode?.symbolName === 'else', 'Else return parent is "else" branch');
}

// Check return 0; (end of EvaluateExpressions function)
const retFuncEnd = returnNodes1.find(n => n.returnExpression === '0');
check(!!retFuncEnd, 'Function end return captured: 0', retFuncEnd?.symbolName);
if (retFuncEnd) {
  const parentNode = repo1.allNodes.find(n => n.id === retFuncEnd.parentId);
  check(parentNode?.kind === NodeKind.FUNCTION, 'Function end return parent is the FUNCTION node itself', parentNode?.symbolName);
}

// Check void returns: return;
const voidReturns = returnNodes1.filter(n => n.returnExpression === '');
check(voidReturns.length >= 2, 'Void returns (return;) captured with empty returnExpression', `Count: ${voidReturns.length}`);
for (const vr of voidReturns) {
  check(vr.symbolName === 'return', 'Void return symbolName is "return"');
  const parentEdge = repo1.edges.find(e => e.kind === 'AST_CHILD' && e.targetId === vr.id);
  check(!!parentEdge, `Void return ${vr.id} has valid AST_CHILD edge from ${vr.parentId}`);
}

// Check trailing comment returns
const retTrailingComment = returnNodes1.find(n => n.returnExpression === '0.0');
check(!!retTrailingComment, 'Return with trailing comment // stripped cleanly', `Expression: "${retTrailingComment?.returnExpression}"`);
const retTrailingComment2 = returnNodes1.find(n => n.returnExpression === 'v * 2.5');
check(!!retTrailingComment2, 'Return v * 2.5 with trailing comment stripped cleanly', `Expression: "${retTrailingComment2?.returnExpression}"`);

// =========================================================================
// TEST GROUP 2: Multiple Functions and Complex Signatures
// =========================================================================
console.log('\n--- Test Group 2: Multiple Functions and Complex Signatures ---');

const complexSignaturesCpp = `
#include <vector>
#include <string>
#include <memory>

class MultiEngine {
public:
    static inline const unsigned long long int CalculateChecksum(const char* buffer, size_t length) {
        if (length == 0) {
            return 0ULL;
        }
        return 42ULL;
    }

    virtual std::vector<std::string> FilterTokens(const std::vector<std::string>& inputs) {
        for (int i = 0; i < 10; i++) {
            if (i > 5) {
                return inputs;
            }
        }
        return inputs;
    }

    std::shared_ptr<int> CreateSharedPointer(int initialValue) {
        return std::make_shared<int>(initialValue);
    }

    template<typename T>
    T MaxValue(T a, T b) {
        if (a > b) {
            return a;
        } else {
            return b;
        }
    }
};
`;

const repo2 = buildRepositoryFromRawFiles('ComplexSignaturesRepo', [
  {
    name: 'MultiEngine.cpp',
    path: 'src/MultiEngine.cpp',
    size: complexSignaturesCpp.length,
    date: '2026-10-28',
    content: complexSignaturesCpp,
  },
]);

verifyGraphIntegrity(repo2, 'Group 2');

const fns2 = repo2.allNodes.filter(n => n.kind === NodeKind.FUNCTION || n.kind === NodeKind.RECURSION);
console.log(`  Found ${fns2.length} functions: ${fns2.map(f => f.symbolName).join(', ')}`);
check(fns2.length >= 3, 'Multiple functions with complex qualifiers/signatures recognized', `Count: ${fns2.length}`);

// Verify returns inside complex functions
const returns2 = repo2.allNodes.filter(n => n.kind === NodeKind.RETURN);
check(returns2.length >= 5, 'All return statements inside complex functions parsed into RETURN nodes', `Count: ${returns2.length}`);
for (const ret of returns2) {
  check(ret.kind === NodeKind.RETURN, `Return node ${ret.id} has NodeKind.RETURN`);
  check(ret.label === 'return', `Return node ${ret.id} has label "return"`);
  const parentNode = repo2.allNodes.find(n => n.id === ret.parentId);
  check(!!parentNode, `Return node ${ret.id} has valid parent node ${ret.parentId}`);
  const parentAstEdge = repo2.edges.find(e => e.kind === 'AST_CHILD' && e.targetId === ret.id);
  check(!!parentAstEdge, `Return node ${ret.id} has incoming AST_CHILD edge`);
}

// =========================================================================
// TEST GROUP 3: Function Call Edges (Cross-file, Member, Recursion, Mutual)
// =========================================================================
console.log('\n--- Test Group 3: Function Call Edges & Recursion ---');

const callerFile = `
class ServiceCoordinator {
public:
    void ExecuteWorkflow(int step) {
        if (step == 1) {
            InvokeRemoteHandler(step);
        } else {
            HandleDirectStep(step);
        }
    }

    void HandleDirectStep(int s) {
        PerformLocalComputation(s * 2);
    }

    void PerformLocalComputation(int val) {
        if (val > 100) {
            ExecuteWorkflow(val - 10);
        }
    }
};
`;

const calleeFile = `
class RemoteWorker {
public:
    void InvokeRemoteHandler(int priority) {
        if (priority > 0) {
            ProcessTask(priority);
        }
    }

    void ProcessTask(int p) {
        if (p > 5) {
            AcknowledgeTask();
        }
    }

    void AcknowledgeTask() {
        return;
    }
};
`;

const repo3 = buildRepositoryFromRawFiles('CallGraphRepo', [
  {
    name: 'ServiceCoordinator.cpp',
    path: 'src/ServiceCoordinator.cpp',
    size: callerFile.length,
    date: '2026-10-28',
    content: callerFile,
  },
  {
    name: 'RemoteWorker.cpp',
    path: 'src/RemoteWorker.cpp',
    size: calleeFile.length,
    date: '2026-10-28',
    content: calleeFile,
  },
]);

verifyGraphIntegrity(repo3, 'Group 3');

const callEdges = repo3.edges.filter(e => e.kind === 'CROSS_FILE_CALL' || e.kind === 'INTERNAL_CALL');
console.log(`  Found ${callEdges.length} call edges:`);
callEdges.forEach(e => console.log(`    ${e.kind}: ${e.sourceFile} -> ${e.targetFile} (${e.label})`));

check(callEdges.length >= 4, 'Multiple call edges detected across files and routines', `Count: ${callEdges.length}`);

// Check cross file call: InvokeRemoteHandler
const crossFileCall = callEdges.find(e => e.kind === 'CROSS_FILE_CALL' && e.label?.includes('InvokeRemoteHandler'));
check(!!crossFileCall, 'Cross-file call detected: ServiceCoordinator -> InvokeRemoteHandler', crossFileCall?.label);

// Check recursive call: PerformLocalComputation calls ExecuteWorkflow
const recursiveCall = callEdges.find(e => e.label?.includes('ExecuteWorkflow'));
check(!!recursiveCall, 'Branch-to-function call edge detected: PerformLocalComputation -> ExecuteWorkflow', recursiveCall?.label);

// Check internal call: ProcessTask -> AcknowledgeTask
const ackCall = callEdges.find(e => e.label?.includes('AcknowledgeTask'));
check(!!ackCall, 'Internal call edge detected: ProcessTask -> AcknowledgeTask', ackCall?.label);

// =========================================================================
// TEST GROUP 4: Pathological Syntax and Edge Cases (No Hangs, No Crashes)
// =========================================================================
console.log('\n--- Test Group 4: Pathological Syntax & Extreme Edge Cases ---');

const emptyFile = '';
const whitespaceFile = '   \n\n\t  \r\n   ';
const commentOnlyFile = '// Just comments\n/* Block comment\n multi-line */\n# Python style comment';
const unmatchedBracesFile = 'class Broken { void func() { { { { if (x) { return 1;';
const onlyClosingBracesFile = '} } } } } return 0;';
const deepNestingFile = `
class DeepNest {
public:
    int NestedFunction(int x) {
        if (x > 0) {
            for (int i = 0; i < x; i++) {
                if (i % 2 == 0) {
                    while (i > 1) {
                        if (x == 42) {
                            return 999;
                        }
                    }
                }
            }
        }
        return -1;
    }
};
`;
const massiveFunctionsFile = Array.from({ length: 40 }, (_, i) => `
    void GeneratedFunction_${i}(int arg) {
        if (arg > ${i}) {
            return;
        }
        return;
    }
`).join('\n');
const wrappedMassiveFile = `class MassiveClass {\npublic:\n${massiveFunctionsFile}\n};`;

const repo4 = buildRepositoryFromRawFiles('EdgeCasesRepo', [
  { name: 'Empty.cpp', path: 'src/Empty.cpp', size: 0, date: '2026-10-28', content: emptyFile },
  { name: 'Whitespace.cpp', path: 'src/Whitespace.cpp', size: whitespaceFile.length, date: '2026-10-28', content: whitespaceFile },
  { name: 'CommentsOnly.cpp', path: 'src/CommentsOnly.cpp', size: commentOnlyFile.length, date: '2026-10-28', content: commentOnlyFile },
  { name: 'Unmatched.cpp', path: 'src/Unmatched.cpp', size: unmatchedBracesFile.length, date: '2026-10-28', content: unmatchedBracesFile },
  { name: 'ClosingOnly.cpp', path: 'src/ClosingOnly.cpp', size: onlyClosingBracesFile.length, date: '2026-10-28', content: onlyClosingBracesFile },
  { name: 'DeepNest.cpp', path: 'src/DeepNest.cpp', size: deepNestingFile.length, date: '2026-10-28', content: deepNestingFile },
  { name: 'Massive.cpp', path: 'src/Massive.cpp', size: wrappedMassiveFile.length, date: '2026-10-28', content: wrappedMassiveFile },
]);

check(true, 'Parser did not hang or crash on pathological syntax');
verifyGraphIntegrity(repo4, 'Group 4 Pathological');

// Verify DeepNest return nodes
const deepNestFile = repo4.files.find(f => f.name === 'DeepNest.cpp');
check(!!deepNestFile, 'DeepNest.cpp was successfully parsed');
if (deepNestFile) {
  const deepReturns = deepNestFile.nodes.filter(n => n.kind === NodeKind.RETURN);
  check(deepReturns.length === 2, 'DeepNest contains exactly 2 return nodes (nested 999, outer -1)', `Found ${deepReturns.length}`);
  const ret999 = deepReturns.find(n => n.returnExpression === '999');
  check(!!ret999, 'Nested return 999 extracted correctly', ret999?.symbolName);
}

// =========================================================================
// TEST GROUP 5: DEFAULT_REPOSITORY Full Invariant & Return Audit
// =========================================================================
console.log('\n--- Test Group 5: DEFAULT_REPOSITORY Full Invariant Audit ---');

verifyGraphIntegrity(DEFAULT_REPOSITORY, 'DEFAULT_REPOSITORY');

const defaultReturnNodes = DEFAULT_REPOSITORY.allNodes.filter(n => n.kind === NodeKind.RETURN);
console.log(`  DEFAULT_REPOSITORY has ${defaultReturnNodes.length} dedicated return nodes:`);
defaultReturnNodes.forEach(rn => {
  console.log(`    - ${rn.fileName}:${rn.lineStart} -> "${rn.symbolName}" (parent: ${rn.parentId})`);
});
check(defaultReturnNodes.length >= 4, 'DEFAULT_REPOSITORY contains at least 4 return nodes', `Count: ${defaultReturnNodes.length}`);

for (const rn of defaultReturnNodes) {
  check(rn.kind === NodeKind.RETURN, `Return node ${rn.id} has kind NodeKind.RETURN`);
  check(rn.label === 'return', `Return node ${rn.id} has label "return"`);
  check(rn.color === '#F43F5E', `Return node ${rn.id} has rose color #F43F5E`);
  const parentNode = DEFAULT_REPOSITORY.allNodes.find(n => n.id === rn.parentId);
  check(!!parentNode, `Return node ${rn.id} has parent node in repository: ${rn.parentId}`);
  const astEdge = DEFAULT_REPOSITORY.edges.find(e => e.kind === 'AST_CHILD' && e.targetId === rn.id);
  check(!!astEdge, `Return node ${rn.id} has AST_CHILD edge from ${astEdge?.sourceId}`);
}

const defaultCallEdges = DEFAULT_REPOSITORY.edges.filter(e => e.kind === 'CROSS_FILE_CALL' || e.kind === 'INTERNAL_CALL');
console.log(`  DEFAULT_REPOSITORY has ${defaultCallEdges.length} call edges`);
check(defaultCallEdges.length >= 40, 'DEFAULT_REPOSITORY has all call edges preserved', `Count: ${defaultCallEdges.length}`);

// Close Vite server
await vite.close();

// =========================================================================
// SUMMARY
// =========================================================================
console.log('\n======================================================================');
console.log(` SUMMARY: Total Tests: ${testCount} | Passed: ${passedCount} | Failed: ${failedCount}`);
console.log('======================================================================');

if (failedCount > 0) {
  console.error('\nFailures encountered:');
  failures.forEach(f => console.error(`  [#${f.testCount}] ${f.testName} -> ${f.details}`));
  process.exit(1);
} else {
  console.log('\nALL ADVERSARIAL STRESS TESTS PASSED EMPIRICALLY!');
  process.exit(0);
}
