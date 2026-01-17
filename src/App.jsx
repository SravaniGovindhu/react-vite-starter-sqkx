import { useState } from "react";
import "./App.css";

export default function App() {
  const [time, setTime] = useState("10:10");

  return (
    <div className="app">
      <h1>Power Distribution Monitoring</h1>

      {/* Timeline */}
      <div className="timeline">
        <input
          type="range"
          min="0"
          max="24"
          defaultValue="10"
          onChange={(e) => setTime(`${e.target.value}:00`)}
        />
        <span className="time-label">{time}</span>
      </div>

      {/* Main Board */}
      <div className="main-board green">
        <h3>Main Board</h3>
        <p>12 kW</p>
      </div>

      {/* Distribution Boards */}
      <div className="db-row">
        <div className="db yellow">
          <h4>DB-1</h4>
          <p>1 kW</p>
          <div className="loads">
            <div className="load red">Load 1 – 0 kW</div>
            <div className="load yellow">Load 2 – 1 kW</div>
          </div>
        </div>

        <div className="db green">
          <h4>DB-2</h4>
          <p>3 kW</p>
          <div className="loads">
            <div className="load yellow">Load 1 – 1 kW</div>
            <div className="load green">Load 2 – 2 kW</div>
          </div>
        </div>

        <div className="db green">
          <h4>DB-3</h4>
          <p>5 kW</p>
          <div className="loads">
            <div className="load green">Load 1 – 2 kW</div>
            <div className="load green">Load 2 – 3 kW</div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="legend">
        <div className="legend-item consuming">● Consuming</div>
        <div className="legend-item on">● Power ON</div>
        <div className="legend-item off">● Power OFF</div>
      </div>
    </div>
  );
}
