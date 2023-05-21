import React from "react";

const Message = ({ message, self }) => {
  if (self)
    return (
      <div
        class={"d-md-flex flex-row-reverse align-self-end"}
        style={{
          marginBottom: "8px",
          borderRadius: "5px",
          marginTop: "16px",
          background: "var(--bs-white)",
          display: "flex",
          maxWidth: "95%",
          position: "relative",
          paddingTop: "5px",
          paddingRight: "10px",
          paddingBottom: "11px",
          paddingLeft: "14px",
          marginRight: "6px",
        }}
      >
        <div
          className={
            "bs-icon-sm bs-icon-rounded bs-icon-primary d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block bs-icon"
          }
          style={{
            paddingBottom: "0px",
            marginBottom: "8px",
            paddingTop: "0px",
            marginTop: "4px",
            marginRight: "6px",
            width:0,
            height:0
          }}
        />
        <h5
          class={"mb-0 mt-1"}
          style={{ wordWrap: "break-word", maxWidth: "98%", fontSize: "1rem" }}
        >
          {message.message}
        </h5>
      </div>
    );
  else {
    return (
      <div
        style={{
          paddingRight: "14px",
          marginBottom: "8px",
          borderRadius: "5px",
          paddingLeft: "6px",
          marginTop: "16px",
          background: "var(--bs-white)",
          display: "flex",
          maxWidth: "95%",
          marginLeft: "6px",
          position: "relative",
        }}
      >
        <div
          className={
            "bs-icon-sm bs-icon-rounded bs-icon-primary d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block bs-icon"
          }
          style={{
            paddingBottom: "0px",
            marginBottom: "8px",
            paddingTop: "0px",
            marginTop: "4px",
            marginRight: "6px",
          }}
        />
        <h5
          className={"mb-0 mt-1"}
          style={{ wordWrap: "break-word", maxWidth: "90%", fontSize: "1rem" }}
        >
          {message.message}
        </h5>
        <p
          className={"text-white"}
          style={{
            position: "absolute",
            fontSize: "0.7rem",
            marginRight: "0px",
            marginBottom: "0px",
            marginLeft: "-5px",
            marginTop: "-18px",
          }}
        >
          {message.username}
        </p>
      </div>
    );
  }
};

export default Message;
