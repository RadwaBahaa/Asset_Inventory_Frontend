import React, { useEffect, useState } from "react";
import { Divider, message } from "antd";
import StepsComponent from "./StepsComponent";
import { useLocation } from "react-router-dom";
import database from "../../../axios/database";
import TrackingTable from "./TrackingTable";
import SecondaryTable from "./SecondaryTable";
import MapComponent from "../../Dashboard/MapComponent";

export default function ViewProcess(props) {
  const {
    sender,
    receiver,
    processID,
    userRole,
    userID,
    receivedProcesses,
    sentProcesses,
    activeComponent,
    fetchReceiverProcesses,
    fetchSenderProcesses,
  } = props;

  const [senderProcessDetails, setSenderProcessDetails] = useState(null);
  const [receiverProcessDetail, setReceiverProcessDetail] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [current, setCurrent] = useState(0);
  const [precent, setPrecent] = useState(0);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const role = queryParams.get("role");

  const [queryRole, setQueryRole] = useState(null);
  const [theSender, setTheSender] = useState(null);
  const [theReceiver, setTheReceiver] = useState(null);

  const [locations, setLocations] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [center, setCenter] = useState([40.71105853111035, -74.00752039016318]);

  const handelUpdateStatus = (record) => {
    if (senderProcessDetails) {
      database
        .put(
          `/${receiver}/process/update/${senderProcessDetails.processID}/${record.id}`
        )
        .then(() => {
          fetchSenderProcesses(sender, receiver, userID);
          message.success(`Delivery of ${receiver} started successfully`);
        })
        .catch((error) => {
          message.error(`Error: ${error.message}`);
        });
    } else if (receiverProcessDetail) {
      database
        .put(
          `/${receiver}/process/update/${receiverProcessDetail.processID}/${userID}`
        )
        .then(() => {
          fetchReceiverProcesses(sender, receiver, userID);
          message.success(`Delivery of ${sender} started successfully`);
        })
        .catch((error) => {
          message.error(`Error: ${error.message}`);
        });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let storesResponse, suppliersResponse, warehousesResponse;

        if (senderProcessDetails) {
          warehousesResponse = await database.get(
            `warehouse/read/geojson/${userID}`
          );
          storesResponse = await database.get(`store/read/geojson`);
        }

        // Check if storesResponse.data is an array before filtering
        if (Array.isArray(storesResponse.data)) {
          const filteredStores = storesResponse.data.filter((item) =>
            senderProcessDetails[`${receiver}Processes`].map(
              (process) =>
                item[`${receiver}ID`] === process[receiver][`${receiver}ID`]
            )
          );
          console.log(filteredStores);
          setLocations({
            stores: [...filteredStores],
            suppliers: [],
            warehouses: [warehousesResponse.data], // Include warehousesResponse.data,
          });
        } else if (receiverProcessDetail) {
          warehousesResponse = await database.get(
            `warehouse/read/geojson/${receiverProcessDetail.senderOD}`
          );
          storesResponse = await database.get(`store/read/geojson/${userID}`);
          setLocations({
            stores: [storesResponse],
            suppliers: [],
            warehouses: [warehousesResponse], // Include warehousesResponse.data,
          });
          console.log(senderProcessDetails);
          // console.log(storesResponse.data);
        } else {
          console.error("Error: storesResponse.data is not an array");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [senderProcessDetails, receiverProcessDetail]);

  // useEffect(() => {
  //   if (locations) {
  //     console.log(locations);
  //   }
  // }, [location]);

  useEffect(() => {
    if (role) setQueryRole(role);
  }, [role]);

  useEffect(() => {
    if (sender && receiver) {
      setTheSender(sender);
      setTheReceiver(receiver);
    }
  }, [sender, receiver]);

  useEffect(() => {
    var stageCompletionStep;
    if (senderProcessDetails) {
      stageCompletionStep = senderProcessDetails.stageCompletionStep;
    } else if (receiverProcessDetail) {
      stageCompletionStep = receiverProcessDetail.stageCompletionStep;
    }

    if (stageCompletionStep) {
      if (stageCompletionStep.supplying < 100) {
        setPrecent(stageCompletionStep.supplying);
        setCurrent(0);
      } else if (
        stageCompletionStep.supplying === 100 &&
        stageCompletionStep.delivering < 100
      ) {
        setPrecent(stageCompletionStep.delivering);
        setCurrent(1);
      } else if (stageCompletionStep.delivering === 100) {
        setPrecent(stageCompletionStep.inventory);
        setCurrent(2);
      }
    } else if (receiverProcessDetail) {
      if (receiverProcessDetail.status === "Supplying") {
        setCurrent(0);
      } else if (receiverProcessDetail.status === "Delivering") {
        setCurrent(1);
      } else if (receiverProcessDetail.status === "Inventory") {
        setCurrent(2);
      }
    }
  }, [senderProcessDetails, receiverProcessDetail]);

  useEffect(() => {
    if (sentProcesses) {
      const filteredProcess = sentProcesses.find(
        (process) => process.processID == processID
      );

      if (filteredProcess) {
        setSenderProcessDetails(filteredProcess);
      }
    } else if (receivedProcesses) {
      const filteredProcess = receivedProcesses.find(
        (process) => process.processID == processID
      );
      if (filteredProcess) {
        setReceiverProcessDetail(filteredProcess);
      }
    }
  }, [sentProcesses, processID, receivedProcesses]);

  const handleUpdateStatus = (record) => {
    if (senderProcessDetails) {
      database
        .put(
          `/${receiver}/process/update/${senderProcessDetails.processID}/${record.id}`
        )
        .then(() => {
          fetchSenderProcesses(sender, receiver, userID);
          message.success(`Delivery of ${receiver} started successfully`);
        })
        .catch((error) => {
          message.error(`Error: ${error.message}`);
        });
    } else if (receiverProcessDetail) {
      database
        .put(
          `/${receiver}/process/update/${receiverProcessDetail.processID}/${userID}`
        )
        .then(() => {
          fetchReceiverProcesses(sender, receiver, userID);
          message.success(`Delivery of ${sender} started successfully`);
        })
        .catch((error) => {
          message.error(`Error: ${error.message}`);
        });
    }
  };

  return (
    <>
      {/* StepsComponent and TrackingTable remain the same */}
      <StepsComponent
        senderProcessDetails={senderProcessDetails}
        receiverProcessDetail={receiverProcessDetail}
        currentStep={currentStep}
        current={current}
        precent={precent}
      />
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
          <TrackingTable
            senderProcessDetails={senderProcessDetails}
            sender={theSender}
            receiver={theReceiver}
            handleUpdateStatus={handleUpdateStatus}
            userRole={userRole}
            activeComponent={activeComponent}
            queryRole={queryRole}
            receiverProcessDetail={receiverProcessDetail}
            handelUpdateStatus={handelUpdateStatus}
          />
        </div>
        <div
          style={{
            height: "100%",
            width: "50%",
            zIndex: 1,
          }}
        >
          {/* <MapComponent
            locations={locations}
            setSelectedLocation={setSelectedLocation}
            selectedLocation={selectedLocation}
          /> */}
          <MapComponent
            locations={locations}
            setSelectedLocation={setSelectedLocation}
            selectedLocation={selectedLocation}
            center={center}
          />
        </div>
      </div>
      <Divider />
      <div
        style={{
          width: "100%",
          height: "360px",
          padding: "1.5%",
          backgroundColor: "white",
          borderRadius: "15px",
        }}
      >
        {receivedProcesses && (
          <SecondaryTable
            senderProcessDetails={senderProcessDetails}
            receiver={theReceiver}
            sender={theSender}
            receiverProcessDetail={receiverProcessDetail}
          />
        )}
      </div>
    </>
  );
}
