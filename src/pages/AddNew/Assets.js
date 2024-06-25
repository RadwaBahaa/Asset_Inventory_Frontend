import React from "react";
import { HomeOutlined, ShoppingCartOutlined } from "@ant-design/icons"; // Import necessary icons
import SubNavbar from "../../Components/NavBars/SubNavbar";
import AddAssetForm from "../../Components/AddNew/AddAssetForm/Javascript/AddAssetForm";

export default function Assets() {
  return (
    <div>
      <SubNavbar
        title="Add Asset"
        editButtonLabel={
          <>
            <HomeOutlined style={{ marginRight: "10px" }} />
            To Home Page
          </>
        }
        editButtonPath={"/"}
        addButtonLabel={
          <>
            <ShoppingCartOutlined style={{ marginRight: "10px" }} />
            To Assets List
          </>
        }
        addButtonPath={"/items/assets"}
      />
      <div style={{ padding: "20px" }}>
        <AddAssetForm />
      </div>
    </div>
  );
}
