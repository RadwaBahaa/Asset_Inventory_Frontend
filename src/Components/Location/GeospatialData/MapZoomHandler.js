import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

const MapZoomHandler = ({
  serviceArea,
  selectedLocation,
  center,
  setPointsVisible,
}) => {
  const map = useMap();

  useEffect(() => {
    if (serviceArea) {
      const bounds = L.geoJSON(serviceArea).getBounds();
      map.fitBounds(bounds, {
        animate: true,
        duration: 2,
        padding: [20, 20],
      });
      console.log("hi from serviceArea");
    } else if (selectedLocation) {
      const latLng = [
        selectedLocation.geometry.coordinates[1],
        selectedLocation.geometry.coordinates[0],
      ];
      map.flyTo(latLng, 15, { animate: true, duration: 1 });
      console.log("hi from selectedLocation");
    } else {
      map.flyTo(center, 10, { animate: true, duration: 1 });
      console.log("hi from center");
    }
  }, [map, serviceArea, selectedLocation]);
  useEffect(() => {
    const onZoomStart = () => setPointsVisible(false);
    const onZoomEnd = () => setPointsVisible(true);

    map.on("zoomstart", onZoomStart);
    map.on("zoomend", onZoomEnd);

    return () => {
      map.off("zoomstart", onZoomStart);
      map.off("zoomend", onZoomEnd);
    };
  }, [map]);
  return null;
};

export default MapZoomHandler;
