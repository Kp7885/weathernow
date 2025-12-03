import { Link } from "react-router-dom";
import "../styles/landing.css";

export default function Landing() {
  return (
    <div className="landing">
      <div className="landing-content">
        <h1 className="title">WeatherNow</h1>
        <p className="subtitle">
          Your real-time weather companion — forecast, analytics, air quality,<br />
          sunrise/sunset timings and more.
        </p>

        <div className="btn-row">
          <Link to="/dashboard" className="primary-btn">Explore Dashboard</Link>
          <Link to="/sunrise-sunset" className="secondary-btn">Sunrise & Sunset</Link>
        </div>
      </div>

      <div className="floating-circles">
        <span></span><span></span><span></span><span></span>
      </div>
    </div>
  );
}
