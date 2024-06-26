import React, { useEffect, useState } from "react";
import SubNavbar from "../../Components/NavBars/SubNavbar";
import { PlusOutlined, HomeOutlined } from "@ant-design/icons";
import { Button, Divider, message } from "antd";
import AssetTable from "../../Components/Items/AssetsTable";
import GridView from "../../Components/Items/GridView";
import AssetSettings from "../../Components/Items/AssetSettings";
import database from "../../axios/database";

export default function Assets() {
  const [assetsData, setAssetsData] = useState([]);
  const [activeComponent, setActiveComponent] = useState("List"); // Default to 'List'
  const [order, setOrder] = useState("byID");
  const [search, setSearch] = useState("");
  const [searchError, setSearchError] = useState(false);
  const [searchBy, setSearchBy] = useState("");
  const [editingKey, setEditingKey] = useState(""); // State to track editing asset
  const [originalData, setOriginalData] = useState({}); // Store original data

  const updateAssetInDatabase = async (assetID, updatedData) => {
    try {
      const response = await database.put(`/assets/update/${assetID}`, updatedData, {
        headers: {
          'Content-Type': 'application/json', // Ensure Content-Type is set to JSON
        },
      });
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
        const updatedAssetsData = assetsData.map(asset => 
          asset.assetID === assetID ? { ...asset, ...updatedData } : asset
        );
        setAssetsData(updatedAssetsData);
        setEditingKey(""); // Reset editing state
        message.success('Asset updated successfully');
      } else {
        console.error("Error saving edited asset:", response.error);
        message.error('Error saving asset');
      }
    } catch (error) {
      console.error("Error saving edited asset:", error);
      message.error('Error saving asset');
    }
  };

  const handleInputChange = (key, field, value) => {
    const updatedAssetsData = [...assetsData];
    const editedAssetIndex = updatedAssetsData.findIndex((asset) => asset.key === key);
    updatedAssetsData[editedAssetIndex][field] = value;
    setAssetsData(updatedAssetsData);
  };

  const cancelEdit = (key) => {
    const updatedAssetsData = [...assetsData];
    const editedAssetIndex = updatedAssetsData.findIndex((asset) => asset.key === key);
    updatedAssetsData[editedAssetIndex] = originalData[key];
    setAssetsData(updatedAssetsData);
    setEditingKey(""); // Reset editing state
  };

  const deleteAsset = async (key) => {
    try {
      await database.delete(`/assets/delete/${key}`);
      setAssetsData((prevData) => prevData.filter((item) => item.key !== key));
      message.success('Asset deleted successfully');
    } catch (error) {
      console.error("Error deleting asset:", error);
      message.error('Error deleting asset');
    }
  };

  const sortAssets = (assets, order) => {
    switch (order) {
      case "byID":
        return assets.sort((a, b) => parseInt(a.assetID) - parseInt(b.assetID));
      case "byName":
        return assets.sort((a, b) => a.assetName.localeCompare(b.assetName));
      case "byCategory":
        return assets.sort((a, b) => a.categoryName.localeCompare(b.categoryName));
      case "byPriceA":
        return assets.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      case "byPriceD":
        return assets.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      default:
        return assets;
    }
  };

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        let response;
        if (search !== "") {
          switch (searchBy) {
            case "Category":
              response = await database.get("/assets/search", {
                params: { category: search },
              });
              break;
            default:
              response = await database.get("/assets/search", {
                params: { name: search },
              });
          }
          setSearchError(false);
        } else {
          response = await database.get("/assets/read");
        }
        const assets = response.data.map((asset) => ({
          key: asset.assetID,
          assetID: asset.assetID,
          assetName: asset.assetName,
          price: asset.price,
          description: asset.description,
          categoryName: asset.category.categoryName,
        }));
        setAssetsData(assets);
        setOriginalData(assets.reduce((acc, asset) => {
          acc[asset.key] = { ...asset };
          return acc;
        }, {}));
      } catch (error) {
        console.error(error);
        setSearchError(true);
      }
    };
    fetchAssets();
  }, [search]);

  useEffect(() => {
    setAssetsData((assets) => sortAssets([...assets], order));
  }, [order]);

  // Generate 24 assets for 6 rows of 4 columns
  const generateAssets = () => {
    const assets = [];
    for (let i = 1; i <= 24; i++) {
      assets.push({
        id: `ID${i}`, // Use backticks and curly braces for template literals
        name: `Asset Name ${i}`,
        price: `${i * 100}`, // Use backticks and curly braces for template literals
        description: `This is a detailed description of asset ${i}.`,
        image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
      });
    }
    return assets;
  };

  const assets = generateAssets();

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

      <AssetSettings setOrder={setOrder} assetsData={assetsData} setSearch={setSearch} />
      <Divider />
      {activeComponent === "List" && (
        <AssetTable
          assetsData={assetsData}
          setSearchBy={setSearchBy}
          setEditingKey={setEditingKey}
          saveEdit={saveEdit}
          editingKey={editingKey}
          handleInputChange={handleInputChange}
          deleteAsset={deleteAsset}
          cancelEdit={cancelEdit}
        />
      )}
      {activeComponent === "Grid" && <GridView assets={assets} />}
    </div>
  );
}