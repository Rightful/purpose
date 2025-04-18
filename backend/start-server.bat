@echo off
echo Starting Purpose Backend Server...

REM Check if port 3000 is in use
netstat -ano | findstr :3000 > nul
if %errorlevel% equ 0 (
    echo Port 3000 is already in use. Attempting to free it...
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000') do (
        taskkill /F /PID %%a
    )
    timeout /t 2 /nobreak > nul
)

REM Start the server
echo Starting server on port 3000...
npm run dev

echo.
echo If the server fails to start, please check:
echo 1. No other applications are using port 3000
echo 2. All dependencies are installed (run 'npm install' if needed)
echo 3. The .env file is properly configured
echo.
echo Press any key to exit...
pause > nul 