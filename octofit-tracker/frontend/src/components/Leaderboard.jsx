import { useEffect, useState } from 'react';
import { fetchApiData, extractData } from '../config/api';

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        setLoading(true);
        const response = await fetchApiData('/api/leaderboard');
        const leaderboardData = extractData(response);
        setLeaderboard(leaderboardData);
        setError(null);
      } catch (err) {
        setError(err.message);
        setLeaderboard([]);
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboard();
  }, []);

  const getLevelColor = (level) => {
    const colors = {
      bronze: '#CD7F32',
      silver: '#C0C0C0',
      gold: '#FFD700',
      platinum: '#E5E4E2',
      diamond: '#B9F2FF',
    };
    return colors[level] || '#gray';
  };

  const getLevelBadge = (level) => {
    const badges = {
      bronze: 'secondary',
      silver: 'secondary',
      gold: 'warning',
      platinum: 'light',
      diamond: 'info',
    };
    return badges[level] || 'secondary';
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="alert alert-info">Loading leaderboard...</div>
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
      <h1 className="mb-4">Leaderboard</h1>
      {leaderboard.length === 0 ? (
        <div className="alert alert-warning">No leaderboard data found</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th width="10%">Rank</th>
                <th width="30%">User</th>
                <th width="20%">Level</th>
                <th width="20%">Score</th>
                <th width="20%">Activities</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry) => (
                <tr key={entry._id}>
                  <td>
                    <span className="badge bg-primary"># {entry.rank}</span>
                  </td>
                  <td>
                    {entry.user ? entry.user.name : 'Unknown User'}
                  </td>
                  <td>
                    <span className={`badge bg-${getLevelBadge(entry.level)}`}>
                      {entry.level.charAt(0).toUpperCase() +
                        entry.level.slice(1)}
                    </span>
                  </td>
                  <td>
                    <strong>{entry.totalScore}</strong>
                  </td>
                  <td>{entry.activitiesCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
