// src/components/MapView.jsx
export default function MapView({ lat, lon, name }) {
  if (!lat || !lon) return null;
  const bbox = `${lon - 0.02},${lat - 0.02},${lon + 0.02},${lat + 0.02}`;
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${lat}%2C${lon}`;
  return (
    <div className="map-container">
      <iframe
        title={name || "map"}
        src={mapUrl}
        style={{ width: "100%", height: 220, border: 0, borderRadius: 10 }}
      />
    </div>
  );
}
