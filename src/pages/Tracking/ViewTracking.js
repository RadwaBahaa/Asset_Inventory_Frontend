import React, { useEffect, useState } from "react";
import TrackingSubNavbar from "../../Components/NavBars/TrackingSubNavBar";
import {
  DownOutlined,
  PlusOutlined,
  // PrinterOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Menu, Input, Select, message } from "antd";
import StepsComponent from "../../Components/Tracking/ViewTracking/StepsComponent";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import TrackingTable from "../../Components/Tracking/ViewTracking/TrackingTable"; // Adjust the import path as per your project structure
// import AssetsSearchBar from '../../Components/Items/AssetsSearchBar';
// import TrackingTable from "../../Components/Tracking/ViewTracking/TrackingTable";
import { useSelector } from "react-redux";
import database from "../../axios/database";
import { Box } from "@mui/material";

export default function ViewTracking() {
  // const [activeComponent, setActiveComponent] = useState("Location"); // Set default to 'Location'

  const [sentProcesses, setSentProcesses] = useState([]);
  const [buttonStatus, setButtonStatus] = useState([]);

  const userRole = useSelector((state) => state.login.role);
  const userID = useSelector((state) => state.login.id);

  const [sender, setSender] = useState(null);
  const [receiver, setReceiver] = useState(null);

  // const items = [
  //   { label: "All" },
  //   { label: "Suppliers" },
  //   { label: "Warehouses" },
  //   { label: "Stores" },
  // ];

  const [searchValue, setSearch] = useState(""); // State for search input value
  const [searchBy, setSearchBy] = useState("Name"); // State for search by option

  // const handleSegmentedChange = (value) => {
  //   setActiveComponent(value);
  // };

  const handleFilterMenuClick = (e) => {
    console.log("Clicked on filter:", e.key);
    // Handle filtering logic based on selected option (e.g., by Category, by Price)
  };

  const filterMenu = (
    <Menu onClick={handleFilterMenuClick}>
      <Menu.Item key="byCategory">Time</Menu.Item>
      <Menu.Item key="byCategory">Cost</Menu.Item>
    </Menu>
  );

  const pageStyle = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  };

  // const contentStyle = {
  //   flex: 1,
  //   overflowY: "auto",
  //   padding: "16px",
  // };

  const buttonContainerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginTop: "16px",
    marginLeft: "24px",
  };

  // const footerStyle = {
  //   background: "#f1f1f1",
  //   padding: "16px",
  //   textAlign: "center",
  //   zIndex: 1,
  //   position: "relative",
  // };

  useEffect(() => {
    if (userRole === "Supplier") {
      fetchSenderProcesses("supplier", "warehouse", userID);
      setSender("Supplier");
      setReceiver("Warehouse");
    } else if (userRole === "Warehouse") {
      fetchSenderProcesses("warehouse", "store", userID);
      fetchReceiverProcesses("warehouse", userID);
      setSender("Warehouse");
      setReceiver("Store");
    } else if (userRole === "Store") {
      fetchReceiverProcesses("store", userID);
      setSender("Warehouse");
      setReceiver("Store");
    }
  }, [userRole, userID]);

  const fetchReceiverProcesses = (endpoint, idField, nameField, type) => {
    // database
    //   .get(`${endpoint}/process/read/${userID}`)
    //   .then((response) => {
    //     console.log(response.data);
    // setReceivedProcesses(response.data);
    //     // const responseData = response.data.map((item) => ({
    //     //   ...item,
    //     //   properties: {
    //     //     ...item.properties,
    //     //     id: item.properties[idField],
    //     //     name: item.properties[nameField],
    //     //     type,
    //     //   },
    //     // }));
    //     // setReceiverData(responseData);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  };

  const fetchSenderProcesses = async (sender, receiver, userID) => {
    await database
      .get(`delivery-process/${sender}-${receiver}/read-by-${sender}/${userID}`)
      .then((response) => {
        const responseData = response.data.map((item) => ({
          ...item,
          [`${receiver}Processes`]: item[`${receiver}Processes`].map(
            (process) => ({
              ...process,
              id: process[receiver][`${receiver}ID`],
              name: process[receiver][`${receiver}Name`],
            })
          ),
        }));
        console.log(responseData);
        setSentProcesses(responseData);
        // const responseData = response.data.map((item) => ({
        //   ...item,
        //   properties: {
        //     ...item.properties,
        //     id: item.properties[idField],
        //     name: item.properties[nameField],
        //     type,
        //   },
        // }));
        // setReceiverData(responseData);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handelUpdateStatus = (record) => {
    // console.log("record:", record);
    // console.log(sentProcesses[0].processID);
    // console.log(record.id);
    database
      .put(
        `/${receiver}/process/update/${sentProcesses[2].processID}/${record.id}`
      )
      .then(() => {
        // setButtonStatus((prev) => ({
        //   ...prev,
        //   [record.storeID]: "Delivering",
        // }));
        // Fetch updated data and update state
        fetchSenderProcesses(sender, receiver, userID);
        message.success(`Delivery of ${receiver} started successfully`);
      })
      .catch((error) => {
        // message.error(error);
        message.error(`Error: ${error.message}`);
      });
  };

  // const selectBeforeSearch = (
  //   <Select
  //     defaultValue="Search Type"
  //     dropdownStyle={{ width: 150 }}
  //     onSelect={(value) => setSearchBy(value)}
  //   >
  //     <Select.Option value="Time" defaultValue>
  //       Time
  //     </Select.Option>
  //     <Select.Option value="Cost">Cost</Select.Option>
  //   </Select>
  // );

  return (
    <>
      <TrackingSubNavbar
        title="View Tracking"
        addButtonLabel={
          <>
            <PlusOutlined />
            <span style={{ marginLeft: "8px" }}>Add Location</span>
          </>
        }
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          // width: "80%",
          padding: "2%",
          height: "100%",
        }}
      >
        {/* <div style={buttonContainerStyle}> */}
        {/* <Dropdown overlay={filterMenu} placement="bottomLeft">
            <Button icon={<FilterOutlined />} style={{ width: "60px" }}>
              <DownOutlined />
            </Button>
          </Dropdown>
          <Input.Search
            addonBefore={selectBeforeSearch}
            placeholder="Location Search"
            allowClear
            onSearch={(value) => setSearch(value)}
            onChange={(e) =>
              e.target.value === "" ? setSearch(e.target.value) : null
            }
            className="search"
            style={{ backgroundColor: "white", width: "80%" }}
          /> */}
        {/* <AssetsSearchBar /> */}
        {/* <Button type="primary" icon={<PrinterOutlined />} size="large">
            Print
          </Button> */}
        {/* </div> */}
        {/* <div> */}
        <StepsComponent sentProcesses={sentProcesses} />
        <div
          style={{
            marginTop: "1%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "2%",
            width: "100%",
          }}
        >
          <div
            style={{
              width: "50%",
              height: "360px",
              padding: "1.5%",
              backgroundColor: "white",
              borderRadius: "15px",
            }}
          >
            {/* <Paper
            sx={{
              padding: 2,
              height: "400px",
              display: "flex",
              flexDirection: "column",
            }}
          > */}
            {sentProcesses && (
              <TrackingTable
                // setCurrentStep={setCurrentStep}
                // markedForDelivery={markedForDelivery}
                // markForDelivery={markForDelivery}
                sentProcesses={sentProcesses[2]}
                sender={sender}
                receiver={receiver}
                buttonStatus={buttonStatus}
                handelUpdateStatus={handelUpdateStatus}
              />
            )}
            {/* </Paper> */}
          </div>
          <div
            style={{
              height: "100%",
              width: "50%",
              zIndex: 1,
            }}
          >
            {/* <Paper sx={{ padding: 2, height: "400px" }}> */}
            {/* <Box sx={{ height: "100%", width: "100%" ,padding:0,margin:0,borderRadius:20}}> */}
            <MapContainer
              center={[51.505, -0.09]}
              zoom={13}
              style={{ height: "100%", width: "100%", borderRadius: 15 }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[51.505, -0.09]}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>
            {/* </Box> */}
            {/* </Paper> */}
          </div>
        </div>
        {/* </div> */}
      </div>
    </>
  );
}
