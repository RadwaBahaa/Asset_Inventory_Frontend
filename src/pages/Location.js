import React, { useState } from "react";
import SubNavbar from "../Components/NavBars/SubNavbar";
import {
  DownOutlined,
  EditOutlined,
  PlusOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Menu } from "antd";
import LocationTable from "../Components/Location/Table";
import MapComponent from "../Components/Location/MapComponent";
import MapList from "../Components/Location/MapList";

export default function Location() {
  const [activeComponent, setActiveComponent] = useState("Location");
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleFilterMenuClick = (e) => {
    console.log("Clicked on filter:", e.key);
  };

  const handleServiceAreaClick = () => {
    if (selectedLocation) {
      // Code to create service area
      console.log(`Creating service area for ${selectedLocation}`);
    } else {
      console.log("No location selected");
    }
  };

  const filterMenu = (
    <Menu onClick={handleFilterMenuClick} defaultValue={"All"}>
      <Menu.Item key="byCategory">All</Menu.Item>
      <Menu.Item key="byPrice">Suppliers</Menu.Item>
      <Menu.Item key="byPrice">Warehouses</Menu.Item>
      <Menu.Item key="byPrice">Stores</Menu.Item>
    </Menu>
  );

  return (
    // <MapComponent />
    <div>
      <SubNavbar
        title="Locations"
        editButtonLabel={
          <>
            <EditOutlined />
            <span style={{ marginLeft: "8px" }}>Edit Asset</span>
          </>
        }
        addButtonLabel={
          <>
            <PlusOutlined />
            <span style={{ marginLeft: "8px" }}>Add Location</span>
          </>
        }
      />

      <div
        style={{
          marginTop: "16px",
          marginLeft: "24px",
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <Dropdown overlay={filterMenu} placement="bottomLeft">
          <Button>
            <FilterOutlined />
            Filter
            <DownOutlined />
          </Button>
        </Dropdown>
        <Button onClick={handleServiceAreaClick}>
          <FilterOutlined />
          Service Area
        </Button>
      </div>

      {activeComponent === "List" && <LocationTable />}
      {activeComponent === "Location" && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "16px",
            paddingLeft: "24px",
          }}
        >
          <div style={{ flex: 1, marginRight: "16px" }}>
            <MapList />
          </div>
          <div
            style={{
              width: "65%",
              height: "400px",
              marginTop: "3%",
              marginLeft: "5%",
            }}
          >
            <MapComponent />
          </div>
        </div>
      )}
    </div>
  );
}
