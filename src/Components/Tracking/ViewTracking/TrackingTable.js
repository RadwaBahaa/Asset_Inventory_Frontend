import React, { useEffect, useState } from "react";
import { Tooltip, Table, Button, Tag } from "antd";
import { UnorderedListOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";

const TrackingTable = ({
  senderProcessDetails,
  receiver,
  sender,
  handelUpdateStatus,
  userRole,
  activeComponent,
  queryRole,
  receiverProcessDetail,
}) => {
  const [processData, setProcessData] = useState([]);

  // useEffect(() => {
  //   if ((senderProcessDetails, receiver)) {
  //     setProcessData(senderProcessDetails[`${receiver}Processes`]);
  //     console.log(activeComponent);
  //     console.log(sender);
  //     // console.log(queryRole);
  //   }
  // }, [senderProcessDetails]);

  useEffect(() => {
    if (receiverProcessDetail) {
      console.log(receiverProcessDetail);
    }
  }, [receiverProcessDetail]);

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

  const handleButtonValue = (status) => {
    console.log(activeComponent, receiver, sender);
    switch (status) {
      case "Supplying":
        if (queryRole === "sender") {
          return "Start Delivering";
        } else if (queryRole === "receiver") {
          return "Supplying";
        }
      case "Delivering":
        if (queryRole === "receiver") {
          return "Receive Delivery";
        } else if (queryRole === "sender") {
          return "Delivering";
        }
      case "Inventory":
        return "Inventory";
      default:
        return "Supplying";
    }
  };

  const handleButtonStyle = (status) => {
    switch (status) {
      case "Supplying":
        if (queryRole === "sender") return {};
        else if (queryRole === "receiver")
          return { pointerEvents: "none", opacity: 0.6 };
      case "Delivering":
        if (queryRole === "receiver") return {};
        else if (queryRole === "sender")
          return { pointerEvents: "none", opacity: 0.6 };
      case "Inventory":
        return { pointerEvents: "none", opacity: 0.6 };
      default:
        return { pointerEvents: "none", opacity: 0.6 };
    }
  };

  const expandedRowRender = (record) => {
    if (record.key === "4") {
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
          width: "15%",
          render: (text, record) => (
            <>
              <UnorderedListOutlined key={record.id} />
            </>
          ),
        },
        {
          title: "Status",
          key: "status",
          render: (text, record) => {
            return (
              <Tooltip
                title={`Start delivery for ${record.name}`}
                key={record.id}
              >
                <Button
                  type={getStatusColor(record.status)}
                  style={handleButtonStyle(record.status)}
                  onClick={() => handelUpdateStatus(record)}
                  unselectable="off"
                >
                  {handleButtonValue(record.status)}
                </Button>
              </Tooltip>
            );
          },
        },
      ];

      return (
        senderProcessDetails &&
        receiver && (
          <Table
            columns={columns}
            dataSource={senderProcessDetails[`${receiver}Processes`]}
            pagination={false}
            scroll={{
              y: 100,
            }}
            rowKey="id" // Add rowKey for unique key prop
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
    if (senderProcessDetails) {
      setProcessData([
        {
          key: "1",
          field: "Process ID",
          value: senderProcessDetails.processID,
          hasInternalTable: false,
        },
        {
          key: "2",
          field: "Total Process Assets Number",
          value: senderProcessDetails.totalAssets,
          hasInternalTable: false,
        },
        {
          key: "3",
          field: "Starting Process Date",
          value: senderProcessDetails.formattedDate,
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
  }, [senderProcessDetails]);

  const receiverColumns = [
    {
      title: "Process ID",
      dataIndex: "processID",
      key: "processID",
      // width: "16%",
    },
    {
      title: "Sender Name",
      dataIndex: "senderName",
      key: "senderName",
      // width: "26%",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      // width: "10%",
    },
    {
      title: "Assets",
      key: "assets",
      // width: "15%",
      render: (text, record) => (
        <>
          <UnorderedListOutlined key={record.id} />
        </>
      ),
    },
    {
      title: "Status",
      key: "status",
      render: (text, record) => {
        return (
          <Tooltip title={`Start delivery for ${record.name}`} key={record.id}>
            <Button
              type={getStatusColor(record.status)}
              style={handleButtonStyle(record.status)}
              onClick={() => handelUpdateStatus(record)}
              unselectable="off"
            >
              {handleButtonValue(record.status)}
            </Button>
          </Tooltip>
        );
      },
    },
  ];

  return (
    sender &&
    receiver && (
      <div>
        {senderProcessDetails && queryRole === "sender" && (
          <Table
            columns={columns}
            dataSource={processData}
            expandable={{
              expandedRowRender,
              rowExpandable: (record) => record.hasInternalTable,
              defaultExpandedRowKeys: ["4"],
            }}
            pagination={false}
            size="small"
            rowKey="key" // Add rowKey for unique key prop
          />
        )}
        {receiverProcessDetail && queryRole === "receiver" && (
          <Table
            columns={receiverColumns}
            dataSource={[receiverProcessDetail]}
            pagination={false}
            scroll={{
              y: 100,
            }}
            rowKey="id" // Add rowKey for unique key prop
            size="small"
          />
        )}
      </div>
    )
  );
};

export default TrackingTable;
