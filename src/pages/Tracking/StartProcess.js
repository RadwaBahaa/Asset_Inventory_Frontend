import React, { useEffect, useState } from 'react';
import SubNavbar from "../../Components/NavBars/SubNavbar";
import { EditOutlined, EyeOutlined } from '@ant-design/icons';
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
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
  };

  const buttonContainerStyle = {
    paddingTop: '15px',
    textAlign: 'right',
  };

  const headerStyle = {
    marginBottom: '16px',
    textAlign: 'center',
  };

  return (
    <div style={pageStyle}>
      <SubNavbar
        title="Starting Process Of Tracking"
        editButtonLabel={
          <>
            <EditOutlined />
            <span style={{ marginLeft: '8px' }}>Edit Asset</span>
          </>
        }
        addButtonLabel={
          <>
            <EyeOutlined />
            <span style={{ marginLeft: '8px' }}>View Tracking</span>
          </>
        }
        addButtonPath="/tracking/viewTracking"
      />
      <div >
        <Row gutter={[16, 16]} style={{ padding: '16px' }}>
          <Col span={12}>
            <div >
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
      </div>
      <Grid item xs={12}>
      <h2 style={headerStyle}>Choose Warehouse Location On</h2>
          <Paper sx={{ padding: 2, height: "400px" }}>
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
      <div>
        <ProcessTable processData={processData} onDelete={handleDeleteProcess} onSave={handleSaveProcess} />
      </div>
    </div>
  );
}