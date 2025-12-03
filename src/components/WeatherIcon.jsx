// src/components/WeatherIcon.jsx
export default function WeatherIcon({ iconCode, size = 50 }) {
  if (!iconCode) return null;
  const url = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  return <img src={url} alt="weather" style={{ width: size, height: size }} />;
}
