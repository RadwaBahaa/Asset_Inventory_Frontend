import React, { useEffect, useState } from "react";
import SubNavbar from "../../Components/NavBars/SubNavbar";
import { PlusOutlined, HomeOutlined } from "@ant-design/icons";
import { Button, Divider } from "antd";
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

  const action = (
    <div style={{ display: "flex" }}>
      <Button type="primary" ghost>
        Primary
      </Button>
      <Button type="primary" danger ghost>
        Danger
      </Button>
    </div>
  );

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

  useEffect(() => {
    let fetchAssets = async () => {
      try {
        let response;
        if (search !== "") {
          response = await database.get("/assets/search", {
            params: { name: search },
          });
          setSearchError(false);
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
        setSearchError(true);
      }
    };

    fetchAssets();
  }, [search]);

  useEffect(() => {
    console.log("Order:", order);
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
        assetsData={assetsData}
        setSearch={setSearch}
      />
      {/* Icons Segmented Control */}
      <Divider />
      {/* Conditional rendering based on activeComponent state */}
      {activeComponent === "List" && <AssetTable assetsData={assetsData} />}
      {activeComponent === "Grid" && <GridView assets={assets} />}
    </div>
  );
}
