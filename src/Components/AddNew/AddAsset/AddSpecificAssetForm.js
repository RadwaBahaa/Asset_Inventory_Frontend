import React from "react";
import { Card, Form, Input, InputNumber, Select, Button } from "antd";
import "./AddAssetForm/CSS/AddCompanyAssetForm.css";

const AddSpecificAssetForm = (props) => {
  const { assetList, setAssetData, form, id } = props;

  const onFinish = (values) => {
    const { asset, serialNumber, count } = values;
    const newAsset = {
      assetID: asset,
      serialNumber: serialNumber,
      count: count,
    };
    setAssetData(newAsset);
  };

  return (
    <div className="asset_container">
      <Card bordered={false} className="asset_card">
        <Form layout="vertical" onFinish={onFinish} form={form} disabled={!id}>
          <Form.Item
            label="Asset Name"
            name="asset"
            rules={[
              {
                required: true,
                message: "Please select the asset name!",
              },
            ]}
          >
            <Select placeholder="Select asset name">
              {assetList &&
                assetList.map((asset) => (
                  <Select.Option key={asset.assetID} value={asset.assetID}>
                    {asset.assetName}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Serial Number"
            name="serialNumber"
            rules={[
              {
                required: true,
                message: "Please input the serial number!",
              },
            ]}
          >
            <Input placeholder="Enter serial number" />
          </Form.Item>
          <Form.Item
            label="Count"
            name="count"
            rules={[
              {
                required: true,
                message: "Please input the count!",
              },
            ]}
          >
            <InputNumber
              placeholder="Enter count"
              className="form-item-full"
              min={0}
            />
          </Form.Item>
          <Form.Item className="button-container">
            <Button type="primary" htmlType="submit" className="button">
              Add Asset
            </Button>
            <Button htmlType="reset" className="reset-button">
              Reset
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AddSpecificAssetForm;
