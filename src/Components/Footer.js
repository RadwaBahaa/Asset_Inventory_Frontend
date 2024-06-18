import React from "react";
import { Layout } from "antd";

const { Footer } = Layout;

const FooterComponent = () => {
  return (
    <Footer
      style={{
        display: "flex",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        height:"4%",
      }}
    >
      Supply Chain ©{new Date().getFullYear()} Created by GIS Track
    </Footer>
  );
};

export default FooterComponent;