import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
} from 'antd';

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const AddAssetForm = () => {
  return (
    <>
      <Form
        layout="vertical"
        style={{
            width: '700px', // Ensure consistent width for the form
            marginLeft: '16px', // Add left margin
            marginTop: '16px' // Add top margin
          }}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input the name!',
            },
          ]}
          
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Category"
          name="category"
          rules={[
            {
              required: true,
              message: 'Please select a category!',
            },
          ]}
        >
          <Select >
            <Select.Option value="category1">Category 1</Select.Option>
            <Select.Option value="category2">Category 2</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Price"
          name="price"
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
        >
          <TextArea rows={4} />
        </Form.Item>
      </Form>
    </>
  );
};

export default AddAssetForm;