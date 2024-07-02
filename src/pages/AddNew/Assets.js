import React, { useEffect, useState } from "react";
import { HomeOutlined, ShoppingCartOutlined } from "@ant-design/icons"; // Import necessary icons
import SubNavbar from "../../Components/NavBars/SubNavbar";
import AddAssetForm from "../../Components/AddNew/AddAsset/AddAssetForm/Javascript/AddAssetForm";
import database from "../../axios/database";
import { Form, Modal, message } from "antd";
import { useParams } from "react-router-dom";
import AddAssetSetting from "../../Components/AddNew/AddAsset/AddAssetSetting";

export default function Assets() {
  // const [activeComponent, setActiveComponent] = useState("companyWide");
  const [categories, setCategories] = useState([]);
  const [assetData, setAssetData] = useState(null);
  const [form] = Form.useForm(); // Create form instance
  const { role, id } = useParams();

  useEffect(() => {
    // Simulating API call to fetch categories
    database
      .get("/categories/read")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    if (role && id) {
      database
        .get(`/${role}/assets/create`, { id: id })
        .then((response) => {
          setAssetData(response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      if (assetData) {
        database
          .post("/assets/create", assetData)
          .then((response) => {
            console.log("Asset created:", response.data);
            // Display success modal
            Modal.success({
              content: response.data,
            });
            form.resetFields();
          })
          .catch((error) => {
            if (error.response) {
              // Server responded with a status other than 200 range
              message.error(`${error.response.data}`);
            } else if (error.request) {
              // Request was made but no response was received
              message.error("Error: No response from the server.");
            } else {
              // Something happened in setting up the request
              message.error(`Error: ${error.message}`);
            }
          });
      }
    }
  }, [assetData]);

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
      {/* <AddAssetSetting /> */}
      <div style={{ padding: "20px" }}>
        <AddAssetForm
          categories={categories}
          setAssetData={setAssetData}
          form={form}
        />
      </div>
    </div>
  );
}
