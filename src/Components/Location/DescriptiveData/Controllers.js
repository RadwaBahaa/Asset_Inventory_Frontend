import React from "react";
import { Tabs } from "antd";
import DescriptiveTable from "./DescriptiveTable";
const onChange = (key) => {
  console.log(key);
};
const items = [
  {
    key: "1",
    label: "All",
    children: <DescriptiveTable />,
  },
  {
    key: "2",
    label: "Suppliers",
    children: <DescriptiveTable />,
  },
  {
    key: "3",
    label: "Warehouses",
    children: <DescriptiveTable />,
  },
  {
    key: "4",
    label: "Stores",
    children: <DescriptiveTable />,
  },
];
const Controllers = () => (
  <Tabs
    style={{
      marginTop: "15px",
      marginLeft: "24px",
    }}
    defaultActiveKey="1"
    items={items}
    onChange={onChange}
  />
);
export default Controllers;
