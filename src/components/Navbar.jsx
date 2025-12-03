import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="nav">
      <div className="nav-container">
        <h2 className="logo">WeatherNow</h2>

        <button className="hamburger" onClick={() => setOpen(!open)}>
          ☰
        </button>

        <div className={`nav-links ${open ? "open" : ""}`}>
          <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to="/dashboard" onClick={() => setOpen(false)}>Dashboard</NavLink>
          <NavLink to="/sunrise-sunset" onClick={() => setOpen(false)}>Sunrise/Sunset</NavLink>
          <NavLink to="/about" onClick={() => setOpen(false)}>About</NavLink>
        </div>
      </div>
    </nav>
  );
}
