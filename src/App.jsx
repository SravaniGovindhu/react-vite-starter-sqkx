import { useState, useEffect, useRef } from "react";

/* ---------- DATA GENERATION ---------- */
const HOURS = Array.from({ length: 25 }, (_, i) => i);

const randomPower = () =>
  HOURS.map(() => Math.random() > 0.2 ? +(Math.random() * 50).toFixed(1) : 0);

/* ---------- COMPONENT ---------- */
export default function App() {
  const [hour, setHour] = useState(12);
  const [hover, setHover] = useState(false);
  const [lines, setLines] = useState([]);

  const mainRef = useRef();
  const dbRefs = useRef([]);
  const loadRefs = useRef([]);

  const data = {
    main: randomPower(),
    dbs: [
      { name: "DB-1", loads: [randomPower(), randomPower()], power: randomPower() },
      { name: "DB-2", loads: [randomPower(), randomPower()], power: randomPower() },
      { name: "DB-3", loads: [randomPower(), randomPower()], power: randomPower() }
    ]
  };

  /* ---------- STATUS ---------- */
  const statusColor = (val) =>
    val > 0 ? "lime" : val === 0 ? "gold" : "red";

  /* ---------- DRAW WIRES ---------- */
  useEffect(() => {
    const newLines = [];

    const mainBox = mainRef.current.getBoundingClientRect();

    dbRefs.current.forEach((db, i) => {
      const dbBox = db.getBoundingClientRect();

      newLines.push({
        x1: mainBox.right,
        y1: mainBox.top + mainBox.height / 2,
        x2: dbBox.left,
        y2: dbBox.top + dbBox.height / 2,
        color: "yellow"
      });

      loadRefs.current
        .filter(l => l.dataset.db === i.toString())
        .forEach(load => {
          const loadBox = load.getBoundingClientRect();
          newLines.push({
            x1: dbBox.right,
            y1: dbBox.top + dbBox.height / 2,
            x2: loadBox.left,
            y2: loadBox.top + loadBox.height / 2,
            color: "lime"
          });
        });
    });

    setLines(newLines);
  }, []);

  return (
    <div style={styles.page}>
      <h1>Power Distribution Monitoring</h1>

      {/* TIMELINE */}
      <div style={styles.timeline}>
        <span>00</span>
        <input
          type="range"
          min="0"
          max="24"
          value={hour}
          onChange={(e) => setHour(+e.target.value)}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{ flex: 1 }}
        />
        <span>{hour}:00</span>
      </div>

      {/* LAYOUT */}
      <div style={styles.layout}>
        {/* MAIN BOARD */}
        <div ref={mainRef} style={styles.board}>
          <h3>Main Board</h3>
          {hover && <p>{data.main[hour]} kW</p>}
          <Dot color={statusColor(data.main[hour])} />
        </div>

        {/* DBs */}
        <div style={styles.column}>
          {data.dbs.map((db, i) => (
            <div
              key={i}
              ref={el => dbRefs.current[i] = el}
              style={styles.board}
            >
              <h4>{db.name}</h4>
              {hover && <p>{db.power[hour]} kW</p>}
              <Dot color={statusColor(db.power[hour])} />
            </div>
          ))}
        </div>

        {/* LOADs */}
        <div style={styles.column}>
          {data.dbs.map((db, i) =>
            db.loads.map((load, j) => (
              <div
                key={`${i}-${j}`}
                ref={el => loadRefs.current.push(el)}
                data-db={i}
                style={styles.load}
              >
                Load {i + 1}.{j + 1}
                {hover && <div>{load[hour]} kW</div>}
                <Dot color={statusColor(load[hour])} />
              </div>
            ))
          )}
        </div>
      </div>

      {/* WIRES */}
      <svg style={styles.svg}>
        {lines.map((l, i) => (
          <line
            key={i}
            x1={l.x1}
            y1={l.y1}
            x2={l.x2}
            y2={l.y2}
            stroke={l.color}
            strokeWidth="3"
          />
        ))}
      </svg>

      {/* LEGEND */}
      <div style={styles.footer}>
        <span style={{ color: "lime" }}>● Consuming</span>
        <span style={{ color: "gold" }}>● Power ON</span>
        <span style={{ color: "red" }}>● Power OFF</span>
      </div>
    </div>
  );
}

/* ---------- DOT ---------- */
const Dot = ({ color }) => (
  <span style={{ ...styles.dot, background: color }} />
);

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
  timeline: {
    display: "flex",
    gap: 10,
    marginBottom: 30
  },
  layout: {
    display: "flex",
    gap: 50
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
    width: 200,
    position: "relative"
  },
  load: {
    background: "#1e293b",
    padding: 12,
    borderRadius: 6,
    width: 200,
    position: "relative"
  },
  dot: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 10,
    height: 10,
    borderRadius: "50%"
  },
  svg: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none"
  },
  footer: {
    marginTop: 40,
    display: "flex",
    gap: 20
  }
};
