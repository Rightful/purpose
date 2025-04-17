import mongoose, { Schema, Document } from 'mongoose';

export interface IJob {
  _id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full Time' | 'Part Time' | 'Contract' | 'Freelance' | 'Internship';
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  description: string;
  requirements: string[];
  faithAlignment: {
    halalIncome: boolean;
    prayerFriendly: boolean;
    islamicFinance: boolean;
    communityImpact: boolean;
    flexibleHours: boolean;
    remoteFriendly: boolean;
  };
  postedDate: Date;
  applicationDeadline?: Date;
  contactEmail: string;
  companyWebsite?: string;
  companyLogo?: string;
  tags: string[];
  status: 'active' | 'closed' | 'draft';
}

const JobSchema: Schema = new Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, required: true, enum: ['Full Time', 'Part Time', 'Contract', 'Freelance', 'Internship'] },
  salary: {
    min: { type: Number, required: true },
    max: { type: Number, required: true },
    currency: { type: String, required: true, default: 'EUR' }
  },
  description: { type: String, required: true },
  requirements: [{ type: String }],
  faithAlignment: {
    halalIncome: { type: Boolean, default: false },
    prayerFriendly: { type: Boolean, default: false },
    islamicFinance: { type: Boolean, default: false },
    communityImpact: { type: Boolean, default: false },
    flexibleHours: { type: Boolean, default: false },
    remoteFriendly: { type: Boolean, default: false }
  }
}, {
  timestamps: true
});

export default mongoose.model<IJob>('Job', JobSchema); 