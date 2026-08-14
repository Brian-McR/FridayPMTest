import { Outlet, Link } from 'react-router-dom';
import { getApiBaseUrl } from './config/api';
import './App.css';

function App() {
  const apiUrl = getApiBaseUrl();
  const isLocalhost = apiUrl.includes('localhost');

  return (
    <div className="app">
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <span className="fs-5">🏋️ OctoFit Tracker</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/users">
                  Users
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/teams">
                  Teams
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/activities">
                  Activities
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/leaderboard">
                  Leaderboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/workouts">
                  Workouts
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* API Configuration Banner */}
      <div className={`alert ${isLocalhost ? 'alert-info' : 'alert-success'} mb-0`}>
        <div className="container-fluid">
          <small>
            <strong>API:</strong> {apiUrl}
            {isLocalhost && ' (Local Development)'}
            {!isLocalhost && ' (Codespaces)'}
          </small>
        </div>
      </div>

      {/* Page Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-dark text-light mt-5 py-4">
        <div className="container-fluid text-center">
          <p className="mb-1">&copy; 2024 OctoFit Tracker</p>
          <small>Built with React 19, Vite, and Node.js</small>
        </div>
      </footer>
    </div>
  );
}

export default App;
