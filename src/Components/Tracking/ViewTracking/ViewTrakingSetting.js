import {
  DownOutlined,
  LineOutlined,
  MenuOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Input, Menu, Segmented } from "antd";
import { useEffect } from "react";

const ViewTrackingSetting = ({
  setActiveComponent,
  userRole,
  sentProcesses,
  receivedProcesses,
  setSentProcesses,
  setReceivedProcesses,
}) => {
  const orderMenu = (
    <Menu onClick={(e) => handleMenuClick(e)} style={{ width: "120%" }}>
      <Menu.Item key="byID">Process ID</Menu.Item>
      <Menu.Item key="byDate">Date</Menu.Item>
    </Menu>
  );

  const handleMenuClick = (e) => {
    const key = e.key;
    if (key === "byID") {
      setSentProcesses(sortByProcessID(sentProcesses));
      setReceivedProcesses(sortByProcessID(receivedProcesses));
    } else if (key === "byDate") {
      setSentProcesses(sortByDate(sentProcesses));
      setReceivedProcesses(sortByDate(receivedProcesses));
    }
  };

  const sortByProcessID = (processes) => {
    return [...processes].sort((a, b) => a.processID - b.processID);
  };

  const sortByDate = (processes) => {
    return [...processes].sort(
      (a, b) => new Date(a.formattedDate) - new Date(b.formattedDate)
    );
  };

  useEffect(() => {
    console.log(userRole);
  }, [userRole]);

  const onSearch = (value) => {
    let filtered = [];

    if (sentProcesses) {
      filtered = sentProcesses.filter((item) => {
        return (
          item.processID.toString() === value ||
          item.assetName.toLowerCase().includes(value.toLowerCase())
        );
      });
      console.log(filtered);
    } else if (receivedProcesses) {
      filtered = receivedProcesses.filter((item) => {
        return (
          item.processID.toString() === value ||
          item.assetName.toLowerCase().includes(value.toLowerCase())
        );
      });
      console.log(filtered);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "1.5% 1.5% 0 1.5%",
        backgroundColor: "white",
        padding: "1%",
        borderRadius: "10px",
        // width: "50%",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "2%",
          width: "50%",
        }}
      >
        <Dropdown overlay={orderMenu} placement="bottomLeft">
          <Button icon={<OrderedListOutlined />} style={{ width: "6%" }}>
            <DownOutlined />
          </Button>
        </Dropdown>
        <Input.Search
          placeholder="Processes Search"
          allowClear
          className="search"
          onSearch={(value) => onSearch(value)}
          style={{ backgroundColor: "white", width: "80%" }}
        />
        {userRole && userRole === "Warehouse" && (
          <Segmented
            options={[
              {
                label: "Sending",
                value: "Sending",
                icon: <MenuOutlined />,
                onClick: () => setActiveComponent("Sending"),
              },
              {
                label: "Receiving",
                value: "Receiving",
                icon: <LineOutlined />,
                onClick: () => setActiveComponent("Receiving"),
              },
            ]}
            onChange={setActiveComponent}
          />
        )}
      </div>
    </div>
  );
};

export default ViewTrackingSetting;
