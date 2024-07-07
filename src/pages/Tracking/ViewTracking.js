import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import database from "../../axios/database";
import { Divider } from "antd";
import { HomeOutlined, PlusOutlined } from "@ant-design/icons";
import SubNavbar from "../../Components/NavBars/SubNavbar";
import ProcessesTable from "../../Components/Tracking/ViewTracking/ProcessesTable";
import { useLocation } from "react-router-dom";
import Tapping from "../../Components/Tracking/ViewTracking/Tapping";
import ViewProcess from "../../Components/Tracking/ViewTracking/ViewProcess";
import ViewTrackingSetting from "../../Components/Tracking/ViewTracking/ViewTrakingSetting";

export default function ViewTracking() {
  const userRole = useSelector((state) => state.login.role);
  const userID = useSelector((state) => state.login.id);

  const [sender, setSender] = useState(null);
  const [receiver, setReceiver] = useState(null);

  const [sentProcesses, setSentProcesses] = useState(null);
  const [receivedProcesses, setReceivedProcesses] = useState(null);

  const [activeComponent, setActiveComponent] = useState("Sender");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const processID = queryParams.get("processID");

  useEffect(() => {
    if (userRole === "Supplier") {
      fetchSenderProcesses("supplier", "warehouse", userID);
      setSender("supplier");
      setReceiver("warehouse");
    } else if (userRole === "Warehouse") {
      if (activeComponent === "Receiver") {
        fetchReceiverProcesses("supplier", "warehouse", userID);
      } else if (activeComponent === "Sender") {
        fetchSenderProcesses("warehouse", "store", userID);
      }
      setSender("warehouse");
      setReceiver("store");
    } else if (userRole === "Store") {
      fetchReceiverProcesses("warehouse", "store", userID);
      setSender("warehouse");
      setReceiver("store");
    }
  }, [userRole, userID]);

  const fetchReceiverProcesses = (sender, receiver, userID) => {
    database
      .get(
        `delivery-process/${sender}-${receiver}/read-by-${receiver}/${userID}`
      )
      .then((response) => {
        console.log(response.data);
        const responseData = response.data.map((item) => ({
          [`${receiver}Processes`]: item[`${receiver}Processes`].map(
            (process) => ({
              ...process,
              receiverID: process[receiver][`${receiver}ID`],
              name: process[receiver][`${receiver}Name`],
              processID: item.processID,
              senderID: item[`${sender}ID`],
              senderName: item[sender][`${sender}Name`],
              formattedDate: item.formattedDate,
              assetShipment: process.assetShipment.map((asset) => ({
                assetID: asset[`${sender}Asset`].assetID,
                serialNumber: asset[`${sender}Asset`].serialNumber,
                quantity: asset.quantity,
                price: asset[`${sender}Asset`].asset.price,
                assetName: asset[`${sender}Asset`].asset.assetName,
              })),
            })
          ),
        }));
        const flattenedData = responseData.flatMap(
          (item) => item[`${receiver}Processes`]
        );
        setReceivedProcesses(flattenedData);
        console.log(flattenedData);
        // console.log(responseData[0][`${receiver}Processes`]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchSenderProcesses = async (sender, receiver, userID) => {
    console.log(sender, receiver, userID);
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
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <SubNavbar
        title="Assets"
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
            <span style={{ marginLeft: "8px" }}>Add Asset</span>
          </>
        }
        addButtonPath="/addNew/assets"
      />
      <Tapping processID={processID} />

      <ViewTrackingSetting
        setActiveComponent={setActiveComponent}
        userRole={userRole}
        sentProcesses={sentProcesses}
        receivedProcesses={receivedProcesses}
        setSentProcesses={setSentProcesses}
        setReceivedProcesses={setReceivedProcesses}
      />

      <Divider />

      {!processID ? (
        <ProcessesTable
          sentProcesses={sentProcesses}
          sender={sender}
          receivedProcesses={receivedProcesses}
          receiver={receiver}
        />
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "0 2%",
            height: "100%",
          }}
        >
          <ViewProcess
            sender={sender}
            receiver={receiver}
            userID={userID}
            userRole={userRole}
            processID={processID}
            receivedProcesses={receivedProcesses}
            sentProcesses={sentProcesses}
            activeComponent={activeComponent}
            fetchReceiverProcesses={fetchReceiverProcesses}
            fetchSenderProcesses={fetchSenderProcesses}
          />
        </div>
      )}
    </div>
  );
}
