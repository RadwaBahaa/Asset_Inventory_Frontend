import React, { useEffect, useState } from "react";
import SubNavbar from "../../Components/NavBars/SubNavbar";
import { PlusOutlined, HomeOutlined } from "@ant-design/icons";
import { Button, Divider } from "antd";
import CategoryTable from "../../Components/Items/Categories/CategoryTable";
import CategorySettings from "../../Components/Items/Categories/CategorySettings";
import database from "../../axios/database";

export default function Categories() {
  const [categoriesData, setCategoriesData] = useState([]);
  const [order, setOrder] = useState("byID");
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const action = (
    <div style={{ display: "flex", gap: "5%" }}>
      <Button type="primary" ghost>
        Edit
      </Button>
      <Button type="primary" danger ghost>
        Delete
      </Button>
    </div>
  );

  const sortCategories = (categories, order) => {
    switch (order) {
      case "byID":
        return categories.sort(
          (a, b) => parseInt(a.categoryID) - parseInt(b.categoryID)
        );
      case "byName":
        return categories.sort((a, b) =>
          a.categoryName.localeCompare(b.categoryName)
        );
      default:
        return categories;
    }
  };
  let fetchCategories = async () => {
    try {
      let response;
      if (search !== "") {
        switch (searchBy) {
          case "Category":
            response = await database.get("/categories/search", {
              params: { category: search },
            });
            break;
          default:
            response = await database.get("/categories/search", {
              params: { name: search },
            });
        }
      } else {
        response = await database.get("/categories/read");
      }
      setCategoriesData(
        response.data.map((category) => ({
          key: category.categoryID,
          categoryID: category.categoryID,
          categoryName: category.categoryName,
          action: action,
        }))
      );
    } catch (error) {
      console.error(error);
      setCategoriesData([]);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, [search]);

  useEffect(() => {
    console.log("Order:", order);
    setCategoriesData((categories) => sortCategories([...categories], order));
  }, [order]);

  const handleDelete = async () => {
    try {
      await Promise.all(
        selectedRowKeys.map(async (categoryID) => {
          await database.delete(`/categories/delete/${categoryID}`);
        })
      );
      setSelectedRowKeys([]);
      fetchCategories();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <SubNavbar
        title="Categories"
        editButtonLabel={
          <>
            <HomeOutlined />
            <span style={{ marginLeft: "8px" }}>To Home Page</span>
          </>
        }
        editButtonPath="/"
        addButtonLabel={
          <>
            <PlusOutlined />
            <span style={{ marginLeft: "8px" }}>Add Category</span>
          </>
        }
        addButtonPath="/addNew/categories"
      />

      <CategorySettings
        setOrder={setOrder}
        setSearch={setSearch}
        setSearchBy={setSearchBy}
        selectedRowKeys={selectedRowKeys}
        handleDelete={handleDelete}
      />
      {/* Icons Segmented Control */}
      <Divider />
      {/* Conditional rendering based on activeComponent state */}
      <CategoryTable
        categoriesData={categoriesData}
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
      />
    </div>
  );
}
