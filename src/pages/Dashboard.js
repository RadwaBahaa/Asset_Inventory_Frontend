import React, { useEffect, useState } from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  ShoppingCartOutlined,
  ClockCircleOutlined,
  NodeIndexOutlined,
} from "@ant-design/icons";
import database from "../axios/database";
import DashboardTable from "../Components/Dashboard/DashboardTable";
import ShipmentCard from "../Components/Dashboard/Card/Javascript/Card";
import GaugeComponent from "../Components/Dashboard/GaugeComponent";
import DashNavbar from "../Components/Dashboard/DashNavbar";
import SimpleLineChart from "../Components/Dashboard/AreaChart"; // Import the default export
import MapComponent from "../Components/Dashboard/MapComponent";

// Sample data for BarChart and LineChart
const dataBar = [
  { name: "Jan", income: 4000, loss: 2400 },
  { name: "Feb", income: 3000, loss: 1398 },
  { name: "Mar", income: 2000, loss: 9800 },
  { name: "Apr", income: 2780, loss: 3908 },
  { name: "May", income: 1890, loss: 4800 },
  { name: "Jun", income: 2390, loss: 3800 },
  { name: "Jul", income: 3490, loss: 4300 },
];

// const dataLine = [
//   { name: "Week 1", value: 4000 },
//   { name: "Week 2", value: 3000 },
//   { name: "Week 3", value: 2000 },
//   { name: "Week 4", value: 2780 },
// ];

// const dataPie = [
//   { name: "Stores", value: 76, color: "#4caf50" },
//   { name: "Warehouses", value: 24, color: "#ff9800" },
//   { name: "Suppliers", value: 10, color: "#f44336" },
// ];

