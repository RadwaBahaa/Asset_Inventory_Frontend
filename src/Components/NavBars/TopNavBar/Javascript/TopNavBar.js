import React from "react";
import { Layout, Dropdown, Space, Menu, Avatar } from "antd";
import SearchBar from "../../SearchBar";
import { Link } from "react-router-dom";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import "../CSS/TopNavBar.css";

const TopNavBar = () => {
  const { Header } = Layout;

  const addNew = [
    { label: <Link to="/addNew/assets">Assets</Link>, key: "Assets" },
    {
      label: <Link to="/addNew/categories">Categories</Link>,
      key: "Categories",
    },
    { label: <Link to="/addNew/requests">Requests</Link>, key: "Requests" },
    { label: <Link to="/addNew/location">Location</Link>, key: "Location" },
  ];

  const alert = [
    {
      label: <Link to="/alert/purchaserequests">Purchase Requests</Link>,
      key: "purchaserequests",
    },
    { label: <Link to="/alert/messages">Messages</Link>, key: "messages" },
  ];

  const user = [
    {
      label: <Link to="/user/viewprofile">View Profile</Link>,
      key: "viewprofile",
    },
    { label: <Link to="/user/settings">Settings</Link>, key: "settings" },
    { type: "divider" },
    { label: "Signout", key: "signout" },
  ];

  return (
    <>
      <Header className="header">
        <div className="first-div">
          <Link to="/" className="CompanyName">
            Company Name
          </Link>
          <SearchBar />
        </div>
        <div>
          <Dropdown menu={{ items: addNew }} className="dropdown">
            <Link onClick={(e) => e.preventDefault()}>
              <Space>Add New</Space>
            </Link>
          </Dropdown>
          <Dropdown menu={{ items: alert }} className="dropdown">
            <Link onClick={(e) => e.preventDefault()}>
              <Space>Alert</Space>
            </Link>
          </Dropdown>
          <Dropdown menu={{ items: user }} className="dropdown">
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
