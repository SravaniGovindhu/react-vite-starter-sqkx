import { useState } from "react";
import "./App.css";

export default function App() {
  // ===== SAMPLE LIVE DATA (replace later from DB/API) =====
  const systemOn = true;

  const boards = [
    {
      id: "DB1",
      load: 85,
      status: "green",
      loads: [
        { id: "L1", power: 32, status: "green" },
        { id: "L2", power: 18, status: "green" }
      ]
    },
    {
      id: "DB2",
      load: 78,
      status: "yellow",
      loads: [{ id: "L3", power: 45, status: "yellow" }]
    },
    {
      id: "DB3",
      load: 62,
      status: "green",
      loads: [
        { id: "L4", power: 28, status: "green" },
        { id: "L5", power: 38, status: "green" },
        { id: "L6", power: 15, status: "green" }
      ]
    }
  ];

  const wireColor = (state) =>
    state === "green" ? "#00e676" : state === "yellow" ? "#ffd600" : "#ff1744";

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Power Distribution Monitoring</h1>

      <div style={styles.canvas}>
        {/* SVG WIRES */}
        <svg width="100%" height="100%" style={styles.svg}>
          {/* Main → DB wires */}
          <line x1="150" y1="300" x2="350" y2="180" stroke={wireColor("green")} strokeWidth="4" />
          <line x1="150" y1="300" x2="350" y2="300" stroke={wireColor("yellow")} strokeWidth="4" />
          <line x1="150" y1="300" x2="350" y2="420" stroke={wireColor("green")} strokeWidth="4" />

          {/* DB → Load wires */}
          <line x1="550" y1="180" x2="760" y2="140" stroke={wireColor("green")} strokeWidth="3" />
          <line x1="550" y1="180" x2="760" y2="200" stroke={wireColor("green")} strokeWidth="3" />

          <line x1="550" y1="300" x2="760" y2="300" stroke={wireColor("yellow")} strokeWidth="3" />

          <line x1="550" y1="420" x2="760" y2="380" stroke={wireColor("green")} strokeWidth="3" />
          <line x1="550" y1="420" x2="760" y2="440" stroke={wireColor("green")} strokeWidth="3" />
          <line x1="550" y1="420" x2="760" y2="500" stroke={wireColor("green")} strokeWidth="3" />
        </svg>

        {/* MAIN BOARD */}
        <div style={{ ...styles.box, left: 40, top: 260 }}>
          <strong>Main Board</strong>
          <p>Power: 480 kW</p>
          <p>Voltage: 415 V</p>
          <span style={styles.dotGreen}></span>
        </div>

        {/* DISTRIBUTION BOARDS */}
        <div style={{ ...styles.box, left: 350, top: 140 }}>
          <strong>Distribution Board 1</strong>
          <p>Load: 85 kW</p>
          <span style={styles.dotGreen}></span>
        </div>

        <div style={{ ...styles.box, left: 350, top: 260 }}>
          <strong>Distribution Board 2</strong>
          <p>Load: 78 kW</p>
          <span style={styles.dotYellow}></span>
        </div>

        <div style={{ ...styles.box, left: 350, top: 380 }}>
          <strong>Distribution Board 3</strong>
          <p>Load: 62 kW</p>
          <span style={styles.dotGreen}></span>
        </div>

        {/* LOADS */}
        <Load x={760} y={110} name="Load 1" power="32 kW" status="green" />
        <Load x={760} y={170} name="Load 2" power="18 kW" status="green" />
        <Load x={760} y={270} name="Load 3" power="45 kW" status="yellow" />
        <Load x={760} y={350} name="Load 4" power="28 kW" status="green" />
        <Load x={760} y={410} name="Load 5" power="38 kW" status="green" />
        <Load x={760} y={470} name="Load 6" power="15 kW" status="green" />
      </div>
    </div>
  );
}

/* ===== LOAD COMPONENT ===== */
function Load({ x, y, name, power, status }) {
  const dot =
    status === "green" ? styles.dotGreen : status === "yellow" ? styles.dotYellow : styles.dotRed;

  return (
    <div style={{ ...styles.boxSmall, left: x, top: y }}>
      <strong>{name}</strong>
      <p>{power}</p>
      <span style={dot}></span>
    </div>
  );
}

/* ===== STYLES ===== */
const styles = {
  page: {
    background: "#0b1220",
    minHeight: "100vh",
    color: "#fff",
    padding: 20
  },
  title: {
    textAlign: "center",
    marginBottom: 20
  },
  canvas: {
    position: "relative",
    height: 600,
    background: "#111a2e",
    borderRadius: 12,
    overflow: "hidden"
  },
  svg: {
    position: "absolute",
    top: 0,
    left: 0
  },
  box: {
    position: "absolute",
    width: 170,
    background: "#1c2740",
    padding: 12,
    borderRadius: 10,
    boxShadow: "0 0 12px rgba(0,0,0,0.5)"
  },
  boxSmall: {
    position: "absolute",
    width: 140,
    background: "#1c2740",
    padding: 10,
    borderRadius: 8
  },
  dotGreen: {
    width: 10,
    height: 10,
    background: "#00e676",
    borderRadius: "50%",
    position: "absolute",
    top: 8,
    right: 8
  },
  dotYellow: {
    width: 10,
    height: 10,
    background: "#ffd600",
    borderRadius: "50%",
    position: "absolute",
    top: 8,
    right: 8
  },
