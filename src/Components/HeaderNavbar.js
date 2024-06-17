import React from "react";
import { Layout, Menu, theme, Select } from "antd";
import SearchBar from "./SearchBar"; // Assuming SearchBar is a separate component
import { Button, Flex } from 'antd';
import { Link } from 'react-router-dom';
// import { UserOutlined } from '@ant-design/icons';
// import { Avatar, Space } from 'antd';

const { Header } = Layout;
const addNewOptions = ["assets", "categories", "requests", "location"]; // Your options
const user = ["view profile", "settings", <Flex gap="small" wrap>
  <Button type="primary">Signout</Button>
</Flex>]; // Your options
const alert = ["purchase requests", "messages"]; // Your options

const items1 = [
 
   { key: "User", label: (
    <Select
     defaultValue="For user"
      options={user.map((option) => ({ value: option, label: option }))}
      style={{ width: 100}} // Adjust width as needed
    />
  ) },


  { key: "Alert", label: (
  <Select
   defaultValue="Alert"
    options={alert.map((option) => ({ value: option, label: option }))}
    style={{ width: 100 }} // Adjust width as needed
  />
) },
  {
    key: "addNew",
    label: (
      <Select
       defaultValue="Add new"
        options={addNewOptions.map((option) => ({ value: option, label: option }))}
        style={{ width: 100 }} // Adjust width as needed
      />
    ),
  },
  
];

const HeaderNavbar = () => {
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
        <div style={{ marginLeft: 20, fontSize: 20, fontWeight: 'bold',color:'white' }}>
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
        items={items1}
      />
    </Header>
    </>
  );
};

export default HeaderNavbar;