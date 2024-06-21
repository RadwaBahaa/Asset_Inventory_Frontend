import React, { useEffect, useState } from 'react';
import SubNavbar from "../../Components/NavBars/SubNavbar";
import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Row, Col, Button } from 'antd';
import WarehouseTable from '../../Components/Tracking/WarehousesTable';
import AssetsTable from '../../Components/Tracking/AssetsTable';
import ProcessTable from '../../Components/Tracking/ProcessTable';

export default function StartProcess() {
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [selectAssets, setSelectAssets] = useState([]);
  const [isDoneButtonDisabled, setIsDoneButtonDisabled] = useState(true);
  const [startProcessDisabled, setStartProcessDisabled] = useState(true);
  const [assetsActivated, setAssetsActivated] = useState(false);
  const [processData, setProcessData] = useState([]);

  useEffect(() => {
    if (selectedWarehouse) {
      setIsDoneButtonDisabled(false);
      setAssetsActivated(false);
    }
  }, [selectedWarehouse]);

  useEffect(() => {
    if (selectAssets.length > 0) {
      setStartProcessDisabled(false);
    }
  }, [selectAssets]);

  // Function to activate AssetsTable
  const handleActivateAssets = () => {
    setAssetsActivated(true);
  };

  // Function to handle the "Start Process" button click
  const handleStartProcess = () => {
    const newProcessEntry = {
      key: selectedWarehouse.key,
      WarehouseName: selectedWarehouse.name,
      assets: selectAssets,
    };
    setProcessData((prevData) => [...prevData, newProcessEntry]);
  };

  // Function to handle deletion of a process row
  const handleDeleteProcess = (key) => {
    setProcessData((prevData) => prevData.filter(item => item.key !== key));
  };

  const pageStyle = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
  };

  // const tableContainerStyle = {
  //   background: '#f9f9f9',
  //   // padding: '16px',
  //   // borderRadius: '8px',
  //   // marginBottom: '16px',
  // };

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
          {/* Left side with WarehouseTable */}
          <Col span={12}>
            <div >
              <h3 style={headerStyle}>Warehouse Table</h3>
              <WarehouseTable style={{ background: '#f9f9f9' }} setSelectedWarehouse={setSelectedWarehouse} />
              <div style={buttonContainerStyle}>
                <Button type="primary" onClick={handleActivateAssets} disabled={isDoneButtonDisabled}>
                  Done
                </Button>
              </div>
            </div>
          </Col>
          {/* Right side with AssetsTable and Start Process button */}
          <Col span={12}>
            <div>
              <h3 style={headerStyle}>Assets Table</h3>
              <div style={{ opacity: assetsActivated ? 1 : 0.5, pointerEvents: assetsActivated ? 'auto' : 'none' }}>
                <AssetsTable setSelectAssets={setSelectAssets} />
              </div>
            </div>
            <div style={buttonContainerStyle}>
              <Button type="primary" onClick={handleStartProcess} disabled={startProcessDisabled}>Start Process</Button>
            </div>

          </Col>
        </Row>
      </div>
      <div >
        <ProcessTable processData={processData} onDelete={handleDeleteProcess} />
      </div>
    </div>
  );
}
