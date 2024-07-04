import React, { useEffect, useState } from "react";
import TrackingSubNavbar from "../../Components/NavBars/TrackingSubNavBar";
import { EyeOutlined } from "@ant-design/icons";
import { Row, Col, Divider } from "antd";
import AssetsTable from "../../Components/Tracking/StartProcess/AssetsTable";
import ReceiverTable from "../../Components/Tracking/StartProcess/ReceiverTable"; // Import ReceiverTable
import ReceiverMap from "../../Components/Tracking/StartProcess/ReceiverMap";
import ProcessSettings from "../../Components/Tracking/StartProcess/ProcessSettings";
import { useSelector } from "react-redux";
import database from "../../axios/database";
import { Paper } from "@mui/material";
import targomoAPI from "../../axios/targomoAPI";
import geoapifyAPI from "../../axios/geoapifyAPI";

export default function StartProcess() {
  const [selectedReceiver, setSelectedReceiver] = useState(null);
  const [selectAssets, setSelectAssets] = useState([]);
  const [startProcessDisabled, setStartProcessDisabled] = useState(true);
  const [assetsActivated, setAssetsActivated] = useState(false);
  const [processData, setProcessData] = useState([]);
  const [previouslySelectedAssets, setPreviouslySelectedAssets] = useState([]);
  const [receiverData, setReceiverData] = useState([]);
  const [assetsData, setAssetsData] = useState([]);
  const [senderData, setSenderData] = useState();
  const [serviceArea, setServiceArea] = useState([]);

  // const [locations, setLocations] = useState(null);
  // const [selectedLocation, setSelectedLocation] = useState(null);

  const userRole = useSelector((state) => state.login.role);
  const userID = useSelector((state) => state.login.id);

  useEffect(() => {
    if (selectedReceiver) {
      setAssetsActivated(true);
      // Check if previously selected assets exist and update current selection
      if (previouslySelectedAssets.length > 0) {
        setSelectAssets(previouslySelectedAssets);
      }
      console.log(selectedReceiver);
      // setSelectedLocation(selectedReceiver);
    }
  }, [selectedReceiver]);

  useEffect(() => {
    if (selectAssets.length > 0) {
      setStartProcessDisabled(false);
    }
  }, [selectAssets]);

  const handleDeleteProcess = (key) => {
    const deletedProcess = processData.find((item) => item.key === key);
    if (deletedProcess) {
      // Restore the quantities of the deleted assets
      const updatedAssetsData = assetsData.map((asset) => {
        const editedAsset = deletedProcess.assets.find(
          (a) => a.key === asset.key
        );
        if (editedAsset) {
          return {
            ...asset,
            availableQuantity: asset.availableQuantity + editedAsset.quantity,
          };
        }
        return asset;
      });
      setAssetsData(updatedAssetsData);
    }

    setProcessData((prevData) => prevData.filter((item) => item.key !== key));
  };

  const handleSaveProcess = (newData) => {
    setProcessData(newData);
  };

  const pageStyle = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    overflowY: "auto", // Enable vertical scrolling if needed
  };

  const contentStyle = {
    flex: 1,
    overflowY: "auto", // Enable vertical scrolling if needed
    padding: "16px",
    margin: "50px",
  };

  useEffect(() => {
    if (userRole === "Supplier") {
      database
        .get(`warehouse/read/geojson`)
        .then((response) => {
          const responseData = response.data.map((item) => ({
            ...item,
            properties: {
              ...item.properties,
              id: item.properties.warehouseID,
              name: item.properties.warehouseName,
              type: "Warehouse",
            },
          }));
          setReceiverData(responseData);
        })
        .catch((error) => {
          console.error(error);
        });

      database
        .get(`supplier/read/geojson/${userID}`)
        .then((response) => {
          const responseData = response.data.map((item) => ({
            ...item,
            properties: {
              ...item.properties,
              id: item.properties.supplierID,
              name: item.properties.supplierID,
              type: "Supplier",
            },
          }));
          setSenderData(responseData);
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (userRole === "Warehouse") {
      database
        .get(`store/read/geojson`)
        .then((response) => {
          const responseData = response.data.map((item) => ({
            ...item,
            properties: {
              ...item.properties,
              id: item.properties.storeID,
              name: item.properties.storeName,
              type: "Store",
            },
          }));
          setReceiverData(responseData);
          console.log(responseData);
        })
        .catch((error) => {
          console.error(error);
        });

      database
        .get(`warehouse/read/geojson/`, {
          params: {
            id: userID,
          },
        })
        .then((response) => {
          const responseData = response.data.map((item) => ({
            ...item,
            properties: {
              ...item.properties,
              id: item.properties.warehouseID,
              name: item.properties.warehouseName,
              type: "Warehouse",
            },
          }));
          setSenderData(responseData);
          console.log(responseData);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    return () => {};
  }, []);

  useEffect(() => {
    if (processData.length == 0) {
      database
        .get(`${userRole}/assets/read/${userID}`)
        .then((response) => {
          const mappedData = response.data.map((asset, index) => ({
            key: index + 1,
            id: asset.assetID,
            name: asset.asset.assetName,
            serialNumber: asset.serialNumber,
            initialAvailableQuantity: asset.count,
            availableQuantity: asset.count,
            assetQuantity: asset.count,
            originalQuantity: asset.count,
            quantity: 0,
          }));
          setAssetsData(mappedData);
        })
        .catch((error) => {
          console.error("Error fetching assets:", error);
        });
    }
  }, [processData]);

  useEffect(() => {
    if (senderData) {
      senderData.map((sender) => {
        console.log(sender);

        console.log(sender.geometry.coordinates);
        setServiceArea(null);
        geoapifyAPI
          .get("/isoline", {
            params: {
              lat: sender.geometry.coordinates[1],
              lon: sender.geometry.coordinates[0],
              type: "distance",
              mode: "drive",
              range: 10000,
              route_type: "short",
              traffic: "approximated",
            },
          })
          .then((res) => {
            if (res.data.features.length > 0) {
              setServiceArea(res.data.features[0]);
              console.log(res.data.features);
            } else {
              setServiceArea([]);
              console.log("No service area found");
            }
          })
          .catch((err) => {
            setServiceArea(null);
            console.log(err);
          });
      });
    }
  }, [senderData]);

  return (
    <div style={pageStyle}>
      <TrackingSubNavbar
        title="Starting Process Of Tracking"
        addButtonLabel={
          <>
            <EyeOutlined />
            <span style={{ marginLeft: "8px" }}>View Tracking</span>
          </>
        }
        addButtonPath="/tracking/viewTracking"
      />
      <div
        style={{
          display: "flex",
          height: "500px",
          zIndex: 1,
          width: "100%",
          marginTop: "2%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "2%",
            height: "100%",
            width: "50%",
            margin: "0px 10px 0px 20px",
            height: "500px",
            borderRadius: "10px",
            backgroundColor: "white",
          }}
        >
          <ProcessSettings
            receiverData={receiverData}
            selectedReceiver={selectedReceiver}
            setSelectedReceiver={setSelectedReceiver}
          />
          <div
            style={{
              opacity: assetsActivated ? 1 : 0.5,
              pointerEvents: assetsActivated ? "auto" : "none",
              maxWidth: "100%",
            }}
          >
            <AssetsTable
              setSelectAssets={(newAssets) => {
                setSelectAssets(newAssets);
                setPreviouslySelectedAssets(newAssets); // Update previouslySelectedAssets on selection change
              }}
              assetsData={assetsData}
              setAssetsData={setAssetsData}
              startProcessDisabled={startProcessDisabled}
              selectedReceiver={selectedReceiver}
              selectAssets={selectAssets}
              setProcessData={setProcessData}
              setSelectedReceiver={setSelectedReceiver}
              setAssetsActivated={setAssetsActivated}
              setStartProcessDisabled={setStartProcessDisabled}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "2%",
            height: "100%",
            width: "50%",
            margin: "0px 20px 0px 10px",
            height: "500px",
            borderRadius: "10px",
            backgroundColor: "white",
          }}
        >
          <ReceiverMap
            userRole={userRole}
            receiverData={receiverData}
            senderData={senderData}
            // selectedLocation={selectedLocation}
            selectedReceiver={selectedReceiver}
            serviceArea={serviceArea}
          />
        </div>
      </div>
      <div style={{ margin: "10px 20px 50px 20px" }}>
        <ReceiverTable
          processData={processData}
          onDelete={handleDeleteProcess}
          onSave={handleSaveProcess}
          userRole={userRole}
          userID={userID}
          selectedReceiver={selectedReceiver}
          setProcessData={setProcessData}
          setAssetsData={setAssetsData}
          assetsData={assetsData}
          setSelectedReceiver={setSelectedReceiver}
        />
      </div>
    </div>
  );
}
