// import React, { useEffect, useState } from "react";
// import { Divider, message } from "antd";
// import StepsComponent from "./StepsComponent";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import TrackingTable from "./TrackingTable"; // Adjust the import path as per your project structure
// import database from "../../../axios/database";
// import { useLocation } from "react-router-dom";
// import SecondaryTable from "./SecondaryTable";
// import MapComponent from "../StartProcess/ReceiverMap";

// export default function ViewProcess(props) {
//   const {
//     sender,
//     receiver,
//     processID,
//     userRole,
//     userID,
//     receivedProcesses,
//     sentProcesses,
//     activeComponent,
//     fetchReceiverProcesses,
//     fetchSenderProcesses,
//   } = props;

//   const [senderProcessDetails, setSenderProcessDetails] = useState(null);
//   const [receiverProcessDetail, setReceiverProcessDetail] = useState(null);
//   const [currentStep, setCurrentStep] = useState(0);
//   // const [present, setPresent] = useState(null);
//   const [current, setCurrent] = useState(0);
//   const [precent, setPrecent] = useState(0);

//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const role = queryParams.get("role");

//   const [queryRole, setQueryRole] = useState(null);
//   const [theSender, setTheSender] = useState(null);
//   const [theReceiver, setTheReceiver] = useState(null);

//   const [locations, setLocations] = useState(null);
//   const [selectedLocation, setSelectedLocation] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {

//         const storesResponse = await database.get("store/read/geojson");
//         const suppliersResponse = await database.get("supplier/read/geojson");
//         const warehousesResponse = await database.get("warehouse/read/geojson");
//         // console.log(userRole);
//         // Update locations state with all fetched data
//         setLocations({
//           stores: storesResponse.data,
//           suppliers: suppliersResponse.data,
//           warehouses: warehousesResponse.data,
//         });
//       } catch (error) {
//         // setError(error.message);
//         setLocations({ stores: [], suppliers: [], warehouses: [] }); // Initialize state in case of error
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (role) setQueryRole(role);
//   }, [role]);

//   useEffect(() => {
//     if (sender && receiver) {
//       setTheSender(sender);
//       setTheReceiver(receiver);
//     }
//   }, [sender, receiver]);

//   useEffect(() => {
//     var stageCompletionStep;
//     if (senderProcessDetails) {
//       console.log(
//         "senderProcessDetails:",
//         senderProcessDetails.stageCompletionStep
//       );
//       stageCompletionStep = senderProcessDetails.stageCompletionStep;
//     } else if (receiverProcessDetail) {
//       stageCompletionStep = receiverProcessDetail.stageCompletionStep;
//     }
//     if (stageCompletionStep) {
//       if (stageCompletionStep.supplying < 100) {
//         setPrecent(stageCompletionStep.supplying);
//         setCurrent(0);
//       } else if (
//         (stageCompletionStep.supplying === 100,
//         stageCompletionStep.delivering < 100)
//       ) {
//         setPrecent(stageCompletionStep.delivering);
//         setCurrent(1);
//       } else if (stageCompletionStep.delivering === 100) {
//         setPrecent(stageCompletionStep.inventory);
//         setCurrent(2);
//       }
//     } else if (receiverProcessDetail) {
//       if (receiverProcessDetail.status === "Supplying") {
//         setCurrent(0);
//       } else if (receiverProcessDetail.status === "Delivering") {
//         setCurrent(1);
//       } else if (receiverProcessDetail.status === "Inventory") {
//         setCurrent(2);
//       }
//     }
//   }, [senderProcessDetails, receiverProcessDetail]);

//   useEffect(() => {
//     if (sentProcesses) {
//       console.log(sentProcesses);
//       console.log(processID);
//       const filteredProcess = sentProcesses.find(
//         (process) => process.processID == processID
//       );

//       console.log(filteredProcess);
//       if (filteredProcess) {
//         setSenderProcessDetails(filteredProcess);
//       }
//     } else if (receivedProcesses) {
//       const filteredProcess = receivedProcesses.find(
//         (process) => process.processID == processID
//       );
//       if (filteredProcess) {
//         setReceiverProcessDetail(filteredProcess);
//       }
//     }
//   }, [sentProcesses, processID, receivedProcesses]);

