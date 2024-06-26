import React, { useEffect, useState } from "react";
import SubNavbar from "../../Components/NavBars/SubNavbar";
import { PlusOutlined, HomeOutlined } from "@ant-design/icons";
import { Button, Divider } from "antd";
import AssetTable from "../../Components/Items/Assets/AssetsTable";
import AssetSettings from "../../Components/Items/Assets/AssetSettings";
import database from "../../axios/database";

export default function Assets() {
  const [assetsData, setAssetsData] = useState([]);
  const [activeComponent, setActiveComponent] = useState("General"); // Default to 'List'
  const [order, setOrder] = useState("byID");
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState("");
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

  const deleteAsset = async (key) => {
    try {
      await database.delete(`/assets/delete/${key}`);
      setAssetsData((prevData) => prevData.filter((item) => item.key !== key));
    } catch (error) {
      console.error("Error deleting asset:", error);
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
      />
      {/* Icons Segmented Control */}
      <Divider />
      {/* Conditional rendering based on activeComponent state */}
      <AssetTable
        assetsData={assetsData}
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
      />
    </div>
  );
}
