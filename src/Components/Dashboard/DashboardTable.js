import React, { useState } from 'react';
import { Tooltip, Table, Button } from 'antd';

const DashboardTable = ({ setCurrentStep, markedForDelivery, markForDelivery }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const handleRowSelectChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'field',
      key: 'field',
    },
    {
      title: 'Address',
      dataIndex: 'value',
      key: 'value',
      width: '55%',
    },
  ];

  const data = [
    {
      key: '1',
      field: 'Process ID',
      value: 'Screen',    },
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

  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        size='small'
      />
    </div>
  );
};

export default DashboardTable;
