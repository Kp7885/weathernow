// src/components/AnimatedWeatherIcon.jsx
import Lottie from "lottie-react";

// ensure these files exist in src/assets/lottie
import sun from "../assets/lottie/sun.json";
import night from "../assets/lottie/night.json";
import rain from "../assets/lottie/rain.json";
import cloudy from "../assets/lottie/cloudy.json";
import mist from "../assets/lottie/mist.json";
import snow from "../assets/lottie/snow.json";
import thunder from "../assets/lottie/thunder.json";

export default function AnimatedWeatherIcon({ iconCode, main, description, tempC, isDay }) {
  // 1) Prefer exact icon codes when available
  if (iconCode) {
    const mapByIcon = {
      "01d": sun, "01n": night,
      "02d": cloudy, "02n": cloudy,
      "03d": cloudy, "03n": cloudy,
      "04d": cloudy, "04n": cloudy,
      "09d": rain, "09n": rain,
      "10d": rain, "10n": rain,
      "11d": thunder, "11n": thunder,
      "13d": snow, "13n": snow,
      "50d": mist, "50n": mist
    };
    const anim = mapByIcon[iconCode];
    if (anim) return <Lottie animationData={anim} loop autoplay style={{ width: 120, height: 120 }} />;
  }

  // 2) Next fallback: use 'main' text with threshold logic
  if (main) {
    const m = main.toLowerCase();
    if (m.includes("clear")) return <Lottie animationData={isDay ? sun : night} loop autoplay style={{ width: 120, height: 120 }} />;
    if (m.includes("cloud")) return <Lottie animationData={cloudy} loop autoplay style={{ width: 120, height: 120 }} />;
    if (m.includes("rain") || m.includes("drizzle")) return <Lottie animationData={rain} loop autoplay style={{ width: 120, height: 120 }} />;
    if (m.includes("thunder")) return <Lottie animationData={thunder} loop autoplay style={{ width: 120, height: 120 }} />;
    if (m.includes("snow")) return <Lottie animationData={snow} loop autoplay style={{ width: 120, height: 120 }} />;
    if (m.includes("mist") || m.includes("fog") || m.includes("haze")) return <Lottie animationData={mist} loop autoplay style={{ width: 120, height: 120 }} />;
  }

  // 3) Temperature-based enhancement (cold => snow-like, very hot => sun)
  if (typeof tempC === "number") {
    if (tempC <= 0) return <Lottie animationData={snow} loop autoplay style={{ width: 120, height: 120 }} />;
    if (tempC >= 35) return <Lottie animationData={sun} loop autoplay style={{ width: 120, height: 120 }} />;
  }

  // 4) Safe default
  return <Lottie animationData={cloudy} loop autoplay style={{ width: 120, height: 120 }} />;
}
