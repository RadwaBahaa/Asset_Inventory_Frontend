import React, { useState } from 'react';
import TrackingSubNavbar from '../../Components/NavBars/TrackingSubNavBar';
import { DownOutlined, PlusOutlined, PrinterOutlined, FilterOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, Input, Select } from 'antd';
import StepsComponent from "../../Components/Tracking/ViewTracking/StepsComponent";
// import AssetsSearchBar from '../../Components/Items/AssetsSearchBar';

export default function ViewTracking() {
  const [activeComponent, setActiveComponent] = useState('Location'); // Set default to 'Location'

  const items = [
    { label: "All" },
    { label: "Suppliers" },
    { label: "Warehouses" },
    { label: "Stores" },
  ];

  const [searchValue, setSearch] = useState(''); // State for search input value
  const [searchBy, setSearchBy] = useState('Name'); // State for search by option

  const handleSegmentedChange = (value) => {
    setActiveComponent(value);
  };

  const handleFilterMenuClick = (e) => {
    console.log('Clicked on filter:', e.key);
    // Handle filtering logic based on selected option (e.g., by Category, by Price)
  };

  const filterMenu = (
    <Menu onClick={handleFilterMenuClick}>
      <Menu.Item key="byCategory">Time</Menu.Item>
      <Menu.Item key="byCategory">Cost</Menu.Item>
    </Menu>
  );

  const pageStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  };

  const contentStyle = {
    flex: 1,
    overflowY: 'auto',
    padding: '16px',
  };

  const buttonContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginTop: '16px',
    marginLeft: '24px',
  };

  const footerStyle = {
    background: '#f1f1f1',
    padding: '16px',
    textAlign: 'center',
    zIndex: 1,
    position: 'relative',
  };

  const selectBeforeSearch = (
    <Select
      defaultValue="Search Type"
      dropdownStyle={{ width: 150 }}
      onSelect={value => setSearchBy(value)}
    >
      <Select.Option value="Time" defaultValue>
        Time
      </Select.Option>
      <Select.Option value="Cost">Cost</Select.Option>
    </Select>
  );

  return (
    <div style={pageStyle}>
      <TrackingSubNavbar
        title="View Tracking"
        addButtonLabel={
          <>
            <PlusOutlined />
            <span style={{ marginLeft: '8px' }}>Add Location</span>
          </>
        }
      />
      <div style={contentStyle}>
        <div style={buttonContainerStyle}>
          <Dropdown overlay={filterMenu} placement="bottomLeft">
            <Button icon={<FilterOutlined />} style={{ width: '60px' }}>
              <DownOutlined />
            </Button>
          </Dropdown>
          <Input.Search
            addonBefore={selectBeforeSearch}
            placeholder="Location Search"
            allowClear
            onSearch={(value) => setSearch(value)}
            onChange={(e) =>
              e.target.value === "" ? setSearch(e.target.value) : null
            }
            className="search"
            style={{ backgroundColor: "white", width: "80%" }}
          />
          {/* <AssetsSearchBar /> */}
          {/* <Button type="primary" icon={<PrinterOutlined />} size="large">
            Print
          </Button> */}
        </div>
        <div style={{ marginTop: '16px' }}>
          <StepsComponent />
        </div>
      </div>
    </div>
  );
}
