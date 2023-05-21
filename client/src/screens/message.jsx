import React, { useState, useEffect, Component } from "react";
import { io } from "socket.io-client";
import backendLink from "../settings";
import Message from "../components/message";
import { useJwt } from "react-jwt"

const MessageScreen = ({ token,user }) => {
  function sendMessage(message, e) {
    e.preventDefault();
    if (message != "") {
      fetch(backendLink + "/messages", {
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
  const { decodedToken, isExpired } = useJwt(token);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [messagesEnd, setMessagesEnd] = useState();
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    
    setSocket(io(backendLink, { auth: { token } }));
    fetch(backendLink + "/messages", {
      method: "GET",
      headers: { token: token },
    })
      .then((res) => res.json())
      .then((data) => setMessages(data));
  }, []);

  useEffect(
    () => {
      if (socket != null) {
        socket.on("message", (data) => {
          setMessages([...messages, data]);
        });
      }
    },
    [socket, messages],
    scrollToBottom()
  );

  return (
    <div
      className={"container chat-container d-flex flex-column align-items-start  "}
      style={{
        // backgroundImage: "url(/assets/img/chat-background.svg)",
        background: "var(--bs-indigo)",
        backgroundSize:"contain",
        width: "369px",
        paddingLeft: "0px",
        paddingRight: "0px",
        marginTop: "71px",
        paddingTop: "10px",
      }}
    >



    <div id={"messages-display"} className={"d-flex flex-column align-items-start justify-content-md-start "}
        style={{
          width: "100%",
          height: "550px",
          background: "rgba(0, 0, 0, 0)",
          color: "var(--bs-dark)",
          display: "flex",
          overflowX: "hidden",
          overflowY:"scroll"
        }} >
        {messages.map((message, i) => (
        <Message message={message} self={message.username == user.username} key={"message_" + i.toString()} />
      ))}        
        <div
          style={{ float: "left", clear: "both" }}
          ref={(el) => {
            setMessagesEnd(el);
          }}
        />
      </div>
      <form
        onSubmit={(e) => sendMessage(message, e)}
        style={{
          minWidth: "100%",
          width: "100%",
          background: "rgba(0,0,0,0)",
          marginTop: "1px",
          display: "flex",
          height: "40px",
        }}
      >
        <input
          autoFocus
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={"form-control"}
          type={"text"}
          style={{ display: "block", outline: "none",borderRadius:"0px" }}
        />
        <button
          className={"btn btn-primary"}
          type={"submit"}
          style={{ display: "block",borderRadius:"0px" }}
        >
          &gt;
        </button>
      </form>
    </div>
  );
};

export default MessageScreen;
