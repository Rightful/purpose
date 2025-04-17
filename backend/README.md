# Ummah Talent Backend

A backend service for matching Muslim talent with faith-aligned job opportunities.

## Features

- Job-Talent matching based on skills and faith alignment
- Authentication middleware
- RESTful API endpoints
- MongoDB integration

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with:
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=3000
```

3. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user

### Matching
- GET `/api/matching/jobs/:talentId` - Get matching jobs for a talent
- GET `/api/matching/talents/:jobId` - Get matching talents for a job
- GET `/api/matching/score/:jobId/:talentId` - Get match score between job and talent

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