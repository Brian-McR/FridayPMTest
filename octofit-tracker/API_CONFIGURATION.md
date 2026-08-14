# OctoFit Tracker - Node.js API Configuration

## Backend Configuration

### Port & Server
- **Port**: 8000
- **Framework**: Express.js with TypeScript
- **Development**: `npm run dev` (uses ts-node)
- **Production Build**: `npm run build`
- **Production Start**: `npm start`

### API URL Configuration

The backend automatically detects the deployment environment and builds the appropriate API URL:

#### Codespaces Environment
When deployed in GitHub Codespaces, the API URL is constructed using `CODESPACE_NAME`:
```
https://{CODESPACE_NAME}-8000.app.github.dev
```

Example: `https://humble-dollop-q7vj7pjv47g5c6x4v-8000.app.github.dev`

#### Local Development
When running locally (without `CODESPACE_NAME`), the API URL defaults to:
```
http://localhost:8000
```

### Implementation
The `getApiUrl()` function in `src/index.ts` handles the automatic detection:

```typescript
const getApiUrl = () => {
  const codespaceName = process.env.CODESPACE_NAME;
  if (codespaceName) {
    return `https://${codespaceName}-${PORT}.app.github.dev`;
  }
  return `http://localhost:${PORT}`;
};
```

## Available Endpoints

### Core Endpoints
- `GET /` - API info with all endpoints and current API URL
- `GET /api/users` - Get all users (returns 5 seeded users)
- `GET /api/activities` - Get all activities (returns 8 seeded activities)
- `GET /api/leaderboard` - Get leaderboard rankings (returns 5 entries)
- `GET /api/teams` - Get all teams (returns 3 seeded teams)
- `GET /api/workouts` - Get all workouts (returns 5 seeded workouts)

### Full CRUD Available
All endpoints support:
- `GET /:id` - Retrieve specific record
- `POST /` - Create new record
- `PUT /:id` - Update record
- `DELETE /:id` - Delete record

## Database Setup

### MongoDB Connection
- **Host**: localhost
- **Port**: 27017
- **Database**: octofit_db
- **Connection String**: `mongodb://localhost:27017/octofit_db`

### Seed Database
To populate the database with test data:
```bash
npm run seed
```

This creates:
- 5 sample users
- 3 teams
- 8 activities
- 5 leaderboard entries
- 5 workouts

## Testing the API

### Start Backend
```bash
cd octofit-tracker/backend
npm install
npm run seed
npm run dev
```

### Test with curl

**Get API info (with Codespaces detection):**
```bash
curl http://localhost:8000/
```

**Get all users:**
```bash
curl http://localhost:8000/api/users
```

**Get all activities:**
```bash
curl http://localhost:8000/api/activities
```

**Get leaderboard:**
```bash
curl http://localhost:8000/api/leaderboard
```

## Verification Status

✅ Backend running on port 8000
✅ Codespaces environment detected
✅ API URL correctly formatted for Codespaces
✅ Localhost fallback working
✅ MongoDB seeded with test data
✅ All endpoints returning real database records
✅ Users endpoint: 5 users retrieved
✅ Activities endpoint: 8 activities retrieved
✅ Leaderboard endpoint: 5 rankings retrieved
✅ CORS ready for frontend integration

## Frontend Integration

The frontend (running on port 5173) can connect to:
- **Codespaces**: `https://{CODESPACE_NAME}-8000.app.github.dev`
- **Local**: `http://localhost:8000`

Environment variables or automatic detection should use the same `CODESPACE_NAME` logic to build the API base URL.
