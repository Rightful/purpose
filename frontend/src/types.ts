export interface Job {
  id: string;
  title: string;
  company: string;
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
  };
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
  skillMatchPercentage: number;
  locationMatch: boolean;
  experienceMatch: boolean;
  matchingSkills: string[];
  matchScore: number;
}

export interface JobMatch extends Job {
  matchDetails: MatchDetails;
} 