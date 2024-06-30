import React from 'react';
import { Tabs } from 'antd';
import PurchaseRequestsTable from './PurchaseRequestsTable';
const onChange = (key) => {
  console.log(key);
};
const items = [
  {
    key: '1',
    label: 'All',
    children: <PurchaseRequestsTable />
    ,
  },
  {
    key: '2',
    label: 'Aproval Bending',
    children: <PurchaseRequestsTable />
    ,
  },
  {
    key: '3',
    label: 'Review Required',
    children: <PurchaseRequestsTable />
    ,
  },
  {
    key: '4',
    label: 'Denied',
    children: <PurchaseRequestsTable />
    ,
  },
];
const PurchaseRequestsControllers = () => <Tabs style={{
  marginTop: "15px",
  marginLeft: "24px",
}} defaultActiveKey="1" items={items} onChange={onChange} />;
export default PurchaseRequestsControllers;