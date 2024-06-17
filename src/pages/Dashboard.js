// import React from 'react';
// import MapComponent from '../Components/MapComponent';

// const Dashboard = () => {
//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
//       <h1>Dashboard</h1>
//       <div style={{ flex: 1 }}>
//         <MapComponent />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import React from 'react';
import { Grid } from '@mui/material';
import MapComponent from '../Components/MapComponent';
import PieChartComponent from '../Components/PieChartComponent';

const Dashboard = () => {
  return (
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
  );
};

export default Dashboard;