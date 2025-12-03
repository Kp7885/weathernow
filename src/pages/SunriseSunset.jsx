import { useState } from "react";

export default function SunriseSunset() {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const fetchSunriseSunset = async () => {
  console.log("FUNCTION RAN! (SunriseSunset)");
  if (!city) return;

  setError("");
  setData(null);

  try {
    const apiKey = import.meta.env.VITE_OPENWEATHER_KEY;
    console.log("Sunrise page API KEY:", apiKey);

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    );

    console.log("API response status:", response.status);

    const json = await response.json();
    console.log("API JSON:", json);

    if (!response.ok) {
      // If API returned an error body, show it in console and to user
      console.error("API error body:", json);
      throw new Error(json.message || "City not found");
    }

    setData(json);
  } catch (err) {
    console.error("Fetch error:", err);
    setError(err.message);
  }
};


  const convertTime = (unix) => {
    return new Date(unix * 1000).toLocaleTimeString();
  };

  return (
    <div className="page">
      <h1>Sunrise & Sunset Times</h1>
      <p>Enter a city to view today's sunrise and sunset time.</p>

      <div style={{ marginTop: "30px" }}>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{
            padding: "10px",
            width: "250px",
            marginRight: "10px",
            borderRadius: "5px",
            border: "1px solid #888",
          }}
        />

        <button onClick={fetchSunriseSunset} className="btn">
          Search
        </button>
      </div>

      {error && (
        <p style={{ color: "red", marginTop: "20px" }}>
          ❌ {error}
        </p>
      )}

      {data && (
        <div
          style={{
            background: "#ffffff10",
            marginTop: "30px",
            padding: "20px",
            borderRadius: "10px",
            width: "350px",
          }}
        >
          <h2>{data.name}</h2>
          <p>🌅 Sunrise: {convertTime(data.sys.sunrise)}</p>
          <p>🌇 Sunset: {convertTime(data.sys.sunset)}</p>
          <p>🌞 Country: {data.sys.country}</p>
        </div>
      )}
    </div>
  );
}
