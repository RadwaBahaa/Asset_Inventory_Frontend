import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import { ShoppingCartOutlined, ClockCircleOutlined, NodeIndexOutlined } from "@ant-design/icons";
import database from "../axios/database";
import DashboardTable from "../Components/Dashboard/DashboardTable";
import ShipmentCard from "../Components/Dashboard/Card/Javascript/Card";
import GaugeComponent from "../Components/Dashboard/GaugeComponent";
import DashNavbar from "../Components/Dashboard/DashNavbar";
import SimpleLineChart from "../Components/Dashboard/AreaChart";
import MapComponent from "../Components/Dashboard/MapComponent";

// Sample data for BarChart and LineChart
const appleSupplyChainData = {
  totalShipments: 1200,
  pendingPackages: 300,
  deliveryShipments: 900,
  sucssededProcesses: 0.75,
  locations: {
    stores: [
      {
        geometry: { coordinates: [30.0444, 31.2357] },
        properties: { id: "1", name: "Apple Store Cairo", address: "Cairo, Egypt" },
      },
    ],
    warehouses: [
      {
        geometry: { coordinates: [29.9753, 31.1376] },
        properties: { id: "2", name: "Apple Warehouse Giza", address: "Giza, Egypt" },
      },
    ],
    suppliers: [
      {
        geometry: { coordinates: [31.2001, 29.9187] },
        properties: { id: "3", name: "Apple Supplier Alexandria", address: "Alexandria, Egypt" },
      },
    ],
  },
  annualData: [
    { name: "Jan", income: 5000, loss: 1500 },
    { name: "Feb", income: 4500, loss: 1200 },
    { name: "Mar", income: 6000, loss: 2000 },
    { name: "Apr", income: 7000, loss: 2500 },
    { name: "May", income: 8000, loss: 3000 },
    { name: "Jun", income: 7500, loss: 2800 },
    { name: "Jul", income: 8500, loss: 3200 },
  ],
  // New property for asset data
  appleAssets: {
    totalAssets: 150000, // Example: Total assets in millions
    currentAssets: 90000, // Example: Current assets in millions
  },
};

export default function Dashboard() {
  const [selectedType, setSelectedType] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const [selectedTableData, setSelectedTableData] = useState(null);

  const handleMarkerClick = (type, item) => {
    setSelectedType(type);
    setSelectedTableData(item);
  };

  // Calculate supply chain metric for GaugeComponent
  const calculateSupplyChainMetric = () => {
    // Example: Calculating a metric based on total shipments and succeeded processes
    const totalShipments = appleSupplyChainData.totalShipments;
    const succeededProcesses = appleSupplyChainData.sucssededProcesses;
    
    // Example calculation (modify as per your actual metric calculation)
    return totalShipments * succeededProcesses / 100; // Adjust this calculation as needed
  };

  return (
    <>
      <DashNavbar />
      <Grid container spacing={1.5} sx={{ padding: 2 }} style={{ width: "100%" }}>
        {/* Cards and Map */}
        <Grid item xs={12} md={6}>
          <div style={{ display: "flex", justifyContent: "space-between", borderRadius: "15px", backgroundColor: "transparent" }}>
            <ShipmentCard
              count={appleSupplyChainData.totalShipments}
              percentage={1.92}
              description="Total Shipments"
              Icon={ShoppingCartOutlined}
            />
            <ShipmentCard
              count={appleSupplyChainData.pendingPackages}
              percentage={-0.5}
              description="Pending Packages"
              Icon={ClockCircleOutlined}
            />
            <ShipmentCard
              count={appleSupplyChainData.deliveryShipments}
              percentage={0.75}
              description="Delivery Shipments"
              Icon={NodeIndexOutlined}
            />
          </div>

          <div style={{ height: "415px", borderRadius: "15px", overflow: "hidden", backgroundColor: "transparent", marginTop: "12px" }}>
            <MapComponent
              locations={appleSupplyChainData.locations}
              handleMarkerClick={handleMarkerClick}
            />
          </div>
        </Grid>

        {/* Grouped components: DashboardTable, GaugeComponent, Annual Information */}
        <Grid item xs={12} md={6}>
          <Grid container spacing={1.5}>
            {/* DashboardTable and GaugeComponent */}
            <Grid item xs={10} md={6}>
              <div style={{ height: "100%", padding: 2, display: "flex", flexDirection: "column", alignItems: "center", borderRadius: "15px", backgroundColor: "white" }}>
                <div style={{ textAlign: "left" }}>
                  <h3 id="gauge-header" style={{ marginBottom: "0px" }}>
                    Analytic View
                  </h3>
                </div>
                {/* Pass new data to GaugeComponent */}
                <GaugeComponent
                  sucssededProcesses={calculateSupplyChainMetric()}
                  totalAssets={appleSupplyChainData.appleAssets.totalAssets}
                  currentAssets={appleSupplyChainData.appleAssets.currentAssets}
                />
                <p id="gauge-text" style={{ marginTop: "8px", color: "#999", fontSize: "14px", lineHeight: "1.4" }}>
                  Total shipping revenue overview
                </p>
              </div>
            </Grid>
            <Grid item xs={10} md={6}>
              <div style={{ height: "100%", padding: 2, display: "flex", flexDirection: "column", alignItems: "center", borderRadius: "15px", backgroundColor: "white" }}>
                {appleSupplyChainData.locations && (
                  <DashboardTable
                    storesData={appleSupplyChainData.locations.stores}
                    warehousesData={appleSupplyChainData.locations.warehouses}
                    suppliersData={appleSupplyChainData.locations.suppliers}
                  />
                )}
              </div>
            </Grid>

            <Grid item xs={6} md={12}>
              <div style={{ borderRadius: "15px", backgroundColor: "white" }}>
                <Typography style={{ paddingLeft: "20px", paddingTop: "15px", borderRadius: "15px" }} variant="h6">
                  Annual Information
                </Typography>
                <SimpleLineChart data={appleSupplyChainData.annualData} />
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
