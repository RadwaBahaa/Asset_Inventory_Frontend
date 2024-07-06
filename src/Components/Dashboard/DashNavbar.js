import React from "react";
import { Layout, Button } from "antd";
import { Link } from "react-router-dom";

const { Header } = Layout;

const DashNavbar = ({
    title,
    editButtonLabel,
    addButtonLabel,
    addButtonPath,
    editButtonPath,
    username,
}) => {
    return (
        <Header
            style={{
                display: "flex",
                alignItems: "center",
                // justifyContent: "space-between",
                background: "#F5F5F5",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                height: "100px",
                // padding: "0 20px",
                zIndex: 999,
            }}
        >
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                <div style={{ fontSize: 25, fontWeight: "bold", color: "#555", marginTop: "30px", lineHeight: 1 }}>
                    Welcome Back, {username}
                </div>
                <div style={{ fontSize: 14, fontWeight: "normal", color: "#777", margin: "0 0 20px 0", lineHeight: 1 , marginTop: "13px"}}>
                    Explore your analytics and manage your assets efficiently
                </div>
            </div>


            {/* <div style={{ display: "flex", gap: "10px" }}>
        <Link to={editButtonPath}>
          <Button type="primary" style={{ width: "140px", borderRadius: "4px" }}>
            {editButtonLabel}
          </Button>
        </Link>
        <Link to={addButtonPath}>
          <Button type="primary" style={{ width: "140px", borderRadius: "4px" }}>
            {addButtonLabel}
          </Button>
        </Link>
      </div> */}
        </Header>
    );
};

export default DashNavbar;
