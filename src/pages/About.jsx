import "../styles/about.css";

export default function About() {
  return (
    <div className="about">
      <h1>About WeatherNow</h1>

      <div className="about-grid">
        <div className="about-card">
          <h3>🌦 Real-Time Weather</h3>
          <p>
            Get instant weather updates powered by OpenWeather API, including detailed
            analytics and live animated conditions.
          </p>
        </div>

        <div className="about-card">
          <h3>📊 Forecast & Charts</h3>
          <p>
            Advanced graphs for temperature, humidity, wind speed and precipitation —
            all visualized beautifully.
          </p>
        </div>

        <div className="about-card">
          <h3>🌇 Sunrise & Sunset</h3>
          <p>
            A clean, minimal tool to check accurate sunrise/sunset times for any city.
          </p>
        </div>

        <div className="about-card">
          <h3>🧠 Powered by Vite + React</h3>
          <p>
            Fast, modern architecture using Vite, React Router, Chart.js and Lottie animations.
          </p>
        </div>
      </div>
    </div>
  );
}
