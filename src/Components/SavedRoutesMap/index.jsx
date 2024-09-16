import React, { useState, useRef, useCallback } from "react";
import {
  GoogleMap,
  Marker,
  Polyline,
  useLoadScript,
} from "@react-google-maps/api";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../FirebaseConfig";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { initializeApp } from "firebase/app";
import { toast } from "react-toastify";
import { Form, Button, Container, Row, Col, InputGroup } from "react-bootstrap";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

const containerStyle = { height: "600px", width: "100%" };

const apiKey = "AIzaSyBDDCT1y6vpC4jJ3_LGzRnMF6OclbkDEfU";

function SavedRoutesMap() {
  const [path, setPath] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mapType, setMapType] = useState("roadmap");
  const [totalDistance, setTotalDistance] = useState(0);
  const mapRef = useRef(null);
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300,
  });

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries: ["places"],
  });

  const onLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const handleMapClick = (event) => {
    const newPath = [
      ...path,
      { lat: event.latLng.lat(), lng: event.latLng.lng() },
    ];
    setPath(newPath);
    calculateTotalDistance(newPath);
  };

  const handleSaveRoute = async () => {
    if (title && description) {
      try {
        const docRef = await addDoc(collection(db, "routes"), {
          title,
          description,
          path,
        });
        console.log("Document written with ID: ", docRef.id);
        toast.success("Route saved successfully");
      } catch (error) {
        console.error("Error adding document: ", error);
        toast.error("Error saving route");
      }
    } else {
      alert("Please enter a title and description");
    }
  };

  const calculateTotalDistance = (path) => {
    let totalDistance = 0;
    for (let i = 1; i < path.length; i++) {
      totalDistance +=
        window.google.maps.geometry.spherical.computeDistanceBetween(
          new window.google.maps.LatLng(path[i - 1]),
          new window.google.maps.LatLng(path[i]),
        );
    }
    setTotalDistance((totalDistance / 1000).toFixed(2)); // Distance in km
  };

  const handleAddressSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      mapRef.current.panTo({ lat, lng });
      mapRef.current.setZoom(15);

      handleMapClick({ latLng: new window.google.maps.LatLng(lat, lng) });
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handleSearchClick = () => {
    if (value) {
      handleAddressSelect(value);
    }
  };

  const defaultCenter = { lat: -25.2744, lng: 133.7751 }; // Center of Australia

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <Container fluid>
      <Row className="mt-3">
        <Col>
          <div className="p-3 bg-light rounded shadow-sm">
            <h5 className="mb-4">Search Address</h5>
            <Combobox onSelect={handleAddressSelect}>
              <InputGroup>
                <ComboboxInput
                  className="form-control"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  disabled={!ready}
                  placeholder="Enter an address"
                />
                <InputGroup.Append>
                  <Button
                    variant="outline-secondary"
                    onClick={handleSearchClick}
                  >
                    Search
                  </Button>
                  <Button
                    variant="outline-secondary"
                    onClick={() => {
                      setValue("");
                      clearSuggestions();
                    }}
                  >
                    Clear
                  </Button>
                </InputGroup.Append>
              </InputGroup>
              <ComboboxPopover>
                {status === "OK" && (
                  <ComboboxList>
                    {data.map(({ place_id, description }) => (
                      <ComboboxOption key={place_id} value={description} />
                    ))}
                  </ComboboxList>
                )}
              </ComboboxPopover>
            </Combobox>
          </div>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col sm={12}>
          <div className="p-3 bg-light rounded shadow-sm">
            <h5 className="mb-4">Route Details</h5>
            <Form.Group>
              <Form.Label>Route Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Route Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Route Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Route Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Total Distance (km)</Form.Label>
              <Form.Control type="text" value={totalDistance} readOnly />
            </Form.Group>
            <Button variant="success" onClick={handleSaveRoute}>
              Save Route
            </Button>
          </div>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col sm={12}>
          <div className="p-3 bg-light rounded shadow-sm">
            <h5 className="mb-4">Map</h5>
            <div style={containerStyle}>
              <GoogleMap
                onClick={handleMapClick}
                onLoad={onLoad}
                mapContainerStyle={containerStyle}
                center={defaultCenter}
                zoom={6}
                mapTypeId={mapType}
                options={{ zoomControl: true, mapTypeControl: false }}
              >
                {path.map((pos, idx) => (
                  <Marker key={idx} position={pos} />
                ))}
                {path.length > 1 && (
                  <Polyline
                    path={path}
                    options={{
                      strokeColor: "#FF0000",
                      strokeOpacity: 1.0,
                      strokeWeight: 2,
                    }}
                  />
                )}
              </GoogleMap>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default SavedRoutesMap;
