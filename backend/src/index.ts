import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Import models
import Job from './models/Job';
import Talent from './models/Talent';

// Import routes
import matchingRoutes from './routes/matchingRoutes';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ummah-talent')
  .then(() => {
    console.log('Connected to MongoDB');
    
    // Initialize database with sample data if empty
    initializeDatabase();
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });

// Initialize database with sample data
async function initializeDatabase() {
  try {
    // Check if we already have data
    const jobCount = await Job.countDocuments();
    const talentCount = await Talent.countDocuments();

    if (jobCount === 0) {
      // Insert sample jobs
      await Job.insertMany([
        {
          title: 'Islamic Finance Analyst',
          company: 'Halal Finance Inc',
          location: 'London',
          type: 'Full Time',
          salary: {
            min: 50000,
            max: 70000,
            currency: 'GBP'
          },
          description: 'We are looking for an experienced Islamic Finance Analyst to join our team. The ideal candidate will have a strong background in Islamic finance principles and a passion for halal investments.',
          requirements: ['financial analysis', 'islamic finance', 'shariah compliance', 'risk management'],
          faithAlignment: {
            halalIncome: true,
            prayerFriendly: true,
            islamicFinance: true,
            communityImpact: true,
            flexibleHours: true,
            remoteFriendly: false
          },
          postedDate: new Date('2024-03-15'),
          applicationDeadline: new Date('2024-05-15'),
          contactEmail: 'careers@halalfinance.com',
          companyWebsite: 'https://halalfinance.com',
          tags: ['finance', 'islamic finance', 'analysis', 'london'],
          status: 'active'
        },
        {
          title: 'Software Developer',
          company: 'Tech Solutions',
          location: 'Remote',
          type: 'Full Time',
          salary: {
            min: 60000,
            max: 90000,
            currency: 'USD'
          },
          description: 'Join our team as a Software Developer working on Islamic finance applications. We are building the next generation of halal fintech solutions.',
          requirements: ['javascript', 'react', 'node.js', 'islamic finance', 'api development'],
          faithAlignment: {
            halalIncome: true,
            prayerFriendly: true,
            islamicFinance: true,
            communityImpact: false,
            flexibleHours: true,
            remoteFriendly: true
          },
          postedDate: new Date('2024-03-10'),
          applicationDeadline: new Date('2024-05-10'),
          contactEmail: 'jobs@techsolutions.com',
          companyWebsite: 'https://techsolutions.com',
          tags: ['software', 'development', 'islamic finance', 'remote'],
          status: 'active'
        }
      ]);
      console.log('Sample jobs inserted');
    }

    if (talentCount === 0) {
      // Insert sample talents
      await Talent.insertMany([
        {
          name: 'Ahmed Hassan',
          title: 'Islamic Finance Expert',
          location: 'London',
          experience: 5,
          skills: ['financial analysis', 'islamic finance', 'shariah compliance', 'risk management'],
          bio: 'Experienced Islamic finance professional with a passion for halal investments. I have worked with leading Islamic financial institutions and have a strong network in the industry.',
          education: [
            {
              degree: 'Master in Islamic Finance',
              institution: 'Islamic University',
              year: 2018
            },
            {
              degree: 'Bachelor in Economics',
              institution: 'London School of Economics',
              year: 2015
            }
          ],
          availability: 'Full Time',
          faithPreferences: {
            prayerTimes: true,
            halalWork: true,
            islamicFinance: true,
            communityImpact: true,
            flexibleHours: true,
            remoteWork: false
          },
          languages: ['English', 'Arabic', 'Urdu'],
          linkedin: 'https://linkedin.com/in/ahmedhassan',
          status: 'active'
        },
        {
          name: 'Fatima Ali',
          title: 'Full Stack Developer',
          location: 'Remote',
          experience: 3,
          skills: ['javascript', 'react', 'node.js', 'python', 'api development'],
          bio: 'Passionate developer with experience in Islamic finance applications. I enjoy building solutions that make a positive impact on the Muslim community.',
          education: [
            {
              degree: 'Computer Science',
              institution: 'Tech University',
              year: 2020
            }
          ],
          availability: 'Full Time',
          faithPreferences: {
            prayerTimes: true,
            halalWork: true,
            islamicFinance: false,
            communityImpact: true,
            flexibleHours: true,
            remoteWork: true
          },
          languages: ['English', 'Arabic'],
          portfolio: 'https://fatimaali.dev',
          github: 'https://github.com/fatimaali',
          linkedin: 'https://linkedin.com/in/fatimaali',
          status: 'active'
        }
      ]);
      console.log('Sample talents inserted');
    }
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// API routes
app.use('/api/matching', matchingRoutes);

// Job routes
app.get('/api/jobs', async (req, res) => {
  try {
    const jobs = await Job.find({ status: 'active' });
    res.json({ jobs });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Talent routes
app.get('/api/talent', async (req, res) => {
  try {
    const talents = await Talent.find({ status: 'active' });
    res.json({ talents });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something broke!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 