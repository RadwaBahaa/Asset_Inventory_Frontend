import React, { useState } from 'react';
import { Tooltip, Table, Button } from 'antd';

const TrackingTable = ({ setCurrentStep, markedForDelivery, markForDelivery }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const handleRowSelectChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const expandedRowRender = (record) => {
    if (record.key === '4') { // Render internal table only for the last row
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
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <Tooltip title={`Start delivery for ${record.storeName}`}>
              <Button
                type="link"
                onClick={() => {
                  markForDelivery(record.storeId);
                  setSelectedRowKeys([]); // Deselect all rows after starting delivery
                }}
                disabled={markedForDelivery.includes(record.storeId)}
              >
                Start Delivery
              </Button>
            </Tooltip>
          ),
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

      const rowSelection = {
        selectedRowKeys,
        onChange: handleRowSelectChange,
      };

      return (
        <Table
          columns={columns}
          dataSource={expandedData}
          pagination={false}
          rowSelection={rowSelection}
        />
      );
    }
    return null; // Return null for other rows to avoid internal table
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
      hasInternalTable: false, // Add a flag to indicate whether the row has an internal table
    },
    {
      key: '2',
      field: 'Total Process Assets Number',
      value: 'iOS',
      hasInternalTable: false,
    },
    {
      key: '3',
      field: 'Starting Process Date',
      value: '2024-07-04',
      hasInternalTable: false,
    },
    {
      key: '4',
      field: 'Starting Process Time',
      value: '10:00',
      hasInternalTable: true, // Set to true for the last row
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        expandable={{
          expandedRowRender,
          rowExpandable: (record) => record.hasInternalTable, // Only show expand icon for rows with internal table
        }}
        pagination={false}
        size='small'
        rowClassName={(record) => (markedForDelivery.includes(record.key) ? 'marked-for-delivery' : '')}
      />
    </div>
  );
};

export default TrackingTable;
