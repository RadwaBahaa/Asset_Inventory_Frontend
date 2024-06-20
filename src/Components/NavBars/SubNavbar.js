import React from 'react';
import { Layout, Button } from 'antd';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Header } = Layout;

const SubNavbar = ({ title, editButtonLabel, addButtonLabel, addButtonPath, editButtonPath }) => {
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
          style={{ fontSize: 30, fontWeight: 'bold', color: '#212529' }}
        >
          {title}
        </div>
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <Link to={editButtonPath}>
          <Button type="primary" icon={<EditOutlined />}>
            {editButtonLabel}
          </Button>
        </Link>
        <Link to={addButtonPath}>
          <Button type="primary" icon={<PlusOutlined />}>
            {addButtonLabel}
          </Button>
        </Link>
      </div>
    </Header>
  );
};

export default SubNavbar;