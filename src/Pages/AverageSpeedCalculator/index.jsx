import React, { useState } from "react";
import { Container, Row, Col, Form, Alert, Button } from "react-bootstrap";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

function AverageSpeedCalculator() {
  const [distance, setDistance] = useState("");
  const [time, setTime] = useState("");
  const [averageSpeed, setAverageSpeed] = useState("");
  const [error, setError] = useState("");

  const calculateAverageSpeed = () => {
    if (
      !isNaN(distance) &&
      !isNaN(time) &&
      distance !== "" &&
      time !== "" &&
      time !== 0
    ) {
      const speed = (parseFloat(distance) / parseFloat(time)).toFixed(2);
      setAverageSpeed(speed);
    } else {
      setAverageSpeed("");
      setError("Please enter valid values for distance and time.");
    }
  };

  const handleDistanceChange = (e) => {
    setDistance(e.target.value);
    setError("");
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateAverageSpeed();
  };

  return (
    <>
      <Header />
      <Container>
        <Row>
          <Col>
            <h1 className="mt-4 mb-4">Average Speed Calculator</h1>
            <Alert variant="info">
              Calculate the Average Speed based on time and distance.
            </Alert>
            <p>
              Welcome to our Average Speed Calculator tool. This tool helps you
              determine the average speed of travel given the distance traveled
              and the time taken.
            </p>
            <p>
              Average speed is a measure of how quickly an object moves over a
              given distance. It is commonly expressed in miles per hour (mph)
              or kilometers per hour (km/h). Average speed is a fundamental
              concept in physics and is used in various fields such as
              transportation, sports, and engineering.
            </p>
            <p>
              To use the calculator, simply enter the distance traveled and the
              time taken in the respective fields below. Then click the
              "Calculate" button, and the average speed will be displayed.
            </p>
            <p>The formula to calculate average speed is:</p>
            <p className="font-weight-bold">Average Speed = Distance / Time</p>
            <p>Where:</p>
            <ul>
              <li>
                <strong>Distance:</strong> The total distance traveled, measured
                in miles or kilometers.
              </li>
              <li>
                <strong>Time:</strong> The total time taken to travel the
                distance, measured in hours.
              </li>
            </ul>
            <p>
              It's important to note that average speed represents the overall
              speed of travel over a certain distance and time period. It may
              not reflect the actual speed at any given moment during the
              journey, as speed can vary due to factors such as traffic,
              terrain, and weather conditions.
            </p>
            <p>
              Using the Average Speed Calculator can be helpful for various
              purposes, such as planning travel routes, estimating travel times,
              and analyzing performance in sports and other activities.
            </p>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="distance">
                <Form.Label>Distance (in miles or kilometers)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter distance"
                  value={distance}
                  onChange={handleDistanceChange}
                />
              </Form.Group>
              <Form.Group controlId="time">
                <Form.Label>Time (in hours)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter time"
                  value={time}
                  onChange={handleTimeChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Calculate
              </Button>
            </Form>
            {averageSpeed && (
              <Alert variant="success" className="mt-3">
                Average Speed: {averageSpeed} mph or km/h
              </Alert>
            )}
            {error && (
              <Alert variant="danger" className="mt-3">
                {error}
              </Alert>
            )}
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default AverageSpeedCalculator;
