@echo off
echo Starting Ummah Talent Backend using Git Bash...

REM Check if Git Bash is installed
where bash >nul 2>nul
if %ERRORLEVEL% EQU 0 (
  REM Run the application using Git Bash
  bash -c "cd %~dp0 && ./run.sh"
) else (
  echo Git Bash is not installed or not in PATH.
  echo Please install Git Bash from: https://git-scm.com/download/win
  echo After installation, add Git Bash to your PATH.
) 