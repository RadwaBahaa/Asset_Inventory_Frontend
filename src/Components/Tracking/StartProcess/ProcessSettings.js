import React, { useEffect, useState } from "react";
import { Select } from "antd";

const ProcessSettings = (props) => {
  const { receiverData, selectedReceiver, setSelectedReceiver, processData } =
    props;

  const [viewedData, setViewedData] = useState([]);

  useEffect(() => {
    if (processData.length > 0) {
      setViewedData((prevData) =>
        prevData.filter(
          (item) =>
            !processData.find(
              (process) => process.receiverName === item.properties.name
            )
        )
      );
    }
  }, [processData]);

  useEffect(() => {
    if (receiverData.length > 0) {
      setViewedData(receiverData);
    }
  }, [receiverData]);

  const onSearch = (value) => {
    console.log("search:", value);
  };

  const onSelect = (value) => {
    console.log(selectedReceiver);
    setSelectedReceiver(
      viewedData.find((receiver) => receiver.properties.name === value)
    );
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
        value={selectedReceiver ? selectedReceiver.properties.name : null}
        size="large"
      >
        {receiverData.length > 0 &&
          viewedData.length > 0 &&
          viewedData.map((receiver) => (
            <Select.Option
              key={receiver.properties.id}
              value={receiver.properties.name}
              onSelect={() => onSelect(receiver)}
            ></Select.Option>
          ))}
      </Select>
    </div>
  );
};

export default ProcessSettings;
