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

const CategoriesForm = () => {
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
          label="Description"
          name="description"
        >
          <TextArea rows={4} />
        </Form.Item>
      </Form>
    </>
  );
};

export default CategoriesForm;