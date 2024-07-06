import React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = [
  'Page A',
  'Page B',
  'Page C',
  'Page D',
  'Page E',
  'Page F',
  'Page G',
];

export default function SimpleLineChart() {
  return (
    <div style={{width:"620px", height:"252px", padding:"10px"}}>
    <LineChart
      // width={600}
      // height={300}
      series={[
        { data: pData, label: 'pv' },
        { data: uData, label: 'uv' },
      ]}
      xAxis={[{ scaleType: 'point', data: xLabels }]}
      sx={{  // Inline styles for the LineChart component
        width: '100%', // Ensures the chart fills the container's width
        height: '100px', // Adjust height as needed
        margin: '0 auto', // Centers the chart horizontally
      }}
    /></div>
  );
}