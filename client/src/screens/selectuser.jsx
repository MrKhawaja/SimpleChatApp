import React, { useState, useEffect, Component } from "react";
import backendLink from '../settings'
const SelectUserScreen = ({setToken}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const login=(username,password)=> {
        if (username != "" && password!="") {
          fetch(backendLink+'/login', {
            method: 'POST',
            headers:{
              'Content-Type': 'application/x-www-form-urlencoded'
            },    
            body: new URLSearchParams({
                'username': username.toLowerCase(),
                'password': password
            })
        }).then(res => {
          if(res.ok){res.text().then(data => {localStorage.setItem('token',data);setToken(data);})}
          else{setUsername("Invalid Credentials");setPassword("")}
        } )
        }}
    return(
    <>
    <h4 style={styles.message}>Username</h4>
    <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        type="text"
        style={styles.input}
      />
    <h4 style={styles.message}>Password</h4>
    <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="text"
        style={styles.input}
      />
      <button onClick={() => login(username,password)} style={styles.send}>
        Submit
      </button>
    </>
    )

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
      margin:'0'
    },
  };
export default SelectUserScreen;