import MessageSubNavbar from "../../Components/Alert/Messages/MessageSubNavbar"
import React, { useEffect, useState } from "react";
import MessagesControllers from "../../Components/Alert/Messages/MessagesControllers"
import {
  PrinterOutlined,
} from "@ant-design/icons";
import { Button, Input } from "antd";
export default function Messages() {
  return (
    <div>
      <MessageSubNavbar
        title="Messages"
      />
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
        <Input.Search

          placeholder="Purchase Requests Search"

          className="search"
          style={{
            backgroundColor: "white",
            width: "100%",
          }}
        />

        <Button type="primary" icon={<PrinterOutlined />}>
          Print
        </Button>
      </div>
      <MessagesControllers
      />



    </div>
  );
} 