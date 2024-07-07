import React, { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMap,
  GeoJSON,
} from "react-leaflet";
import L from "leaflet";
import { createRoot } from "react-dom/client";
import ResetViewButton from "./ResetViewButton";
import "leaflet/dist/leaflet.css";
import MapZoomHandler from "./MapZoomHandler";

const MapComponent = (props) => {
  const {
    locations,
    setSelectedItem,
    selectedLocation,
    serviceArea,
    setSelectedLocation,
    serviedLocations,
    setServiedLocations,
  } = props;
  const center = [40.71105853111035, -74.00752039016318];
  const [pointsVisible, setPointsVisible] = useState(true); // State to control points visibility
  const [isViewReset, setIsViewReset] = useState(false);

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
    const buttonRef = useRef(); // Ref to keep track of the button

    useEffect(() => {
      if (!buttonRef.current) {
        const control = L.control({ position: "topleft" });
        control.onAdd = () => {
          const div = L.DomUtil.create("div", "reset-view-button");
          const root = createRoot(div);
          root.render(
            <ResetViewButton
              onClick={() => {
                setSelectedItem(null);
                setSelectedLocation(null);
                setServiedLocations(null);
                map.getCenter().lat !== center[0] && map.flyTo(center, 10);
              }}
              selectedLocation={selectedLocation}
            />
          );
          buttonRef.current = div;
          return div;
        };
        control.addTo(map);
        return () => {
          control.remove();
        };
      }
    }, [map, selectedLocation]);
  };

  if (
    !locations ||
    !locations.stores ||
    !locations.warehouses ||
    !locations.suppliers
  ) {
    return null; // or render a loading indicator
  }

  return (
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
        serviceArea={serviceArea}
        selectedLocation={selectedLocation}
        center={center}
        setPointsVisible={setPointsVisible}
      />
      <AddResetViewButton />
      {serviceArea && selectedLocation && (
        <GeoJSON
          data={serviceArea}
          pathOptions={() => {
            if (selectedLocation && selectedLocation.properties) {
              if (selectedLocation.properties.type === "supplier") {
                return supplierCircleOptions.outer;
              } else if (selectedLocation.properties.type === "warehouse") {
                return warehouseCircleOptions.outer;
              } else {
                return storeCircleOptions.outer;
              }
            }
            return {};
          }}
        />
      )}
      {serviedLocations &&
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
        ))}

      {/* <MapClickHandler /> */}

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
                  setSelectedItem(`store-${store.properties.storeID}`);
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
                  setSelectedItem(
                    `warehouse-${warehouse.properties.warehouseID}`
                  );
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
                  setSelectedItem(`supplier-${supplier.properties.supplierID}`);
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
};

export default MapComponent;
