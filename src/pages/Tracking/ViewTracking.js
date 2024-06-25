import React, { useState } from 'react';
import TrackingSubNavbar from '../../Components/NavBars/TrackingSubNavBar';
import { DownOutlined, PlusOutlined, PrinterOutlined, FilterOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import StepsComponent from "../../Components/Tracking/StepsComponent";
// import AssetsSearchBar from '../../Components/Items/AssetsSearchBar';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Grid, Paper } from "@mui/material";

export default function ViewTracking() {
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
  
  const handleFilterMenuClick = (e) => {
    console.log('Clicked on filter:', e.key);
    // Handle filtering logic based on selected option (e.g., by Category, by Price)
  };

  const filterMenu = (
    <Menu onClick={handleFilterMenuClick}>
      <Menu.Item key="byCategory">Time</Menu.Item>
      <Menu.Item key="byCategory">Coast</Menu.Item>
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

  const mapContainerStyle = {
    position: 'relative',
    zIndex: 0,
    marginTop: '25px',
  };

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
          {/* <AssetsSearchBar /> */}
          <Button type="primary" icon={<PrinterOutlined />} size="large">
            Print
          </Button>
        </div>
        <div style={{ marginTop: '16px' }}>
          <StepsComponent />
        </div>
        <Grid item xs={12} style={mapContainerStyle}>
          <Paper sx={{ padding: 2, height: "400px" }}>
            <MapContainer
              center={[51.505, -0.09]}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[51.505, -0.09]}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>
          </Paper>
        </Grid>
      </div>
    </div>
  );
}
