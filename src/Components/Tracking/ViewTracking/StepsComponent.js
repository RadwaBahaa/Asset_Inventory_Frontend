import React, { useEffect, useState } from "react";
import { Steps, theme } from "antd";

const StepsComponent = ({ senderProcessDetails, receiverProcessDetail ,current,precent}) => {
  const { token } = theme.useToken();

  // const [markedForDelivery, setMarkedForDelivery] = useState([]);


  

  // const setCurrentStep = (step) => {
  //   setCurrent(step);
  // };

  // useEffect(() => {
  //   if (sentProcesses) {
  //     console.log("sentProcesses:", sentProcesses);
  //   }
  // }, [sentProcesses]);

  // const next = () => {
  //   setCurrent(current + 1);
  // };

  // const prev = () => {
  //   setCurrent(current - 1);
  // };

  // const handleDone = () => {
  //   message.success("Processing complete!");
  //   // Redirect logic if needed
  // };

  // const markForDelivery = (storeId) => {
  //   setMarkedForDelivery([...markedForDelivery, storeId]);
  //   setCurrentStep(1); // Move to the 'Second' step
  // };

  // const content = (
  //   <Grid container spacing={2}>
  //     <Grid item xs={12} md={6}>
  //       <Paper
  //         sx={{
  //           padding: 2,
  //           height: "400px",
  //           display: "flex",
  //           flexDirection: "column",
  //         }}
  //       >
  //         <TrackingTable
  //           setCurrentStep={setCurrentStep}
  //           // markedForDelivery={markedForDelivery}
  //           // markForDelivery={markForDelivery}
  //           sentProcesses={sentProcesses}
  //         />
  //       </Paper>
  //     </Grid>
  //     <Grid item xs={12} md={6}>
  //       <Paper sx={{ padding: 2, height: "400px" }}>
  //         <MapContainer
  //           center={[51.505, -0.09]}
  //           zoom={13}
  //           style={{ height: "100%", width: "100%", zIndex: 1 }}
  //         >
  //           <TileLayer
  //             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  //             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  //           />
  //           <Marker position={[51.505, -0.09]}>
  //             <Popup>
  //               A pretty CSS3 popup. <br /> Easily customizable.
  //             </Popup>
  //           </Marker>
  //         </MapContainer>
  //       </Paper>
  //     </Grid>
  //   </Grid>
  // );

  // const description = "This is a description.";
  const steps = [
    {
      title: "Supplying",
      description: "Preparing to ship",
    },
    {
      title: "Delivering",
      description: "Transporting assets",
    },
    {
      title: "Inventory",
      description: "Recording delivered",
    },
  ];

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
    description: item.description,
  }));

  // const contentStyle = {
  //   lineHeight: "260px",
  //   textAlign: "center",
  //   color: token.colorTextTertiary,
  //   backgroundColor: token.colorFillAlter,
  //   borderRadius: token.borderRadiusLG,
  //   border: `1px dashed ${token.colorBorder}`,
  //   marginTop: 16,
  //   height: "400px",
  // };

  return (
    <>
      {senderProcessDetails &&
        (<Steps
          current={current}
          items={items}
          // size="small"
          percent={precent}
          // labelPlacement="vertical"
          style={{ width: "80%", marginBottom: "1.5%" }}
        />)}
      {receiverProcessDetail && (
        <Steps
          current={current}
          items={items}
          // size="small"
          // percent={precent}
          // labelPlacement="vertical"
          style={{ width: "80%", marginBottom: "1.5%" }}
        />
      )}

      {/* <div style={contentStyle}>
        {steps.map((step, index) => (
          <div
            key={step.title}
            style={{ display: index === current ? "block" : "none" }}
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
              margin: "0 8px",
            }}
            onClick={prev}
          >
            Previous
          </Button>
        )}
      </div> */}
    </>
  );
};
export default StepsComponent;
