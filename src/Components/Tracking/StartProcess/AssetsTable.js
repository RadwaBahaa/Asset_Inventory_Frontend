import React, { useEffect, useState } from "react";
import { Table, InputNumber, Button, message, Pagination, Tooltip } from "antd";
import { ReloadOutlined } from "@ant-design/icons";

const initialData = [
  {
    key: "1",
    id: "001",
    name: "Asset 1",
    initialAvailableQuantity: 10,
    availableQuantity: 10,
    quantity: 0,
  },
  {
    key: "2",
    id: "002",
    name: "Asset 2",
    initialAvailableQuantity: 5,
    availableQuantity: 5,
    quantity: 0,
  },
  {
    key: "3",
    id: "003",
    name: "Asset 3",
    initialAvailableQuantity: 8,
    availableQuantity: 8,
    quantity: 0,
  },
  {
    key: "4",
    id: "004",
    name: "Asset 4",
    initialAvailableQuantity: 3,
    availableQuantity: 3,
    quantity: 0,
  },
];

const AssetsTable = ({ setSelectAssets, startProcessDisabled, selectedWarehouse, selectAssets, setProcessData, setSelectedWarehouse }) => {
  const [data, setData] = useState(initialData);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const selectedRows = selectedRowKeys.map((key) =>
      data.find((item) => item.key === key)
    );
    const filteredRows = selectedRows.filter((row) => row.quantity > 0);
    console.log("Selected rows with quantity > 0:", filteredRows);
    setSelectAssets(filteredRows);
  }, [selectedRowKeys, data]);

  const handleQuantityChange = (key, value) => {
    const newData = data.map((item) => {
      if (item.key === key) {
        const newAvailableQuantity = item.initialAvailableQuantity - value;

        if (value > item.initialAvailableQuantity) {
          message.error("Quantity not available in stock");
          return { ...item, quantity: item.quantity };
        } else {
          return { ...item, quantity: value, availableQuantity: newAvailableQuantity };
        }
      }
      return item;
    });
    setData(newData);
  };

  const handleStartProcess = () => {
    const newProcessEntry = {
      WarehouseName: selectedWarehouse,
      assets: selectAssets,
    };
    setProcessData((prevData) => [...prevData, newProcessEntry]);
    setSelectedWarehouse(null);
  };

  const handleReset = (key) => {
    const newData = data.map((item) => {
      if (item.key === key) {
        return { ...item, quantity: 0, availableQuantity: item.initialAvailableQuantity };
      }
      return item;
    });
    setData(newData);

    // Remove the item from selectedRowKeys if it was selected
    setSelectedRowKeys((prevSelectedRowKeys) =>
      prevSelectedRowKeys.filter((selectedKey) => selectedKey !== key)
    );
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
      title: "Available Quantity",
      dataIndex: "availableQuantity",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      render: (_, record) => (
        <InputNumber
          style={{ width: "50%" }}
          min={0}
          max={record.initialAvailableQuantity}
          value={record.quantity}
          onChange={(value) => handleQuantityChange(record.key, value)}
        />
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <Tooltip title="Reset to initial quantity">
          <Button
            type="link"
            icon={<ReloadOutlined />}
            onClick={() => handleReset(record.key)}
          >
            Reset
          </Button>
        </Tooltip>
      ),
    },
  ];

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  return (
    <div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        pagination={false}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0' }}>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          onChange={handlePageChange}
          total={data.length}
        />
        <Button type="primary" onClick={handleStartProcess} disabled={startProcessDisabled}>
          Start Process
        </Button>
      </div>
    </div>
  );
};

export default AssetsTable;
