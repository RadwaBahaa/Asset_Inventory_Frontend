import { FilterOutlined } from "@ant-design/icons";
import { Button, Input, Select } from "antd";

const LocationSetting = (props) => {
  const {
    setSearchBy,
    setSearch,
    setStartServiceArea,
    startServiceArea,
    selectedLocation,
    setServiceAreaData, // Add setServiceAreaData prop
  } = props;

  const handleServiceAreaClick = () => {
    setStartServiceArea(!startServiceArea); // Toggle startServiceArea
    if (!startServiceArea) {
      // Reset serviceAreaData when toggling off
      setServiceAreaData(null);
    }
  };

  return (
    <div style={{ display: "flex", gap: "16px", flexDirection: "column" }}>
      <Input.Search
        addonBefore={
          <Select
            defaultValue="All"
            dropdownStyle={{ width: 150 }}
            onSelect={setSearchBy}
          >
            <Select.Option value="All">All</Select.Option>
            <Select.Option value="Supplier">Supplier</Select.Option>
            <Select.Option value="Warehouse">Warehouse</Select.Option>
            <Select.Option value="Store">Store</Select.Option>
          </Select>
        }
        placeholder="Location Search"
        allowClear
        onSearch={(value) => setSearch(value)}
        onChange={(e) => {
          if (e.target.value === "") setSearch("");
        }}
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
        <Button
          onClick={handleServiceAreaClick}
          type={startServiceArea ? "primary" : "default"}
          style={{ width: "100%" }}
          // ghost={!startServiceArea}
          disabled={!selectedLocation}
        >
          <FilterOutlined />
          {startServiceArea ? "Disable Service Area" : "Enable Service Area"}
        </Button>
        <Button style={{ width: "100%" }} disabled={!selectedLocation}>
          <FilterOutlined />
          Location Allocation
        </Button>
      </div>
    </div>
  );
};

export default LocationSetting;
