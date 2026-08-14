import { useEffect, useState } from 'react';
import { fetchApiData, extractData } from '../config/api';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTeams = async () => {
      try {
        setLoading(true);
        const response = await fetchApiData('/api/teams');
        const teamData = extractData(response);
        setTeams(teamData);
        setError(null);
      } catch (err) {
        setError(err.message);
        setTeams([]);
      } finally {
        setLoading(false);
      }
    };

    loadTeams();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="alert alert-info">Loading teams...</div>
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
      <h1 className="mb-4">Teams</h1>
      {teams.length === 0 ? (
        <div className="alert alert-warning">No teams found</div>
      ) : (
        <div className="row">
          {teams.map((team) => (
            <div key={team._id} className="col-md-6 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{team.name}</h5>
                  <p className="card-text">{team.description}</p>
                  <div className="mb-3">
                    <span className="badge bg-success me-2">
                      Score: {team.totalScore}
                    </span>
                    <span className="badge bg-info">
                      Members: {team.members?.length || 0}
                    </span>
                  </div>
                  <small className="text-muted">
                    Created: {new Date(team.createdDate).toLocaleDateString()}
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
