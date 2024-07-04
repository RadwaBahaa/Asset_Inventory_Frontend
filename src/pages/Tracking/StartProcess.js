import React, { useEffect, useState } from "react";
import TrackingSubNavbar from "../../Components/NavBars/TrackingSubNavBar";
import { EyeOutlined } from "@ant-design/icons";
import AssetsTable from "../../Components/Tracking/StartProcess/AssetsTable";
import ReceiverTable from "../../Components/Tracking/StartProcess/ReceiverTable";
import ReceiverMap from "../../Components/Tracking/StartProcess/ReceiverMap";
import ProcessSettings from "../../Components/Tracking/StartProcess/ProcessSettings";
import { useSelector } from "react-redux";
import database from "../../axios/database";
import geoapifyAPI from "../../axios/geoapifyAPI";
import * as turf from "@turf/turf";

export default function StartProcess() {
  const [selectedReceiver, setSelectedReceiver] = useState(null);
  const [selectAssets, setSelectAssets] = useState([]);
  const [startProcessDisabled, setStartProcessDisabled] = useState(true);
  const [assetsActivated, setAssetsActivated] = useState(false);
  const [processData, setProcessData] = useState([]);
  const [previouslySelectedAssets, setPreviouslySelectedAssets] = useState([]);
  const [receiverData, setReceiverData] = useState([]);
  const [assetsData, setAssetsData] = useState([]);
  const [senderData, setSenderData] = useState(null);
  const [serviceArea, setServiceArea] = useState(null);
  const [serviedLocations, setServiedLocations] = useState(null);
  const [center, setCenter] = useState([40.71105853111035, -74.00752039016318]);

  const userRole = useSelector((state) => state.login.role);
  const userID = useSelector((state) => state.login.id);

  useEffect(() => {
    if (selectedReceiver) {
      setAssetsActivated(true);
      if (previouslySelectedAssets.length > 0) {
        setSelectAssets(previouslySelectedAssets);
      }
      console.log(selectedReceiver);
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
    overflowY: "auto",
  };

  const contentStyle = {
    flex: 1,
    overflowY: "auto",
    padding: "16px",
    margin: "50px",
  };

  useEffect(() => {
    if (userRole === "Supplier") {
      fetchReceiverData(
        "warehouse",
        "warehouseID",
        "warehouseName",
        "Warehouse"
      );
      fetchSenderData("supplier", "supplierID", "Supplier", userID);
    } else if (userRole === "Warehouse") {
      fetchReceiverData("store", "storeID", "storeName", "Store");
      fetchSenderData("warehouse", "warehouseID", "Warehouse", userID);
    }
  }, []);

  // useEffect(() => {
  const fetchReceiverData = (endpoint, idField, nameField, type) => {
    database
      .get(`${endpoint}/read/geojson`)
      .then((response) => {
        const responseData = response.data.map((item) => ({
          ...item,
          properties: {
            ...item.properties,
            id: item.properties[idField],
            name: item.properties[nameField],
            type,
          },
        }));
        setReceiverData(responseData);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchSenderData = (endpoint, idField, type, userId) => {
    database
      .get(`${endpoint}/read/geojson/${userId}`)
      .then((response) => {
        const responseData = {
          ...response.data,
          properties: {
            ...response.data.properties,
            id: response.data.properties[idField],
            name: response.data.properties[idField],
            type,
          },
        };
        console.log(response.data);
        setSenderData(responseData);

        const center = response.data.geometry.coordinates;
        setCenter([center[1], center[0]]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
  }, []);

  useEffect(() => {
    if (senderData) {
      // senderData.map((sender) => {
      setServiceArea(null);
      geoapifyAPI
        .get("/isoline", {
          params: {
            lat: senderData.geometry.coordinates[1],
            lon: senderData.geometry.coordinates[0],
            type: "distance",
            mode: "drive",
            range: 20000,
            route_type: "short",
            traffic: "approximated",
          },
        })
        .then((res) => {
          if (res.data.features.length > 0) {
            const polygon = res.data.features[0];

            if (receiverData.length > 0) {
              const locationsWithinServiceArea = receiverData.filter(
                (location) => {
                  const point = turf.point(location.geometry.coordinates);
                  console.log(
                    point,
                    turf.booleanPointInPolygon(point, polygon)
                  );
                  return turf.booleanPointInPolygon(point, polygon);
                }
              );

              setServiceArea(polygon);
              setServiedLocations(locationsWithinServiceArea);
              console.log(locationsWithinServiceArea);
            }
          } else {
            setServiceArea(null);
            setServiedLocations([]);
            console.log("No service area found");
          }
        })
        .catch((err) => {
          setServiceArea(null);
          console.log(err);
        });
      // });
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
            processData={processData}
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
                setPreviouslySelectedAssets(newAssets);
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
              setReceiverData={setReceiverData}
              // processData={processData}
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
            setSelectedReceiver={setSelectedReceiver}
            receiverData={receiverData}
            senderData={senderData}
            userRole={userRole}
            selectedReceiver={selectedReceiver}
            serviceArea={serviceArea}
            setServiedLocations={setServiedLocations}
            serviedLocations={serviedLocations}
            center={center}
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
          setPreviouslySelectedAssets={setPreviouslySelectedAssets}
          assetsData={assetsData}
          setAssetsData={setAssetsData}
          setProcessData={setProcessData}
        />
      </div>
    </div>
  );
}
