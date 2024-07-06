import React, { useEffect, useState } from "react";
import { Tooltip, Table, Button, Tag } from "antd";
import database from "../../../axios/database";
import { UnorderedListOutlined } from "@ant-design/icons";

const TrackingTable = ({
  // setCurrentStep,
  // markedForDelivery,
  // markForDelivery,
  sentProcesses,
  receiver,
  sender,
  buttonStatus,
  // setButtonStatus,
  handelUpdateStatus,
}) => {
  // const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [processData, setProcessData] = useState([]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Supplying":
        return "default";
      case "Delivering":
        return "primary";
      case "Inventory":
        return "success";
      default:
        return "default";
    }
  };

  useEffect(() => {
    if (sentProcesses) {
      // setChangeStatus(sentProcesses);
      console.log(`${receiver.toLowerCase()}Processes`);
    }
  }, [sentProcesses]);

  // const handleStartDelivery = (record) => {
  //   database.put(`/${receiver}/process/update/${record.id}/{storeID}`, {});
  //   setButtonStatus((prev) => ({
  //     ...prev,
  //     [record.storeID]: "Delivering",
  //   }));
  //   console.log("record:", record);
  // };

  // useEffect(() => {
  //   if (sentProcesses) {
  //     console.log("table:", sentProcesses);
  //   }
  // }, [sentProcesses]);

  // const handleRowSelectChange = (selectedRowKeys) => {
  //   setSelectedRowKeys(selectedRowKeys);
  // };

  const expandedRowRender = (record) => {
    if (record.key === "4") {
      console.log("record:", record);
      const columns = [
        {
          title: "ID",
          dataIndex: "id",
          key: "id",
          width: "8%",
        },
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
          width: "25%",
        },
        {
          title: "Quantity",
          dataIndex: "quantity",
          key: "quantity",
          width: "20%",
        },
        {
          title: "Assets",
          key: "assets",
          width: "20%",
          render: () => (
            <>
              <UnorderedListOutlined />
            </>
          ),
        },
        {
          title: "Status",
          key: "status",
          render: (text, record) => (
            <Tooltip title={`Start delivery for ${record.name}`}>
              <Button
                type={getStatusColor(record.status)}
                onClick={() => handelUpdateStatus(record)}
                // disabled={record.status === "Delivering"}
                style={
                  record.status === "Delivering"
                    ? { pointerEvents: "none", opacity: 0.6 }
                    : {}
                }
                unselectable="off"
              >
                {record.status}
              </Button>
            </Tooltip>
          ),
        },
      ];

      // const rowSelection = {
      //   selectedRowKeys,
      //   onChange: handleRowSelectChange,
      // };

      return (
        sentProcesses && (
          <Table
            columns={columns}
            dataSource={sentProcesses[`${receiver.toLowerCase()}Processes`]}
            pagination={false}
            // size="small"
            // rowSelection={rowSelection}
            scroll={{
              y: 100,
            }}
          />
        )
      );
    }
    return null;
  };

  const columns = [
    {
      title: "Field",
      dataIndex: "field",
      key: "field",
      width: "55%",
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
    },
  ];

  useEffect(() => {
    if (sentProcesses) {
      setProcessData([
        {
          key: "1",
          field: "Process ID",
          value: sentProcesses.processID,
          hasInternalTable: false,
        },
        {
          key: "2",
          field: "Total Process Assets Number",
          value: sentProcesses.totalAssets,
          hasInternalTable: false,
        },
        {
          key: "3",
          field: "Starting Process Date",
          value: sentProcesses.formattedDate,
          hasInternalTable: false,
        },
        {
          key: "4",
          field: "Receivers Data",
          hasInternalTable: true,
          defaultExpandAllRows: true,
        },
      ]);
    }
  }, [sentProcesses]);

  return (
    <div>
      <Table
        columns={columns}
        dataSource={processData}
        expandable={{
          expandedRowRender,
          // defaultExpandAllRows: true,
          rowExpandable: (record) => record.hasInternalTable,
          defaultExpandedRowKeys: ["4"],
        }}
        pagination={false}
        size="small"
        // rowClassName={(record) =>
        //   markedForDelivery.includes(record.key) ? "marked-for-delivery" : ""
        // }
      />
    </div>
  );
};

export default TrackingTable;
