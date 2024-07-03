import { LineOutlined, MenuOutlined } from "@ant-design/icons";
import { Card, Select, Radio } from "antd";
import { useEffect, useState } from "react";
import database from "../../../axios/database";

const AddAssetSetting = (props) => {
  const { setActiveComponent, activeComponent, setRole, setId } = props;
  const [secondDropdownData, setSecondDropdownData] = useState([]);
  const [firstDropdownValue, setFirstDropdownValue] = useState();
  const [secondDropdownValue, setSecondDropdownValue] = useState();

  const { Option } = Select;

  const handleFirstDropdownChange = async (value) => {
    try {
      const response = await database.get(`/${value}/read/json`);
      switch (value) {
        case "store":
          setSecondDropdownData(
            response.data.map((store) => ({
              key: store.storeID,
              name: store.storeName,
            }))
          );
          break;
        case "warehouse":
          setSecondDropdownData(
            response.data.map((warehouse) => ({
              key: warehouse.warehouseID,
              name: warehouse.warehouseName,
            }))
          );
          break;
        case "supplier":
          setSecondDropdownData(
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

  useEffect(() => {
    setFirstDropdownValue();
    setSecondDropdownValue();
  }, [activeComponent]);

  const handleSecondDropdownChange = (option) => {
    setSecondDropdownValue(option);
    setId(option.key);
    console.log(option.key);
  };

  return (
    <div className="asset_container" style={{ marginBottom: "20px" }}>
      <Card
        bordered={false}
        className="asset_card"
        style={{
          padding: "20px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          backgroundColor: "#ffffff",
        }}
      >
        <div style={{ marginBottom: "10px" }}>
          <Radio.Group
            options={[
              {
                label: (
                  <>
                    <MenuOutlined /> Company Wide
                  </>
                ),
                value: "companyWide",
              },
              {
                label: (
                  <>
                    <LineOutlined /> Specific Location
                  </>
                ),
                value: "specificLocation",
              },
            ]}
            onChange={(e) => setActiveComponent(e.target.value)}
            value={activeComponent}
            optionType="button"
            buttonStyle="solid"
          />
        </div>
        <div className="dropdown-container" style={{ display: "flex" }}>
          <Select
            placeholder="Select Location Type"
            onChange={handleFirstDropdownChange}
            style={{ width: 250, marginRight: "20px" }}
            disabled={activeComponent === "companyWide"}
          >
            <Option value="store">Store</Option>
            <Option value="warehouse">Warehouse</Option>
            <Option value="supplier">Supplier</Option>
          </Select>
          <Select
            placeholder="Select Name"
            value={secondDropdownValue}
            onChange={(value, option)=>handleSecondDropdownChange(option)}
            style={{ width: 250 }}
            disabled={!firstDropdownValue}
          >
            {secondDropdownData.map((item) => (
              <Option key={item.key} value={item.name}>
                {item.name}
              </Option>
            ))}
          </Select>
        </div>
      </Card>
    </div>
  );
};

export default AddAssetSetting;
