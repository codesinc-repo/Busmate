import React, { useEffect } from "react";
const Tools = () => {
  return (
    <>
      <div className="untree_co-section pb-0">
        <div className="container">
          <div className="row mb-5 justify-content-center">
            <div className="col-lg-6 text-center">
              <h2 className="section-title text-center mb-3">Our Tools</h2>
            </div>
          </div>

          <div className="row my-5">
            <div className="col-6 col-md-6 col-lg-4 my-5" data-aos="zoom-in">
              <div className="service text-center">
                <img
                  src="images/icons/online.png"
                  width={60}
                  alt=""
                  className="mb-3"
                />
                <a href="/FrequencyCalculator">
                  <h3>Service Frequency Calculator</h3>
                </a>
                <p>
                  Calculate and convert service frequency to trips per hour and
                  vice versa
                </p>
                <a href="/Service-Frequency-Calculator">more details</a>
              </div>
            </div>
            <div className="col-6 col-md-6 col-lg-4 my-5" data-aos="zoom-in">
              <div className="service text-center">
                <img
                  src="images/icons/speedometer.png"
                  width={60}
                  alt=""
                  className="mb-3"
                />
                <a href="/Average-Speed-Calculator">
                  <h3>Average Speed Calculator Tool</h3>
                </a>
                <p>Calculates the Average Speed based on time and distance</p>
                <a href="">more details</a>
              </div>
            </div>
            <div className="col-6 col-md-6 col-lg-4 my-5" data-aos="zoom-in">
              <div className="service text-center">
                <img
                  src="images/icons/calculator.png"
                  width={60}
                  alt=""
                  className="mb-3"
                />
                <a href="/chartercost">
                  <h3>Service Charter Cost Calculator</h3>
                </a>
                <p>
                  Calculate the service cost based on time and distance
                  variables
                </p>
                <a href="">more details</a>
              </div>
            </div>
            <div className="col-6 col-md-6 col-lg-4 my-5" data-aos="zoom-in">
              <div className="service text-center">
                <img
                  src="images/icons/car.png"
                  width={60}
                  alt=""
                  className="mb-3"
                />
                <a href="/PeakVehicleEstimator">
                  <h3>Peak Vehicle Estimator</h3>
                </a>
                <p>
                  Enter the travel time, layover time, service frequency and we
                  will estimate the number of vehicles required
                </p>
                <a href="">more details</a>
              </div>
            </div>
            <div className="col-6 col-md-6 col-lg-4 my-5" data-aos="zoom-in">
              <div className="service text-center">
                <img
                  src="images/icons/hand.png"
                  width={60}
                  alt=""
                  className="mb-3"
                />
                <a href="/BusStopCapacity">
                  <h3>Bus Stop Capacity Check</h3>
                </a>
                <p>
                  This tool checks if all scheduled services can be accommodated
                  efficiently within the bus stop
                </p>
                <a href="">more details</a>
              </div>
            </div>
            <div className="col-6 col-md-6 col-lg-4 my-5" data-aos="zoom-in">
              <div className="service text-center">
                <img
                  src="images/icons/online.png"
                  width={60}
                  alt=""
                  className="mb-3"
                />
                <a href="/Fleetage">
                  <h3>Average Fleet Age</h3>
                </a>
                <p>
                  Calculate the Average Age of your fleet and check you are
                  meeting any age requirements
                </p>
                <a href="">more details</a>
              </div>
            </div>
            <div className="col-6 col-md-6 col-lg-4 my-5" data-aos="zoom-in">
              <div className="service text-center">
                <img
                  src="images/icons/bus.png"
                  width={60}
                  alt=""
                  className="mb-3"
                />
                <a href="/BusStopDesign">
                  <h3>Bus Stop Design &amp; Sketch</h3>
                </a>
                <p>
                  Create a sketch of a bus stop including draw in &amp; out and
                  see how many buses it can accommodate
                </p>
                <a href="">more details</a>
              </div>
            </div>
            <div className="col-6 col-md-6 col-lg-4 my-5" data-aos="zoom-in">
              <div className="service text-center">
                <img
                  src="images/icons/map.png"
                  width={60}
                  alt=""
                  className="mb-3"
                />
                <a href="/map">
                  <h3>Route Map</h3>
                </a>
                <p>
                  This tool creates a route between two or more locations and
                  includes distances and time estimates
                </p>
                <a href="">more details</a>
              </div>
            </div>
            <div className="col-6 col-md-6 col-lg-4 my-5" data-aos="zoom-in">
              <div className="service text-center">
                <img
                  src="images/icons/calendar.png"
                  width={60}
                  alt=""
                  className="mb-3"
                />
                <a href="/TimeTableCreater">
                  <h3>Timetable Creator</h3>
                </a>
                <p>
                  Create a transit timetable within minutes by entering a few
                  variables, no experience required
                </p>
                <a href="">more details</a>
              </div>
            </div>
            <div className="col-6 col-md-6 col-lg-4 my-5" data-aos="zoom-in">
              <div className="service text-center">
                <img
                  src="images/icons/online.png"
                  width={60}
                  alt=""
                  className="mb-3"
                />
                <a href="">
                  <h3>Vehicle Block Creator</h3>
                </a>
                <p>
                  Create Vehicle Shifts quickly and easily. Includes a
                  comprehensive breakdown of distance, hours, peak buses and
                  costs
                </p>
                <a href="">more details</a>
              </div>
            </div>
            <div className="col-6 col-md-6 col-lg-4 my-5" data-aos="zoom-in">
              <div className="service text-center">
                <img
                  src="images/icons/timetable.png"
                  width={60}
                  alt=""
                  className="mb-3"
                />
                <a href="">
                  <h3>Multiple Stop Timetable</h3>
                </a>
                <p>
                  Create a detailed transit timetables with multiple stops and
                  variable running times easily and efficiently
                </p>
                <a href="">more details</a>
              </div>
            </div>
            <div className="col-6 col-md-6 col-lg-4 my-5" data-aos="zoom-in">
              <div className="service text-center">
                <img
                  src="images/icons/expectation.png"
                  width={60}
                  alt=""
                  className="mb-3"
                />
                <a href="">
                  <h3>Travel Time Analyser</h3>
                </a>
                <p>
                  Quickly identify how long it takes to travel between multiple
                  locations at different times of the day
                </p>
                <a href="">more details</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Tools;
