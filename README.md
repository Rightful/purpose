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

- `frontend/`: Vue.js frontend application
- `backend/`: Express.js backend API

## Local Development

### Backend

```bash
cd backend
npm install
npm run dev
```

The backend will run on http://localhost:3001

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on http://localhost:5173

## Deployment

### Backend Deployment

The backend can be deployed to various platforms:

#### Heroku

1. Create a new Heroku app
2. Connect your GitHub repository
3. Set the following environment variables:
   - `NODE_ENV=production`
4. Deploy the app

#### Railway

1. Create a new Railway project
2. Connect your GitHub repository
3. Set the following environment variables:
   - `NODE_ENV=production`
4. Deploy the app

### Frontend Deployment (Netlify)

1. Create a new Netlify site
2. Connect your GitHub repository
3. Set the build settings:
   - Build command: `cd frontend && npm install && npm run build`
   - Publish directory: `frontend/dist`
4. Set the following environment variables:
   - `VITE_API_URL=https://your-backend-url.com/api`
5. Deploy the site

## Environment Variables

### Backend

- `PORT`: The port the server will run on (default: 3001)
- `NODE_ENV`: The environment (development/production)

### Frontend

- `VITE_API_URL`: The URL of the backend API

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