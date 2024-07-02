import React, { useEffect, useState } from "react";
import { HomeOutlined, ShoppingCartOutlined } from "@ant-design/icons"; // Import necessary icons
import SubNavbar from "../../Components/NavBars/SubNavbar";
import AddCompanyAssetForm from "../../Components/AddNew/AddAsset/AddAssetForm/Javascript/AddCompanyAssetForm";
import database from "../../axios/database";
import { Form, Modal, message } from "antd";
import AddAssetSetting from "../../Components/AddNew/AddAsset/AddAssetSetting";
import { useSelector } from "react-redux";
import AddSpecificAssetForm from "../../Components/AddNew/AddAsset/AddSpecificAssetForm";

export default function Assets() {
  const [activeComponent, setActiveComponent] = useState("companyWide");
  const [categories, setCategories] = useState([]);
  const [assetData, setAssetData] = useState(null);
  const [form] = Form.useForm(); // Create form instance
  const [assetList, setAssetList] = useState(null);

  const userRole = useSelector((state) => state.login.role);
  const userID = useSelector((state) => state.login.id);

  const [role, setRole] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    if (userRole !== "Admin") {
      setRole(userRole);
      setId(userID);
      setActiveComponent("specificLocation");
    }
  }, []);

  useEffect(() => {
    // Simulating API call to fetch categories
    if (activeComponent === "companyWide") {
      database
        .get("/categories/read")
        .then((response) => {
          setCategories(response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else if (userRole === "Admin" && activeComponent === "specificLocation") {
      database
        .get("/assets/read")
        .then((response) => {
          setAssetList(response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [activeComponent]);

  useEffect(() => {
    if (assetData) {
      if (activeComponent === "specificLocation") {
        database
          .post(`/${role}/assets/create/${id}`, assetData)
          .then((response) => {
            setAssetData(null);
            // Display success modal
            Modal.success({
              content: response.data,
            });
            form.resetFields();
          })
          .catch((error) => {
            message.error(`Error: ${error.message}`);
          });
      } else if (activeComponent === "companyWide") {
        database
          .post("/assets/create", assetData)
          .then((response) => {
            setAssetData(null);
            // Display success modal
            Modal.success({
              content: response.data,
            });
            form.resetFields();
          })
          .catch((error) => {
            message.error(`Error: ${error.message}`);
          });
      }
    }
  }, [assetData]);

  useEffect(() => {
    if (assetData) {
      setAssetData(null);
    }
  }, [activeComponent]);

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
      <div style={{ padding: "20px", backgroundColor: "#f0f2f5",margin:"20px" }}>
        <AddAssetSetting
          activeComponent={activeComponent}
          setActiveComponent={setActiveComponent}
          setRole={setRole}
          setId={setId}
        />
        <div>
          {activeComponent === "companyWide" ? (
            <AddCompanyAssetForm
              categories={categories}
              setAssetData={setAssetData}
              form={form}
            />
          ) : (
            <AddSpecificAssetForm
              assetList={assetList}
              setAssetData={setAssetData}
              form={form}
              id={id}
            />
          )}
        </div>
      </div>
    </div>
  );
}
