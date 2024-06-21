import React, { useState } from 'react';
import { Table, Radio, Divider } from 'antd';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: (text) => <a>{text}</a>,
  },
];

const data = [
  { key: '1', name: 'Warehouse A' },
  { key: '2', name: 'Warehouse B' },
  { key: '3', name: 'Warehouse C' },
  { key: '4', name: 'Warehouse D' },
];

const WarehouseTable = ({ onWarehouseSelect }) => {
  const [selectionType, setSelectionType] = useState('checkbox');

  const handleRadioChange = (e) => {
    setSelectionType(e.target.value);
  };

  const handleCheckboxChange = (selectedRowKeys, selectedRows) => {
    onWarehouseSelect(selectedRows[0]); // Assuming single selection for simplicity
  };

  return (
    <div>
      <Radio.Group
        style={{ marginBottom: '16px' }}
        onChange={handleRadioChange}
        value={selectionType}
      >
        <Radio value="checkbox">Checkbox</Radio>
        <Radio value="radio">Radio</Radio>
      </Radio.Group>

      <Divider />

      <Table
        columns={columns}
        dataSource={data}
        rowSelection={{
          type: selectionType,
          onChange: handleCheckboxChange,
        }}
      />
    </div>
  );
};

export default WarehouseTable;