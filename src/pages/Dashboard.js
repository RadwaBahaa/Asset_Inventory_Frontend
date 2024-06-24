import React, { useEffect, useState } from "react";
import { Grid, Paper, Typography, Box, Card, CardContent } from "@mui/material";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
  GeoJSON,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";
import { PieChart } from "@mui/x-charts/PieChart";
import database from "../axios/database";

const dataLine = [
  { name: "Jan", value: 50 },
  { name: "Feb", value: 80 },
  { name: "Mar", value: 70 },
];

const dataRadar = [
  { subject: "A", A: 120, B: 110, fullMark: 150 },
  { subject: "B", A: 98, B: 130, fullMark: 150 },
  { subject: "C", A: 86, B: 130, fullMark: 150 },
  { subject: "D", A: 99, B: 100, fullMark: 150 },
  { subject: "E", A: 85, B: 90, fullMark: 150 },
  { subject: "F", A: 65, B: 85, fullMark: 150 },
];

const dataBar = [
  { name: "Jan", income: 4000, loss: 2400, amt: 2400 },
  { name: "Feb", income: 3000, loss: 1398, amt: 2210 },
  { name: "Mar", income: 2000, loss: 9800, amt: 2290 },
  { name: "Apr", income: 2780, loss: 3908, amt: 2000 },
  { name: "May", income: 1890, loss: 4800, amt: 2181 },
  { name: "Jun", income: 2390, loss: 3800, amt: 2500 },
  { name: "Jul", income: 3490, loss: 4300, amt: 2100 },
];

const dataPie = [
  { name: "Completed", value: 76, color: "#4caf50" },
  { name: "Pending", value: 24, color: "#ff9800" },
];

export default function Dashboard() {
  const [storesData, setStoresData] = useState();
  const [warehousesData, setWarehousesData] = useState();
  const [suppliersData, setSuppliersData] = useState();

  useEffect(() => {
    database
      .get("/stores/read/geojson")
      .then((response) => {
        console.log("Response data:", response.data); // Log the response data
        setStoresData(response.data);
      })
      .catch((error) => {
        console.error("Error:", error); // Log any errors
      });

    database
      .get("/warehouses/read/geojson")
      .then((response) => {
        console.log("Response data:", response.data); // Log the response data
        setWarehousesData(response.data);
      })
      .catch((error) => {
        console.error("Error:", error); // Log any errors
      });

    database
      .get("/suppliers/read/geojson")
      .then((response) => {
        console.log("Response data:", response.data); // Log the response data
        setSuppliersData(response.data);
      })
      .catch((error) => {
        console.error("Error:", error); // Log any errors
      });
  }, []);

  return (
    <>
      <Grid container spacing={2} sx={{ padding: 2 }}>
        {/* Statistic Cards */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Users</Typography>
              <Typography variant="h4">1,234</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Sales</Typography>
              <Typography variant="h4">$123,456</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Orders</Typography>
              <Typography variant="h4">567</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Map */}
        <Grid item xs={12}>
          <Paper sx={{ padding: 2, height: "400px" }}>
            <MapContainer
              center={[40.7128, -74.006]}
              zoom={10}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {storesData &&
                storesData.map((store) => (
                  <CircleMarker
                    key={store.properties.storeID}
                    center={[
                      store.geometry.coordinates[1], // latitude
                      store.geometry.coordinates[0], // longitude
                    ]}
                    pathOptions={{ fillColor: "blue", color: "blue" }}
                    radius={5}
                  >
                    <Popup>
                      {store.properties.storeName} <br />
                      {store.properties.address}
                    </Popup>
                  </CircleMarker>
                ))}
              {warehousesData &&
                warehousesData.map((warehouse) => (
                  <CircleMarker
                    key={warehouse.properties.warehouseID}
                    center={[
                      warehouse.geometry.coordinates[1], // latitude
                      warehouse.geometry.coordinates[0], // longitude
                    ]}
                    pathOptions={{ fillColor: "green", color: "green" }}
                    radius={10}
                  >
                    <Popup>
                      {warehouse.properties.warehouseName} <br />
                      {warehouse.properties.address}
                    </Popup>
                  </CircleMarker>
                ))}
              {suppliersData &&
                suppliersData.map((supplier) => (
                  <CircleMarker
                    key={supplier.properties.supplierID}
                    center={[
                      supplier.geometry.coordinates[1], // latitude
                      supplier.geometry.coordinates[0], // longitude
                    ]}
                    pathOptions={{ fillColor: "red", color: "red" }}
                    radius={15}
                  >
                    <Popup>
                      {supplier.properties.supplierName} <br />
                      {supplier.properties.address}
                    </Popup>
                  </CircleMarker>
                ))}
            </MapContainer>
          </Paper>
        </Grid>

        {/* Annual Information */}
        <Grid item xs={12}>
          <Paper sx={{ padding: 2, height: "100%" }}>
            <Typography variant="h6">Annual Information</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dataBar}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="income" fill="#8884d8" />
                <Bar dataKey="loss" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Percent Ratio */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ padding: 2, height: "100%" }}>
            <Typography variant="h6">Percent Ratio</Typography>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height={200}
            >
              <PieChart
                series={[
                  {
                    data: dataPie,
                    innerRadius: 30,
                    outerRadius: 80, // Reduced to fit the box
                    paddingAngle: 5,
                    cornerRadius: 5,
                    startAngle: -90,
                    endAngle: 180,
                    cx: 120, // Adjusted to fit within the box
                    cy: 100, // Adjusted to fit within the box
                  },
                ]}
              />
            </Box>
          </Paper>
        </Grid>

        {/* Last 3 Month */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ padding: 2, height: "100%" }}>
            <Typography variant="h6">Last 3 Month</Typography>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={dataLine}>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Live Information */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2, height: "100%" }}>
            <Typography variant="h6">Live Information</Typography>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={dataLine}>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Wallet */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2, height: "100%" }}>
            <Typography variant="h6">Wallet</Typography>
            <Typography variant="h4">$2,650,567,234</Typography>
          </Paper>
        </Grid>

        {/* Income and Loss */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2, height: "100%" }}>
            <Typography variant="h6">Income and Loss</Typography>
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Box>
                <Typography variant="body1">Loss</Typography>
                <Typography variant="h6">$1,567,345,654</Typography>
              </Box>
              <Box>
                <Typography variant="body1">Income</Typography>
                <Typography variant="h6">$1,789,756,234</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
