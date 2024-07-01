import React from 'react';
import UserData from './UserData'; // Assuming UserData is in the same directory
import { Card, Row, Space, Button } from 'antd';
import ReceiverMap from "./ReceiverMap"; // Import ReceiverMap
import AssetTable from './AssetsTable';
import ProcessTable from './ProcessTable';
import RequestsTable from './RequestsTable';
import MessageList from './Messages';
import SubNav from './SubNav'; // Import SubNav component
import { HomeOutlined, ShoppingCartOutlined, EyeOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";




const Cards = ({

  editButtonLabel,
  editButtonPath,
}) => {


  return (
    <>
      <SubNav

        title="View Your Profile"
        editButtonLabel={
          <>
            <HomeOutlined />
            <span style={{ marginLeft: "8px" }}>To Home Page</span>
          </>
        }
        editButtonPath="/"
      />
      <div style={{ display: 'flex', justifyContent: 'center' }}> {/* Centered outer container */}
        <Space direction="vertical" style={{ display: 'flex', flexWrap: 'wrap', backgroundColor: "#F8F8F9", padding: "24px" }}>
          <Row style={{ paddingLeft: "50px" }}>
            <Card
              style={{ width: "calc(50% - 60px)", 
                minWidth: '550px', 
                padding: '24px', 
                marginBottom: '24px',
                 marginRight: '24px', 
                borderRadius: '20px', 
                boxShadow: 'revert' }}
              title="YOUR DATA"
              size="larg"
            >
              <UserData/>
            </Card>
            <Card
              style={{ width: "calc(50% - 60px)", 
                minWidth: '550px', 
                padding: '24px', 
                marginBottom: '24px',
                 marginRight: '24px',
                 borderRadius: '20px',
                  boxShadow: 'revert' }}
              title="LOCATION"
              size="larg"
            >
              <ReceiverMap />
            </Card>
          </Row>
          <Row style={{ paddingLeft: "50px" }}>
            <Card
              style={{
                width: "calc(50% - 60px)", minWidth: '550px',
                padding: '24px', marginBottom: '24px',
                marginRight: '24px', borderRadius: '20px',
                boxShadow: 'revert',
                // background: 'linear-gradient(to bottom, #e0e0e0, #f5f5f5)',
              }}
              title="ASSETS"
              size="larg"

            >

              <AssetTable />

              <div style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
                <Link to={editButtonPath = "/items/assets"}>
                  <Button type="primary" icon={<ShoppingCartOutlined />} style={{ width: "140px" }}>
                    {editButtonLabel}

                    Check Your Assets
                  </Button>
                </Link>
              </div>
            </Card>

            <Card
              style={{ width: "calc(50% - 60px)", 
                 minWidth: '550px', padding: '24px',
                 marginBottom: '24px',
                 marginRight: '24px', borderRadius: '20px', 
                 boxShadow: 'revert' }}
              title="PROCESSES"
              size="larg"
            >
              <ProcessTable />
              <div style={{ position: 'absolute', 
                bottom: '10px', right: '10px' }}>
                <Link to={editButtonPath = "/tracking/startprocess"}>
                  <Button type="primary" icon={<EyeOutlined />} style={{ width: "160px" }}>
                    {editButtonLabel}
                    Check Your Processes
                  </Button>
                </Link>
              </div>
            </Card>
          </Row>
          <Row style={{ paddingLeft: "50px" }}>
            <Card
              style={{
                width: '550px', // Set fixed width for the card
                padding: '24px',
                marginBottom: '24px',
                marginRight: '24px',
                borderRadius: '20px',
                boxShadow: 'revert',
                overflowX: 'hidden', // Added overflowX: 'hidden'
                height: "580px"
              }}
              title="REQUESTS"
              size="larg"
            >
              <RequestsTable />
              <div style={{  
                paddingTop: '30px', paddingLeft: '73%' }}>
                <Link to={editButtonPath = "/tracking/startprocess"}>
                  <Button type="primary" icon={<EyeOutlined />} style={{ width: "160px" }}>
                    {editButtonLabel}
                    Check Your Processes
                  </Button>
                </Link>
              </div>
            </Card>
            <Card
              style={{
                width: '550px', // Set fixed width for all cards
                padding: '24px',
                marginBottom: '24px',
                marginRight: '24px',
                borderRadius: '20px',
                boxShadow: 'revert',
                overflowY: 'auto', 
                height:"580px"
              }}
              title="MESSAGES"
              size="larg"
            >
              <MessageList />
              <div style={{  
                paddingTop: '30px', paddingLeft: '67%' }}>
                <Link to={editButtonPath = "/alert/messages"}>
                  <Button type="primary" icon={<EyeOutlined />} style={{ width: "165spx" }}>
                    {editButtonLabel}
                    Check Your Messages 
                  </Button>
                </Link>
                </div>
            </Card>
          </Row>
        </Space>
      </div>
    </>
  );
};

export default Cards;
