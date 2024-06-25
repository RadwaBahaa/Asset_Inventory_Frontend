import {
  AppstoreOutlined,
  BarsOutlined,
  DownOutlined,
  OrderedListOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Menu, Segmented, Input } from "antd";
import { useState } from "react";

const AssetSettings = (props) => {
  const [activeComponent, setActiveComponent] = useState("List"); // Default to 'List'
  const { setOrder, setSearch } = props;

  const orderMenu = (
    <Menu style={{ width: "120%" }} onClick={(e) => setOrder(e.key)}>
      <Menu.Item key="byID">ID</Menu.Item>
      <Menu.Item key="byName">Name</Menu.Item>
      <Menu.Item key="byCategory">Category</Menu.Item>
      <Menu.Item key="byPriceA">Price (Low to High)</Menu.Item>
      <Menu.Item key="byPriceD">Price (High to Low)</Menu.Item>
    </Menu>
  );

  const handleSegmentedChange = (value) => {
    setActiveComponent(value);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "50%",
        margin: "1.5%",
        gap: "2%",
      }}
    >
      {/* Filter Button */}
      <Dropdown overlay={orderMenu} placement="bottomLeft">
        <Button icon={<OrderedListOutlined />} style={{ width: "10%" }}>
          <DownOutlined />
        </Button>
      </Dropdown>

      {/* Search Bar */}
      <Input.Search
        placeholder="Assets Search"
        allowClear
        onSearch={(value) => setSearch(value)}
        onChange={(e) =>
          e.target.value === "" ? setSearch(e.target.value) : null
        }
        className="search"
        style={{
          backgroundColor: "white",
          width: "100%",
        }}
      />
      <Segmented
        options={[
          { value: "List", icon: <BarsOutlined /> },
          { value: "Grid", icon: <AppstoreOutlined /> },
        ]}
        onChange={handleSegmentedChange}
      />
      {/* Print Button */}
      <Button type="primary" icon={<PrinterOutlined />}>
        Print
      </Button>
    </div>
  );
};

export default AssetSettings;
