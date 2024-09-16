import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../FirebaseConfig';
import { Table, Button, Form } from 'react-bootstrap';

const TimeTable = () => {
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [stops, setStops] = useState([]);
  const [trips, setTrips] = useState([]);
  const [stopTimes, setStopTimes] = useState([]);
  const [frequency, setFrequency] = useState(5); // Frequency in minutes
  const [calculatedTimetable, setCalculatedTimetable] = useState([]);

  useEffect(() => {
    const fetchRoutes = async () => {
      const routeCollection = collection(db, 'routes2');
      const routeSnapshot = await getDocs(routeCollection);
      const routeList = routeSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRoutes(routeList);
    };

    fetchRoutes();
  }, []);

  const handleRouteSelect = async (routeId) => {
    setSelectedRoute(routeId);

    // Fetch stops for the selected route
    const stopsCollection = collection(db, 'stops2');
    const stopsSnapshot = await getDocs(stopsCollection);
    const stopsList = stopsSnapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(entry => entry.routeId === routeId);
    setStops(stopsList);

    // Fetch trips for the selected route
    const tripsCollection = collection(db, 'trips2');
    const tripsSnapshot = await getDocs(tripsCollection);
    const tripsList = tripsSnapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(entry => entry.routeId === routeId);
    setTrips(tripsList);

    // Fetch stop times for the selected route
    const stopTimesCollection = collection(db, 'stop_times2');
    const stopTimesSnapshot = await getDocs(stopTimesCollection);
    const stopTimesList = stopTimesSnapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(entry => tripsList.some(trip => trip.trip_id === entry.trip_id));
    setStopTimes(stopTimesList);
  };

  const calculateTimetable = () => {
    const updatedTimetable = trips.map((trip) => {
      const tripStopTimes = stopTimes.filter(st => st.trip_id === trip.trip_id);
      
      const updatedStops = tripStopTimes.flatMap((stopTime) => {
        const stop = stops.find(s => s.stop_id === stopTime.stop_id);
        const initialArrivalTime = parseTime(stopTime.arrival_time);
        const initialDepartureTime = parseTime(stopTime.departure_time);

        // Generate multiple times based on the frequency
        const times = [];
        for (let time = initialArrivalTime; time < 24 * 60; time += frequency) {
          const arrivalTime = formatTime(time);
          const departureTime = formatTime(time + (initialDepartureTime - initialArrivalTime));
          times.push({
            stopName: stop.stop_name,
            arrivalTime,
            departureTime,
          });
        }

        return times;
      });

      return {
        ...trip,
        stops: updatedStops,
      };
    });

    setCalculatedTimetable(updatedTimetable);
  };

  const parseTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <Form.Group controlId="routeSelect">
        <Form.Label>Select a route</Form.Label>
        <Form.Control as="select" onChange={(e) => handleRouteSelect(e.target.value)}>
          <option value="">Select a route</option>
          {routes.map(route => (
            <option key={route.id} value={route.id}>{route.route_long_name}</option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="frequencyInput">
        <Form.Label>Frequency (minutes)</Form.Label>
        <Form.Control
          type="number"
          value={frequency}
          onChange={(e) => setFrequency(parseInt(e.target.value))}
        />
      </Form.Group>

      {stops.length > 0 && (
        <div>
          <Button onClick={calculateTimetable}>Calculate Timetable</Button>

          {calculatedTimetable.length > 0 && (
            <div>
              <h3>Calculated Timetable</h3>
              {calculatedTimetable.map((trip, tIndex) => (
                <div key={trip.id}>
                  <h4>Trip: {trip.tripName || trip.trip_id}</h4>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Stop</th>
                        <th>Arrival Time</th>
                        <th>Departure Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {trip.stops.map((entry, sIndex) => (
                        <tr key={sIndex}>
                          <td>{entry.stopName}</td>
                          <td>{entry.arrivalTime}</td>
                          <td>{entry.departureTime}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TimeTable;
