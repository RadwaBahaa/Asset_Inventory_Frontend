import React from "react";
import { Menu, Dropdown, Button, Input } from "antd";
import {
  BarsOutlined,
  DeleteOutlined,
  DownOutlined,
  OrderedListOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const CategorySettings = (props) => {
  const { setOrder, setSearch, selectedRowKeys, handleDelete } = props;

  const orderMenu = (
    <Menu style={{ width: "120%" }} onClick={(e) => setOrder(e.key)}>
      <Menu.Item key="byID">ID</Menu.Item>
      <Menu.Item key="byName">Name</Menu.Item>
    </Menu>
  );

  const handlePrint = async () => {
    const input = document.getElementById("categorysTable");
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
    pdf.save("categorys.pdf");
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
        style={{ width: "4.2%" }}
        disabled={selectedRowKeys.length === 0}
      ></Button>
      <Dropdown overlay={orderMenu} placement="bottomLeft">
        <Button icon={<OrderedListOutlined />} style={{ width: "6%" }}>
          <DownOutlined />
        </Button>
      </Dropdown>
      <Input.Search
        placeholder="Categorys Search"
        allowClear
        onSearch={(value) => setSearch(value)}
        onChange={(e) =>
          e.target.value === "" ? setSearch(e.target.value) : null
        }
        className="search"
        style={{ backgroundColor: "white", width: "90%" }}
      />
      <Button type="primary" icon={<PrinterOutlined />} onClick={handlePrint}>
        Print
      </Button>
    </div>
  );
};

export default CategorySettings;
