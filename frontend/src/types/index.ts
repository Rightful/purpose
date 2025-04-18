export interface Job {
  id: string;
  title: string;
  company: string;
  companyId: string;
  companyLogo?: string;
  location: string;
  type: string;
  description: string;
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  requirements: string[];
  experience: string;
  responsibilities: string[];
  faithAlignment: {
    halalIncome: boolean;
    prayerFriendly: boolean;
    flexibleHours: boolean;
    modestDressCode: boolean;
  };
  postedDate: string;
  applicationDeadline: string;
  contactEmail: string;
  website: string;
}

export interface Talent {
  id: string;
  name: string;
  title: string;
  image: string;
  location: string;
  experience: string;
  skills: string[];
  availability: string;
  isVerified: boolean;
  isCommunityMember: boolean;
  bio?: string;
  languages?: string[];
  education?: string;
  experienceDetails?: {
    title: string;
    company: string;
    duration: string;
    description: string;
  }[];
  faithAlignment: {
    prayerTimePreference: 'fixed' | 'flexible';
    hijabPolicy: string;
    genderPreference: 'male' | 'female' | 'none';
    dietaryRequirements: 'halal' | 'none';
  };
}

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  title?: string;
  image?: string;
  role: 'talent' | 'company';
  location?: string;
  skills?: string[];
  experience?: string;
  availability?: string;
  isVerified?: boolean;
  isCommunityMember?: boolean;
  languages?: string[];
  faithAlignment?: {
    prayerTimePreference: 'fixed' | 'flexible';
    hijabPolicy: 'required' | 'not_applicable';
    genderPreference: 'male' | 'female' | 'none';
    dietaryRequirements: 'halal' | 'none';
  };
  bio?: string;
  education?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Company {
  id: string;
  name: string;
  description: string;
  industry: string;
  location: string;
  size: string;
  website: string;
  faithAlignment: {
    halalIncome: boolean;
    prayerFriendly: boolean;
    flexibleHours: boolean;
    modestDressCode?: boolean;
  };
  contactEmail: string;
  logo?: string;
} 