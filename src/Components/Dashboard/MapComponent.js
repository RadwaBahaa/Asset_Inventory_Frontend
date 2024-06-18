import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";


const MapComponent = () => {
  // Placeholder useEffect hook for future custom Leaflet code if needed.
  // useEffect(() => {
  //   // Add your Leaflet code here
  // }, []);

  return (
    // MapContainer sets up the map with initial center and zoom level.
    <MapContainer
      center={[51.505, -0.09]} // Center the map on coordinates [51.505, -0.09] (London).
      zoom={13} // Set the initial zoom level to 13.
      style={{ height: "100%", width: "90%" }} // Make the map fill its container
    >
      {/* TileLayer sets up the map's tiles using OpenStreetMap's tile server. */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {/* Marker adds a marker at the specified position on the map. */}
      <Marker position={[51.505, -0.09]}>
        {/* Popup adds a popup to the marker which appears when the marker is clicked. */}
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
