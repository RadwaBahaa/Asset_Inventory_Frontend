import { DatabaseOutlined } from "@ant-design/icons";
import { Steps, Table } from "antd";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const ProcessesTable = (props) => {
  const { sentProcesses, sender, receivedProcesses, receiver } = props;

  useEffect(() => {
    console.log("senderProcessData", sentProcesses);
    console.log("receiverProcessData", receivedProcesses);
  }, [sentProcesses, receivedProcesses]);

  const handleStepper = (record) => {
    if (record) {
      const stageCompletionStep = record.stageCompletionStep;
      if (stageCompletionStep.supplying < 100) {
        return 0;
      } else if (
        (stageCompletionStep.supplying === 100,
        stageCompletionStep.delivering < 100)
      ) {
        return 1;
      } else if (stageCompletionStep.delivering === 100) {
        return 2;
      }
    }
  };

  const items = [
    {
      title: "Supplying",
    },
    {
      title: "Delivering",
    },
    {
      title: "Inventory",
    },
  ];

  const senderColumns = [
    {
      title: "Process ID",
      dataIndex: "processID",
      key: "processID",
      width: "8%",
    },
    {
      title: "Total Process Assets",
      dataIndex: "totalAssets",
      key: "totalAssets",
      width: "15%",
    },
    {
      title: "Starting Process Date",
      dataIndex: "formattedDate",
      key: "formattedDate",
      width: "25%",
    },
    {
      title: "Details",
      dataIndex: "details",
      key: "details",
      width: "10%",
      render: (text, record) => (
        <Link
          to={`/tracking/viewtracking?role=sender&processID=${record.processID}`}
        >
          <DatabaseOutlined style={{ width: "100%" }} />
        </Link>
      ),
    },
    {
      title: "Stage",
      dataIndex: "stage",
      key: "stage",
      width: "40%",
      render: (text, record) => (
        <Steps
          style={{
            marginTop: 8,
          }}
          // progressDot
          percent={
            handleStepper(record) === 0
              ? record.stageCompletionStep.suppling
              : handleStepper(record) === 1
              ? record.stageCompletionStep.dilevering
              : record.stageCompletionStep.inventory
          }
          size="small"
          items={items}
          current={handleStepper(record)}
        />
      ),
    },
  ];

  const receiverColumns = [
    {
      title: "Process ID",
      dataIndex: "processID",
      key: "processID",
      width: "8%",
    },
    {
      title: "Sender ID",
      dataIndex: "senderID",
      key: "senderID",
      width: "8%",
    },
    {
      title: "Sender Name",
      dataIndex: "senderName",
      key: "senderName",
      width: "8%",
    },
    {
      title: "Total Process Assets",
      dataIndex: "quantity",
      key: "quantity",
      width: "15%",
    },
    {
      title: "Starting Process Date",
      dataIndex: "formattedDate",
      key: "formattedDate",
      width: "25%",
    },
    {
      title: "Details",
      dataIndex: "details",
      key: "details",
      width: "10%",
      render: (text, record) => (
        <Link
          to={`/tracking/viewtracking?role=receiver&processID=${record.processID}`}
        >
          <DatabaseOutlined style={{ width: "100%" }} />
        </Link>
      ),
    },
    {
      title: "Stage",
      dataIndex: "status",
      key: "status",
      width: "40%",
      render: (text, record) => (
        <Steps
          style={{
            marginTop: 8,
          }}
          progressDot
          size="small"
          items={items}
          current={
            record.status === "Supplying"
              ? 0
              : record.status === "Delivering"
              ? 1
              : 2
          }
        />
      ),
    },
  ];

  return (
    <div>
      {sentProcesses && (
        <Table
          columns={senderColumns}
          dataSource={sentProcesses}
          pagination={true}
          key={sentProcesses.key}
        />
      )}
      {receivedProcesses && (
        <Table
          columns={receiverColumns}
          dataSource={receivedProcesses}
          pagination={true}
          key={receivedProcesses.key}
        />
      )}
    </div>
  );
};

export default ProcessesTable;
