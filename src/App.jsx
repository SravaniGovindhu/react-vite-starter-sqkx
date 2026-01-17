import { useState } from "react";
import powerData from "./data/powerData.json";

/* ---------- HELPERS ---------- */
const statusColor = (value, upstreamOn = true) => {
  if (!upstreamOn) return "#ef4444"; // red
  if (value > 0) return "#22c55e";   // green
  return "#facc15";                  // yellow
};

/* ---------- COMPONENTS ---------- */
const Card = ({ title, value, status, style }) => (
  <div style={{ ...styles.card, ...style }}>
    <strong>{title}</strong>
    <div style={{ marginTop: 8 }}>{value} kW</div>
    <span style={{ ...styles.dot, background: status }} />
  </div>
);

const Load = ({ name, value, status, top }) => (
  <div style={{ ...styles.load, top }}>
    {name}
    <div>{value} kW</div>
    <span style={{ ...styles.dot, background: status }} />
  </div>
);

/* ---------- MAIN ---------- */
export default function App() {
  const [index, setIndex] = useState(0);
  const d = powerData[index];

  const mainOn = d.main > 0;

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Power Distribution Monitoring</h1>

      {/* TIMELINE */}
      <div style={styles.timeline}>
        <span>{powerData[0].time}</span>
        <input
          type="range"
          min="0"
          max={powerData.length - 1}
          value={index}
          onChange={(e) => setIndex(Number(e.target.value))}
          style={{ flex: 1 }}
        />
        <span>{d.time}</span>
      </div>

      {/* LAYOUT */}
      <div style={styles.canvas}>
        {/* WIRES */}
        <svg style={styles.svg}>
          {/* Main → DBs */}
          <path d="M220 180 C 300 180, 340 100, 420 100" stroke="#22c55e" strokeWidth="3" fill="none"/>
          <path d="M220 180 C 300 180, 340 220, 420 220" stroke="#facc15" strokeWidth="3" fill="none"/>
          <path d="M220 180 C 300 180, 340 340, 420 340" stroke="#22c55e" strokeWidth="3" fill="none"/>

          {/* DB → Loads */}
          {[100,220,340].map((y,i)=>(
            <>
              <path key={i+"a"} d={`M620 ${y} C 700 ${y}, 740 ${y-20}, 820 ${y-20}`} stroke="#22c55e" strokeWidth="3" fill="none"/>
              <path key={i+"b"} d={`M620 ${y} C 700 ${y}, 740 ${y+20}, 820 ${y+20}`} stroke="#22c55e" strokeWidth="3" fill="none"/>
            </>
          ))}
        </svg>

        {/* MAIN */}
        <Card
          title="Main Board"
          value={d.main}
          status={statusColor(d.main)}
          style={{ top: 140, left: 20 }}
        />

        {/* DBs */}
        <Card title="DB-1" value={d.db1} status={statusColor(d.db1, mainOn)} style={{ top: 60, left: 360 }} />
        <Card title="DB-2" value={d.db2} status={statusColor(d.db2, mainOn)} style={{ top: 180, left: 360 }} />
        <Card title="DB-3" value={d.db3} status={statusColor(d.db3, mainOn)} style={{ top: 300, left: 360 }} />

        {/* LOADS */}
        <Load name="DB1 Load 1" value={d.db1_load1} status={statusColor(d.db1_load1, d.db1>0)} top={40} />
        <Load name="DB1 Load 2" value={d.db1_load2} status={statusColor(d.db1_load2, d.db1>0)} top={90} />

        <Load name="DB2 Load 1" value={d.db2_load1} status={statusColor(d.db2_load1, d.db2>0)} top={160} />
        <Load name="DB2 Load 2" value={d.db2_load2} status={statusColor(d.db2_load2, d.db2>0)} top={210} />

        <Load name="DB3 Load 1" value={d.db3_load1} status={statusColor(d.db3_load1, d.db3>0)} top={280} />
        <Load name="DB3 Load 2" value={d.db3_load2} status={statusColor(d.db3_load2, d.db3>0)} top={330} />
      </div>

      {/* LEGEND */}
      <div style={styles.legend}>
        <span style={{ color: "#22c55e" }}>● Operational</span>
        <span style={{ color: "#facc15" }}>● Idle</span>
        <span style={{ color: "#ef4444" }}>● Critical</span>
      </div>
    </div>
  );
}

/* ---------- STYLES ---------- */
const styles = {
  page: {
    background: "linear-gradient(180deg,#020617,#020617,#020617)",
    minHeight: "100vh",
    padding: 20,
    color: "#e5e7eb",
    fontFamily: "Segoe UI, Arial"
  },
  title: {
    marginBottom: 20,
    letterSpacing: 1
  },
  timeline: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 30
  },
  canvas: {
    position: "relative",
    height: 420
  },
  svg: {
    position: "absolute",
    width: "100%",
    height: "100%"
  },
  card: {
    position: "absolute",
    width: 180,
    background: "#0f172a",
    border: "1px solid #1e293b",
    borderRadius: 10,
    padding: 14,
    boxShadow: "0 10px 30px rgba(0,0,0,.4)"
  },
  load: {
    position: "absolute",
    left: 760,
    width: 170,
    background: "#0f172a",
    borderRadius: 8,
    padding: 10,
    border: "1px solid #1e293b"
  },
  dot: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 10,
    height: 10,
    borderRadius: "50%"
  },
  legend: {
    marginTop: 30,
    display: "flex",
    gap: 20
  }
};
