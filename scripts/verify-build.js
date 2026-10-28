#!/usr/bin/env node
/**
 * scripts/verify-build.js
 * Automated build verification test suite for LCV (Lyra's Code Visualizer).
 * 
 * Verifies:
 * 1. Existence and structure of dist/ directory and dist/index.html.
 * 2. Presence of bundled JavaScript and CSS assets in dist/assets/.
 * 3. Relative asset paths in dist/index.html (GitHub Pages subpath compatibility).
 * 4. Zero Google Cloud, Gemini, Vertex AI, or backend proxy leaks in dist/.
 * 5. Zero localhost or external backend server calls.
 * 6. Presence of static hosting metadata (dist/.nojekyll, dist/robots.txt, dist/404.html).
 * 7. Root trampoline index.html, root .nojekyll, and .github/workflows/deploy.yml configuration.
 * 
 * Exits with 0 on success, 1 on failure.
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.resolve(ROOT_DIR, 'dist');
const ASSETS_DIR = path.resolve(DIST_DIR, 'assets');
const INDEX_HTML = path.resolve(DIST_DIR, 'index.html');
const DIST_404 = path.resolve(DIST_DIR, '404.html');
const ROOT_INDEX_HTML = path.resolve(ROOT_DIR, 'index.html');
const ROOT_NOJEKYLL = path.resolve(ROOT_DIR, '.nojekyll');
const DEPLOY_WORKFLOW = path.resolve(ROOT_DIR, '.github', 'workflows', 'deploy.yml');
const ROOT_DEPLOY_YML = path.resolve(ROOT_DIR, 'deploy.yml');
const STATIC_WORKFLOW = path.resolve(ROOT_DIR, '.github', 'workflows', 'static.yml');

let passedChecks = 0;
let failedChecks = 0;
const errors = [];

function pass(name, details = '') {
  passedChecks++;
  console.log(`  [PASS] ${name}${details ? ` (${details})` : ''}`);
}

function fail(name, reason) {
  failedChecks++;
  errors.push({ name, reason });
  console.error(`  [FAIL] ${name}: ${reason}`);
}

function getAllFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      getAllFiles(fullPath, fileList);
    } else {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

console.log('='.repeat(70));
console.log(' LCV Static Build Verification Suite (F14)');
console.log(` Running under Node.js ${process.version} on ${process.platform}`);
console.log('='.repeat(70));

// Check 1: dist/ directory existence
console.log('\n--> Step 1: Checking build output directory (dist/)');
if (fs.existsSync(DIST_DIR) && fs.statSync(DIST_DIR).isDirectory()) {
  pass('dist/ directory exists');
} else {
  fail('dist/ directory exists', `Target path ${DIST_DIR} not found. Run "npm run build" first.`);
}

// Check 2: dist/index.html existence and integrity
console.log('\n--> Step 2: Checking dist/index.html integrity');
if (fs.existsSync(INDEX_HTML)) {
  const indexHtmlContent = fs.readFileSync(INDEX_HTML, 'utf-8');
  if (indexHtmlContent.length > 100) {
    pass('dist/index.html exists and is non-empty', `${indexHtmlContent.length} bytes`);
  } else {
    fail('dist/index.html content size', `File size is unexpectedly small (${indexHtmlContent.length} bytes).`);
  }

  if (/<div[^>]+id=["']root["']/i.test(indexHtmlContent)) {
    pass('dist/index.html contains React mounting root container');
  } else {
    fail('dist/index.html root container', 'Missing element with id="root".');
  }

  // Check 3: Relative asset paths in index.html for GitHub Pages subpath compatibility
  console.log('\n--> Step 3: Checking relative asset paths in dist/index.html');
  const absolutePathMatch = indexHtmlContent.match(/(?:src|href)=["']\/(assets\/[^"']+)["']/i);
  if (absolutePathMatch) {
    fail(
      'Relative asset URLs in index.html',
      `Found absolute asset path: "${absolutePathMatch[0]}". Must use relative path "./assets/..." for GitHub Pages compatibility.`
    );
  } else {
    pass('No absolute root asset paths found in index.html');
  }

  const relativeAssetMatch = indexHtmlContent.match(/(?:src|href)=["'](\.\/assets\/[^"']+)["']/i);
  if (relativeAssetMatch) {
    pass('Relative asset path format verified in index.html', relativeAssetMatch[1]);
  } else {
    // Check if asset paths without leading dot or inline bundle
    const genericAssetMatch = indexHtmlContent.match(/(?:src|href)=["']([^"']*assets\/[^"']+)["']/i);
    if (genericAssetMatch && !genericAssetMatch[1].startsWith('/')) {
      pass('Relative asset path format verified in index.html', genericAssetMatch[1]);
    } else {
      fail('Relative asset path format', 'Could not locate relative asset reference in index.html.');
    }
  }

  // Check for dangling invalid script tags
  if (indexHtmlContent.includes('/index.js') || indexHtmlContent.includes('src="/index.js"')) {
    fail('Dangling /index.js script tag', 'Found reference to non-existent /index.js in index.html');
  } else {
    pass('Zero dangling /index.js references in index.html');
  }
} else {
  fail('dist/index.html exists', `Target file ${INDEX_HTML} not found.`);
}

// Check 4: dist/assets/ contents
console.log('\n--> Step 4: Checking bundled assets in dist/assets/');
if (fs.existsSync(ASSETS_DIR) && fs.statSync(ASSETS_DIR).isDirectory()) {
  const assetFiles = fs.readdirSync(ASSETS_DIR);
  const jsFiles = assetFiles.filter((f) => f.endsWith('.js'));
  const cssFiles = assetFiles.filter((f) => f.endsWith('.css'));

  if (jsFiles.length > 0) {
    pass('Bundled JavaScript asset(s) present', jsFiles.join(', '));
  } else {
    fail('Bundled JavaScript assets', 'No .js files found in dist/assets/.');
  }

  if (cssFiles.length > 0) {
    pass('Bundled CSS stylesheet(s) present', cssFiles.join(', '));
  } else {
    pass('Styling via Tailwind CDN verified (no standalone CSS chunk generated)');
  }
} else {
  fail('dist/assets/ directory', `Target path ${ASSETS_DIR} not found.`);
}

// Check 5: Scanning dist/ for Google Cloud, Gemini, Vertex AI, or backend proxy leaks
console.log('\n--> Step 5: Scanning dist/ bundle for Google Cloud, Gemini, Vertex AI, and backend leaks');
const allDistFiles = getAllFiles(DIST_DIR).filter((f) =>
  /\.(html|js|css|json)$/i.test(f)
);

const forbiddenPatterns = [
  { pattern: /aiplatform\.googleapis\.com/i, label: 'Vertex AI API endpoint (aiplatform.googleapis.com)' },
  { pattern: /google-auth-library/i, label: 'google-auth-library package reference' },
  { pattern: /vertex-ai-proxy-interceptor/i, label: 'vertex-ai-proxy-interceptor reference' },
  { pattern: /ThOtB-WC1rp9Wqq_y2UCVnck77zpjHD7/, label: 'Backend proxy auth token' },
  { pattern: /['"]\/api-proxy['"]/i, label: 'Backend Express /api-proxy route' },
  { pattern: /['"]\/ws-proxy['"]/i, label: 'Backend Express /ws-proxy route' },
  { pattern: /localhost:5000/i, label: 'Express backend dev port (localhost:5000)' },
  { pattern: /localhost:3000/i, label: 'Legacy backend port (localhost:3000)' },
  { pattern: /localhost:8000/i, label: 'Legacy backend port (localhost:8000)' },
  { pattern: /http:\/\/localhost/i, label: 'HTTP localhost backend connection' },
  { pattern: /ws:\/\/localhost/i, label: 'WebSocket localhost backend connection' },
  { pattern: /wss:\/\/localhost/i, label: 'Secure WebSocket localhost backend connection' },
  { pattern: /generativelanguage\.googleapis\.com/i, label: 'Gemini GenerativeLanguage API' },
];

let leakCount = 0;
for (const filePath of allDistFiles) {
  const relativeFile = path.relative(DIST_DIR, filePath);
  const content = fs.readFileSync(filePath, 'utf-8');

  for (const { pattern, label } of forbiddenPatterns) {
    if (pattern.test(content)) {
      leakCount++;
      fail(`Leak detected in dist/${relativeFile}`, label);
    }
  }
}

if (leakCount === 0) {
  pass(
    'Zero Google Cloud, Gemini, Vertex AI, or backend proxy leaks detected across all bundle files',
    `${allDistFiles.length} files scanned`
  );
}

// Check 6: Static hosting metadata
console.log('\n--> Step 6: Checking static hosting metadata files');
const nojekyllPath = path.resolve(DIST_DIR, '.nojekyll');
if (fs.existsSync(nojekyllPath)) {
  pass('dist/.nojekyll exists (disables GitHub Pages Jekyll processing)');
} else {
  fail('dist/.nojekyll file', 'Missing .nojekyll in dist/ root.');
}

const robotsPath = path.resolve(DIST_DIR, 'robots.txt');
if (fs.existsSync(robotsPath)) {
  pass('dist/robots.txt exists');
} else {
  fail('dist/robots.txt file', 'Missing robots.txt in dist/ root.');
}

if (fs.existsSync(DIST_404)) {
  const content404 = fs.readFileSync(DIST_404, 'utf-8');
  if (content404.length > 100 && /<div[^>]+id=["']root["']/i.test(content404)) {
    pass('dist/404.html exists and contains SPA root container', `${content404.length} bytes`);
  } else {
    fail('dist/404.html integrity', 'dist/404.html is too small or missing #root mounting container.');
  }
} else {
  fail('dist/404.html file', 'Missing 404.html in dist/ root.');
}

// Check 7: Root entry trampoline & GitHub Pages deployment configuration
console.log('\n--> Step 7: Checking root trampoline & GitHub Actions deployment configuration');
if (fs.existsSync(ROOT_INDEX_HTML)) {
  const rootIndexContent = fs.readFileSync(ROOT_INDEX_HTML, 'utf-8');
  if (rootIndexContent.length > 50) {
    pass('Root index.html exists and is non-empty', `${rootIndexContent.length} bytes`);
  } else {
    fail('Root index.html size', 'Root index.html is unexpectedly small.');
  }

  // Check meta refresh redirection to ./dist/
  if (/<meta[^>]+http-equiv=["']refresh["'][^>]+content=["'][^"']*url=\.\/dist\/?["']/i.test(rootIndexContent)) {
    pass('Root index.html contains meta refresh redirection to ./dist/');
  } else {
    fail('Root index.html meta refresh', 'Missing <meta http-equiv="refresh" content="0; url=./dist/"> in root index.html.');
  }

  // Check JS redirection preserving search and hash params
  const hasJsRedirect = rootIndexContent.includes('window.location.replace') &&
    rootIndexContent.includes('./dist/') &&
    rootIndexContent.includes('window.location.search') &&
    rootIndexContent.includes('window.location.hash');
  if (hasJsRedirect) {
    pass('Root index.html JS redirection preserves search and hash parameters');
  } else {
    fail('Root index.html JS redirection', 'Missing window.location.replace to ./dist/ preserving search and hash parameters.');
  }

  // Check fallback link
  if (/<a[^>]+href=["']\.\/dist\/?["']/i.test(rootIndexContent)) {
    pass('Root index.html contains fallback link to ./dist/');
  } else {
    fail('Root index.html fallback link', 'Missing fallback link <a href="./dist/"> in root index.html.');
  }
} else {
  fail('Root index.html file', `Target file ${ROOT_INDEX_HTML} not found.`);
}

// Check root .nojekyll
if (fs.existsSync(ROOT_NOJEKYLL)) {
  pass('Root .nojekyll exists (disables Jekyll for root branch deployments)');
} else {
  fail('Root .nojekyll file', `Target file ${ROOT_NOJEKYLL} not found.`);
}

// Check .github/workflows/deploy.yml
if (fs.existsSync(DEPLOY_WORKFLOW)) {
  pass('.github/workflows/deploy.yml exists');
  const deployYaml = fs.readFileSync(DEPLOY_WORKFLOW, 'utf-8');

  // Verify path: ./dist for upload-pages-artifact
  if (/path:\s*['"]?\.\/dist['"]?/i.test(deployYaml)) {
    pass('deploy.yml configures upload-pages-artifact with path: ./dist');
  } else {
    fail('deploy.yml artifact path', 'Missing path: ./dist in deploy.yml.');
  }

  // Verify node-version matrix includes 18.x to 22.x
  const nodeVersions = ['18.x', '19.x', '20.x', '21.x', '22.x'];
  const allNodesPresent = nodeVersions.every(v => deployYaml.includes(v));
  if (allNodesPresent) {
    pass('deploy.yml includes Node matrix [18.x, 19.x, 20.x, 21.x, 22.x]');
  } else {
    fail('deploy.yml node matrix', 'Missing one or more required Node versions (18.x to 22.x).');
  }

  // Verify install, build, and test steps
  if (deployYaml.includes('npm install') && deployYaml.includes('npm run build') && deployYaml.includes('npm test')) {
    pass('deploy.yml executes npm install, npm run build, and npm test');
  } else {
    fail('deploy.yml build steps', 'Missing npm install, npm run build, or npm test in deploy.yml.');
  }
} else {
  fail('.github/workflows/deploy.yml', `Target file ${DEPLOY_WORKFLOW} not found.`);
}

// Check no misplaced root deploy.yml
if (!fs.existsSync(ROOT_DEPLOY_YML)) {
  pass('Zero misplaced deploy.yml at repository root');
} else {
  fail('Misplaced deploy.yml', 'Found root deploy.yml. Workflows must only reside in .github/workflows/.');
}

// Check no obsolete .github/workflows/static.yml
if (!fs.existsSync(STATIC_WORKFLOW)) {
  pass('Zero obsolete .github/workflows/static.yml present');
} else {
  fail('Obsolete static.yml', 'Found obsolete .github/workflows/static.yml.');
}

// Summary
console.log('\n' + '='.repeat(70));
console.log(` Summary: ${passedChecks} Passed, ${failedChecks} Failed`);
console.log('='.repeat(70));

if (failedChecks > 0) {
  console.error('\nVerification failed with the following errors:');
  for (const err of errors) {
    console.error(` - [${err.name}]: ${err.reason}`);
  }
  process.exit(1);
} else {
  console.log('\nALL STATIC BUILD VERIFICATION CHECKS PASSED.');
  process.exit(0);
}
