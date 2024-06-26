import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMap,
  GeoJSON,
} from "react-leaflet";

const MapComponent = ({
  storesData,
  warehousesData,
  suppliersData,
  selectedItem,
}) => {
  const center = [40.71105853111035, -74.00752039016318];
  // const [serviceArea, setServiceArea] = useState(null);

  const outerCircleOptions = {
    fillColor: "#006688",
    color: "#006688",
    opacity: 0.3,
    fillOpacity: 0.3,
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

  const MapZoomHandler = () => {
    const map = useMap();
    let selectedData;

    useEffect(() => {
      if (selectedItem) {
        const [type, id] = selectedItem.split("-");

        switch (type) {
          case "store":
            selectedData = storesData.find(
              (store) => store.properties.storeID == id
            );
            break;
          case "warehouse":
            selectedData = warehousesData.find(
              (warehouse) => warehouse.properties.warehouseID == id
            );
            break;
          case "supplier":
            selectedData = suppliersData.find(
              (supplier) => supplier.properties.supplierID == id
            );
            break;
          default:
            selectedData = null;
            console.log("Invalid item type");
            return;
        }

        if (selectedData) {
          const latLng = [
            selectedData.geometry.coordinates[1],
            selectedData.geometry.coordinates[0],
          ];
          map.flyTo(latLng, 15, { animate: true, duration: 1 });
        }
      } else {
        map.flyTo(center, 10, { animate: true, duration: 1 });
      }
    }, [selectedItem, storesData, warehousesData, suppliersData]);

    return null;
  };

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
      <MapZoomHandler />
      {/* {serviceArea && <GeoJSON data={serviceArea} />} */}

      {/* Render CircleMarkers for stores, warehouses, and suppliers */}
      {storesData &&
        storesData.map((store) => (
          <>
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
            >
              <Popup>
                <strong>{store.properties.storeName}</strong> <br />
                {store.properties.address}
              </Popup>
            </CircleMarker>
          </>
        ))}
      {warehousesData &&
        warehousesData.map((warehouse) => (
          <>
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
            >
              <Popup>
                <strong>{warehouse.properties.warehouseName}</strong> <br />
                {warehouse.properties.address}
              </Popup>
            </CircleMarker>
          </>
        ))}
      {suppliersData &&
        suppliersData.map((supplier) => (
          <>
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
            >
              <Popup>
                <strong>{supplier.properties.supplierName}</strong> <br />
                {supplier.properties.address}
              </Popup>
            </CircleMarker>
          </>
        ))}
    </MapContainer>
  );
};

export default MapComponent;
