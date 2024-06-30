import React, { useState } from 'react';
import { Button, message, Steps, theme } from 'antd';
import { Grid, Paper } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const description = 'This is a description.';
const steps = [
  {
    title: 'First',
    description,
    content: (
      <Grid item xs={12} style={{ position: 'relative', zIndex: 0 }}>
        <Paper sx={{ padding: 2, height: "400px" }}>
          <MapContainer
            center={[51.505, -0.09]}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[51.505, -0.09]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
        </Paper>
      </Grid>
    ),
  },
  {
    title: 'Second',
    description,
    content: (
      <Grid item xs={12} style={{ position: 'relative', zIndex: 0 }}>
        <Paper sx={{ padding: 2, height: "400px" }}>
          <MapContainer
            center={[51.505, -0.09]}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[51.505, -0.09]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
        </Paper>
      </Grid>
    ),
  },
  {
    title: 'Last',
    description,
    content: (
      <Grid item xs={12} style={{ position: 'relative', zIndex: 0 }}>
        <Paper sx={{ padding: 2, height: "400px" }}>
          <MapContainer
            center={[51.505, -0.09]}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[51.505, -0.09]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
        </Paper>
      </Grid>
    ),
  },
];

const StepsComponent = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
    description: item.description,
  }));

  const contentStyle = {
    lineHeight: '260px',
    textAlign: 'center',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
    height: '400px',
  };

  const handleDone = () => {
    message.success('Processing complete!');
    // Redirect logic if needed
  };

  return (
    <>
      <Steps current={current} items={items} />
      <div style={contentStyle}>
        {steps.map((step, index) => (
          <div
            key={step.title}
            style={{ display: index === current ? 'block' : 'none' }}
          >
            {step.content}
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: 24,
        }}
      >
        {current < steps.length - 1 && (
          <Button type="primary" onClick={next}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={handleDone}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button
            style={{
              margin: '0 8px',
            }}
            onClick={prev}
          >
            Previous
          </Button>
        )}
      </div>
    </>
  );
};

export default StepsComponent;
