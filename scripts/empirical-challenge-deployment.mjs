#!/usr/bin/env node
/**
 * scripts/empirical-challenge-deployment.mjs
 * 
 * Empirical Challenger Verification Suite for GitHub Pages Deployment Resolution
 * Executed by Challenger 1 (teamwork_challenger).
 * 
 * Challenges:
 * 1. HTTP Redirection Simulation (Query parameters, hash fragments, encoding, edge cases)
 * 2. Direct Static Web Serving Simulation (Root vs Dist, MIME types, asset resolution, 404 handling)
 * 3. Node Compatibility & Build Repeatability (Repeated builds, clean exits, checksum determinism, exit codes)
 */

import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import crypto from 'node:crypto';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.resolve(ROOT_DIR, 'dist');
const ASSETS_DIR = path.resolve(DIST_DIR, 'assets');
const ROOT_INDEX = path.resolve(ROOT_DIR, 'index.html');
const DIST_INDEX = path.resolve(DIST_DIR, 'index.html');
const DIST_404 = path.resolve(DIST_DIR, '404.html');
const ROOT_NOJEKYLL = path.resolve(ROOT_DIR, '.nojekyll');
const DIST_NOJEKYLL = path.resolve(DIST_DIR, '.nojekyll');
const DEPLOY_WORKFLOW = path.resolve(ROOT_DIR, '.github', 'workflows', 'deploy.yml');

let passedTests = 0;
let failedTests = 0;
const failures = [];

function record(suite, name, passed, details = '') {
  if (passed) {
    passedTests++;
    console.log(`  [PASS] [${suite}] ${name}${details ? ` -> ${details}` : ''}`);
  } else {
    failedTests++;
    failures.push({ suite, name, details });
    console.error(`  [FAIL] [${suite}] ${name} -> ${details}`);
  }
}

// Utility to create a simple HTTP server serving a given directory
function createStaticServer(baseDir, mountPath = '/') {
  return http.createServer((req, res) => {
    try {
      const parsedUrl = new URL(req.url, 'http://localhost');
      let reqPath = decodeURIComponent(parsedUrl.pathname);

      if (mountPath !== '/' && reqPath.startsWith(mountPath)) {
        reqPath = reqPath.slice(mountPath.length - 1); // keep leading slash
      }

      let filePath = path.join(baseDir, reqPath === '/' ? 'index.html' : reqPath);

      if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, 'index.html');
      }

      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        const ext = path.extname(filePath).toLowerCase();
        const mimeTypes = {
          '.html': 'text/html; charset=utf-8',
          '.js': 'application/javascript; charset=utf-8',
          '.css': 'text/css; charset=utf-8',
          '.json': 'application/json; charset=utf-8',
          '.txt': 'text/plain; charset=utf-8',
          '': 'text/plain',
        };
        const contentType = mimeTypes[ext] || 'application/octet-stream';
        const content = fs.readFileSync(filePath);
        res.writeHead(200, { 'Content-Type': contentType, 'Content-Length': content.length });
        res.end(content);
        return;
      }

      // Check for 404.html fallback
      const fallback404 = path.join(baseDir, '404.html');
      if (fs.existsSync(fallback404)) {
        const content = fs.readFileSync(fallback404);
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8', 'Content-Length': content.length });
        res.end(content);
        return;
      }

      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end(`Server Error: ${err.message}`);
    }
  });
}

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data,
        });
      });
    }).on('error', reject);
  });
}

