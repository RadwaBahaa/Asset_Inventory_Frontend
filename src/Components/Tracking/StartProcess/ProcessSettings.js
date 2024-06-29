import React from 'react';
import { Select } from 'antd';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import { Segmented } from 'antd';

const onChange = (value) => {
  console.log(`selected ${value}`);
};

const onSearch = (value) => {
  console.log('search:', value);
};

const ProcessDropdownMenu = () => (
  <Select
    showSearch
    placeholder="Select a warehouse"
    optionFilterProp="label"
    onChange={onChange}
    onSearch={onSearch}
    style={{ width: 620 }} // Set the width here
  >
    {[
      { value: 'jack', label: 'Jack' },
      { value: 'lucy', label: 'Lucy' },
      { value: 'tom', label: 'Tom' },
    ].map((option) => (
      <Select.Option key={option.value} value={option.value} label={option.label}>
        {option.label}
      </Select.Option>
    ))}
  </Select>
);

const ProcessSettings = () => (
  <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
    <Segmented
      style={{ marginRight: '8px' }} // Adjust margin-right for gap
      options={[
        {
          value: 'List',
          icon: <BarsOutlined />,
        },
        {
          value: 'Grid',
          icon: <AppstoreOutlined />,
        },
      ]}
    />
    <ProcessDropdownMenu />
  </div>
);

export default ProcessSettings;
