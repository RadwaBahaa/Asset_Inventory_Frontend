import { useState } from "react";
import { Select } from "antd";

const SearchBar = () => {
  // useState hook to manage the state of selected items.
  const [selectedItems, setSelectedItems] = useState([]);

  return (
    // Have to change the select component to be a search bar component.
    // Render the Select component from Ant Design.
    <Select
      mode="multiple" // Allow multiple items to be selected.
      placeholder="Search"
      value={selectedItems}
      onChange={setSelectedItems}
      style={{
        width: "300px",
      }}
    />
  );
};

export default SearchBar;
