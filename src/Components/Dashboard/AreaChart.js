import React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490]; // Data for one year
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300]; // Data for another year
const xLabels = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
];

export default function SimpleLineChart() {
  // Assuming both arrays have the same length and represent data for the same xLabels
  // Modify data to ensure the lines intersect at some point
  const modifiedUData = uData.map((value, index) => value + (pData[index] / 2)); // Adjust uData to intersect
  const modifiedPData = pData.map((value, index) => value - (uData[index] / 2)); // Adjust pData to intersect

  return (
    <div style={{ width: "620px", height: "252px", padding: "10px" }}>
      <LineChart
        series={[
          { data: modifiedPData, label: 'year 1' },
          { data: modifiedUData, label: 'year 2' },
        ]}
        xAxis={[{ scaleType: 'point', data: xLabels }]}
        sx={{
          width: '100%',
          height: '100px',
          margin: '0 auto',
        }}
      />
    </div>
  );
}
