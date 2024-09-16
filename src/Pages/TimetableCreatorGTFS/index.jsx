import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../FirebaseConfig";
import { Container, Row, Col, Form, Table, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./timetable.css"; // Custom CSS file

const Timetable = () => {
  const [routes, setRoutes] = useState([]);
  const [trips, setTrips] = useState([]);
  const [calendar, setCalendar] = useState([]);
  const [stops, setStops] = useState([]);
  const [stopTimes, setStopTimes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState("");
  const [selectedTrip, setSelectedTrip] = useState("");
  const [frequency, setFrequency] = useState(5); // Overall frequency
  const [frequencies, setFrequencies] = useState({
    monday: 5,
    tuesday: 5,
    wednesday: 5,
    thursday: 5,
    friday: 5,
    saturday: 5,
    sunday: 5,
  });
  const [calculatedTimetable, setCalculatedTimetable] = useState([]);
  const [serviceFrequencies, setServiceFrequencies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const routesCollection = collection(db, "routes2");
        const tripsCollection = collection(db, "trips2");
        const calendarCollection = collection(db, "calendar2");
        const stopsCollection = collection(db, "stops2");

        const [routesSnapshot, tripsSnapshot, calendarSnapshot, stopsSnapshot] =
          await Promise.all([
            getDocs(routesCollection),
            getDocs(tripsCollection),
            getDocs(calendarCollection),
            getDocs(stopsCollection),
          ]);

        const routesData = routesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const tripsData = tripsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const calendarData = calendarSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const stopsData = stopsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setRoutes(routesData);
        setTrips(tripsData);
        setCalendar(calendarData);
        setStops(stopsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedTrip) {
      const fetchStopTimes = async () => {
        try {
          const stopTimesQuery = query(
            collection(db, "stop_times2"),
            where("trip_id", "==", selectedTrip)
          );
          const snapshot = await getDocs(stopTimesQuery);
          const stopTimesData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setStopTimes(stopTimesData);
        } catch (error) {
          console.error("Error fetching stop times:", error);
        }
      };

      fetchStopTimes();
    }
  }, [selectedTrip]);

  const handleRouteChange = (e) => {
    const routeId = e.target.value;
    setSelectedRoute(routeId);

    const selectedTrips = trips.filter((trip) => trip.route_id === routeId);

    setSelectedTrip(selectedTrips.length > 0 ? selectedTrips[0].trip_id : "");
  };

  const handleFrequencyChange = (day, value) => {
    setFrequencies({
      ...frequencies,
      [day]: parseInt(value, 10),
    });
  };

  const handleTripChange = (e) => {
    setSelectedTrip(e.target.value);
  };

  const calculateTimetable = () => {
    const updatedTimetable = stopTimes.map((stopTime) => {
      const stop = stops.find((s) => s.stop_id === stopTime.stop_id);

      const cleanArrivalTime = stopTime.arrival_time.replace(/"/g, "");
      const cleanDepartureTime = stopTime.departure_time.replace(/"/g, "");

      const initialArrivalTime = parseTime(cleanArrivalTime);
      const initialDepartureTime = parseTime(cleanDepartureTime);

      const times = [];
      let time = initialArrivalTime;

      const days = [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ];
      days.forEach((day) => {
        const frequency = frequencies[day];
        for (let i = 0; i < 15; i++) {
          const arrivalTime = formatTime(time);
          const departureTime = formatTime(
            time + (initialDepartureTime - initialArrivalTime)
          );
          times.push({
            stopName: stop ? stop.stop_name : "N/A",
            arrivalTime,
            departureTime,
          });
          time += frequency;
        }
      });

      return {
        stopId: stopTime.stop_id,
        times: times,
      };
    });

    setCalculatedTimetable(updatedTimetable);

    // Calculate service frequencies
    const freq = stopTimes.map(() => frequencies.monday); // Example using Monday's frequency, adjust as needed
    setServiceFrequencies(freq);
  };

  const parseTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}`;
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const rad = Math.PI / 180;
    const R = 6371;
    const dLat = (lat2 - lat1) * rad;
    const dLon = (lon2 - lon1) * rad;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * rad) *
        Math.cos(lat2 * rad) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const calculateRouteDistance = () => {
    let totalDistance = 0;

    for (let i = 1; i < calculatedTimetable.length; i++) {
      const prevStop = stops.find(
        (s) => s.stop_id === calculatedTimetable[i - 1].stopId
      );
      const currStop = stops.find(
        (s) => s.stop_id === calculatedTimetable[i].stopId
      );

      if (prevStop && currStop) {
        totalDistance += calculateDistance(
          parseFloat(prevStop.stop_lat),
          parseFloat(prevStop.stop_lon),
          parseFloat(currStop.stop_lat),
          parseFloat(currStop.stop_lon)
        );
      }
    }

    return totalDistance.toFixed(2);
  };
  // Helper function to filter trips by unique service ID
  const getUniqueTripsByServiceId = () => {
    const seenServiceIds = new Set();
    return trips.filter((trip) => {
      if (trip.route_id !== selectedRoute) return false;
      if (seenServiceIds.has(trip.service_id)) return false;
      seenServiceIds.add(trip.service_id);
      return true;
    });
  };

  const selectedTripData = trips.find((trip) => trip.trip_id === selectedTrip);
  const selectedCalendarData = calendar.find(
    (cal) => cal.service_id === selectedTripData?.service_id
  );

  return (
    <Container fluid className="p-3 timetable_main">
      <h1 className="text-center custom-header">
        Bus Contract Management System - Timetable
      </h1>
      <Row className="timetable_form">
        <Col md={12}>
          <Form.Group as={Row} className="mb-3 " controlId="routeSelect">
            <Form.Label column sm={2}>
              Select a Route:
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                as="select"
                onChange={handleRouteChange}
                value={selectedRoute}
              >
                <option value="">Select a Route</option>
                {routes.map((route) => (
                  <option key={route.id} value={route.route_id}>
                    {route.route_id} - {route.route_long_name}
                  </option>
                ))}
              </Form.Control>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="tripSelect">
            <Form.Label column sm={2}>
              Select a Trip:
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                as="select"
                onChange={handleTripChange}
                value={selectedTrip}
              >
                <option value="">Select a Trip</option>
                {trips
                  .filter((trip) => trip.route_id === selectedRoute)
                  .map((trip) => (
                    <option key={trip.id} value={trip.trip_id}>
                      {trip.trip_headsign} - {trip.trip_id}
                    </option>
                  ))}
              </Form.Control>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="frequencyInput">
            <Form.Label column sm={2}>
              Overall Frequency (minutes):
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="number"
                value={frequency}
                onChange={(e) => setFrequency(parseInt(e.target.value, 10))}
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <h3 className="bg-dark text-light text-center p-2 fw-bold">
            Route Detail
          </h3>

          <div className="table-responsive">
            <Table striped bordered hover size="sm" className="table-custom">
              <thead>
                <tr>
                  <th>Route Name</th>
                  <th>Service ID</th>
                  <th>Direction</th>
                  <th>Frequency (minutes)</th>
                  <th>Wheelchair Access</th>
                </tr>
              </thead>
              <tbody>
                {getUniqueTripsByServiceId().length === 0 ? (
                  <tr className="w-100">
                    <td colSpan={8} className="text-center fw-bold text-danger ">
                      No data found! please select a route to display data
                    </td>
                  </tr>
                ) : (
                  getUniqueTripsByServiceId().map((trip) => {
                    const route = routes.find(
                      (r) => r.route_id === trip.route_id
                    );
                    return route ? (
                      <tr key={trip.trip_id}>
                        <td>{route.route_long_name}</td>
                        <td>{trip.service_id}</td>
                        <td>
                          {trip.direction_id === "1" ? "Inbound" : "Outbound"}
                        </td>
                        <td>{frequency} minutes</td>
                        <td>
                          {trip.wheelchair_accessible === "1" ? "Yes" : "No"}
                        </td>
                      </tr>
                    ) : (
                      <tr key={trip.trip_id}>
                        <td colSpan={8} className="text-center">
                          No data found
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col md={12}>
          <h3 className="bg-secondary text-light text-center p-2 fw-bold">
            Service Date
          </h3>
          <div className="table-responsive timetable_form">
            <Table striped bordered hover size="sm" className="table-custom">
              <thead>
                <tr>
                  <th>
                    Direction:{" "}
                    {selectedTripData
                      ? selectedTripData.direction_id === "1"
                        ? "Inbound"
                        : "Outbound"
                      : "N/A"}
                  </th>
                  <th>Mon</th>
                  <th>Tue</th>
                  <th>Wed</th>
                  <th>Thu</th>
                  <th>Fri</th>
                  <th>Sat</th>
                  <th>Sun</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="bg-dark text-light">Operating Days</td>
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
                      {selectedCalendarData && selectedCalendarData[day] === "1"
                        ? "✔️"
                        : "❌"}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td
                    style={{
                      backgroundColor: "rgb(255 255 255 / 61%)",
                      color: "black",
                    }}
                  >
                    Service Frequency(Minutes)
                  </td>
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
                      <Form.Control
                        type="number"
                        value={frequencies[day]}
                        onChange={(e) =>
                          handleFrequencyChange(day, e.target.value)
                        }
                      />
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="bg-secondary text-light">Average_Frequency</td>
                  <td colSpan={serviceFrequencies.length}>
                    {serviceFrequencies.length > 0
                      ? (
                          serviceFrequencies.reduce(
                            (sum, freq) => sum + freq,
                            0
                          ) / serviceFrequencies.length
                        ).toFixed(2)
                      : "no data found"}
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Col>
        <Col className="mb-3 text-end">
          <Button className="custom-btn" onClick={calculateTimetable}>
            Calculate Timetable
          </Button>
        </Col>
      </Row>
      <hr className="bg-dark " />
      <Row>
        <Col md={12}>
        <h3 className="bg-secondary text-light text-center p-2 fw-bold">
            Route Details
          </h3>
          <div className="table-responsive">
            <Table striped bordered hover size="sm" className="table-custom">
              <thead>
                <tr className="w-100">
                  <th
                  colSpan={3}
                    className="text-center"
                    style={{ backgroundColor: "#00aaff", color: "white" }}
                  >
                    Route_Name: <small> {selectedRoute ? selectedRoute : "please select a route "}</small>
                   
                  </th>
                  <th colSpan={2}>
                  Service-ID: <small> {selectedTripData ? selectedTripData.service_id : "please select a route "}</small>
                  </th>
                  <th
                  colSpan={2}
                    style={{ backgroundColor: "#00aaff", color: "white" }}
                  >

                  Trip Name: <small> {selectedTripData
                      ? ` - ${selectedTripData.trip_headsign}`
                      : ""}</small>
                  </th>
                </tr>
                <tr className="text-center">
                  <th style={{ backgroundColor: "red", color: "white" }}>
                    Direction
                  </th>
                  <th style={{ backgroundColor: "#292929", color: "white" }}>
                    First_service_start_time
                  </th>
                  <th style={{ backgroundColor: "#292929", color: "white" }}>
                    Last_service_start_time
                  </th>
                  <th style={{ backgroundColor: "#292929", color: "white" }}>
                    Average_Service_frequency
                  </th>
                  <th style={{ backgroundColor: "#292929", color: "white" }}>
                    Route_ID
                  </th>
                  <th style={{ backgroundColor: "#292929", color: "white" }}>
                    Service_ID
                  </th>
                  <th style={{ backgroundColor: "#292929", color: "white" }}>
                    Other Details
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-center">
                  <td>
                    {selectedTripData
                      ? selectedTripData.direction_id === "1"
                        ? "Inbound"
                        : "Outbound"
                      : "N/A"}
                  </td>
                  <td>
                    {stopTimes.length > 0 ? stopTimes[0].arrival_time : "N/A"}
                  </td>
                  <td>
                    {stopTimes.length > 0
                      ? stopTimes[stopTimes.length - 1].arrival_time
                      : "N/A"}
                  </td>
                  <td>{frequency} minutes</td>
                  <td>{selectedRoute ? selectedRoute : "N/A"}</td>
                  <td>
                    {selectedTripData ? selectedTripData.service_id : "N/A"}
                  </td>
                  <td>Additional_information or icons here</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
      <hr className="bg-dark " />

      <Row>
        <Col md={12}>
          <h3 className="bg-dark text-light text-center p-2">Stops Schedule</h3>
          <div className="table-responsive">
            <Table striped bordered hover size="sm" className="table-custom">
              <thead>
                <tr>
                  <th className="bg-primary text-light">Stop ID</th>
                  <th className="bg-info">Stop_Name</th>
                  <th
                    className="bg-secondary text-light stop-distance"
                    colSpan={60}
                  >
                    Route times
                  </th>
                </tr>
              </thead>
              <tbody>
                {calculatedTimetable.map((stop, index) => {
                  const stopDetails = stops.find(
                    (s) => s.stop_id === stop.stopId
                  );
                  const previousStop =
                    index > 0
                      ? stops.find(
                          (s) =>
                            s.stop_id === calculatedTimetable[index - 1].stopId
                        )
                      : null;
                  const distance = previousStop
                    ? calculateDistance(
                        parseFloat(previousStop.stop_lat),
                        parseFloat(previousStop.stop_lon),
                        parseFloat(stopDetails.stop_lat),
                        parseFloat(stopDetails.stop_lon)
                      )
                    : 0;

                  return (
                    <tr key={index} className="text-center">
                      <td>{stop.stopId}</td>
                      <td>{stopDetails ? stopDetails.stop_name : "N/A"}</td>
                      <td className="stop-distance">
                        {stopDetails && previousStop
                          ? distance.toFixed(2)
                          : "0.00"}
                      </td>
                      {stop.times.map((time, timeIndex) => (
                        <React.Fragment key={timeIndex}>
                          <td>{time.arrivalTime}</td>
                        </React.Fragment>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </Col>
        <Col>
            <div className="footer-text">
              <b>Total Distance: {calculateRouteDistance()} km</b>
            </div>
          </Col>
      </Row>
    </Container>
  );
};

export default Timetable;
