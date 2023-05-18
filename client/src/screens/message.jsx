import React, { useState, useEffect, Component } from "react";
import { io } from "socket.io-client";
import backendLink from '../settings'

const MessageScreen = ({ token }) => {
  function sendMessage(message, e) {
    e.preventDefault();
    if (message != "") {
      fetch(backendLink+"/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          token: token,
        },
        body: new URLSearchParams({
          message: message,
        }),
      });
      setMessage("");
    }
  }
  const scrollToBottom = () => {
    if (messagesEnd != null) messagesEnd.scrollIntoView({ behavior: "smooth" });
  };
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [messagesEnd, setMessagesEnd] = useState();
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    setSocket(io(backendLink, { auth: { token } }));
    fetch(backendLink+"/messages", {
      method: "GET",
      headers: { token: token },
    })
      .then((res) => res.json())
      .then((data) => setMessages(data));
  }, []);

  useEffect(
    () => {
      if (socket != null){
      socket.on("message", (data) => {
        setMessages([...messages, data]);
      });}
    },
    [socket,messages],
    scrollToBottom()
  );

  return (
    <>
      <div style={styles.messages}>
        {messages.map((message, i) => (
          <div key={"message_" + i.toString()} style={styles.message}>
            {message.username} : {message.message}
          </div>
        ))}
        <div
          style={{ float: "left", clear: "both" }}
          ref={(el) => {
            setMessagesEnd(el);
          }}
        />
      </div>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "90%",
        }}
        onSubmit={(e) => sendMessage(message, e)}
      >
        <input
          autoFocus
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          style={styles.input}
        />
        <button type="submit" style={styles.send}>
          Send
        </button>
      </form>
    </>
  );
};

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

export default MessageScreen;
