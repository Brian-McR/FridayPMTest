import mongoose from 'mongoose';
import User from '../models/User';
import Team from '../models/Team';
import Activity from '../models/Activity';
import Leaderboard from '../models/Leaderboard';
import Workout from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seeding the octofit_db database with test data...\n');

    // Clear existing data
    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await Leaderboard.deleteMany({});
    await Workout.deleteMany({});
    console.log('✓ Cleared existing collections');

    // Seed Users
    const users = await User.insertMany([
      {
        username: 'alex_runner',
        email: 'alex@example.com',
        name: 'Alex Johnson',
        totalActivities: 45,
        joinedDate: new Date('2023-01-15'),
      },
      {
        username: 'jessica_cyclist',
        email: 'jessica@example.com',
        name: 'Jessica Smith',
        totalActivities: 38,
        joinedDate: new Date('2023-02-20'),
      },
      {
        username: 'mike_swimmer',
        email: 'mike@example.com',
        name: 'Mike Davis',
        totalActivities: 52,
        joinedDate: new Date('2022-12-10'),
      },
      {
        username: 'sarah_yogi',
        email: 'sarah@example.com',
        name: 'Sarah Wilson',
        totalActivities: 30,
        joinedDate: new Date('2023-03-05'),
      },
      {
        username: 'tom_lifter',
        email: 'tom@example.com',
        name: 'Tom Brown',
        totalActivities: 42,
        joinedDate: new Date('2023-01-30'),
      },
    ]);
    console.log('✓ Seeded 5 users');

    // Seed Teams
    const teams = await Team.insertMany([
      {
        name: 'Marathoners United',
        description: 'A team focused on long-distance running and endurance',
        leader: users[0]._id,
        members: [users[0]._id, users[1]._id],
        totalScore: 1250,
        createdDate: new Date('2023-01-20'),
      },
      {
        name: 'Water Warriors',
        description: 'Swimmers and aquatic enthusiasts',
        leader: users[2]._id,
        members: [users[2]._id, users[3]._id],
        totalScore: 1580,
        createdDate: new Date('2023-02-15'),
      },
      {
        name: 'Iron Pumpers',
        description: 'Strength training and bodybuilding team',
        leader: users[4]._id,
        members: [users[4]._id, users[0]._id],
        totalScore: 1420,
        createdDate: new Date('2023-01-25'),
      },
    ]);
    console.log('✓ Seeded 3 teams');

    // Seed Activities
    const activities = await Activity.insertMany([
      {
        user: users[0]._id,
        type: 'running',
        duration: 45,
        distance: 7.5,
        calories: 650,
        date: new Date('2024-08-10'),
        notes: 'Morning jog in the park',
      },
      {
        user: users[0]._id,
        type: 'running',
        duration: 60,
        distance: 10,
        calories: 850,
        date: new Date('2024-08-08'),
        notes: 'Long run on trail',
      },
      {
        user: users[1]._id,
        type: 'cycling',
        duration: 90,
        distance: 35,
        calories: 1200,
        date: new Date('2024-08-09'),
        notes: 'Mountain bike adventure',
      },
      {
        user: users[2]._id,
        type: 'swimming',
        duration: 45,
        distance: 2.5,
        calories: 500,
        date: new Date('2024-08-10'),
        notes: 'Freestyle laps',
      },
      {
        user: users[2]._id,
        type: 'swimming',
        duration: 60,
        distance: 3,
        calories: 650,
        date: new Date('2024-08-07'),
        notes: 'Mixed strokes',
      },
      {
        user: users[3]._id,
        type: 'yoga',
        duration: 75,
        calories: 350,
        date: new Date('2024-08-10'),
        notes: 'Morning vinyasa flow',
      },
      {
        user: users[4]._id,
        type: 'weightlifting',
        duration: 90,
        calories: 720,
        date: new Date('2024-08-10'),
        notes: 'Upper body strength day',
      },
      {
        user: users[4]._id,
        type: 'weightlifting',
        duration: 75,
        calories: 650,
        date: new Date('2024-08-08'),
        notes: 'Lower body workout',
      },
    ]);
    console.log('✓ Seeded 8 activities');

    // Seed Leaderboard
    const leaderboard = await Leaderboard.insertMany([
      {
        user: users[2]._id,
        team: teams[1]._id,
        rank: 1,
        totalScore: 1580,
        activitiesCount: 52,
        level: 'diamond',
      },
      {
        user: users[4]._id,
        team: teams[2]._id,
        rank: 2,
        totalScore: 1420,
        activitiesCount: 42,
        level: 'platinum',
      },
      {
        user: users[0]._id,
        team: teams[0]._id,
        rank: 3,
        totalScore: 1250,
        activitiesCount: 45,
        level: 'platinum',
      },
      {
        user: users[1]._id,
        team: teams[0]._id,
        rank: 4,
        totalScore: 980,
        activitiesCount: 38,
        level: 'gold',
      },
      {
        user: users[3]._id,
        team: teams[1]._id,
        rank: 5,
        totalScore: 720,
        activitiesCount: 30,
        level: 'silver',
      },
    ]);
    console.log('✓ Seeded 5 leaderboard entries');

    // Seed Workouts
    const workouts = await Workout.insertMany([
      {
        user: users[0]._id,
        name: 'Trail Running 101',
        type: 'cardio',
        duration: 45,
        difficulty: 'intermediate',
        description: 'A scenic trail run through the forest',
        exercises: [
          { name: 'Warm-up jog', duration: 5 },
          { name: 'Trail running', duration: 35 },
          { name: 'Cool-down walk', duration: 5 },
        ],
        createdDate: new Date('2024-08-05'),
        completed: true,
      },
      {
        user: users[2]._id,
        name: 'Swimming Bootcamp',
        type: 'cardio',
        duration: 60,
        difficulty: 'advanced',
        description: 'High-intensity interval swimming training',
        exercises: [
          { name: 'Freestyle sprints', reps: 10 },
          { name: 'Backstroke intervals', reps: 10 },
          { name: 'Mixed strokes', duration: 10 },
        ],
        createdDate: new Date('2024-08-03'),
        completed: true,
      },
      {
        user: users[4]._id,
        name: 'Full Body Strength',
        type: 'strength',
        duration: 90,
        difficulty: 'advanced',
        description: 'Complete full-body strength training session',
        exercises: [
          { name: 'Bench Press', sets: 4, reps: 8 },
          { name: 'Squats', sets: 4, reps: 10 },
          { name: 'Deadlifts', sets: 3, reps: 5 },
          { name: 'Pull-ups', sets: 3, reps: 8 },
        ],
        createdDate: new Date('2024-08-04'),
        completed: true,
      },
      {
        user: users[3]._id,
        name: 'Morning Yoga Flow',
        type: 'flexibility',
        duration: 45,
        difficulty: 'beginner',
        description: 'Gentle morning yoga routine',
        exercises: [
          { name: 'Sun salutations', duration: 10 },
          { name: 'Standing poses', duration: 20 },
          { name: 'Savasana', duration: 15 },
        ],
        createdDate: new Date('2024-08-06'),
        completed: false,
      },
      {
        user: users[1]._id,
        name: 'Cardio Blast',
        type: 'mixed',
        duration: 60,
        difficulty: 'intermediate',
        description: 'Mix of cycling and running exercises',
        exercises: [
          { name: 'Cycling intervals', duration: 30 },
          { name: 'Running intervals', duration: 20 },
          { name: 'Cool-down', duration: 10 },
        ],
        createdDate: new Date('2024-08-01'),
        completed: true,
      },
    ]);
    console.log('✓ Seeded 5 workouts');

    console.log('\n✅ Database seeding complete!');
    console.log(`
Summary:
- Users: ${users.length}
- Teams: ${teams.length}
- Activities: ${activities.length}
- Leaderboard entries: ${leaderboard.length}
- Workouts: ${workouts.length}
    `);

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
