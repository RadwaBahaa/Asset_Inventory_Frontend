import React, { useState } from 'react';
import SubNavbar from "../../Components/NavBars/SubNavbar";
import { DownOutlined, BarsOutlined, AppstoreOutlined, PrinterOutlined, FilterOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, Space, Segmented } from 'antd';
import AssetsSearchBar from '../../Components/Items/AssetsSearchBar';
import AssetTable from '../../Components/Items/AssetsTable';
import GridView from '../../Components/Items/GridView';

export default function Assets() {
  const [activeComponent, setActiveComponent] = useState('List'); // Default to 'List'

  const items = [
    { label: "All" },
    { label: "Suppliers" },
    { label: "Warehouses" },
    { label: "Stores" },
  ];

  // Generate 24 assets for 6 rows of 4 columns
  const generateAssets = () => {
    const assets = [];
    for (let i = 1; i <= 24; i++) {
      assets.push({
        id: `ID${i}`,  // Use backticks and curly braces for template literals
        name: `Asset Name ${i}`,
        price: `${i * 100}`,  // Use backticks and curly braces for template literals
        description: `This is a detailed description of asset ${i}.`,
        image: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      });
    }
    return assets;
  };

  const assets = generateAssets();

  const menu = (
    <Menu>
      {items.map((item) => (
        <Menu.Item key={item.label}>{item.label}</Menu.Item>
      ))}
    </Menu>
  );

  const handleSegmentedChange = (value) => {
    setActiveComponent(value);
  };

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
        title="Assets"
        editButtonLabel= "Edit Asset"
        addButtonLabel="Add Asset"
        addButtonPath= "/addNew/assets"


      />
      <div style={{ marginTop: '16px', marginLeft: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Filter Button */}
        <Dropdown overlay={filterMenu} placement="bottomLeft">
          <Button icon={<FilterOutlined />} style={{ width: '60px' }}>
           <DownOutlined />
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
          onChange={handleSegmentedChange}
        />

        {/* Print Button */}
        <Button type="primary" icon={<PrinterOutlined />} size="large">
          Print
        </Button>
      </div>

      {/* Conditional rendering based on activeComponent state */}
      {activeComponent === 'List' && <AssetTable />}
      {activeComponent === 'Grid' && <GridView assets={assets} />}
    </div>
  );
}