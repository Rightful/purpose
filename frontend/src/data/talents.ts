import { Talent } from '@/types';

export const talents: Talent[] = [
  {
    id: '1',
    name: 'Ahmed Hassan',
    title: 'Senior Software Engineer',
    location: 'Amsterdam',
    experience: 5,
    skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'AWS', 'Docker'],
    bio: 'Experienced software engineer with a passion for creating ethical technology solutions. Specialized in fintech and Islamic finance applications.',
    education: [
      {
        degree: 'MSc Computer Science',
        institution: 'University of Amsterdam',
        year: 2018
      },
      {
        degree: 'BSc Software Engineering',
        institution: 'Technical University of Delft',
        year: 2016
      }
    ],
    certifications: ['AWS Certified Developer', 'Google Cloud Professional'],
    languages: ['English', 'Arabic', 'Dutch'],
    status: 'Available'
  },
  {
    id: '2',
    name: 'Fatima Rahman',
    title: 'UX/UI Designer',
    location: 'Rotterdam',
    experience: 3,
    skills: ['UI/UX Design', 'Figma', 'Adobe XD', 'User Research', 'Prototyping'],
    bio: 'Creative UX designer focused on creating intuitive and accessible digital experiences. Passionate about designing for diverse user needs.',
    education: [
      {
        degree: 'BA Design',
        institution: 'Design Academy Eindhoven',
        year: 2019
      }
    ],
    certifications: ['Google UX Design Certificate'],
    languages: ['English', 'Arabic', 'Dutch', 'French'],
    status: 'Available'
  },
  {
    id: '3',
    name: 'Omar Khalid',
    title: 'Islamic Finance Consultant',
    location: 'Utrecht',
    experience: 7,
    skills: ['Islamic Finance', 'Shariah Compliance', 'Financial Analysis', 'Risk Management', 'Business Development'],
    bio: 'Experienced Islamic finance consultant with expertise in Shariah-compliant financial products and services. Strong network in the European Islamic finance sector.',
    education: [
      {
        degree: 'MBA Finance',
        institution: 'Rotterdam School of Management',
        year: 2015
      },
      {
        degree: 'BA Economics',
        institution: 'University of Amsterdam',
        year: 2013
      }
    ],
    certifications: ['Chartered Islamic Finance Professional (CIFP)', 'Financial Risk Manager (FRM)'],
    languages: ['English', 'Arabic', 'Dutch', 'German'],
    status: 'Available'
  },
  {
    id: '4',
    name: 'Aisha Patel',
    title: 'Marketing Manager',
    location: 'The Hague',
    experience: 4,
    skills: ['Digital Marketing', 'Content Strategy', 'Social Media', 'SEO', 'Analytics', 'Brand Management'],
    bio: 'Strategic marketing professional with experience in both traditional and digital marketing. Specialized in creating campaigns that resonate with diverse audiences.',
    education: [
      {
        degree: 'MA Marketing',
        institution: 'University of Groningen',
        year: 2018
      },
      {
        degree: 'BA Business Administration',
        institution: 'Erasmus University Rotterdam',
        year: 2016
      }
    ],
    certifications: ['Google Analytics Certified', 'HubSpot Marketing Certified'],
    languages: ['English', 'Dutch', 'Hindi', 'Urdu'],
    status: 'Available'
  }
]; 