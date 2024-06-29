import React, { useState } from "react";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import "./LocationTable.css";

const LocationTable = (props) => {
  const { locations, setSelectedItem, selectedItem, serviedLocations } = props;
  const [openKeys, setOpenKeys] = useState(["1", "2", "3"]);

  if (!locations) {
    return <div>Loading...</div>; // You can also return null or a loading spinner
  }

  const isServicedBySupplier = (location) => {
    return serviedLocations?.some(
      (servicedLocation) =>
        servicedLocation.properties.warehouseID ===
        location.properties.warehouseID
    );
  };

  const isServicedByWarehouse = (location) => {
    return serviedLocations?.some(
      (servicedLocation) =>
        servicedLocation.properties.storeID === location.properties.storeID
    );
  };

  const items = [
    {
      key: "1",
      icon: <MailOutlined />,
      label: "Suppliers",
      children: locations.suppliers.map((supplier) => ({
        key: `supplier-${supplier.properties.supplierID}`,
        label: supplier.properties.supplierName,
        data: supplier,
        // className: isServiced(supplier) ? "serviced-location" : "",
      })),
    },
    {
      key: "2",
      icon: <AppstoreOutlined />,
      label: "Warehouses",
      children: locations.warehouses.map((warehouse) => ({
        key: `warehouse-${warehouse.properties.warehouseID}`,
        label: warehouse.properties.warehouseName,
        data: warehouse,
        className: isServicedBySupplier(warehouse) ? "serviced-location" : "",
      })),
    },
    {
      key: "3",
      icon: <SettingOutlined />,
      label: "Stores",
      children: locations.stores.map((store) => ({
        key: `store-${store.properties.storeID}`,
        label: store.properties.storeName,
        data: store,
        className: isServicedByWarehouse(store) ? "serviced-location" : "",
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
        aria-multiselectable
        mode="inline"
        openKeys={openKeys}
        selectedKeys={selectedItem ? [selectedItem] : []}
        onOpenChange={onOpenChange}
        onClick={onSelect}
        items={items}
        style={{ border: "0.3px solid lightgray", borderRadius: "3%" }}
      />
    </div>
  );
};

export default LocationTable;
