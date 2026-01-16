import './App.css';

function App() {
  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Power Distribution Monitoring</h1>

      <div style={styles.cardContainer}>
        <div style={styles.card}>
          <h3>Voltage</h3>
          <p style={styles.value}>230 V</p>
        </div>

        <div style={styles.card}>
          <h3>Current</h3>
          <p style={styles.value}>12.5 A</p>
        </div>

        <div style={styles.card}>
          <h3>Power</h3>
          <p style={styles.value}>2.8 kW</p>
        </div>

        <div style={styles.card}>
          <h3>Status</h3>
          <p style={{ ...styles.value, color: "green" }}>Normal</p>
        </div>
      </div>

      <p style={styles.footer}>
        Deployed using <b>Zoho Catalyst (React + Vite)</b>
      </p>
    </div>
  );
}

const styles = {
  page: {
    padding: "30px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f4f6f8",
    minHeight: "100vh"
  },
  title: {
    textAlign: "center",
    marginBottom: "30px"
  },
  cardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px"
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    textAlign: "center"
  },
  value: {
    fontSize: "22px",
    fontWeight: "bold"
  },
  footer: {
    marginTop: "40px",
    textAlign: "center",
    color: "#555"
  }
};

export default App;
