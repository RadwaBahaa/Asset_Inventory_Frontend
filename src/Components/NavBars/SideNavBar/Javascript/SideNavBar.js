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
    key: "locations",
    icon: <PushpinOutlined />,
    label: "Locations",
    children: [
      {
        key: "/locations/descriptive-data",
        label: <Link to="/locations/descriptive-data">Descriptive Data</Link>,
      },
      {
        key: "/locations/geospatial-data",
        label: <Link to="/locations/geospatial-data">Geospatial Data</Link>,
      },
    ],
  },

  {
    key: "tracking",
    icon: <NodeIndexOutlined />,
    label: "Tracking",
    children: [
      {
        key: "/tracking/startprocess",
        label: <Link to="/tracking/startprocess">Start process</Link>,
      },
      {
        key: "/tracking/viewtracking",
        label: <Link to="/tracking/viewtracking">View tracking</Link>,
      },
    ],
  },
  // {
  //   key: "/members",
  //   icon: <TeamOutlined />,
  //   label: <Link to="/members">Members</Link>,
  // },
  // {
  //   key: "/reports",
  //   icon: <FileDoneOutlined />,
  //   label: <Link to="/reports">Reports</Link>,
  // },
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

  const defaultOpenKeys = ["items", "locations", "tracking"];

  return (
    <Sider className="sider">
      <Menu
        className="menu"
        mode="inline"
        selectedKeys={[pathname]}
        defaultOpenKeys={defaultOpenKeys} // Automatically open the parent menu of the current path
        // openKeys={}
        items={items}
      />
    </Sider>
  );
};

export default SideNavbar;
