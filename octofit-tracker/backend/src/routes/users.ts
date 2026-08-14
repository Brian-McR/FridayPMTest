import express, { Router, Request, Response } from 'express';
import User from '../models/User';

const router = Router();

// GET /api/users - Get all users
router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json({
      message: 'Get all users',
      data: users,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// GET /api/users/:id - Get user by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.json({
      message: `Get user ${id}`,
      data: user,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// POST /api/users - Create a new user
router.post('/', async (req: Request, res: Response) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json({
      message: 'User created',
      data: savedUser,
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create user' });
  }
});

// PUT /api/users/:id - Update user
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.json({
      message: `User ${id} updated`,
      data: updatedUser,
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to update user' });
  }
});

// DELETE /api/users/:id - Delete user
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({
      message: `User ${id} deleted`,
      data: null,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

export default router;
