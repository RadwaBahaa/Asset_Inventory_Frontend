import React from 'react';
import '../CSS/Card.css';

const ShipmentCard = ({ count, percentage, description, Icon }) => {
  const percentageStyle = {
    color: percentage > 0 ? '#28a745' : '#dc3545',
  };

  const arrow = percentage > 0 ? '↑' : '↓';

  return (
    <div className="shipment-card">
      <div className="icon-container">
        <Icon className="icon" />
      </div>
      <div className="details">
        <div className="count">{count}</div>
        <div className="percentage" style={percentageStyle}>
          <span className="increase">{percentage}%</span>
          <span className="arrow">{arrow}</span>
        </div>
        <div className="description">{description}</div>
      </div>
    </div>
  );
};

export default ShipmentCard;
