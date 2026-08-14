import { Link } from 'react-router-dom';
import { getApiBaseUrl } from '../config/api';

export default function Home() {
  const apiUrl = getApiBaseUrl();

  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        <div className="col-lg-6">
          <h1 className="display-4 fw-bold mb-4">OctoFit Tracker</h1>
          <p className="lead mb-4">
            Track your fitness activities, compete on leaderboards, and achieve your goals with your team.
          </p>

          <div className="alert alert-info mb-4">
            <strong>API Status:</strong> Connected to {apiUrl}
          </div>

          <div className="d-grid gap-2 d-md-flex">
            <Link to="/users" className="btn btn-primary btn-lg">
              👥 View Users
            </Link>
            <Link to="/activities" className="btn btn-success btn-lg">
              🏃 View Activities
            </Link>
            <Link to="/leaderboard" className="btn btn-warning btn-lg">
              🏆 Leaderboard
            </Link>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="row g-3">
            <div className="col-md-6">
              <div className="card text-center h-100">
                <div className="card-body">
                  <div className="fs-1 mb-2">👥</div>
                  <h5 className="card-title">Users</h5>
                  <p className="card-text">
                    View all registered users and their activity profiles.
                  </p>
                  <Link to="/users" className="btn btn-sm btn-outline-primary">
                    Explore
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card text-center h-100">
                <div className="card-body">
                  <div className="fs-1 mb-2">🏃</div>
                  <h5 className="card-title">Activities</h5>
                  <p className="card-text">
                    Track running, cycling, swimming, and more.
                  </p>
                  <Link to="/activities" className="btn btn-sm btn-outline-success">
                    Explore
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card text-center h-100">
                <div className="card-body">
                  <div className="fs-1 mb-2">🏆</div>
                  <h5 className="card-title">Leaderboard</h5>
                  <p className="card-text">
                    See who's leading the competition.
                  </p>
                  <Link to="/leaderboard" className="btn btn-sm btn-outline-warning">
                    Explore
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card text-center h-100">
                <div className="card-body">
                  <div className="fs-1 mb-2">🤝</div>
                  <h5 className="card-title">Teams</h5>
                  <p className="card-text">
                    Join or create teams and collaborate.
                  </p>
                  <Link to="/teams" className="btn btn-sm btn-outline-info">
                    Explore
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="my-5" />

      <section>
        <h2 className="mb-4">Features</h2>
        <div className="row g-3">
          <div className="col-md-4">
            <div className="feature-box p-4 bg-light rounded">
              <h5 className="mb-2">💪 Activity Tracking</h5>
              <p>
                Log all your fitness activities with details like duration, distance, and calories burned.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="feature-box p-4 bg-light rounded">
              <h5 className="mb-2">🏅 Ranking System</h5>
              <p>
                Climb the leaderboard with levels from Bronze to Diamond based on your performance.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="feature-box p-4 bg-light rounded">
              <h5 className="mb-2">🎯 Workouts</h5>
              <p>
                Get personalized workout suggestions tailored to your fitness level and goals.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
