import { useEffect, useState } from 'react';
import { fetchApiData, extractData } from '../config/api';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        setLoading(true);
        const response = await fetchApiData('/api/workouts');
        const workoutData = extractData(response);
        setWorkouts(workoutData);
        setError(null);
      } catch (err) {
        setError(err.message);
        setWorkouts([]);
      } finally {
        setLoading(false);
      }
    };

    loadWorkouts();
  }, []);

  const getDifficultyColor = (difficulty) => {
    const colors = {
      beginner: 'success',
      intermediate: 'warning',
      advanced: 'danger',
    };
    return colors[difficulty] || 'secondary';
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="alert alert-info">Loading workouts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Workouts</h1>
      {workouts.length === 0 ? (
        <div className="alert alert-warning">No workouts found</div>
      ) : (
        <div className="row">
          {workouts.map((workout) => (
            <div key={workout._id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title">{workout.name}</h5>
                    <span
                      className={`badge bg-${getDifficultyColor(
                        workout.difficulty
                      )}`}
                    >
                      {workout.difficulty.charAt(0).toUpperCase() +
                        workout.difficulty.slice(1)}
                    </span>
                  </div>

                  <p className="card-text text-muted">{workout.type}</p>
                  <p className="card-text">{workout.description}</p>

                  <div className="mb-3">
                    <small className="d-block">
                      <strong>Duration:</strong> {workout.duration} min
                    </small>
                    <small className="d-block">
                      <strong>Exercises:</strong> {workout.exercises?.length || 0}
                    </small>
                  </div>

                  <div>
                    {workout.completed ? (
                      <span className="badge bg-success">Completed</span>
                    ) : (
                      <span className="badge bg-secondary">Not Started</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
