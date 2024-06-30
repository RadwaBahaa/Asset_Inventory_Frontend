import React from "react";
import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
  ShoppingCartOutlined,
  FileDoneOutlined,
  NodeIndexOutlined,
  PushpinOutlined,
  TeamOutlined,
  AreaChartOutlined,
} from "@ant-design/icons";
import "../CSS/SideNavBar.css";

const { Sider } = Layout;

const items = [
  {
    key: "/",
    icon: <AreaChartOutlined />,
    label: <Link to="/">Dashboard</Link>,
  },
  {
    key: "items",
    icon: <ShoppingCartOutlined />,
    label: "Items",
    children: [
      { key: "/items/assets", label: <Link to="/items/assets">Assets</Link> },
      {
        key: "/items/categories",
        label: <Link to="/items/categories">Categories</Link>,
      },
    ],
  },
  {
    key: "/location",
    icon: <PushpinOutlined />,
    label: "Location",
    children: [
      {
        key: "/location/locationData",
        label: <Link to="/location/locationData">Locations Data</Link>,
      },
      {
        key: "/tracking/viewTracking",
        label: <Link to="/tracking/viewTracking">Locations Visualizations</Link>,
      },
    ],
  },

  {
    key: "tracking",
    icon: <NodeIndexOutlined />,
    label: "Tracking",
    children: [
      {
        key: "/tracking/startProcess",
        label: <Link to="/tracking/startProcess">Start process</Link>,
      },
      {
        key: "/tracking/viewTracking",
        label: <Link to="/tracking/viewTracking">View tracking</Link>,
      },
    ],
  },
  {
    key: "/members",
    icon: <TeamOutlined />,
    label: <Link to="/members">Members</Link>,
  },
  {
    key: "/reports",
    icon: <FileDoneOutlined />,
    label: <Link to="/reports">Reports</Link>,
  },
];

const SideNavbar = () => {
  const location = useLocation();
  const { pathname } = location;

  // Function to find the default open keys
  const getDefaultOpenKeys = (path) => {
    const segments = path.split("/").filter(Boolean);
    if (segments.length > 1) {
      return [`/${segments[0]}/${segments[1]}`];
    } else if (segments.length === 1) {
      return [`/${segments[0]}`];
    }
    return [];
  };

  const defaultOpenKeys = getDefaultOpenKeys(pathname);

  return (
    <Sider className="sider">
      <Menu
        className="menu"
        mode="inline"
        selectedKeys={[pathname]}
        defaultOpenKeys={defaultOpenKeys} // Automatically open the parent menu of the current path
        items={items}
      />
    </Sider>
  );
};

export default SideNavbar;
