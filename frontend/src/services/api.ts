import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

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

export interface MatchingResponse {
  talent: Talent;
  matches: JobMatch[];
  matchCount: number;
}

class ApiService {
  async getJobs(): Promise<Job[]> {
    const response = await fetch(`${API_BASE_URL}/jobs`);
    if (!response.ok) {
      throw new Error('Failed to fetch jobs');
    }
    const data = await response.json();
    return data.jobs || [];
  }

  async searchJobs(query: string): Promise<Job[]> {
    const response = await fetch(`${API_BASE_URL}/jobs/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error('Failed to search jobs');
    }
    const data = await response.json();
    return data.jobs || [];
  }

  async getJobById(id: string): Promise<Job> {
    const response = await fetch(`${API_BASE_URL}/jobs/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch job details');
    }
    return response.json();
  }

  async getTalents(): Promise<Talent[]> {
    const response = await axios.get(`${API_BASE_URL}/talent`);
    return response.data.talents || [];
  }

  async getMatches(talentId: string): Promise<MatchingResponse> {
    const response = await axios.get(`${API_BASE_URL}/matching/${talentId}`);
    return response.data;
  }

  async searchTalents(query: string): Promise<Talent[]> {
    const response = await axios.get(`${API_BASE_URL}/talent/search?q=${encodeURIComponent(query)}`);
    return response.data.talents || [];
  }
}

export default new ApiService(); 