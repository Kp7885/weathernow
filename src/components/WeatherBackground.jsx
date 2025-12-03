import React from "react";
import "./WeatherBackground.css";

export default function WeatherBackground({ weather }) {
  return (
    <div className={`weather-bg ${weather}`}>
      <div className="bg-overlay"></div>
    </div>
  );
}
