import express, { Router, Request, Response } from 'express';

const router = Router();

// GET /api/workouts - Get all workouts
router.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Get all workouts',
    data: [],
  });
});

// GET /api/workouts/:id - Get workout by ID
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    message: `Get workout ${id}`,
    data: null,
  });
});

// POST /api/workouts - Create a new workout
router.post('/', (req: Request, res: Response) => {
  res.status(201).json({
    message: 'Workout created',
    data: null,
  });
});

// PUT /api/workouts/:id - Update workout
router.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    message: `Workout ${id} updated`,
    data: null,
  });
});

// DELETE /api/workouts/:id - Delete workout
router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    message: `Workout ${id} deleted`,
    data: null,
  });
});

export default router;
