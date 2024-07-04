import React, { useEffect, useRef } from "react";
import { Polyline, useMap } from "react-leaflet";
import L from "leaflet";

const AnimatedPolyline = ({ positions, ...options }) => {
  const map = useMap();
  const polylineRef = useRef(null);
  const animationIntervalRef = useRef(null);

  useEffect(() => {
    if (polylineRef.current && positions.length > 0) {
      const polyline = polylineRef.current;
      const originalLatLngs = positions.map((pos) => L.latLng(pos[0], pos[1]));
      let currentLatLngIndex = 0;
      const interval = 100; // Interval for animation in ms

      const animateLine = () => {
        if (currentLatLngIndex < originalLatLngs.length) {
          polyline.addLatLng(originalLatLngs[currentLatLngIndex]);
          currentLatLngIndex++;
        } else {
          clearInterval(animationIntervalRef.current);
        }
      };

      animationIntervalRef.current = setInterval(animateLine, interval);

      return () => {
        clearInterval(animationIntervalRef.current);
      };
    }
  }, [positions]);

  return <Polyline ref={polylineRef} positions={[]} {...options} />;
};

export default AnimatedPolyline;
