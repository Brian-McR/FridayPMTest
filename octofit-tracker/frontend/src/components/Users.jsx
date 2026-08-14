import { useEffect, useState } from 'react';
import { fetchApiData, extractData } from '../config/api';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const response = await fetchApiData('/api/users');
        const userData = extractData(response);
        setUsers(userData);
        setError(null);
      } catch (err) {
        setError(err.message);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="alert alert-info">Loading users...</div>
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
      <h1 className="mb-4">Users</h1>
      {users.length === 0 ? (
        <div className="alert alert-warning">No users found</div>
      ) : (
        <div className="row">
          {users.map((user) => (
            <div key={user._id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{user.name}</h5>
                  <p className="card-text">
                    <small className="text-muted">@{user.username}</small>
                  </p>
                  <p className="card-text">{user.email}</p>
                  <div className="badge bg-primary">
                    {user.totalActivities} activities
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
