import React, { useState } from 'react';
import { Divider, Radio, Table, Button, Space } from 'antd';

const initialData = [
  {
    key: '1',
    id: 1001,
    vendorName: 'John Brown',
    price: 300,
    requestedBy: 'Alice Smith',
    deliveryDate: '2023-06-21',
  },
  {
    key: '2',
    id: 1002,
    vendorName: 'Jim Green',
    price: 500,
    requestedBy: 'Bob Johnson',
    deliveryDate: '2023-06-22',
  },
  {
    key: '3',
    id: 1003,
    vendorName: 'Joe Black',
    price: 200,
    requestedBy: 'Carol Williams',
    deliveryDate: '2023-06-23',
  },
  {
    key: '4',
    id: 1004,
    vendorName: 'Disabled User',
    price: 1000,
    requestedBy: 'David Brown',
    deliveryDate: '2023-06-24',
  },
];

const RequestsTable = () => {
  const [data, setData] = useState(initialData);
  const [editingKey, setEditingKey] = useState('');
  const [editedData, setEditedData] = useState({});
  const [selectionType, setSelectionType] = useState('checkbox');

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    setEditingKey(record.key);
    setEditedData(record);
  };

  const cancel = () => {
    setEditingKey('');
    setEditedData({});
  };

  const save = (record) => {
    const newData = data.map((item) =>
      item.key === record.key ? editedData : item
    );

    setData(newData);
    setEditingKey('');
    setEditedData({});
  };

  const onDelete = (key) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
  };

  const handleDateChange = (e) => {
    setEditedData({
      ...editedData,
      deliveryDate: e.target.value,
    });
  };

  const columns = [
    {
      title: 'PO #',
      dataIndex: 'id',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Vendor',
      dataIndex: 'vendorName',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
    {
      title: 'Requested By',
      dataIndex: 'requestedBy',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Delivery Date',
      dataIndex: 'deliveryDate',
      render: (text, record) => {
        return isEditing(record) ? (
          <input
            type="date"
            value={editedData.deliveryDate}
            onChange={handleDateChange}
          />
        ) : (
          text
        );
      },
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Space>
            <Button type="link" onClick={() => save(record)}>Save</Button>
            <Button type="link" onClick={cancel}>Cancel</Button>
          </Space>
        ) : (
          <Space>
            <Button type="link" disabled={editingKey !== ''} onClick={() => edit(record)}>Edit</Button>
          </Space>
        );
      },
    },
  ];

  return (
    <div  
    // style={{filter:"blur(0.7px)"}}
    >
      <Radio.Group
        style={{ display: 'flex', paddingTop: '20px', paddingLeft: '24px' }}
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
        pagination={false}
      />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to top, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 70%, rgba(255, 255, 255, 0) 100%)' }}> 
      </div>
    </div>
  );
};

export default RequestsTable;
