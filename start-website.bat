@echo off
title The Insurance Hub - Live Server
echo ===================================================
echo   Starting The Insurance Hub Web Application...
echo ===================================================
echo.
cd /d "%~dp0"

echo [1/2] Launching default web browser...
start http://localhost:5173/

echo [2/2] Starting Vite development server...
echo Server running at http://localhost:5173/
echo Press Ctrl+C in this window to stop the server anytime.
echo.
call npm.cmd run dev
pause
