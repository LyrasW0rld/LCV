@echo off
setlocal enabledelayedexpansion

:: Parse command-line flags
if "%~1"=="--dry-run" (
    set "LCV_DRY_RUN=1"
    set "LCV_TEST_MODE=1"
)
if "%~1"=="--test" (
    set "LCV_TEST_MODE=1"
)

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
    echo [ERROR] Node.js was not found in your system PATH.
    echo Please install Node.js ^(v18.x - v22.x recommended^) from https://nodejs.org/
    echo.
    if not "!LCV_TEST_MODE!"=="1" pause
    exit /b 1
)

:: Check for npm
where npm >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] npm was not found in your system PATH.
    echo Please ensure npm is installed and added to your system PATH.
    echo.
    if not "!LCV_TEST_MODE!"=="1" pause
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
    echo [ERROR] Dependency installation failed with exit code !errorlevel!.
    echo Please review the npm error messages above.
    echo.
    if not "!LCV_TEST_MODE!"=="1" pause
    exit /b !errorlevel!
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

if "!LCV_DRY_RUN!"=="1" (
    echo [LCV] Dry run verification successful.
    exit /b 0
)

call npm run dev
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Vite development server stopped with error code !errorlevel!.
    echo.
    if not "!LCV_TEST_MODE!"=="1" pause
    exit /b !errorlevel!
)
