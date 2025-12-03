import { motion } from "framer-motion";
import "../styles/alerts.css";



export default function AlertsPanel({ alerts = [], onClose }) {
  if (!alerts.length) return null;

  return (
    <motion.div
      className="alerts-panel"
      initial={{ x: 350 }}
      animate={{ x: 0 }}
      exit={{ x: 350 }}
      transition={{ type: "spring", stiffness: 70 }}
    >
      <div className="alerts-header">
        <h2>⚠ Weather Alerts</h2>
        <button className="close-btn" onClick={onClose}>✕</button>
      </div>

      {alerts.map((a, i) => (
        <div key={i} className={`alert-card alert-${a.severity || "yellow"}`}>
          <h3>{a.event}</h3>
          <p>{a.description}</p>

          <div className="alert-meta">
            <p><strong>From:</strong> {new Date(a.start * 1000).toLocaleString()}</p>
            <p><strong>To:</strong> {new Date(a.end * 1000).toLocaleString()}</p>
          </div>
        </div>
      ))}
    </motion.div>
  );
}
