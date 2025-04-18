# Ummah Talent Backend

This is the backend server for the Ummah Talent job board application. It provides API endpoints for job search and management.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The server will start on port 3000 by default.

## API Endpoints

### Health Check
- GET `/api/health`
  - Returns server status

### Jobs
- GET `/api/jobs`
  - Returns all available jobs

- GET `/api/jobs/search?q=<search_query>`
  - Search jobs by title, company, location, or skills
  - Query parameter `q` is used for searching

## Development

The server uses:
- Express.js for the web server
- CORS for cross-origin resource sharing
- Nodemon for development auto-reload

## Scripts

- `npm start`: Start the production server
- `npm run dev`: Start the development server with auto-reload

## Environment Variables

The server uses the following environment variables:

- `PORT` - The port number for the server (default: 3000)

## Deployment

This backend is configured for deployment on Railway. The server will automatically use the `PORT` environment variable provided by Railway.

## Features

- Job-Talent matching based on skills and faith alignment
- Authentication middleware
- RESTful API endpoints
- MongoDB integration

## Tech Stack

- Node.js
- Express
- TypeScript
- MongoDB
- JWT Authentication

## Hackathon Demo Notes

This is a simplified MVP version focusing on:
- Basic job-talent matching
- Faith alignment scoring
- Essential API endpoints

For the demo, you can use the following test data:
```json
{
  "job": {
    "title": "Islamic Finance Analyst",
    "requirements": ["financial analysis", "islamic finance"],
    "faithAlignment": {
      "halalIncome": true,
      "prayerFriendly": true,
      "islamicFinance": true
    }
  },
  "talent": {
    "skills": ["financial analysis", "islamic finance", "python"],
    "faithPreferences": {
      "halalWork": true,
      "prayerTimes": true,
      "islamicFinance": true
    }
  }
}
``` 