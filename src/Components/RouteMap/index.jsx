import React, { useState, useEffect } from "react";
import "./map.css";
import {
  WhatsappShareButton,
  FacebookShareButton,
  InstapaperShareButton,
} from "react-share";

const RouteMap = () => {
  const [map, setMap] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [totalDistance, setTotalDistance] = useState(0);
  const [viewOption, setViewOption] = useState("Map");
  const [markedPoints, setMarkedPoints] = useState([]);

  useEffect(() => {
    // Load Google Maps API script
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA6SzmrYZ9l1sxEev_InIxKI9aCwjlRAq0&libraries=geometry,drawing`;
    script.onload = () => initMap();
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const initMap = () => {
    const google = window.google;
    const mapOptions = {
      center: { lat: -25.344, lng: 131.036 }, // Center of Australia
      zoom: 4,
      mapTypeId: viewOption === "Satellite" ? "satellite" : "roadmap",
    };
    const newMap = new google.maps.Map(
      document.getElementById("map"),
      mapOptions,
    );
    setMap(newMap);

    // Add drawing manager for routes
    const drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.POLYLINE,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [google.maps.drawing.OverlayType.POLYLINE],
      },
      polylineOptions: {
        clickable: true,
        editable: true,
        strokeColor: "#FF0000",
      },
    });
    drawingManager.setMap(newMap);

    // Add event listeners for drawing manager
    google.maps.event.addListener(
      drawingManager,
      "overlaycomplete",
      (event) => {
        if (event.type === google.maps.drawing.OverlayType.POLYLINE) {
          const newRoute = event.overlay.getPath().getArray();
          setRoutes([...routes, newRoute]);
          const distance = calculateDistance(newRoute);
          setTotalDistance(totalDistance + distance);
        }
      },
    );

    // Add event listener for click on map to mark points
    google.maps.event.addListener(newMap, "click", (event) => {
      const clickedLatLng = event.latLng;
      setMarkedPoints([...markedPoints, clickedLatLng]);
    });
  };

  const saveRoute = () => {
    // Assuming routes are an array of arrays of LatLng objects
    localStorage.setItem("savedRoutes", JSON.stringify(routes));
    alert("Route saved successfully!");
  };

  const calculateDistance = (path) => {
    const google = window.google;
    let distance = 0;
    for (let i = 0; i < path.length - 1; i++) {
      distance += google.maps.geometry.spherical.computeDistanceBetween(
        path[i],
        path[i + 1],
      );
    }
    return distance / 1000; // Convert to kilometers
  };

  const changeViewOption = (option) => {
    setViewOption(option);
    if (map) {
      map.setMapTypeId(option === "Satellite" ? "satellite" : "roadmap");
    }
  };

  return (
    <div className="map-container container">
      <div
        className="row mb-5 justify-content-center aos-init aos-animate"
        data-aos="fade-right"
      >
        <div className="col-lg-6 text-center">
          <h2
            className="section-title text-center mb-3 aos-init aos-animate"
            data-aos="fade-up"
          >
            Route Planner
          </h2>
        </div>
      </div>
      <div className="row flex-wrap d-flex justify-content-around align-items-center ">
        <div className="col-md-6 my-4 text-center">
          <h3>View Options:</h3>
          <button
            onClick={() => changeViewOption("Map")}
            className="btn btn-outline-dark"
          >
            Map
          </button>
          <button
            onClick={() => changeViewOption("Hybrid")}
            className="btn btn-outline-info"
          >
            Hybrid
          </button>
          <button
            onClick={() => changeViewOption("Satellite")}
            className="btn btn-outline-danger"
          >
            Satellite
          </button>
          <button
            onClick={() => changeViewOption("Terrain")}
            className="btn btn-outline-success"
          >
            Terrain
          </button>
        </div>
      </div>
      <div id="map" style={{ height: "400px", width: "100%" }} />
      <div className="col-md-12 my-4">
        <h3>Total Distance:</h3>
        <input type="text" disabled value={`${totalDistance.toFixed(2)} km`} />

        <button
          onClick={saveRoute}
          className="btn btn-outline-primary"
          style={{ marginTop: "5px" }}
        >
          Save Route
        </button>
        <div style={{ marginTop: "20px" }}>
          <h3>Share Your Route:</h3>
          <ul>
            {markedPoints.map((point, index) => (
              <li key={index}>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${point.lat()},${point.lng()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Marked Point {index + 1}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div style={{ marginTop: "9px" }}>
          <WhatsappShareButton
            url={window.location.href}
            title="Check out this route"
          >
            <button className="btn btn-outline-success">
              Share via WhatsApp
            </button>
          </WhatsappShareButton>
          <FacebookShareButton
            url={window.location.href}
            quote="Check out this route"
          >
            <button className="btn btn-outline-primary">
              Share via Facebook
            </button>
          </FacebookShareButton>
          <InstapaperShareButton
            url={window.location.href}
            title="Check out this route"
          >
            <button className="btn btn-outline-secondary">
              Share via Instagram
            </button>
          </InstapaperShareButton>
        </div>
      </div>
    </div>
  );
};

export default RouteMap;
