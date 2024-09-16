import React, { useState, useRef, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { db } from "../../FirebaseConfig";

const AddStopModal = ({ show, handleClose, google }) => {
  const [stopName, setStopName] = useState("");
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({
    lat: -25.2744,
    lng: 133.7751,
  });
  const [addMethod, setAddMethod] = useState("search");
  const [suggestions, setSuggestions] = useState([]);

  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (google && addMethod === "search" && show) {
      initAutocomplete();
    }
  }, [google, addMethod, show]);

  const onMapClicked = (mapProps, map, clickEvent) => {
    const { latLng } = clickEvent;
    const lat = latLng.lat();
    const lng = latLng.lng();
    setCoordinates({ lat, lng });
  };

  const onMarkerDragEnd = (coord) => {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();
    setCoordinates({ lat, lng });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !stopName ||
      (!address && addMethod === "search") ||
      !coordinates.lat ||
      (!coordinates.lng && addMethod === "manual")
    ) {
      alert("Please fill all the fields.");
      return;
    }

    try {
      await addDoc(collection(db, "stops"), {
        stopName,
        address,
        coordinates,
      });
      handleClose();
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const initAutocomplete = () => {
    const input = document.getElementById("autocomplete");
    const autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place.geometry || !place.geometry.location) {
        alert("No details available for input: " + place.name);
        return;
      }
      const newCoordinates = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      setAddress(place.formatted_address);
      setCoordinates(newCoordinates);
      mapRef.current.map.setCenter(newCoordinates);
      mapRef.current.map.setZoom(15);
    });
  };

  const searchLocation = (term) => {
    if (google.maps && mapRef.current.map && term) {
      const service = new google.maps.places.PlacesService(mapRef.current.map);
      const request = {
        query: term,
        fields: ["name", "geometry"],
      };
      service.findPlaceFromQuery(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          const place = results[0];
          const { lat, lng } = place.geometry.location;
          setSuggestions([{ lat: lat(), lng: lng() }]);
          const newCoordinates = { lat: lat(), lng: lng() };
          setCoordinates(newCoordinates);
          setAddress(place.name);
          mapRef.current.map.setCenter(newCoordinates);
          mapRef.current.map.setZoom(15);
        }
      });
    }
  };

  const fetchSuggestions = (term) => {
    if (google.maps && term) {
      const service = new google.maps.places.AutocompleteService();
      service.getPlacePredictions({ input: term }, (predictions, status) => {
        if (
          status === google.maps.places.PlacesServiceStatus.OK &&
          predictions
        ) {
          setSuggestions(predictions);
        } else {
          setSuggestions([]);
        }
      });
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Add New Stop</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formAddMethod">
            <Form.Label>Add Stop Method</Form.Label>
            <Form.Control
              as="select"
              value={addMethod}
              onChange={(e) => setAddMethod(e.target.value)}
            >
              <option value="search">Search Address</option>
              <option value="manual">Manually add Latitude/Longitude</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formStopName">
            <Form.Label>Stop Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Stop Name"
              value={stopName}
              onChange={(e) => setStopName(e.target.value)}
            />
          </Form.Group>

          {addMethod === "search" ? (
            <Form.Group controlId="formAddress">
              <Form.Label>Enter Stop Address</Form.Label>
              <Form.Control
                type="text"
                id="autocomplete"
                placeholder="Search Address"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  fetchSuggestions(e.target.value);
                }}
              />
              {suggestions.length > 0 && (
                <ul style={{ listStyleType: "none", padding: 0 }}>
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      style={{ cursor: "pointer", padding: "5px 0" }}
                      onClick={() => {
                        searchLocation(suggestion.description);
                        setAddress(suggestion.description);
                        setSuggestions([]);
                      }}
                    >
                      {suggestion.description}
                    </li>
                  ))}
                </ul>
              )}
            </Form.Group>
          ) : (
            <>
              <Form.Group controlId="formLatitude">
                <Form.Label>Latitude</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Latitude"
                  value={coordinates.lat}
                  onChange={(e) =>
                    setCoordinates({
                      ...coordinates,
                      lat: parseFloat(e.target.value),
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formLongitude">
                <Form.Label>Longitude</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Longitude"
                  value={coordinates.lng}
                  onChange={(e) =>
                    setCoordinates({
                      ...coordinates,
                      lng: parseFloat(e.target.value),
                    })
                  }
                />
              </Form.Group>
            </>
          )}

          <div style={{ height: "300px", width: "100%", marginTop: "20px" }}>
            <Map
              google={google}
              initialCenter={coordinates}
              center={coordinates}
              zoom={10}
              onClick={onMapClicked}
              ref={mapRef}
              containerStyle={{
                position: "relative",
                width: "100%",
                height: "100%",
              }}
            >
              <Marker
                position={coordinates}
                draggable
                onDragend={(t, map, coord) => onMarkerDragEnd(coord)}
                ref={markerRef}
              />
            </Map>
          </div>

          <Button variant="primary" type="submit" style={{ marginTop: "20px" }}>
            Save Stop
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default GoogleApiWrapper({
  apiKey: "YOUR_GOOGLE_MAPS_API_KEY",
  libraries: ["places"],
})(AddStopModal);
