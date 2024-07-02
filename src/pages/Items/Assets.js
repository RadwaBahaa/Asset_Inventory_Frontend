import React, { useEffect, useState } from "react";
import SubNavbar from "../../Components/NavBars/SubNavbar";
import { PlusOutlined, HomeOutlined } from "@ant-design/icons";
import { Divider, Empty, Typography, message } from "antd";
import AssetsTable from "../../Components/Items/Assets/AssetsTable";
import AssetSettings from "../../Components/Items/Assets/AssetSettings";
import database from "../../axios/database";
import { useLocation } from "react-router-dom";

export default function Assets() {
  const [assetsData, setAssetsData] = useState([]);
  const [categories, setCategories] = useState([]); // State for categories
  const [activeComponent, setActiveComponent] = useState("Overview"); // Default to 'List'
  const [order, setOrder] = useState("byID");
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [editingKey, setEditingKey] = useState(""); // State to track editing asset
  const [updatedAsset, setUpdatedAsset] = useState({}); // State for updated asset

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const role = queryParams.get("role");
  const id = queryParams.get("id");

  const fetchSpecificAssets = async () => {
    setAssetsData([]);
    await database
      .get(`/${role}/assets/read/${id}`)
      .then((response) => {
        setAssetsData(
          response.data.map((asset) => ({
            key: asset.assetID + "-" + asset.serialNumber,
            assetID: asset.assetID,
            assetName: asset.asset.assetName,
            serialNumber: asset.serialNumber,
            count: asset.count,
          }))
        );
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const fetchOverviewAssets = async () => {
    setAssetsData([]);
    try {
      let response;
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
      setAssetsData(
        response.data.map((asset) => ({
          key: asset.assetID,
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
      console.log(key);
      if (role && id) {
        const [assetID, serialNumber] = key.split("-");
        await database.put(
          `/${role}/assets/update?assetID=${assetID}&serialNumber=${serialNumber}`,
          updatedAsset,
          { params: { assetID, serialNumber } }
        );
      } else {
        await database.put(`/assets/update/${key}`, updatedAsset);
      }
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
      if (role && id) {
        const [assetID, serialNumber] = key.split("-");
        await database.delete(
          `/${role}/assets/delete?assetID=${assetID}&serialNumber=${serialNumber}`,
          { params: { storeID: id } }
        );
      } else {
        await database.delete(`/assets/delete/${key}`);
      }

      setAssetsData((prevData) => prevData.filter((item) => item.key !== key));
      message.success("Asset deleted successfully");
    } catch (error) {
      console.error("Error deleting asset:", error);
      message.error("Error deleting asset");
    }
  };

  const handleDelete = async () => {
    try {
      if (role && id) {
        await Promise.all(
          selectedRowKeys.map(async (key) => {
            const [assetID, serialNumber] = key.split("-");
            await database.delete(
              `/${role}/assets/delete?assetID=${assetID}&serialNumber=${serialNumber}`,
              { params: { storeID: id } }
            );
          })
        );
      } else {
        await Promise.all(
          selectedRowKeys.map(async (assetID) => {
            await database.delete(`/assets/delete/${assetID}`);
          })
        );
      }
      setSelectedRowKeys([]);
      fetchOverviewAssets();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (role && id && activeComponent === "Specific") {
      fetchSpecificAssets();
    } else if (activeComponent === "Overview") {
      fetchOverviewAssets(); // Fetch assets on mount
    }
    fetchCategories(); // Fetch categories on mount
  }, [role, id, search, activeComponent]);

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
        activeComponent={activeComponent}
      />
      <Divider />

      {activeComponent === "Overview" || (role && id) ? (
        <AssetsTable
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
          activeComponent={activeComponent}
        />
      ) : (
        <Empty
          description={
            <Typography.Text>
              Please choose a specific location to display assets.
            </Typography.Text>
          }
        />
      )}
    </div>
  );
}
