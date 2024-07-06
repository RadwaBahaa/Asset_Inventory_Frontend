import React, { useState, useEffect } from "react";
import { Layout, Dropdown, Space, Avatar } from "antd";
import SearchBar from "../../SearchBar";
import { Link, useLocation } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../../../store/Slices/login";
import "../CSS/TopNavBar.css";

const TopNavBar = () => {
  const { Header } = Layout;
  const location = useLocation();
  const dispatch = useDispatch();

  const [activeDropdown, setActiveDropdown] = useState("");

  const userName = useSelector((state) => state.login.userName);

  const addNew = [
    { label: <Link to="/addNew/assets">Assets</Link>, key: "Assets" },
    {
      label: <Link to="/addNew/categories">Categories</Link>,
      key: "Categories",
    },
    { label: <Link to="/addNew/requests">Requests</Link>, key: "Requests" },
    { label: <Link to="/addNew/location">Location</Link>, key: "Location" },
  ];

  const alert = [
    {
      label: <Link to="/alert/purchaserequests">Purchase Requests</Link>,
      key: "purchaserequests",
    },
    { label: <Link to="/alert/messages">Messages</Link>, key: "messages" },
  ];

  const user = [
    {
      label: <Link to="/user/viewprofile">View Profile</Link>,
      key: "viewprofile",
    },
    { type: "divider" },
    {
      label: (
        <Link to="/login" onClick={() => dispatch(setLogout())} type="danger">
          Logout
        </Link>
      ),
      key: "logout",
      danger: true,
    },
  ];

  // Determine which dropdown should be active based on the current path
  useEffect(() => {
    const path = location.pathname.split("/")[1];
    if (path) {
      if (["addNew"].includes(path)) {
        setActiveDropdown("addNew");
      } else if (["alert"].includes(path)) {
        setActiveDropdown("alert");
      } else if (["user"].includes(path)) {
        setActiveDropdown("user");
      } else {
        setActiveDropdown(""); // No active dropdown for other paths
      }
    } else {
      setActiveDropdown(""); // No active dropdown for other paths
    }
  }, [location.pathname]);

  return (
    <>
      <Header className="header">
        <div className="first-div">
          <Link to="/" className="CompanyName">
            Company Name
          </Link>
          <SearchBar />
        </div>
        <div>
          <Dropdown
            overlayClassName="dropdown-menu"
            menu={{ items: addNew }}
            className={`dropdown ${
              activeDropdown === "addNew" ? "dropdown-active" : ""
            }`}
          >
            <Link onClick={(e) => e.preventDefault()}>
              <Space>Add New</Space>
            </Link>
          </Dropdown>
          <Dropdown
            overlayClassName="dropdown-menu"
            menu={{ items: alert }}
            className={`dropdown ${
              activeDropdown === "alert" ? "dropdown-active" : ""
            }`}
          >
            <Link onClick={(e) => e.preventDefault()}>
              <Space>Alert</Space>
            </Link>
          </Dropdown>
          <Dropdown
            overlayClassName="dropdown-menu"
            menu={{ items: user }}
            className={`dropdown ${
              activeDropdown === "user" ? "dropdown-active" : ""
            }`}
          >
            <Link onClick={(e) => e.preventDefault()}>
              <Space>{userName}</Space>
              <Avatar size="large" icon={<UserOutlined />} className="avatar" />
            </Link>
          </Dropdown>
        </div>
      </Header>
    </>
  );
};

export default TopNavBar;
