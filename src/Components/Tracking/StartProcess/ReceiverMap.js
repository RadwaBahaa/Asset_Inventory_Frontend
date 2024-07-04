import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Popup,
  CircleMarker,
  useMap,
  GeoJSON,
  // Polyline,
} from "react-leaflet";
import MapZoomHandler from "./MapZoomHandler";
import ResetViewButton from "./ResetViewButton";
import AnimatedPolyline from "./AnimatedPolyline";
import L from "leaflet";
import { createRoot } from "react-dom/client";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const ReceiverMap = (props) => {
  const {
    receiverData,
    senderData,
    userRole,
    selectedReceiver,
    serviceArea,
    setSelectedReceiver,
    center,
  } = props;

  const [loading, setLoading] = useState(true); // State to manage loading state
  const [dataLoaded, setDataLoaded] = useState(false); // State to track if all data is loaded
  const [pointsVisible, setPointsVisible] = useState(true); // State to control points visibility

  useEffect(() => {
    if (!receiverData || !senderData || !serviceArea || !center) {
      console.log("Data not fully loaded");
      setLoading(true);
      return;
    }
    setLoading(false);
    setDataLoaded(true);
    console.log("Data loaded");
    console.log(serviceArea); // Make sure serviceArea is not null here
  }, [receiverData, senderData, serviceArea]);

  const outerCircleOptions = {
    opacity: 0.2,
    fillOpacity: 0.2,
  };
  const innerCircleOptions = {
    opacity: 0.6,
    fillOpacity: 0.6,
  };

  const getCircleOptions = (type) => {
    switch (type) {
      case "Supplier":
        return {
          outer: {
            ...outerCircleOptions,
            fillColor: "#3378cc",
            color: "#3378cc",
            radius: 20,
          },
          inner: {
            ...innerCircleOptions,
            fillColor: "#3378cc",
            color: "#3378cc",
            radius: 15,
          },
        };
      case "Warehouse":
        return {
          outer: {
            ...outerCircleOptions,
            fillColor: "#CC3378",
            color: "#CC3378",
            radius: 14,
          },
          inner: {
            ...innerCircleOptions,
            fillColor: "#CC3378",
            color: "#CC3378",
            radius: 10,
          },
        };
      case "Store":
        return {
          outer: {
            ...outerCircleOptions,
            fillColor: "#78CC33",
            color: "#78CC33",
            radius: 10,
          },
          inner: {
            ...innerCircleOptions,
            fillColor: "#78CC33",
            color: "#78CC33",
            radius: 6,
          },
        };
      default:
        return null;
    }
  };

  const AddResetViewButton = () => {
    const map = useMap();
    useEffect(() => {
      const control = L.control({ position: "topleft" });
      control.onAdd = () => {
        const div = L.DomUtil.create("div", "reset-view-button");
        const root = createRoot(div);
        root.render(
          <ResetViewButton
            onClick={() => {
              setSelectedReceiver(null);
              map.getCenter().lat !== center[0] &&
                map.flyTo(center, 10, {
                  animate: true,
                  duration: 0.5,
                });
            }}
          />
        );
        return div;
      };
      control.addTo(map);
      return () => {
        control.remove();
      };
    }, [map]);
  };

  const getPolylineCoordinates = (receiver, sender) => {
    if (receiver && sender) {
      return [
        [sender.geometry.coordinates[1], sender.geometry.coordinates[0]],
        [receiver.geometry.coordinates[1], receiver.geometry.coordinates[0]],
      ];
    }
    return [];
  };

  return (
    <>
      {dataLoaded && ( // Render the map only when data is loaded
        <>
          <MapContainer
            center={center}
            zoom={10}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="http://services.arcgisonline.com/arcgis/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
              attribution='&copy; <a href="http://services.arcgisonline.com">Arcgisonline</a> contributors'
            />
            <MapZoomHandler
              setPointsVisible={setPointsVisible}
              selectedReceiver={selectedReceiver}
              senderData={senderData} // Pass senderData here
              center={center}
            />
            <AddResetViewButton />
            {/* Render map markers and GeoJSON data */}
            {serviceArea && (
              <GeoJSON
                data={serviceArea}
                style={{
                  color: userRole === "supplier" ? "#3378cc" : "#CC3378",
                  fillColor: userRole === "supplier" ? "#3378cc" : "#CC3378",
                  radius: 14,
                  opacity: 0.1,
                  fillOpacity: 0.15,
                  unselectable: true,
                }}
              />
            )}
            {senderData && selectedReceiver && pointsVisible && (
              <AnimatedPolyline
                positions={getPolylineCoordinates(selectedReceiver, senderData)}
                color="black"
                weight={3}
                opacity={0.8}
                dashArray="10,5" // Add dashArray for dashed line
              />
            )}
            {receiverData &&
              pointsVisible &&
              receiverData.map((receiver) => (
                <React.Fragment key={receiver.properties.id}>
                  <CircleMarker
                    key={`${receiver.properties.id}-outer`}
                    center={[
                      receiver.geometry.coordinates[1],
                      receiver.geometry.coordinates[0],
                    ]}
                    pathOptions={
                      getCircleOptions(receiver.properties.type).outer
                    }
                  />
                  <CircleMarker
                    key={receiver.properties.id}
                    center={[
                      receiver.geometry.coordinates[1],
                      receiver.geometry.coordinates[0],
                    ]}
                    pathOptions={
                      getCircleOptions(receiver.properties.type).inner
                    }
                    eventHandlers={{
                      click: () => setSelectedReceiver(receiver),
                    }}
                  >
                    <Popup>
                      <strong>{receiver.properties.name}</strong> <br />
                      {receiver.properties.address}
                    </Popup>
                  </CircleMarker>
                </React.Fragment>
              ))}
            {senderData && pointsVisible && (
              <React.Fragment key={senderData.properties.id}>
                <CircleMarker
                  key={`${senderData.properties.id}-outer`}
                  center={[
                    senderData.geometry.coordinates[1],
                    senderData.geometry.coordinates[0],
                  ]}
                  pathOptions={
                    getCircleOptions(senderData.properties.type).outer
                  }
                />
                <CircleMarker
                  key={senderData.properties.id}
                  center={[
                    senderData.geometry.coordinates[1],
                    senderData.geometry.coordinates[0],
                  ]}
                  pathOptions={
                    getCircleOptions(senderData.properties.type).inner
                  }
                >
                  <Popup>
                    <strong>{senderData.properties.name}</strong> <br />
                    {senderData.properties.address}
                  </Popup>
                </CircleMarker>
              </React.Fragment>
            )}
          </MapContainer>
        </>
      )}
      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
            backgroundColor: "rgba(255, 255, 255)",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </>
  );
};

export default ReceiverMap;
