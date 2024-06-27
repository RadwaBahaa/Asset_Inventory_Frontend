import { FilterOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Radio, Select, Slider } from "antd";
import { useState } from "react";

const LocationSetting = (props) => {
  const { setSearchBy, setSearch, selectedItem, setServiceAreaData } = props;
  const [selectedType, setSelectedType] = useState("");
  const [startServiceArea, setStartServiceArea] = useState(false);

  const handleServiceAreaClick = () => {
    setStartServiceArea(!startServiceArea);
  };

  const onChangeType = (e) => {
    setSelectedType(e.target.value);
  };

 const onFinish = (values) => {
   // Set default values if fields are empty
   const transformedValues = {
     ...values,
     range: values.range || 5,
     route_type: values.route_type || "balanced",
     traffic: values.traffic || "free_flow",
   };

   if (values.avoid && values.avoid.length > 0) {
     transformedValues.avoid = values.avoid.join("|");
   }

   setServiceAreaData(transformedValues);
 };

 const onFinishFailed = (errorInfo) => {
   console.log("Failed:", errorInfo);
 };


  return (
    <div style={{ display: "flex", gap: "16px", flexDirection: "column" }}>
      <Input.Search
        addonBefore={
          <Select
            defaultValue="All"
            dropdownStyle={{ width: 150 }}
            onSelect={setSearchBy}
          >
            <Select.Option value="All">All</Select.Option>
            <Select.Option value="Supplier">Supplier</Select.Option>
            <Select.Option value="Warehouse">Warehouse</Select.Option>
            <Select.Option value="Store">Store</Select.Option>
          </Select>
        }
        placeholder="Location Search"
        allowClear
        onSearch={(value) => setSearch(value)}
        onChange={(e) => {
          if (e.target.value === "") setSearch("");
        }}
        className="search"
        style={{ backgroundColor: "white", width: "100%" }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "16px",
        }}
      >
        <Button onClick={handleServiceAreaClick} style={{ width: "100%" }}>
          <FilterOutlined />
          Service Area
        </Button>
        <Button>
          <FilterOutlined />
          Location Allocation
        </Button>
      </div>
      {startServiceArea && (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <Form
            name="serviceArea"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <div style={{ display: "flex", flexDirection: "row", gap: "16px" }}>
              <Form.Item
                name="type"
                label="Type"
                rules={[
                  {
                    required: true,
                    message: "Please select the type",
                  },
                ]}
              >
                <Radio.Group onChange={onChangeType}>
                  <Radio.Button value="distance">Distance</Radio.Button>
                  <Radio.Button value="time">Time</Radio.Button>
                </Radio.Group>
              </Form.Item>

              <Form.Item name="range" label="Range" style={{ flex: 1 }}>
                <Slider
                  step={5}
                  style={{ width: "100%" }}
                  disabled={selectedType === ""}
                  min={5}
                  max={selectedType === "time" ? 120 : 100}
                />
              </Form.Item>
            </div>
            <Form.Item name="route_type" label="Route Type">
              <Select defaultValue="balanced">
                <Select.Option value="balanced">Balanced</Select.Option>
                <Select.Option value="short">Short</Select.Option>
                <Select.Option value="less_maneuvers">
                  Less Maneuvers
                </Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="traffic" label="Traffic">
              <Select defaultValue="free_flow">
                <Select.Option value="free_flow">Free Flow</Select.Option>
                <Select.Option value="approximated">Approximated</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="avoid" label="Avoid">
              <Checkbox.Group>
                <Checkbox value="tolls:1">Tolls</Checkbox>
                <Checkbox value="ferries">Ferries</Checkbox>
                <Checkbox value="highways">Highways</Checkbox>
              </Checkbox.Group>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" disabled={!selectedItem}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </div>
  );
};

export default LocationSetting;
