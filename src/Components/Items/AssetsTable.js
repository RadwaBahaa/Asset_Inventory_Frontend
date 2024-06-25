import React from "react";
import { Table } from "antd";

const AssetTable = (props) => {
  const { assetsData } = props;

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
      width: "40%",
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
    <div>
      <Table
        rowSelection={{
          type: "checkbox",
          alignText: "center",
        }}
        columns={columns}
        dataSource={assetsData}
        pagination={false}
      />
    </div>
  );
};

export default AssetTable;
