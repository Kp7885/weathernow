// src/utils/theme.js
// Exports: applyTheme(main, isNight, tempC, {persistOverride})
// and initTheme() which applies a default theme on page load.

const THEME_KEY = "weathernow_theme_override";

/**
 * Remove existing theme classes from body.
 */
function clearThemeClasses() {
  document.body.classList.remove(
    "theme-sunny",
    "theme-cloudy",
    "theme-rain",
    "theme-snow",
    "theme-mist",
    "theme-night",
    "theme-cold"
  );
}

/**
 * Decide theme name from inputs.
 * main: weather main string (e.g., "Clear", "Clouds")
 * isNight: boolean
 * tempC: number (Celsius)
 */
export function decideTheme(main, isNight, tempC) {
  if (isNight) return "theme-night";
  if (typeof tempC === "number" && tempC <= 0) return "theme-cold";
  if (!main) return "theme-sunny";

  const w = main.toLowerCase();
  if (w.includes("clear")) return "theme-sunny";
  if (w.includes("cloud")) return "theme-cloudy";
  if (w.includes("rain") || w.includes("drizzle")) return "theme-rain";
  if (w.includes("snow")) return "theme-snow";
  if (w.includes("mist") || w.includes("fog") || w.includes("haze")) return "theme-mist";
  return "theme-sunny";
}

/**
 * Apply a theme class to body. If persistOverride is provided (string), it will be saved to localStorage.
 * If the user has a manual override saved in localStorage, it will take precedence.
 */
export function applyTheme(main, isNight, tempC, { persistOverride = null } = {}) {
  // Check for manual override
  const override = localStorage.getItem(THEME_KEY);
  if (persistOverride) {
    // Save explicit override (e.g., user toggled)
    localStorage.setItem(THEME_KEY, persistOverride);
  }

  const effectiveOverride = localStorage.getItem(THEME_KEY);

  clearThemeClasses();

  if (effectiveOverride) {
    document.body.classList.add(effectiveOverride);
    return effectiveOverride;
  }

  const themeName = decideTheme(main, isNight, tempC);
  document.body.classList.add(themeName);
  return themeName;
}

/**
 * Remove manual override and re-run automatic theme decision.
 */
export function clearOverrideAndApply(main, isNight, tempC) {
  localStorage.removeItem(THEME_KEY);
  return applyTheme(main, isNight, tempC);
}

/**
 * Initialize theme on first load. If override exists, use it. Otherwise choose based on local time.
 * - If sunrise/sunset unknown, we use user's local hour to guess day/night.
 */
export function initTheme({ sunriseUnix = null, sunsetUnix = null, main = null, tempC = null } = {}) {
  const override = localStorage.getItem(THEME_KEY);
  if (override) {
    clearThemeClasses();
    document.body.classList.add(override);
    return override;
  }

  const nowSec = Date.now() / 1000;
  let isNight = false;
  if (sunriseUnix && sunsetUnix) {
    isNight = !(nowSec >= sunriseUnix && nowSec < sunsetUnix);
  } else {
    // fallback: use local hour
    const hr = new Date().getHours();
    isNight = hr < 6 || hr >= 19;
  }

  const themeName = decideTheme(main, isNight, tempC);
  clearThemeClasses();
  document.body.classList.add(themeName);
  return themeName;
}

/**
 * Expose function to set override manually (and persist)
 */
export function setManualOverride(themeClass) {
  if (!themeClass) {
    localStorage.removeItem(THEME_KEY);
    return;
  }
  localStorage.setItem(THEME_KEY, themeClass);
}
