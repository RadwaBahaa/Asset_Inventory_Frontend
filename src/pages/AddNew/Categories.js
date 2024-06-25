import React from "react";
import { ShoppingCartOutlined, HomeOutlined } from "@ant-design/icons";
import SubNavbar from "../../Components/NavBars/SubNavbar";
import AddCategoryForm from "../../Components/AddNew/AddCategoryForm/Javascript/AddCategoryForm";

export default function Categories() {
  return (
    <div>
      <SubNavbar
        title="Add Category"
        editButtonLabel={
          <>
            <HomeOutlined style={{ marginRight: "10px" }} />
            To Homepage
          </>
        }
        editButtonPath={"/"}
        addButtonLabel={
          <>
            <ShoppingCartOutlined style={{ marginRight: "10px" }} />
            To Category List
          </>
        }
        addButtonPath={"/addNew/addingSuccessfully"}
      />
      <div style={{ padding: "20px" }}>
        <AddCategoryForm />
      </div>
    </div>
  );
}
    // database
    //   .get("/assets/search", { params: { name: value } })
    //   .then((response) => {
    //     console.log(response.data);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
