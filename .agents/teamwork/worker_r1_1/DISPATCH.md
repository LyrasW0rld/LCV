# Worker Task Assignment: GitHub Pages Root & Subfolder Fix

## Objective
Implement the complete solution to fix GitHub Pages accessibility so the website loads cleanly without manual subfolder navigation, under both GitHub Actions and standard branch deployment, while ensuring all builds and tests pass cleanly across Node 18.x to 22.x with zero Google Cloud/Gemini backend dependencies.

## Mandatory Reading
1. `c:\Users\jerem\Downloads\LCV\.agents\teamwork\ORIGINAL_REQUEST.md`
2. `c:\Users\jerem\Downloads\LCV\.agents\teamwork\orchestrator_2\SCOPE.md`
3. Explorer reports:
   - `c:\Users\jerem\Downloads\LCV\.agents\teamwork\explorer_r1_1\handoff.md`
   - `c:\Users\jerem\Downloads\LCV\.agents\teamwork\explorer_r1_2\handoff.md`
   - `c:\Users\jerem\Downloads\LCV\.agents\teamwork\explorer_r1_3\handoff.md`

## File Ownership
You exclusively own and may edit or create:
- `.github/workflows/deploy.yml`
- `.github/workflows/static.yml` (remove or reconcile)
- `deploy.yml` at repository root (remove or replace by moving into `.github/workflows/`)
- `index.html` at repository root
- `.nojekyll` at repository root
- `package.json` (if adjusting build/postbuild script to produce `dist/404.html`)
- `scripts/verify-build.js` (add verification steps for root `index.html`, root `.nojekyll`, and `.github/workflows/deploy.yml`)
- `frontend/public/` (if adding 404.html template)

## Mandatory Requirements
1. **GitHub Actions Workflow**:
   - Ensure `.github/workflows/deploy.yml` exists, is active, tests against Node 18.x, 19.x, 20.x, 21.x, 22.x, runs `npm install`, `npm run build`, `npm test`, and uploads `path: ./dist` to `actions/upload-pages-artifact@v3`.
   - Remove any root-level misplaced `deploy.yml` and obsolete `.github/workflows/static.yml`.
2. **Root Entry Point (`index.html`)**:
   - Create `index.html` at repository root (`c:\Users\jerem\Downloads\LCV\index.html`).
   - It must immediately redirect to `./dist/` using both `<meta http-equiv="refresh" content="0; url=./dist/">` and JavaScript `window.location.replace('./dist/' + window.location.search + window.location.hash);`.
   - It must include a clean fallback link in case JavaScript / meta refresh is disabled.
3. **Static Hosting Metadata**:
   - Create `.nojekyll` at repository root (`c:\Users\jerem\Downloads\LCV\.nojekyll`).
   - Ensure `dist/404.html` is generated (e.g. by adding a copy step in build/postbuild script or copying `frontend/public/404.html` to `dist/404.html`), containing the same SPA mounting code as `index.html`.
4. **Build & Test Verification**:
   - Update `scripts/verify-build.js` to also check:
     - Root `index.html` exists, contains `./dist/` redirection, and forwards query/hash parameters.
     - Root `.nojekyll` exists.
     - `.github/workflows/deploy.yml` exists and configures `path: ./dist`.
   - Run `npm run build` and `npm test`. Both must pass with 100% success (0 failures).
   - Run `node scripts/empirical-stress-test.mjs`. All 72 checks must pass.
5. **Mandatory Integrity Warning**:
   DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Write your handoff report to `c:\Users\jerem\Downloads\LCV\.agents\teamwork\worker_r1_1\handoff.md`.


## 2026-10-28T17:50:45Z
You are Worker 1 (teamwork_worker).
Your working directory is: c:\Users\jerem\Downloads\LCV\.agents\teamwork\worker_r1_1
You MUST read:
1. c:\Users\jerem\Downloads\LCV\.agents\teamwork\ORIGINAL_REQUEST.md
2. c:\Users\jerem\Downloads\LCV\.agents\teamwork\orchestrator_2\SCOPE.md
3. c:\Users\jerem\Downloads\LCV\.agents\teamwork\worker_r1_1\DISPATCH.md
4. Explorer reports:
   - c:\Users\jerem\Downloads\LCV\.agents\teamwork\explorer_r1_1\handoff.md
   - c:\Users\jerem\Downloads\LCV\.agents\teamwork\explorer_r1_2\handoff.md
   - c:\Users\jerem\Downloads\LCV\.agents\teamwork\explorer_r1_3\handoff.md

Your goal is to implement the GitHub Pages accessibility and subfolder fix.
Requirements:
1. Ensure `.github/workflows/deploy.yml` exists, is active, tests against Node 18.x, 19.x, 20.x, 21.x, 22.x, runs `npm install`, `npm run build`, `npm test`, and uploads `path: ./dist` to `actions/upload-pages-artifact@v3`. Remove root `deploy.yml` and obsolete `.github/workflows/static.yml`.
2. Create root `index.html` trampoline with meta refresh and JS redirection to `./dist/` preserving search & hash params, plus fallback message.
3. Ensure root `.nojekyll` exists, and ensure `dist/404.html` is generated on build.
4. Update `scripts/verify-build.js` to verify root `index.html`, root `.nojekyll`, and `.github/workflows/deploy.yml`.
5. Run `npm run build`, `npm test`, and `node scripts/empirical-stress-test.mjs`. Verify all tests pass with exit code 0.
