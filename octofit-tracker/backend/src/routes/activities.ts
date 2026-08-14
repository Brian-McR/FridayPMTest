import express, { Router, Request, Response } from 'express';
import Activity from '../models/Activity';

const router = Router();

// GET /api/activities - Get all activities
router.get('/', async (req: Request, res: Response) => {
  try {
    const activities = await Activity.find().populate('user');
    res.json({
      message: 'Get all activities',
      data: activities,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
});

// GET /api/activities/:id - Get activity by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findById(id).populate('user');
    res.json({
      message: `Get activity ${id}`,
      data: activity,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activity' });
  }
});

// POST /api/activities - Create a new activity
router.post('/', async (req: Request, res: Response) => {
  try {
    const newActivity = new Activity(req.body);
    const savedActivity = await newActivity.save();
    res.status(201).json({
      message: 'Activity created',
      data: savedActivity,
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create activity' });
  }
});

// PUT /api/activities/:id - Update activity
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedActivity = await Activity.findByIdAndUpdate(id, req.body, { new: true });
    res.json({
      message: `Activity ${id} updated`,
      data: updatedActivity,
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to update activity' });
  }
});

// DELETE /api/activities/:id - Delete activity
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Activity.findByIdAndDelete(id);
    res.json({
      message: `Activity ${id} deleted`,
      data: null,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete activity' });
  }
});

export default router;
