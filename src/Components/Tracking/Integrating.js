import React, { useState } from 'react';
import WarehouseTable from './WarehouseTable';
import AssetsTable from './AssetsTable';
import ProcessTable from './ProcessTable';
import { Button } from 'antd';

const MainComponent = () => {
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [selectedAssets, setSelectedAssets] = useState([]);
  const [showProcessTable, setShowProcessTable] = useState(false);

  const handleWarehouseSelect = (warehouse) => {
    setSelectedWarehouse(warehouse);
  };

  const handleAssetsSelect = (assets) => {
    setSelectedAssets(assets);
  };

  const handleStartProcess = () => {
    setShowProcessTable(true);
  };

  return (
    <div>
      <WarehouseTable onWarehouseSelect={handleWarehouseSelect} />
      <AssetsTable onAssetsSelect={handleAssetsSelect} />
      <Button type="primary" onClick={handleStartProcess}>
        Start Process
      </Button>
      {showProcessTable && (
        <ProcessTable
          selectedWarehouse={selectedWarehouse}
          selectedAssets={selectedAssets}
        />
      )}
    </div>
  );
};

export default MainComponent;