async function runChallenge1() {
  console.log('\n================================================================================');
  console.log(' CHALLENGE 1: HTTP Redirection Simulation (Query, Hash & State Preservation)');
  console.log('================================================================================');

  // Verify Root index.html exists
  record('Challenge 1', 'Root index.html exists', fs.existsSync(ROOT_INDEX));
  const rootHtml = fs.readFileSync(ROOT_INDEX, 'utf-8');

  // Verify Meta refresh fallback
  const metaRefreshRegex = /<meta[^>]+http-equiv=["']refresh["'][^>]+content=["']0;\s*url=\.\/dist\/?["']/i;
  record('Challenge 1', 'Meta refresh tag targets ./dist/', metaRefreshRegex.test(rootHtml));

  // Verify Fallback link
  const fallbackLinkRegex = /<a[^>]+href=["']\.\/dist\/?["']/i;
  record('Challenge 1', 'Accessible fallback link targets ./dist/', fallbackLinkRegex.test(rootHtml));

  // Verify JS redirection logic syntax
  const jsRedirectRegex = /window\.location\.replace\(['"]\.\/dist\/['"]\s*\+\s*window\.location\.search\s*\+\s*window\.location\.hash\);/;
  record('Challenge 1', 'JS redirection expression matches standard pattern', jsRedirectRegex.test(rootHtml));

  // Adversarial URL test matrix
  const testUrls = [
    { name: 'Plain Root', url: 'https://lyrasw0rld.github.io/LCV/' },
    { name: 'Plain Root with index.html', url: 'https://lyrasw0rld.github.io/LCV/index.html' },
    { name: 'Single Query Param (?repo=foo)', url: 'https://lyrasw0rld.github.io/LCV/?repo=foo' },
    { name: 'Single Hash (#section)', url: 'https://lyrasw0rld.github.io/LCV/#section' },
    { name: 'Query and Hash (?repo=foo#section)', url: 'https://lyrasw0rld.github.io/LCV/?repo=foo#section' },
    { name: 'Multi Query and Hash (?test=1&a=b#anchor)', url: 'https://lyrasw0rld.github.io/LCV/?test=1&a=b#anchor' },
    { name: 'Encoded URL in Query (?repo=https%3A%2F%2Fgithub.com%2Ftorvalds%2Flinux)', url: 'https://lyrasw0rld.github.io/LCV/?repo=https%3A%2F%2Fgithub.com%2Ftorvalds%2Flinux' },
    { name: 'Spaces & Plus in Query (?q=hello+world%20again)', url: 'https://lyrasw0rld.github.io/LCV/?q=hello+world%20again' },
    { name: 'Reserved URI Characters (?chars=%24%26%2B%2C%2F%3A%3B%3D%3F%40)', url: 'https://lyrasw0rld.github.io/LCV/?chars=%24%26%2B%2C%2F%3A%3B%3D%3F%40' },
    { name: 'Empty Values (?a=&b=)', url: 'https://lyrasw0rld.github.io/LCV/?a=&b=' },
    { name: 'Hash with SPA Routing (?v=force-graph#/visualizer/graph)', url: 'https://lyrasw0rld.github.io/LCV/?v=force-graph#/visualizer/graph' },
    { name: 'Unicode Characters (?q=%E4%BD%A0%E5%A5%BD#%E4%B8%96%E7%95%8C)', url: 'https://lyrasw0rld.github.io/LCV/?q=%E4%BD%A0%E5%A5%BD#%E4%B8%96%E7%95%8C' },
    { name: 'Repeated Keys (?tag=alpha&tag=beta)', url: 'https://lyrasw0rld.github.io/LCV/?tag=alpha&tag=beta' },
    { name: 'Domain Root (No Subpath)', url: 'https://example.com/?v=3d#main' },
    { name: 'Domain Root with index.html', url: 'https://example.com/index.html?v=3d#main' },
    { name: 'Localhost Development URL', url: 'http://localhost:3000/?repo=boykopovar/AnyPS5#view' },
    { name: 'Localhost with index.html', url: 'http://localhost:3000/index.html?repo=boykopovar/AnyPS5#view' },
    { name: 'Long Query String (100 parameters)', url: 'https://lyrasw0rld.github.io/LCV/?' + Array.from({ length: 100 }, (_, i) => `k${i}=v${i}`).join('&') + '#deep-anchor' },
    { name: 'LCV 3D Mode Param (?v=code-city)', url: 'https://lyrasw0rld.github.io/LCV/?v=code-city' },
    { name: 'LCV Force Graph Param (?v=3dforce-graph)', url: 'https://lyrasw0rld.github.io/LCV/?v=3dforce-graph' },
    { name: 'LCV Virtual Code Param (?v=virtual-code-3d)', url: 'https://lyrasw0rld.github.io/LCV/?v=virtual-code-3d' },
    { name: 'LCV Hash Mode (#code-city)', url: 'https://lyrasw0rld.github.io/LCV/#code-city' },
  ];

  for (const testCase of testUrls) {
    const originalUrl = new URL(testCase.url);

    // Simulate browser window.location environment
    const fakeLocation = {
      href: testCase.url,
      origin: originalUrl.origin,
      pathname: originalUrl.pathname,
      search: originalUrl.search,
      hash: originalUrl.hash,
    };

    // Execute redirection logic: './dist/' + window.location.search + window.location.hash
    const redirectRelative = './dist/' + fakeLocation.search + fakeLocation.hash;

    // Resolve relative URL against current location href
    const destinationUrl = new URL(redirectRelative, fakeLocation.href);

    // Assertions
    const expectedPath = fakeLocation.pathname.endsWith('index.html')
      ? fakeLocation.pathname.replace(/index\.html$/, 'dist/')
      : (fakeLocation.pathname.endsWith('/') ? fakeLocation.pathname + 'dist/' : fakeLocation.pathname + '/dist/');

    const pathCorrect = destinationUrl.pathname === expectedPath;
    const searchPreserved = destinationUrl.search === fakeLocation.search;
    const hashPreserved = destinationUrl.hash === fakeLocation.hash;

    const allGood = pathCorrect && searchPreserved && hashPreserved;
    record(
      'Challenge 1',
      `Redirection state preserved: ${testCase.name}`,
      allGood,
      `Destination: ${destinationUrl.pathname}${destinationUrl.search}${destinationUrl.hash}`
    );
  }
}

async function runChallenge2() {
  console.log('\n================================================================================');
  console.log(' CHALLENGE 2: Direct Static Web Serving Simulation (Root vs Dist)');
  console.log('================================================================================');

  // Sub-Challenge 2.1: Serving from dist/ directly (GitHub Actions Modern Deployment)
  console.log('\n--> Sub-Challenge 2.1: Server root = dist/ (Modern GitHub Actions upload-pages-artifact)');
  const serverDist = createStaticServer(DIST_DIR);
  await new Promise((resolve) => serverDist.listen(0, resolve));
  const portDist = serverDist.address().port;
  const baseDistUrl = `http://localhost:${portDist}`;

  try {
    // 1. GET /
    const resRoot = await fetchUrl(`${baseDistUrl}/`);
    record('Challenge 2.1', 'GET / returns 200 OK', resRoot.statusCode === 200);
    record('Challenge 2.1', 'GET / serves dist/index.html with React root container', resRoot.body.includes('id="root"'));
    record('Challenge 2.1', 'GET / has Content-Type text/html', resRoot.headers['content-type'].includes('text/html'));

    // 2. GET /index.html
    const resIndex = await fetchUrl(`${baseDistUrl}/index.html`);
    record('Challenge 2.1', 'GET /index.html returns 200 OK', resIndex.statusCode === 200);

    // 3. Extract and fetch bundled JS asset
    const jsMatch = resRoot.body.match(/src=["']\.\/assets\/([^"']+)["']/);
    record('Challenge 2.1', 'JS asset reference discovered in HTML', !!jsMatch, jsMatch ? jsMatch[1] : 'NONE');

    if (jsMatch) {
      const assetUrl = `${baseDistUrl}/assets/${jsMatch[1]}`;
      const resAsset = await fetchUrl(assetUrl);
      record('Challenge 2.1', `GET /assets/${jsMatch[1]} returns 200 OK`, resAsset.statusCode === 200);
      record('Challenge 2.1', 'JS asset has application/javascript MIME', resAsset.headers['content-type'].includes('application/javascript'));
      record('Challenge 2.1', 'JS asset size is substantial (> 500KB)', resAsset.body.length > 500000, `${resAsset.body.length} bytes`);
    }

    // 4. Metadata files
    const resNoJekyll = await fetchUrl(`${baseDistUrl}/.nojekyll`);
    record('Challenge 2.1', 'GET /.nojekyll returns 200 OK', resNoJekyll.statusCode === 200);

    const resRobots = await fetchUrl(`${baseDistUrl}/robots.txt`);
    record('Challenge 2.1', 'GET /robots.txt returns 200 OK', resRobots.statusCode === 200);

    // 5. 404 handler
    const res404Direct = await fetchUrl(`${baseDistUrl}/404.html`);
    record('Challenge 2.1', 'GET /404.html returns 200 OK', res404Direct.statusCode === 200);

    const resNonExistent = await fetchUrl(`${baseDistUrl}/non-existent-deep-route`);
    record('Challenge 2.1', 'Non-existent route returns 404 with SPA 404.html fallback', resNonExistent.statusCode === 404 && resNonExistent.body.includes('id="root"'));
  } finally {
    serverDist.close();
  }

  // Sub-Challenge 2.2: Serving from repository root (Legacy Branch Deployment)
  console.log('\n--> Sub-Challenge 2.2: Server root = . (Legacy / Branch deployment fallback)');
  const serverRoot = createStaticServer(ROOT_DIR);
  await new Promise((resolve) => serverRoot.listen(0, resolve));
  const portRoot = serverRoot.address().port;
  const baseRootUrl = `http://localhost:${portRoot}`;

  try {
    // 1. GET / serves root index.html (trampoline)
    const resRootTrampoline = await fetchUrl(`${baseRootUrl}/`);
    record('Challenge 2.2', 'GET / returns 200 OK', resRootTrampoline.statusCode === 200);
    record('Challenge 2.2', 'GET / serves trampoline with meta refresh to ./dist/', resRootTrampoline.body.includes('url=./dist/'));
    record('Challenge 2.2', 'GET / serves trampoline with window.location.replace', resRootTrampoline.body.includes('window.location.replace'));

    // 2. Client follows redirection to /dist/
    const resDistIndex = await fetchUrl(`${baseRootUrl}/dist/`);
    record('Challenge 2.2', 'GET /dist/ returns 200 OK', resDistIndex.statusCode === 200);
    record('Challenge 2.2', 'GET /dist/ serves production app with React root', resDistIndex.body.includes('id="root"'));

    // 3. Client loads assets relative to /dist/
    const jsMatch = resDistIndex.body.match(/src=["']\.\/assets\/([^"']+)["']/);
    if (jsMatch) {
      const distAssetUrl = `${baseRootUrl}/dist/assets/${jsMatch[1]}`;
      const resDistAsset = await fetchUrl(distAssetUrl);
      record('Challenge 2.2', `GET /dist/assets/${jsMatch[1]} returns 200 OK`, resDistAsset.statusCode === 200);
    }

    // 4. Check root .nojekyll
    const resRootNoJekyll = await fetchUrl(`${baseRootUrl}/.nojekyll`);
    record('Challenge 2.2', 'GET /.nojekyll returns 200 OK', resRootNoJekyll.statusCode === 200);
  } finally {
    serverRoot.close();
  }

  // Sub-Challenge 2.3: GitHub Pages Subpath Simulation (/LCV/)
  console.log('\n--> Sub-Challenge 2.3: GitHub Pages Subpath Simulation (/LCV/)');
  const serverSubpath = createStaticServer(DIST_DIR, '/LCV/');
  await new Promise((resolve) => serverSubpath.listen(0, resolve));
  const portSubpath = serverSubpath.address().port;
  const baseSubpathUrl = `http://localhost:${portSubpath}/LCV/`;

  try {
    const resSubpath = await fetchUrl(baseSubpathUrl);
    record('Challenge 2.3', 'GET /LCV/ returns 200 OK', resSubpath.statusCode === 200);

    // In browser at http://localhost:port/LCV/, relative asset ./assets/... resolves to http://localhost:port/LCV/assets/...
    const jsMatch = resSubpath.body.match(/src=["'](\.\/assets\/[^"']+)["']/);
    record('Challenge 2.3', 'Relative asset link found in HTML', !!jsMatch);

    if (jsMatch) {
      const resolvedAssetUrl = new URL(jsMatch[1], baseSubpathUrl).href;
      const resSubpathAsset = await fetchUrl(resolvedAssetUrl);
      record('Challenge 2.3', `Subpath asset fetched successfully: ${resolvedAssetUrl}`, resSubpathAsset.statusCode === 200);
    }
  } finally {
    serverSubpath.close();
  }
}

async function runChallenge3() {
  console.log('\n================================================================================');
  console.log(' CHALLENGE 3: Node Compatibility & Build Repeatability');
  console.log('================================================================================');

  // Verify engines field in package.json
  const pkgJson = JSON.parse(fs.readFileSync(path.resolve(ROOT_DIR, 'package.json'), 'utf-8'));
  record('Challenge 3', 'package.json defines node engines', !!pkgJson.engines && !!pkgJson.engines.node, pkgJson.engines?.node);
  record('Challenge 3', 'package.json specifies postbuild script', pkgJson.scripts?.postbuild === 'node scripts/postbuild.js');

  // Verify deploy.yml workflow matrix
  const workflowContent = fs.readFileSync(DEPLOY_WORKFLOW, 'utf-8');
  const requiredNodeVersions = ['18.x', '19.x', '20.x', '21.x', '22.x'];
  for (const v of requiredNodeVersions) {
    record('Challenge 3', `deploy.yml includes Node ${v}`, workflowContent.includes(v));
  }
  record('Challenge 3', 'deploy.yml uses actions/upload-pages-artifact@v3 with path: ./dist', workflowContent.includes('actions/upload-pages-artifact@v3') && /path:\s*\.\/dist/.test(workflowContent));
  record('Challenge 3', 'deploy.yml uses actions/deploy-pages@v4', workflowContent.includes('actions/deploy-pages@v4'));

  // Test Repeated Builds
  console.log('\n--> Executing repeated builds (3 iterations)...');
  const buildHashes = [];

  for (let i = 1; i <= 3; i++) {
    console.log(`\n[Iteration ${i}/3] Executing "npm run build"...`);
    const startTime = Date.now();
    try {
      execSync('npm run build', { cwd: ROOT_DIR, stdio: 'pipe' });
      const duration = Date.now() - startTime;
      record('Challenge 3', `Build iteration ${i} exited with code 0 (${duration}ms)`, true);

      // Verify output artifacts exist
      record('Challenge 3', `Iteration ${i}: dist/index.html exists`, fs.existsSync(DIST_INDEX));
      record('Challenge 3', `Iteration ${i}: dist/404.html exists`, fs.existsSync(DIST_404));
      record('Challenge 3', `Iteration ${i}: dist/.nojekyll exists`, fs.existsSync(DIST_NOJEKYLL));

      // Calculate SHA-256 hashes
      const indexContent = fs.readFileSync(DIST_INDEX);
      const html404Content = fs.readFileSync(DIST_404);
      const indexHash = crypto.createHash('sha256').update(indexContent).digest('hex');
      const html404Hash = crypto.createHash('sha256').update(html404Content).digest('hex');

      record('Challenge 3', `Iteration ${i}: dist/404.html matches dist/index.html byte-for-byte`, indexHash === html404Hash);
      buildHashes.push(indexHash);

      // Run verification suite (npm test)
      execSync('npm test', { cwd: ROOT_DIR, stdio: 'pipe' });
      record('Challenge 3', `Iteration ${i}: npm test passed cleanly with code 0`, true);
    } catch (err) {
      record('Challenge 3', `Build iteration ${i} failed: ${err.message}`, false);
    }
  }

  // Verify deterministic hashes across repeated builds
  const allHashesIdentical = buildHashes.every((h) => h === buildHashes[0]);
  record('Challenge 3', 'Repeated builds produce 100% deterministic, identical dist/index.html hashes', allHashesIdentical, `Hash: ${buildHashes[0]}`);
}

async function main() {
  console.log('='.repeat(80));
  console.log(' LCV EMPIRICAL CHALLENGER TEST SUITE — GITHUB PAGES DEPLOYMENT');
  console.log(` Platform: ${process.platform} | Architecture: ${process.arch} | Node: ${process.version}`);
  console.log('='.repeat(80));

  await runChallenge1();
  await runChallenge2();
  await runChallenge3();

  console.log('\n' + '='.repeat(80));
  console.log(` EMPIRICAL CHALLENGE SUMMARY: ${passedTests} Passed, ${failedTests} Failed (Total ${passedTests + failedTests})`);
  console.log('='.repeat(80));

  if (failedTests > 0) {
    console.error('\nFAILURES RECORDED:');
    for (const f of failures) {
      console.error(` - [${f.suite}] ${f.name} -> ${f.details}`);
    }
    console.error('\nFINAL VERDICT: REQUEST_CHANGES');
    process.exit(1);
  } else {
    console.log('\nFINAL VERDICT: APPROVE');
    process.exit(0);
  }
}

main().catch((err) => {
  console.error('Fatal error running empirical challenge harness:', err);
  process.exit(1);
});
