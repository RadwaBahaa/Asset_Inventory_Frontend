import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
  useMap,
  GeoJSON,
} from "react-leaflet";
import { Paper } from "@mui/material";
import MapZoomHandler from "./MapZoomHandler";
import ResetViewButton from "./ResetViewButton";
import L from "leaflet";
import { createRoot } from "react-dom/client";

const ReceiverMap = (props) => {
  const {
    setSelectedLocation,
    receiverData,
    senderData,
    userRole,
    selectedReceiver,
    serviceArea,
  } = props;
  const center = [40.71105853111035, -74.00752039016318];
  const [pointsVisible, setPointsVisible] = useState(true); // State to control points visibility

  const outerCircleOptions = {
    fillColor: "#006688",
    color: "#006688",
    opacity: 0.2,
    fillOpacity: 0.2,
  };
  const innerCircleOptions = {
    fillColor: "#006688",
    color: "#006688",
    opacity: 0.6,
    fillOpacity: 0.6,
  };

  const supplierCircleOptions = {
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

  const warehouseCircleOptions = {
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

  const storeCircleOptions = {
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
              setSelectedLocation(null);
              map.getCenter().lat != center[0] && map.flyTo(center, 10);
            }}
          />
        );
        return div;
      };
      control.addTo(map);
      return () => {
        control.remove();
      };
    }, []);
  };

  return (
    <div style={{ height: "100%" }}>
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
          center={center}
        />
        <AddResetViewButton />

        {/* {senderData &&
          senderData.map((sender) => (
            <GeoJSON
              data={sender}
              pathOptions={() => {
                if (senderData && sender.properties) {
                  if (userRole === "supplier") {
                    return warehouseCircleOptions.outer;
                  } else if (userRole === "warehouse") {
                    return storeCircleOptions.outer;
                  }
                }
              }}
            />
          ))} */}
        {/* {serviedLocations &&
            pointsVisible &&
            serviedLocations.map((location) => (
              <CircleMarker
                key={
                  location.properties.storeID ||
                  location.properties.warehouseID ||
                  location.properties.supplierID
                }
                center={[
                  location.geometry.coordinates[1],
                  location.geometry.coordinates[0],
                ]}
                pathOptions={{
                  color:
                    selectedLocation &&
                    selectedLocation.properties.type === "supplier"
                      ? "#7f1f4b"
                      : "#436726",
                }}
              />
            ))} */}

        {/* <MapClickHandler /> */}

        {receiverData &&
          userRole === "Warehouse" &&
          // receiverData.properties.type === "Store" &&
          pointsVisible &&
          receiverData.map((store) => (
            <React.Fragment key={store.properties.storeID}>
              <CircleMarker
                key={`${store.properties.storeID}-outer`}
                center={[
                  store.geometry.coordinates[1],
                  store.geometry.coordinates[0],
                ]}
                pathOptions={storeCircleOptions.outer}
              />
              <CircleMarker
                key={store.properties.storeID}
                center={[
                  store.geometry.coordinates[1],
                  store.geometry.coordinates[0],
                ]}
                pathOptions={storeCircleOptions.inner}
                eventHandlers={{
                  click: () => setSelectedLocation(store),
                }}
              >
                <Popup>
                  <strong>{store.properties.storeName}</strong> <br />
                  {store.properties.address}
                </Popup>
              </CircleMarker>
            </React.Fragment>
          ))}
        {senderData &&
          userRole === "Warehouse" &&
          // senderData.properties.type === "Warehouse" &&
          pointsVisible &&
          senderData.map((warehouse) => (
            <React.Fragment key={warehouse.properties.warehouseID}>
              <CircleMarker
                key={`${warehouse.properties.warehouseID}-outer`}
                center={[
                  warehouse.geometry.coordinates[1],
                  warehouse.geometry.coordinates[0],
                ]}
                pathOptions={warehouseCircleOptions.outer}
              />
              <CircleMarker
                key={warehouse.properties.warehouseID}
                center={[
                  warehouse.geometry.coordinates[1],
                  warehouse.geometry.coordinates[0],
                ]}
                pathOptions={warehouseCircleOptions.inner}
                eventHandlers={{
                  click: () => setSelectedLocation(warehouse),
                }}
              >
                <Popup>
                  <strong>{warehouse.properties.warehouseName}</strong> <br />
                  {warehouse.properties.address}
                </Popup>
              </CircleMarker>
            </React.Fragment>
          ))}
        {receiverData &&
          userRole === "Supplier" &&
          // receiverData.properties.type === "Warehouse" &&
          pointsVisible &&
          receiverData.map((warehouse) => (
            <React.Fragment key={warehouse.properties.warehouseID}>
              <CircleMarker
                key={`${warehouse.properties.warehouseID}-outer`}
                center={[
                  warehouse.geometry.coordinates[1],
                  warehouse.geometry.coordinates[0],
                ]}
                pathOptions={warehouseCircleOptions.outer}
              />
              <CircleMarker
                key={warehouse.properties.warehouseID}
                center={[
                  warehouse.geometry.coordinates[1],
                  warehouse.geometry.coordinates[0],
                ]}
                pathOptions={warehouseCircleOptions.inner}
                eventHandlers={{
                  click: () => setSelectedLocation(warehouse),
                }}
              >
                <Popup>
                  <strong>{warehouse.properties.warehouseName}</strong> <br />
                  {warehouse.properties.address}
                </Popup>
              </CircleMarker>
            </React.Fragment>
          ))}
        {senderData &&
          userRole === "Supplier" &&
          // senderData.properties.type === "Supplier" &&
          pointsVisible &&
          senderData.map((supplier) => (
            <React.Fragment key={supplier.properties.supplierID}>
              <CircleMarker
                key={`${supplier.properties.supplierID}-outer`}
                center={[
                  supplier.geometry.coordinates[1],
                  supplier.geometry.coordinates[0],
                ]}
                pathOptions={supplierCircleOptions.outer}
              />
              <CircleMarker
                key={supplier.properties.supplierID}
                center={[
                  supplier.geometry.coordinates[1],
                  supplier.geometry.coordinates[0],
                ]}
                pathOptions={supplierCircleOptions.inner}
                eventHandlers={{
                  click: () => setSelectedLocation(supplier),
                }}
              >
                <Popup>
                  <strong>{supplier.properties.supplierName}</strong> <br />
                  {supplier.properties.address}
                </Popup>
              </CircleMarker>
            </React.Fragment>
          ))}
      </MapContainer>
    </div>
  );
};
export default ReceiverMap;
