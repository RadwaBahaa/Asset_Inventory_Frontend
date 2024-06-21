import React, { useState } from 'react';
import { Divider, Radio, Table } from 'antd';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Asset Name',
    dataIndex: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
  },
  
];

const data = [
  {
    key: '1',
    id:'001',
    name: 'John Brown',
    quantity: 32,
  },
  {
    key: '2',
    id:'002',
    name: 'Jim Green',
    quantity: 42,
  },
  {
    key: '3',
    id:'003',
    name: 'Joe Black',
    quantity: 32,
  },
  {
    key: '4',
    id:'004',
    name: 'Disabled User',
    quantity: 99,
    
  },
];

const AssetsTable = () => {
  const [selectionType, setSelectionType] = useState('checkbox');

  return (
    <div>
      <Radio.Group style={{ display: 'flex', paddingTop: '20px', paddingLeft: ' 24px' }}
        onChange={({ target: { value } }) => {
          setSelectionType(value);
        }}
        value={selectionType}
      >
        <Radio value="checkbox">Checkbox</Radio>
        <Radio value="radio">Radio</Radio>
      </Radio.Group>

      <Divider />

      <Table
        rowSelection={{
          type: selectionType,
          // Add your rowSelection logic here if needed
        }}
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};

export default AssetsTable;