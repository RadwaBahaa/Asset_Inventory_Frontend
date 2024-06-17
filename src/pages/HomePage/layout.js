import React, { useState } from "react";
import { Layout, Menu, theme, Select, Breadcrumb } from "antd";
import { Link } from 'react-router-dom';
import HeaderNavbar from "../../Components/HeaderNavbar";
import SideNavbar from "../../Components/SideNavBar";
import FooterComponent from "../../Components/Footer";
import { Outlet } from 'react-router-dom';


const { Content } = Layout;
const HomePageLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <>
      <Layout style={{ height: "100vh" }}>
      
        <HeaderNavbar>
          </HeaderNavbar> {/* Call the Header component here */}
        <Layout style={{ flex: 1 }}>
          <SideNavbar/>
          <Layout
            style={{
              padding: "0 24px",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              flex: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Breadcrumb
              style={{
                margin: "16px 0",
              }}
            >
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              style={{
                padding: "0 24px",
                minHeight: 280,
                flex: 1,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Outlet/>
            </Content>
          </Layout>
        </Layout>
        
        <FooterComponent/>
      </Layout>
    </>
  );
};

export default HomePageLayout;