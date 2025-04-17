import { Request, Response } from 'express';
import { findMatchingJobs, findMatchingTalents, calculateJobTalentMatch } from '../services/matchingAlgorithm';

// In-memory data (imported from index.ts)
declare const Job: any;
declare const Talent: any;

/**
 * Get matching jobs for a talent
 */
export const getMatchingJobs = async (req: Request, res: Response) => {
  try {
    const { talentId } = req.params;
    const { limit = 10 } = req.query;

    // Get the talent
    const talent = await Talent.findById(talentId);
    if (!talent) {
      return res.status(404).json({ message: 'Talent not found' });
    }

    // Get all active jobs
    const jobs = await Job.find();

    // Find matching jobs
    const matchingJobs = findMatchingJobs(talent, jobs, Number(limit));

    res.json({
      success: true,
      data: matchingJobs
    });
  } catch (error) {
    console.error('Error finding matching jobs:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error finding matching jobs',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Get matching talents for a job
 */
export const getMatchingTalents = async (req: Request, res: Response) => {
  try {
    const { jobId } = req.params;
    const { limit = 10 } = req.query;

    // Get the job
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Get all active talents
    const talents = await Talent.find();

    // Find matching talents
    const matchingTalents = findMatchingTalents(job, talents, Number(limit));

    res.json({
      success: true,
      data: matchingTalents
    });
  } catch (error) {
    console.error('Error finding matching talents:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error finding matching talents',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Get match score between a job and talent
 */
export const getMatchScore = async (req: Request, res: Response) => {
  try {
    const { jobId, talentId } = req.params;

    // Get the job and talent
    const [job, talent] = await Promise.all([
      Job.findById(jobId),
      Talent.findById(talentId)
    ]);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    if (!talent) {
      return res.status(404).json({ message: 'Talent not found' });
    }

    // Calculate match score
    const matchScore = calculateJobTalentMatch(job, talent);

    res.json({
      success: true,
      data: matchScore
    });
  } catch (error) {
    console.error('Error calculating match score:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error calculating match score',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}; 