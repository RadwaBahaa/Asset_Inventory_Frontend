import React, { useState } from 'react';
import { Tooltip, Table, Button } from 'antd';

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

  const data = [{
    key: 'stores',
    field: 'Stores',
    value: storesData.length,
  },
  {
    key: 'wareHouses',
    field: 'WareHouses',
    value: warehousesData.length,
  },
  {
    key: 'supplires',
    field: 'Supplires',
    value: suppliersData.length,
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
