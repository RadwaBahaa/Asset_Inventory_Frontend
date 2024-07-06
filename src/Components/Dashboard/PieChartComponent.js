import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

const data = [
  { id: 0, value: 10, label: "Series A" },
  { id: 1, value: 15, label: "Series B" },
  { id: 2, value: 20, label: "Series C" },
];

const PieChartComponent = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <PieChart
        series={[
          {
            data,
            highlightScope: { faded: "global", highlighted: "item" },
            faded: { innerRadius: 10, additionalRadius: -10, color: "gray" },
          },
        ]}
        height={300}
        width={450}
      />
    </div>
  );
};

export default PieChartComponent;
