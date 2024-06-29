import React, { useState, useEffect } from 'react';
import { Divider, Table, Button, InputNumber, Space } from 'antd';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const ReceiverTable = ({ processData, onDelete, onSave }) => {
  const [editingKey, setEditingKey] = useState('');
  const [editedAssets, setEditedAssets] = useState({});
  const [isStartProcessDisabled, setIsStartProcessDisabled] = useState(true);

  useEffect(() => {
    // Check if there is any data in processData to enable/disable the Start Process button
    setIsStartProcessDisabled(processData.length === 0);
  }, [processData]);

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    setEditingKey(record.key);
    const initialEditedAssets = {};
    record.assets.forEach((asset) => {
      initialEditedAssets[asset.key] = asset.quantity;
    });
    setEditedAssets(initialEditedAssets);
  };

  const cancel = () => {
    setEditingKey('');
    setEditedAssets({});
  };

  const handleQuantityChange = (key, value) => {
    if (value < 0) {
      value = 0;
    }
    setEditedAssets({
      ...editedAssets,
      [key]: value,
    });
  };

  const save = (record) => {
    const newData = processData.map((item) =>
      item.key === record.key
        ? {
          ...item,
          assets: item.assets.map((asset) => ({
            ...asset,
            quantity: editedAssets[asset.key] !== undefined ? editedAssets[asset.key] : asset.quantity,
          })),
        }
        : item
    );

    onSave(newData);

    setEditingKey('');
    setEditedAssets({});
  };

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
            <div key={index}>{asset.name}</div>
          ))}
        </div>
      ),
    },
    {
      title: 'Asset Quantity',
      dataIndex: 'assets',
      render: (assets, record) => {
        return isEditing(record) ? (
          <div>
            {assets.map((a, index) => (
              <div key={index}>
                <InputNumber
                  value={editedAssets[a.key] !== undefined ? editedAssets[a.key] : a.quantity}
                  onChange={(value) => handleQuantityChange(a.key, value)}
                  min={0}
                />
              </div>
            ))}
          </div>
        ) : (
          <div>
            {assets.map((a, index) => (
              <div key={index}>{a.quantity}</div>
            ))}
          </div>
        );
      },
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Space>
            <Button type="link" onClick={() => save(record)}>Save</Button>
            <Button type="link" onClick={cancel}>Cancel</Button>
          </Space>
        ) : (
          <Button type="link" disabled={editingKey !== ''} onClick={() => edit(record)}>Edit</Button>
        );
      },
    },
    {
      title: 'Delete',
      dataIndex: 'delete',
      render: (text, record) => (
        <Button type="link" onClick={() => onDelete(record.key)}>Delete</Button>
      ),
    },
  ];

  const tableContainerStyle = {
    maxHeight: '400px', // Adjust the max height as needed
    overflowY: 'auto', // Enable vertical scrolling
  };

  return (
    <div style={tableContainerStyle}>
      <Divider />
      <h3 style={{ textAlign: 'center', marginBottom: '16px' }}>Process Table</h3>
      <Table
        columns={columns}
        dataSource={processData}
        pagination={false}
      />
      <div style={{ textAlign: 'center', marginTop: '16px' }}>
        <Link to="/tracking/viewTracking">
          <Button type="primary" disabled={isStartProcessDisabled}>Start Process</Button>
        </Link>
      </div>
      <br />
    </div>
  );
};

export default ReceiverTable;
