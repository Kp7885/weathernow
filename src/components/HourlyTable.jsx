// src/components/HourlyTable.jsx
import WeatherIcon from "./WeatherIcon";
import { format } from "date-fns";

export default function HourlyTable({ data = [] }) {
  if (!data || data.length === 0) return <p style={{ opacity: 0.8 }}>No hourly data.</p>;

  return (
    <div style={{ overflowX: "auto" }}>
      <table className="hourly-table">
        <thead>
          <tr>
            <th>Time</th>
            <th>Temp</th>
            <th>Humidity</th>
            <th>Wind</th>
            <th>Condition</th>
            <th>Precip</th>
          </tr>
        </thead>
        <tbody>
          {data.map((h, i) => (
            <tr key={i}>
              <td>{format(h.time, "ha")}</td>
              <td>{Math.round(h.temp)}°C</td>
              <td>{h.humidity}%</td>
              <td>{h.wind} m/s</td>
              <td style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "center", textTransform: "capitalize" }}>
                <WeatherIcon iconCode={h.icon} size={36} />
                <span>{h.conditionDesc || h.conditionMain}</span>
              </td>
              <td>{h.precipitation} mm</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
