import React from 'react';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';

const GaugeComponent = ({sucssededProcesses}) => {
  return (
    <Gauge
      width={500}
      height={130}
      value={sucssededProcesses}
      startAngle={-90}
      endAngle={90}
      sx={{
        // position: 'relative',
        // left: '-108px',  // Adjust left position as needed
        // top: '-20px',   // Adjust top position as needed
        [`& .${gaugeClasses.valueText}`]: {
          fontSize: 30,
          transform: 'translate(0px, -15px)',
        },
      }}
      text={({ sucssededProcesses, valueMax }) => `${sucssededProcesses}%`}
    />
  );
};

export default GaugeComponent;