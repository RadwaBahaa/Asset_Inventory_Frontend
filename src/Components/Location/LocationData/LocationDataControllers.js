import React from 'react';
import { Tabs } from 'antd';
import LocationDataTable from '../../Location/LocationData/LocationDataTable';
const onChange = (key) => {
  console.log(key);
};
const items = [
  {
    key: '1',
    label: 'All',
    children: <LocationDataTable />
    ,
  },
  {
    key: '2',
    label: 'Suppliers',
    children: <LocationDataTable />
    ,
  },
  {
    key: '3',
    label: 'Warehouses',
    children: <LocationDataTable />
    ,
  },
  {
    key: '4',
    label: 'Stores',
    children: <LocationDataTable />
    ,
  },
];
const LocationDataControllers = () => <Tabs style={{
  marginTop: "15px",
  marginLeft: "24px",
}} defaultActiveKey="1" items={items} onChange={onChange} />;
export default LocationDataControllers;