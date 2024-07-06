import React, { useEffect, useState } from "react";
import { Table, InputNumber, Button, message, Pagination, Tooltip } from "antd";
import { ReloadOutlined } from "@ant-design/icons";

const AssetsTable = ({
  assetsData,
  setAssetsData,
  setSelectAssets,
  startProcessDisabled,
  selectedReceiver,
  selectAssets,
  setProcessData,
  setSelectedReceiver,
  setAssetsActivated,
  setStartProcessDisabled,
  setReceiverData,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [resetSelectedData, setResetSelectedData] = useState(false);

  useEffect(() => {
    const selectedRows = selectedRowKeys.map((key) =>
      assetsData.find((item) => item.key === key)
    );
    const filteredRows = selectedRows.filter((row) => row.quantity > 0);
    setSelectAssets(filteredRows);
  }, [selectedRowKeys, assetsData]);

  const handleQuantityChange = (key, value) => {
    const newData = assetsData.map((item) => {
      if (item.key === key) {
        const newAvailableQuantity = item.initialAvailableQuantity - value;

        if (value > item.initialAvailableQuantity) {
          message.error("Quantity not available in stock");
          return { ...item, quantity: item.quantity };
        } else {
          return {
            ...item,
            quantity: value,
            assetQuantity: value,
            availableQuantity: newAvailableQuantity,
          };
        }
      }
      return item;
    });
    setAssetsData(newData);
  };

  const handleStartProcess = () => {
    const newProcessEntry = {
      key: selectedReceiver.properties.id,
      receiverName: selectedReceiver.properties.name,
      assets: selectAssets,
    };
    setProcessData((prevData) => [...prevData, newProcessEntry]);
    // setReceiverData((prevData) =>
    //   prevData.filter(
    //     (item) =>
    //       ![...prevData, newProcessEntry].map((value) => item.key === value.key)
    //   )
    // );
    var newData = assetsData;

    newData.map((item) => {
      if (selectedRowKeys.includes(item.key)) {
        item.quantity = 0;
        item.initialAvailableQuantity = item.availableQuantity;
      }
    });

    console.log(newData);
    setAssetsData(newData);
    setSelectedReceiver(null);
    setSelectedRowKeys([]);
    setSelectAssets([]);
    setResetSelectedData(true);
    setAssetsActivated(false);
    setStartProcessDisabled(true);
  };

  useEffect(() => {
    if (assetsData.length > 0) {
      setResetSelectedData(false);
    }
  }, [selectedRowKeys, assetsData]);

  const handleReset = (key) => {
    const newData = assetsData.map((item) => {
      if (item.key === key) {
        return {
          ...item,
          quantity: 0,
          availableQuantity: item.initialAvailableQuantity,
        };
      }
      return item;
    });
    setAssetsData(newData);
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
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Asset Name",
      dataIndex: "name",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Serial Number",
      dataIndex: "serialNumber",
      render: (text) => <span>{text}</span>,
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
          style={{ width: "100%" }}
          min={0}
          max={record.initialAvailableQuantity}
          value={resetSelectedData ? 0 : record.quantity}
          onChange={(value) => handleQuantityChange(record.key, value)}
          disabled={!selectedRowKeys.includes(record.key)}
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
            style={{ width: "100%" }}
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
    <div style={{ width: "100%" }}>
      {assetsData.length > 0 && (
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={assetsData}
          pagination={false}
        />
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 0",
        }}
      >
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          onChange={handlePageChange}
          total={assetsData.length}
        />
        <Button
          type="primary"
          onClick={handleStartProcess}
          disabled={startProcessDisabled}
          style={{ width: "150px" }}
        >
          Add to Process
        </Button>
      </div>
    </div>
  );
};

export default AssetsTable;
