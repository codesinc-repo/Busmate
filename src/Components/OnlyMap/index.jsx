import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import Marker from "../Marker";

const OnlyMap = () => {
  const [map, setMap] = useState(null);
  const [mapsApi, setMapsApi] = useState(null);
  const [path, setPath] = useState([]);

  const handleMapClick = ({ x, y, lat, lng, event }) => {
    // Handle map click event
    // You can update the path state with the clicked coordinates
    const newPath = [...path, { lat, lng }];
    setPath(newPath);
  };

  const renderPolylines = (map, maps) => {
    // Implement rendering polylines on the map using map and maps
  };

  const renderRoutesOnMap = (map, maps) => {
    // Implement rendering routes on the map using map and maps
  };

  return (
    <div style={{ height: "300px", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: "AIzaSyCt6m1rrV32jEStp8x-cgBL0WwL9zXKOG4",
          libraries: ["places", "directions"],
        }}
        defaultCenter={{ lat: -25.0, lng: 133.0 }} // Centered in the middle of Australia
        defaultZoom={5} // Adjust zoom level as needed
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => {
          setMap(map);
          setMapsApi(maps);
          renderPolylines(map, maps);
          renderRoutesOnMap(map, maps); // Call the function to render routes with SVG markers
        }}
        onClick={handleMapClick}
        options={{
          draggableCursor: "crosshair",
          draggingCursor: "move",
        }}
      >
        {path.map((point, index) => (
          <Marker key={index} lat={point.lat} lng={point.lng} />
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default OnlyMap;
