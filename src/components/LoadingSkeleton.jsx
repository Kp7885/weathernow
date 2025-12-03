// src/components/LoadingSkeleton.jsx
export default function LoadingSkeleton() {
  return (
    <div className="card" style={{ marginTop: 16 }}>
      <div className="skeleton loading-block" style={{ height: 24, width: "40%" }}></div>
      <div className="skeleton loading-block" style={{ height: 16, width: "70%", marginTop: 8 }}></div>
      <div style={{ marginTop: 14 }}>
        <div className="skeleton loading-block" style={{ height: 160, width: "100%" }}></div>
      </div>
      <div style={{ marginTop: 12, display: "grid", gap: 10, gridTemplateColumns: "1fr 1fr" }}>
        <div className="skeleton loading-block" style={{ height: 64 }}></div>
        <div className="skeleton loading-block" style={{ height: 64 }}></div>
      </div>
    </div>
  );
}
