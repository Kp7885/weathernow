import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import SunriseSunset from "./pages/SunriseSunset";
import About from "./pages/About";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sunrise-sunset" element={<SunriseSunset />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
