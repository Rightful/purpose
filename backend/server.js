const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://unrivaled-crepe-69eb3f.netlify.app',
    'https://purpose-production.up.railway.app',
    'https://*.netlify.app',
    'https://*.railway.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Sample job data
const jobs = [
  {
    id: 1,
    title: 'Software Engineer',
    company: 'Tech Solutions Inc',
    location: 'Remote',
    type: 'Full-time',
    description: 'We are looking for a skilled software engineer to join our team...',
    salaryRange: '$80,000 - $120,000',
    requiredSkills: ['JavaScript', 'React', 'Node.js'],
    halalIncome: true,
    prayerFriendly: true,
    experienceLevel: 'Mid-level'
  },
  {
    id: 2,
    title: 'Product Manager',
    company: 'Innovation Labs',
    location: 'New York, NY',
    type: 'Full-time',
    description: 'Seeking an experienced product manager to lead our product development...',
    salaryRange: '$90,000 - $130,000',
    requiredSkills: ['Product Management', 'Agile', 'Communication'],
    halalIncome: true,
    prayerFriendly: true,
    experienceLevel: 'Senior'
  },
  // Add more sample jobs as needed
];

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    port: port,
    environment: process.env.NODE_ENV || 'development'
  });
});

// Get all jobs
app.get('/api/jobs', (req, res) => {
  res.json(jobs);
});

// Search jobs
app.get('/api/jobs/search', (req, res) => {
  const searchQuery = req.query.q?.toLowerCase() || '';
  
  const filteredJobs = jobs.filter(job => {
    return (
      job.title.toLowerCase().includes(searchQuery) ||
      job.company.toLowerCase().includes(searchQuery) ||
      job.location.toLowerCase().includes(searchQuery) ||
      job.requiredSkills.some(skill => skill.toLowerCase().includes(searchQuery))
    );
  });

  res.json(filteredJobs);
});

// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
}); 