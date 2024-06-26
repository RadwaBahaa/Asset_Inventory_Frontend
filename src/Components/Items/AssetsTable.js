import React from "react";
import { Table, Input, Button } from "antd";

const AssetTable = ({ assetsData, editingKey, setEditingKey, saveEdit, handleInputChange, deleteAsset }) => {
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
      render: (text, record) =>
        editingKey === record.key ? (
          <Input
            value={record.assetName}
            onChange={(e) => handleInputChange(record.key, "assetName", e.target.value)}
          />
        ) : (
          text
        ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text, record) =>
        editingKey === record.key ? (
          <Input
            value={record.price}
            onChange={(e) => handleInputChange(record.key, "price", e.target.value)}
          />
        ) : (
          text
        ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "40%",
      render: (text, record) =>
        editingKey === record.key ? (
          <Input
            value={record.description}
            onChange={(e) => handleInputChange(record.key, "description", e.target.value)}
          />
        ) : (
          text
        ),
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
      render: (text, record) => (
        <div style={{ display: "flex" }}>
          {editingKey === record.key ? (
            <>
              <Button type="primary" onClick={() => saveEdit(record.key)}>
                Save
              </Button>
              <Button type="primary" danger ghost onClick={() => setEditingKey("")}>
                Cancel
              </Button>
            </>
          ) : (
            <Button type="primary" ghost onClick={() => setEditingKey(record.key)}>
              Edit
            </Button>
          )}
          <Button type="primary" danger ghost onClick={() => deleteAsset(record.key)}>
            Delete
          </Button>
        </div>
      ),
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