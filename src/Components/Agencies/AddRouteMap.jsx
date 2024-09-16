import React, { useState, useEffect, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import {
  addDoc,
  collection,
  getFirestore,
  getDocs,
  doc,
  deleteDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore"; // Import the Firestore database

import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "../Loader";
import MapingRoutes from "../MapingRoutes";

const AddRouteMap = () => {
  const db = getFirestore();
  const [show, setShow] = useState(false);
  const [stopsInfo, setStopsInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stops, setStops] = useState([]);
  const [editingStopId, setEditingStopId] = useState(null);
  const [formData, setFormData] = useState({
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
  //   for modal
  const handleShow = () => setShow(true);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (editingStopId) {
        await updateDoc(
          doc(db, "Agencies_Routes_Map_data", editingStopId),
          formData,
        );
        setTimeout(() => {
          toast.success("Stop updated successfully");
        }, 1000);
      } else {
        await addDoc(collection(db, "Agencies_Routes_Map_data"), formData);
        setTimeout(() => {
          toast.success("Stop added successfully");
        }, 1000);
      }
      handleClose();
      fetchStops();
    } catch (error) {
      toast.error("Error saving stop data: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (stop) => {
    setFormData({
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
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setEditingStopId(null);
    setFormData({
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

  const handleDelete = async (stopId) => {
    if (window.confirm("Are you sure you want to delete this stop?")) {
      try {
        await deleteDoc(doc(db, "Agencies_stops_data", stopId));
        setStops(stops.filter((stop) => stop.id !== stopId));
        toast.success("Stop deleted successfully");
        fetchStops();
      } catch (error) {
        console.error("Error deleting stop: ", error);
        toast.error("Failed to delete stop");
      }
    }
  };

  const fetchStops = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(
        collection(db, "Agencies_Routes_Map_data"),
      );
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
    fetchStops();
  }, [db, editingStopId, show]);

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

  const paginatedStops = filteredStops.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage,
  );

  const totalPages = Math.ceil(filteredStops.length / entriesPerPage);

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <div
        id="stops-grid_wrapper"
        className="container dataTables_wrapper form-inline dt-bootstrap"
      >
        <div className="row d-flex align-items-center justify-content-between w-100 my-3">
          <div className="col-sm-6 text-start">
            <div className="dataTables_length" id="stops-grid_length">
              <label className="justify-content-start">
                Show{" "}
                <select
                  name="stops-grid_length"
                  aria-controls="stops-grid"
                  className="form-control input-sm mx-1"
                  value={entriesPerPage}
                  onChange={handleEntriesChange}
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>{" "}
                entries
              </label>
            </div>
          </div>
          <MapingRoutes />
        </div>
      </div>
    </>
  );
};
export default AddRouteMap;
