import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

const data = [
  { id: 0, value: 10, label: "Series A" },
  { id: 1, value: 15, label: "Series B" },
  { id: 2, value: 20, label: "Series C" },
];

const PieChartComponent = () => {
  return (
    // Render the PieChart component with specific properties.
    <PieChart
      series={[
        {
          data, // Use the data defined above for the series.
          highlightScope: { faded: "global", highlighted: "item" }, // Highlight configuration.
          faded: { innerRadius:10 , additionalRadius: -10, color: "gray" }, // Fading configuration for the unhighlighted segments.
        },
      ]}
      height={300} // Set the height of the PieChart to 400 pixels.
    />
  );
};

export default PieChartComponent;
