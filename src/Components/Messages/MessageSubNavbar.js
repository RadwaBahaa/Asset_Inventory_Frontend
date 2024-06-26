import React from "react";
import { Layout, Button } from "antd";
import { Link } from "react-router-dom";

const { Header } = Layout;

const MessageSubNavbar = ({
  title,
  
}) => {
  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#D2E7F9", // Adjust the background color as needed
        boxShadow: "0px 1px 5px lightgray",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <div className="demo-logo" />
        <div style={{ fontSize: 30, fontWeight: "bold", color: "#212529" }}>
          {title}
        </div>
      </div>
      
    </Header>
  );
};

export default MessageSubNavbar;
