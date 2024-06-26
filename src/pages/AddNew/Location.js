import React, { useEffect, useState } from "react";
import SubNavbar from "../../Components/NavBars/SubNavbar";
import {
  EditOutlined,
  PlusOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import {
  Button,
  Input,
  Modal,
  Form,
  Tooltip,
  Dropdown,
  Menu,
  message,
  Row,
  Col,
} from "antd";
import MapComponent from "../../Components/AddNew/AddLocation/MapComponent";
import database from "../../axios/database";

export default function Location() {
  const [isFormModalVisible, setIsFormModalVisible] = useState(false); // State for form visibility
  const [drawnPoint, setDrawnPoint] = useState({}); // State for storing drawn points
  const [selectedPointType, setSelectedPointType] = useState(""); // State for currently selected point
  const [isDrawingEnabled, setIsDrawingEnabled] = useState(false); // State for enabling/disabling drawing
  const [submitedPoint, setSubmitedPoint] = useState({});
  const [form] = Form.useForm(); // Create form instance

  const handleSearchChange = (event) => {
    console.log("Search term:", event.target.value);
    // Implement search logic here based on your map component's capabilities
  };

  useEffect(() => {
    if (submitedPoint.geometry) {
      database
        .post(`/${selectedPointType}s/create/geojson`, submitedPoint)
        .then((response) => {
          console.log("Point created:", response);
          setDrawnPoint({});
          setSelectedPointType("");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [submitedPoint]);

  const handleFormSubmit = (value) => {
    const { name, address } = value;
    console.log(name);
    // Update the drawn point with form data
    const updatedPoint = {
      ...drawnPoint,
      properties: {
        ...drawnPoint.properties,
        [`${selectedPointType}Name`]: name,
        address: address,
      },
    };
    setSubmitedPoint(updatedPoint);
    setIsFormModalVisible(false);
    form.resetFields();
  };

  const handleCancel = () => {
    setIsFormModalVisible(false);
    setSelectedPointType("");
    setIsDrawingEnabled(false); // Disable drawing when modal is closed
  };

  const handleDrawComplete = (coordinates) => {
    if (isDrawingEnabled) {
      console.log(`Draw a point for ${coordinates}`);
      const point = {
        type: "Feature",
        geometry: { type: "Point", coordinates },
      };
      setDrawnPoint(point);
      setIsFormModalVisible(true);
    }
  };

  const HandleStartDraw = (e) => {
    setSelectedPointType(e.key);
    setIsDrawingEnabled(true); // Enable drawing when a point type is selected
    message.info(`Draw a point for ${e.key}`);
    console.log(e.key);
  };

  const menu = (
    <Menu onClick={HandleStartDraw}>
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
            right: "calc(18% - 200px)",
            zIndex: 1000,
          }}
        >
          <Input
            placeholder="Search location..."
            style={{
              padding: "0.5rem",
              marginRight: "1rem",
              width: "400px",
              borderRadius: "8px",
            }}
            onChange={handleSearchChange}
          />
          <Dropdown overlay={menu} placement="bottomCenter">
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
        </div>

        <MapComponent
          onDrawComplete={handleDrawComplete}
          isDrawingEnabled={isDrawingEnabled}
        />
        {selectedPointType && (
          <Modal
            title="Add New Location"
            visible={isFormModalVisible}
            onCancel={handleCancel}
            footer={null}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "50px",
                backgroundColor: "#f0f2f5",
                borderRadius: "10px",
                height: "350px",
              }}
            >
              <div
                style={{
                  width: "85%",
                  height: "330px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  borderRadius: "10px",
                  padding: "10px",
                  backgroundColor: "white",
                }}
              >
                <Form
                  layout="vertical"
                  onFinish={handleFormSubmit}
                  id="locationForm"
                  form={form}
                >
                  <Form.Item
                    label="Location Name"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Please input the location name!",
                      },
                    ]}
                  >
                    <Input name="name" />
                  </Form.Item>
                  <Form.Item label="Address" name="address">
                    <Input name="address" />
                  </Form.Item>
                  <Row justify="center">
                    <Col>
                      <Button
                        key="submit"
                        type="primary"
                        htmlType="submit"
                        style={{ marginRight: 8 }}
                      >
                        Submit
                      </Button>
                    </Col>
                    <Col>
                      <Button key="cancel" onClick={handleCancel}>
                        Cancel
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
}