import React, { useState } from 'react';
import { Divider, Table, Button, Space, Tooltip } from 'antd';
import { UnorderedListOutlined, EnvironmentOutlined } from '@ant-design/icons'; // Import icons

const initialData = [
  {
    key: '1',
    id: 1001,
    placeName: 'John Brown',
    Address: 'Alice Smith',
  },
  {
    key: '2',
    id: 1002,
    placeName: 'Jim Green',
    Address: 'Bob Johnson',
  },
  {
    key: '3',
    id: '1003',
    placeName: 'Joe Black',
    Address: 'Carol Williams',
  },
  {
    key: '4',
    id: 1004,
    placeName: 'Disabled User',
    Address: 'David Brown',
  },
];

const LocationDataTable = () => {
  const [data, setData] = useState(initialData);

  const showAssetsList = () => {
    // Handle logic to show assets list
    console.log('Show Assets List');
  };

  const showLocation = () => {
    // Handle logic to show location
    console.log('Show Location');
  };

  const columns = [
    {
      title: 'ID #',
      dataIndex: 'id',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Name',
      dataIndex: 'placeName',
      width: 250,
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Address',
      dataIndex: 'Address',
      width: 500, // Wider width for Address column
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) => (
        <Space>
          <Tooltip title="Show Assets Table">
            <Button type="link" onClick={showAssetsList}>
              <UnorderedListOutlined />
            </Button>
          </Tooltip>
          <Tooltip title="Show Location">
            <Button type="link" onClick={showLocation}>
              <EnvironmentOutlined />
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Divider />
      <Table
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};

export default LocationDataTable;
