import express, { Router, Request, Response } from 'express';
import Leaderboard from '../models/Leaderboard';

const router = Router();

// GET /api/leaderboard - Get leaderboard rankings
router.get('/', async (req: Request, res: Response) => {
  try {
    const rankings = await Leaderboard.find()
      .sort({ rank: 1 })
      .populate('user')
      .populate('team');
    res.json({
      message: 'Get leaderboard rankings',
      data: rankings,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// GET /api/leaderboard/team/:teamId - Get team leaderboard
router.get('/team/:teamId', async (req: Request, res: Response) => {
  try {
    const { teamId } = req.params;
    const teamRankings = await Leaderboard.find({ team: teamId })
      .sort({ rank: 1 })
      .populate('user');
    res.json({
      message: `Get leaderboard for team ${teamId}`,
      data: teamRankings,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch team leaderboard' });
  }
});

// GET /api/leaderboard/user/:userId - Get user position
router.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userPosition = await Leaderboard.findOne({ user: userId })
      .populate('user')
      .populate('team');
    res.json({
      message: `Get position for user ${userId}`,
      data: userPosition,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user position' });
  }
});

export default router;
