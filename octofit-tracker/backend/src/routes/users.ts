import express, { Router, Request, Response } from 'express';

const router = Router();

// GET /api/users - Get all users
router.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Get all users',
    data: [],
  });
});

// GET /api/users/:id - Get user by ID
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    message: `Get user ${id}`,
    data: null,
  });
});

// POST /api/users - Create a new user
router.post('/', (req: Request, res: Response) => {
  res.status(201).json({
    message: 'User created',
    data: null,
  });
});

// PUT /api/users/:id - Update user
router.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    message: `User ${id} updated`,
    data: null,
  });
});

// DELETE /api/users/:id - Delete user
router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    message: `User ${id} deleted`,
    data: null,
  });
});

export default router;
