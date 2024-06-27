import React, { useState } from "react";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const LocationTable = ({
  storesData,
  warehousesData,
  suppliersData,
  setSelectedItem,
  selectedItem,
}) => {
  const [openKeys, setOpenKeys] = useState(["1", "2", "3"]);

  const items = [
    {
      key: "1",
      icon: <MailOutlined />,
      label: "Suppliers",
      children: suppliersData.map((supplier) => ({
        key: `supplier-${supplier.properties.supplierID}`,
        label: supplier.properties.supplierName,
        data: supplier,
      })),
    },
    {
      key: "2",
      icon: <AppstoreOutlined />,
      label: "Warehouses",
      children: warehousesData.map((warehouse) => ({
        key: `warehouse-${warehouse.properties.warehouseID}`,
        label: warehouse.properties.warehouseName,
        data: warehouse,
      })),
    },
    {
      key: "3",
      icon: <SettingOutlined />,
      label: "Stores",
      children: storesData.map((store) => ({
        key: `store-${store.properties.storeID}`,
        label: store.properties.storeName,
        data: store,
      })),
    },
  ];

  const onOpenChange = (keys) => {
    setOpenKeys(keys);
  };

  const onSelect = (key) => {
    console.log(key.key);
    setSelectedItem(key.key);
  };

  return (
    <div>
      <Menu
        mode="inline"
        openKeys={openKeys}
        selectedKeys={selectedItem}
        onOpenChange={onOpenChange}
        onClick={onSelect}
        items={items}
        style={{ border: "0.3px solid lightgray", borderRadius: "3%" }}
      />
    </div>
  );
};

export default LocationTable;
