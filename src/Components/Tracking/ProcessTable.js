import React from 'react';
import { Divider, Table, Button } from 'antd';

const ProcessTable = ({ processData, onDelete }) => {
  const columns = [
    {
      title: 'Warehouse Name',
      dataIndex: 'WarehouseName',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Assets',
      dataIndex: 'assets',
      render: (assets) => (
        <div>
          {assets.map((asset, index) => (
            <div key={index}>
              {asset.name}
            </div>
          ))}
        </div>
      ),
    },
    {
      title: 'Asset Quantity',
      dataIndex: 'assets',
      render: (assets) => (
        <div>
          {assets.map((asset, index) => (
            <div key={index}>
              {asset.quantity}
            </div>
          ))}
        </div>
      ),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => (
        <span>
          <Button type="link" onClick={() => console.log('Edit:', record)}>Edit</Button>
          <Divider type="vertical" />
          <Button type="link" onClick={() => onDelete(record.key)}>Delete</Button>
        </span>
      ),
    },
  ];

  return (
    <div>
      <Divider />
      <h3 style={{ textAlign: 'center', marginBottom: '16px' }}>Process Table</h3>
      <Table
        columns={columns}
        dataSource={processData}
        pagination={false} // Optional: Remove pagination if not needed
      />
    </div>
  );
};

export default ProcessTable;
