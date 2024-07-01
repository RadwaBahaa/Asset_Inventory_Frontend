import React from "react";
import { Table } from "antd";

const AssetTable = (props) => {
  const { assetsData, selectedRowKeys, setSelectedRowKeys } = props;

  const onSelectChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const columns = [
    {
      title: "Warehouse Name",
      dataIndex: "assetID",
      key: "assetID",
    },
    {
      title: "Assets",
      dataIndex: "Assets",
      key: "assetName",
    },
    {
      title: "Asset Quantity",
      dataIndex: "Asset Quantity",
      key: "description",
      width: "50%",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];

  return (
    <div id="processtable" > {/* Added relative positioning */}
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={assetsData}
        pagination={false}
        // style={{filter:"blur(0.7px)"
          
        // }}
      />
     <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to top, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%)' }}> {/* White to transparent gradient */}
     </div>
   </div>
    
  );
};

export default AssetTable;
