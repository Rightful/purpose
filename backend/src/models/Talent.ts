import mongoose, { Schema, Document } from 'mongoose';

export interface ITalent {
  _id: string;
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
  availability: 'Full Time' | 'Part Time' | 'Contract' | 'Freelance' | 'Open to Opportunities';
  faithPreferences: {
    prayerTimes: boolean;
    halalWork: boolean;
    islamicFinance: boolean;
    communityImpact: boolean;
    flexibleHours: boolean;
    remoteWork: boolean;
  };
  languages: string[];
  portfolio?: string;
  linkedin?: string;
  github?: string;
  profilePicture?: string;
  resume?: string;
  status: 'active' | 'inactive' | 'employed';
  createdAt: Date;
  updatedAt: Date;
}

const TalentSchema: Schema = new Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  location: { type: String, required: true },
  experience: { type: Number, required: true },
  skills: [{ type: String }],
  bio: { type: String, required: true },
  education: [{
    degree: { type: String, required: true },
    institution: { type: String, required: true },
    year: { type: Number, required: true }
  }],
  availability: { type: String, required: true, enum: ['Full Time', 'Part Time', 'Contract', 'Freelance', 'Open to Opportunities'] },
  faithPreferences: {
    prayerTimes: { type: Boolean, default: true },
    halalWork: { type: Boolean, default: true },
    islamicFinance: { type: Boolean, default: false },
    communityImpact: { type: Boolean, default: false },
    flexibleHours: { type: Boolean, default: false },
    remoteWork: { type: Boolean, default: false }
  }
}, {
  timestamps: true
});

export default mongoose.model<ITalent>('Talent', TalentSchema); 