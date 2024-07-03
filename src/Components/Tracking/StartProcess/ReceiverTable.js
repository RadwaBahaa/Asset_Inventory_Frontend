import React, { useState, useEffect } from "react";
import { Divider, Table, Button, InputNumber, Space, message } from "antd";
import database from "../../../axios/database";

const ReceiverTable = ({
  processData,
  onDelete,
  onSave,
  userRole,
  userID,
  setProcessData,
  setAssetsData,
  assetsData,
}) => {
  const [editingKey, setEditingKey] = useState("");
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
      initialEditedAssets[asset.key] = asset.assetQuantity;
    });
    setEditedAssets(initialEditedAssets);
  };

  const cancel = () => {
    setEditingKey("");
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
              assetQuantity: editedAssets[asset.key],
              availableQuantity:
                asset.originalQuantity - editedAssets[asset.key],
              initialAvailableQuantity:
                asset.originalQuantity - editedAssets[asset.key],
            })),
          }
        : item
    );

    console.log("newData:", newData);
    onSave(newData);

    // Update asset quantities in assetsData
    const updatedAssetsData = assetsData.map((asset) => {
      const editedAsset = newData
        .flatMap((item) => item.assets)
        .find((a) => a.key === asset.key);
      if (editedAsset) {
        console.log("editedAsset:", editedAsset);
        return {
          ...asset,
          assetQuantity: editedAsset.assetQuantity,
          availableQuantity: editedAsset.availableQuantity,
          initialAvailableQuantity: editedAsset.initialAvailableQuantity,
        };
      }
      return asset;
    });
    // console.log("updatedAssetsData:", updatedAssetsData);
    setAssetsData(updatedAssetsData);
    setEditingKey("");
    setEditedAssets({});
  };

  const handleStartProcess = async () => {
    let receiverRole = "";
    if (userRole === "Supplier") {
      receiverRole = "warehouse";
    } else if (userRole === "Warehouse") {
      receiverRole = "store";
    }

    // Prepare data in the required format for API request
    const requestData = {
      [`${receiverRole}Processes`]: processData.map((process) => ({
        [`${receiverRole}ID`]: process.key, // Assuming key is receiverID here
        note: "Start Process Confirmed", // Replace with actual note if needed
        assetShipmentWSts: process.assets.map((asset) => ({
          assetID: asset.key,
          serialNumber: asset.serialNumber,
          quantity: asset.assetQuantity,
        })),
      })),
    };
    console.log("Request data:", requestData);

    await database
      .post(
        `/delivery-process/${userRole}-${receiverRole}/create/${userID}`,
        requestData
      )
      .then((response) => {
        // Handle success (if needed)
        console.log("API response:", response.data);
        message.success("Process started successfully!");
        setProcessData([]);
      })
      .catch((error) => {
        // Handle error
        console.error("Error starting process:", error);
        message.error("Failed to start process. Please try again.");
      });
  };

  const columns = [
    {
      title: "Receiver Name",
      dataIndex: "receiverName",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Assets",
      dataIndex: "assets",
      render: (assets) => (
        <div>
          {assets.map((asset, index) => (
            <div key={index}>{asset.name}</div>
          ))}
        </div>
      ),
    },
    {
      title: "Serial Number",
      dataIndex: "assets",
      render: (assets) => (
        <div>
          {assets.map((asset, index) => (
            <div key={index}>{asset.serialNumber}</div>
          ))}
        </div>
      ),
    },
    {
      title: "Asset Quantity",
      dataIndex: "assets",
      render: (assets, record) => {
        return isEditing(record) ? (
          <div>
            {assets.map((a, index) => (
              <div key={index}>
                <InputNumber
                  value={
                    editedAssets[a.key] !== undefined
                      ? editedAssets[a.key]
                      : a.assetQuantity
                  }
                  onChange={(value) => handleQuantityChange(a.key, value)}
                  min={0}
                  max={a.originalQuantity - a.initialAvailableQuantity}
                />
              </div>
            ))}
          </div>
        ) : (
          <div>
            {assets.map((a, index) => (
              <div key={index}>{a.assetQuantity}</div>
            ))}
          </div>
        );
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Space>
            <Button type="link" onClick={() => save(record)}>
              Save
            </Button>
            <Button type="link" onClick={cancel}>
              Cancel
            </Button>
          </Space>
        ) : (
          <Button
            type="link"
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Button>
        );
      },
    },
    {
      title: "Delete",
      dataIndex: "delete",
      render: (text, record) => (
        <Button type="link" onClick={() => onDelete(record.key)}>
          Delete
        </Button>
      ),
    },
  ];

  const tableContainerStyle = {
    maxHeight: "400px", // Adjust the max height as needed
    overflowY: "auto", // Enable vertical scrolling
  };

  return (
    <div style={tableContainerStyle}>
      <Divider />
      <h3 style={{ textAlign: "center", marginBottom: "16px" }}>
        Process Table
      </h3>
      <Table columns={columns} dataSource={processData} pagination={false} />
      <div style={{ textAlign: "center", marginTop: "16px" }}>
        <Button
          type="primary"
          disabled={isStartProcessDisabled}
          onClick={handleStartProcess}
        >
          Start Process
        </Button>
      </div>
    </div>
  );
};

export default ReceiverTable;
