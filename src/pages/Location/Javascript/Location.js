import React, { useEffect, useState, useRef } from "react";
import SubNavbar from "../../../Components/NavBars/SubNavbar";
import { PlusOutlined, HomeOutlined } from "@ant-design/icons";
import { Divider, Spin, Alert } from "antd";
import MapComponent from "../../../Components/Location/MapComponent";
import LocationTable from "../../../Components/Location/LocationTable";
import LocationSetting from "../../../Components/Location/LocationSetting";
import database from "../../../axios/database";
import geoapifyAPI from "../../../axios/geoapifyAPI";
// import { transform } from "html2canvas/dist/types/css/property-descriptors/transform";

export default function Location() {
  const [selectedLocation, setSelectedLocation] = useState();
  const [storesData, setStoresData] = useState([]);
  const [warehousesData, setWarehousesData] = useState([]);
  const [suppliersData, setSuppliersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchBy, setSearchBy] = useState("All");
  const [search, setSearch] = useState("");
  const [serviceAreaData, setServiceAreaData] = useState({});
  const [serviceArea, setServiceArea] = useState(null);

  const locationTableRef = useRef(null);
  const locationMapRef = useRef(null);

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

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (
  //       locationTableRef.current &&
  //       !locationTableRef.current.contains(event.target) &&
  //       locationMapRef.current &&
  //       !locationMapRef.current.contains(event.target)
  //     ) {
  //       setSelectedItem(null);
  //     }
  //   };
  //   document.addEventListener("click", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("click", handleClickOutside);
  //   };
  // }, []);

  useEffect(() => {
    if (selectedItem) {
      const [type, id] = selectedItem.split("-");
      switch (type) {
        case "store":
          setSelectedLocation(
            storesData.find((store) => store.properties.storeID == id)
          );
          break;
        case "warehouse":
          setSelectedLocation(
            warehousesData.find(
              (warehouse) => warehouse.properties.warehouseID == id
            )
          );
          break;
        case "supplier":
          setSelectedLocation(
            suppliersData.find(
              (supplier) => supplier.properties.supplierID == id
            )
          );
          break;
        default:
          setSelectedLocation(null);
          console.log("Invalid item type");
          return;
      }
    }
  }, [selectedItem]);

  useEffect(() => {
    if (serviceAreaData && selectedLocation) {
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
          setServiceArea(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          setServiceArea(null);
          console.log(err);
        });
    }
  }, [serviceAreaData]);

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
            selectedItem={selectedItem}
            setServiceAreaData={setServiceAreaData}
          />

          <Divider style={{ marginTop: "4%", marginBottom: "4%" }} />

          <div
            ref={locationTableRef}
            style={{
              overflowY: "auto",
              maxHeight: "calc(90vh - 64px)",
            }}
          >
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
          ref={locationMapRef}
          style={{
            flex: 1,
            position: "relative",
          }}
        >
          <MapComponent
            storesData={storesData}
            warehousesData={warehousesData}
            suppliersData={suppliersData}
            setSelectedItem={setSelectedItem}
            selectedLocation={selectedLocation}
            serviceArea={serviceArea}
            setServiceArea={setServiceArea}
            setSelectedLocation={setSelectedLocation}
          />
        </div>
      </div>
    </>
  );
}
