import React from "react";
import { Layout } from "antd";

const { Footer } = Layout;

const FooterComponent = () => {
  return (
    <Footer
      style={{
        // display: "flex",
        textAlign: "center",
        // justifyContent: "center",
        // alignItems: "center",
        height:"50px",
        padding: "10px",
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        position:'fixed'

      }}
    >
      Supply Chain ©{new Date().getFullYear()} Created by GIS Track
    </Footer>
  );
};

export default FooterComponent;

