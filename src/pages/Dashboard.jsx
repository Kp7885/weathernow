// FIX FOR Chart.js v4
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  Tooltip,
  Legend
} from "chart.js";
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Filler, Tooltip, Legend);

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { format } from "date-fns";
import { motion } from "framer-motion";

import WeatherIcon from "../components/WeatherIcon";
import HourlyTable from "../components/HourlyTable";
import ForecastCards from "../components/ForecastCards";
import AlertsPanel from "../components/AlertsPanel";
import MapView from "../components/MapView";
import LoadingSkeleton from "../components/LoadingSkeleton";

import { applyTheme } from "../utils/theme"; // 🌗 auto day/night theme
import "../styles/dashboard.css";

export default function Dashboard() {
  const [city, setCity] = useState("");
  const [current, setCurrent] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [hourly, setHourly] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [aqi, setAqi] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const apiKey = import.meta.env.VITE_OPENWEATHER_KEY;

  // 🔔 keep track of which alerts we've already notified for
  const notifiedAlertsRef = useRef(new Set());

  const fetchWeather = async () => {
    if (!city.trim()) return;

    setLoading(true);
    setError("");
    setCurrent(null);
    setForecast(null);
    setHourly([]);
    setAqi(null);
    setAlerts([]);

    try {
      // 1) current weather
      const currentRes = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather",
        { params: { q: city, units: "metric", appid: apiKey } }
      );
      const currentData = currentRes.data;
      setCurrent(currentData);

      // 🌗 Auto Day / Night Theme based on this city
      try {
        const main = currentData.weather?.[0]?.main || "Clear";
        const now = currentData.dt;
        const sunrise = currentData.sys?.sunrise;
        const sunset = currentData.sys?.sunset;
        const isNight =
          typeof sunrise === "number" &&
          typeof sunset === "number"
            ? !(now >= sunrise && now < sunset)
            : false;

        applyTheme(main, isNight, currentData.main?.temp ?? null);
      } catch (e) {
        console.warn("Theme apply failed:", e);
      }

      const { lat, lon } = currentData.coord;

      // 2) 5 day / 3 hour forecast
      const forecastRes = await axios.get(
        "https://api.openweathermap.org/data/2.5/forecast",
        { params: { q: city, units: "metric", appid: apiKey } }
      );
      const forecastData = forecastRes.data;
      setForecast(forecastData);

      // Build hourly slice for next 24h (8 * 3h = 24h)
      const next24 = forecastData.list.slice(0, 8).map((h) => ({
        time: h.dt * 1000,
        temp: h.main.temp,
        humidity: h.main.humidity,
        wind: h.wind.speed,
        precipitation: h.rain?.["3h"] ?? 0,
        clouds: h.clouds.all,
        icon: h.weather[0].icon,
      }));
      setHourly(next24);

      // Some OpenWeather plans include alerts in One Call API, but
      // since we're already advanced, try One Call for richer alerts (if available)
      try {
        const oneCallRes = await axios.get(
          "https://api.openweathermap.org/data/3.0/onecall",
          {
            params: {
              lat,
              lon,
              units: "metric",
              appid: apiKey,
              exclude: "minutely"
            }
          }
        );
        const oc = oneCallRes.data;
        const receivedAlerts = oc.alerts || [];
        setAlerts(receivedAlerts);
      } catch (e) {
        // If One Call is not allowed by key/plan, silently ignore and keep alerts empty
        console.warn("One Call alerts failed or not enabled:", e?.message);
      }

      // 3) Air Quality
      const aqiRes = await axios.get(
        "https://api.openweathermap.org/data/2.5/air_pollution",
        { params: { lat, lon, appid: apiKey } }
      );
      setAqi(aqiRes.data);
    } catch (err) {
      console.error(err);
      setError("City not found. Try another!");
    } finally {
      setLoading(false);
    }
  };

  // 📊 Chart datasets
  const tempChart = {
    labels: hourly.map((h) => format(h.time, "ha")),
    datasets: [
      {
        label: "Temperature (°C)",
        data: hourly.map((h) => h.temp),
        borderColor: "rgba(59,130,246,1)",
        backgroundColor: "rgba(59,130,246,0.25)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Humidity (%)",
        data: hourly.map((h) => h.humidity),
        borderColor: "rgba(16,185,129,1)",
        backgroundColor: "rgba(16,185,129,0.15)",
        tension: 0.4,
        yAxisID: "y1",
      },
    ],
  };

  const wxChart = {
    labels: hourly.map((h) => format(h.time, "ha")),
    datasets: [
      {
        label: "Wind (m/s)",
        data: hourly.map((h) => h.wind),
        borderColor: "rgba(14,165,233,1)",
        backgroundColor: "rgba(14,165,233,0.15)",
        tension: 0.4,
      },
      {
        label: "Precip (mm)",
        data: hourly.map((h) => h.precipitation),
        borderColor: "rgba(96,165,250,1)",
        backgroundColor: "rgba(96,165,250,0.15)",
        tension: 0.4,
      },
      {
        label: "Clouds (%)",
        data: hourly.map((h) => h.clouds),
        borderColor: "rgba(168,85,247,1)",
        backgroundColor: "rgba(168,85,247,0.1)",
        tension: 0.4,
      },
    ],
  };

  // 🔔 Browser Notifications when new alerts arrive
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!alerts || alerts.length === 0) return;
    if (!("Notification" in window)) return;

    // ask once
    if (Notification.permission === "default") {
      Notification.requestPermission();
    }

    if (Notification.permission !== "granted") return;

    alerts.forEach((a) => {
      const key = `${a.event}-${a.start}-${a.end}`;
      if (notifiedAlertsRef.current.has(key)) return;

      notifiedAlertsRef.current.add(key);

      const body =
        (a.description && a.description.slice(0, 140)) ||
        "Weather alert in your selected location.";

      new Notification(`Weather Alert: ${a.event}`, {
        body,
      });
    });
  }, [alerts]);

  return (
    <motion.div
      className="page"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="neon">Weather Dashboard</h1>
      <p style={{ marginBottom: 10 }}>
        🔍 Search a city and explore detailed weather analytics with smart themes & alerts.
      </p>

      <div className="search-row">
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          className="search-input"
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") fetchWeather();
          }}
        />
        <button className="btn" disabled={loading} onClick={fetchWeather}>
          {loading ? "Loading..." : "Search"}
        </button>
      </div>

      {error && <p style={{ color: "#ff8a8a", marginTop: 8 }}>{error}</p>}

      {current && (
        <>
          <div className="grid">
            {/* 🔹 Current Conditions */}
            <motion.div className="card current-card">
              <div className="current-head">
                <div>
                  <h2>
                    {current.name}, {current.sys.country}
                  </h2>
                  <p>{format(new Date(), "PPPPpp")}</p>
                </div>
                <div className="icon-large">
                  <WeatherIcon iconCode={current.weather[0].icon} size={70} />
                  <p>{current.weather[0].description}</p>
                </div>
              </div>

              <div className="current-stats">
                <div>
                  🌡 <strong>{Math.round(current.main.temp)}°C</strong>
                </div>
                <div>💧 {current.main.humidity}% Humidity</div>
                <div>💨 {current.wind.speed} m/s Wind</div>
                <div>☁ {current.clouds?.all ?? 0}% Clouds</div>
              </div>

              {aqi && (
                <div className="aqi">
                  <h4>Air Quality</h4>
                  <p>
                    AQI: <strong>{aqi.list[0].main.aqi}</strong> (1 = Best, 5 = Worst)
                  </p>
                </div>
              )}
            </motion.div>

            {/* 🔹 Temp + Humidity Chart */}
            <motion.div className="card chart-card">
              <h3>🕒 Next 24h — Temp + Humidity</h3>
              {loading ? <LoadingSkeleton /> : <Line data={tempChart} />}
            </motion.div>
          </div>

          {/* 🔹 Hourly Table */}
          {hourly.length > 0 && (
            <>
              <h3 style={{ marginTop: 25 }}>Hourly Breakdown</h3>
              <HourlyTable data={hourly} />
            </>
          )}

          {/* 🔹 Wind / Clouds / Rain Chart */}
          <div className="card chart-card" style={{ marginTop: 30 }}>
            <h3>🎯 Wind • Clouds • Rain</h3>
            {loading ? <LoadingSkeleton /> : <Line data={wxChart} />}
          </div>

          {/* 🔹 5-Day Forecast */}
          {forecast && (
            <>
              <h3 style={{ marginTop: 32 }}>📆 5-Day Forecast</h3>
              <ForecastCards forecast={forecast} />
            </>
          )}

          {/* 🔹 Map View */}
          <MapView lat={current.coord.lat} lon={current.coord.lon} />
        </>
      )}

      {/* 🔹 Alerts Sidebar + Close */}
      <AlertsPanel alerts={alerts} onClose={() => setAlerts([])} />
    </motion.div>
  );
}
