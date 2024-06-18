import React from "react";
import { Input, Select } from "antd";

const SearchBar = () => {
  const { Search } = Input;

  const selectBefore = (
    <Select
      defaultValue="All"
      dropdownStyle={{ width: 150 }} // Static width for dropdown list
    >
      <Select.Option value="All" defaultValue>
        All
      </Select.Option>
      <Select.Option value="Assets">Assets</Select.Option>
      <Select.Option value="Categories">Categories</Select.Option>
      <Select.Option value="Stores">Stores</Select.Option>
      <Select.Option value="Warehouses">Warehouses</Select.Option>
      <Select.Option value="Suppliers">Suppliers</Select.Option>
    </Select>
  );

  function onSearch() {
    //Handle search function by using API
  }

  return (
    <Search
      addonBefore={selectBefore}
      placeholder="input search text"
      allowClear
      onSearch={onSearch}
      className="search"
      style={{
        backgroundColor: "white",
        borderRadius: "8px",
      }}
    />
  );
};

export default SearchBar;
