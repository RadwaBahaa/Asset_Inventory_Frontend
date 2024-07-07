import React, { useState } from 'react';
import { Table } from 'antd';

const DashboardTable = ({ storesData, warehousesData, suppliersData }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const handleRowSelectChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const columns = [
    {
      title: 'Location Type',
      dataIndex: 'locationType',
      key: 'locationType',
      width: '65%',
    },
    {
      title: 'Count',
      dataIndex: 'count',
      key: 'count',
    },
  ];

  const data = [
    {
      key: 'stores',
      locationType: 'Stores',
      count: '6',
    },
    {
      key: 'warehouses',
      locationType: 'Warehouses',
      count: "3",
    },
    {
      key: 'suppliers',
      locationType: 'Suppliers',
      count: "2",
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
