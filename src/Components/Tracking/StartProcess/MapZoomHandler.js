import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

const MapZoomHandler = ({ setPointsVisible, selectedReceiver, center }) => {
  const map = useMap();

  useEffect(() => {
    if (!selectedReceiver) {
      map.flyTo(center, 10, { animate: true, duration: 0.5 });
    } else if (selectedReceiver) {
      const latLng = [
        selectedReceiver.geometry.coordinates[1],
        selectedReceiver.geometry.coordinates[0],
      ];
      map.flyTo(latLng, 15, { animate: true, duration: 0.5 });
      console.log("hi from selectedLocation");
    }
  }, [map, selectedReceiver]);
  useEffect(() => {
    const onZoomStart = () => setPointsVisible(false);
    const onZoomEnd = () => setPointsVisible(true);

    map.on("zoomstart", onZoomStart);
    map.on("zoomend", onZoomEnd);

    return () => {
      map.off("zoomstart", onZoomStart);
      map.off("zoomend", onZoomEnd);
    };
  }, []);
  return null;
};

export default MapZoomHandler;
