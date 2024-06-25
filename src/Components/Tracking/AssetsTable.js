import React, { useEffect, useState } from "react";
import { Table, InputNumber, Button } from "antd";

const initialData = [
  {
    key: "1",
    id: "001",
    name: "Asset 1 ",
    quantity: 0,
  },
  {
    key: "2",
    id: "002",
    name: "Asset 2",
    quantity: 0,
  },
  {
    key: "3",
    id: "003",
    name: "Asset 3",
    quantity: 0,
  },
  {
    key: "4",
    id: "004",
    name: "Asset 4",
    quantity: 0,
  },
];

const AssetsTable = ({ setSelectAssets, deleteAsset }) => {
  const [data, setData] = useState(initialData);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  useEffect(() => {
    const selectedRows = selectedRowKeys.map((key) =>
      data.find((item) => item.key === key)
    );
    const filteredRows = selectedRows.filter((row) => row.quantity > 0);
    console.log("Selected rows with quantity > 0:", filteredRows);
    setSelectAssets(filteredRows);
  }, [selectedRowKeys, data]);

  const handleQuantityChange = (key, value) => {
    const newData = data.map((item) =>
      item.key === key ? { ...item, quantity: value } : item
    );
    setData(newData);
  };

  const handleDelete = (key) => {
    deleteAsset(key);
    setData(data.filter((item) => item.key !== key));
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys);
    },
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Asset Name",
      dataIndex: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      render: (_, record) => (
        <InputNumber
          style={{ width: "50%" }}
          min={0}
          onChange={(value) => handleQuantityChange(record.key, value)}
        />
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <Button type="primary" danger onClick={() => handleDelete(record.key)}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        pagination={false} // Optional: Remove pagination if not needed
      />
    </div>
  );
};

export default AssetsTable;
