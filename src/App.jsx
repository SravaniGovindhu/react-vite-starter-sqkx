import { useState } from "react";
import powerData from "./data/powerData.json";
import "./App.css";

export default function App() {
  const [index, setIndex] = useState(0);
  const data = powerData[index];

  const statusColor = (value) => {
    if (value === 0) return "red";
    if (value > 0 && value < 2) return "yellow";
    return "green";
  };

  const Box = ({ title, value }) => (
    <div className={`box ${statusColor(value)}`}>
      <h3>{title}</h3>
      <p>{value} kW</p>
      <span className="popup">
        Time: {data.time} <br />
        Power: {value} kW
      </span>
    </div>
  );

  return (
    <div className="container">
      {/* Timeline */}
      <div className="timeline">
        <input
          type="range"
          min="0"
          max={powerData.length - 1}
          value={index}
          onChange={(e) => setIndex(Number(e.target.value))}
        />
        <div className="time-label">{data.time}</div>
      </div>

      {/* Main Board */}
      <Box title="Main Board" value={data.main} />

      {/* Distribution Boards */}
      <div className="db-row">
        <div className="db">
          <Box title="DB-1" value={data.db1} />
          <div className="loads">
            <Box title="Load 1" value={data.db1_l1} />
            <Box title="Load 2" value={data.db1_l2} />
          </div>
        </div>

        <div className="db">
          <Box title="DB-2" value={data.db2} />
          <div className="loads">
            <Box title="Load 1" value={data.db2_l1} />
            <Box title="Load 2" value={data.db2_l2} />
          </div>
        </div>

        <div className="db">
          <Box title="DB-3" value={data.db3} />
          <div className="loads">
            <Box title="Load 1" value={data.db3_l1} />
            <Box title="Load 2" value={data.db3_l2} />
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="legend">
        <span className="green">● Consuming</span>
        <span className="yellow">● Power ON</span>
        <span className="red">● Power OFF</span>
      </div>
    </div>
  );
}
