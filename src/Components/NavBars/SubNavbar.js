import React from "react";
import { Layout, Button } from "antd";
import { Link } from "react-router-dom";

const { Header } = Layout;

const SubNavbar = ({
  title,
  editButtonLabel,
  addButtonLabel,
  addButtonPath,
  editButtonPath,
}) => {
  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#D2E7F9", // Adjust the background color as needed
        boxShadow: "0px 1px 10px lightgray",
        height: "60px",
        zIndex: 999,
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <div className="demo-logo" />
        <div style={{ fontSize: 20, fontWeight: "bold", color: "#212529" }}>
          {title}
        </div>
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        <Link to={editButtonPath}>
          <Button type="primary" style={{ width: "140px" }}>
            {editButtonLabel}
          </Button>
        </Link>
        <Link to={addButtonPath}>
          <Button type="primary" style={{ width: "140px" }}>
            {addButtonLabel}
          </Button>
        </Link>
      </div>
    </Header>
  );
};

export default SubNavbar;
