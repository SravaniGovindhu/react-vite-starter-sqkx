import React from "react";
import "./App.css";

function App() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to Zoho Catalyst</h1>

      <p style={styles.text}>
        Your Vite + React application has been deployed successfully.
      </p>

      <div style={styles.card}>
        <h2>Deployment Status</h2>
        <p>✅ Build Successful</p>
        <p>✅ Page Loaded</p>
      </div>

      <footer style={styles.footer}>
        <p>Powered by Vite + React</p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f6f8",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
  },
  heading: {
    color: "#2c3e50",
    marginBottom: "10px",
  },
  text: {
    color: "#555",
    marginBottom: "20px",
    fontSize: "16px",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "20px 30px",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  footer: {
    marginTop: "30px",
    fontSize: "14px",
    color: "#888",
  },
};

export default App;
