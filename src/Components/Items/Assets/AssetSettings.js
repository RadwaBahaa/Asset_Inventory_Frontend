import React from "react";
import { Menu, Dropdown, Button, Input, Select, Segmented } from "antd";
import {
  DeleteColumnOutlined,
  DeleteOutlined,
  DownOutlined,
  LineOutlined,
  MenuOutlined,
  OrderedListOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const AssetSettings = (props) => {
  const {
    setOrder,
    setSearch,
    setSearchBy,
    setActiveComponent,
    selectedRowKeys,
    handleDelete,
  } = props;

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
      <Select.Option value="Name" defaultValue>
        Name
      </Select.Option>
      <Select.Option value="Category">Category</Select.Option>
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
    pdf.save("assets.pdf");
  };

  return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "70%",
          gap: "1%",
          margin: "1.5%",
        }}
      >
        <Button
          type="primary"
          danger
          onClick={handleDelete}
          icon={<DeleteOutlined />}
          style={{ width: "5%" }}
          disabled={selectedRowKeys.length === 0}
        >
        </Button>
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
            { label: "General", value: "General", icon: <MenuOutlined /> },
            { label: "Specific", value: "Specific", icon: <LineOutlined /> },
          ]}
          onChange={setActiveComponent}
        />
        <Button type="primary" icon={<PrinterOutlined />} onClick={handlePrint}>
          Print
        </Button>
      </div>
  );
};

export default AssetSettings;
