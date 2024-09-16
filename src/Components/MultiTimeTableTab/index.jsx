import React, { useState, useEffect, useRef } from "react";
import { Button, Form, Col, Row, Table } from "react-bootstrap";
import { getFirestore, collection, getDocs,doc,getDoc,updateDoc,deleteDoc } from "firebase/firestore";
import { db } from "../../FirebaseConfig";
import Select from "react-select";
import AddStopsModel from "../AddStopsModel";
import {
  Map,
  GoogleApiWrapper,
  Marker,
  Polyline,
} from "google-maps-react";

const MultiTimeTableTab = ({ google }) => {
  const [groups, setGroups] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [newGroup, setNewGroup] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [timetableData, setTimetableData] = useState([]);
  const [agenciesStopsData, setAgenciesStopsData] = useState([]);
  const [stops, setStops] = useState([{ id: 1 }]);
  const [showRouteDetails, setShowRouteDetails] = useState(false);
  const [selectedStops, setSelectedStops] = useState([]);
  const [map, setMap] = useState(null);
  const [directions, setDirections] = useState(null);
  const [serviceDirection, setServiceDirection] = useState("Inbound");
  const [filteredData, setFilteredData] = useState([]);
  const [startAddress, setStartAddress] = useState("");
  const [endAddress, setEndAddress] = useState("");
  const [zoom, setZoom] = useState(12);

  const [timePeriods, setTimePeriods] = useState(1);
  const [firstServiceStart, setFirstServiceStart] = useState("");
  const [latestServiceStart, setLatestServiceStart] = useState("");
  const [serviceFrequency, setServiceFrequency] = useState("");
  const [routeKilometers, setRouteKilometers] = useState("");
  const [averageSpeed, setAverageSpeed] = useState("");

  const mapRef = useRef(null);
  let directionsService = useRef(null);
  let directionsRenderer = useRef(null);

  useEffect(() => {
    if (google) {
      directionsService.current = new google.maps.DirectionsService();
      directionsRenderer.current = new google.maps.DirectionsRenderer();
    }
  }, [google]);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleGroupChange = (selectedOptions) => {
    setSelectedGroups(selectedOptions ? selectedOptions.map(option => option.value) : []);
  };
  

  useEffect(() => {
    const fetchData = async () => {
      const timetableSnapshot = await getDocs(collection(db, "TimeTable"));
      const agenciesStopsSnapshot = await getDocs(collection(db, "stops"));

      const timetableData = timetableSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const agenciesStopsData = agenciesStopsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTimetableData(timetableData);
      setAgenciesStopsData(agenciesStopsData);

      const uniqueGroups = [
        ...new Set(timetableData.map((data) => data.group)),
      ].map((group) => ({ value: group, label: group }));

      setGroups(uniqueGroups);
    };

    fetchData();
  }, []);

  const handleAddStop = () => {
    setStops([...stops, { id: stops.length + 1, value: "" }]);
  };

  const handleRemoveStop = (id) => {
    setStops(stops.filter((stop) => stop.id !== id));
  };

  const handleEdit = async (id, updatedData) => {
    try {
      const docRef = doc(db, "TimeTable", id);
      await updateDoc(docRef, updatedData);
      alert("Document successfully updated!");
    } catch (error) {
      console.error("Error editing document: ", error);
    }
  };
  
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this document?")) {
      try {
        const docRef = doc(db, "TimeTable", id);
        await deleteDoc(docRef);
        alert("Document successfully deleted!");
      } catch (error) {
        console.error("Error deleting document: ", error);
      }
    }
  };
  const initMap = () => {
    setShowRouteDetails(true);

    if (!directionsRenderer.current) {
      directionsRenderer.current = new google.maps.DirectionsRenderer();
    }

    if (!directionsService.current) {
      directionsService.current = new google.maps.DirectionsService();
    }

    const NewMap = new google.maps.Map(mapRef.current, {
      zoom: zoom,
      center: { lat: -41.2865, lng: 174.7762 },
    });

    directionsRenderer.current.setMap(NewMap);
    setMap(NewMap);
    calculateAndDisplayRoute(NewMap);
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
  };

  const calculateAndDisplayRoute = (NewMap) => {
    if (!NewMap || !directionsService.current || !directionsRenderer.current) {
      return;
    }

    const selectedStopDetails = [];
    const geocoder = new google.maps.Geocoder();

    const geocodeAddress = (address, callback) => {
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          const location = results[0].geometry.location;
          callback(location.lat(), location.lng());
        } else {
          console.error(
            `Geocode was not successful for the following reason: ${status}`
          );
        }
      });
    };

    const startAddressSelect = document.querySelector(
      'select[name="addresses[start_address]"]'
    );
    const startAddress =
      startAddressSelect.options[startAddressSelect.selectedIndex].textContent;

    const endAddressSelect = document.querySelector(
      'select[name="addresses[end_address]"]'
    );
    const endAddress =
      endAddressSelect.options[endAddressSelect.selectedIndex].textContent;

    const waypoints = stops.map((stop, index) => {
      const stopSelect = document.querySelector(
        `select[name="addresses[stops][${stop.id}]"]`
      );
      const stopAddress =
        stopSelect.options[stopSelect.selectedIndex].textContent;

      selectedStopDetails.push({ address: stopAddress });

      return new Promise((resolve) => {
        geocodeAddress(stopAddress, (lat, lng) => {
          resolve({ stopName: stopAddress, lat: lat, long: lng, distance: 0 });
        });
      });
    });

    const startAddressPromise = new Promise((resolve) => {
      geocodeAddress(startAddress, (lat, lng) => {
        resolve({ stopName: startAddress, lat: lat, long: lng, distance: 0 });
      });
    });

    const endAddressPromise = new Promise((resolve) => {
      geocodeAddress(endAddress, (lat, lng) => {
        resolve({ stopName: endAddress, lat: lat, long: lng, distance: 0 });
      });
    });

    Promise.all([startAddressPromise, endAddressPromise, ...waypoints])
      .then((values) => {
        const [startDetails, endDetails, ...stopDetails] = values;

        for (let i = 0; i < stopDetails.length - 1; i++) {
          stopDetails[i].distance = calculateDistance(
            stopDetails[i].lat,
            stopDetails[i].long,
            stopDetails[i + 1].lat,
            stopDetails[i + 1].long
          );
        }

        if (stopDetails.length > 0) {
          stopDetails[stopDetails.length - 1].distance = calculateDistance(
            stopDetails[stopDetails.length - 1].lat,
            stopDetails[stopDetails.length - 1].long,
            endDetails.lat,
            endDetails.long
          );
        }

        if (stopDetails.length > 0) {
          startDetails.distance = calculateDistance(
            startDetails.lat,
            startDetails.long,
            stopDetails[0].lat,
            stopDetails[0].long
          );
        } else {
          startDetails.distance = calculateDistance(
            startDetails.lat,
            startDetails.long,
            endDetails.lat,
            endDetails.long
          );
        }

        setSelectedStops([startDetails, ...stopDetails, endDetails]);

        const totalRouteKilometers = [startDetails, ...stopDetails, endDetails].reduce(
          (total, stop) => stop.distance,
          0
        );
        setRouteKilometers(totalRouteKilometers);

        const waypointPositions = stopDetails.map((stop) => ({
          location: { lat: stop.lat, lng: stop.long },
          stopover: true,
        }));

        const directionsRequest = {
          origin: { lat: startDetails.lat, lng: startDetails.long },
          destination: { lat: endDetails.lat, lng: endDetails.long },
          waypoints: waypointPositions,
          travelMode: google.maps.TravelMode.DRIVING,
        };

        directionsService.current.route(directionsRequest, (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            directionsRenderer.current.setDirections(result);
            setDirections(result);

            const bounds = new google.maps.LatLngBounds();
            result.routes[0].overview_path.forEach((point) => {
              bounds.extend(point);
            });
            NewMap.fitBounds(bounds);
          } else {
            console.error(`Directions request failed due to ${status}`);
          }
        });
      })
      .catch((error) => {
        console.error("Error geocoding addresses:", error);
      });
  };

  const selectedTimetableData = timetableData.filter(
    (data) =>
      data.fromAddress === startAddress &&
      data.toAddress === endAddress
  );

  const enable_editing = () => {
    // Enable editing logic here
  };
  const formatDateForInput = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };


  const create_trip = () => {
    const newTrip = {
      timePeriods,
      firstServiceStart,
      latestServiceStart,
      serviceFrequency,
      routeKilometers,
      averageSpeed,
      direction: serviceDirection,
    };
    setFilteredData([...filteredData, newTrip]);
  };
  useEffect(() => {
    if (selectedTimetableData.length > 0) {
      const filtered = selectedTimetableData
        .map((data) => {
          const trips =
            serviceDirection === "Inbound"
              ? data.inboundTrips
              : data.outboundTrips;
          return trips.times.map((trip, index) => ({
            id: `${data.id}-${index}`,
            timePeriods: trips.timePeriods,
            firstServiceStart: trip.firstServiceStart
              ? trip.firstServiceStart.toDate().toLocaleString()
              : "",
            latestServiceStart: trip.latestServiceStart
              ? trip.latestServiceStart.toDate().toLocaleString()
              : "",
            endTime: trip.duration,
            frequency: trip.frequency,
            kilometers: trip.kilometers,
          }));
        })
        .flat();

      setFilteredData((prevData) => {
        const isSameData = JSON.stringify(prevData) === JSON.stringify(filtered);
        return isSameData ? prevData : filtered;
      });

      if (filtered.length > 0) {
        const firstTrip = filtered[0];
        setFirstServiceStart((prev) => {
          const newDate = formatDateForInput(firstTrip.firstServiceStart);
          return prev === newDate ? prev : newDate;
        });
        setLatestServiceStart((prev) => {
          const newDate = formatDateForInput(firstTrip.latestServiceStart);
          return prev === newDate ? prev : newDate;
        });
        setServiceFrequency((prev) => (prev === firstTrip.frequency ? prev : firstTrip.frequency));
        setRouteKilometers((prev) => (prev === firstTrip.kilometers ? prev : firstTrip.kilometers));
      }
    }
  }, [serviceDirection, selectedTimetableData]);

  useEffect(() => {
    if (map && selectedStops.length > 0) {
      selectedStops.forEach((stop) => {
        new google.maps.Marker({
          position: { lat: stop.lat, lng: stop.long },
          map: map,
          title: stop.stopName,
        });
      });
    }
  }, [map, selectedStops]);

  return (
    <div className="col-lg-9 col-lg-12 mb-5" id="tools-page-elem">
      <div className="Freight-item tool-item">
        <Row>
          <Col sm={10}>
            <div className="d-flex tool_page_title">
              <h3 className="mb-4">
                Multiple Stop Timetable <span>Creator</span>
              </h3>
            </div>
            <p>
              This tool helps create a regular or fixed route timetable with
              multiple stops quickly and easily.
            </p>
          </Col>
          <Col sm={2} className="text-right">
            <Button variant="dark" size="md" onClick={handleShow}>
              <i className="fa fa-plus" /> <small>Add New Stop</small>
            </Button>
            <AddStopsModel show={showModal} handleClose={handleClose} />
          </Col>
        </Row>
        <hr />
        <div className="Freight-s mt-4 pt-2">
          <Form
            className="validate-form ajaxForm nopopup"
            id="timetable_creator_form"
            method="POST"
            action="https://transporttoolkit.com/tools/multiple_stop_timetable/save"
            noValidate
          >
            <Form.Group
              as={Row}
              controlId="report_name"
              className="align-items-center mt-3"
            >
              <Form.Label column sm={4}>
                Timetable Name:
              </Form.Label>
              <Col sm={6}>
                <Form.Control
                  autoComplete="off"
                  type="text"
                  name="report_name"
                  placeholder="Enter name to save the result"
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              controlId="groups"
              className="align-items-center mt-3"
            >
              <Form.Label column sm={4}>
                Select Group:
              </Form.Label>
              <Col sm={6}>
                <Select
                  name="groups"
                  id="groups"
                  options={groups}
                  value={selectedGroups}
                  onChange={setSelectedGroups}
                  isMulti
                />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              controlId="serviceDirection"
              className="align-items-center mt-3"
            >
              <Form.Label as="legend" column sm={4}>
                Service Direction
              </Form.Label>
              <Col sm={6}>
                <Row>
                  <Col sm={6}>
                    <Form.Check
                      type="radio"
                      label="Inbound"
                      name="serviceDirection"
                      id="inbound"
                      value="Inbound"
                      checked={serviceDirection === "Inbound"}
                      onChange={(e) => setServiceDirection(e.target.value)}
                    />
                  </Col>
                  <Col sm={6}>
                    <Form.Check
                      type="radio"
                      label="Outbound"
                      name="serviceDirection"
                      id="outbound"
                      value="Outbound"
                      checked={serviceDirection === "Outbound"}
                      onChange={(e) => setServiceDirection(e.target.value)}
                    />
                  </Col>
                </Row>
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              controlId="start_address"
              className="align-items-center mt-3"
            >
              <Form.Label column sm={4}>
                Start Address:
              </Form.Label>
              <Col sm={6}>
                <Form.Control
                  as="select"
                  name="addresses[start_address]"
                  required
                  onChange={(e) => setStartAddress(e.target.value)}
                >
                  <option value="">Select Start Address</option>
                  {timetableData.map((entry) => (
                    <option
                      key={entry.id}
                      value={entry.fromAddress}
                      data-lat={entry.start_lat}
                      data-long={entry.start_lon}
                    >
                      {entry.fromAddress}
                    </option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Group>

            <div id="stop">
              {stops.map((stop, index) => (
                <Form.Group
                  as={Row}
                  id={`stop__${stop.id}`}
                  className="align-items-center mt-3"
                  key={stop.id}
                >
                  <Form.Label column sm={4}>
                    Stop {index + 1}:
                  </Form.Label>
                  <Col sm={6}>
                    <Form.Control
                      as="select"
                      name={`addresses[stops][${stop.id}]`}
                      required
                    >
                      <option value="">Select Stop Address</option>
                      {agenciesStopsData.map((stop) => (
                        <option
                          key={stop.id}
                          value={stop.stopName}
                          data-lat={stop.lat}
                          data-long={stop.long}
                        >
                          {stop.stopName}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  {index > 0 && (
                    <Col sm={2} className="text-right">
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleRemoveStop(stop.id)}
                      >
                        <i className="fa fa-minus" /> <small>Remove</small>
                      </Button>
                    </Col>
                  )}
                  {index === stops.length - 1 && (
                    <Col sm={12} className="text-right">
                      <Button variant="info" size="sm" onClick={handleAddStop}>
                        <i className="fa fa-plus" /> <small>Add Stop</small>
                      </Button>
                    </Col>
                  )}
                </Form.Group>
              ))}
            </div>

            <Form.Group
              as={Row}
              controlId="end_address"
              className="align-items-center mt-3"
            >
              <Form.Label column sm={4}>
                End Address:
              </Form.Label>
              <Col sm={6}>
                <Form.Control
                  as="select"
                  name="addresses[end_address]"
                  required
                  onChange={(e) => setEndAddress(e.target.value)}
                >
                  <option value="">Select End Address</option>
                  {timetableData.map((entry) => (
                    <option
                      key={entry.id}
                      value={entry.toAddress}
                      data-lat={entry.end_lat}
                      data-long={entry.end_lon}
                    >
                      {entry.toAddress}
                    </option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              controlId="run_name"
              className="align-items-center mt-3"
            >
              <Form.Label column sm={4}>
                Run Name:
              </Form.Label>
              <Col sm={3}>
                <Form.Control
                  autoComplete="off"
                  type="text"
                  name="run_name"
                  placeholder="Enter run name"
                  required
                />
              </Col>
            </Form.Group>

            <div className="col-sm-12 border-top mt-5 pt-2 text-right">
              <Button variant="success" size="sm" onClick={initMap}>
                <i className="fa fa-search" /> Create Routes
              </Button>
            </div>
            <div id="route_div" ref={mapRef}></div>

            {showRouteDetails && (
              <>
                <div className="map my-5">
                  <div className="row inbound-route mb-5 stops_main_div mt-3">
                    <Col xs={12}>
                      <h3 className="my-3 pb-3">Stops</h3>
                      <Row>
                        <Col xs={12}>
                          <Map
                            google={google}
                            zoom={zoom}
                            style={{ height: "400px", width: "100%" }}
                            initialCenter={{ lat: -41.2865, lng: 174.7762 }}
                            onReady={(mapProps, map) => {
                              setMap(map); // Store map instance
                              calculateAndDisplayRoute(map); // Calculate and display route on map ready
                            }}
                          >
                            {/* Display markers for each stop */}
                            {selectedStops.map((stop, index) => (
                              <Marker
                                key={index}
                                position={{ lat: stop.lat, lng: stop.long }}
                                title={stop.stopName}
                              />
                            ))}

                            {/* Display polyline for directions */}
                            {directions && (
                              <Polyline
                                path={directions.routes[0].overview_path}
                                options={{
                                  strokeColor: "#000",
                                  strokeOpacity: 0.8,
                                  strokeWeight: 4,
                                }}
                              />
                            )}
                          </Map>
                        </Col>
                      </Row>
                    </Col>
                  </div>
                </div>
                <div
                  className="details"
                  style={{ position: "absolute", top: "75rem", width: "100%" }}
                >
                  <Row className="">
                    <Col xs={12}>
                      <div className="table-responsive">
                        <table className="border-0 table">
                          <thead>
                            <tr>
                              <th>Type</th>
                              <th>Stop Name</th>
                              <th>Lat</th>
                              <th>Long</th>
                              <th>Distance</th>
                            </tr>
                          </thead>
                          <tbody id="genrate_stops">
                            {selectedStops.map((stop, index) => (
                              <tr key={index}>
                                <td>
                                  {index === 0
                                    ? "Start Address"
                                    : index === selectedStops.length - 1
                                      ? "End Address"
                                      : "to address"}
                                </td>
                                <td>{stop.stopName}</td>
                                <td>{stop.lat}</td>
                                <td>{stop.long}</td>
                                <td>{stop.distance.toFixed(2)} km</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </Col>
                  </Row>
                </div>

                <div
                  className="details"
                  style={{ position: "absolute", top: "90rem", width: "100%" }}
                >
                  <Row>
                    <Col xs={12}>
                      <h3 className="my-3 pb-3">{serviceDirection}</h3>
                      <Form>
                        <Form.Group as={Row}>
                          <Form.Label column sm={4}>
                            Number of Time Periods:
                          </Form.Label>
                          <Col sm={6}>
                            <Form.Control
                              as="select"
                              value={timePeriods}
                              onChange={(e) => setTimePeriods(e.target.value)}
                            >
                              {[...Array(12).keys()].map((num) => (
                                <option key={num + 1} value={num + 1}>
                                  {num + 1}
                                </option>
                              ))}
                            </Form.Control>
                          </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                          <Form.Label column sm={4}>
                            First Service Start Time:
                          </Form.Label>
                          <Col sm={6}>
                            <Form.Control
                              type="datetime-local"
                              value={firstServiceStart}
                              onChange={(e) => setFirstServiceStart(e.target.value)}
                            />
                          </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                          <Form.Label column sm={4}>
                            Latest Service Start Time:
                          </Form.Label>
                          <Col sm={6}>
                            <Form.Control
                              type="datetime-local"
                              value={latestServiceStart}
                              onChange={(e) => setLatestServiceStart(e.target.value)}
                            />
                          </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                          <Form.Label column sm={4}>
                            Service Frequency (Minutes):
                          </Form.Label>
                          <Col sm={6}>
                            <Form.Control
                              type="number"
                              value={serviceFrequency}
                              onChange={(e) => setServiceFrequency(e.target.value)}
                            />
                          </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                          <Form.Label column sm={4}>
                            Route Duration (Minutes):
                          </Form.Label>
                          <Col sm={6}>
                            <Form.Control type="number" />
                          </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                          <Form.Label column sm={4}>
                            Recovery or Layover Duration (Minutes):
                          </Form.Label>
                          <Col sm={6}>
                            <Form.Control type="number" />
                          </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                          <Form.Label column sm={4}>
                            Route Kilometers:
                          </Form.Label>
                          <Col sm={6}>
                            <Form.Control
                              type="number"
                              value={routeKilometers}
                              onChange={(e) => setRouteKilometers(e.target.value)}
                            />
                          </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                          <Form.Label column sm={4}>
                            Average Speed (Kilometers per Hour):
                          </Form.Label>
                          <Col sm={6}>
                            <Form.Control
                              type="number"
                              value={averageSpeed}
                              onChange={(e) => setAverageSpeed(e.target.value)}
                            />
                          </Col>
                        </Form.Group>

                        <div className="col-sm-12 border-top mb-4 text-right">
                          <Button
                            variant="success ms-3"
                            size="sm"
                            onClick={create_trip}
                          >
                            <i className="fa fa-save" /> Create TimeTable Period
                          </Button>
                        </div>
                      </Form>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={12}>
                      <h3 className="my-3 pb-3">Saved Data</h3>
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>Time Periods</th>
                            <th>First Service Start</th>
                            <th>Latest Service Start</th>
                            <th>Frequency</th>
                            <th>Kilometers</th>
                            <th>Average Speed</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredData.length > 0 ? (
                            filteredData.map((data, index) => (
                              <tr key={index}>
                                <td>{data.timePeriods}</td>
                                <td>{data.firstServiceStart}</td>
                                <td>{data.latestServiceStart}</td>
                                <td>{data.serviceFrequency}</td>
                                <td>{data.routeKilometers}</td>
                                <td>{data.averageSpeed}</td>
                                <td>
        <Button
          variant="info"
          onClick={() => handleEdit(data.id)}
          className="me-2"
        >
          Edit
        </Button>
        <Button
          variant="danger"
          onClick={() => handleDelete(data.id)}
        >
          Delete
        </Button>
        </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={7} className="text-center text-danger">No data found</td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                </div>
              </>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyCt6m1rrV32jEStp8x-cgBL0WwL9zXKOG4",
})(MultiTimeTableTab);
