import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import {
  Breadcrumb,
  Tab,
  Tabs,
  Accordion,
  useAccordionButton,
  Card,
  Button,
  Modal,
} from "react-bootstrap";
import {
  addDoc,
  collection,
  getFirestore,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  query,
  where,
  getDoc,
} from "firebase/firestore"; // Import the Firestore database
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Loader from "../../../Components/Loader";

export const AddTrip = () => {
  const [show, setShow] = useState(false);
  const [showAddRouteMap, setShowAddRouteMap] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState("");
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState([]);
  const [stops, setStops] = useState([]);
  const [routeMaps, setRouteMaps] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    service: "",
    tripHeadsign: "",
    shortName: "",
    direction: "",
    block: "",
    bikesAllowed: "",
    wheelchair: "",
    addStop: "",
    routeMap: "",
  });
  const [newRouteMapData, setNewRouteMapData] = useState({
    routeName: "",
  });

  const db = getFirestore();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        fetchData(user.uid);
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const fetchData = async (userId) => {
    setLoading(true);
    try {
      const servicesSnapshot = await getDocs(
        query(
          collection(db, "Agencies_services_data"),
          where("userId", "==", userId),
        ),
      );
      const stopsSnapshot = await getDocs(
        query(
          collection(db, "Agencies_stops_data"),
          where("userId", "==", userId),
        ),
      );
      const routeMapsSnapshot = await getDocs(
        query(
          collection(db, "agencies_routes_data"),
          where("userId", "==", userId),
        ),
      );

      setServices(
        servicesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
      );
      setStops(
        stopsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
      );
      setRouteMaps(
        routeMapsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
      );
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setShow(false);
    setFormData({
      service: "",
      tripHeadsign: "",
      shortName: "",
      direction: "",
      block: "",
      bikesAllowed: "",
      wheelchair: "",
      addStop: "",
      routeMap: "",
    });
  };
  const handleShow = () => setShow(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNewRouteMapInputChange = (e) => {
    const { name, value } = e.target;
    setNewRouteMapData({
      ...newRouteMapData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      toast.error("Please log in to add/update trips.");
      return;
    }
    setLoading(true);
    try {
      // Fetch the service name based on the selected service ID
      const serviceDoc = await getDoc(
        doc(db, "Agencies_services_data", formData.service),
      );
      const serviceName = serviceDoc.exists()
        ? serviceDoc.data().serviceName
        : "";

      // Fetch the stop name based on the selected stop ID
      const stopDoc = await getDoc(
        doc(db, "Agencies_stops_data", formData.addStop),
      );
      const stopName = stopDoc.exists() ? stopDoc.data().stopName : "";

      const tripData = {
        ...formData,
        serviceName,
        stopName,
        userId: currentUser.uid,
      };

      if (editMode) {
        // Update existing trip
        await updateDoc(doc(db, "agencies_trips_data", editId), tripData);
        toast.success("Data updated successfully");
      } else {
        // Add new trip
        await addDoc(collection(db, "agencies_trips_data"), tripData);
        toast.success("Trips uploaded successfully");
      }
      handleClose();
    } catch (error) {
      console.error("Error adding/updating trip: ", error);
      toast.error("Failed to add/update trip");
    } finally {
      setLoading(false);
    }
  };

  const handleAddRouteMapSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      toast.error("Please log in to add route maps.");
      return;
    }
    setLoading(true);
    try {
      const routeMapData = {
        ...newRouteMapData,
        userId: currentUser.uid,
      };

      await addDoc(collection(db, "agencies_routes_data"), routeMapData);
      toast.success("Route Map added successfully");

      // Update route maps list
      const routeMapsSnapshot = await getDocs(
        query(
          collection(db, "agencies_routes_data"),
          where("userId", "==", currentUser.uid),
        ),
      );
      setRouteMaps(
        routeMapsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
      );

      handleCloseAddRouteMap();
    } catch (error) {
      console.error("Error adding route map: ", error);
      toast.error("Failed to add route map");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseAddRouteMap = () => {
    setShowAddRouteMap(false);
    setNewRouteMapData({ routeName: "" });
  };

  const handleShowAddRouteMap = () => setShowAddRouteMap(true);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <ToastContainer />
      <button
        id="add_stop_btn"
        className="btn btn-outline-dark  px-3 py-2"
        style={{ marginTop: 0 }}
        onClick={handleShow}
      >
        <i className="fa fa-map-marker mr-1"></i>Add Trip
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        centered
        backdrop="static"
        size="lg"
        responsive
        className="add_company_modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <b>
              {" "}
              <h3>Create Trip</h3>
            </b>
          </Modal.Title>
        </Modal.Header>
        <form
          method="post"
          name="add_trip_form"
          id="add_trip_form"
          className="p-4"
          onSubmit={handleFormSubmit}
        >
          <div className="row">
            <div className="col-sm-12 departure">
              <div className="row">
                <div className="form-group col-sm-9">
                  <label htmlFor="cal_service_id">
                    Service <span className="requ-lft">Required</span>
                  </label>
                  <div className="custom_search_parent full_width_select">
                    <select
                      className="custom_search"
                      id="cal_service_id"
                      name="service"
                      onChange={handleInputChange}
                      value={formData.service}
                    >
                      <option value="" disabled="disabled" selected="selected">
                        Select One
                      </option>
                      {services.map((service) => (
                        <option key={service.id} value={service.id}>
                          {service.serviceName}
                        </option>
                      ))}
                    </select>
                    <span className="cont_arrow" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="form-group col-sm-6">
                  <label htmlFor="trip_h_sign">Trip Headsign</label>
                  <input
                    type="text"
                    name="tripHeadsign"
                    id="tripHeadsign"
                    placeholder="E.g. The text on the signs used for passengers"
                    className="form-control"
                    style={{ textAlign: "left" }}
                    onChange={handleInputChange}
                    value={formData.tripHeadsign}
                  />
                  <input
                    type="hidden"
                    name="my_hdn_trip"
                    id="my_hdn_trip"
                    defaultValue=""
                  />
                </div>
                <div className="form-group col-sm-6">
                  <label htmlFor="trip_s_name">Short Name</label>
                  <input
                    type="text"
                    name="shortName"
                    id="shortName"
                    className="form-control"
                    style={{ textAlign: "left" }}
                    placeholder="Use only if each trip in a day has a unique name"
                    onChange={handleInputChange}
                    value={formData.shortName}
                  />
                  <input
                    type="hidden"
                    name="hdn_file_id"
                    id="hdn_file_id"
                    defaultValue={98477}
                  />
                  <input
                    type="hidden"
                    name="hdn_trip_id"
                    id="hdn_trip_id"
                    defaultValue=""
                  />
                  <input
                    type="hidden"
                    name="hdn_route_id"
                    id="hdn_route_id"
                    defaultValue={1}
                  />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-sm-6">
                  <label htmlFor="direction">Direction</label>
                  <div className="custom_search_parent full_width_select">
                    <select
                      className="custom_search"
                      name="direction"
                      id="direction"
                      onChange={handleInputChange}
                      value={formData.direction}
                    >
                      <option value={0}>Travel in one direction</option>
                      <option value={1}>
                        Travel in the opposite direction
                      </option>
                    </select>
                    <span className="cont_arrow" />
                  </div>
                </div>
                <div className="form-group col-sm-6">
                  <label htmlFor="block_id">Block</label>
                  <input
                    type="text"
                    name="block"
                    id="block"
                    className="form-control"
                    placeholder="Block"
                    style={{ textAlign: "left" }}
                    onChange={handleInputChange}
                    value={formData.block}
                  />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-sm-6">
                  <label htmlFor="trip_bikes_allowed">
                    Bikes Allowed <span className="requ-lft">Required</span>
                  </label>
                  <div className="custom_search_parent full_width_select">
                    <select
                      className="custom_search"
                      name="bikesAllowed"
                      id="bikesAllowed"
                      onChange={handleInputChange}
                      value={formData.bikesAllowed}
                    >
                      <option value={0}>
                        No bike information for the trip
                      </option>
                      <option value={1}>
                        Vehicle being used on this particular trip can
                        accommodate at least one bicycle
                      </option>
                      <option value={2}>
                        No bicycles are allowed on this trip
                      </option>
                    </select>
                    <span className="cont_arrow" />
                  </div>
                </div>
                <div className="form-group col-sm-6">
                  <label htmlFor="trip_wheelchair">Wheelchair Accessible</label>
                  <div className="custom_search_parent full_width_select">
                    <select
                      className="custom_search"
                      name="wheelchair"
                      id="wheelchair"
                      onChange={handleInputChange}
                      value={formData.wheelchair}
                    >
                      <option value={0}>
                        No accessibility information for the trip
                      </option>
                      <option value={1}>
                        Vehicle being used on this particular trip can
                        accommodate at least one rider in a wheelchair
                      </option>
                      <option value={2}>
                        No riders in wheelchairs can be accommodated on this
                        trip
                      </option>
                    </select>
                    <span className="cont_arrow" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="form-group col-sm-6">
                  <label htmlFor="stop_id">Add Stops</label>
                  <div className="custom_search_parent full_width_select">
                    <select
                      className="custom_search"
                      name="addStop"
                      id="addStop"
                      onChange={handleInputChange}
                      value={formData.addStop}
                    >
                      <option value="" disabled="disabled" selected="selected">
                        Select One
                      </option>
                      {stops.map((stop) => (
                        <option key={stop.id} value={stop.id}>
                          {stop.stopName}
                        </option>
                      ))}
                    </select>
                    <span className="cont_arrow" />
                  </div>
                </div>
                <div className="form-group col-sm-6">
                  <label htmlFor="trip_route">Route Maps</label>
                  <div className="custom_search_parent full_width_select">
                    <select
                      className="custom_search"
                      name="routeMap"
                      id="routeMap"
                      onChange={handleInputChange}
                      value={formData.routeMap}
                    >
                      <option value="" disabled="disabled" selected="selected">
                        Select One
                      </option>
                      {routeMaps.map((route) => (
                        <option key={route.id} value={route.id}>
                          {route.routeName}
                        </option>
                      ))}
                    </select>
                    <span className="cont_arrow" />
                    <Button onClick={handleShowAddRouteMap} variant="link">
                      Add Route Map
                    </Button>
                  </div>
                </div>
              </div>
              <div className="form-group mb-0">
                <div className="row align-items-center">
                  <div className="col-sm-6 col-6">
                    <Button
                      variant="secondary"
                      onClick={handleClose}
                      className="mt-3"
                    >
                      Cancel
                    </Button>
                  </div>
                  <div className="col-sm-6 col-6 text-right">
                    <Button
                      type="submit"
                      className="btn btn-danger btn-block-sm mt-3"
                    >
                      {editMode ? "Update" : "Save"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Modal>

      <Modal
        show={showAddRouteMap}
        onHide={handleCloseAddRouteMap}
        centered
        backdrop="static"
        size="md"
        className="add_route_map_modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <b>
              {" "}
              <h3>Add Route Map</h3>
            </b>
          </Modal.Title>
        </Modal.Header>
        <form
          method="post"
          name="add_route_map_form"
          id="add_route_map_form"
          className="p-4"
          onSubmit={handleAddRouteMapSubmit}
        >
          <div className="form-group">
            <label htmlFor="routeName">Route Name</label>
            <input
              type="text"
              name="routeName"
              id="routeName"
              className="form-control"
              style={{ textAlign: "left" }}
              placeholder="Enter Route Name"
              onChange={handleNewRouteMapInputChange}
              value={newRouteMapData.routeName}
            />
          </div>
          <div className="form-group mb-0">
            <div className="row align-items-center">
              <div className="col-sm-6 col-6">
                <Button
                  variant="secondary"
                  onClick={handleCloseAddRouteMap}
                  className="mt-3"
                >
                  Cancel
                </Button>
              </div>
              <div className="col-sm-6 col-6 text-right">
                <Button
                  type="submit"
                  className="btn btn-danger btn-block-sm mt-3"
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AddTrip;
