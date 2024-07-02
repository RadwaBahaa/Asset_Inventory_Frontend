import React, { useEffect, useState } from "react";
import SubNavbar from "../../../Components/NavBars/SubNavbar";
import { PlusOutlined, HomeOutlined } from "@ant-design/icons";
import { Divider } from "antd";
import MapComponent from "../../../Components/Location/MapComponent";
import LocationTable from "../../../Components/Location/LocationTable";
import LocationSetting from "../../../Components/Location/LocationSetting";
import database from "../../../axios/database";
import geoapifyAPI from "../../../axios/geoapifyAPI";
import ServiceAreaSetting from "../../../Components/Location/ServiceAreaSetting";
import * as turf from "@turf/turf";

export default function Location() {
  const [locations, setLocations] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchBy, setSearchBy] = useState("All");
  const [search, setSearch] = useState("");
  const [serviceAreaData, setServiceAreaData] = useState(null);
  const [serviceArea, setServiceArea] = useState(null);
  const [startServiceArea, setStartServiceArea] = useState(false);
  const [serviedLocations, setServiedLocations] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storesResponse = await database.get("store/read/geojson");
        const suppliersResponse = await database.get("supplier/read/geojson");
        const warehousesResponse = await database.get(
          "warehouse/read/geojson"
        );

        // Update locations state with all fetched data
        setLocations({
          stores: storesResponse.data,
          suppliers: suppliersResponse.data,
          warehouses: warehousesResponse.data,
        });
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (locations !== null) {
      console.log(locations);
    }
  }, [locations]);

  useEffect(() => {
    if (selectedItem) {
      const [type, id] = selectedItem.split("-");
      let location = null;

      switch (type) {
        case "store":
          location = locations.stores.find(
            (store) => store.properties.storeID == id
          );
          break;
        case "warehouse":
          location = locations.warehouses.find(
            (warehouse) => warehouse.properties.warehouseID == id
          );
          break;
        case "supplier":
          location = locations.suppliers.find(
            (supplier) => supplier.properties.supplierID == id
          );
          break;
        default:
          console.log("Invalid item type");
          return;
      }

      if (location) {
        setSelectedLocation({
          ...location,
          properties: {
            ...location.properties,
            type: type,
          },
        });
      }
    }
  }, [selectedItem, locations]);

  useEffect(() => {
    if (serviceAreaData && selectedLocation) {
      setServiceArea(null);
      geoapifyAPI
        .get("/isoline", {
          params: {
            lat: selectedLocation.geometry.coordinates[1],
            lon: selectedLocation.geometry.coordinates[0],
            type: serviceAreaData.type,
            mode: "drive",
            range:
              serviceAreaData.type === "distance"
                ? serviceAreaData.range * 1000
                : serviceAreaData.range * 60,
            avoid: serviceAreaData.avoid,
            route_type: serviceAreaData.route_type,
            traffic: serviceAreaData.traffic,
          },
        })
        .then((res) => {
          if (res.data.features.length > 0) {
            const polygon = res.data.features[0];
            setServiceArea(polygon);
            let allLocations;
            if (selectedLocation.properties.type === "supplier") {
              allLocations = locations.warehouses;
            } else if (selectedLocation.properties.type === "warehouse") {
              allLocations = locations.stores;
            } else {
              allLocations = [];
            }

            if (allLocations.length > 0) {
              const locationsWithinServiceArea = allLocations.filter(
                (location) => {
                  const point = turf.point(location.geometry.coordinates);
                  return turf.booleanPointInPolygon(point, polygon);
                }
              );

              setServiedLocations(locationsWithinServiceArea);
              console.log(locationsWithinServiceArea);
            }
          } else {
            setServiceArea(null);
            setServiedLocations([]);
            console.log("No service area found");
          }
        })
        .catch((err) => {
          setServiceArea(null);
          console.log(err);
        });
    }
  }, [serviceAreaData]);

  useEffect(() => {
    setServiceAreaData(() => (serviceAreaData ? null : serviceAreaData));
    setServiceArea(() => (serviceArea ? null : serviceArea));
    setServiedLocations(() => (serviedLocations ? null : serviedLocations));
  }, [selectedLocation]);

  return (
    <>
      <SubNavbar
        title="Locations"
        editButtonLabel={
          <>
            <HomeOutlined />
            <span style={{ marginLeft: "8px" }}>To Home Page</span>
          </>
        }
        editButtonPath="/"
        addButtonLabel={
          <>
            <PlusOutlined />
            <span style={{ marginLeft: "8px" }}>Add Location</span>
          </>
        }
        addButtonPath="/addNew/location"
      />

      <div
        style={{
          display: "flex",
          height: "calc(90vh - 64px)",
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "2%",
            width: "30%",
            maxHeight: "550px",
          }}
        >
          <LocationSetting
            setSearchBy={setSearchBy}
            setSearch={setSearch}
            setStartServiceArea={setStartServiceArea}
            startServiceArea={startServiceArea}
            selectedLocation={selectedLocation}
            setServiceAreaData={setServiceAreaData}
          />
          {startServiceArea && selectedLocation && (
            <ServiceAreaSetting
              setServiceAreaData={setServiceAreaData}
              selectedLocation={selectedLocation}
            />
          )}
          <Divider style={{ marginTop: "4%", marginBottom: "4%" }} />
          <div
            style={{
              overflowY: "auto",
              maxHeight: "calc(90vh - 64px)",
            }}
          >
            <LocationTable
              locations={locations}
              setSelectedItem={setSelectedItem}
              selectedItem={selectedItem}
              serviedLocations={serviedLocations}
            />
          </div>
        </div>
        <div
          style={{
            flex: 1,
            position: "relative",
          }}
        >
          <MapComponent
            locations={locations}
            setSelectedItem={setSelectedItem}
            selectedLocation={selectedLocation}
            serviceArea={serviceArea}
            setServiceArea={setServiceArea}
            setSelectedLocation={setSelectedLocation}
            setServiedLocations={setServiedLocations}
            serviedLocations={serviedLocations}
          />
        </div>
      </div>
    </>
  );
}
