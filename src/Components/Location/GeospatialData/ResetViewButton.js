import React, { useEffect } from "react";
import { FullscreenExitOutlined, FullscreenOutlined } from "@ant-design/icons";
import L from "leaflet";

const ResetViewButton = ({ onClick, selectedLocation }) => {
  const buttonStyle = {
    backgroundColor: "white",
    border: "none",
    padding: "10px",
    cursor: "pointer",
    fontSize: "14px",
    borderRadius: "5px",
    padding: "5px 8px",
    border: "2px solid rgba(0, 0, 0, 0.3)",
  };

  const hoverStyle = {
    backgroundColor: "#f0f0f0",
  };

  useEffect(() => {
    const button = document.querySelector(".reset-view-button button");
    if (button) {
      L.DomEvent.disableClickPropagation(button);
    }
  }, []);

  return (
    <button
      style={buttonStyle}
      onClick={onClick}
      onMouseEnter={(e) =>
        (e.target.style.backgroundColor = hoverStyle.backgroundColor)
      }
      onMouseLeave={(e) =>
        (e.target.style.backgroundColor = buttonStyle.backgroundColor)
      }
    >
      {selectedLocation ? <FullscreenOutlined /> : <FullscreenExitOutlined />}
    </button>
  );
};

export default ResetViewButton;
