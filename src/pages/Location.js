import React, { useState, useEffect } from 'react';
import SubNavbar from "../Components/NavBars/SubNavbar";
import { DownOutlined, BarsOutlined, EnvironmentOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, Space, Segmented } from 'antd';
import LocationTable from '../Components/Location/Table'; // Assuming Table.js is renamed to TableComponent.js
import MapComponent from '../Components/Dashboard/MapComponent';
import MapList from '../Components/Location/MapList'; // Importing MapList component

export default function Location() {
  const [activeComponent, setActiveComponent] = useState('Location'); // Set default to 'Location'

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

  const handleSegmentedChange = (value) => {
    setActiveComponent(value);
  };

  return (
    <div>
      <SubNavbar
        title="Locations"
        editButtonLabel={
          <>
            <EditOutlined />
            <span style={{ marginLeft: '8px' }}>Edit Asset</span>
          </>
        }
        addButtonLabel={
          <>
            <PlusOutlined />
            <span style={{ marginLeft: '8px' }}>Add Location</span>
          </>
        }
      />
      <div style={{ marginTop: '16px', marginLeft: '24px', display: 'flex', alignItems: 'center' }}>
        <Dropdown overlay={menu} style={{ marginRight: '16px' }}>
          <Button style={{ width: '20%', textAlign: 'left' }}>
            <Space>
              Locations <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
        <div style={{ marginLeft: '16px' }}>
          <Segmented
            options={[
              {
                value: 'List',
                icon: <BarsOutlined />,
              },
              {
                value: 'Location',
                icon: <EnvironmentOutlined />,
              },
            ]}
            onChange={handleSegmentedChange}
            defaultValue="Location" // Set default value to 'Location'
          />
        </div>
      </div>

      {/* Conditional rendering based on activeComponent state */}
      {activeComponent === 'List' && <LocationTable />}
      {activeComponent === 'Location' && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '16px', paddingLeft: '24px' }}>
          <div style={{ flex: 1, marginRight: '16px' }}>
            <MapList />
          </div>
          <div style={{ width: '65%', height: '400px', marginTop: '3%', marginLeft: '5%' }}>
            <MapComponent />
          </div>
        </div>
      )}
    </div>
  );
}