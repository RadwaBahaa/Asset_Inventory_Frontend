import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Flex, Tooltip,Input } from 'antd';

const CategorySearchBar = () => {
  const { Search } = Input;
  function onSearch() {
    //Handle search function by using API
  }

  return (
    <Search
      
      placeholder="Categories Search"
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

export default CategorySearchBar;