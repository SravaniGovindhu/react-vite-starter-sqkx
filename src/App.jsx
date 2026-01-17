import { useState } from "react";
import data from "./data/powerData.json";
import "./App.css";

export default function App() {
  const [index, setIndex] = useState(0);
  const current = data[index];

  return (
    <div className="app">
      <h1>⚡ Power Distribution Dashboard</h1>

      {/* Timeline */}
      <div className="timeline">
        <span className="time-label">{current.time}</span>
        <input
          type="range"
          min="0"
          max={data.length - 1}
          value={index}
          onChange={(e) => setIndex(Number(e.target.value))}
        />
      </div>

      {/* Main Board */}
      <div className="card main">
        <h2>Main Board</h2>
        <p>{current["Main Board"]} kW</p>
      </div>

      {/* Distribution Boards */}
      <div className="grid">
        {Object.keys(current).map((key) => {
          if (key === "time" || key === "Main Board") return null;

          const value = current[key];
          let status = "green";
          if (value === 0) status = "red";
          else if (value < 3) status = "yellow";

          return (
            <div key={key} className={`card ${status}`}>
              <h3>{key}</h3>
              <p>{value} kW</p>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="legend">
        <span className="green">● Consuming</span>
        <span className="yellow">● Power ON, No Load</span>
        <span className="red">● Power OFF</span>
      </div>
    </div>
  );
}
