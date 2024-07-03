import SubNavbar from "../../../Components/NavBars/SubNavbar";
import { HomeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import Controllers from "../../../Components/Location/DescriptiveData/Controllers";
import React from "react";
import { PrinterOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";

export default function LocationData() {
  return (
    <div style={{ height: "100vh", overflowY: "auto" }}>
      <SubNavbar
        title="Locations Data"
        editButtonLabel={
          <>
            <HomeOutlined style={{ marginRight: "8px" }} />
            To Home Page
          </>
        }
        editButtonPath={"/"}
        addButtonLabel={
          <>
            <ShoppingCartOutlined style={{ marginRight: "8px" }} />
            To Assets List
          </>
        }
        addButtonPath={"/items/assets"}
        style={{
          backgroundColor: "#f0f2f5", // Adjust background color
          borderBottom: "1px solid #e8e8e8", // Add a bottom border
          padding: "12px 24px", // Add padding for spacing
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "50%",
          margin: "1.5%",
        }}
      >
        {/* Search Bar */}
        <Input.Search
          placeholder="Location Search"
          className="search"
          style={{
            backgroundColor: "white",
            width: "calc(100% - 50px)", // Adjust width to accommodate the gap
            marginRight: "15px", // Add margin to create a gap
          }}
        />
        {/* Print Button */}
        <Button type="primary" icon={<PrinterOutlined />}>
          Print
        </Button>
      </div>
      <Controllers />
    </div>
  );
}
