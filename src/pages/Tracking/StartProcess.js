import React, { useState } from 'react';
import SubNavbar from "../../Components/NavBars/SubNavbar";
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Row, Col, Button } from 'antd'; // Import Row, Col, and Button from Ant Design
import WarehouseTable from '../../Components/Tracking/WarehousesTable';
import AssetsTable from '../../Components/Tracking/AssetsTable';
import ProcessTable from '../../Components/Tracking/ProcessTable'

export default function StartProcess() {
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [isDoneButtonDisabled, setIsDoneButtonDisabled] = useState(true);
  const [assetsActivated, setAssetsActivated] = useState(false);

  // Function to handle selection from WarehouseTable
  const handleWarehouseSelection = (selectedRows) => {
    setSelectedWarehouse(selectedRows.length > 0 ? selectedRows[0] : null);
    setIsDoneButtonDisabled(selectedRows.length === 0); // Disable "Done" button if no warehouse is selected
    setAssetsActivated(false); // Reset activation status when selecting a new warehouse
  };

  // Function to activate AssetsTable
  const handleActivateAssets = () => {
    setAssetsActivated(true);
  };

  return (
    <div>
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
            <PlusOutlined />
            <span style={{ marginLeft: '8px' }}>Add Location</span>
          </>
        }
      />

      <Row gutter={[16, 16]} style={{ padding: '16px' }}>
        {/* Left side with WarehouseTable */}
        <Col span={12}>
          <div style={{ background: '#f9f9f9', padding: '16px', borderRadius: '8px' }}>
            <h3 style={{ marginBottom: '16px', textAlign: 'center' }}>Warehouse Table</h3>
            <WarehouseTable onWarehouseSelect={handleWarehouseSelection} />
            <div style={{ paddingTop: '15px', textAlign: 'right' }}>
              <Button type="primary" onClick={handleActivateAssets} disabled={isDoneButtonDisabled}>
                Done
              </Button>
            </div>
          </div>
        </Col>
        {/* Right side with AssetsTable and Start Process button */}
        <Col span={12}>
          <div style={{ background: '#f9f9f9', padding: '16px', borderRadius: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ marginBottom: '16px', textAlign: 'center' }}>Assets Table</h3>
              <div style={{ opacity: assetsActivated ? 1 : 0.5, pointerEvents: assetsActivated ? 'auto' : 'none' }}>
                <AssetsTable warehouse={selectedWarehouse} />
              </div>
            </div>
            <div style={{ paddingTop: '15px', textAlign: 'right' }}>
              <Button type="primary" disabled={!assetsActivated}>Start Process</Button>
            </div>
          </div>
        </Col>
      </Row>
      <div>
        <ProcessTable/>
      </div>
    </div>
  );
}