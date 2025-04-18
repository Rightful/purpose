import type { Talent } from '@/types'

export const talents: Talent[] = [
  {
    id: '1',
    name: 'Ahmed Hassan',
    title: 'Senior Software Engineer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    location: 'Amsterdam, Netherlands',
    skills: ['React', 'TypeScript', 'Node.js', 'AWS'],
    experience: '8 years',
    availability: 'Full-time',
    isVerified: true,
    isCommunityMember: true,
    faithAlignment: {
      prayerTimePreference: 'fixed',
      hijabPolicy: 'not_applicable',
      genderPreference: 'none',
      dietaryRequirements: 'halal'
    },
    bio: 'Experienced software engineer with a passion for building scalable applications.',
    languages: ['English', 'Arabic', 'Dutch'],
    education: 'MSc Computer Science, TU Delft'
  },
  {
    id: '2',
    name: 'Fatima Al-Sayed',
    title: 'UX/UI Designer',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    location: 'London, UK',
    skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping'],
    experience: '5 years',
    availability: 'Full-time',
    isVerified: true,
    isCommunityMember: true,
    faithAlignment: {
      prayerTimePreference: 'flexible',
      hijabPolicy: 'required',
      genderPreference: 'female',
      dietaryRequirements: 'halal'
    },
    bio: 'Creative designer focused on creating intuitive and accessible user experiences.',
    languages: ['English', 'Arabic', 'French'],
    education: 'BA Design, University of London'
  },
  {
    id: '3',
    name: 'Yusuf Khan',
    title: 'Data Scientist',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    location: 'Berlin, Germany',
    skills: ['Python', 'Machine Learning', 'SQL', 'TensorFlow'],
    experience: '6 years',
    availability: 'Part-time',
    isVerified: true,
    isCommunityMember: false,
    faithAlignment: {
      prayerTimePreference: 'fixed',
      hijabPolicy: 'not_applicable',
      genderPreference: 'none',
      dietaryRequirements: 'halal'
    },
    bio: 'Data scientist specializing in machine learning and predictive analytics.',
    languages: ['English', 'Urdu', 'German'],
    education: 'PhD Computer Science, TU Berlin'
  },
  {
    id: '4',
    name: 'Aisha Rahman',
    title: 'Marketing Manager',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    location: 'The Hague, Netherlands',
    skills: ['Digital Marketing', 'Social Media', 'Content Strategy', 'Analytics'],
    experience: '7 years',
    availability: 'Full-time',
    isVerified: true,
    isCommunityMember: true,
    faithAlignment: {
      prayerTimePreference: 'fixed',
      hijabPolicy: 'required',
      genderPreference: 'female',
      dietaryRequirements: 'halal'
    },
    bio: 'Strategic marketing professional with expertise in digital campaigns and brand development. Strong track record of driving engagement and growth.',
    languages: ['English', 'Bengali', 'Dutch'],
    education: 'MBA Marketing, Rotterdam School of Management'
  },
  {
    id: '5',
    name: 'Omar Ibrahim',
    title: 'Product Manager',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    location: 'Eindhoven, Netherlands',
    skills: ['Agile', 'Product Strategy', 'User Stories', 'Roadmap Planning'],
    experience: '9 years',
    availability: 'Full-time',
    isVerified: true,
    isCommunityMember: false,
    faithAlignment: {
      prayerTimePreference: 'flexible',
      hijabPolicy: 'not_applicable',
      genderPreference: 'none',
      dietaryRequirements: 'halal'
    },
    bio: 'Product manager with a strong technical background and passion for user-centric product development. Experienced in leading cross-functional teams.',
    languages: ['English', 'Arabic', 'Dutch'],
    education: 'MSc Business Administration, TU Eindhoven'
  },
  {
    id: '6',
    name: 'Zainab Ali',
    title: 'Content Writer',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    location: 'Groningen, Netherlands',
    skills: ['Content Writing', 'SEO', 'Copywriting', 'Social Media'],
    experience: '4 years',
    availability: 'Full-time',
    isVerified: true,
    isCommunityMember: true,
    faithAlignment: {
      prayerTimePreference: 'fixed',
      hijabPolicy: 'required',
      genderPreference: 'female',
      dietaryRequirements: 'halal'
    },
    bio: 'Creative content writer specializing in engaging digital content and SEO optimization. Experienced in creating compelling narratives for various industries.',
    languages: ['English', 'Urdu', 'Dutch'],
    education: 'BA Journalism, University of Groningen'
  },
  {
    id: '7',
    name: 'Mehmet Yilmaz',
    title: 'DevOps Engineer',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    location: 'Utrecht, Netherlands',
    skills: ['Docker', 'Kubernetes', 'CI/CD', 'AWS', 'Terraform'],
    experience: '5 years',
    availability: 'Full-time',
    isVerified: true,
    isCommunityMember: true,
    faithAlignment: {
      prayerTimePreference: 'fixed',
      hijabPolicy: 'not_applicable',
      genderPreference: 'none',
      dietaryRequirements: 'halal'
    },
    bio: 'DevOps engineer with expertise in cloud infrastructure and automation. Passionate about building scalable and reliable systems.',
    languages: ['English', 'Turkish', 'Dutch'],
    education: 'MSc Computer Science, Utrecht University'
  },
  {
    id: '8',
    name: 'Sofia Martinez',
    title: 'Frontend Developer',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    location: 'Rotterdam, Netherlands',
    skills: ['Vue.js', 'React', 'TypeScript', 'CSS', 'Web Accessibility'],
    experience: '4 years',
    availability: 'Full-time',
    isVerified: true,
    isCommunityMember: false,
    faithAlignment: {
      prayerTimePreference: 'flexible',
      hijabPolicy: 'not_applicable',
      genderPreference: 'female',
      dietaryRequirements: 'halal'
    },
    bio: 'Frontend developer specializing in creating responsive and accessible web applications. Strong focus on user experience and performance optimization.',
    languages: ['English', 'Spanish', 'Dutch'],
    education: 'BSc Computer Science, Erasmus University'
  },
  {
    id: '9',
    name: 'David Chen',
    title: 'Backend Developer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    location: 'Amsterdam, Netherlands',
    skills: ['Java', 'Spring Boot', 'Microservices', 'PostgreSQL', 'Redis'],
    experience: '6 years',
    availability: 'Full-time',
    isVerified: true,
    isCommunityMember: true,
    faithAlignment: {
      prayerTimePreference: 'fixed',
      hijabPolicy: 'not_applicable',
      genderPreference: 'none',
      dietaryRequirements: 'halal'
    },
    bio: 'Backend developer with expertise in building robust and scalable microservices architectures. Experienced in high-performance systems.',
    languages: ['English', 'Mandarin', 'Dutch'],
    education: 'MSc Software Engineering, University of Amsterdam'
  },
  {
    id: '10',
    name: 'Maria Santos',
    title: 'QA Engineer',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    location: 'Eindhoven, Netherlands',
    skills: ['Test Automation', 'Selenium', 'JUnit', 'Cypress', 'Agile Testing'],
    experience: '5 years',
    availability: 'Full-time',
    isVerified: true,
    isCommunityMember: false,
    faithAlignment: {
      prayerTimePreference: 'fixed',
      hijabPolicy: 'not_applicable',
      genderPreference: 'female',
      dietaryRequirements: 'halal'
    },
    bio: 'QA engineer specializing in test automation and quality assurance. Strong focus on continuous integration and delivery.',
    languages: ['English', 'Portuguese', 'Dutch'],
    education: 'BSc Computer Science, TU Eindhoven'
  }
] 