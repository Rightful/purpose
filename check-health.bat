@echo off
echo Checking application health...

echo.
echo Checking backend health...
curl -s http://localhost:3000/api/health
if %errorlevel% equ 0 (
    echo Backend is running properly!
) else (
    echo Backend is not responding. Please check if it's running.
)

echo.
echo Checking frontend health...
curl -s http://localhost:5173
if %errorlevel% equ 0 (
    echo Frontend is running properly!
) else (
    echo Frontend is not responding. Please check if it's running.
)

echo.
echo Press any key to exit...
pause > nul 