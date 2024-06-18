// export default Dashboard;
import React from "react";
import { Grid } from "@mui/material";
import MapComponent from "../components/Dashboard/MapComponent";
import PieChartComponent from "../components/Dashboard/PieChartComponent";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <>
      {/* Breadcrumb navigation for showing current page path */}
      <Breadcrumb className="breadcrumb">
        <Breadcrumb.Item>
          <Link to={"/dashboard"}>Dashboard</Link>{" "}
        </Breadcrumb.Item>
      </Breadcrumb>
      <Grid container spacing={3}>
        {/* Left side with PieChartComponent */}
        <Grid item xs={12} md={6}>
          <PieChartComponent />
        </Grid>
        {/* Right side with MapComponent */}
        <Grid item xs={12} md={6}>
          <MapComponent />
        </Grid>
      </Grid>
    </>
  );
}
