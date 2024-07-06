import {
  DownOutlined,
  LineOutlined,
  MenuOutlined,
  OrderedListOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Input, Menu, Segmented } from "antd";
import { useEffect } from "react";

const ViewTrackingSetting = ({ setActiveComponent, userRole }) => {
  const orderMenu = (
    <Menu
      style={{ width: "120%" }}
      // onClick={(e) => setOrder(e.key)}
    >
      <Menu.Item key="byID">ID</Menu.Item>
      <Menu.Item key="byName">Name</Menu.Item>
      <Menu.Item key="byCategory">Category</Menu.Item>
      <Menu.Item key="byPriceA">Price (Low to High)</Menu.Item>
      <Menu.Item key="byPriceD">Price (High to Low)</Menu.Item>
    </Menu>
  );

  useEffect(() => {
    console.log(userRole);
  }, [userRole]);

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
      }}
    >
      {/* <div
          style={{
            display: "flex",
            width: "65%",
            gap: "1%",
          }}
        > */}
      <Dropdown overlay={orderMenu} placement="bottomLeft">
        <Button icon={<OrderedListOutlined />} style={{ width: "6%" }}>
          <DownOutlined />
        </Button>
      </Dropdown>
      <Input.Search
        placeholder="Assets Search"
        allowClear
        className="search"
        style={{ backgroundColor: "white", width: "80%" }}
      />
      <Button
        type="primary"
        icon={<PrinterOutlined />}
        // onClick={handlePrint}
      >
        Print
      </Button>
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
  );
};

export default ViewTrackingSetting;
