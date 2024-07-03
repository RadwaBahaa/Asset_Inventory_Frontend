import React, { useEffect } from "react";
import { Select } from "antd";
import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import { Segmented } from "antd";

const ProcessSettings = (props) => {
  const { receiverData, selectedReceiver, setSelectedReceiver } = props;

  const onSearch = (value) => {
    console.log("search:", value);
  };

  const onSelect = (option) => {
    setSelectedReceiver({
      name: option.value,
      key: option.key,
    });
  };

  return (
    <div
      style={{ marginBottom: "16px", display: "flex", alignItems: "center" }}
    >
      <Segmented
        style={{ marginRight: "8px" }} // Adjust margin-right for gap
        options={[
          {
            value: "List",
            icon: <BarsOutlined />,
          },
          {
            value: "Grid",
            icon: <AppstoreOutlined />,
          },
        ]}
      />
      <Select
        showSearch
        placeholder="Select a warehouse"
        optionFilterProp="label"
        onSelect={(value, option) => onSelect(option)}
        onSearch={onSearch}
        style={{ width: 620 }} // Set the width here
        value={selectedReceiver ? selectedReceiver.name : null}
      >
        {receiverData.length > 0 &&
          receiverData.map((receiver) => (
            <Select.Option key={receiver.key} value={receiver.name}>
              {receiver.name}
            </Select.Option>
          ))}
      </Select>
    </div>
  );
};

export default ProcessSettings;
