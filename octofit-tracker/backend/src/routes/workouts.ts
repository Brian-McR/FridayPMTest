import express, { Router, Request, Response } from 'express';
import Workout from '../models/Workout';

const router = Router();

// GET /api/workouts - Get all workouts
router.get('/', async (req: Request, res: Response) => {
  try {
    const workouts = await Workout.find().populate('user');
    res.json({
      message: 'Get all workouts',
      data: workouts,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workouts' });
  }
});

// GET /api/workouts/:id - Get workout by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const workout = await Workout.findById(id).populate('user');
    res.json({
      message: `Get workout ${id}`,
      data: workout,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workout' });
  }
});

// POST /api/workouts - Create a new workout
router.post('/', async (req: Request, res: Response) => {
  try {
    const newWorkout = new Workout(req.body);
    const savedWorkout = await newWorkout.save();
    res.status(201).json({
      message: 'Workout created',
      data: savedWorkout,
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create workout' });
  }
});

// PUT /api/workouts/:id - Update workout
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedWorkout = await Workout.findByIdAndUpdate(id, req.body, { new: true });
    res.json({
      message: `Workout ${id} updated`,
      data: updatedWorkout,
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to update workout' });
  }
});

// DELETE /api/workouts/:id - Delete workout
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Workout.findByIdAndDelete(id);
    res.json({
      message: `Workout ${id} deleted`,
      data: null,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete workout' });
  }
});

export default router;
