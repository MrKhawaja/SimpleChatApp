import React, { useState, useEffect, Component } from "react";
import backendLink from '../settings'
const LoginScreen=({ setToken })=> {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const login = (e,username, password) => {
    e.preventDefault();
    if (username != "" && password != "") {
      fetch(backendLink + '/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          'username': username.toLowerCase(),
          'password': password
        })
      }).then(res => {
        if (res.ok) { res.text().then(data => { localStorage.setItem('token', data); setToken(data); }); }
        else { setUsername("Invalid Credentials"); setPassword(""); }
      });
    }
  };
  return (
    <section className={"py-4 py-xl-5"}>
      <div className={"container"}>
        <div className={"row mb-5"}>
          <div className={"col-md-8 col-xl-6 text-center mx-auto"}>
            <h2 style={{color:"white"}}>Log in</h2>
            <p></p>
          </div>
        </div>
        <div className={"row d-flex justify-content-center"}>
          <div className={"col-md-6 col-xl-4"}>
            <div className={"card mb-5"}>
              <div
                className={"card-body d-flex flex-column align-items-center"}
                style={{marginTop: "19px", marginBottom: "22px"}}
              >
                <div
                  className={"bs-icon-xl bs-icon-circle bs-icon-primary bs-icon my-4"}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    className={"bi bi-person"}
                  >
                    <path
                      d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"
                    ></path>
                  </svg>
                </div>
                <form className={"text-center"} onSubmit={(e) => login(e,username, password)}>
                  <div className={"mb-3"}>
                    <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                      className={"form-control"}
                      type="text"
                      name="username"
                      placeholder="Username"
                    />
                  </div>
                  <div className={"mb-3"}>
                    <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                      className={"form-control"}
                      type="password"
                      name="password"
                      placeholder="Password"
                    />
                  </div>
                  <div className={"mb-3"}>
                    <button className={"btn btn-primary d-block w-100"} type={"submit"}>
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
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
      margin:'0'
    },
  };
export default LoginScreen;