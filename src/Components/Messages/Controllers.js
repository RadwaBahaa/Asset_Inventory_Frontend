import React, { useState } from 'react';
import { Segmented } from 'antd';
const Contrillers = () => {
  const [value, setValue] = useState('Map');
  return <Segmented  style={{
    marginTop:"15px",
    marginLeftLeft:"24px"
               
               
  }} 
  options={['Map', 'Transit', 'Satellite']} value={value} onChange={setValue} />;
};
export default Contrillers;