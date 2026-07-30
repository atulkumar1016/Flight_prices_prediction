@echo off
echo ========================================
echo   AirVista - Starting Local Dev Server
echo ========================================
echo.

echo [1/2] Starting Express Backend on http://localhost:5000 ...
start "AirVista Backend" cmd /k "cd /d %~dp0backend && node server.js"

echo [2/2] Starting Vite Frontend on http://localhost:5173 ...
start "AirVista Frontend" cmd /k "cd /d %~dp0frontend && npm.cmd run dev"

echo.
echo Both servers are starting in separate windows.
echo Open http://localhost:5173 in your browser.
echo.
pause
