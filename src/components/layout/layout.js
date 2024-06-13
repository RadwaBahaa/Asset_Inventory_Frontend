import React, { useState } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Select } from 'antd';
import SearchBar from './SearchBar';


const { Header, Content, Footer, Sider } = Layout;
const items1 = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}));
const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
  const key = String(index + 1);
  return {
    key,
    icon: React.createElement(icon),
    label: `subnav ${key}`,
    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});
const CustomLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={{ height: '100vh' }}>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
        }}

      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          // items={items1}
          style={{
            direction:'rtl',
            flex: 1,
            minWidth: 0,
            alignItems: 'end'
          }}
          items={[
            {
              key: 'searchBar',
              label: <SearchBar />, // Integrate SearchBar into the Menu
            },
            ...items1
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
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{
              height: '100%',
            }}
            items={items2}
          />
        </Sider>
        <Layout
          style={{
            padding: '0 24px',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',

            }}
          >
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              padding: '0 24px',
              minHeight: 280,
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default CustomLayout;