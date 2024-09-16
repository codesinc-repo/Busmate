import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";
import { Tooltip } from "react-tooltip";
import Loader from "../Loader";

export const AddServices = () => {
  const [show, setShow] = useState(false);
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    serviceName: "",
    startDate: "",
    endDate: "",
    days: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
    },
    exceptions: [],
  });
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const db = getFirestore();
  const auth = getAuth();

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setEditingServiceId(null);
    setFormData({
      serviceName: "",
      startDate: "",
      endDate: "",
      days: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
      },
      exceptions: [],
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      days: {
        ...prevState.days,
        [name]: checked,
      },
    }));
  };

  const handleAddException = () => {
    setFormData((prevState) => ({
      ...prevState,
      exceptions: [...prevState.exceptions, { date: "", availability: "1" }],
    }));
  };

  const handleExceptionChange = (index, field, value) => {
    const updatedExceptions = [...formData.exceptions];
    updatedExceptions[index][field] = value;
    setFormData({ ...formData, exceptions: updatedExceptions });
  };

  const handleRemoveException = (index) => {
    const updatedExceptions = [...formData.exceptions];
    updatedExceptions.splice(index, 1);
    setFormData({ ...formData, exceptions: updatedExceptions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!currentUser) {
        toast.error("Please login to add/update services.");
        return;
      }

      const serviceData = {
        ...formData,
        userId: currentUser.uid,
      };

      if (editingServiceId) {
        await updateDoc(
          doc(db, "Agencies_services_data", editingServiceId),
          serviceData,
        );
        toast.success("Service updated successfully");
      } else {
        await addDoc(collection(db, "Agencies_services_data"), serviceData);
        toast.success("Service added successfully");
      }
      handleClose();
      fetchServices(currentUser.uid);
    } catch (error) {
      toast.error("Error saving service data: " + error.message);
    }
  };

  const fetchServices = async (userId) => {
    try {
      setLoading(true);
      const q = query(
        collection(db, "Agencies_services_data"),
        where("userId", "==", userId),
      );
      const querySnapshot = await getDocs(q);
      const servicesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setServices(servicesData);
    } catch (error) {
      toast.error("Error fetching services: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (service) => {
    setFormData(service);
    setEditingServiceId(service.id);
    setShow(true);
  };

  const handleDelete = async (serviceId) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        await deleteDoc(doc(db, "Agencies_services_data", serviceId));
        setServices(services.filter((service) => service.id !== serviceId));
        toast.success("Service deleted successfully");
      } catch (error) {
        toast.error("Failed to delete service: " + error.message);
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        fetchServices(user.uid);
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  // Helper function to check if a service is available on a specific date
  const isServiceAvailable = (service, day) => {
    const dayMap = {
      monday: "Mon",
      tuesday: "Tue",
      wednesday: "Wed",
      thursday: "Thu",
      friday: "Fri",
      saturday: "Sat",
      sunday: "Sun",
    };
    const exceptions = service.exceptions || [];
    const dayName = dayMap[day];

    const exception = exceptions.find((exception) => {
      const exceptionDate = new Date(exception.date);
      const serviceDate = new Date(service.startDate);
      serviceDate.setDate(
        serviceDate.getDate() + (dayName.toLowerCase() === day.toLowerCase()),
      );
      return exceptionDate.getTime() === serviceDate.getTime();
    });

    if (exception) {
      return exception.availability === "1";
    }
    return service.days[day];
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="col-sm-12 ">
        <div>
          <div className="row d-flex align-items-center justify-content-between my-4">
            <div className="col-sm-4">
              <h3 id="span_msg_calendar">
                {services.length === 0
                  ? "No Services Available"
                  : `${services.length} Services Available`}
                <Link to={"#"} className="text-dark">
                  <i className="ml-2 fa fa-info-circle" />
                </Link>
              </h3>
            </div>
            <div className="col-sm-3">
              <div style={{ marginTop: 20, marginBottom: 10 }}>
                <div
                  id="spshowservice"
                  className="btn-group"
                  style={{ display: "none" }}
                >
                  <button
                    id="butsss2"
                    type="button"
                    className="btn btn-default"
                    onclick="showservice(2);"
                  >
                    Past
                  </button>
                  <button
                    id="butsss1"
                    type="button"
                    className="btn btn-default"
                    onclick="showservice(1);"
                  >
                    Current
                  </button>
                  <button
                    id="butsss3"
                    type="button"
                    className="btn btn-default"
                    onclick="showservice(3);"
                  >
                    Future
                  </button>
                </div>
              </div>
            </div>
            <div className="col-sm-5 text-end">
              <h3 className="optional">
                <Link
                  onClick={handleShow}
                  className="btn btn-outline-dark px-2 py-2 "
                >
                  <i className="fa fa-plus"></i> add service
                </Link>
                {/* <Link
                  id="deleteservicebtn"
                  className="btn btn-outline-dark px-2 py-2  ms-2"
                  onClick={() => {
                    const selectedService = services.find(
                      (service) => service.id === editingServiceId
                    );
                    handleDelete(selectedService.id);
                  }}
                >
                  <i className="fa fa-trash"></i> Delete Service
                </Link> */}
              </h3>
            </div>
          </div>
          <div className="row table">
            <table
              id="stops-grid"
              className="table table-striped table-bordered dataTable"
              cellSpacing={0}
              style={{ width: "100%" }}
              role="grid"
              aria-describedby="stops-grid_info"
            >
              <thead className="w-100">
                <tr>
                  <th style={{ borderLeft: "none !important" }}></th>
                  <th>Service Name</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Mon</th>
                  <th>Tue</th>
                  <th>Wed</th>
                  <th>Thu</th>
                  <th>Fri</th>
                  <th>Sat</th>
                  <th>Sun</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody id="calendar_tbody">
                {services.length === 0 ? (
                  <tr className="error">
                    <td colSpan={15} className="text-center">
                      no data available
                    </td>
                  </tr>
                ) : (
                  services.map((service) => (
                    <tr key={service.id}>
                      <td style={{ borderRight: "none !important" }}></td>
                      <td>{service.serviceName}</td>
                      <td>{service.startDate}</td>
                      <td>{service.endDate}</td>
                      {[
                        "monday",
                        "tuesday",
                        "wednesday",
                        "thursday",
                        "friday",
                        "saturday",
                        "sunday",
                      ].map((day) => (
                        <td key={day}>
                          {isServiceAvailable(service, day) ? (
                            <i
                              className="fa-solid fa-check"
                              style={{ color: "green" }}
                            />
                          ) : (
                            <i
                              className="fa fa-exclamation-triangle"
                              style={{ color: "red" }}
                              data-tip="No service available on the selected date"
                            />
                          )}
                          <Tooltip />
                        </td>
                      ))}
                      <td>
                        <i
                          className="fa fa-edit"
                          style={{ cursor: "pointer" }}
                          title="Edit Route Name & Description"
                          onClick={() => handleEdit(service)}
                        />
                      </td>
                      <td>
                        <i
                          className="fa fa-trash"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleDelete(service.id)}
                        ></i>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

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
          <Modal.Title>Add Service</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="serviceName" className="form-label">
                Service Name
              </label>
              <input
                type="text"
                className="form-control"
                id="serviceName"
                name="serviceName"
                value={formData.serviceName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="startDate" className="form-label">
                Start Date
              </label>
              <input
                type="date"
                className="form-control"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="endDate" className="form-label">
                End Date
              </label>
              <input
                type="date"
                className="form-control"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Availability Days</label>
              <div className="form-check d-flex justify-content-between ">
                {[
                  "monday",
                  "tuesday",
                  "wednesday",
                  "thursday",
                  "friday",
                  "saturday",
                  "sunday",
                ].map((day) => (
                  <div key={day}>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={day}
                      name={day}
                      checked={formData.days[day]}
                      onChange={handleCheckboxChange}
                    />
                    <label className="form-check-label" htmlFor={day}>
                      {day.charAt(0).toUpperCase() + day.slice(1)}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Exceptions</label>
              {formData.exceptions.map((exception, index) => (
                <div key={index} className="mb-2">
                  <input
                    type="date"
                    className="form-control d-inline-block me-2"
                    style={{ width: "auto" }}
                    value={exception.date}
                    onChange={(e) =>
                      handleExceptionChange(index, "date", e.target.value)
                    }
                    required
                  />
                  <select
                    className="form-control d-inline-block me-2"
                    style={{ width: "auto" }}
                    value={exception.availability}
                    onChange={(e) =>
                      handleExceptionChange(
                        index,
                        "availability",
                        e.target.value,
                      )
                    }
                    required
                  >
                    <option value="1">Available</option>
                    <option value="0">Unavailable</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleRemoveException(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleAddException}
              >
                Add Exception
              </button>
            </div>
            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-secondary me-2"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                {editingServiceId ? "Update Service" : "Add Service"}
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};
