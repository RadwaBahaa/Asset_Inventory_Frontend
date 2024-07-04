import React, { useEffect } from "react";
import { Select } from "antd";
import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import { Segmented } from "antd";

const ProcessSettings = (props) => {
  const { receiverData, selectedReceiver, setSelectedReceiver } = props;

  const onSearch = (value) => {
    console.log("search:", value);
  };

  const onSelect = (value) => {
    // console.log(
    //   receiverData.find((receiver) => receiver.properties.name === value)
    // );
    setSelectedReceiver(
      receiverData.find((receiver) => receiver.properties.name === value)
    );
    // console.log(selectedReceiver);
    // setSelectedReceiver(selectedReceiver);
  };

  return (
    <div
      style={{ marginBottom: "16px", display: "flex", alignItems: "center" }}
    >
      <Select
        showSearch
        placeholder="Select a warehouse"
        optionFilterProp="label"
        onSelect={onSelect}
        onSearch={onSearch}
        style={{ width: 620 }} // Set the width here
        value={selectedReceiver ? selectedReceiver.name : null}
      >
        {receiverData.length > 0 &&
          receiverData.map((receiver) => (
            <Select.Option
              key={receiver.properties.id}
              value={receiver.properties.name}
              onSelect={() => onSelect(receiver)}
            >
              {receiver.name}
            </Select.Option>
          ))}
      </Select>
    </div>
  );
};

export default ProcessSettings;
