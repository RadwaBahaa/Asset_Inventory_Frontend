import React from "react";
import { Layout, Menu, theme, Select } from "antd";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";

const { Header } = Layout;
const addNewOptions = [
  { value: "assets", label: <Link to="/addNew/assets">Assets</Link> },
  {
    value: "categories",
    label: <Link to="/addNew/categories">Categories</Link>,
  },
  { value: "requests", label: <Link to="/addNew/requests">Requests</Link> },
  { value: "location", label: <Link to="/addNew/location">Location</Link> },
];
const user = [
  {
    value: "viewprofile",
    label: <Link to="/user/viewprofile">View Profile</Link>,
  },
  { value: "settings", label: <Link to="/user/settings">Settings</Link> },
  { value: "signout", label: "Signout" },
];
const alert = [
  {
    value: "purchaserequests",
    label: <Link to="/alert/purchaserequests">Purchase Requests</Link>,
  },
  { value: "messages", label: <Link to="/alert/messages">Messages</Link> },
];

const items = [
  {
    key: "User",
    label: <Select defaultValue="User" options={user} style={{ width: 100 }} />,
  },
  {
    key: "Alert",
    label: (
      <Select defaultValue="Alert" options={alert} style={{ width: 100 }} />
    ),
  },
  {
    key: "addNew",
    label: (
      <Select
        defaultValue="Add New"
        options={addNewOptions}
        style={{ width: 100 }}
      />
    ),
  },
];

const TopNavbar = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="demo-logo" />
          <div
            style={{
              marginLeft: 20,
              fontSize: 20,
              fontWeight: "bold",
              color: "white",
            }}
          >
            Company Name
          </div>
          <div style={{ marginLeft: 50 }}>
            <SearchBar />
          </div>
        </div>

        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          style={{
            direction: "rtl",
            flex: 1,
            minWidth: 0,
            alignItems: "end",
          }}
          items={items}
        />
      </Header>
    </>
  );
};

export default TopNavbar;
