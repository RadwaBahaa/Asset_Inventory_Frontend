import React, { useState } from "react";
import SubNavbar from "../../Components/NavBars/SubNavbar";
<<<<<<< HEAD
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Form } from "antd";
import MapComponent from "../../Components/Location/MapComponent";
import AddLocation from "../../Components/Location/FlootButton";
=======
import { EditOutlined, PlusOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Form, Tooltip, Dropdown, Menu, message } from "antd";
import MapComponent from "../../Components/AddNew/AddLocation/MapComponent";
>>>>>>> 02b465c7238b8cd72f4eca9d23b26c729a596928

export default function Location() {
  const [isFormModalVisible, setIsFormModalVisible] = useState(false); // State for form visibility
  const [formData, setFormData] = useState({ name: "", address: "" }); // State for form data
  const [drawnPoints, setDrawnPoints] = useState([]); // State for storing drawn points
  const [selectedPoint, setSelectedPoint] = useState(null); // State for currently selected point

  const handleSearchChange = (event) => {
    console.log("Search term:", event.target.value);
    // Implement search logic here based on your map component's capabilities
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted form data:", formData);
    console.log("Drawn points:", drawnPoints);
    setIsFormModalVisible(false);
    setFormData({ name: "", address: "" });
    setSelectedPoint(null);
  };

  const handleFormInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleMapPointSelect = (point) => {
    setSelectedPoint(point);
    setIsFormModalVisible(true);
  };

  const handleDrawComplete = (type, coordinates) => {
    message.info(`Draw a point for ${type}`);
    setDrawnPoints([
      ...drawnPoints,
      { type: "Feature", properties: { type }, geometry: { type: "Point", coordinates } },
    ]);
    handleMapPointSelect(coordinates);
  };

  const menu = (
    <Menu onClick={({ key }) => { setSelectedPoint(key); message.info(`Pick a point for new ${key}`); }}>
      <Menu.Item key="supplier">Supplier</Menu.Item>
      <Menu.Item key="warehouse">Warehouse</Menu.Item>
      <Menu.Item key="store">Store</Menu.Item>
    </Menu>
  );

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
<<<<<<< HEAD
            right: "1rem",
            zIndex: 1000, // Increase z-index to ensure they are in front of the map
          }}
        >
          {/* Search bar */}
=======
            right: "calc(18% - 200px)",
            zIndex: 1000,
          }}
        >
>>>>>>> 02b465c7238b8cd72f4eca9d23b26c729a596928
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
<<<<<<< HEAD
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
=======
          <Dropdown
            overlay={menu}
            placement="bottomCenter"
          >
            <Tooltip title="Select Point Type">
              <Button
                type="primary"
                icon={<EnvironmentOutlined />}
                style={{
                  backgroundColor: "#1890ff",
                  borderColor: "#1890ff",
                  padding: "0.5rem 1rem",
                  fontWeight: "bold",
                  borderRadius: "8px",
                  marginLeft: "8px",
                }}
              >
                Add New Point
              </Button>
            </Tooltip>
          </Dropdown>
>>>>>>> 02b465c7238b8cd72f4eca9d23b26c729a596928
        </div>

        <MapComponent onDrawComplete={handleDrawComplete} />

        <Modal
          title="Add New Location"
          visible={isFormModalVisible}
          onCancel={() => {
            setIsFormModalVisible(false);
            setSelectedPoint(null);
          }}
          footer={[
<<<<<<< HEAD
            <Button type="primary" onClick={handleFormSubmit}>
              Submit Location
=======
            <Button key="submit" type="primary" onClick={handleFormSubmit}>
              Submit
>>>>>>> 02b465c7238b8cd72f4eca9d23b26c729a596928
            </Button>,
          ]}
        >
          <div
            style={{
<<<<<<< HEAD
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '50px',
              backgroundColor: '#f0f2f5',
              borderRadius: '10px',
              height: '350px',
=======
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "50px",
              backgroundColor: "#f0f2f5",
              borderRadius: "10px",
              height: "350px",
>>>>>>> 02b465c7238b8cd72f4eca9d23b26c729a596928
            }}
          >
            <div
              style={{
<<<<<<< HEAD
                width: '85%',
                height: '330px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                borderRadius: '10px',
                padding: '10px',
                backgroundColor: 'white',
=======
                width: "85%",
                height: "330px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                borderRadius: "10px",
                padding: "10px",
                backgroundColor: "white",
>>>>>>> 02b465c7238b8cd72f4eca9d23b26c729a596928
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