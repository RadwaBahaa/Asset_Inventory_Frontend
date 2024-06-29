import React, { useEffect, useState } from "react";
import SubNavbar from "../../Components/NavBars/SubNavbar";
import { PlusOutlined, HomeOutlined } from "@ant-design/icons";
import { Button, Divider, message } from "antd";
import AssetTable from "../../Components/Items/AssetsTable";
import AssetSettings from "../../Components/Items/AssetSettings";

import database from "../../axios/database";

export default function Assets() {
  const [assetsData, setAssetsData] = useState([]);
  const [activeComponent, setActiveComponent] = useState("General"); // Default to 'List'
  const [order, setOrder] = useState("byID");
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState("");
  const [editingKey, setEditingKey] = useState(""); // State to track editing asset
  const [originalData, setOriginalData] = useState({}); // Store original data
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const action = (
    <div style={{ display: "flex", gap: "5%" }}>
      <Button type="primary" ghost>
        Edit
      </Button>
      <Button type="primary" danger ghost>
        Delete
      </Button>
    </div>
  );

  const updateAssetInDatabase = async (assetID, updatedData) => {
    try {
      const response = await database.put(
        `/assets/update/${assetID}`,
        updatedData,
        {
          headers: {
            "Content-Type": "application/json", // Ensure Content-Type is set to JSON
          },
        }
      );
      return response.data; // Assume response contains success status
    } catch (error) {
      console.error("Error updating asset:", error);
      return { success: false, error: error.message }; // Return error object
    }
  };

  const saveEdit = async (assetID, updatedData) => {
    try {
      const response = await updateAssetInDatabase(assetID, updatedData);

      if (response.success) {
        const updatedAssetsData = assetsData.map((asset) =>
          asset.assetID === assetID ? { ...asset, ...updatedData } : asset
        );
        setAssetsData(updatedAssetsData);
        setEditingKey(""); // Reset editing state
        message.success("Asset updated successfully");
      } else {
        console.error("Error saving edited asset:", response.error);
        message.error("Error saving asset");
      }
    } catch (error) {
      console.error("Error saving edited asset:", error);
      message.error("Error saving asset");
    }
  };

  const handleInputChange = (key, field, value) => {
    const updatedAssetsData = [...assetsData];
    const editedAssetIndex = updatedAssetsData.findIndex(
      (asset) => asset.key === key
    );
    updatedAssetsData[editedAssetIndex][field] = value;
    setAssetsData(updatedAssetsData);
  };

  const cancelEdit = (key) => {
    const updatedAssetsData = [...assetsData];
    const editedAssetIndex = updatedAssetsData.findIndex(
      (asset) => asset.key === key
    );
    updatedAssetsData[editedAssetIndex] = originalData[key];
    setAssetsData(updatedAssetsData);
    setEditingKey(""); // Reset editing state
  };

  const deleteAsset = async (key) => {
    try {
      await database.delete(`/assets/delete/${key}`);
      setAssetsData((prevData) => prevData.filter((item) => item.key !== key));
      message.success("Asset deleted successfully");
    } catch (error) {
      console.error("Error deleting asset:", error);
      message.error("Error deleting asset");
    }
  };

  const sortAssets = (assets, order) => {
    switch (order) {
      case "byID":
        return assets.sort((a, b) => parseInt(a.assetID) - parseInt(b.assetID));
      case "byName":
        return assets.sort((a, b) => a.assetName.localeCompare(b.assetName));
      case "byCategory":
        return assets.sort((a, b) =>
          a.categoryName.localeCompare(b.categoryName)
        );
      case "byPriceA":
        return assets.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      case "byPriceD":
        return assets.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      default:
        return assets;
    }
  };

  const fetchAssets = async () => {
    try {
      let response;
      if (activeComponent === "General") {
        if (search !== "") {
          switch (searchBy) {
            case "Category":
              response = await database.get("/assets/search", {
                params: { categoryName: search },
              });
              break;
            default:
              response = await database.get("/assets/search", {
                params: { name: search },
              });
          }
        } else {
          response = await database.get("/assets/read");
        }
      } else {
        response = await database.get("/assets/read");
      }
      setAssetsData(
        response.data.map((asset) => ({
          key: asset.assetID,
          assetID: asset.assetID,
          assetName: asset.assetName,
          price: asset.price,
          description: asset.description,
          categoryName: asset.category.categoryName,
          action: action,
        }))
      );
    } catch (error) {
      console.error(error);
      setAssetsData([]);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, [search]);

  useEffect(() => {
    setAssetsData((assets) => sortAssets([...assets], order));
  }, [order]);

  const handleDelete = async () => {
    try {
      await Promise.all(
        selectedRowKeys.map(async (assetID) => {
          await database.delete(`/assets/delete/${assetID}`);
        })
      );
      setSelectedRowKeys([]);
      fetchAssets();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <SubNavbar
        title="Assets"
        editButtonLabel={
          <>
            <HomeOutlined />
            <span style={{ marginLeft: "8px" }}>To Home Page</span>
          </>
        }
        editButtonPath="/"
        addButtonLabel={
          <>
            <PlusOutlined />
            <span style={{ marginLeft: "8px" }}>Add Asset</span>
          </>
        }
        addButtonPath="/addNew/assets"
      />
      <AssetSettings
        setOrder={setOrder}
        setSearch={setSearch}
        setSearchBy={setSearchBy}
        setActiveComponent={setActiveComponent}
        selectedRowKeys={selectedRowKeys}
        handleDelete={handleDelete}
        assetsData={assetsData}
      />
      {/* Icons Segmented Control */}
      <Divider />
      {/* Conditional rendering based on activeComponent state */}
      <AssetTable
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
        assetsData={assetsData}
        setSearchBy={setSearchBy}
        setEditingKey={setEditingKey}
        saveEdit={saveEdit}
        editingKey={editingKey}
        handleInputChange={handleInputChange}
        deleteAsset={deleteAsset}
        cancelEdit={cancelEdit}
      />
    </div>
  );
}
