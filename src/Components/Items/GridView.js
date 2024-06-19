import React from 'react';
import { Card, Row, Col } from 'antd';
const { Meta } = Card;

const GridView = ({ assets }) => {
  return (
    <div style={{ padding: '24px' }}>
      <Row gutter={[16, 16]}>
        {assets.map((asset, index) => (
          <Col key={index} span={6}>
            <Card
              hoverable
              cover={<img alt={asset.name} src={asset.image} style={{ height: '150px', objectFit: 'cover' }} />}
            >
              <Meta
                title={asset.name}
                description={
                  <div>
                    <p><strong>ID:</strong> {asset.id}</p>
                    <p><strong>Price:</strong> {asset.price}</p>
                    <p><strong>Description:</strong> {asset.description}</p>
                  </div>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default GridView;