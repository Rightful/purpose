import { IJob } from '../models/Job';
import { ITalent } from '../models/Talent';

interface MatchScore {
  score: number;
  matchDetails: {
    skillMatch: number;
    locationMatch: number;
    faithAlignmentMatch: number;
    experienceMatch: number;
    availabilityMatch: number;
  };
}

/**
 * Calculates a match score between a job and a talent based on multiple factors
 * with special emphasis on faith alignment and Islamic values
 */
export const calculateJobTalentMatch = (job: IJob, talent: ITalent): MatchScore => {
  // Initialize match details
  const matchDetails = {
    skillMatch: 0,
    locationMatch: 0,
    faithAlignmentMatch: 0,
    experienceMatch: 0,
    availabilityMatch: 0
  };

  // 1. Skill Matching (25% weight)
  const jobSkills = extractSkillsFromJob(job);
  const talentSkills = talent.skills;
  const commonSkills = jobSkills.filter(skill => 
    talentSkills.some(talentSkill => 
      talentSkill.toLowerCase().includes(skill.toLowerCase()) || 
      skill.toLowerCase().includes(talentSkill.toLowerCase())
    )
  );
  matchDetails.skillMatch = commonSkills.length / Math.max(jobSkills.length, 1);

  // 2. Location Matching (15% weight)
  // Simple exact match for now, could be enhanced with geocoding
  matchDetails.locationMatch = job.location.toLowerCase() === talent.location.toLowerCase() ? 1 : 0.5;

  // 3. Faith Alignment Matching (35% weight) - MOST IMPORTANT
  matchDetails.faithAlignmentMatch = calculateFaithAlignmentScore(job, talent);

  // 4. Experience Matching (10% weight)
  const requiredExperience = extractRequiredExperience(job);
  matchDetails.experienceMatch = talent.experience >= requiredExperience ? 1 : talent.experience / requiredExperience;

  // 5. Availability Matching (15% weight)
  matchDetails.availabilityMatch = job.type === talent.availability ? 1 : 0.5;

  // Calculate weighted score
  const score = 
    matchDetails.skillMatch * 0.25 +
    matchDetails.locationMatch * 0.15 +
    matchDetails.faithAlignmentMatch * 0.35 +
    matchDetails.experienceMatch * 0.10 +
    matchDetails.availabilityMatch * 0.15;

  return { score, matchDetails };
};

/**
 * Calculates a faith alignment score between a job and talent
 * This is the core differentiator of our platform
 */
const calculateFaithAlignmentScore = (job: IJob, talent: ITalent): number => {
  let score = 0;
  let totalFactors = 0;

  // 1. Halal Income Alignment
  if (job.faithAlignment.halalIncome && talent.faithPreferences.halalWork) {
    score += 1;
    totalFactors += 1;
  }

  // 2. Prayer-Friendly Workplace
  if (job.faithAlignment.prayerFriendly && talent.faithPreferences.prayerTimes) {
    score += 1;
    totalFactors += 1;
  }

  // 3. Islamic Finance Focus
  if (job.faithAlignment.islamicFinance && talent.faithPreferences.islamicFinance) {
    score += 1;
    totalFactors += 1;
  }

  // 4. Community Impact
  if (job.faithAlignment.communityImpact && talent.faithPreferences.communityImpact) {
    score += 1;
    totalFactors += 1;
  }

  // 5. Flexible Hours
  if (job.faithAlignment.flexibleHours && talent.faithPreferences.flexibleHours) {
    score += 0.5;
    totalFactors += 0.5;
  }

  // 6. Remote Work
  if (job.faithAlignment.remoteFriendly && talent.faithPreferences.remoteWork) {
    score += 0.5;
    totalFactors += 0.5;
  }

  // 7. Additional faith-based factors
  // Check if job title or description contains Islamic finance keywords
  const islamicFinanceKeywords = ['islamic finance', 'shariah', 'halal', 'sukuk', 'takaful', 'waqf'];
  const jobHasIslamicKeywords = islamicFinanceKeywords.some(keyword => 
    job.title.toLowerCase().includes(keyword) || 
    job.description.toLowerCase().includes(keyword)
  );
  
  if (jobHasIslamicKeywords && talent.faithPreferences.islamicFinance) {
    score += 0.5;
    totalFactors += 0.5;
  }

  // Return normalized score
  return totalFactors > 0 ? score / totalFactors : 0;
};

/**
 * Helper function to extract skills from job description
 */
const extractSkillsFromJob = (job: IJob): string[] => {
  // Combine requirements and extract skills from description
  const allText = [...job.requirements, job.description].join(' ');
  
  // Common skill keywords in tech and finance
  const skillKeywords = [
    'javascript', 'typescript', 'python', 'java', 'c#', 'react', 'vue', 'angular',
    'node.js', 'express', 'mongodb', 'sql', 'aws', 'azure', 'devops', 'agile',
    'islamic finance', 'shariah', 'compliance', 'risk management', 'financial analysis',
    'accounting', 'audit', 'banking', 'investment', 'portfolio management',
    'community development', 'social impact', 'nonprofit', 'ngo', 'education',
    'healthcare', 'medicine', 'engineering', 'design', 'marketing', 'sales'
  ];
  
  return skillKeywords.filter(skill => 
    allText.toLowerCase().includes(skill.toLowerCase())
  );
};

/**
 * Helper function to extract required experience from job description
 */
const extractRequiredExperience = (job: IJob): number => {
  const description = job.description.toLowerCase();
  
  // Look for experience requirements in the description
  const experiencePatterns = [
    /(\d+)[\+]?\s*(?:year|yr)s?\s*(?:of)?\s*experience/i,
    /experience\s*(?:of)?\s*(\d+)[\+]?\s*(?:year|yr)s?/i,
    /minimum\s*(\d+)[\+]?\s*(?:year|yr)s?\s*(?:of)?\s*experience/i
  ];
  
  for (const pattern of experiencePatterns) {
    const match = description.match(pattern);
    if (match && match[1]) {
      return parseInt(match[1], 10);
    }
  }
  
  // Default to 0 if no experience requirement found
  return 0;
};

/**
 * Find the best matching jobs for a talent
 */
export const findMatchingJobs = (talent: ITalent, jobs: IJob[], limit: number = 10): IJob[] => {
  // Calculate match scores for all jobs
  const scoredJobs = jobs.map(job => ({
    job,
    match: calculateJobTalentMatch(job, talent)
  }));
  
  // Sort by match score (descending)
  scoredJobs.sort((a, b) => b.match.score - a.match.score);
  
  // Return top matches
  return scoredJobs.slice(0, limit).map(item => item.job);
};

/**
 * Find the best matching talents for a job
 */
export const findMatchingTalents = (job: IJob, talents: ITalent[], limit: number = 10): ITalent[] => {
  // Calculate match scores for all talents
  const scoredTalents = talents.map(talent => ({
    talent,
    match: calculateJobTalentMatch(job, talent)
  }));
  
  // Sort by match score (descending)
  scoredTalents.sort((a, b) => b.match.score - a.match.score);
  
  // Return top matches
  return scoredTalents.slice(0, limit).map(item => item.talent);
}; 