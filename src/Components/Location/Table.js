import React, { useState } from 'react';
import { Divider, Radio, Table } from 'antd';

const columns = [
  {
    title: 'LOCATIONS',
    dataIndex: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'NAME',
    dataIndex: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'DESCREPTION',
    dataIndex: 'address',
  },
  {
    title: 'PATH',
    dataIndex: 'address',
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Disabled User',
    age: 99,
    address: 'Sydney No. 1 Lake Park',
  },
];

const TableComponent = () => {
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

export default TableComponent;