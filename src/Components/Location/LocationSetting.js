import { DownOutlined, FilterOutlined } from "@ant-design/icons";
import { Button, Dropdown, Input, Menu, Select } from "antd";
import { useState } from "react";

const LocationSetting = (props) => {
  const { selectedLocation, setSearchBy, setSearch } = props;
  const [startServiceArea, setStartServiceArea] = useState(false);
  const [startLocationAllocation, setStartLocationAllocation] = useState(false);

  const handleFilterMenuClick = (e) => {
    console.log("Clicked on filter:", e.key);
  };

  const filterMenu = (
    <Menu onClick={handleFilterMenuClick} defaultValue={"All"}>
      <Menu.Item key="byCategory">All</Menu.Item>
      <Menu.Item key="byPrice">Suppliers</Menu.Item>
      <Menu.Item key="byPrice">Warehouses</Menu.Item>
      <Menu.Item key="byPrice">Stores</Menu.Item>
    </Menu>
  );
  const selectBeforeSearch = (
    <Select
      defaultValue="All"
      dropdownStyle={{ width: 150 }}
      onSelect={setSearchBy}
    >
      <Select.Option value="All" defaultValue>
        All
      </Select.Option>
      <Select.Option value="Supplier">Supplier</Select.Option>
      <Select.Option value="Warehouse">Warehouse</Select.Option>
      <Select.Option value="Store">Store</Select.Option>
    </Select>
  );
  const handleServiceAreaClick = () => {
    setStartServiceArea(!startServiceArea);
  };
  const handleLacationAllocationClick = () => {
    setStartLocationAllocation(!startLocationAllocation);
  };
  return (
    <div
      style={{
        display: "flex",
        gap: "16px",
        flexDirection: "column",
      }}
    >
      <Input.Search
        addonBefore={selectBeforeSearch}
        placeholder="Location Search"
        allowClear
        onSearch={(value) => setSearch(value)}
        onChange={(e) =>
          e.target.value === "" ? setSearch(e.target.value) : null
        }
        className="search"
        style={{ backgroundColor: "white", width: "100%" }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "16px",
        }}
      >
        <Button onClick={handleServiceAreaClick} style={{ width: "100%" }}>
          <FilterOutlined />
          Service Area
        </Button>
        <Button onClick={handleLacationAllocationClick}>
          <FilterOutlined />
          Location Allocation
        </Button>
      </div>
      {startServiceArea && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          <Dropdown overlay={filterMenu} trigger={["click"]}>
            <Button
              style={{ width: "100%" }}
              onClick={(e) => e.preventDefault()}
            >
              Filter
              <DownOutlined />
            </Button>
          </Dropdown>
        </div>
      )}
    </div>
  );
};

export default LocationSetting;
