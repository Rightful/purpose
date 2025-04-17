# Windows Setup for Ummah Talent Backend

This guide will help you set up and run the Ummah Talent Backend on Windows.

## Prerequisites

1. **Node.js**: Download and install from [https://nodejs.org/](https://nodejs.org/)
2. **MongoDB**: Download and install from [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
3. **Git Bash** (optional): Download and install from [https://git-scm.com/download/win](https://git-scm.com/download/win)

## Setup Instructions

### 1. Install MongoDB

1. Download MongoDB Community Server from [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
2. Run the installer and follow the instructions
3. Make sure to add MongoDB to your PATH during installation

### 2. Create Data Directory

1. Open Command Prompt as Administrator
2. Run the following commands:
   ```
   mkdir C:\data
   mkdir C:\data\db
   ```

### 3. Run the Application

#### Option 1: Using the batch files (recommended)

1. Double-click `start-mongodb.bat` to start MongoDB
2. Double-click `run.bat` to start the application

#### Option 2: Using Command Prompt

1. Open Command Prompt
2. Navigate to the backend directory:
   ```
   cd C:\path\to\ummah-talent\backend
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Start the development server:
   ```
   npm run dev
   ```

#### Option 3: Using Git Bash

1. Open Git Bash
2. Navigate to the backend directory:
   ```
   cd /c/path/to/ummah-talent/backend
   ```
3. Run the application:
   ```
   ./run.sh
   ```

## Troubleshooting

### MongoDB Connection Issues

If you see "MongoDB connection error" in the console:

1. Make sure MongoDB is running:
   - Open Task Manager
   - Look for "mongod.exe" in the Processes tab
   - If not found, run `start-mongodb.bat` again

2. Check if MongoDB is installed correctly:
   - Open Command Prompt
   - Run `mongod --version`
   - If not recognized, reinstall MongoDB and add it to PATH

### Node.js Issues

If you see "npm is not recognized":

1. Make sure Node.js is installed:
   - Open Command Prompt
   - Run `node --version`
   - If not recognized, reinstall Node.js

2. Restart your computer after installation

## API Testing

Once the server is running, you can test the API using:

1. **Health Check**:
   - Open your browser and go to: `http://localhost:3000/api/health`
   - You should see: `{"status":"ok"}`

2. **Matching API**:
   - Use Postman or curl to test the matching endpoints
   - Example: `GET http://localhost:3000/api/matching/jobs/123` 