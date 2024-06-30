import MessageSubNavbar from "../../Components/Alert/Messages/MessageSubNavbar";
import PurchaseRequestControllers from "../../Components/Location/LocationData/LocationDataControllers";
import React from "react";
import {
  PrinterOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Input, Segmented } from "antd";

export default function Messages() {
  return (
    <div style={{ height: "100vh", overflowY: "auto" }}>
      <MessageSubNavbar title="Purchase Requests" />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "50%",
          margin: "1.5%",
          gap: "2%",
        }}
      >
        {/* Filter Button
        <Dropdown placement="bottomLeft">
          <Button icon={<OrderedListOutlined />} style={{ width: "10%" }}>
            <DownOutlined />
          </Button>
        </Dropdown> */}

        {/* Search Bar */}
        <Input.Search
          // addonBefore={selectBeforeSearch}
          placeholder="Purchase Requests Search"
          // allowClear
          // onSearch={(value) => setSearch(value)}
          // onChange={(e) =>
          //   e.target.value === "" ? setSearch(e.target.value) : null
          // }
          className="search"
          style={{
            backgroundColor: "white",
            width: "100%",
          }}
        />
        {/* Print Button */}
        <Button type="primary" icon={<PrinterOutlined />}>
          Print
        </Button>
      </div>
      <PurchaseRequestControllers />

    </div>
  );
}
