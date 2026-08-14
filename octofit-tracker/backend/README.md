# OctoFit Tracker Backend

A Node.js + Express backend for the OctoFit Tracker application with MongoDB integration using Mongoose.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

3. Ensure MongoDB is running on `mongodb://localhost:27017`

## Development

Start the development server:
```bash
npm run dev
```

The server will run on port `8000`.

## Build

Build the TypeScript to JavaScript:
```bash
npm run build
```

## Production

Start the production server:
```bash
npm start
```

## Database

- **Port**: 27017
- **Database**: octofit-tracker
- **Connection**: MongoDB (via Mongoose)

### Seed Database

To seed the database with test data:
```bash
npm run seed
```

## Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **typescript**: Type safety
- **ts-node**: Run TypeScript directly during development
