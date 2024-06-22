import React, { useEffect, useState } from 'react';
import TrackingSubNavbar from '../../Components/NavBars/TrackingSubNavBar';
import { EyeOutlined } from '@ant-design/icons';
import { Row, Col, Button } from 'antd';
import WarehouseTable from '../../Components/Tracking/WarehousesTable';
import AssetsTable from '../../Components/Tracking/AssetsTable';
import ProcessTable from '../../Components/Tracking/ProcessTable';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Grid, Paper } from "@mui/material";

export default function StartProcess() {
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [selectAssets, setSelectAssets] = useState([]);
  const [isDoneButtonDisabled, setIsDoneButtonDisabled] = useState(true);
  const [startProcessDisabled, setStartProcessDisabled] = useState(true);
  const [assetsActivated, setAssetsActivated] = useState(false);
  const [processData, setProcessData] = useState([]);
  const [previouslySelectedAssets, setPreviouslySelectedAssets] = useState([]);

  useEffect(() => {
    if (selectedWarehouse) {
      setIsDoneButtonDisabled(false);
      setAssetsActivated(false);
      // Check if previously selected assets exist and update current selection
      if (previouslySelectedAssets.length > 0) {
        setSelectAssets(previouslySelectedAssets);
      }
    }
  }, [selectedWarehouse]);

  useEffect(() => {
    if (selectAssets.length > 0) {
      setStartProcessDisabled(false);
    }
  }, [selectAssets]);

  const handleActivateAssets = () => {
    setAssetsActivated(true);
  };

  const handleStartProcess = () => {
    const newProcessEntry = {
      key: selectedWarehouse.key,
      WarehouseName: selectedWarehouse.name,
      assets: selectAssets,
    };
    setProcessData((prevData) => [...prevData, newProcessEntry]);
  };

  const handleDeleteProcess = (key) => {
    setProcessData((prevData) => prevData.filter(item => item.key !== key));
  };

  const handleSaveProcess = (newData) => {
    setProcessData(newData);
  };

  const pageStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  };

  const contentStyle = {
    flex: 1,
    overflowY: 'auto',
    padding: '16px',
  };

  const buttonContainerStyle = {
    paddingTop: '15px',
    textAlign: 'right',
  };

  const headerStyle = {
    marginBottom: '16px',
    textAlign: 'center',
  };

  const footerStyle = {
    background: '#f1f1f1',
    padding: '16px',
    textAlign: 'center',
    zIndex: 1,
    position: 'relative',
  };

  const mapContainerStyle = {
    position: 'relative',
    zIndex: 0,
  };

  return (
    <div style={pageStyle}>
      <TrackingSubNavbar
        title="Starting Process Of Tracking"
        addButtonLabel={
          <>
            <EyeOutlined />
            <span style={{ marginLeft: '8px' }}>View Tracking</span>
          </>
        }
        addButtonPath="/tracking/viewTracking"
      />
      <div style={contentStyle}>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <div>
              <h2 style={headerStyle}>Warehouse Table</h2>
              <WarehouseTable style={{ background: '#f9f9f9' }} setSelectedWarehouse={setSelectedWarehouse} />
              <div style={buttonContainerStyle}>
                <Button type="primary" onClick={handleActivateAssets} disabled={isDoneButtonDisabled}>
                  Done
                </Button>
              </div>
            </div>
          </Col>
          <Col span={12}>
            <div>
              <h2 style={headerStyle}>Assets Table</h2>
              <div style={{ opacity: assetsActivated ? 1 : 0.5, pointerEvents: assetsActivated ? 'auto' : 'none' }}>
                <AssetsTable setSelectAssets={(newAssets) => {
                  setSelectAssets(newAssets);
                  setPreviouslySelectedAssets(newAssets); // Update previouslySelectedAssets on selection change
                }} />
              </div>
            </div>
            <div style={buttonContainerStyle}>
              <Button type="primary" onClick={handleStartProcess} disabled={startProcessDisabled}>Start Process</Button>
            </div>
          </Col>
        </Row>
        <Grid item xs={12} style={{ marginTop: '16px' }}>
          <Paper sx={{ padding: 2, height: "400px", ...mapContainerStyle }}>
            <MapContainer
              center={[51.505, -0.09]}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[51.505, -0.09]}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>
          </Paper>
        </Grid>
        <div style={{ marginTop: '16px' }}>
          <ProcessTable processData={processData} onDelete={handleDeleteProcess} onSave={handleSaveProcess} />
        </div>
      </div>
    </div>
  );
}
