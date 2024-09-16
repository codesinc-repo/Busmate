// Marker.js
import { faLocation, faMapLocation } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Marker = ({ lat, lng }) => (
  <div
    style={{
      color: "#ff2222",
      backgroundColor: "white",
      borderRadius: "50%",
      width: "30px",
      height: "30px",
      padding: "4px",
      textAlign: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <FontAwesomeIcon icon={faLocation} size="2x" />
  </div>
);

export default Marker;
