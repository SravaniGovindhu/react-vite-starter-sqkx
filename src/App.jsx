import { useState } from "react";

function App() {
  const [time, setTime] = useState(12);

  return (
    <div style={styles.page}>
      {/* Header */}
      <h1 style={styles.title}>Power Distribution Monitoring</h1>

      {/* Timeline */}
      <div style={styles.timeline}>
        <span>00:00</span>
        <input
          type="range"
          min="0"
          max="24"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          style={{ flex: 1 }}
        />
        <span>{time}:00</span>
      </div>

      {/* Layout */}
      <div style={styles.layout}>
        {/* Main Board */}
        <div style={styles.board} id="main-board">
          <h3>Main Board</h3>
          <p>Voltage: 415 V</p>
          <p>Power: 480 kW</p>
          <span style={styles.greenDot}></span>
        </div>

        {/* Distribution Boards */}
        <div style={styles.column} id="db-column">
          <div style={styles.board} id="db1">
            <h4>DB-1</h4>
            <p>Load: 85 kW</p>
            <span style={styles.greenDot}></span>
          </div>

          <div style={styles.board} id="db2">
            <h4>DB-2</h4>
            <p>Load: 78 kW</p>
            <span style={styles.yellowDot}></span>
          </div>

          <div style={styles.board} id="db3">
            <h4>DB-3</h4>
            <p>Load: 62 kW</p>
            <span style={styles.greenDot}></span>
          </div>
        </div>

        {/* Loads */}
        <div style={styles.column} id="loads-column">
          <div style={styles.load} id="load1">Load 1 – 32 kW</div>
          <div style={styles.load} id="load2">Load 2 – 18 kW</div>
          <div style={styles.load} id="load3">Load 3 – 45 kW</div>
          <div style={styles.load} id="load4">Load 4 – 28 kW</div>
        </div>
      </div>

      {/* SVG Wires */}
      <svg style={styles.svg}>
        {/* Main Board to DBs */}
        <line x1="200" y1="50" x2="400" y2="50" stroke="yellow" strokeWidth="3" />
        <line x1="200" y1="50" x2="400" y2="130" stroke="yellow" strokeWidth="3" />
        <line x1="200" y1="50" x2="400" y2="210" stroke="yellow" strokeWidth="3" />

        {/* DBs to Loads */}
        <line x1="600" y1="50" x2="820" y2="0" stroke="lime" strokeWidth="2" />
        <line x1="600" y1="130" x2="820" y2="50" stroke="lime" strokeWidth="2" />
        <line x1="600" y1="210" x2="820" y2="100" stroke="lime" strokeWidth="2" />
        <line x1="600" y1="210" x2="820" y2="180" stroke="lime" strokeWidth="2" />
      </svg>

      {/* Footer */}
      <div style={styles.footer}>
        <span style={{ color: "lime" }}>● Operational</span>
        <span style={{ color: "gold" }}>● Warning</span>
        <span style={{ color: "red" }}>● Critical</span>
      </div>
    </div>
  );
}

/* ---------- STYLES ---------- */

const styles = {
  page: {
    background: "#0f172a",
    minHeight: "100vh",
    padding: 20,
    color: "#e5e7eb",
    fontFamily: "Arial",
    position: "relative"
  },
  title: {
    marginBottom: 20
  },
  timeline: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 30
  },
  layout: {
    display: "flex",
    gap: 40,
    position: "relative"
  },
  column: {
    display: "flex",
    flexDirection: "column",
    gap: 20
  },
  board: {
    background: "#1e293b",
    padding: 16,
    borderRadius: 8,
    position: "relative",
    width: 200
  },
  load: {
    background: "#1e293b",
    padding: 12,
    borderRadius: 6,
    width: 200
  },
  greenDot: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 10,
    height: 10,
    borderRadius: "50%",
    background: "lime"
  },
  yellowDot: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 10,
    height: 10,
    borderRadius: "50%",
    background: "gold"
  },
  footer: {
    marginTop: 40,
    display: "flex",
    gap: 20
  },
  svg: {
    position: "absolute",
    top: 150,
    left: 0,
    width: "100%",
    height: "300px",
    pointerEvents: "none"
  }
};

export default App;
