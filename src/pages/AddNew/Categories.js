import React from 'react';
import { Button } from 'antd';
import { DownOutlined, ArrowLeftOutlined, CheckOutlined } from '@ant-design/icons'; // Import necessary icons
import SubNavbar from "../../Components/NavBars/SubNavbar";
import CategoriesForm from '../../Components/Items/CategoriesForm';

export default function Categories() {
  return (
    <div>
      <SubNavbar
        title="Add Category"
        editButtonLabel={<><ArrowLeftOutlined /> To Homepage</>}
        editButtonPath={"/"}
        addButtonLabel={<><CheckOutlined /> Done</>}
        addButtonPath={"/addNew/addingSuccessfully"}
      />
      <div style={{ padding: '20px' }}>
        <CategoriesForm />
      </div>
    </div>
  );
}