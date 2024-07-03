import React, { useEffect, useState } from "react";
import TrackingSubNavbar from "../../Components/NavBars/TrackingSubNavBar";
import { EyeOutlined, BarsOutlined, AppstoreOutlined } from "@ant-design/icons";
import { Row, Col, Button, Segmented, Dropdown, Menu } from "antd";
import AssetsTable from "../../Components/Tracking/StartProcess/AssetsTable";
import ReceiverTable from "../../Components/Tracking/StartProcess/ReceiverTable"; // Import ReceiverTable
import ReceiverMap from "../../Components/Tracking/StartProcess/ReceiverMap";
import ProcessSettings from "../../Components/Tracking/StartProcess/ProcessSettings";
import { useSelector } from "react-redux";
import database from "../../axios/database";
import { original } from "@reduxjs/toolkit";

export default function StartProcess() {
  const [selectedReceiver, setSelectedReceiver] = useState(null);
  const [selectAssets, setSelectAssets] = useState([]);
  const [startProcessDisabled, setStartProcessDisabled] = useState(true);
  const [assetsActivated, setAssetsActivated] = useState(false);
  const [processData, setProcessData] = useState([]);
  const [previouslySelectedAssets, setPreviouslySelectedAssets] = useState([]);
  const [viewType, setViewType] = useState("List"); // State to manage view type (List or Grid)
  const [receiverData, setReceiverData] = useState([]);
  const [assetsData, setAssetsData] = useState([]);

  const userRole = useSelector((state) => state.login.role);
  const userID = useSelector((state) => state.login.id);

  useEffect(() => {
    if (selectedReceiver) {
      setAssetsActivated(true);
      // Check if previously selected assets exist and update current selection
      if (previouslySelectedAssets.length > 0) {
        setSelectAssets(previouslySelectedAssets);
      }
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

  const handleSegmentedChange = (value) => {
    setViewType(value);
    // Handle view change logic if needed
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
  };

  const headerStyle = {
    marginBottom: "16px",
    textAlign: "center",
  };

  useEffect(() => {
    var responseData = [];
    if (userRole === "Supplier") {
      database
        .get(`warehouse/read/geojson`)
        .then((response) => {
          responseData = response.data.map((item) => ({
            key: item.properties.warehouseID,
            name: item.properties.warehouseName,
          }));
          console.log(response.data);
          setReceiverData(responseData);
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (userRole === "Warehouse") {
      database
        .get(`store/read/geojson`)
        .then((response) => {
          responseData = response.data.map((item) => ({
            key: item.properties.storeID,
            name: item.properties.storeName,
          }));
          // console.log(response.data);
          setReceiverData(responseData);
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
          // console.log("Assets Data:", mappedData); // Add this line to check data
        })
        .catch((error) => {
          console.error("Error fetching assets:", error);
        });
    }
  }, [processData]);

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
      <div style={contentStyle}>
        {/* Grid Layout for Assets Table and Map Container */}
        <Row gutter={16}>
          {/* Assets Table */}
          <Col span={13}>
            <ProcessSettings
              receiverData={receiverData}
              selectedReceiver={selectedReceiver}
              setSelectedReceiver={setSelectedReceiver}
            />
            <div
              style={{
                height: "85%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  opacity: assetsActivated ? 1 : 0.5,
                  pointerEvents: assetsActivated ? "auto" : "none",
                  flex: 1,
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
                />
              </div>
            </div>
          </Col>

          {/* Map Container */}
          <Col span={11}>
            <ReceiverMap />
          </Col>
        </Row>

        {/* Process Table */}
        <div style={{ marginTop: "16px" }}>
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
          />
        </div>
      </div>
    </div>
  );
}
