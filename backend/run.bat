@echo off
echo Starting Ummah Talent Backend...

REM Check if node_modules exists
if not exist node_modules (
  echo Installing dependencies...
  call npm install
)

REM Start the development server
echo Starting development server...
call npm run dev 