//   const handelUpdateStatus = (record) => {
//     if (senderProcessDetails) {
//       database
//         .put(
//           `/${receiver}/process/update/${senderProcessDetails.processID}/${record.id}`
//         )
//         .then(() => {
//           fetchSenderProcesses(sender, receiver, userID);
//           message.success(`Delivery of ${receiver} started successfully`);
//         })
//         .catch((error) => {
//           message.error(`Error: ${error.message}`);
//         });
//     } else if (receiverProcessDetail) {
//       database
//         .put(
//           `/${receiver}/process/update/${receiverProcessDetail.processID}/${userID}`
//         )
//         .then(() => {
//           fetchReceiverProcesses(sender, receiver, userID);
//           message.success(`Delivery of ${sender} started successfully`);
//         })
//         .catch((error) => {
//           message.error(`Error: ${error.message}`);
//         });
//     }
//   };

//   useEffect(() => {
//     if (senderProcessDetails) {
//       const stageCompletionStep = senderProcessDetails.stageCompletionStep;

//       if (stageCompletionStep.supplying < 100) {
//         setCurrentStep(0);
//         setPrecent(stageCompletionStep.supplying);
//       } else if (
//         (stageCompletionStep.supplying === 100,
//         stageCompletionStep.delivering < 100)
//       ) {
//         setCurrentStep(1);
//         setPrecent(stageCompletionStep.delivering);
//       } else if (stageCompletionStep.delivering === 100) {
//         setCurrentStep(2);
//         setPrecent(stageCompletionStep.inventory);
//       }
//     }
//   }, [senderProcessDetails]);

//   return (
//     <>
//       <StepsComponent
//         senderProcessDetails={senderProcessDetails}
//         receiverProcessDetail={receiverProcessDetail}
//         currentStep={currentStep}
//         current={current}
//         precent={precent}
//       />
//       <div
//         style={{
//           marginTop: "1%",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           gap: "2%",
//           width: "100%",
//         }}
//       >
//         <div
//           style={{
//             width: "50%",
//             height: "360px",
//             padding: "1.5%",
//             backgroundColor: "white",
//             borderRadius: "15px",
//           }}
//         >
//           <TrackingTable
//             senderProcessDetails={senderProcessDetails}
//             sender={theSender}
//             receiver={theReceiver}
//             handelUpdateStatus={handelUpdateStatus}
//             userRole={userRole}
//             activeComponent={activeComponent}
//             queryRole={queryRole}
//             receiverProcessDetail={receiverProcessDetail}
//           />
//         </div>
//         <div
//           style={{
//             height: "100%",
//             width: "50%",
//             zIndex: 1,
//           }}
//         >
//           <MapComponent
//           // locations={locations}
//           // setSelectedLocation={setSelectedLocation}
//           // selectedLocation={selectedLocation}
//           />
//         </div>
//       </div>
//       <Divider />
//       <div
//         style={{
//           width: "100%",
//           height: "360px",
//           padding: "1.5%",
//           backgroundColor: "white",
//           borderRadius: "15px",
//         }}
//       >
//         {receivedProcesses && (
//           <SecondaryTable
//             senderProcessDetails={senderProcessDetails}
//             receiver={theReceiver}
//             sender={theSender}
//             receiverProcessDetail={receiverProcessDetail}
//           />
//         )}
//       </div>
//     </>
//   );
// }

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
        } else {
          console.error("Error: storesResponse.data is not an array");
        }
        if (receiverProcessDetail) {
          warehousesResponse = await database.get(
            `warehouse/read/geojson/${receiverProcessDetail.senderOD}`
          );
          storesResponse = await database.get(`store/read/geojson/${userID}`);
        }

        console.log(senderProcessDetails);
        console.log(storesResponse.data);
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
            locations={
              userRole === "Supplier" || userRole === "Warehouse"
                ? {
                    warehouses:
                      senderProcessDetails &&
                      senderProcessDetails.assetShipment.map(
                        (asset) => asset.assetID
                      ),
                  }
                : userRole === "Store"
                ? {
                    stores:
                      senderProcessDetails &&
                      senderProcessDetails.assetShipment.map(
                        (asset) => asset.assetID
                      ),
                  }
                : null
            }
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
