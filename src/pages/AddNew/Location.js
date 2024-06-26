import React, { useState } from "react";
import SubNavbar from "../../Components/NavBars/SubNavbar";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Form } from "antd";
import MapComponent from "../../Components/Location/MapComponent";
import AddLocation from "../../Components/Location/FlootButton";

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
            position: "absolute",
            top: "1rem",
            right: "1rem",
            zIndex: 1000, // Increase z-index to ensure they are in front of the map
          }}
        >
          {/* Search bar */}
          <Input
            placeholder="Search location..."
            onChange={handleSearchChange}
            style={{
              padding: "0.5rem",
              marginRight: "1rem",
              width: "400px",
              borderRadius: "8px",
            }}
          />
          <AddLocation
            style={{
              backgroundColor: "#1890ff",
              // borderColor: "#1890ff",
              padding: "0.5rem 1rem",
              // fontWeight: "bold",
              // borderRadius: "8px",
            }}
          >
          </AddLocation>
        </div>
        <MapComponent style={{ height: "100%" }} /> {/* Set height to 100% to fill remaining space */}
        {/* Form modal */}
        <Modal
          title="Add New Location"
          visible={isFormModalVisible}
          onCancel={() => setIsFormModalVisible(false)}
          footer={[
            <Button type="primary" onClick={handleFormSubmit}>
              Submit Location
            </Button>,
          ]}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '50px',
              backgroundColor: '#f0f2f5',
              borderRadius: '10px',
              height: '350px',
            }}
          >
            <div
              style={{
                width: '85%',
                height: '330px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                borderRadius: '10px',
                padding: '10px',
                backgroundColor: 'white',
              }}
            >
              <Form layout="vertical">
                <Form.Item label="Location Name">
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleFormInputChange}
                  />
                </Form.Item>
                <Form.Item label="Address">
                  <Input
                    name="address"
                    value={formData.address}
                    onChange={handleFormInputChange}
                  />
                </Form.Item>
              </Form>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}