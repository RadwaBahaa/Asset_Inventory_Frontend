import React from 'react';
import { Button } from 'antd';
import { DownOutlined, ArrowLeftOutlined, CheckOutlined } from '@ant-design/icons'; // Import necessary icons
import SubNavbar from "../../Components/NavBars/SubNavbar";
import AddAssetForm from '../../Components/Items/Form';

export default function Assets() {
  return (
    <div>
      <SubNavbar
        title="Add Asset"
        editButtonLabel={<><ArrowLeftOutlined /> To Homepage</>}
        editButtonPath={"/"}
        addButtonLabel={<><CheckOutlined /> Done</>}
        addButtonPath={"/addNew/addingSuccessfully"}
      />
      <div style={{ padding: '20px' }}>
        <AddAssetForm />
      </div>
    </div>
  );
}