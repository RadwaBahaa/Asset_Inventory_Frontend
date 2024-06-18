import React from "react";
import { Layout, theme } from "antd";
import TopNavbar from "../../../components/NavBars/TopNavbar";
import SideNavbar from "../../../components/NavBars/SideNavBar";
import FooterComponent from "../../../components/Footer";
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
        <TopNavbar /> {/* Top navigation bar component */}
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
