import React from "react";
import { Layout } from "antd";
import "../CSS/Footer.css";

const Footer = () => {
  return (
    <Layout className="footer">
      Supply Chain ©{new Date().getFullYear()} Created by GIS Track
    </Layout>
  );
};

export default Footer;
