import React from 'react';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';

const GaugeComponent = ({sucssededProcesses}) => {
  return (
    <Gauge
      width={500}
      height={130}
      value={75}
      startAngle={-90}
      endAngle={90}
      sx={{
     
        [`& .${gaugeClasses.valueText}`]: {
          fontSize: 30,
          transform: 'translate(0px, -15px)',
        },
      }}
      text={({value, valueMax }) => `${value}%`}
    />
  );
};

export default GaugeComponent;