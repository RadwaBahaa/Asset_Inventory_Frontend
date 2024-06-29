import React, { useEffect, useState } from 'react';
import TrackingSubNavbar from '../../Components/NavBars/TrackingSubNavBar';
import { EyeOutlined, BarsOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Row, Col, Button, Segmented, Dropdown, Menu } from 'antd';
import AssetsTable from '../../Components/Tracking/StartProcess/AssetsTable';
import ReceiverTable from '../../Components/Tracking/StartProcess/ReceiverTable'; // Import ReceiverTable
import ReceiverMap from '../../Components/Tracking/StartProcess/ReceiverMap';
import ProcessSettings from '../../Components/Tracking/StartProcess/ProcessSettings';

export default function StartProcess() {
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [selectAssets, setSelectAssets] = useState([]);
  const [isDoneButtonDisabled, setIsDoneButtonDisabled] = useState(true);
  const [startProcessDisabled, setStartProcessDisabled] = useState(true);
  const [assetsActivated, setAssetsActivated] = useState(false);
  const [processData, setProcessData] = useState([]);
  const [previouslySelectedAssets, setPreviouslySelectedAssets] = useState([]);
  const [viewType, setViewType] = useState("List"); // State to manage view type (List or Grid)

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



  const handleDeleteProcess = (key) => {
    setProcessData((prevData) => prevData.filter(item => item.key !== key));
  };

  const handleSaveProcess = (newData) => {
    setProcessData(newData);
  };

  const handleSegmentedChange = (value) => {
    setViewType(value);
    // Handle view change logic if needed
  };

  const pageStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    overflowY: 'auto', // Enable vertical scrolling if needed
  };

  const contentStyle = {
    flex: 1,
    overflowY: 'auto', // Enable vertical scrolling if needed
    padding: '16px',
  };

  const headerStyle = {
    marginBottom: '16px',
    textAlign: 'center',
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

        {/* Grid Layout for Assets Table and Map Container */}
        <Row gutter={16}>
          {/* Assets Table */}
          <Col span={13}>
            <ProcessSettings />
            <div style={{ height: '85%', display: 'flex', flexDirection: 'column' }}>
              {/* <h2 style={headerStyle}>Assets Table</h2> */}
              <div style={{ opacity: assetsActivated ? 1 : 0.5, pointerEvents: assetsActivated ? 'auto' : 'none', flex: 1 }}>
                <AssetsTable setSelectAssets={(newAssets) => {
                  setSelectAssets(newAssets);
                  setPreviouslySelectedAssets(newAssets); // Update previouslySelectedAssets on selection change
                }} startProcessDisabled={startProcessDisabled} selectedWarehouse={selectedWarehouse} selectAssets={selectAssets} setProcessData={setProcessData} />

              </div>
            </div>
          </Col>

          {/* Map Container */}
          <Col span={11}>
            <ReceiverMap />
          </Col>
        </Row>

        {/* Process Table */}
        <div style={{ marginTop: '16px' }}>
          <ReceiverTable processData={processData} onDelete={handleDeleteProcess} onSave={handleSaveProcess} />
        </div>
      </div>
    </div>
  );
}