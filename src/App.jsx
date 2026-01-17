import { useState } from "react";

/* ---------- SIMULATED DATA ---------- */
const HOURS = [...Array(24).keys()];

const generatePower = () =>
  HOURS.map(() => (Math.random() > 0.3 ? +(Math.random() * 50).toFixed(1) : 0));

const DB_DATA = [
  { name: "DB-1", loads: ["Load 1", "Load 2"] },
  { name: "DB-2", loads: ["Load 1", "Load 2"] },
  { name: "DB-3", loads: ["Load 1", "Load 2"] }
];

/* ---------- STATUS ---------- */
const getStatusColor = (value) => {
  if (value > 0) return "lime";
  return "gold"; // power ON but no load
};

/* ---------- COMPONENT ---------- */
export default function App() {
  const [hour, setHour] = useState(10);
  const [hover, setHover] = useState(false);

  const mainPower = generatePower();
  const dbPower = DB_DATA.map(() => generatePower());
  const loadPower = DB_DATA.map(() =>
    Array(2)
      .fill(0)
      .map(() => generatePower())
  );

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Power Distribution Monitoring</h1>

      {/* TIMELINE */}
      <div
        style={styles.timeline}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <span>00:00</span>
        <input
          type="range"
          min="0"
          max="23"
          value={hour}
          onChange={(e) => setHour(+e.target.value)}
          style={{ flex: 1 }}
        />
        <span>{hour}:00</span>
      </div>

      {/* MAIN LAYOUT */}
      <div style={styles.system}>
        {/* MAIN BOARD */}
        <div style={styles.mainBoard}>
          <h3>Main Board</h3>
          {hover && <div>{mainPower[hour]} kW</div>}
          <StatusDot value={mainPower[hour]} />
        </div>

        {/* BUSBAR */}
        <div style={styles.busbar} />

        {/* DBs */}
        <div style={styles.dbColumn}>
          {DB_DATA.map((db, i) => (
            <div key={db.name} style={styles.dbRow}>
              <div style={styles.dbBox}>
                <h4>{db.name}</h4>
                {hover && <div>{dbPower[i][hour]} kW</div>}
                <StatusDot value={dbPower[i][hour]} />
              </div>

              {/* LOADS */}
              <div style={styles.loadColumn}>
                {db.loads.map((load, j) => (
                  <div key={load} style={styles.loadBox}>
                    {load}
                    {hover && (
                      <div style={styles.smallText}>
                        {loadPower[i][j][hour]} kW
                      </div>
                    )}
                    <StatusDot value={loadPower[i][j][hour]} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LEGEND */}
      <div style={styles.legend}>
        <span style={{ color: "lime" }}>● Consuming</span>
        <span style={{ color: "gold" }}>● Power ON</span>
      </div>
    </div>
  );
}

/* ---------- STATUS DOT ---------- */
const StatusDot = ({ value }) => (
  <span
    style={{
      ...styles.dot,
      background: getStatusColor(value)
    }}
  />
);

/* ---------- STYLES ---------- */
const styles = {
  page: {
    background: "#0f172a",
    minHeight: "100vh",
    padding: 24,
    color: "#e5e7eb",
    fontFamily: "Arial"
  },
  title: {
    marginBottom: 20
  },
  timeline: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 30
  },
  system: {
    display: "flex",
    alignItems: "flex-start",
    gap: 40
  },
  mainBoard: {
    background: "#1e293b",
    padding: 20,
    borderRadius: 8,
    width: 220,
    position: "relative"
  },
  busbar: {
    width: 6,
    height: 420,
    background: "#facc15",
    borderRadius: 3
  },
  dbColumn: {
    display: "flex",
    flexDirection: "column",
    gap: 30
  },
  dbRow: {
    display: "flex",
    alignItems: "center",
    gap: 40
  },
  dbBox: {
    background: "#1e293b",
    padding: 16,
    borderRadius: 8,
    width: 180,
    position: "relative"
  },
  loadColumn: {
    display: "flex",
    flexDirection: "column",
    gap: 12
  },
  loadBox: {
    background: "#1e293b",
    padding: 10,
    borderRadius: 6,
    width: 160,
    position: "relative"
  },
  dot: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 10,
    height: 10,
    borderRadius: "50%"
  },
  legend: {
    marginTop: 40,
    display: "flex",
    gap: 20
  },
  smallText: {
    fontSize: 12,
    opacity: 0.8
  }
};
