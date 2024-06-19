import React from "react";
import { Layout, theme } from "antd";

import TopNavBar from "../../../Components/NavBars/TopNavBar/Javascript/TopNavBar";
import SideNavbar from "../../../Components/NavBars/SideNavBar";
import FooterComponent from "../../../Components/Footer";
import RouteConfige from "../../../routes/RouteConfig";
import "../CSS/HomePage.css";

const { Content } = Layout;

export default function HomePage() {
  // Destructuring colorBgContainer and borderRadiusLG from the theme tokens
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
      {/* Main layout container */}
      <Layout className="first-layout">
        <TopNavBar /> {/* Top navigation bar component */}
        {/* Secondary layout to contain SideNavbar and Content */}
        <Layout className="second-layout">
          <SideNavbar /> {/* Side navigation bar component */}
          <Layout
            className="third-layout" // Third layout for the main content area
            style={{
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {/* Main content area */}
            <Content className="content">
              <RouteConfige /> {/* Route configuration component */}
            </Content>
          </Layout>
        </Layout>
        <FooterComponent /> {/* Footer component */}
      </Layout>
    </>
  );
}
