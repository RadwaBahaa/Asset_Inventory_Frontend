import React from 'react';
import { CommentOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';
const AddLocation = () => (
  <>
   
    <FloatButton.Group
      trigger="hover"
      type="primary"
      style={{
        right: 94,
        
      }}
      icon={<CustomerServiceOutlined />}
    >
      <FloatButton />
      <FloatButton icon={<CommentOutlined />} />
    </FloatButton.Group>
  </>
);
export default AddLocation ;