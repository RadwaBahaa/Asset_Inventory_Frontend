import React from "react";
import { Card, Form, Input, Button, message, Modal } from "antd";
import database from "../../../../../axios/database";
import "../CSS/AddCategoryForm.css";

const { TextArea } = Input;

const AddCategoryForm = () => {
  const [form] = Form.useForm(); // Create form instance

  const onFinish = (values) => {
    const { name, description } = values;

    // Prepare payload for POST request
    const categoryData = {
      categoryName: name,
      description: description ?? "",
    };
    database
      .post("/categories/create", categoryData)
      .then((response) => {
        console.log("Category created:", response.data);
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
    <div className="category_container">
      <Card bordered={false} className="category_card">
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
            <Input placeholder="Enter category name" />
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
            <TextArea rows={4} placeholder="Enter category description" />
          </Form.Item>

          <Form.Item className="button-container">
            <Button type="primary" htmlType="submit" className="button">
              Add Category
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

export default AddCategoryForm;
