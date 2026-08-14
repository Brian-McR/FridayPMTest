# Frontend Configuration Guide

## Environment Variables

The OctoFit Tracker frontend uses Vite environment variables to configure the API connection.

### Required Setup

1. **Create `.env.local`** in the frontend directory:
   ```bash
   cp .env.local.example .env.local
   ```

2. **Set `VITE_CODESPACE_NAME`** if running in GitHub Codespaces:
   ```
   VITE_CODESPACE_NAME=your-codespace-name
   ```
   - Find your Codespace name in the GitHub Codespaces dashboard
   - Example: `humble-dollop-q7vj7pjv47g5c6x4v`

3. **For local development**, leave `VITE_CODESPACE_NAME` empty:
   ```
   VITE_CODESPACE_NAME=
   ```
   - The app will automatically use `http://localhost:8000`

### API URL Configuration

The frontend uses `import.meta.env.VITE_CODESPACE_NAME` to build the API base URL:

**In Codespaces:**
```
https://{VITE_CODESPACE_NAME}-8000.app.github.dev
```

**In Local Development:**
```
http://localhost:8000
```

### Vite Environment Variables in Code

Use `import.meta.env` to access environment variables in your components:

```javascript
import { getApiBaseUrl } from '../config/api';

// Automatically detects environment and returns correct URL
const apiUrl = getApiBaseUrl();
// Returns: https://my-codespace-8000.app.github.dev (Codespaces)
// Returns: http://localhost:8000 (Local)
```

### API Configuration Module

The `src/config/api.js` module provides utilities for API calls:

```javascript
import { 
  getApiBaseUrl,      // Get the base API URL
  buildApiUrl,        // Build full endpoint URL
  fetchApiData,       // Fetch with error handling
  extractData         // Extract data from responses
} from '../config/api';

// Examples
const baseUrl = getApiBaseUrl();
const userUrl = buildApiUrl('/api/users');
const users = await fetchApiData('/api/users');
const userData = extractData(users);
```

### Handling Undefined Codespace Name

The `getApiBaseUrl()` function includes a safe fallback:

```javascript
export const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  
  // If CODESPACE_NAME is set and not empty
  if (codespaceName && codespaceName.trim() !== '') {
    return `https://${codespaceName}-8000.app.github.dev`;
  }
  
  // Fallback to localhost
  return 'http://localhost:8000';
};
```

This prevents `https://undefined-8000.app.github.dev` URLs if the environment variable is not set.

### Response Handling

The API returns paginated responses with a `data` property. The `extractData()` function handles this:

```javascript
// API Response (paginated)
{
  "message": "Get all users",
  "data": [...]
}

// Usage
const response = await fetchApiData('/api/users');
const users = extractData(response);  // Returns the array
```

## Running the Frontend

### Local Development

```bash
cd octofit-tracker/frontend

# Install dependencies
npm install

# Start development server (http://localhost:5173)
npm run dev
```

**Important:** Ensure the backend is running on `http://localhost:8000`:
```bash
cd octofit-tracker/backend
npm run seed    # Seed database
npm run dev     # Start server
```

### Production Build

```bash
npm run build
```

Output is in the `dist/` directory.

### Codespaces Deployment

1. Create a Codespace from your GitHub repository
2. Add `VITE_CODESPACE_NAME` to the frontend's `.env.local`
3. Run `npm install && npm run build`
4. The app will connect to the backend using the Codespaces URL

## Routes

The app uses react-router-dom for navigation:

- `/` - Home page with overview
- `/users` - All registered users
- `/teams` - Team management and details
- `/activities` - Activity log and tracking
- `/leaderboard` - User rankings and competition standings
- `/workouts` - Personalized workout suggestions

## Components

- **App.jsx** - Main layout with navigation bar and routing
- **pages/Home.jsx** - Homepage with feature overview
- **components/Users.jsx** - User listing and profiles
- **components/Teams.jsx** - Team information
- **components/Activities.jsx** - Activity table
- **components/Leaderboard.jsx** - Rankings table
- **components/Workouts.jsx** - Workout cards

## Bootstrap Integration

The app uses Bootstrap 5.3.3 for styling:

```javascript
import 'bootstrap/dist/css/bootstrap.min.css';
```

All components use Bootstrap classes for responsive design:
- Grid: `container`, `row`, `col-md-6`, etc.
- Alerts: `alert`, `alert-info`, `alert-danger`
- Tables: `table`, `table-striped`, `table-hover`
- Cards: `card`, `card-body`, `card-title`
- Badges: `badge`, `bg-primary`, `bg-success`

## Troubleshooting

### `https://undefined-8000.app.github.dev` Error

This means `VITE_CODESPACE_NAME` is not set. Check your `.env.local` file and ensure it contains your Codespace name.

### API Connection Errors

1. Verify the backend is running: `curl http://localhost:8000/`
2. Check the API URL in the browser console (shown in alert banner)
3. Verify CORS is not blocking requests (check browser console for CORS errors)

### Components Show "No Data"

1. Verify the database is seeded: `npm run seed` in the backend
2. Check that the backend is returning data: `curl http://localhost:8000/api/users`
3. Verify the correct API URL is being used
