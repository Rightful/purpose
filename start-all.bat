@echo off
echo Starting Ummah Talent Application...

REM Start MongoDB
echo Starting MongoDB...
start cmd /k "cd backend && start-mongodb.bat"

REM Wait for MongoDB to start
echo Waiting for MongoDB to start...
sleep 5

REM Start Backend
echo Starting Backend...
start cmd /k "cd backend && run.bat"

REM Wait for Backend to start
echo Waiting for Backend to start...
sleep 5

REM Start Frontend
echo Starting Frontend...
start cmd /k "cd frontend && npm run dev"

echo.
echo All services are starting...
echo.
echo Once everything is loaded:
echo - Frontend will be available at: http://localhost:5173
echo - Backend API will be available at: http://localhost:3001
echo - MongoDB will be running at: mongodb://localhost:27017
echo.
echo Press any key to close this window (services will continue running)...
pause > nul 