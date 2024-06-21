import React, { useState } from 'react';
import { Divider, Radio, Table, Button } from 'antd';

const columns = [
  {
    title: 'Warehouse Name',
    dataIndex: 'WarehouseName',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Assets',
    dataIndex: 'AssetsName',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
    render: (text, record) => (
      <span>
        <Button type="link" onClick={() => console.log('Edit:', record)}>Edit</Button>
        <Divider type="vertical" />
        <Button type="link" onClick={() => console.log('Delete:', record)}>Delete</Button>
      </span>
    ),
  },
];

const data = [
  {
    key: '1',
    WarehouseName: 'John Brown',
    AssetsName: 32,
  },
  {
    key: '2',
    WarehouseName: 'Jim Green',
    AssetsName: 42,
  },
  {
    key: '3',
    WarehouseName: 'Joe Black',
    AssetsName: 32,
  },
  {
    key: '4',
    WarehouseName: 'Disabled User',
    AssetsName: 99,
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