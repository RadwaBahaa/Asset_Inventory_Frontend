import React from "react";
import { Table } from "antd";

const AssetTable = (props) => {
  const { assetsData, selectedRowKeys, setSelectedRowKeys } = props;

  const onSelectChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "assetID",
      key: "assetID",
    },
    {
      title: "Asset Name",
      dataIndex: "assetName",
      key: "assetName",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "50%",
    },
    {
      title: "Category Name",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];

  return (
    <div id="assetsTable">
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={assetsData}
        pagination={false}
      />
    </div>
  );
};

export default AssetTable;
