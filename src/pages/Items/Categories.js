import React from 'react';
import SubNavbar from "../../Components/NavBars/SubNavbar";
import { PrinterOutlined } from '@ant-design/icons';
import { Button, Menu } from 'antd';
import CategorySearchBar from '../../Components/Items/CategorySearchBar';
import CategoryTable from '../../Components/Items/CategoryTable';

export default function Categories() {
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
      <Menu.Item key="byPrice">Price</Menu.Item>
    </Menu>
  );

  return (
    <div>
      <SubNavbar
        title="Categories"
        editButtonLabel="Edit Category"
        addButtonLabel="Add Category"
      />
      <div style={{ marginTop: '16px', marginLeft: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>


        {/* Search Bar */}
        <CategorySearchBar />
        



        {/* Print Button */}
        <Button type="primary" icon={<PrinterOutlined />} size="large">
          Print
        </Button>
      </div><CategoryTable/>
    </div>
  );
}