import React, { useEffect, useState, useRef } from "react";
import SubNavbar from "../Components/NavBars/SubNavbar";
import { PlusOutlined, HomeOutlined } from "@ant-design/icons";
import { Divider, Spin, Alert } from "antd";
import MapComponent from "../Components/Location/MapComponent";
import LocationTable from "../Components/Location/LocationTable";
import LocationSetting from "../Components/Location/LocationSetting";
import database from "../axios/database";

export default function Location() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [storesData, setStoresData] = useState([]);
  const [warehousesData, setWarehousesData] = useState([]);
  const [suppliersData, setSuppliersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchBy, setSearchBy] = useState("All");
  const [search, setSearch] = useState("");

  const locationTableRef = useRef(null); // Reference to LocationTable component

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storesResponse = await database.get("stores/read/geojson");
        setStoresData(storesResponse.data);

        const suppliersResponse = await database.get("suppliers/read/geojson");
        setSuppliersData(suppliersResponse.data);

        const warehousesResponse = await database.get(
          "warehouses/read/geojson"
        );
        setWarehousesData(warehousesResponse.data);

        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click occurred outside the LocationTable component
      if (
        locationTableRef.current &&
        !locationTableRef.current.contains(event.target)
      ) {
        // Reset selectedItem to null to reset the map view
        setSelectedItem(null);
      }
    };
    // Add event listener when component mounts
    document.addEventListener("click", handleClickOutside);
    // Clean up event listener when component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

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
          // height: "calc(100vh - 64px)", // Adjust height to fit your layout
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "2%",
            width: "30%", // Adjust width as needed
            overflowY: "auto", // Enable scrolling if content overflows
          }}
          // Assign ref to the LocationTable component
        >
          <LocationSetting
            selectedLocation={selectedLocation}
            setSearchBy={setSearchBy}
            setSearch={setSearch}
          />

          <Divider style={{ marginTop: "4%", marginBottom: "4%" }} />

          <div ref={locationTableRef}>
            <LocationTable
              storesData={storesData}
              warehousesData={warehousesData}
              suppliersData={suppliersData}
              setSelectedItem={setSelectedItem}
              selectedItem={selectedItem}
            />
          </div>
        </div>
        <div
          style={{ flex: 1, position: "relative", height: "120%", width: "0%" }}
        >
          <MapComponent
            storesData={storesData}
            warehousesData={warehousesData}
            suppliersData={suppliersData}
            selectedItem={selectedItem}
          />
        </div>
      </div>
    </>
  );
}
