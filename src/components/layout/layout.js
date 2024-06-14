import React, { useState } from "react";
import {
  ShoppingCartOutlined ,
  FileDoneOutlined, 
  NodeIndexOutlined, 
  PushpinOutlined ,
  TeamOutlined,
  AreaChartOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme, Select } from "antd";
import SearchBar from "./SearchBar";
import { Button, Flex } from 'antd';


const { Header, Content, Footer, Sider } = Layout;
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
const items2 = [
  {
    key: 'sub1',
    icon: <AreaChartOutlined />,
    label: 'Dashboard',
  
  },
  {
    key: 'sub2',
    icon: <ShoppingCartOutlined />,
    label: 'Items',
    children: [
      { key: '5', label: 'Assets' },
      { key: '6', label: 'Categories' },
    
    ]
  },
  {
    key: 'sub3',
    icon: <PushpinOutlined />,
    label: 'Location',

},
{
  key: 'sub4',
  icon: <NodeIndexOutlined />,
  label: 'Tracking',
  children: [
    { key: '9', label: 'Start progress' },
    { key: '10', label: 'View' },

]
},
{
  key: 'sub5',
  icon: <TeamOutlined />,
  label: 'Members',

},
{
  key: 'sub6',
  icon: <FileDoneOutlined />,
  label: 'Reports',

},
];

const CustomLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <>
      <Layout style={{ height: "100vh" }}>
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
            <SearchBar /> {/* Moved SearchBar here with the margin style */}
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
            items={[
              ...items1,
      //         {
      //           key: "searchBar",
      //           label: (
      //             <div style={{ marginLeft: 100 }}>
      //               <SearchBar /> {/* Apply the margin style to the SearchBar */}
      //             </div>
      //           ),
      //         },
            ]}
          />
        </Header>
        <Layout style={{ flex: 1 }}>
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
              items={items2}
            />
          </Sider>
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
              Content
            </Content>
          </Layout>
        </Layout>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Supply Chain ©{new Date().getFullYear()} Created by GIS Track
        </Footer>
      </Layout>
    </>
  );
};

export default CustomLayout;