export default function Dashboard() {
  // const [storesData, setStoresData] = useState([]);
  // const [warehousesData, setWarehousesData] = useState([]);
  // const [suppliersData, setSuppliersData] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedData, setSelectedData] = useState(null); // State to hold selected data
  const [selectedTableData, setSelectedTableData] = useState(null); // State to hold selected table data
  const [totalShipments, setTotalShipments] = useState(0);
  const [pendingPackages, setPendingPackages] = useState(0);
  const [deliveryShipments, setDeliveryShipments] = useState(0);
  const [sucssededProcesses, setSucssededProcesses] = useState(0);
  // const [totalProcesses, setTotalProcesses] = useState(0);

  const [locations, setLocations] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [storeResponse, warehouseResponse] = await Promise.all([
          database.get("/store/process/read"),
          database.get("/warehouse/process/read"),
        ]);

        const allResponses = [...storeResponse.data, ...warehouseResponse.data];

        const supplyingCount = allResponses.filter(
          (item) =>
            item.status === "Supplying" ||
            item.status === "Delivering" ||
            item.status === "Inventory"
        ).length;

        const deliveringCount = allResponses.filter(
          (item) => item.status === "Delivering" || item.status === "Inventory"
        ).length;

        const inventoryCount = allResponses.filter(
          (item) => item.status === "Inventory"
        ).length;

        // setTotalProcesses(allResponses);
        setTotalShipments(supplyingCount);
        setPendingPackages(deliveringCount);
        setDeliveryShipments(inventoryCount);
        setSucssededProcesses(inventoryCount / allResponses.length);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storesResponse = await database.get("store/read/geojson");
        const suppliersResponse = await database.get("supplier/read/geojson");
        const warehousesResponse = await database.get("warehouse/read/geojson");
        // console.log(userRole);
        // Update locations state with all fetched data
        setLocations({
          stores: storesResponse.data,
          suppliers: suppliersResponse.data,
          warehouses: warehousesResponse.data,
        });
      } catch (error) {
        // setError(error.message);
        setLocations({ stores: [], suppliers: [], warehouses: [] }); // Initialize state in case of error
      }
    };

    fetchData();
  }, []);

  const handlePieChartClick = (data) => {
    // console.log("Pie slice clicked:", data.name); // Log the clicked pie slice
    setSelectedType(data.name);
    setSelectedData(data); // Set selected data for display
  };

  const handleMarkerClick = (type, item) => {
    // console.log(`${type} marker clicked:`, item); // Log the clicked marker data
    setSelectedType(type);
    setSelectedTableData(item); // Set selected table data
  };

  // const renderMarkers = () => {
  //   // console.log("Selected Type:", selectedType); // Log the selected type
  //   switch (selectedType) {
  //     case "Stores":
  //       return locations.stores?.map((store) => (
  //         <CircleMarker
  //           key={store.properties.storeID}
  //           center={[
  //             store.geometry.coordinates[1],
  //             store.geometry.coordinates[0],
  //           ]}
  //           pathOptions={{ fillColor: "blue", color: "blue" }}
  //           radius={5}
  //           eventHandlers={{
  //             click: () => handleMarkerClick("Stores", store),
  //           }}
  //         >
  //           <Popup>
  //             {store.properties.storeName} <br />
  //             {store.properties.address}
  //           </Popup>
  //         </CircleMarker>
  //       ));
  //     case "Warehouses":
  //       return locations.warehouses?.map((warehouse) => (
  //         <CircleMarker
  //           key={warehouse.properties.warehouseID}
  //           center={[
  //             warehouse.geometry.coordinates[1],
  //             warehouse.geometry.coordinates[0],
  //           ]}
  //           pathOptions={{ fillColor: "green", color: "green" }}
  //           radius={10}
  //           eventHandlers={{
  //             click: () => handleMarkerClick("Warehouses", warehouse),
  //           }}
  //         >
  //           <Popup>
  //             {warehouse.properties.warehouseName} <br />
  //             {warehouse.properties.address}
  //           </Popup>
  //         </CircleMarker>
  //       ));
  //     case "Suppliers":
  //       return locations.suppliers?.map((supplier) => (
  //         <CircleMarker
  //           key={supplier.properties.supplierID}
  //           center={[
  //             supplier.geometry.coordinates[1],
  //             supplier.geometry.coordinates[0],
  //           ]}
  //           pathOptions={{ fillColor: "red", color: "red" }}
  //           radius={15}
  //           eventHandlers={{
  //             click: () => handleMarkerClick("Suppliers", supplier),
  //           }}
  //         >
  //           <Popup>
  //             {supplier.properties.supplierName} <br />
  //             {supplier.properties.address}
  //           </Popup>
  //         </CircleMarker>
  //       ));
  //     default:
  //       return null;
  //   }
  // };

  return (
    <>
      <DashNavbar />
      <Grid
        container
        spacing={1.5}
        sx={{ padding: 2 }}
        style={{ width: "100%" }}
      >
        {/* Cards and Map */}
        <Grid item xs={12} md={6}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              borderRadius: "15px",
              backgroundColor: "transparent",
            }}
          >
            <ShipmentCard
              count={totalShipments}
              percentage={1.92}
              description="Total Shipments"
              Icon={ShoppingCartOutlined}
            />
            <ShipmentCard
              count={pendingPackages}
              percentage={-0.5}
              description="Pending Packages"
              Icon={ClockCircleOutlined}
            />
            <ShipmentCard
              count={deliveryShipments}
              percentage={0.75}
              description="Delivery Shipments"
              Icon={NodeIndexOutlined}
            />
          </div>

          <div
            style={{
              height: "415px",
              borderRadius: "15px",
              overflow: "hidden",
              backgroundColor: "transparent",
              marginTop: "12px",
            }}
          >
            <MapComponent
              locations={locations}
              setSelectedLocation={setSelectedLocation}
              selectedLocation={selectedLocation}
            />
          </div>
        </Grid>

        {/* Grouped components: DashboardTable, GaugeComponent, Annual Information */}
        <Grid item xs={12} md={6}>
          <Grid container spacing={1.5}>
            {/* DashboardTable and GaugeComponent */}
            <Grid item xs={10} md={6}>
              <div
                style={{
                  height: "100%",
                  padding: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  borderRadius: "15px",
                  backgroundColor: "white",
                }}
              >
                <div style={{ textAlign: "left" }}>
                  <h3 id="gauge-header" style={{ marginBottom: "0px" }}>
                    Analytic View
                  </h3>
                </div>
                <GaugeComponent sucssededProcesses={sucssededProcesses} />
                <p
                  id="gauge-text"
                  style={{
                    marginTop: "8px",
                    color: "#999",
                    fontSize: "14px",
                    lineHeight: "1.4",
                  }}
                >
                  Total shipping revenue overview
                </p>
              </div>
            </Grid>
            <Grid item xs={10} md={6}>
              <div
                style={{
                  height: "100%",
                  padding: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  borderRadius: "15px",
                  backgroundColor: "white",
                }}
              >
                {locations && (
                  <DashboardTable
                    selectedTableData={selectedTableData}
                    storesData={locations.stores}
                    warehousesData={locations.warehouses}
                    suppliersData={locations.suppliers}
                  />
                )}
              </div>
            </Grid>

            <Grid item xs={6} md={12}>
              <div style={{ borderRadius: "15px", backgroundColor: "white" }}>
                <Typography
                  style={{
                    paddingLeft: "20px",
                    paddingTop: "15px",
                    borderRadius: "15px",
                  }}
                  variant="h6"
                >
                  Annual Information
                </Typography>
                <SimpleLineChart data={dataBar} />
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
