import React, { useState } from "react";
import { Container, Row, Col, Form, Alert, Button } from "react-bootstrap";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { TryToolkitFree } from "../../Components/TryToolkitFree";

function ServiceFrequencyCalculator() {
  const [frequency, setFrequency] = useState("");
  const [tripsPerHour, setTripsPerHour] = useState("");
  const [error, setError] = useState("");

  const calculateTripsPerHour = (frequency) => {
    if (!isNaN(frequency) && frequency !== "") {
      return (60 / parseFloat(frequency)).toFixed(2);
    } else {
      return "";
    }
  };

  const calculateFrequency = (tripsPerHour) => {
    if (!isNaN(tripsPerHour) && tripsPerHour !== "") {
      return (60 / parseFloat(tripsPerHour)).toFixed(2);
    } else {
      return "";
    }
  };

  const handleFrequencyChange = (e) => {
    const value = e.target.value;
    setFrequency(value);
    setError("");
    setTripsPerHour(calculateTripsPerHour(value));
  };

  const handleTripsPerHourChange = (e) => {
    const value = e.target.value;
    setTripsPerHour(value);
    setError("");
    setFrequency(calculateFrequency(value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation or additional handling can be added here if needed
  };

  return (
    <>
      <Header />
      <Container>
        <Row>
          <Col>
            <h1 className="mt-4 mb-4">Service Frequency Calculator</h1>
            <Alert variant="info">
              Our Service Frequency Calculator is provided free to all our
              customers.
            </Alert>
            <p>
              The frequency of a service is a term often used in the transport
              industry. It is a term that is also regularly confused with the
              number of services in an hour.
            </p>
            <p>This tool will help you calculate:</p>
            <ul>
              <li>Trips per hour (Service Frequency To Trips Per Hour)</li>
              <li>Service Frequency (Trips Per Hour To Service Frequency)</li>
            </ul>
            <p>
              Determining the service frequency for a transport operation is a
              key component of the planning process. There are various
              approaches to determining the appropriate level of frequency:
            </p>
            <ul>
              <li>
                Policy – some jurisdictions have policy positions that establish
                a minimum level of service frequency, often referred to as
                Minimum Service Levels (MSL’s).
              </li>
              <li>
                Loading Analysis – this approach identifies the actual or
                expected number of passengers per hour or half that will use the
                service.
              </li>
              <li>
                Frequencies – often referred to as headways, meaning the time
                between services.
              </li>
            </ul>
            <p>
              The term “Turn Up and Go” is becoming more and more used to
              describe services. It’s a customer term used to inform the
              customer that no timetable is required, simply turn up and the
              next service will arrive within a short period of time.
              Essentially, turn up and go services will have a maximum wait time
              expectation. For example, no greater than 10 minutes.
            </p>
            <p>
              This tool is available under our Free, Silver, Gold, and Platinum
              packages. Refer to our Pricing page for more information.
            </p>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="frequency">
                <Form.Label>Service Frequency (minutes)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter service frequency in minutes"
                  value={frequency}
                  onChange={handleFrequencyChange}
                />
              </Form.Group>
              <Form.Group controlId="tripsPerHour">
                <Form.Label>Trips Per Hour</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter trips per hour"
                  value={tripsPerHour}
                  onChange={handleTripsPerHourChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Calculate
              </Button>
            </Form>
            {error && <Alert variant="danger">{error}</Alert>}
          </Col>
          <Col>
            <Container>
              <Row>
                <Col>
                  <h2 className="mt-4 mb-4">Formulas</h2>
                  <p>Trips Per Hour = 60 / Service Frequency</p>
                  <p>Service Frequency = 60 / Trips Per Hour</p>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default ServiceFrequencyCalculator;
