import React, { useEffect, useRef } from "react";
import { Polyline, useMap } from "react-leaflet";
import L from "leaflet";

const AnimatedPolyline = React.memo(({ positions, ...options }) => {
  // const map = useMap();
  const polylineRef = useRef(null);
  // const animationIntervalRef = useRef(null);

  // useEffect(() => {
  //   if (polylineRef.current && positions.length > 0) {
  //     const polyline = polylineRef.current;
  //     const originalLatLngs = positions.map((pos) => L.latLng(pos[0], pos[1]));
  //     let currentLatLngIndex = 0;
  //   }
  // }, [positions]); // Only update animation when positions change

  return <Polyline ref={polylineRef} positions={positions} {...options} />;
});

export default AnimatedPolyline;
