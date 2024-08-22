import React from "react";
import { HomeOutlined, UnorderedListOutlined } from "@ant-design/icons";
import SubNavbar from "../../Components/NavBars/SubNavbar";
import AddCategory from "../../Components/AddNew/AddCategory/Javascript/AddCategory";

export default function Requests() {
  return (
    <div>
      <SubNavbar
        title="Add Request"
        editButtonLabel={
          <>
            <HomeOutlined style={{ marginRight: "10px" }} />
            To Homepage
          </>
        }
        editButtonPath={"/"}
        addButtonLabel={
          <>
            <UnorderedListOutlined style={{ marginRight: "10px" }} />
            To Purchase Requests
          </>
        }
        addButtonPath={"/items/categories"}
      />
      <div style={{ padding: "20px" }}>
        <AddCategory />
      </div>
    </div>
  );
}
