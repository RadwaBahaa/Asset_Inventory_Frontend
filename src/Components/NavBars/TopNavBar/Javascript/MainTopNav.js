import React, { useState, useEffect } from "react";
import { Layout, Dropdown, Space, Avatar } from "antd";

import { Link, useLocation } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import "../CSS/TopNavBar.css";

const TopNavBar = () => {
  const { Header } = Layout;
  const location = useLocation();
  const [activeDropdown, setActiveDropdown] = useState("");
  const user = [
    {
      label: <Link to="/user/viewprofile">View Profile</Link>,
      key: "viewprofile",
    },
    { label: <Link to="/user/settings">Settings</Link>, key: "settings" },
    { type: "divider" },
    { label: "Signout", key: "signout" },
  ];

  // Determine which dropdown should be active based on the current path
  useEffect(() => {
    const path = location.pathname.split("/")[2];
    if (path) {
      if (["viewprofile", "settings"].includes(path)) {
        setActiveDropdown("user");
      } else {
        setActiveDropdown(""); // No active dropdown for other paths
      }
    } else {
      setActiveDropdown(""); // No active dropdown for other paths
    }
  }, [location.pathname]);

  return (
    <>
      <Header className="header">
        <div className="first-div">
          <Link to="/" className="CompanyName">
            Company Name
          </Link>
         
        </div>
        <div>
          
            
          
          <Dropdown
            overlayClassName="dropdown-menu"
            menu={{ items: user }}
            className={`dropdown ${
              activeDropdown === "user" ? "dropdown-active" : ""
            }`}
          >
            <Link onClick={(e) => e.preventDefault()}>
              <Space>User</Space>
              <Avatar size="large" icon={<UserOutlined />} className="avatar" />
            </Link>
          </Dropdown>
        </div>
      </Header>
    </>
  );
};

export default TopNavBar;
