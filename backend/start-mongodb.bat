@echo off
echo Checking MongoDB status...

REM Check if MongoDB is running
tasklist /FI "IMAGENAME eq mongod.exe" 2>NUL | find /I /N "mongod.exe">NUL
if "%ERRORLEVEL%"=="0" (
  echo MongoDB is already running.
) else (
  echo Starting MongoDB...
  
  REM Try to start MongoDB
  where mongod >nul 2>nul
  if %ERRORLEVEL% EQU 0 (
    start /B mongod --dbpath .\data\db
    echo MongoDB started successfully.
  ) else (
    echo MongoDB is not installed or not in PATH.
    echo Please install MongoDB from: https://www.mongodb.com/try/download/community
    echo After installation, add MongoDB to your PATH.
  )
) 