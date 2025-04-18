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
  status: string;
}

export interface MatchDetails {
  score: number;
  matchedSkills: string[];
  missingSkills: string[];
}

export interface JobMatch extends Job {
  matchDetails: MatchDetails;
} 