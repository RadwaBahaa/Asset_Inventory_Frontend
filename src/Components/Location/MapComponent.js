import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMap,
  GeoJSON,
} from "react-leaflet";
import L from "leaflet";
import ResetViewButton from "../../Components/Location/ResetViewButton"; // Import the custom button component
import "leaflet/dist/leaflet.css";

const MapComponent = ({
  storesData,
  warehousesData,
  suppliersData,
  setSelectedItem,
  selectedLocation,
  serviceArea,
  setServiceArea,
  setSelectedLocation,
}) => {
  const center = [40.71105853111035, -74.00752039016318];

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
    useEffect(() => {
      if (serviceArea) {
        const bounds = L.geoJSON(serviceArea).getBounds();
        map.fitBounds(bounds, {
          animate: true,
          duration: 2, // Adjust the duration to make the animation smoother
          padding: [20, 20], // Add some padding to make the fit more comfortable
        });
      } else if (selectedLocation) {
        const latLng = [
          selectedLocation.geometry.coordinates[1],
          selectedLocation.geometry.coordinates[0],
        ];
        map.flyTo(latLng, 15, { animate: true, duration: 1 });
      } else {
        map.flyTo(center, 10, { animate: true, duration: 1 });
      }
    }, [serviceArea, selectedLocation]);
    return null;
  };
  const AddResetViewButton = () => {
    const map = useMap();

    useEffect(() => {
      const control = L.control({ position: "topleft" });

      control.onAdd = () => {
        const div = L.DomUtil.create("div", "reset-view-button");
        ReactDOM.render(
          <ResetViewButton
            onClick={async () => {
              await new Promise((resolve) => {
                setSelectedItem(null);
                setSelectedLocation(null);
                setServiceArea(null);
                resolve();
              });
              map.flyTo(center, 10, { animate: true, duration: 1 });
            }}
          />,
          div
        );
        return div;
      };
      control.addTo(map);
      return () => {
        control.remove();
      };
    }, [selectedLocation, serviceArea]);

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
      <AddResetViewButton />
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
          </>
        ))}
      {serviceArea && <GeoJSON data={serviceArea} />}
    </MapContainer>
  );
};

export default MapComponent;
