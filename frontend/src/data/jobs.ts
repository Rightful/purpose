import { Job } from '@/types';

export const jobs: Job[] = [
  {
    id: '1',
    title: 'Senior Software Engineer',
    company: 'TechCorp Islamic Finance',
    location: 'Amsterdam',
    type: 'Full-time',
    description: 'We are looking for a senior software engineer to join our Islamic finance technology team. The ideal candidate will have experience in fintech and a passion for creating ethical financial solutions.',
    salary: {
      min: 65000,
      max: 85000,
      currency: 'EUR'
    },
    requirements: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'AWS'],
    experience: 5,
    faithAlignment: {
      halalIncome: true,
      prayerFriendly: true
    }
  },
  {
    id: '2',
    title: 'Marketing Manager',
    company: 'Halal Foods Co',
    location: 'Rotterdam',
    type: 'Full-time',
    description: 'Join our growing halal food company as a Marketing Manager. Lead our digital marketing initiatives and help us reach more customers who value halal products.',
    salary: {
      min: 45000,
      max: 60000,
      currency: 'EUR'
    },
    requirements: ['Digital Marketing', 'Social Media', 'Content Strategy', 'Analytics'],
    experience: 3,
    faithAlignment: {
      halalIncome: true,
      prayerFriendly: true
    }
  },
  {
    id: '3',
    title: 'UX Designer',
    company: 'MuslimTech Solutions',
    location: 'Utrecht',
    type: 'Full-time',
    description: 'We are seeking a UX Designer to create beautiful and functional interfaces for our Islamic lifestyle apps. Experience with mobile app design is a plus.',
    salary: {
      min: 55000,
      max: 75000,
      currency: 'EUR'
    },
    requirements: ['UI/UX Design', 'Figma', 'User Research', 'Prototyping'],
    experience: 3,
    faithAlignment: {
      halalIncome: true,
      prayerFriendly: true
    }
  },
  {
    id: '4',
    title: 'Business Development Manager',
    company: 'Islamic Finance Hub',
    location: 'The Hague',
    type: 'Full-time',
    description: 'Join our team to develop new partnerships and expand our Islamic finance services across Europe. Strong network in the Islamic finance sector is required.',
    salary: {
      min: 70000,
      max: 90000,
      currency: 'EUR'
    },
    requirements: ['Business Development', 'Islamic Finance', 'Networking', 'Sales'],
    experience: 5,
    faithAlignment: {
      halalIncome: true,
      prayerFriendly: true
    }
  }
]; 