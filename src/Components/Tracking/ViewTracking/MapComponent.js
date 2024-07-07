import React, { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Popup,
  CircleMarker,
  useMap,
  GeoJSON,
  // Polyline,
} from "react-leaflet";
import MapZoomHandler from "../StartProcess/MapZoomHandler";
import ResetViewButton from "../StartProcess/ResetViewButton";
// import AnimatedPolyline from "./AnimatedPolyline";
import L from "leaflet";
import { createRoot } from "react-dom/client";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const MapComponent = ({ locations, setSelectedLocation, selectedLocation }) => {
  const center = [40.71105853111035, -74.00752039016318]; // Initial center of the USA
  const [pointsVisible, setPointsVisible] = useState(false); // State to control points visibility
  const mapRef = useRef(null); // Ref to hold map instance

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
              map.getCenter().lat !== center[0] && map.flyTo(center, 10);
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

  if (!locations) {
    return null; // or render a loading indicator
  }

  return (
    <>
      {/* {dataLoaded && ( // Render the map only when data is loaded */}
      <>
        <MapContainer
          center={center}
          zoom={10}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MapZoomHandler
            selectedLocation={selectedLocation}
            center={center}
            setPointsVisible={setPointsVisible}
          />
          <AddResetViewButton />
          {selectedLocation && pointsVisible && (
            <CircleMarker
              center={[
                selectedLocation.geometry.coordinates[1],
                selectedLocation.geometry.coordinates[0],
              ]}
              pathOptions={{ fillColor: "blue" }}
              radius={10}
            >
              <Popup>
                Selected location. <br /> Easily customizable.
              </Popup>
            </CircleMarker>
          )}
          {/* <EventHandlers /> */}
          {locations.stores &&
            pointsVisible &&
            locations.stores.map((store) => (
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
                    click: () => {
                      setSelectedLocation(store);
                    },
                  }}
                >
                  <Popup>
                    <strong>{store.properties.storeName}</strong> <br />
                    {store.properties.address}
                  </Popup>
                </CircleMarker>
              </React.Fragment>
            ))}
          {locations.warehouses &&
            pointsVisible &&
            locations.warehouses.map((warehouse) => (
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
                    click: () => {
                      setSelectedLocation(warehouse);
                    },
                  }}
                >
                  <Popup>
                    <strong>{warehouse.properties.warehouseName}</strong> <br />
                    {warehouse.properties.address}
                  </Popup>
                </CircleMarker>
              </React.Fragment>
            ))}
          {locations.suppliers &&
            pointsVisible &&
            locations.suppliers.map((supplier) => (
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
                    click: () => {
                      setSelectedLocation(supplier);
                    },
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
      </>
      {/* )} */}
      {/* {loading && (
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
      )} */}
    </>
  );
};

export default MapComponent;
