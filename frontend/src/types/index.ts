export interface Job {
  id: string;
  title: string;
  company: string;
  companyId?: string;
  location: string;
  type: string;
  description: string;
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  requirements: string[];
  experience: number;
  faithAlignment: {
    halalIncome: boolean;
    prayerFriendly: boolean;
    flexibleHours?: boolean;
    modestDressCode?: boolean;
    genderSegregation?: boolean;
  };
  postedDate?: string;
  applicationDeadline?: string;
  contactEmail?: string;
  website?: string;
}

export interface Talent {
  id: string;
  name: string;
  title: string;
  location: string;
  experience: number;
  skills: string[];
  bio: string;
  education: {
    degree: string;
    institution: string;
    year: number;
  }[];
  certifications: string[];
  languages: string[];
  status: string;
  profileImage?: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  availability?: string;
  preferredLocations?: string[];
  preferredJobTypes?: string[];
  salaryExpectation?: {
    min: number;
    max: number;
    currency: string;
  };
}

export interface User {
  id: string;
  email: string;
  password: string; // In a real app, this would be hashed
  name: string;
  role: 'talent' | 'company' | 'admin';
  createdAt: string;
  lastLogin?: string;
}

export interface Company {
  id: string;
  name: string;
  description: string;
  industry: string;
  size: string;
  location: string;
  website: string;
  logo?: string;
  foundedYear?: number;
  faithAlignment: {
    halalIncome: boolean;
    prayerFriendly: boolean;
    flexibleHours?: boolean;
    modestDressCode?: boolean;
    genderSegregation?: boolean;
  };
  contactEmail: string;
  contactPhone?: string;
  socialMedia?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
} 