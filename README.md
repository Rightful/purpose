# Ummah Talent Platform

A faith-aligned job and talent platform connecting Muslim professionals with opportunities that match their values and skills.

## Features

- Faith-based job matching
- Halal income opportunities
- Community-driven trust system
- Prayer-friendly workplace filters
- Mission-aligned talent search

## Quick Start (Without MongoDB)

The easiest way to run the application is to use the provided batch file:

1. Double-click `run-without-mongodb.bat`
2. Open your browser and go to: http://localhost:5173

This will start both the frontend and backend with in-memory data (no MongoDB required).

## Manual Setup

### Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The backend will be available at: http://localhost:3000

### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will be available at: http://localhost:5173

## API Endpoints

### Health Check
- GET `/api/health` - Check if the backend is running

### Jobs
- GET `/api/jobs` - Get all jobs

### Talents
- GET `/api/talent` - Get all talents

### Matching
- GET `/api/matching/jobs/:talentId` - Get matching jobs for a talent
- GET `/api/matching/talents/:jobId` - Get matching talents for a job
- GET `/api/matching/score/:jobId/:talentId` - Get match score between job and talent

## Tech Stack

### Frontend
- Vue.js 3
- TypeScript
- Tailwind CSS
- Vite

### Backend
- Node.js
- Express
- TypeScript

## Project Structure

```
ummah-talent/
├── frontend/           # Vue.js frontend
│   ├── src/
│   │   ├── assets/    # Static assets
│   │   ├── components/# Vue components
│   │   ├── views/     # Page components
│   │   ├── router/    # Vue Router config
│   │   └── stores/    # Pinia stores
│   └── public/        # Public assets
└── backend/           # Node.js backend
    ├── src/
    │   ├── controllers/
    │   ├── models/
    │   ├── routes/
    │   └── services/
    └── config/
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 

## Hackathon Demo Notes

This is a simplified MVP version focusing on:
- Basic job-talent matching
- Faith alignment scoring
- Essential API endpoints

For the demo, the application uses in-memory data instead of a database for simplicity. 