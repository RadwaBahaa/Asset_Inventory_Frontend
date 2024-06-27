import React from 'react';
import { Tabs } from 'antd';
import MessageList from '../Messages/MessageList';
const onChange = (key) => {
  console.log(key);
};
const items = [
  {
    key: '1',
    label: 'All',
    children: <MessageList/>,
  },
  {
    key: '2',
    label: 'Readed',
    children: <MessageList/>,
  },
  {
    key: '3',
    label: 'Unreaded',
    children: <MessageList/>,
  },
  {
    key: '4',
    label: 'Sent',
    children: <MessageList/>,
  },
];
const MessagesControllers = () => <Tabs  style={{
  marginTop: "15px",
  marginLeft: "24px",
}}defaultActiveKey="1" items={items} onChange={onChange} />;
export default MessagesControllers;
