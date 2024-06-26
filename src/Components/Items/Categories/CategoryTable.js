import React from "react";
import { Table } from "antd";

const CategoryTable = (props) => {
  const { categoriesData, selectedRowKeys, setSelectedRowKeys } = props;

  const onSelectChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "categoryID",
      key: "categoryID",
    },
    {
      title: "Category Name",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "50%",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: "20%",
    },
  ];

  return (
    <div id="categoriesTable">
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={categoriesData}
        pagination={false}
      />
    </div>
  );
};

export default CategoryTable;
