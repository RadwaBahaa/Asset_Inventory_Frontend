import React, { useEffect, useState } from "react";
import SubNavbar from "../../Components/NavBars/SubNavbar";
import { PlusOutlined, HomeOutlined } from "@ant-design/icons";
import { Divider, message } from "antd";
import AssetTable from "../../Components/Items/Assets/AssetsTable";
import AssetSettings from "../../Components/Items/Assets/AssetSettings";
import database from "../../axios/database";

export default function Assets() {
  const [assetsData, setAssetsData] = useState([]);
  const [categories, setCategories] = useState([]); // State for categories
  const [activeComponent, setActiveComponent] = useState("General"); // Default to 'List'
  const [order, setOrder] = useState("byID");
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [editingKey, setEditingKey] = useState(""); // State to track editing asset
  const [updatedAsset, setUpdatedAsset] = useState({}); // State for updated asset

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
        }))
      );
    } catch (error) {
      console.error(error);
      setAssetsData([]);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await database.get("/categories/read");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const saveEdit = async (key) => {
    try {
      console.log(updatedAsset);

      await database.put(`/assets/update/${key}`, updatedAsset);
      setEditingKey("");
      setUpdatedAsset({});

      message.success("Asset updated successfully");
    } catch (error) {
      console.error("Error updating asset:", error);
      if (error.response) {
        console.error("Server Error:", error.response.data);
      }
      message.error("Error updating asset");
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

  useEffect(() => {
    fetchAssets();
    fetchCategories(); // Fetch categories on mount
  }, [search]);

  useEffect(() => {
    setAssetsData((assets) => sortAssets([...assets], order));
  }, [order]);

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
      <Divider />
      {activeComponent === "General" ? (
        <AssetTable
          assetsData={assetsData}
          setAssetsData={setAssetsData}
          editingKey={editingKey}
          setEditingKey={setEditingKey}
          saveEdit={saveEdit} // Pass saveEdit to AssetTable
          deleteAsset={deleteAsset}
          selectedRowKeys={selectedRowKeys} // Pass selectedRowKeys to AssetTable
          setSelectedRowKeys={setSelectedRowKeys} // Pass setSelectedRowKeys to AssetTable
          categories={categories} // Pass categories to AssetTable
          setUpdatedAsset={setUpdatedAsset}
          updatedAsset={updatedAsset}
        />
      ) : null}
    </div>
  );
}