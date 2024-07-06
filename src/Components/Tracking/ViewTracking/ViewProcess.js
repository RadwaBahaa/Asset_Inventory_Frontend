import React, { useEffect, useState } from "react";
import { message } from "antd";
import StepsComponent from "./StepsComponent";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import TrackingTable from "./TrackingTable"; // Adjust the import path as per your project structure
import database from "../../../axios/database";
import { useLocation } from "react-router-dom";

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
  // const [present, setPresent] = useState(null);
  const [current, setCurrent] = useState(0);
  const [precent, setPrecent] = useState(0);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const role = queryParams.get("role");

  const [queryRole, setQueryRole] = useState(null);
  const [theSender, setTheSender] = useState(null);
  const [theReceiver, setTheReceiver] = useState(null);

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
      console.log(
        "senderProcessDetails:",
        senderProcessDetails.stageCompletionStep
      );
      stageCompletionStep = senderProcessDetails.stageCompletionStep;
    } else if (receiverProcessDetail) {
      stageCompletionStep = receiverProcessDetail.stageCompletionStep;
    }
    if (stageCompletionStep) {
      if (stageCompletionStep.supplying < 100) {
        setPrecent(stageCompletionStep.supplying);
        setCurrent(0);
      } else if (
        (stageCompletionStep.supplying === 100,
        stageCompletionStep.delivering < 100)
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

  // const location = useLocation();
  // const queryParams = new URLSearchParams(location.search);
  // const role = queryParams.get("role");

  useEffect(() => {
    if (sentProcesses) {
      console.log(sentProcesses);
      console.log(processID);
      const filteredProcess = sentProcesses.find(
        (process) => process.processID == processID
      );

      console.log(filteredProcess);
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
    if (senderProcessDetails) {
      const stageCompletionStep = senderProcessDetails.stageCompletionStep;

      if (stageCompletionStep.supplying < 100) {
        setCurrentStep(0);
        setPrecent(stageCompletionStep.supplying);
      } else if (
        (stageCompletionStep.supplying === 100,
        stageCompletionStep.delivering < 100)
      ) {
        setCurrentStep(1);
        setPrecent(stageCompletionStep.delivering);
      } else if (stageCompletionStep.delivering === 100) {
        setCurrentStep(2);
        setPrecent(stageCompletionStep.inventory);
      }
    }
  }, [senderProcessDetails]);

  return (
    <>
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
            handelUpdateStatus={handelUpdateStatus}
            userRole={userRole}
            activeComponent={activeComponent}
            queryRole={queryRole}
            receiverProcessDetail={receiverProcessDetail}
          />
        </div>
        <div
          style={{
            height: "100%",
            width: "50%",
            zIndex: 1,
          }}
        >
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
        </div>
      </div>
    </>
  );
}
