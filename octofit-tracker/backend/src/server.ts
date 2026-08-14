import express, { Request, Response } from 'express';
import './config/database';
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import workoutsRouter from './routes/workouts';

export const app = express();
export const PORT = 8000;

// Middleware
app.use(express.json());

// Get API URL with Codespaces support
export const getApiUrl = () => {
  const codespaceName = process.env.CODESPACE_NAME;
  if (codespaceName) {
    // Build Codespaces URL: https://{CODESPACE_NAME}-8000.app.github.dev
    return `https://${codespaceName}-8000.app.github.dev`;
  }
  return `http://localhost:${PORT}`;
};

// Routes
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'OctoFit Tracker API',
    apiUrl: getApiUrl(),
    endpoints: {
      users: '/api/users',
      teams: '/api/teams',
      activities: '/api/activities',
      leaderboard: '/api/leaderboard',
      workouts: '/api/workouts',
    },
  });
});

// API Routes
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

export default app;
