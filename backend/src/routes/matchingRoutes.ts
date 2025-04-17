import express from 'express';
import { getMatchingJobs, getMatchingTalents, getMatchScore } from '../controllers/matchingController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// Get matching jobs for a talent
router.get('/jobs/:talentId', authenticateToken, getMatchingJobs);

// Get matching talents for a job
router.get('/talents/:jobId', authenticateToken, getMatchingTalents);

// Get match score between a job and talent
router.get('/score/:jobId/:talentId', authenticateToken, getMatchScore);

export default router; 