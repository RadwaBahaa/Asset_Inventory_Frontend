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

  const save = async (record) => {
    const newData = processData.map((item) =>
      item.key === record.key
        ? {
            ...item,
            assets: item.assets.map((asset) => ({
              ...asset,
              assetQuantity: editedAssets[asset.key],
            })),
          }
        : item
    );

    onSave(newData);

    // Update asset quantities in assetsData
    const updatedAssetsData = assetsData.map((asset) => {
      const totalEditedQuantity = newData
        .flatMap((item) => item.assets)
        .filter((a) => a.id === asset.id)
        .reduce((sum, a) => sum + a.assetQuantity, 0);

      return {
        ...asset,
        initialAvailableQuantity: asset.originalQuantity - totalEditedQuantity,
        availableQuantity: asset.originalQuantity - totalEditedQuantity,
      };
    });
    console.log(updatedAssetsData);
    setAssetsData(updatedAssetsData);
    setEditingKey("");
    setEditedAssets({});
    // if ()
  };

  const handleStartProcess = async () => {
    let receiverRole = "";
    if (userRole === "Supplier") {
      receiverRole = "warehouse";
    } else if (userRole === "Warehouse") {
      receiverRole = "store";
    }
    console.log("receiverRole", receiverRole);
    // Disable button to prevent multiple clicks
    setIsStartProcessDisabled(true);

    // Prepare data in the required format for API request
    const requestData = {
      [`${receiverRole}Processes`]: processData.map((process) => ({
        [`${receiverRole}ID`]: process.key, // Assuming key is receiverID here
        note: "Start Process Confirmed", // Replace with actual note if needed
        assetShipment: process.assets.map((asset) => ({
          assetID: asset.id,
          serialNumber: asset.serialNumber,
          quantity: asset.assetQuantity,
        })),
      })),
    };

    // Make the API call to start the process
    await database
      .post(
        `/delivery-process/${userRole}-${receiverRole}/create/${userID}`,
        requestData
      )
      .then((response) => {
        // Handle success: clear processData and assetsData
        message.success("Process started successfully!");
        setProcessData([]);
        // setAssetsData([]);
      })
      .catch((error) => {
        // Handle error: enable button and show error message
        message.error("Failed to start process. Please try again.");
        setIsStartProcessDisabled(false);
        console.error("Error starting process:", error);
      });
  };

  const getMaxQuantity = (assetID, assetQuantity) => {
    const totalEditedQuantity = processData
      .flatMap((item) => item.assets)
      .filter((a) => a.id === assetID)
      .reduce((sum, a) => sum + a.assetQuantity, 0);

    const assetData = assetsData.find((asset) => asset.id === assetID);
    return assetData.originalQuantity - totalEditedQuantity + assetQuantity;
  };

  var columns = [
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
            <div key={asset.id}>{asset.name}</div>
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
            <div key={asset.id}>{asset.serialNumber}</div>
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
                  max={getMaxQuantity(a.id, a.assetQuantity)}
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
        <Button type="link" onClick={() => onDelete(record)}>
          Delete
        </Button>
      ),
    },
  ];
  // });

  const tableContainerStyle = {
    maxHeight: "400px", // Adjust the max height as needed
  };

  return (
    <div style={tableContainerStyle}>
      <Divider style={{ margin: "10px " }} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: "10px",
          padding: " 10px",
        }}
      >
        <h3 style={{ margin: "0" }}>Process Table</h3>
        <Button
          style={{ margin: "0", width: "15%" }}
          type="primary"
          disabled={isStartProcessDisabled}
          onClick={handleStartProcess}
        >
          Start Process
        </Button>
      </div>
      <Table columns={columns} dataSource={processData} pagination={false} />
    </div>
  );
};

export default ReceiverTable;
