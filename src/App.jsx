import { useState } from "react";
import powerData from "./data/powerData.json";

const getStatus = (value, upstreamOn) => {
  if (!upstreamOn) return "red";
  if (value > 0) return "green";
  return "yellow";
};

export default function App() {
  const [timeIndex, setTimeIndex] = useState(0);
  const data = powerData[timeIndex];

  const mainOn = data.main > 0;

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Power Distribution Monitoring</h1>

      {/* Timeline */}
      <div style={styles.timeline}>
        <span>{powerData[0].time}</span>
        <input
          type="range"
          min="0"
          max={powerData.length - 1}
          value={timeIndex}
          onChange={(e) => setTimeIndex(Number(e.target.value))}
          style={{ flex: 1 }}
        />
        <span>{data.time}</span>
      </div>

      <div style={styles.container}>
        {/* SVG WIRES */}
        <svg style={styles.svg}>
          {/* Main → DBs */}
          <line x1="220" y1="160" x2="420" y2="100" stroke="lime" strokeWidth="2"/>
          <line x1="220" y1="160" x2="420" y2="220" stroke="gold" strokeWidth="2"/>
          <line x1="220" y1="160" x2="420" y2="340" stroke="lime" strokeWidth="2"/>

          {/* DB1 → Loads */}
          <line x1="620" y1="100" x2="820" y2="80" stroke="lime" strokeWidth="2"/>
          <line x1="620" y1="100" x2="820" y2="130" stroke="lime" strokeWidth="2"/>

          {/* DB2 → Loads */}
          <line x1="620" y1="220" x2="820" y2="200" stroke="lime" strokeWidth="2"/>
          <line x1="620" y1="220" x2="820" y2="250" stroke="lime" strokeWidth="2"/>

          {/* DB3 → Loads */}
          <line x1="620" y1="340" x2="820" y2="320" stroke="lime" strokeWidth="2"/>
          <line x1="620" y1="340" x2="820" y2="370" stroke="lime" strokeWidth="2"/>
        </svg>

        {/* MAIN BOARD */}
        <Board
          title="Main Board"
          power={`${data.main} kW`}
          status={getStatus(data.main, true)}
          top={120}
          left={20}
        />

        {/* DBs */}
        <Board title="DB-1" power={`${data.db1} kW`} status={getStatus(data.db1, mainOn)} top={60} left={360}/>
        <Board title="DB-2" power={`${data.db2} kW`} status={getStatus(data.db2, mainOn)} top={180} left={360}/>
        <Board title="DB-3" power={`${data.db3} kW`} status={getStatus(data.db3, mainOn)} top={300} left={360}/>

        {/* LOADs */}
        <Load name="DB1 Load 1" value={data.db1_load1} top={50} />
        <Load name="DB1 Load 2" value={data.db1_load2} top={110} />

        <Load name="DB2 Load 1" value={data.db2_load1} top={170} />
        <Load name="DB2 Load 2" value={data.db2_load2} top={230} />

        <Load name="DB3 Load 1" value={data.db3_load1} top={290} />
        <Load name="DB3 Load 2" value={data.db3_load2} top={350} />
      </div>

      {/* LEGEND */}
      <div style={styles.legend}>
        <span style={{ color: "lime" }}>● Operational</span>
        <span style={{ color: "gold" }}>● Idle</span>
        <span style={{ color: "red" }}>● Critical</span>
      </div>
    </div>
  );
}

/* COMPONENTS */

const Board = ({ title, power, status, top, left }) => (
  <div style={{ ...styles.board, top, left }}>
    <h4>{title}</h4>
    <p>{power}</p>
    <span style={{ ...styles.dot, background: status }} />
  </div>
);

const Load = ({ name, value, top }) => (
  <div style={{ ...styles.load, top }}>
    {name}
    <br />
    {value} kW
  </div>
);

/* STYLES */

const styles = {
  page: {
    background: "#0f172a",
    minHeight: "100vh",
    padding: 20,
    color: "#e5e7eb",
    fontFamily: "Arial",
  },
  title: {
    marginBottom: 20,
  },
  timeline: {
    display: "flex",
    gap: 10,
    marginBottom: 20,
  },
  container: {
    position: "relative",
    height: 450,
  },
  svg: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  board: {
    position: "absolute",
    background: "#1e293b",
    padding: 16,
    borderRadius: 8,
    width: 180,
  },
  load: {
    position: "absolute",
    left: 760,
    width: 160,
    background: "#1e293b",
    padding: 10,
    borderRadius: 6,
  },
  dot: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 10,
    height: 10,
    borderRadius: "50%",
  },
  legend: {
    marginTop: 20,
    display: "flex",
    gap: 20,
  },
};
