import React from 'react';
import { Descriptions } from 'antd';

const items = [
  {
    key: '1',
    label: 'UserName',
    children: 'Zhou Maomao',
  },
  {
    key: '2',
    label: 'Telephone',
    children: '1810000000',
  },
  {
    key: '3',
    label: 'Position',
    children: 'Hangzhou, Zhejiang',
  },
];

const UserData = () => <Descriptions items={items} />;

export default UserData;
