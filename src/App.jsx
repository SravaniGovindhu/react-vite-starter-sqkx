import { useState } from "react";
import "./App.css";

export default function App() {
  // Timeline (0–24 hours)
  const [time, setTime] = useState(12);

  // Simulated power states
  const system = {
    mainBoard: time > 5 && time < 22,
    boards: [
      { id: "DB-1", load: time % 2 === 0 ? 5.2 : 0 },
      { id: "DB-2", load: time % 3 === 0 ? 3.8 : 0 },
      { id: "DB-3", load: time % 4 === 0 ? 6.5 : 0 },
    ],
  };

  // Wire color logic
  const getColor = (powerOn, load) => {
    if (!powerOn) return "red";
    if (load > 0) return "green";
    return "yellow";
  };

  return (
    <div style={styles.page}>
      <h2>⚡ Power Distribution Monitoring</h2>

      {/* Timeline */}
      <div style={styles.slider}>
        <span>Time: {time}:00</span>
        <input
          type="range"
          min="0"
          max="24"
          value={time}
          onChange={(e) => setTime(Number(e.target.value))}
        />
      </div>

      {/* Main Board */}
      <div style={styles.board}>
        <strong>Main Board</strong>
        <div>Status: {system.mainBoard ? "ON" : "OFF"}</div>
      </div>

      {/* Distribution Boards */}
      <div style={styles.container}>
        {system.boards.map((db) => {
          const color = getColor(system.mainBoard, db.load);
          return (
            <div key={db.id} style={styles.dbBlock}>
              <div
                style={{
                  ...styles.wire,
                  backgroundColor: color,
                }}
                title={`Load: ${db.load} kW`}
              />
              <div style={styles.db}>
                <strong>{db.id}</strong>
                <div>{db.load > 0 ? `${db.load} kW` : "No Load"}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div style={styles.legend}>
        <span style={{ color: "green" }}>■ Power + Load</span>
        <span style={{ color: "yellow" }}>■ Power ON, No Load</span>
        <span style={{ color: "red" }}>■ Power OFF</span>
      </div>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: "Arial",
    padding: 20,
    background: "#f5f7fa",
  },
  slider: {
    marginBottom: 20,
  },
  board: {
    padding: 15,
    background: "#ffffff",
    borderRadius: 8,
    marginBottom: 20,
    width: 200,
  },
  container: {
    display: "flex",
    gap: 20,
  },
  dbBlock: {
    textAlign: "center",
  },
  wire: {
    height: 6,
    width: 100,
    marginBottom: 6,
    borderRadius: 3,
  },
  db: {
    padding: 10,
    background: "#ffffff",
    borderRadius: 6,
    width: 100,
  },
  legend: {
    marginTop: 30,
    display: "flex",
    gap: 20,
  },
};
