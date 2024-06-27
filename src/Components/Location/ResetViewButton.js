import React from "react";
import { FullscreenExitOutlined } from "@ant-design/icons";

const ResetViewButton = ({ onClick }) => {
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
      
      <FullscreenExitOutlined />
    </button>
  );
};

export default ResetViewButton;
