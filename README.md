# 🌤 WeatherNow – Real-Time Weather Dashboard

**Course:** ITMD 543 — Frontend Web Development  
**Student:** Khushi Patel (A20561377)  
**Instructor:** —  
**Term:** Fall 2025

---

## 🛰 Project Overview

WeatherNow is a **real-time weather analytics dashboard** built using **React + Vite**, featuring:

- 🔍 Location-based weather search
- 🌡 Current weather with animated icons
- 📈 Hourly forecast chart (temperature + humidity)
- 📅 5-Day advanced weather forecast
- ☁ Air Quality Index (AQI)
- 🕐 Sunrise/Sunset times
- 🎛 Theme switching (Day/Night)
- 🚨 Severe weather alerts
- 🗺 Interactive weather map
- ⚡ Smooth animations & loading skeletons

This web application delivers a **clean UI**, fast performance, and high accessibility while consuming multiple OpenWeather APIs.

---

## 🔗 Live Deployment

🟢 Production URL:  
➡ https://weathernow-jua6-six.vercel.app

---

## 🛠 Tech Stack

| Category | Tools Used |
|---------|------------|
| Framework | React + Vite |
| UI / Styling | Custom CSS, Animations, Responsive UI |
| API Integration | OpenWeather REST APIs (3 endpoints) |
| Charts | Chart.js + react-chartjs-2 |
| Routing | React Router DOM |
| Deployment | Vercel |
| Source Control | GitHub |
| Agile | Azure DevOps Board (Epics / Features / User Stories) |

---

## 📌 Features

| Feature | Description |
|--------|-------------|
| Real-Time Weather | Shows temp, humidity, wind, clouds, precipitation |
| Animated Icons | Lottie weather animations based on weather code |
| Hourly Analytics | Line chart with dual Y-axis |
| 5-Day Forecast | Responsive weather card UI |
| AQI Monitoring | Air pollution with readable rating |
| Alerts System | Displays official severe alerts with animations |
| Sunrise / Sunset Page | Dedicated page with accurate timings |
| Dark/Light Theme | Auto changes based on local day/night |
| Loading Skeleton | Beautiful shimmer effects while fetching |

---

## 🧠 Agile Development

Agile board:  
**Azure DevOps** → Epics → Features → User Stories  
Includes sprint planning, state transitions & assignments.

---

## 🔄 CI/CD

✔ GitHub → Vercel deployment pipeline  
✔ Automatic redeploy on code push  
✔ Environment variables secured  
✔ Production error monitoring

---

## 🧪 Testing / Best Practices

- React component architecture
- State management via hooks
- Accessibility: proper labels + contrast
- Performance optimized with caching + lazy loading

---

## 📂 Run Project Locally

```bash
git clone https://github.com/Kp7885/weathernow.git
cd weathernow
npm install
echo "VITE_OPENWEATHER_KEY=YOUR_API_KEY" > .env
npm run dev
