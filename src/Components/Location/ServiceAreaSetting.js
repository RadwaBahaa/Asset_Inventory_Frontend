import { Button, Checkbox, Divider, Form, Radio, Select, Slider } from "antd";
import { useState } from "react";

const ServiceAreaSetting = (props) => {
  const { setServiceAreaData } = props;
  const [selectedServiceAreaType, setSelectedServiceAreaType] = useState("");
  const form = Form.useForm();

  const onFinish = (values) => {
    // Set default values if fields are empty
    setServiceAreaData(null);
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
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onChangeType = (e) => {
    setSelectedServiceAreaType(e.target.value);
  };

  return (
    <div>
      <Divider style={{ marginTop: "4%", marginBottom: "4%" }} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          fontSize: "12px",
          padding: "1%",
          borderRadius: "3%",
        }}
      >
        <Form
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 25 }}
          name="serviceArea"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          size="small"
          //   form={form}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "5px",
              //   marginTop: "10px",
            }}
          >
            <Form.Item
              name="type"
              rules={[
                {
                  required: true,
                  message: "Please select the type",
                },
              ]}
              style={{ marginBottom: "5px" }}
            >
              <Radio.Group onChange={onChangeType}>
                <Radio.Button value="distance">Distance</Radio.Button>
                <Radio.Button value="time">Time</Radio.Button>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              name="range"
              label="Range"
              style={{ marginBottom: 0, paddingBottom: 0, flex: 1 }}
            >
              <Slider
                step={5}
                style={{ width: "100%" }}
                disabled={selectedServiceAreaType === ""}
                min={5}
                max={selectedServiceAreaType === "time" ? 60 : 100}
              />
            </Form.Item>
          </div>
          <Form.Item
            name="route_type"
            label="Route Type"
            style={{ marginBottom: "5px" }}
            labelAlign="left"
          >
            <Select defaultValue="balanced">
              <Select.Option value="balanced">Balanced</Select.Option>
              <Select.Option value="short">Short</Select.Option>
              <Select.Option value="less_maneuvers">
                Less Maneuvers
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="traffic"
            label="Traffic"
            style={{ marginBottom: "5px" }}
            labelAlign="left"
          >
            <Select defaultValue="free_flow">
              <Select.Option value="free_flow">Free Flow</Select.Option>
              <Select.Option value="approximated">Approximated</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="avoid"
            label="Avoid"
            style={{ marginBottom: "10px" }}
            labelAlign="left"
          >
            <Checkbox.Group>
              <Checkbox value="tolls:1">Tolls</Checkbox>
              <Checkbox value="ferries">Ferries</Checkbox>
              <Checkbox value="highways">Highways</Checkbox>
            </Checkbox.Group>
          </Form.Item>
          <Form.Item
            wrapperCol={{ offset: 0 }}
            style={{
              marginBottom: 0,
              paddingBottom: 0,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button size="middle" type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ServiceAreaSetting;
