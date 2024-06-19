import React from 'react';
import { Layout, Button } from 'antd';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';

const { Header } = Layout;

const SubNavbar = ({ title, editButtonLabel, addButtonLabel}) => {
  return (
    <Header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#D2E7F9', // Adjust the background color as needed
        // padding: '0 24px',
        marginTop: '30px',
       
       
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <div
          style={{fontSize: 30, fontWeight: 'bold', color: '#212529' }}
        >
          {title}
        </div>
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <Button type="primary" icon={<EditOutlined />}>
        {editButtonLabel}
        </Button>
        <Button type="primary" icon={<PlusOutlined />}>
        {addButtonLabel}
        </Button>
      </div>
    </Header>
  );
};

export default SubNavbar;