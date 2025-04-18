import { Job } from '../types';

export const jobs: Job[] = [
  {
    id: '1',
    title: 'Senior Software Engineer',
    company: 'TechCorp Islamic Finance',
    companyId: 'tcif1',
    location: 'Amsterdam, NL',
    type: 'Full-time',
    description: 'Join our growing team of developers working on innovative Islamic finance solutions.',
    salary: {
      min: 65000,
      max: 95000,
      currency: 'EUR'
    },
    requirements: [
      '5+ years of experience in software development',
      'Strong knowledge of TypeScript and React',
      'Experience with Islamic finance principles',
      'Excellent problem-solving skills'
    ],
    experience: '5+ years',
    faithAlignment: {
      halalIncome: true,
      prayerFriendly: true,
      flexibleHours: true,
      modestDressCode: true
    },
    postedDate: '2024-03-15',
    applicationDeadline: '2024-04-15',
    contactEmail: 'careers@techcorp-if.nl',
    website: 'https://techcorp-if.nl'
  },
  {
    id: '2',
    title: 'Marketing Manager',
    company: 'Halal Foods Co',
    companyId: 'hfc1',
    location: 'Rotterdam, NL',
    type: 'Full-time',
    description: 'Lead our marketing efforts for halal food products in the European market.',
    salary: {
      min: 45000,
      max: 65000,
      currency: 'EUR'
    },
    requirements: [
      'Bachelor\'s degree in Marketing or related field',
      '5+ years of marketing experience',
      'Strong understanding of halal market',
      'Excellent communication skills'
    ],
    experience: '5+ years',
    faithAlignment: {
      halalIncome: true,
      prayerFriendly: true,
      flexibleHours: true,
      modestDressCode: true
    },
    postedDate: '2024-03-14',
    applicationDeadline: '2024-04-14',
    contactEmail: 'hr@halalfoods.nl',
    website: 'https://halalfoods.nl'
  },
  {
    id: '3',
    title: 'Data Scientist',
    company: 'MuslimTech Solutions',
    companyId: 'mts1',
    location: 'Utrecht, NL',
    type: 'Full-time',
    description: 'Work on cutting-edge AI projects while maintaining Islamic values and ethics.',
    salary: {
      min: 55000,
      max: 85000,
      currency: 'EUR'
    },
    requirements: [
      'PhD in Computer Science or related field',
      'Experience with machine learning algorithms',
      'Strong Python skills',
      'Understanding of AI ethics'
    ],
    experience: '3+ years',
    faithAlignment: {
      halalIncome: true,
      prayerFriendly: true,
      flexibleHours: true,
      modestDressCode: false
    },
    postedDate: '2024-03-13',
    applicationDeadline: '2024-04-13',
    contactEmail: 'careers@muslimtech.nl',
    website: 'https://muslimtech.nl'
  },
  {
    id: '4',
    title: 'Business Development Manager',
    company: 'Islamic Finance Hub',
    companyId: 'c4',
    location: 'The Hague, NL',
    type: 'Full-time',
    description: 'Join our team to develop new partnerships and expand our Islamic finance services across Europe. Strong network in the Islamic finance sector is required.',
    salary: {
      min: 70000,
      max: 90000,
      currency: 'EUR'
    },
    requirements: ['Business Development', 'Islamic Finance', 'Networking', 'Sales'],
    experience: '5+ years',
    faithAlignment: {
      halalIncome: true,
      prayerFriendly: true,
      flexibleHours: true,
      modestDressCode: true
    },
    postedDate: '2023-04-01',
    applicationDeadline: '2023-05-01',
    contactEmail: 'careers@islamicfinancehub.nl',
    website: 'https://islamicfinancehub.nl'
  },
  {
    id: '5',
    title: 'Product Manager',
    company: 'Innovate Finance',
    companyId: 'c6',
    location: 'Rotterdam, NL',
    type: 'Full-time',
    description: 'Join our fintech company as a Product Manager. You will lead the development of innovative financial products that serve diverse communities.',
    salary: {
      min: 65000,
      max: 85000,
      currency: 'EUR'
    },
    requirements: ['Product Management', 'Agile', 'User Stories', 'Market Research', 'Financial Services'],
    experience: '4+ years',
    faithAlignment: {
      halalIncome: true,
      prayerFriendly: true,
      flexibleHours: true,
      modestDressCode: true
    },
    postedDate: '2023-04-12',
    applicationDeadline: '2023-05-12',
    contactEmail: 'careers@innovatefinance.nl',
    website: 'https://innovatefinance.nl'
  },
  {
    id: '6',
    title: 'Frontend Developer',
    company: 'Digital Health Solutions',
    companyId: 'c7',
    location: 'Utrecht, NL',
    type: 'Full-time',
    description: 'We are seeking a Frontend Developer to join our healthcare technology team. You will work on creating accessible and user-friendly healthcare applications.',
    salary: {
      min: 50000,
      max: 70000,
      currency: 'EUR'
    },
    requirements: ['JavaScript', 'React', 'CSS', 'Accessibility', 'Healthcare'],
    experience: '2+ years',
    faithAlignment: {
      halalIncome: true,
      prayerFriendly: true,
      flexibleHours: true,
      modestDressCode: true
    },
    postedDate: '2023-04-08',
    applicationDeadline: '2023-05-08',
    contactEmail: 'jobs@digitalhealthsolutions.nl',
    website: 'https://digitalhealthsolutions.nl'
  },
  {
    id: '7',
    title: 'Content Writer',
    company: 'Muslim Lifestyle Magazine',
    companyId: 'c8',
    location: 'The Hague, NL',
    type: 'Part-time',
    description: 'Join our editorial team as a Content Writer. Create engaging content about Muslim lifestyle, culture, and faith-aligned living.',
    salary: {
      min: 30000,
      max: 40000,
      currency: 'EUR'
    },
    requirements: ['Content Writing', 'SEO', 'Social Media', 'Editing', 'Muslim Culture'],
    experience: '2+ years',
    faithAlignment: {
      halalIncome: true,
      prayerFriendly: true,
      flexibleHours: true,
      modestDressCode: true
    },
    postedDate: '2023-04-20',
    applicationDeadline: '2023-05-20',
    contactEmail: 'editor@muslimlifestylemag.nl',
    website: 'https://muslimlifestylemag.nl'
  },
  {
    id: '8',
    title: 'HR Manager',
    company: 'Diverse Tech Inc',
    companyId: 'c9',
    location: 'Amsterdam, NL',
    type: 'Full-time',
    description: 'We are looking for an HR Manager to lead our diversity and inclusion initiatives. Experience with creating inclusive workplace policies is required.',
    salary: {
      min: 55000,
      max: 75000,
      currency: 'EUR'
    },
    requirements: ['HR Management', 'Diversity & Inclusion', 'Policy Development', 'Recruitment'],
    experience: '5+ years',
    faithAlignment: {
      halalIncome: true,
      prayerFriendly: true,
      flexibleHours: true,
      modestDressCode: true
    },
    postedDate: '2023-04-15',
    applicationDeadline: '2023-05-15',
    contactEmail: 'hr@diversetechinc.nl',
    website: 'https://diversetechinc.nl'
  },
  {
    id: '9',
    title: 'Islamic Finance Analyst',
    company: 'Ethical Investment Group',
    companyId: 'c10',
    location: 'Rotterdam, NL',
    type: 'Full-time',
    description: 'Join our team as an Islamic Finance Analyst. You will analyze investment opportunities and ensure they meet Shariah compliance standards.',
    salary: {
      min: 60000,
      max: 80000,
      currency: 'EUR'
    },
    requirements: ['Islamic Finance', 'Financial Analysis', 'Shariah Compliance', 'Excel'],
    experience: '3+ years',
    faithAlignment: {
      halalIncome: true,
      prayerFriendly: true,
      flexibleHours: true,
      modestDressCode: true
    },
    postedDate: '2023-04-10',
    applicationDeadline: '2023-05-10',
    contactEmail: 'careers@ethicalinvestmentgroup.nl',
    website: 'https://ethicalinvestmentgroup.nl'
  },
  {
    id: '10',
    title: 'Software Developer',
    company: 'Halal Tech Solutions',
    companyId: 'c11',
    location: 'Eindhoven, NL',
    type: 'Full-time',
    description: 'Join our team of developers working on innovative solutions for the Muslim community.',
    salary: {
      min: 45000,
      max: 65000,
      currency: 'EUR'
    },
    requirements: ['JavaScript', 'React', 'Node.js', 'API Development'],
    experience: '2+ years',
    faithAlignment: {
      halalIncome: true,
      prayerFriendly: true,
      flexibleHours: true,
      modestDressCode: true
    },
    postedDate: '2023-04-05',
    applicationDeadline: '2023-05-05',
    contactEmail: 'careers@halaltech.nl',
    website: 'https://halaltech.nl'
  },
  {
    id: '11',
    title: 'Marketing Specialist',
    company: 'European Halal Market',
    companyId: 'c12',
    location: 'Brussels, BE',
    type: 'Full-time',
    description: 'Help us expand our halal market presence across Europe. Experience in European markets required.',
    salary: {
      min: 40000,
      max: 60000,
      currency: 'EUR'
    },
    requirements: ['Marketing', 'European Markets', 'Digital Marketing', 'Analytics'],
    experience: '3+ years',
    faithAlignment: {
      halalIncome: true,
      prayerFriendly: true,
      flexibleHours: true,
      modestDressCode: true
    },
    postedDate: '2023-04-18',
    applicationDeadline: '2023-05-18',
    contactEmail: 'careers@europeanhalalmarket.eu',
    website: 'https://europeanhalalmarket.eu'
  }
]; 