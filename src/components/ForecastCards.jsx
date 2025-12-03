// src/components/ForecastCards.jsx
import { format } from "date-fns";
import WeatherIcon from "./WeatherIcon";

export default function ForecastCards({ forecast }) {
  if (!forecast?.list) return null;

  // group by date
  const daily = {};
  forecast.list.forEach(entry => {
    const day = format(entry.dt * 1000, "yyyy-MM-dd");
    if (!daily[day]) daily[day] = { temps: [], icons: [], desc: [] };
    daily[day].temps.push(entry.main.temp);
    daily[day].icons.push(entry.weather[0].icon);
    daily[day].desc.push(entry.weather[0].description);
  });

  const days = Object.entries(daily).slice(0, 5);

  return (
    <div className="forecast-cards">
      {days.map(([date, info]) => {
        const avg = Math.round(info.temps.reduce((a,b) => a + b, 0) / info.temps.length);
        const mostIcon = info.icons[Math.floor(info.icons.length/2)] || info.icons[0];
        const desc = info.desc[0];
        return (
          <div className="forecast-card" key={date}>
            <h4>{format(new Date(date), "EEE")}</h4>
            <WeatherIcon iconCode={mostIcon} size={64} />
            <p style={{ textTransform: "capitalize" }}>{desc}</p>
            <strong>{avg}°C avg</strong>
          </div>
        );
      })}
    </div>
  );
}
