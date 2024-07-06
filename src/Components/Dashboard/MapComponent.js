
import React, { useState, useEffect, useRef, mapRef } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import { createRoot } from "react-dom/client";
import ResetViewButton from "../Location/GeospatialData/ResetViewButton";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet/dist/leaflet.css";
import MapZoomHandler from "../Location/GeospatialData/MapZoomHandler";

const MapComponent = ({
    // onDrawComplete, searchTerm,
    locations, setSelectedLocation }) => {
  const center = [40.71105853111035, -74.00752039016318]; // Initial center of the USA
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [pointsVisible, setPointsVisible] = useState(true); // State to control points visibility
  const mapRef = useRef(null); // Ref to hold map instance

//   const handleMapClick = (e) => {
//     setSelectedPosition([e.latlng.lat, e.latlng.lng]);
//     // onDrawComplete([e.latlng.lng, e.latlng.lat]); // Pass coordinates to parent component
//   };

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
              setSelectedPosition(null);
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
    <MapContainer
      center={center}
      zoom={4}
      style={{ height: "100%", width: "100%" }}
      ref={mapRef}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapZoomHandler
        selectedPosition={selectedPosition}
        center={center}
        setPointsVisible={setPointsVisible}
      />
      <AddResetViewButton />
      {selectedPosition && (
        <CircleMarker
          center={selectedPosition}
          pathOptions={{ fillColor: "blue" }}
          radius={10}
        >
          <Popup>
            Selected location. <br /> Easily customizable.
          </Popup>
        </CircleMarker>
      )}
      <EventHandlers />
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
  );

  function EventHandlers() {
    useMapEvents({
    //   click: handleMapClick,
    });
    return null;
  }
};

export default MapComponent;
