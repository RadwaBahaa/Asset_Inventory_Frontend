import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Menu, Dropdown, Button, Input, Select, Segmented } from "antd";
import {
  DeleteOutlined,
  DownOutlined,
  LineOutlined,
  MenuOutlined,
  OrderedListOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import database from "../../../axios/database";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const AssetSettings = (props) => {
  const {
    setOrder,
    setSearch,
    setSearchBy,
    setActiveComponent,
    selectedRowKeys,
    handleDelete,
    activeComponent,
  } = props;

  const userRole = useSelector((state) => state.login.role);
  const userID = useSelector((state) => state.login.id);
  const [secondDropownData, setSecondDropownData] = useState([]);
  const [firstDropdownValue, setFirstDropdownValue] = useState("");
  const [secondDropdownValue, setSecondDropdownValue] = useState(null);
  const [role, setRole] = useState("");
  const [id, setId] = useState("");
  const navigate = useNavigate();

  const orderMenu = (
    <Menu style={{ width: "120%" }} onClick={(e) => setOrder(e.key)}>
      <Menu.Item key="byID">ID</Menu.Item>
      <Menu.Item key="byName">Name</Menu.Item>
      <Menu.Item key="byCategory">Category</Menu.Item>
      <Menu.Item key="byPriceA">Price (Low to High)</Menu.Item>
      <Menu.Item key="byPriceD">Price (High to Low)</Menu.Item>
    </Menu>
  );

  const selectBeforeSearch = (
    <Select
      defaultValue="Name"
      dropdownStyle={{ width: 150 }}
      onSelect={setSearchBy}
    >
      <Option value="Name" defaultValue>
        Name
      </Option>
      <Option value="Category">Category</Option>
    </Select>
  );

  const handlePrint = async () => {
    const input = document.getElementById("assetsTable");
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    // Define margins
    const margin = 10; // 10 units of margin

    const contentWidth = pdfWidth - margin * 2;
    const contentHeight = (imgProps.height * contentWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", margin, margin, contentWidth, contentHeight);
    pdf.save("Assets.pdf");
  };

  useEffect(() => {
    if (userRole !== "Admin") {
      setRole(userRole);
      setId(userID);
    }
  }, [userRole]);

  const handleFirstDropdownChange = async (value) => {
    setFirstDropdownValue(value);
    setRole(value);
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
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    setSecondDropdownValue(null);
  }, [firstDropdownValue]);

  const handleSecondDropdownChange = (option) => {
    setSecondDropdownValue(option);
  };

  useEffect(() => {
    if (secondDropdownValue) {
      setId(secondDropdownValue.key);
    }
  }, [secondDropdownValue]);

  useEffect(() => {
    if (activeComponent === "Specific" && role && id) {
      navigate(`/items/assets?role=${role}&id=${id}`);
    } else if (activeComponent === "Overview") {
      navigate("/items/assets");
    }
  }, [activeComponent, id]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        // width: "96.5%",
        margin: "1.5% 1.5% 0 1.5%",
        backgroundColor: "white",
        padding: "1%",
        borderRadius: "10px",
        // boxShadow: "0 2px 10px 0 rgba(0, 0, 0, 0.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "65%",
          gap: "1%",
        }}
      >
        <Button
          type="primary"
          danger
          onClick={handleDelete}
          icon={<DeleteOutlined />}
          style={{ width: "5%" }}
          disabled={selectedRowKeys.length === 0}
        ></Button>
        <Dropdown overlay={orderMenu} placement="bottomLeft">
          <Button icon={<OrderedListOutlined />} style={{ width: "6%" }}>
            <DownOutlined />
          </Button>
        </Dropdown>
        <Input.Search
          addonBefore={selectBeforeSearch}
          placeholder="Assets Search"
          allowClear
          onSearch={(value) => setSearch(value)}
          onChange={(e) =>
            e.target.value === "" ? setSearch(e.target.value) : null
          }
          className="search"
          style={{ backgroundColor: "white", width: "80%" }}
        />
        <Segmented
          options={[
            {
              label: "Overview",
              value: "Overview",
              icon: <MenuOutlined />,
              onClick: () => setActiveComponent("Overview"),
            },
            {
              label: "Specific",
              value: "Specific",
              icon: <LineOutlined />,
              onClick: () => setActiveComponent("Specific"),
            },
          ]}
          onChange={setActiveComponent}
        />
        <Button type="primary" icon={<PrinterOutlined />} onClick={handlePrint}>
          Print
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          gap: "2%",
        }}
      >
        {userRole === "Admin" && activeComponent === "Specific" && (
          <>
            <Select
              placeholder="Select Location Type"
              onChange={handleFirstDropdownChange}
              style={{ width: 200 }}
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
          </>
        )}
      </div>
    </div>
  );
};

export default AssetSettings;
