import { useState } from "react";
import data from "./powerData.json";
import "./App.css";

const statusColor = (value) => {
  if (value === 0) return "red";
  if (value > 0 && value < 2) return "yellow";
  return "green";
};

const Card = ({ title, value }) => (
  <div className={`card ${statusColor(value)}`}>
    <h4>{title}</h4>
    <p>{value} kW</p>
  </div>
);

export default function App() {
  const [index, setIndex] = useState(0);
  const row = data[index];

  return (
    <div className="container">
      <h2>⚡ Power Distribution Monitoring</h2>

      {/* Timeline */}
      <div className="timeline">
        <input
          type="range"
          min="0"
          max={data.length - 1}
          value={index}
          onChange={(e) => setIndex(Number(e.target.value))}
        />
        <span className="time">{row.time}</span>
      </div>

      {/* Main Board */}
      <div className="section">
        <Card title="Main Board" value={row.main} />
      </div>

      {/* Distribution Boards */}
      <div className="db-grid">
        {/* DB 1 */}
        <div className="db">
          <Card title="DB-1" value={row.db1.total} />
          <div className="loads">
            <Card title="Load 1" value={row.db1.l1} />
            <Card title="Load 2" value={row.db1.l2} />
          </div>
        </div>

        {/* DB 2 */}
        <div className="db">
          <Card title="DB-2" value={row.db2.total} />
          <div className="loads">
            <Card title="Load 1" value={row.db2.l1} />
            <Card title="Load 2" value={row.db2.l2} />
          </div>
        </div>

        {/* DB 3 */}
        <div className="db">
          <Card title="DB-3" value={row.db3.total} />
          <div className="loads">
            <Card title="Load 1" value={row.db3.l1} />
            <Card title="Load 2" value={row.db3.l2} />
          </div>
        </div>
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
