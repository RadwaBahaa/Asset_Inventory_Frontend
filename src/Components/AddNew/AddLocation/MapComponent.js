import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = ({ onDrawComplete }) => {
  const center = [39.8283, -98.5795]; // Initial center of the USA
  const [selectedPosition, setSelectedPosition] = useState(null);

  const handleMapClick = (e) => {
    setSelectedPosition([e.latlng.lat, e.latlng.lng]);
    onDrawComplete([e.latlng.lat, e.latlng.lng]); // Pass coordinates to parent component
  };

  return (
    <MapContainer center={center} zoom={4} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {selectedPosition && (
        <CircleMarker
          center={selectedPosition}
          pathOptions={{ fillColor: "blue" }}
          radius={10}
        >
          <Popup>
            Selected location. <br /> Easily customizable.
          </Popup>
        </CircleMarker>
      )}

      {/* Use useMapEvents to handle map click */}
      <EventHandlers />
    </MapContainer>
  );

  function EventHandlers() {
    const map = useMapEvents({
      click: handleMapClick,
    });

    return null;
  }
};

export default MapComponent;
