import React, { useState, useEffect, useCallback } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  writeBatch,
  doc,
} from "firebase/firestore";
import FileSaver from "file-saver";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Card,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import "./MapingRoutes.css";
import { toast, ToastContainer } from "react-toastify";
import {
  Map,
  GoogleApiWrapper,
  Marker,
  InfoWindow,
  Polyline,
} from "google-maps-react";
function MapingRoutes({ google }) {
  const [path, setPath] = useState([]);
  const [distance, setDistance] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mapType, setMapType] = useState("roadmap");
  const [travelMode, setTravelMode] = useState("WALKING");
  const [searchTerm, setSearchTerm] = useState("");
  const [routes, setRoutes] = useState([]);
  const [map, setMap] = useState(null);
  const [mapsApi, setMapsApi] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoop, setIsLoop] = useState(false);
  const [center, setCenter] = useState({ lat: 6.5244, lng: 3.3792 });
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [directionsRenderers, setDirectionsRenderers] = useState([]);
  const [directions, setDirections] = useState(null);
  const [totalDistance, setTotalDistance] = useState(0);
  const [polylines, setPolylines] = useState([]);
  const [savingRoute, setSavingRoute] = useState(false);
  const [userLocation, setUserLocation] = useState(null); // To store user location marker

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCenter({
          lat: latitude,
          lng: longitude,
        });
        setUserLocation({
          lat: latitude,
          lng: longitude,
        });
      });
    } else {
      console.error("Geolocation is not available");
    }
  }, []);

  const searchLocation = (term) => {
    if (google && map && term) {
      const service = new google.maps.places.PlacesService(map);
      const request = {
        query: term,
        fields: ["name", "geometry"],
      };
      service.findPlaceFromQuery(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          const place = results[0];
          const { lat, lng } = place.geometry.location;
          setSuggestions([{ lat: lat(), lng: lng() }]);
          setSelectedLocation({ lat: lat(), lng: lng() });
          setMarkers([{ lat: lat(), lng: lng() }]); // Set markers for the selected place
          map.panTo({ lat: lat(), lng: lng() });
          map.setZoom(10);
        }
      });
    }
  };

  const fetchSuggestions = (term) => {
    if (google && term) {
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

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    searchLocation(searchTerm);
  };

  const handleSuggestionClick = (suggestion) => {
    const service = new google.maps.places.PlacesService(map);
    const request = {
      placeId: suggestion.place_id,
      fields: ["name", "geometry"],
    };
    service.getDetails(request, (place, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        const { lat, lng } = place.geometry.location;
        setSearchTerm(suggestion.description);
        setSuggestions([]);
        setMarkers([{ lat: lat(), lng: lng() }]); // Set markers for the selected place
        setSelectedLocation({ lat: lat(), lng: lng() });
        map.panTo({ lat: lat(), lng: lng() });
        map.setZoom(10);
      } else {
        console.error("Failed to fetch place details:", status);
      }
    });
  };

  const handleMapReady = (mapProps, map) => {
    setMap(map);
  };

  const db = getFirestore();

  useEffect(() => {
    updateMapType(mapType);
  }, [mapType]);

  const updateMapType = (type) => {
    if (map) {
      map.setMapTypeId(type);
    }
  };

  const handleMapTypeChange = (e) => {
    setMapType(e.target.value);
    if (map) {
      map.setMapTypeId(e.target.value);
    }
  };

  const handleMapClick = (mapProps, map, clickEvent) => {
    const newMarker = {
      lat: clickEvent.latLng.lat(),
      lng: clickEvent.latLng.lng(),
    };

    // Update the path state with the new marker
    setPath((prevPath) => {
      const updatedPath = [...prevPath, newMarker];
      return updatedPath;
    });

    setMarkers((prevMarkers) => {
      const updatedMarkers = [...prevMarkers, newMarker];
      return updatedMarkers;
    });

    if (markers.length > 0) {
      const directionsService = new google.maps.DirectionsService();
      const waypoints = markers.map((marker) => ({
        location: { lat: marker.lat, lng: marker.lng },
        stopover: true,
      }));

      const origin = { lat: markers[0].lat, lng: markers[0].lng };
      const destination = { lat: newMarker.lat, lng: newMarker.lng };

      directionsService.route(
        {
          origin,
          destination,
          waypoints,
          travelMode: google.maps.TravelMode[travelMode],
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            setDirections(result);

            let totalDistance = 0;
            result.routes[0].legs.forEach((leg) => {
              totalDistance += leg.distance.value; // Distance in meters
            });
            setTotalDistance(totalDistance / 1000); // Convert to kilometers

            const polyline = new google.maps.Polyline({
              path: result.routes[0].overview_path,
              strokeColor: "#0000FF",
              strokeOpacity: 0.8,
              strokeWeight: 2,
              map: map,
            });

            setPolylines((prevPolylines) => [...prevPolylines, polyline]);
          } else {
            console.error(`Error fetching directions ${result}`);
          }
        },
      );
    }
  };

  useEffect(() => {
    updateMapType(mapType);
  }, [mapType]);

  useEffect(() => {
    if (directionsRenderer) {
      directionsRenderer.setOptions({
        travelMode: google.maps.TravelMode[travelMode],
      });
    }
  }, [travelMode, directionsRenderer]);

  const calculateDistance = (path) => {
    let totalDistance = 0;
    for (let i = 1; i < path.length; i++) {
      const point1 = path[i - 1];
      const point2 = path[i];
      const distance = haversineDistance(point1, point2);
      if (!isNaN(distance)) {
        totalDistance += distance;
      }
    }
    return totalDistance;
  };

  const haversineDistance = (point1, point2) => {
    const R = 6371e3; // meters
    const φ1 = (point1.lat * Math.PI) / 180;
    const φ2 = (point2.lat * Math.PI) / 180;
    const Δφ = ((point2.lat - point1.lat) * Math.PI) / 180;
    const Δλ = ((point2.lng - point1.lng) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;
    return distance / 1000; // in kilometers
  };

  const saveRoute = async () => {
    try {
      setSavingRoute(true);
      if (path.length < 2) {
        toast.error("Not enough route data to save");
        console.error("Not enough route data to save");
        return;
      }

      // Add the route to the 'routes' collection with auto-generated ID
      const routeRef = await addDoc(collection(db, "routes"), {
        path,
        title,
        description,
      });
      const routeId = routeRef.id;

      let totalDistance = 0;
      const routeData = path.map((point, index) => {
        if (index > 0) {
          totalDistance += haversineDistance(path[index - 1], point);
        }
        return {
          shape_id: routeId, // using routeId as the shape_id for linking
          shape_pt_lat: point.lat.toString(), // latitude as string
          shape_pt_lon: point.lng.toString(), // longitude as string
          shape_pt_sequence: (index + 1).toString(), // sequence as string
          shape_dist_traveled: totalDistance.toFixed(4), // distance traveled as string
        };
      });

      // Save the data to the 'hapes' collection using a batch
      const batch = writeBatch(db);
      routeData.forEach((point, index) => {
        if (index > 0) {
          totalDistance += haversineDistance(path[index - 1], path[index]);
        }
        const shapeRef = doc(collection(db, "shapes"));
        batch.set(shapeRef, {
          shape_id: routeId, // using routeId as the shape_id for linking
          shape_pt_lat: path[index].lat.toString(), // latitude as string
          shape_pt_lon: path[index].lng.toString(), // longitude as string
          shape_pt_sequence: (index + 1).toString(), // sequence as string
          shape_dist_traveled: totalDistance.toFixed(4), // distance traveled as string
        });
      });

      // Save the data to the 'hapes2' collection using a batch with auto-generated IDs
      const batch2 = writeBatch(db);
      routeData.forEach((point) => {
        const shape2Ref = doc(collection(db, "shapes2"));
        batch2.set(shape2Ref, point);
      });
      await batch2.commit();

      toast.success("Route data saved successfully");

      let shapesTxt =
        "shape_id,shape_pt_lat,shape_pt_lon,shape_pt_sequence,shape_dist_traveled\n";
      routeData.forEach((point) => {
        shapesTxt += `${point.shape_id},${point.shape_pt_lat},${point.shape_pt_lon},${point.shape_pt_sequence},${point.shape_dist_traveled}\n`;
      });

      // Save shapes.txt as a Blob
      const shapesBlob = new Blob([shapesTxt], {
        type: "text/plain;charset=utf-8",
      });
      FileSaver.saveAs(shapesBlob, `shapes.txt`);

      console.log("Route data:", routeData);

      // Update the routes state
      setRoutes([...routes, routeData]);
    } catch (error) {
      console.error("Error saving route:", error);
    } finally {
      handleRemoveAll();
      setSavingRoute(false);
    }
  };

  const exportToGPX = () => {
    const gpxData = `
      <gpx version="1.1" creator="Your App">
        <trk><name>${title}</name><desc>${description}</desc><trkseg>
          ${path
            .map(
              (point) =>
                `<trkpt lat="${point.lat}" lon="${point.lng}"></trkpt>`,
            )
            .join("")}
        </trkseg></trk>
      </gpx>
    `;
    const blob = new Blob([gpxData], { type: "application/gpx+xml" });
    FileSaver.saveAs(blob, "route.gpx");
  };

  const exportToKML = () => {
    const kmlData = `
      <kml xmlns="http://www.opengis.net/kml/2.2">
        <Document><name>${title}</name><description>${description}</description>
          <Placemark><LineString><coordinates>
            ${path.map((point) => `${point.lng},${point.lat},0`).join(" ")}
          </coordinates></LineString></Placemark>
        </Document>
      </kml>
    `;
    const blob = new Blob([kmlData], {
      type: "application/vnd.google-earth.kml+xml",
    });
    FileSaver.saveAs(blob, "route.kml");
  };

  const handleApiLoaded = (map, maps) => {
    setMap(map);
    setMapsApi(maps);
    updateMapType(mapType);
  };

  const handleDisplayRoute = (route) => {
    if (Array.isArray(route)) {
      const routePath = route.map((point) => ({
        lat: parseFloat(point.shape_pt_lat),
        lng: parseFloat(point.shape_pt_lon),
      }));

      // Concatenate new route with previous routes
      const newRoutes = [...routes, routePath];
      setRoutes(newRoutes);

      // Calculate total distance
      let totalDistance = 0;
      newRoutes.forEach((route) => {
        totalDistance += calculateDistance(route);
      });
      setDistance(totalDistance);
    } else {
      console.error("Expected route to be an array but got:", route);
    }
  };

  const handleUndoLastLeg = () => {
    setPath((currentPath) => {
      const newPath = currentPath.slice(0, -1);
      calculateDistance(newPath);
      return newPath;
    });
  };

  const handleRemoveAll = () => {
    // Clear the path
    setPath([]);

    // Clear the markers
    setMarkers([]);

    // Clear directions renderers from the map
    setDirectionsRenderers((currentRenderers) => {
      currentRenderers.forEach((renderer) => renderer.setMap(null));
      return [];
    });

    // Clear polylines from the map
    setPolylines((currentPolylines) => {
      currentPolylines.forEach((polyline) => polyline.setMap(null));
      return [];
    });

    // Reset the distance
    setDistance(0);
    setTotalDistance(0);

    // Clear directions
    setDirections(null);
  };

  const handleTravelModeChange = (e) => {
    setTravelMode(e.target.value);
    if (directionsRenderer) {
      directionsRenderer.setOptions({
        travelMode: google.maps.TravelMode[e.target.value],
      });
    }
  };
  return (
    <>
      {/* <ToastContainer /> */}
      <Container>
        <Row className="my-4">
          <Col className="col-lg-8 mx-auto">
            <Card className="custom-card">
              <Card.Body>
                <Form>
                  <Form.Group
                    controlId="routeTitle"
                    className="custom-form-group"
                  >
                    <Form.Label className="d-block">Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter title"
                      className="w-100"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group
                    controlId="routeDescription"
                    className="custom-form-group"
                  >
                    <Form.Label className="d-block">Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Enter description"
                      className="w-100"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="mapType" className="custom-form-group">
                    <Form.Label>Map Type</Form.Label>
                    <Form.Control
                      as="select"
                      value={mapType}
                      onChange={handleMapTypeChange}
                    >
                      <option value="roadmap">Map</option>
                      <option value="satellite">Satellite</option>
                      <option value="terrain">Terrain</option>
                      <option value="hybrid">Hybrid</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group
                    controlId="travelMode"
                    className="custom-form-group"
                  >
                    <Form.Label>Travel Mode</Form.Label>
                    <Form.Control
                      as="select"
                      value={travelMode}
                      onChange={handleTravelModeChange}
                    >
                      <option value="WALKING">Walking</option>
                      <option value="DRIVING">Driving</option>
                      <option value="BICYCLING">Bicycling</option>
                      <option value="TRANSIT">Transit</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group
                    controlId="loopRoute"
                    className="custom-form-group"
                    style={{ width: "200px" }}
                  >
                    <Form.Check
                      style={{ width: "10px", marginLeft: "44px" }}
                      label="Loop Route"
                      type="checkbox"
                      checked={isLoop}
                      onChange={(e) => setIsLoop(e.target.checked)}
                    />
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="my-4">
          <Col className="col-lg-8 mx-auto">
            <Form onSubmit={handleSearchSubmit}>
              <Form.Group as={Row} controlId="searchTerm">
                <Col sm={8} style={{ width: "100%" }}>
                  <InputGroup>
                    <FormControl
                      type="text"
                      placeholder="Search for a location"
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        fetchSuggestions(e.target.value);
                      }}
                    />
                    <Button type="submit">Search</Button>
                  </InputGroup>
                </Col>
              </Form.Group>
            </Form>
            {suggestions.length > 0 && (
              <div className="suggestions-container">
                {suggestions.map((suggestion) => (
                  <div
                    key={suggestion.place_id}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="suggestion-item"
                  >
                    {suggestion.description}
                  </div>
                ))}
              </div>
            )}
          </Col>
        </Row>
        <Row>
          <Col style={{ height: "400px" }}>
            <Map
              google={google}
              zoom={15}
              center={center}
              onClick={handleMapClick}
              style={{ height: "400px", width: "100%" }}
              onReady={(mapProps, map) => {
                setMap(map);
              }}
            >
              {markers.map((marker, index) => (
                <Marker
                  key={index}
                  position={{ lat: marker.lat, lng: marker.lng }}
                />
              ))}
              {userLocation && (
                <Marker
                  position={{ lat: userLocation.lat, lng: userLocation.lng }}
                  icon={{
                    url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png", // Custom icon for user location
                  }}
                />
              )}
              {directions && (
                <Polyline
                  path={directions.routes[0].overview_path}
                  strokeColor="#0000FF"
                  strokeOpacity={0.8}
                  strokeWeight={2}
                />
              )}
              {polylines.map((polyline, index) => (
                <Polyline key={index} path={polyline.getPath()} />
              ))}
            </Map>
          </Col>
        </Row>
        <Row className="my-4">
          <Col className="d-flex justify-content-between">
            <Button variant="primary" onClick={saveRoute}>
              {savingRoute ? "saving..." : "Save Route"}
            </Button>
            <Button variant="secondary" onClick={exportToGPX}>
              Export to GPX
            </Button>
            <Button variant="secondary" onClick={exportToKML}>
              Export to KML
            </Button>
            <Button variant="warning" onClick={handleUndoLastLeg}>
              Undo Last Leg
            </Button>
            <Button variant="danger" onClick={handleRemoveAll}>
              Remove All
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Card.Text>
                  <strong>Total Distance:</strong> {totalDistance.toFixed(2)} km
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyCt6m1rrV32jEStp8x-cgBL0WwL9zXKOG4",
})(MapingRoutes);
