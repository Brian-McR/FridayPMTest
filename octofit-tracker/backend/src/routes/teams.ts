import express, { Router, Request, Response } from 'express';
import Team from '../models/Team';

const router = Router();

// GET /api/teams - Get all teams
router.get('/', async (req: Request, res: Response) => {
  try {
    const teams = await Team.find().populate('leader').populate('members');
    res.json({
      message: 'Get all teams',
      data: teams,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch teams' });
  }
});

// GET /api/teams/:id - Get team by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const team = await Team.findById(id).populate('leader').populate('members');
    res.json({
      message: `Get team ${id}`,
      data: team,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch team' });
  }
});

// POST /api/teams - Create a new team
router.post('/', async (req: Request, res: Response) => {
  try {
    const newTeam = new Team(req.body);
    const savedTeam = await newTeam.save();
    res.status(201).json({
      message: 'Team created',
      data: savedTeam,
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create team' });
  }
});

// PUT /api/teams/:id - Update team
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedTeam = await Team.findByIdAndUpdate(id, req.body, { new: true });
    res.json({
      message: `Team ${id} updated`,
      data: updatedTeam,
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to update team' });
  }
});

// DELETE /api/teams/:id - Delete team
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Team.findByIdAndDelete(id);
    res.json({
      message: `Team ${id} deleted`,
      data: null,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete team' });
  }
});

export default router;
