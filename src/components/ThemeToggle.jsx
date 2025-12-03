// src/components/ThemeToggle.jsx
import { useEffect, useState } from "react";
import { applyTheme, clearOverrideAndApply, setManualOverride, initTheme } from "../utils/theme";

/**
 * Props:
 * - main, isDay, tempC: optional (pass current.weather values if available)
 */
export default function ThemeToggle({ main = null, isDay = true, tempC = null }) {
  const [override, setOverride] = useState(null); // theme class or null

  useEffect(() => {
    // Initialize theme on mount (uses localStorage override if present)
    initTheme({ main, tempC });
    const saved = localStorage.getItem("weathernow_theme_override");
    setOverride(saved);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSet = (themeClass) => {
    setManualOverride(themeClass);
    setOverride(themeClass);
    applyTheme(null, false, null); // applyTheme will read override from localStorage
  };

  const handleClear = () => {
    localStorage.removeItem("weathernow_theme_override");
    setOverride(null);
    // apply automatic using provided props
    clearOverrideAndApply(main, !isDay, tempC); // note: clearOverrideAndApply expects main,isNight,temp
    // above we pass isNight = !isDay so that logic picks correctly
  };

  return (
    <div className="theme-toggle">
      <button onClick={() => handleSet("theme-sunny")}>Day</button>
      <button onClick={() => handleSet("theme-night")}>Night</button>
      <button onClick={() => handleSet("theme-rain")}>Rain</button>
      <button onClick={() => handleSet("theme-snow")}>Snow</button>
      <button onClick={() => handleClear()}>Auto</button>
    </div>
  );
}
