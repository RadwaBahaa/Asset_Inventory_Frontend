import { LineOutlined, MenuOutlined } from "@ant-design/icons";
import { Card, Segmented, Select } from "antd";
import { useEffect, useState } from "react";
import database from "../../../axios/database";

const AddAssetSetting = (props) => {
  const { setActiveComponent, activeComponent, setRole, setId } = props;
  const [secondDropownData, setSecondDropownData] = useState([]);
  const [firstDropdownValue, setFirstDropdownValue] = useState("");
  const [secondDropdownValue, setSecondDropdownValue] = useState(null);

  const { Option } = Select;

  const handleFirstDropdownChange = async (value) => {
    try {
      const response = await database.get(`/${value}/read/json`);
      switch (value) {
        case "store":
          setSecondDropownData(
            response.data.map((store) => ({
              key: store.storeID,
              name: store.storeName,
            }))
          );
          break;
        case "warehouse":
          setSecondDropownData(
            response.data.map((warehouse) => ({
              key: warehouse.warehouseID,
              name: warehouse.warehouseName,
            }))
          );
          break;
        case "supplier":
          setSecondDropownData(
            response.data.map((supplier) => ({
              key: supplier.supplierID,
              name: supplier.supplierName,
            }))
          );
          break;
        default:
          setActiveComponent({});
          break;
      }
      setFirstDropdownValue(value);
      setRole(value);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    setSecondDropdownValue(null);
  }, [firstDropdownValue]);

  const handleSecondDropdownChange = (option) => {
    setSecondDropdownValue(option);
    setId(option.key);
    console.log(option.key);
  };

  return (
    <div className="asset_container" style={{ marginBottom: "20px" }}>
      <Card bordered={false} className="asset_card">
        <Segmented
          options={[
            {
              label: "Company Wide",
              value: "companyWide",
              icon: <MenuOutlined />,
            },
            {
              label: "Specific Location",
              value: "specificLocation",
              icon: <LineOutlined />,
            },
          ]}
          onChange={setActiveComponent}
        />
        <div>
          <Select
            placeholder="Select Location Type"
            onChange={handleFirstDropdownChange}
            style={{ width: 200 }}
            disabled={activeComponent === "companyWide"}
          >
            <Option value="store">Store</Option>
            <Option value="warehouse">Warehouse</Option>
            <Option value="supplier">Supplier</Option>
          </Select>
          <Select
            placeholder="Select Name"
            key={secondDropownData.value}
            value={secondDropdownValue}
            onChange={(value, option) => handleSecondDropdownChange(option)}
            style={{ width: 200 }}
            disabled={!firstDropdownValue}
          >
            {secondDropownData.map((item) => (
              <Select.Option key={item.key} value={item.name}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </div>
      </Card>
    </div>
  );
};

export default AddAssetSetting;
