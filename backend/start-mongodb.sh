#!/bin/bash

# Check if MongoDB is already running
if pgrep -x "mongod" > /dev/null; then
  echo "MongoDB is already running."
else
  echo "Starting MongoDB..."
  
  # Try to start MongoDB using different common paths
  if command -v mongod &> /dev/null; then
    # Start MongoDB in the background
    mongod --dbpath ./data/db &
    echo "MongoDB started successfully."
  else
    echo "MongoDB is not installed or not in PATH."
    echo "Please install MongoDB or add it to your PATH."
    echo "For Windows: https://www.mongodb.com/try/download/community"
    echo "For macOS: brew install mongodb-community"
    echo "For Linux: https://www.mongodb.com/docs/manual/administration/install-on-linux/"
  fi
fi 