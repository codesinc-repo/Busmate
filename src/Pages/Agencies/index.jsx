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
  getDoc,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore"; // Import the Firestore database
import { getAuth, onAuthStateChanged } from "firebase/auth";

// import Header from "../../Components/Header";
import "./agencies.css";
import { Link, useParams } from "react-router-dom";
import Loader from "../../Components/Loader";
import { AddStops } from "../../Components/Agencies/AddStops";
import { AddServices } from "../../Components/Agencies/AddServices";
import { OptionalData } from "../../Components/Agencies/OptionalData";
import OnlyMap from "../../Components/OnlyMap";
import { Warnings } from "../../Components/Agencies/Warnings";
import FirestoreDataDownloader from "../../Components/FirestoreDataDownloader";
import useExportGTFS from "../../Components/ExportGTFS";
import { AddTrip } from "./components/AddTrip";
import AddRouteMap from "../../Components/Agencies/AddRouteMap";
import MapingRoutes from "../../Components/MapingRoutes";
import TimeTable from "../TimeTable";
import TimetableCreatorGTFS from "../TimetableCreatorGTFS";
import { MultipleStopTimetable } from "../MultipleStopTimetable";
import MultiTimeTableTab from "../../Components/MultiTimeTableTab";

const Agnecies = () => {
  const { id } = useParams(); // Get the id parameter from the URL
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [company, setCompany] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const db = getFirestore();
  const auth = getAuth();
  const { handleExport } = useExportGTFS();
  const [formData, setFormData] = useState({
    routeTypeCat: "",
    routeType: "",
    routeLongName: "",
    routeShortName: "",
    routeDesc: "",
    routeUrl: "",
    routeColor: "#FFFFFF",
    routeTextColor: "#000000",
  });
  const [key, setKey] = useState("home");
  const handleClose = () => {
    setShow(false);
    setEditMode(false);
    setFormData({
      routeTypeCat: "",
      routeType: "",
      routeLongName: "",
      routeShortName: "",
      routeDesc: "",
      routeUrl: "",
      routeColor: "#FFFFFF",
      routeTextColor: "#000000",
    });
  };
  const handleShow = () => setShow(true);

  // fetch agencies data
  useEffect(() => {
    const fetchBlog = async () => {
      const db = getFirestore();
      const companyRef = doc(db, "created_agencies", id); // Reference to the blog document
      try {
        const companyDoc = await getDoc(companyRef);
        if (companyDoc.exists()) {
          setCompany({ id: companyDoc.id, ...companyDoc.data() }); // Set the blog data
        } else {
          toast.error("Blog not found");
        }
      } catch (error) {
        console.error("Error fetching company:", error);
        toast.error("Error fetching company");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        fetchRoutes(user.uid);
      } else {
        setCurrentUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);

  // fetching data
  const fetchRoutes = async (userId) => {
    try {
      const RoutesRef = collection(db, "agencies_routes_data");
      const q = query(RoutesRef, where("userId", "==", userId));
      const snapshot = await getDocs(q);
      const routesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // setCompanyInfo(companyList);
      setRoutes(routesData);
    } catch (error) {
      console.error("Error fetching routes:", error);
      toast.error("Error fetching routes: ", error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!currentUser) {
        toast.error("Please login to add/update routes.");
        return;
      }

      // Fetch all shapes
      const shapeCollectionRef = collection(db, "shapes");
      const shapeSnapshot = await getDocs(shapeCollectionRef);
      const allShapes = shapeSnapshot.docs.map((doc) => doc.data());

      let shape_id;

      // Find the shape matching the routeShortName
      const matchingShape = allShapes.find(
        (shape) => shape.routeShortName === formData.routeShortName,
      );

      if (matchingShape) {
        shape_id = matchingShape.shape_id;
      } else {
        // If no matching shape, get any shape_id from the Firestore collection
        if (allShapes.length > 0) {
          // Select the first shape_id found
          shape_id = allShapes[0].shape_id;
        } else {
          throw new Error("No shapes available in the collection.");
        }
      }

      // Save the route data with shape_id in firestore
      await addDoc(collection(db, "agencies_routes_data"), {
        ...formData,
        userId: currentUser.uid,
        shape_id: shape_id,
      });

      toast.success("Route added successfully");

      // Refresh routes list
      fetchRoutes(currentUser.uid);
      handleClose();
    } catch (error) {
      console.error("Error adding/updating route: ", error);
      toast.error(error.message); // Display the error message using toast
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (route) => {
    setEditMode(true);
    setEditId(route.id);
    setFormData(route);
    handleShow();
  };

  const handleDelete = async (routeId) => {
    if (window.confirm("Are you sure you want to delete this route?")) {
      try {
        await deleteDoc(doc(db, "agencies_routes_data", routeId));
        setRoutes(routes.filter((route) => route.id !== routeId));
        toast.success("Route deleted successfully");
      } catch (error) {
        console.error("Error deleting route: ", error);
        toast.error("Failed to delete route");
      }
    }
  };

  function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
      console.log("totally custom!"),
    );

    return (
      <a className="border-0" onClick={decoratedOnClick}>
        {children}
      </a>
    );
  }

  return (
    <>
      <ToastContainer />
      {/* <Header /> */}
      <div className="container demo-1 mt-5">
        <Breadcrumb>
          <Breadcrumb.Item href="/AddTransit">
            Transit Companies{" "}
          </Breadcrumb.Item>
          <Breadcrumb.Item active>{company.companyName}</Breadcrumb.Item>
        </Breadcrumb>
        <div className="row">
          <div className="col-sm-8 d-flex flex-wrap">
            <h1 className="heading agency_head">{company.companyName}</h1>
            <div className="edit_btn" style={{ margin: "23px 23px 0px 15px" }}>
              <a
                href="#"
                onClick={() => console.log('load_data_Agency("13925")')}
              >
                <i className="fa fa-edit">&nbsp;</i>Edit Company
              </a>
            </div>
          </div>
          <div className="col-sm-4 float-end text-end">
            <a
              href="#"
              className="btn btn-outline-dark rounded-2 px-2 py-2"
              onClick={handleExport}
            >
              <i className="fa fa-download">&nbsp;</i>Export GTFS
            </a>
            <a
              href="#"
              className="btn btn-outline-dark rounded-2 px-2 py-2"
              style={{ marginLeft: 5 }}
            >
              <i id="gtfs_help_btn_icon" className="fa fa-comment">
                &nbsp;
              </i>
              Need Help?
            </a>
          </div>
        </div>
        <div className="row">
          <div
            className="col-sm-9 bordr_right detail_user"
            style={{ borderRight: "0px none" }}
          >
            <span />
            <a href="https://codes-inc.com/" target="_blank">
              {company.companyUrl}
            </a>
          </div>
          <div className="col-sm-3 text-end">
            <span>Asia/Karachi</span>
            <span />
          </div>
        </div>
      </div>
      <div className="container all_tabs mt-4">
        <div className="row">
          <Tabs
            id="controlled-tab-example"
            defaultActiveKey="routes"
            onSelect={(k) => setKey(k)}
            className="mb-3"
          >
            <Tab eventKey="routes" title="Routes">
              <div className="row">
                <div className="col-sm-4">
                  <a
                    className="btn btn-outline-dark rounded-3 px-2 py-2"
                    href="#"
                    onClick={handleShow}
                  >
                    <i className="fa fa-plus" />
                    Add route
                  </a>
                </div>
              </div>
              {routes.length === 0 ? (
                <div className="text-center my-4">
                  <h4>No routes data found.</h4>
                </div>
              ) : (
                routes.map((route, index) => (
                  <div
                    className="row my-4"
                    style={{
                      border: "1px solid #d4d6d7",
                      borderRadius: "10px",
                    }}
                    key={route.id}
                  >
                    <div className="col-sm-8">
                      <Accordion className="accordian_agency">
                        <Card className="border-0 card_agency">
                          <Card.Header className="d-flex align-items-center gap-4 border-0">
                            <div className="col-sm-6 d-flex align-items-center gap-3">
                              <CustomToggle
                                eventKey={`${index}`}
                                className="border-0"
                              >
                                <i
                                  className="fa fa-border fa-caret-down card_agency_accordian_icon"
                                  eventKey={`${index}`}
                                />{" "}
                              </CustomToggle>
                              <h2>
                                {route.routeLongName}{" "}
                                <span>
                                  {route.routeShortName
                                    ? `(${route.routeShortName})`
                                    : ""}
                                </span>{" "}
                              </h2>
                            </div>
                            <div className="col-sm-6 text-end card_agency_icon">
                              <i
                                className="fa fa-edit"
                                style={{ cursor: "pointer" }}
                                title="Edit Route Name & Description"
                                onClick={() => handleEdit(route)}
                              />
                              <i
                                className="fa fa-trash ml-3"
                                style={{ cursor: "pointer" }}
                                title="Delete Route Name & Description"
                                onClick={() => handleDelete(route.id)}
                              />
                            </div>
                          </Card.Header>
                          <Accordion.Collapse
                            eventKey={`${index}`}
                            className="px-5"
                          >
                            <Card.Body>
                              <div className="content">
                                <p className="text-secondary">
                                  {route.routeDesc}
                                </p>
                                <p>
                                  <AddTrip />
                                </p>
                              </div>
                              <div className="map">{/* <OnlyMap /> */}</div>
                            </Card.Body>
                          </Accordion.Collapse>
                        </Card>
                      </Accordion>
                    </div>
                    <div className="col-sm-4"></div>
                  </div>
                ))
              )}
            </Tab>
            <Tab eventKey="stops" title="Stops">
              <AddStops />
            </Tab>
            <Tab eventKey="services" title="Services">
              <AddServices />
            </Tab>
            <Tab eventKey="route_map" title="Route Map">
              <MapingRoutes />
            </Tab>
            <Tab eventKey="TimeTable" title="TimeTable">
              <TimetableCreatorGTFS />
            </Tab>
            <Tab eventKey="MultipleTimeTable" title="MultipleTimeTable">
              {/* <TimetableCreatorGTFS /> */}
              {/* <MultipleStopTimetable /> */}
              <MultiTimeTableTab />
            </Tab>
            <Tab eventKey="optional_data" title="Optional Data">
              <OptionalData />
            </Tab>
            <Tab eventKey="warning" title="Warnings">
              <Warnings />
            </Tab>
            <Tab eventKey="GTFS Data" title="GTFS-DATA">
              <FirestoreDataDownloader />
            </Tab>
          </Tabs>
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        backdrop="static"
        size="md"
        responsive
        className="add_company_modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <b>
              {" "}
              <h3>Create Routes</h3>
            </b>
          </Modal.Title>
        </Modal.Header>
        <form method="POST" id="add_route_form" onSubmit={handleFormSubmit}>
          <div className="modal-body">
            <div className="row">
              <div className="form-group col-sm-12">
                <label htmlFor="add_route_type_cat">
                  Route Type <span className="requ-lft">Required</span>
                </label>
                <select
                  className="form-control custom_srch"
                  name="routeTypeCat"
                  id="add_route_type_cat"
                  required=""
                  onChange={handleInputChange}
                  value={formData.routeTypeCat}
                >
                  <option value="" disabled="disabled">
                    Select One
                  </option>
                  <option value="Standard_Route_Types">
                    Standard Route Types
                  </option>
                  <optgroup label="Extensions">
                    <option value="Air">Air</option>
                    <option value="Bus">Bus</option>
                    <option value="Coach">Coach</option>
                    <option value="Ferry">Ferry</option>
                    <option value="Funicular">Funicular</option>
                    <option value="Metro">Metro</option>
                    <option value="Miscellaneous">Miscellaneous</option>
                    <option value="Railway">Railway</option>
                    <option value="Self_Drive">Self Drive</option>
                    <option value="Surburban_Railway">Surburban Railway</option>
                    <option value="Taxi">Taxi</option>
                    <option value="Telecabin">Telecabin</option>
                    <option value="Tram">Tram</option>
                    <option value="Trolleybus">Trolleybus</option>
                    <option value="Underground">Underground</option>
                    <option value="Urban_Railway">Urban Railway</option>
                    <option value="Water_Transport">Water Transport</option>
                  </optgroup>{" "}
                </select>
              </div>
            </div>
            <div className="row">
              <div className="form-group col-sm-12">
                <label htmlFor="add_route_type">
                  Route Sub Type/Extension{" "}
                  <span className="requ-lft">Required</span>
                </label>
                <select
                  className="form-control custom_srch"
                  name="routeType"
                  id="add_route_type"
                  required=""
                  onChange={handleInputChange}
                  value={formData.routeType}
                >
                  <option
                    id="add_route_type_one"
                    value=""
                    disabled="disabled"
                    style={{ display: "none" }}
                  >
                    Select One
                  </option>
                  <option
                    value={3}
                    data_cat="S"
                    data-route-group="Standard_Route_Types"
                  >
                    Bus
                  </option>
                  <option
                    value={5}
                    data_cat="S"
                    data-route-group="Standard_Route_Types"
                  >
                    Cable Car
                  </option>
                  <option
                    value={4}
                    data_cat="S"
                    data-route-group="Standard_Route_Types"
                  >
                    Ferry
                  </option>
                  <option
                    value={7}
                    data_cat="S"
                    data-route-group="Standard_Route_Types"
                  >
                    Funicular
                  </option>
                  <option
                    value={6}
                    data_cat="S"
                    data-route-group="Standard_Route_Types"
                  >
                    Gondola
                  </option>
                  <option
                    value={12}
                    data_cat="S"
                    data-route-group="Standard_Route_Types"
                  >
                    Monorail
                  </option>
                  <option
                    value={2}
                    data_cat="S"
                    data-route-group="Standard_Route_Types"
                  >
                    Rail
                  </option>
                  <option
                    value={1}
                    data_cat="S"
                    data-route-group="Standard_Route_Types"
                  >
                    Subway, Metro
                  </option>
                  <option
                    value={11}
                    data_cat="S"
                    data-route-group="Standard_Route_Types"
                  >
                    Trolleybus
                  </option>
                </select>
              </div>
            </div>
            <div className="row">
              <input
                type="hidden"
                className="form-control"
                defaultValue=""
                name="add_route_hdn"
                id="add_route_hdn"
              />
              <div className="form-group col-sm-12">
                <label htmlFor="add_route_long_name">
                  Route Name (Long)<span className="requ-lft">Required</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter the name of the route. E.g. Downtown via Station"
                  name="routeLongName"
                  id="add_route_long_name"
                  required=""
                  onChange={handleInputChange}
                  value={formData.routeLongName}
                />
              </div>
            </div>
            <div className="panel-group" id="accordion">
              <div className="panel panel-default">
                <div className="panel-heading">
                  {/* h4 class="panel-title" */}
                  <a
                    data-toggle="collapse"
                    data-parent="#accordion"
                    href="#collapseFour"
                  >
                    Optional Fields (open/close)
                  </a>
                  {/*/h4 */}
                </div>
                <div
                  id="collapseFour"
                  className="panel-collapse out collapse in"
                  style={{}}
                >
                  <div className="panel-body">
                    <div className="row">
                      <div className="form-group col-sm-9">
                        <label htmlFor="add_route_short_name">
                          Route Name (Short)
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="routeShortName"
                          id="add_route_short_name"
                          placeholder="Route number/id. Maximum 6 characters."
                          onChange={handleInputChange}
                          value={formData.routeShortName}
                        />
                      </div>
                      <div
                        className="form-group col-sm-3"
                        style={{ display: "none" }}
                      >
                        <label htmlFor="add_route_id">
                          Id <span className="requ-lft">Required</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder=""
                          name="add_route_id"
                          id="add_route_id"
                          onchange="show_service_alert()"
                          required=""
                        />
                        <input
                          type="hidden"
                          className="form-control"
                          defaultValue={98477}
                          name="route_ag_file_id"
                        />
                      </div>
                      <div
                        className="form-group col-sm-6"
                        style={{ display: "none" }}
                      >
                        <label htmlFor="add_rt_agency_id_sel">
                          Agency <span className="requ-lft">Required</span>
                        </label>
                        <input
                          type="hidden"
                          className="form-control"
                          defaultValue={1}
                          name="agency_id"
                          id="add_rt_agency_id"
                        />
                        <select
                          className="form-control custom_srch"
                          name="agency_id_sel"
                          id="add_rt_agency_id_sel"
                          disabled="disabled"
                        >
                          <option value="" disabled="disabled">
                            Select One
                          </option>
                          <option value={1}>Software Company</option>
                        </select>
                      </div>
                    </div>
                    <div className="row">
                      <div className="abt-agency form-group col-sm-12">
                        <label htmlFor="add_route_desc">Description</label>
                        <textarea
                          className="form-control"
                          rows={4}
                          name="routeDesc"
                          id="add_route_desc"
                          style={{ lineHeight: "normal" }}
                          placeholder="Provide a textual description of the route, it's features and running times. Do not duplicate the long and/or short names."
                          defaultValue={formData.routeDesc}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="abt-agency form-group col-sm-12">
                        <label htmlFor="add_route_url">
                          Route URL
                          <a
                            target="_blank"
                            className="test_link fetch_link"
                            href="#"
                            style={{
                              fontSize: 12,
                              paddingLeft: 15,
                              paddingTop: 6,
                            }}
                          >
                            Test Link
                          </a>
                        </label>
                        <input
                          type="url"
                          className="form-control"
                          name="routeUrl"
                          id="add_route_url"
                          placeholder="If available, the route specific web page. Do not use the agency url."
                          onChange={handleInputChange}
                          value={formData.routeUrl}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-sm-6">
                        <div className="modal_macs">
                          <label htmlFor="add_route_color">
                            Route Color{" "}
                            <small>
                              (Use Default{" "}
                              <input
                                type="checkbox"
                                id="add_route_color_default"
                                name="route_color_default"
                                defaultChecked="checked"
                                defaultValue="Y"
                                style={{ width: "auto" }}
                              />
                              )
                            </small>
                          </label>
                          <input
                            type="color"
                            className="form-control"
                            name="routeColor"
                            id="add_route_color"
                            // placeholder="e.g. #ffffff"
                            onChange={handleInputChange}
                            value={formData.routeColor}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="form-group col-sm-6">
                        <label htmlFor="add_route_text_color">
                          Route Text Color{" "}
                          <small>
                            (Use Default{" "}
                            <input
                              type="checkbox"
                              id="add_route_text_color_default"
                              name="route_text_color_default"
                              defaultChecked="checked"
                              defaultValue="Y"
                              style={{ width: "auto" }}
                            />
                            )
                          </small>
                        </label>
                        <input
                          type="color"
                          className="form-control"
                          name="routeTextColor"
                          id="add_route_text_color"
                          placeholder="e.g. #000000"
                          onChange={handleInputChange}
                          value={formData.routeTextColor}
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleClose}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-success">
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </Modal>
      <ToastContainer />
    </>
  );
};
export default Agnecies;
