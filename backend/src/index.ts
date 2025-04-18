import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// In-memory storage with enhanced data
const jobs = [
  {
    id: '1',
    title: 'Islamic Finance Analyst',
    company: 'Halal Finance Nederland',
    location: 'Amsterdam',
    type: 'Full Time',
    experience: 3,
    salary: {
      min: 45000,
      max: 65000,
      currency: 'EUR'
    },
    description: 'We are looking for an experienced Islamic Finance Analyst to join our team in Amsterdam.',
    requirements: ['financial analysis', 'islamic finance', 'shariah compliance', 'risk management', 'financial modeling'],
    skills: ['financial analysis', 'islamic finance', 'shariah compliance', 'risk management', 'financial modeling', 'excel', 'powerpoint'],
    faithAlignment: {
      halalIncome: true,
      prayerFriendly: true,
      islamicFinance: true
    },
    status: 'active'
  },
  {
    id: '2',
    title: 'Software Developer',
    company: 'Tech Solutions NL',
    location: 'Rotterdam',
    type: 'Full Time',
    experience: 2,
    salary: {
      min: 55000,
      max: 85000,
      currency: 'EUR'
    },
    description: 'Join our team as a Software Developer working on Islamic finance applications in Rotterdam.',
    requirements: ['javascript', 'react', 'node.js', 'typescript', 'api development'],
    skills: ['javascript', 'react', 'node.js', 'typescript', 'api development', 'git', 'docker'],
    faithAlignment: {
      halalIncome: true,
      prayerFriendly: true,
      islamicFinance: true
    },
    status: 'active'
  },
  {
    id: '3',
    title: 'Islamic Banking Manager',
    company: 'Global Islamic Bank Nederland',
    location: 'Amsterdam',
    type: 'Full Time',
    experience: 5,
    salary: {
      min: 75000,
      max: 110000,
      currency: 'EUR'
    },
    description: 'Leading Islamic banking operations and customer relationships in the Netherlands.',
    requirements: ['islamic banking', 'customer relationship', 'team leadership', 'financial products'],
    skills: ['islamic banking', 'customer relationship', 'team leadership', 'financial products', 'risk assessment', 'compliance'],
    faithAlignment: {
      halalIncome: true,
      prayerFriendly: true,
      islamicFinance: true
    },
    status: 'active'
  },
  {
    id: '4',
    title: 'Halal Food Certification Specialist',
    company: 'Halal Certificering Nederland',
    location: 'Utrecht',
    type: 'Full Time',
    experience: 3,
    salary: {
      min: 42000,
      max: 58000,
      currency: 'EUR'
    },
    description: 'Specialist in halal food certification and compliance for the Dutch market.',
    requirements: ['food science', 'halal certification', 'compliance', 'auditing'],
    skills: ['food science', 'halal certification', 'compliance', 'auditing', 'documentation', 'quality control'],
    faithAlignment: {
      halalIncome: true,
      prayerFriendly: true,
      islamicFinance: false
    },
    status: 'active'
  },
  {
    id: '5',
    title: 'Islamic Education Coordinator',
    company: 'Muslim Community Nederland',
    location: 'The Hague',
    type: 'Full Time',
    experience: 4,
    salary: {
      min: 38000,
      max: 52000,
      currency: 'EUR'
    },
    description: 'Coordinating Islamic education programs and community outreach in The Hague.',
    requirements: ['education', 'community outreach', 'program management', 'curriculum development'],
    skills: ['education', 'community outreach', 'program management', 'curriculum development', 'public speaking', 'event planning'],
    faithAlignment: {
      halalIncome: true,
      prayerFriendly: true,
      islamicFinance: false
    },
    status: 'active'
  }
];

