import React from 'react';
import SubNavbar from "../../Components/NavBars/SubNavbar";
import { DownOutlined, BarsOutlined, AppstoreOutlined, PrinterOutlined, FilterOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, Space, Segmented } from 'antd';
import AssetsSearchBar from '../../Components/NavBars/AssetsSearchBar';

export default function AddAsset() {
  const items = [
    { label: "All" },
    { label: "Suppliers" },
    { label: "Warehouses" },
    { label: "Stores" },
  ];

  const menu = (
    <Menu>
      {items.map((item) => (
        <Menu.Item key={item.label}>{item.label}</Menu.Item>
      ))}
    </Menu>
  );

  const handleFilterMenuClick = (e) => {
    console.log('Clicked on filter:', e.key);
    // Handle filtering logic based on selected option (e.g., by Category, by Price)
  };

  const filterMenu = (
    <Menu onClick={handleFilterMenuClick}>
      <Menu.Item key="byCategory">Category</Menu.Item>
      <Menu.Item key="byPrice">Price</Menu.Item>
    </Menu>
  );

  return (
    <div>
      <SubNavbar
        title="Create Asset"
        editButtonLabel="Edit Assets"
        addButtonLabel="Done"
      />
      <div style={{ marginTop: '16px', marginLeft: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Filter Button */}
        <Dropdown overlay={filterMenu} placement="bottomLeft">
          <Button icon={<FilterOutlined />} style={{ width: '120px' }}>
            Filter <DownOutlined />
          </Button>
        </Dropdown>
        
        {/* Search Bar */}
        <AssetsSearchBar />

        {/* Icons Segmented Control */}
        <Segmented
          options={[
            { value: "List", icon: <BarsOutlined /> },
            { value: "Grid", icon: <AppstoreOutlined /> }
          ]}
        />

        {/* Print Button */}
        <Button type="primary" icon={<PrinterOutlined />} size="large">
          Print
        </Button>
      </div>
    </div>
  );
}
