import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Badge, Dropdown, Space, Table } from 'antd';

const items = [
  {
    key: '1',
    label: 'Action 1',
  },
  {
    key: '2',
    label: 'Action 2',
  },
];

const TrackingTable = () => {
  const expandedRowRender = () => {
    const columns = [
      {
        title: 'Store ID',
        dataIndex: 'storeId',
        key: 'storeId',
      },
      {
        title: 'Store Name',
        dataIndex: 'storeName',
        key: 'storeName',
      },
      {
        title: 'Assets',
        key: 'assets',
        render: () => <a href="#assets">View Assets</a>,
      },
    ];

    const expandedData = [
      {
        key: '1',
        storeId: '001',
        storeName: 'Store A',
      },
      {
        key: '2',
        storeId: '002',
        storeName: 'Store B',
      },
      {
        key: '3',
        storeId: '003',
        storeName: 'Store C',
      },
    ];

    return <Table columns={columns} dataSource={expandedData} pagination={false} />;
  };

  const columns = [
    {
      title: 'Field',
      dataIndex: 'field',
      key: 'field',
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      width: '55%',
    },
  ];

  const data = [
    {
      key: '1',
      field: 'Process ID',
      value: 'Screen',
    },
    {
      key: '2',
      field: 'Total Process Assets Number',
      value: 'iOS',
    },
    {
      key: '3',
      field: 'Starting Process Date',
      value: '2024-07-04',
    },
    {
      key: '4',
      field: 'Receiver Data',
      value: '500',
    },
  ];

  // Render the table with conditional expandable rows
  return (
    <Table
      columns={columns}
      expandable={{
        expandedRowRender: (record) => (record.key === '1' || record.key === '2' || record.key === '3' ? null : expandedRowRender()),
        rowExpandable: (record) => !(record.key === '1' || record.key === '2' || record.key === '3'),
      }}
      dataSource={data}
      pagination={false}
      size="small"
    />
  );
};

export default TrackingTable;