const talents = [
  {
    id: '1',
    name: 'Ahmed Hassan',
    title: 'Islamic Finance Expert',
    location: 'Amsterdam',
    experience: 5,
    skills: ['financial analysis', 'islamic finance', 'shariah compliance', 'risk management', 'financial modeling'],
    bio: 'Experienced Islamic finance professional with expertise in shariah-compliant products.',
    education: [
      {
        degree: 'Master in Islamic Finance',
        institution: 'Universiteit van Amsterdam',
        year: 2018
      }
    ],
    certifications: ['Islamic Finance Qualification', 'Risk Management Professional'],
    languages: ['English', 'Dutch', 'Arabic', 'Urdu'],
    status: 'active'
  },
  {
    id: '2',
    name: 'Fatima Ali',
    title: 'Full Stack Developer',
    location: 'Rotterdam',
    experience: 3,
    skills: ['javascript', 'react', 'node.js', 'typescript', 'api development', 'git'],
    bio: 'Passionate developer with experience in Islamic finance applications.',
    education: [
      {
        degree: 'Computer Science',
        institution: 'Technische Universiteit Delft',
        year: 2020
      }
    ],
    certifications: ['AWS Certified Developer'],
    languages: ['English', 'Dutch', 'Arabic'],
    status: 'active'
  },
  {
    id: '3',
    name: 'Yusuf Khan',
    title: 'Islamic Banking Specialist',
    location: 'Amsterdam',
    experience: 8,
    skills: ['islamic banking', 'customer relationship', 'team leadership', 'financial products', 'risk assessment'],
    bio: 'Senior Islamic banking professional with extensive experience in retail and corporate banking.',
    education: [
      {
        degree: 'MBA in Islamic Finance',
        institution: 'Erasmus University Rotterdam',
        year: 2015
      }
    ],
    certifications: ['Certified Islamic Finance Executive'],
    languages: ['English', 'Dutch', 'Arabic', 'Hindi'],
    status: 'active'
  },
  {
    id: '4',
    name: 'Aisha Rahman',
    title: 'Halal Food Certification Expert',
    location: 'Utrecht',
    experience: 4,
    skills: ['food science', 'halal certification', 'compliance', 'auditing', 'quality control'],
    bio: 'Specialist in halal food certification with experience in international standards.',
    education: [
      {
        degree: 'Food Science',
        institution: 'Wageningen University',
        year: 2019
      }
    ],
    certifications: ['Halal Food Certification Professional'],
    languages: ['English', 'Dutch', 'Arabic', 'French'],
    status: 'active'
  },
  {
    id: '5',
    name: 'Mohammed Patel',
    title: 'Islamic Education Specialist',
    location: 'The Hague',
    experience: 6,
    skills: ['education', 'community outreach', 'program management', 'curriculum development', 'public speaking'],
    bio: 'Experienced Islamic educator with a passion for community development.',
    education: [
      {
        degree: 'Islamic Studies',
        institution: 'Leiden University',
        year: 2017
      }
    ],
    certifications: ['Islamic Education Professional'],
    languages: ['English', 'Dutch', 'Arabic', 'Urdu', 'Hindi'],
    status: 'active'
  }
];

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173', // Local development
    'https://ummah-talent.netlify.app', // Netlify domain
    'https://*.netlify.app' // Any Netlify subdomain
  ],
  credentials: true
}));
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Job routes
app.get('/api/jobs', (req, res) => {
  res.json({ jobs: jobs.filter(job => job.status === 'active') });
});

app.get('/api/jobs/search', (req, res) => {
  const query = (req.query.q as string || '').toLowerCase();
  
  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(query) ||
    job.company.toLowerCase().includes(query) ||
    job.location.toLowerCase().includes(query) ||
    job.requirements.some(req => req.toLowerCase().includes(query))
  );
  
  res.json({ jobs: filteredJobs });
});

app.post('/api/jobs', (req, res) => {
  const newJob = {
    id: (jobs.length + 1).toString(),
    ...req.body,
    status: 'active'
  };
  jobs.push(newJob);
  res.status(201).json(newJob);
});

// Talent routes
app.get('/api/talent', (req, res) => {
  res.json({ talents: talents.filter(talent => talent.status === 'active') });
});

app.get('/api/talent/search', (req, res) => {
  const query = req.query.q?.toString().toLowerCase() || '';
  const searchTerms = query.split(' ');
  
  const filteredTalents = talents
    .filter(talent => talent.status === 'active')
    .filter(talent => {
      const searchableText = [
        talent.name,
        talent.title,
        talent.location,
        talent.bio,
        ...talent.skills,
        ...talent.languages,
        ...talent.certifications,
        ...talent.education.map(edu => `${edu.degree} ${edu.institution}`)
      ].join(' ').toLowerCase();
      
      return searchTerms.every(term => searchableText.includes(term));
    });
  
  res.json({ talents: filteredTalents });
});

app.post('/api/talent', (req, res) => {
  const newTalent = {
    id: (talents.length + 1).toString(),
    ...req.body,
    status: 'active'
  };
  talents.push(newTalent);
  res.status(201).json(newTalent);
});

// Enhanced matching algorithm
app.get('/api/matching/:talentId', (req, res) => {
  const talent = talents.find(t => t.id === req.params.talentId);
  if (!talent) {
    return res.status(404).json({ error: 'Talent not found' });
  }

  const matchedJobs = jobs
    .filter(job => job.status === 'active')
    .map(job => {
      // Calculate skill match percentage
      const matchingSkills = job.requirements.filter(req => 
        talent.skills.includes(req.toLowerCase())
      );
      const skillMatchPercentage = (matchingSkills.length / job.requirements.length) * 100;

      // Calculate location match
      const locationMatch = job.location.toLowerCase() === talent.location.toLowerCase() || 
                          job.location.toLowerCase() === 'remote';

      // Calculate experience match
      const experienceMatch = job.experience ? talent.experience >= job.experience : true;

      // Calculate overall match score
      const matchScore = (
        (skillMatchPercentage * 0.6) + // 60% weight for skills
        (locationMatch ? 20 : 0) +     // 20% weight for location
        (experienceMatch ? 20 : 0)     // 20% weight for experience
      );

      return {
        ...job,
        matchDetails: {
          skillMatchPercentage,
          locationMatch,
          experienceMatch,
          matchingSkills,
          matchScore
        }
      };
    })
    .filter(job => job.matchDetails.matchScore > 30) // Only return jobs with >30% match
    .sort((a, b) => b.matchDetails.matchScore - a.matchDetails.matchScore); // Sort by match score

  res.json({ 
    talent,
    matches: matchedJobs,
    matchCount: matchedJobs.length
  });
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
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 