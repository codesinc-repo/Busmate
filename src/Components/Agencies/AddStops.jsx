import React, { useState, useEffect, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import {
  addDoc,
  collection,
  getFirestore,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  getDoc,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore"; // Import the Firestore database
import GoogleMapReact from "google-map-react";
import {
  faDeleteLeft,
  faEdit,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Modal, Button, Form } from "react-bootstrap";
import Loader from "../Loader";
import moment from "moment-timezone";
import Select from "react-select";
import SearchRoutes from "../SearchRoutes";

export const AddStops = () => {
  const db = getFirestore();
  const auth = getAuth();
  const [show, setShow] = useState(false);
  const [marker, setMarker] = useState(null);
  const [stopsInfo, setStopsInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [editingStopId, setEditingStopId] = useState(null);
  const [timezones, setTimezones] = useState([]);
  const [selectedTimezone, setSelectedTimezone] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [selectedRoutes, setSelectedRoutes] = useState([]);
  const [formData, setFormData] = useState({
    RouteName: "",
    stopName: "",
    lat: "",
    long: "",
    stopCode: "",
    type: "",
    desc: "",
    stopUrl: "",
    fareZone: "",
    parentStation: "",
    timeZone: "",
    boarding: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStops, setFilteredStops] = useState([]);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const firstMatchRef = useRef(null);
  const [center, setCenter] = useState({ lat: 6.5244, lng: 3.3792 });
  const [zoom, setZoom] = useState(15);
  const [suggestions, setSuggestions] = useState([]);
  const [map, setMap] = useState(null);
  const [showOptionalFields, setShowOptionalFields] = useState(false);

  const mapRef = useRef(null);
  const mapsApi = window.google.maps;

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    } else {
      console.error("Geolocation is not available");
    }
  }, []);

  const searchLocation = (term) => {
    if (mapsApi && map && term) {
      const service = new mapsApi.places.PlacesService(map);
      const request = {
        query: term,
        fields: ["name", "geometry"],
      };
      service.findPlaceFromQuery(request, (results, status) => {
        if (status === mapsApi.places.PlacesServiceStatus.OK && results) {
          const place = results[0];
          const { lat, lng } = place.geometry.location;
          setSuggestions([{ lat: lat(), lng: lng() }]);
          map.setCenter({ lat: lat(), lng: lng() });
          map.setZoom(15);
        }
      });
    }
  };

  const fetchSuggestions = (term) => {
    if (mapsApi && term) {
      const service = new mapsApi.places.AutocompleteService();
      service.getPlacePredictions({ input: term }, (predictions, status) => {
        if (status === mapsApi.places.PlacesServiceStatus.OK && predictions) {
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
    const service = new mapsApi.places.PlacesService(map);
    const request = {
      placeId: suggestion.place_id,
      fields: ["name", "geometry"],
    };
    service.getDetails(request, (place, status) => {
      if (status === mapsApi.places.PlacesServiceStatus.OK) {
        const { lat, lng } = place.geometry.location;
        setSearchTerm(suggestion.description);
        setSuggestions([]);
        setFormData({ ...formData, lat: lat(), long: lng() });
        map.setCenter({ lat: lat(), lng: lng() });
        map.setZoom(15);
      }
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setEditingStopId(null);
    setFormData({
      RouteName: "",
      stopName: "",
      lat: "",
      long: "",
      stopCode: "",
      type: "",
      desc: "",
      stopUrl: "",
      fareZone: "",
      parentStation: "",
      timeZone: "",
      boarding: "",
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        fetchStops(user.uid);
      } else {
        setCurrentUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);

  const fetchStops = async (userId) => {
    try {
      setLoading(true);
      const docRef = collection(db, "Agencies_stops_data");
      const q = query(docRef, where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      const stopsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStopsInfo(stopsData);
      setFilteredStops(stopsData);
    } catch (error) {
      toast.error("Error fetching stops: " + error.message);
      console.log("Error fetching stops: ", error.code, error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const results = stopsInfo.filter((stop) =>
      stop.stopName.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredStops(results);
    setCurrentPage(1);
  }, [searchTerm, stopsInfo]);

  useEffect(() => {
    if (filteredStops.length > 0 && searchTerm) {
      firstMatchRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [filteredStops, searchTerm]);

  useEffect(() => {
    if (currentUser) {
      const tzOptions = moment.tz.names().map((tz) => ({
        value: tz,
        label: tz,
      }));
      setTimezones(tzOptions);
    }
  }, [currentUser]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEntriesChange = (e) => {
    setEntriesPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleToggleOptionalFields = () => {
    setShowOptionalFields(!showOptionalFields);
  };

  const paginatedStops = filteredStops.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage,
  );

  const totalPages = Math.ceil(filteredStops.length / entriesPerPage);

  if (loading) {
    return <Loader />;
  }

  const handleChange = (selectedOption) => {
    setSelectedTimezone(selectedOption);
    setFormData({ ...formData, timeZone: selectedOption.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newStopData = { ...formData, userId: currentUser.uid };
    try {
      if (editingStopId) {
        const stopDoc = doc(db, "Agencies_stops_data", editingStopId);
        await updateDoc(stopDoc, newStopData);
        toast.success("Stop updated successfully");
        setEditingStopId(null);
      } else {
        await addDoc(collection(db, "Agencies_stops_data"), newStopData);
        toast.success("Stop added successfully");
      }
      setFormData({
        RouteName: "",
        stopName: "",
        lat: "",
        long: "",
        stopCode: "",
        type: "",
        desc: "",
        stopUrl: "",
        fareZone: "",
        parentStation: "",
        timeZone: "",
        boarding: "",
      });
      setShow(false);
      fetchStops(currentUser.uid);
    } catch (error) {
      console.error("Error saving stop:", error);
      toast.error("Error saving stop:", error);
    }
  };

  const handleRouteSelect = (selectedRouteId) => {
    setFormData((prevData) => ({ ...prevData, RouteName: selectedRouteId }));
  };

  const handleEdit = (stop) => {
    setFormData({
      RouteName: stop.RouteName || "",
      stopName: stop.stopName || "",
      lat: stop.lat || "",
      long: stop.long || "",
      stopCode: stop.stopCode || "",
      type: stop.type || "",
      desc: stop.desc || "",
      stopUrl: stop.stopUrl || "",
      fareZone: stop.fareZone || "",
      parentStation: stop.parentStation || "",
      timeZone: stop.timeZone || "",
      boarding: stop.boarding || "",
    });
    setEditingStopId(stop.id);
    handleShow();
  };

  const handleDelete = async (id) => {
    if (!currentUser) {
      toast.error("Please login to delete stops.");
      return;
    }

    if (window.confirm("Are you sure you want to delete this stop?")) {
      try {
        setLoading(true);
        await deleteDoc(doc(db, "Agencies_stops_data", id));
        setStopsInfo((prevStops) => prevStops.filter((stop) => stop.id !== id));
        setFilteredStops((prevStops) =>
          prevStops.filter((stop) => stop.id !== id),
        );
        setTimeout(() => {
          toast.success("Stop deleted successfully");
        }, 1000);
      } catch (error) {
        toast.error("Error deleting stop: " + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleMapClick = ({ lat, lng }) => {
    setFormData((prevData) => ({ ...prevData, lat: lat, long: lng }));
    setMarker({ lat, lng });
  };

  const handleMarkerDragEnd = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setFormData((prevData) => ({ ...prevData, lat: lat, long: lng }));
    setMarker({ lat, lng });
  };

  return (
    <div className="container mt-4">
      <ToastContainer position="top-center" />
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Stops</h2>
        <Button variant="primary" onClick={handleShow}>
          Add Stop
        </Button>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <form onSubmit={handleSearchSubmit}>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search stops"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <div className="input-group-append">
                <button className="btn btn-primary" type="submit">
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="col-md-6 text-right">
          <label className="mr-2">Entries per page:</label>
          <select
            value={entriesPerPage}
            onChange={handleEntriesChange}
            className="form-control d-inline-block w-auto"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="thead-light">
            <tr>
              <th>RouteName</th>
              <th>Stop Name</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Stop Code</th>
              <th>Type</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedStops.map((stop, index) => (
              <tr key={stop.id} ref={index === 0 ? firstMatchRef : null}>
                <td>{stop.RouteName}</td>
                <td>{stop.stopName}</td>
                <td>{stop.lat}</td>
                <td>{stop.long}</td>
                <td>{stop.stopCode}</td>
                <td>{stop.type}</td>
                <td>{stop.desc}</td>
                <td className="d-flex gap-1">
                  <button
                    className="btn btn-sm btn-primary mr-2"
                    onClick={() => handleEdit(stop)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(stop.id)}
                  >
                    <FontAwesomeIcon icon={faDeleteLeft} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-between align-items-center">
        <div>
          Showing {paginatedStops.length} of {filteredStops.length} entries
        </div>
        <nav>
          <ul className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <li
                key={index}
                className={`page-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editingStopId ? "Edit Stop" : "Add Stop"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="RouteName">
              <Form.Label>Route Name</Form.Label>
              <SearchRoutes
                userId={currentUser?.uid}
                onSelectRoute={(route) => handleRouteSelect(route.id)}
                width={"100"}
              />
            </Form.Group>
            <Form.Group controlId="stopName">
              <Form.Label>Stop Name</Form.Label>
              <Form.Control
                type="text"
                name="stopName"
                value={formData.stopName}
                onChange={handleInputChange}
                className="mb-2"
                required
              />
            </Form.Group>
            <Form.Group controlId="searchTerm">
              <Form.Label>Search Location</Form.Label>
              <Form.Control
                type="text"
                name="searchTerm"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  fetchSuggestions(e.target.value);
                }}
                className="mb-2"
                required
              />
              <div className="suggestions">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion.description}
                  </div>
                ))}
              </div>
            </Form.Group>
            <Form.Group controlId="lat">
              <Form.Label>Latitude</Form.Label>
              <Form.Control
                type="text"
                name="lat"
                value={formData.lat}
                onChange={handleInputChange}
                required
                className="mb-2"
              />
            </Form.Group>
            <Form.Group controlId="long">
              <Form.Label>Longitude</Form.Label>
              <Form.Control
                type="text"
                name="long"
                value={formData.long}
                onChange={handleInputChange}
                required
                className="mb-2"
              />
            </Form.Group>
            <div style={{ height: "300px", width: "100%" }}>
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
                }}
                defaultCenter={center}
                defaultZoom={zoom}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => setMap(map)}
                onClick={handleMapClick}
                // options={{
                //   draggableCursor: 'crosshair',
                // }}
              >
                {marker && (
                  <div
                    lat={marker.lat}
                    lng={marker.lng}
                    draggable={true}
                    onDragEnd={handleMarkerDragEnd}
                    style={{
                      color: "red",
                      backgroundColor: "white",
                      padding: "10px",
                      display: "inline-flex",
                      textAlign: "center",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "100%",
                      transform: "translate(-50%, -50%)",
                      cursor: "crosshair", // Add a crosshair cursor
                    }}
                  >
                    <FontAwesomeIcon icon={faMapMarkerAlt} size="2x" />
                  </div>
                )}
              </GoogleMapReact>
            </div>

            <Button onClick={handleToggleOptionalFields} className="my-2">
              {showOptionalFields
                ? "Hide Optional Fields"
                : "Show Optional Fields"}
            </Button>
            {showOptionalFields && (
              <>
                <Form.Group controlId="stopCode">
                  <Form.Label>Stop Code</Form.Label>
                  <Form.Control
                    type="text"
                    name="stopCode"
                    value={formData.stopCode}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="type">
                  <Form.Label>Type</Form.Label>
                  <Form.Control
                    type="text"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="desc">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    name="desc"
                    value={formData.desc}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="stopUrl">
                  <Form.Label>Stop URL</Form.Label>
                  <Form.Control
                    type="text"
                    name="stopUrl"
                    value={formData.stopUrl}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="fareZone">
                  <Form.Label>Fare Zone</Form.Label>
                  <Form.Control
                    type="text"
                    name="fareZone"
                    value={formData.fareZone}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="parentStation">
                  <Form.Label>Parent Station</Form.Label>
                  <Form.Control
                    type="text"
                    name="parentStation"
                    value={formData.parentStation}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="boarding">
                  <Form.Label>Boarding</Form.Label>
                  <Form.Control
                    type="text"
                    name="boarding"
                    value={formData.boarding}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </>
            )}
            <Form.Group controlId="timeZone">
              <Form.Label>Timezone</Form.Label>
              <Select
                value={selectedTimezone}
                onChange={handleChange}
                options={timezones}
                name="timeZone"
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                {editingStopId ? "Update Stop" : "Add Stop"}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddStops;
