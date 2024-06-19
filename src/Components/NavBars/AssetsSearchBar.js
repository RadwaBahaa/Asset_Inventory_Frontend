import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Flex, Tooltip,Input } from 'antd';
const SeconedSearchBar = () => {
  const { Search } = Input;
  function onSearch() {
    //Handle search function by using API
  }

  return (
    <Search
      
      placeholder="Assets Search"
      allowClear
      onSearch={onSearch}
      className="search"
      style={{
        backgroundColor: "white",
        borderRadius: "8px",
        width: "350px"
      }}
    />
  );
};

export default SeconedSearchBar;