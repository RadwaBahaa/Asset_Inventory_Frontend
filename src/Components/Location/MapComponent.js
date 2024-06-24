import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMapEvents,
  GeoJSON,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import geoapifyAPI from "../../axios/geoapifyAPI";
// import targomoAPI from "../../axios/targomoAPI";

const MapComponent = () => {
  const center = [39.8283, -98.5795]; // Initial center of the USA
  const [selectedPosition, setSelectedPosition] = useState(center);
  const [serviceArea, setServiceArea] = useState(null);

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        setServiceArea(null); // Clear previous service area
        const newPosition = [e.latlng.lat, e.latlng.lng];
        console.log("Map Clicked at:", newPosition);
        setSelectedPosition(newPosition);

        // Geoapify API
        geoapifyAPI
          .get("/isoline", {
            params: {
              lat: newPosition[0],
              lon: newPosition[1],
              type: "distance",
              mode: "drive",
              range: "100000",
            },
          })
          .then((response) => {
            console.log(response);
            setServiceArea(response.data);
          })
          .catch((error) => {
            console.error("Error fetching isoline data:", error);
          });

        //     // Targomo API
        //     targomoAPI
        //       .post("/polygon_post", {
        //         sources: [
        //           {
        //             lat: newPosition[0],
        //             lng: newPosition[1],
        //             id: "id123",
        //             tm: {
        //               walk: {},
        //             },
        //           },
        //         ],
        //         polygon: {
        //           serializer: "geojson",
        //           srid: 4326,
        //           values: [900],
        //         },
        //       })
        //       .then((response) => {
        //         console.log(response.data);
        //         setServiceArea(response.data);
        //       })
        //       .catch((error) =>
        //         console.error("Error fetching isoline data:", error)
        //       );
      },
    });

    return null;
  };

  return (
    <MapContainer
      center={center}
      zoom={4}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapClickHandler />
      {serviceArea && <GeoJSON data={serviceArea} />}
      <CircleMarker
        center={selectedPosition}
        pathOptions={{ fillColor: "blue" }}
        radius={10}
      >
        <Popup>
          Selected location. <br /> Easily customizable.
        </Popup>
      </CircleMarker>
    </MapContainer>
  );
};

export default MapComponent;
