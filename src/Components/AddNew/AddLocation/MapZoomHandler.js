import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

const MapZoomHandler = ({
  selectedPosition,
  center,
  setPointsVisible,
}) => {
  const map = useMap();

  useEffect(() => {
    if (selectedPosition) {
      map.flyTo(selectedPosition, 15, { animate: true, duration: 1 });
      console.log("hi from selectedPosition");
    } else {
      map.flyTo(center, 10, { animate: true, duration: 1 });
      console.log("hi from center");
    }
  }, [map, selectedPosition]);
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
