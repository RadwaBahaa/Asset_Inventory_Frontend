import React from "react";
import { Card, Form, Input, InputNumber, Select, Button } from "antd";
import "../CSS/AddCompanyAssetForm.css";

const { TextArea } = Input;

const AddCompanyAssetForm = (props) => {
  const { categories, setAssetData, form } = props;

  const onFinish = (values) => {
    const { name, category, price, description } = values;

    // Prepare payload for POST request
    const newAsset = {
      assetName: name,
      categoryID: category,
      price: price,
      description: description ?? null,
    };

    setAssetData(newAsset);
  };

  return (
    <div className="asset_container">
      <Card bordered={false} className="asset_card">
        <Form layout="vertical" onFinish={onFinish} form={form}>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input the name!",
              },
            ]}
          >
            <Input placeholder="Enter asset name" />
          </Form.Item>
          <Form.Item>
            <div className="flex-between">
              <Form.Item
                label="Category"
                name="category"
                rules={[
                  {
                    required: true,
                    message:
                      categories.length > 0
                        ? "Please select a category!"
                        : "No categories found! Please add a category first.",
                  },
                ]}
                className="form-item-half"
              >
                <Select placeholder="Select a category">
                  {categories.map((category) => (
                    <Select.Option
                      key={category.categoryID}
                      value={category.categoryID}
                    >
                      {category.categoryName}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="Price"
                name="price"
                rules={[
                  {
                    required: true,
                    message: "Please input the price!",
                  },
                ]}
                className="form-item-half"
              >
                <InputNumber
                  placeholder="Enter asset price"
                  className="form-item-full"
                  min={0}
                  formatter={(value) => `${value}`}
                  parser={(value) => value.replace("$", "")}
                />
              </Form.Item>
            </div>
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                message: "Please input the description!",
              },
            ]}
          >
            <TextArea rows={4} placeholder="Enter asset description" />
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

export default AddCompanyAssetForm;
