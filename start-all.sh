#!/bin/bash

# Function to cleanup background processes on exit
cleanup() {
    echo "Stopping all services..."
    kill $(jobs -p) 2>/dev/null
    exit
}

# Set up trap for cleanup
trap cleanup EXIT INT TERM

echo "Starting Purpose Application..."

# Create MongoDB data directory if it doesn't exist
mkdir -p ./backend/data/db

# Start MongoDB
echo "Starting MongoDB..."
mongod --dbpath ./backend/data/db &
sleep 5

# Start Backend
echo "Starting Backend..."
cd backend
if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install
fi
PORT=3001 npm run dev &
cd ..
sleep 5

# Start Frontend
echo "Starting Frontend..."
cd frontend
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
fi
npm run dev &
cd ..

echo
echo "All services are starting..."
echo
echo "Once everything is loaded:"
echo "- Frontend will be available at: http://localhost:5173"
echo "- Backend API will be available at: http://localhost:3001"
echo "- MongoDB will be running at: mongodb://localhost:27017"
echo
echo "Press Ctrl+C to stop all services"

# Wait for all background processes
wait 