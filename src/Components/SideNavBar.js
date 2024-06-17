// src/components/SideNavbar.js
import React from "react";
import { Layout, Menu,Select,theme,Breadcrumb} from "antd";

import {
  ShoppingCartOutlined,
  FileDoneOutlined,
  NodeIndexOutlined,
  PushpinOutlined,
  TeamOutlined,
  AreaChartOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Sider } = Layout;

const items2 = [
  {
    key: "sub1",
    icon: <AreaChartOutlined />,
    label: <Link to="/dashboard">Dashboard</Link>,
  },
  {
    key: "sub2",
    icon: <ShoppingCartOutlined />,
    label: "Items",
    children: [
      { key: "5", label: "Assets" },
      { key: "6", label: "Categories" },
    ],
  },
  {
    key: "sub3",
    icon: <PushpinOutlined />,
    label: "Location",
  },
  {
    key: "sub4",
    icon: <NodeIndexOutlined />,
    label: "Tracking",
    children: [
      { key: "9", label: "Start progress" },
      { key: "10", label: "View" },
    ],
  },
  {
    key: "sub5",
    icon: <TeamOutlined />,
    label: "Members",
  },
  {
    key: "sub6",
    icon: <FileDoneOutlined />,
    label: "Reports",
  },
];

const SideNavbar = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <>
     <Sider
            style={{
              background: colorBgContainer,
              
            }}
            width={200}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{
                height: "100%",
              }}
              items={items2}/>
    </Sider>
    </>
  );
};

export default SideNavbar;