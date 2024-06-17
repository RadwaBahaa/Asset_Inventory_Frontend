// src/components/Footer.js

import React from "react";
import { Layout } from "antd";

const { Footer } = Layout;

const FooterComponent = () => {
  return (
    <Footer
      style={{
        textAlign: "center",
      }}
    >
      Supply Chain ©{new Date().getFullYear()} Created by GIS Track
    </Footer>
  );
};

export default FooterComponent;