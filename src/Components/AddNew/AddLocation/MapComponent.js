import React, { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet/dist/leaflet.css";

const MapComponent = ({ onDrawComplete, searchTerm }) => {
  const center = [39.8283, -98.5795]; // Initial center of the USA
  const [selectedPosition, setSelectedPosition] = useState(null);
  const mapRef = useRef(null); // Ref to hold map instance

  const handleMapClick = (e) => {
    setSelectedPosition([e.latlng.lat, e.latlng.lng]);
    onDrawComplete([e.latlng.lat, e.latlng.lng]); // Pass coordinates to parent component
  };

  useEffect(() => {
    if (searchTerm && mapRef.current) {
      const provider = new OpenStreetMapProvider();
      provider.search({ query: searchTerm }).then((results) => {
        if (results && results.length > 0) {
          const result = results[0];
          const { x, y } = result;
          setSelectedPosition([y, x]);
          mapRef.current.setView([y, x], 10); // Access map instance via ref
        }
      });
    }
  }, [searchTerm]);

  return (
    <MapContainer center={center} zoom={4} style={{ height: "100%", width: "100%" }} ref={mapRef}>
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

      <EventHandlers />
    </MapContainer>
  );

  function EventHandlers() {
    useMapEvents({
      click: handleMapClick,
    });

    return null;
  }
};

export default MapComponent;