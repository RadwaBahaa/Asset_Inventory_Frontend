import React from "react";
import { Layout, Menu, theme } from "antd";
import { Link } from "react-router-dom";
import {
  ShoppingCartOutlined,
  FileDoneOutlined,
  NodeIndexOutlined,
  PushpinOutlined,
  TeamOutlined,
  AreaChartOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

const items = [
  // Define menu items with keys, icons, labels, and optional children for submenus.
  {
    key: "Dashboard",
    icon: <AreaChartOutlined />,
    label: <Link to="/">Dashboard</Link>,
  },
  {
    key: "Items",
    icon: <ShoppingCartOutlined />,
    label: "Items",
    children: [
      { key: "Assets", label: <Link to="/items/assets">Assets</Link> },
      {
        key: "Categories",
        label: <Link to="/items/categories">Categories</Link>,
      },
    ],
  },
  {
    key: "Location",
    icon: <PushpinOutlined />,
    label: <Link to="/location">Location</Link>,
  },
  {
    key: "Tracking",
    icon: <NodeIndexOutlined />,
    label: "Tracking",
    children: [
      {
        key: "Start progress",
        label: <Link to="/tracking/startProgress">Start progress</Link>,
      },
      {
        key: "View tracking",
        label: <Link to="/tracking/viewTracking">View tracking</Link>,
      },
    ],
  },
  {
    key: "Members",
    icon: <TeamOutlined />,
    label: <Link to="/members">Members</Link>,
  },
  {
    key: "Reports",
    icon: <FileDoneOutlined />,
    label: <Link to="/reports">Reports</Link>,
  },
];

const SideNavbar = () => {
  // Use theme token for dynamic styling.
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Sider
      style={{
        background: colorBgContainer,
      }}
      width={200}
    >
      <Menu
        mode="inline" // Set menu mode to inline.
        defaultSelectedKeys={["Dashboard"]} // Set default selected key.
        style={{
          height: "100%",
        }}
        items={items} // Use defined menu items.
      />
    </Sider>
  );
};

export default SideNavbar;
