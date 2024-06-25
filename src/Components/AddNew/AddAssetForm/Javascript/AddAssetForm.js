import React, { useEffect, useState } from "react";
import {
  Card,
  Form,
  Input,
  InputNumber,
  Select,
  Button,
  message,
  Modal,
} from "antd";
import database from "../../../../axios/database";
import "../CSS/AddAssetForm.css";

const { TextArea } = Input;

const AddAssetForm = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Simulating API call to fetch categories
    database
      .get("/categories/read")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const [form] = Form.useForm(); // Create form instance

  const onFinish = (values) => {
    const { name, category, price, description } = values;

    // Prepare payload for POST request
    const assetData = {
      assetName: name,
      categoryID: category,
      price: price,
      description: description ?? "",
    };
    database
      .post("/assets/create", assetData)
      .then((response) => {
        console.log("Asset created:", response.data);
        // Display success modal
        Modal.success({
          content: response.data,
        });
        form.resetFields();
      })
      .catch((error) => {
        if (error.response) {
          // Server responded with a status other than 200 range
          message.error(`${error.response.data}`);
        } else if (error.request) {
          // Request was made but no response was received
          message.error("Error: No response from the server.");
        } else {
          // Something happened in setting up the request
          message.error(`Error: ${error.message}`);
        }
      });
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
                    message: "Please select a category!",
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

export default AddAssetForm;
