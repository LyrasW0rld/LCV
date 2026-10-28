#!/usr/bin/env node
/**
 * scripts/postbuild.js
 * Post-build hook for LCV (Lyra's Code Visualizer).
 * 
 * Generates dist/404.html as a copy of dist/index.html for GitHub Pages SPA routing,
 * and ensures static hosting metadata (.nojekyll) is in place.
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.resolve(ROOT_DIR, 'dist');
const DIST_INDEX = path.resolve(DIST_DIR, 'index.html');
const DIST_404 = path.resolve(DIST_DIR, '404.html');
const DIST_NOJEKYLL = path.resolve(DIST_DIR, '.nojekyll');

if (!fs.existsSync(DIST_INDEX)) {
  console.error(`[postbuild] Error: ${DIST_INDEX} does not exist. Run build first.`);
  process.exit(1);
}

// 1. Generate dist/404.html from dist/index.html
fs.copyFileSync(DIST_INDEX, DIST_404);
console.log(`[postbuild] Successfully created dist/404.html (${fs.statSync(DIST_404).size} bytes)`);

// 2. Ensure dist/.nojekyll exists
if (!fs.existsSync(DIST_NOJEKYLL)) {
  fs.writeFileSync(DIST_NOJEKYLL, '');
  console.log('[postbuild] Created dist/.nojekyll');
} else {
  console.log('[postbuild] Verified dist/.nojekyll is present');
}
