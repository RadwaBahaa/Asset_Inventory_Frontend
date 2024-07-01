import React, { useState } from "react";
import { Table, Input, Button, Select } from "antd";

const { Option } = Select;

const AssetTable = ({
  assetsData,
  setAssetsData,
  editingKey,
  setEditingKey,
  saveEdit,
  deleteAsset,
  selectedRowKeys,
  setSelectedRowKeys,
  categories,
  setUpdatedAsset,
  updatedAsset,
}) => {
  const [originalData, setOriginalData] = useState({}); // Store original data

  const handleInputChange = async (key, field, value, childValue) => {
    const updatedAssetsData = [...assetsData];
    const editedAssetIndex = updatedAssetsData.findIndex(
      (asset) => asset.key === key
    );
    updatedAssetsData[editedAssetIndex][field] = value;
    setAssetsData(updatedAssetsData);

    if (field === "categoryName") {
      setUpdatedAsset({ ...updatedAsset, childField: childValue });
    } else {
      setUpdatedAsset({ ...updatedAsset, [field]: value });
    }
  };

  const cancelEdit = (key) => {
    setAssetsData((prevData) =>
      prevData.map((asset) =>
        asset.key === key ? { ...asset, ...originalData[asset.key] } : asset
      )
    );
    setEditingKey(""); // Reset editing state
  };

  const startEdit = (record) => {
    setOriginalData(() => ({
      [record.key]: { ...record },
    }));
    setEditingKey(record.key);
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
      render: (text, record) =>
        editingKey === record.key ? (
          <Input
            value={record.assetName}
            onChange={(e) =>
              handleInputChange(record.key, "assetName", e.target.value)
            }
          />
        ) : (
          text
        ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: "10%",
      render: (text, record) =>
        editingKey === record.key ? (
          <Input
            value={record.price}
            onChange={(e) =>
              handleInputChange(record.key, "price", e.target.value)
            }
          />
        ) : (
          text
        ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "30%",
      render: (text, record) =>
        editingKey === record.key ? (
          <Input
            value={record.description}
            onChange={(e) =>
              handleInputChange(record.key, "description", e.target.value)
            }
          />
        ) : (
          text
        ),
    },
    {
      title: "Category Name",
      dataIndex: "categoryName",
      key: "categoryName",
      render: (text, record) =>
        editingKey === record.key ? (
          <Select
            value={record.categoryName}
            onChange={(value) => {
              const category = categories.find(
                (category) => category.categoryName === value
              );
              handleInputChange(
                record.key,
                "categoryName",
                value,
                "categoryID",
                category.categoryID
              );
            }}
          >
            {categories.map((category) => (
              <Option key={category.categoryID} value={category.categoryName}>
                {category.categoryName}
              </Option>
            ))}
          </Select>
        ) : (
          text
        ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <div style={{ display: "flex", gap: "8px" }}>
          {editingKey === record.key ? (
            <>
              <Button type="primary" onClick={() => saveEdit(record.key)}>
                Save
              </Button>
              <Button onClick={() => cancelEdit(record.key)}>Cancel</Button>
            </>
          ) : (
            <>
              <Button
                type="primary"
                ghost
                onClick={() => {
                  startEdit(record);
                }}
              >
                Edit
              </Button>
              <Button
                type="primary"
                danger
                ghost
                onClick={() => deleteAsset(record.key)}
              >
                Delete
              </Button>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <Table
        rowSelection={{
          type: "checkbox",
          selectedRowKeys,
          onChange: setSelectedRowKeys,
        }}
        columns={columns}
        dataSource={assetsData}
        pagination={false}
      />
    </div>
  );
};

export default AssetTable;