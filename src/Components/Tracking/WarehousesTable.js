import React, { useState } from "react";
import { Table } from "antd";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    render: (text) => <a>{text}</a>,
  },
];

const data = [
  { key: "1", name: "Warehouse A" },
  { key: "2", name: "Warehouse B" },
  { key: "3", name: "Warehouse C" },
  { key: "4", name: "Warehouse D" },
];

const StartProgress = (props) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { setSelectedWarehouse } = props;

  const onSelectChange = (selectedRowKeys, selectedRows) => {
    setSelectedRowKeys(selectedRowKeys);
    setSelectedWarehouse(selectedRows[0]);
  };

  const rowSelection = {
    type: "radio",
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        rowSelection={rowSelection}
        pagination={false} // Optional: Remove pagination if not needed
        onRow={(record) => ({
          onClick: () => {
            onSelectChange([record.key], [record]);
          },
        })}
      />
    </div>
  );
};

export default StartProgress;