# Scope: GitHub Pages Subfolder & Root Resolution

## Architecture
- Module: GitHub Pages Deployment, Root Entry Point, CI/CD Workflow, Build Verification
- Static Hosting: Pure HTML5/React single page app with Three.js visualization, Zero GCP/Gemini/backend dependencies.
- Subpath Agnostic: `base: './'` in Vite, relative `./assets/...` links.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | GitHub Actions Workflow Activation | Place `deploy.yml` into `.github/workflows/deploy.yml` configured with `path: ./dist` and Node 18-22 matrix | M1 | Explorers |
| 2 | Root `index.html` Universal Trampoline | Create root `index.html` with instant client-side and meta refresh redirection to `./dist/` preserving search & hash params | M1 | Explorers |
| 3 | Static Hosting Metadata (.nojekyll & 404.html) | Ensure root `.nojekyll` and `dist/404.html` (copy of `dist/index.html`) exist for GitHub Pages SPA compatibility | M1 | Explorers |
| 4 | Verification Suite Updates | Update `scripts/verify-build.js` to verify root `index.html`, root `.nojekyll`, and `.github/workflows/deploy.yml` | M1 | Explorers |
| 5 | Cross-version & Test Execution | Ensure `npm run build`, `npm test`, and `node scripts/empirical-stress-test.mjs` pass cleanly | M1 | Explorers |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | GitHub Pages Accessibility & CI Fix | Implement root index.html, workflow activation, .nojekyll, 404.html, and verify build/test suites | none | DONE |

## Interface Contracts
- `index.html` (root) ↔ `dist/index.html`: Immediate redirect preserving `window.location.search` and `window.location.hash`.
- `.github/workflows/deploy.yml`: Deploys `./dist` to GitHub Pages via `actions/upload-pages-artifact@v3`.
- `package.json`: `npm run build` generates `dist/index.html`, `dist/404.html`, `dist/assets/`, `dist/.nojekyll`.
- `npm test`: executes `node scripts/verify-build.js` validating all deployment artifacts and static integrity.
