import { useEffect, useState } from 'react';
import { fetchApiData, extractData } from '../config/api';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadActivities = async () => {
      try {
        setLoading(true);
        const response = await fetchApiData('/api/activities');
        const activityData = extractData(response);
        setActivities(activityData);
        setError(null);
      } catch (err) {
        setError(err.message);
        setActivities([]);
      } finally {
        setLoading(false);
      }
    };

    loadActivities();
  }, []);

  const getActivityIcon = (type) => {
    const icons = {
      running: '🏃',
      cycling: '🚴',
      swimming: '🏊',
      hiking: '⛰️',
      weightlifting: '💪',
      yoga: '🧘',
      other: '🏋️',
    };
    return icons[type] || '🏃';
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="alert alert-info">Loading activities...</div>
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
      <h1 className="mb-4">Activities</h1>
      {activities.length === 0 ? (
        <div className="alert alert-warning">No activities found</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Type</th>
                <th>Duration (min)</th>
                <th>Distance (km)</th>
                <th>Calories</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id}>
                  <td>
                    <span className="me-2">{getActivityIcon(activity.type)}</span>
                    {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                  </td>
                  <td>{activity.duration}</td>
                  <td>{activity.distance || '-'}</td>
                  <td>{activity.calories}</td>
                  <td>{new Date(activity.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
