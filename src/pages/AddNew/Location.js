import React, { useState } from "react";
import SubNavbar from "../../Components/NavBars/SubNavbar";
import {
  DownOutlined,
  EditOutlined,
  PlusOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Menu } from "antd";

import MapComponent from "../../Components/Location/MapComponent";
import { Modal, Form, Input } from "antd"; // Import necessary components for form

export default function Location() {
  const [isFormModalVisible, setIsFormModalVisible] = useState(false); // State for form visibility
  const [formData, setFormData] = useState({ name: "", address: "" }); // State for form data

  const handleSearchChange = (event) => {
    // Implement search logic here based on your map component's capabilities
    console.log("Search term:", event.target.value); // Example logging for now
  };

  const handleFormSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    // Process form data (e.g., validation, API call to add location)
    console.log("Submitted form data:", formData);
    setIsFormModalVisible(false); // Close the form modal after submission
  };

  const handleFormInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <SubNavbar
        title="Add New Location"
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
      <div style={{ width: "100%", height: "540px", position: "relative" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end", // Align buttons to the right
            position: "absolute",
            top: "1rem",
            right: "1rem",
            zIndex: 100,
          }}
        >
          {/* Search bar */}
          <input
            type="text"
            placeholder="Search location..."
            onChange={handleSearchChange}
            style={{ flex: 1, padding: "0.5rem", marginRight: "1rem" }}
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsFormModalVisible(true)}>
            Add Location
          </Button>
        </div>
        <MapComponent style={{ height: "100%" }} /> {/* Set height to 100% to fill remaining space */}
        {/* Form modal */}
        <Modal
          title="Add New Location"
          visible={isFormModalVisible}
          onCancel={() => setIsFormModalVisible(false)}
          footer={[
            <Button type="primary" onClick={handleFormSubmit}>
              Add Location
            </Button>,
          ]}
        >
          <Form layout="vertical">
            <Form.Item label="Name">
              <Input name="name" value={formData.name} onChange={handleFormInputChange} />
            </Form.Item>
            <Form.Item label="Address">
              <Input name="address" value={formData.address} onChange={handleFormInputChange} />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
}
