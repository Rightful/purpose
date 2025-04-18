export interface Job {
  id: string;
  title: string;
  company: string;
  companyId: string;
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
  availability: boolean;
  salaryExpectation: {
    min: number;
    max: number;
    currency: string;
  };
}

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'talent' | 'company';
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