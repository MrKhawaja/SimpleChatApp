import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import MessageScreen from "./screens/message";
import SelectUserScreen from "./screens/selectuser";
function App() {
  const [token, setToken] = useState("");
  useEffect(() => {
    const tok = localStorage.getItem("token");
    if (tok != "" && tok != null) {
      setToken(tok)
    }
  }, []);
  return (
    <div style={styles.main}>
      <div style={styles.form}>
        {token == "" ? <SelectUserScreen setToken={setToken} /> : <MessageScreen token={token}  />}
      </div>
    </div>
  );
}

const styles = {
  main: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(to right, #5f2c82, #49a09d)",
  },
  form: {
    height: "40rem",
    width: "30rem",
    background: "rgba(0, 0, 0, 0.3)",
    borderRadius: "0.5rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    background: "#00000069",
    color: "white",
    padding: ".4rem",
    display: "block",
    width: "80%",
    marginBottom: "1rem",
    fontSize: "1.2rem",
  },
  send: {
    fontSize: "1.2rem",
    display: "block",
    background: "rgb(165 45 255)",
    borderRadius: "0.5rem",
    padding: ".4rem",
    width: "50%",
    cursor: "pointer",
  },
  messages: {
    height: "25rem",
    width: "80%",
    padding: "0.8rem",
    overflowY: "scroll",
    background: "#00000069",
    marginBottom: "1rem",
  },
  message: {
    color: "white",
    fontSize: "1.2rem",
  },
};

export default App;
