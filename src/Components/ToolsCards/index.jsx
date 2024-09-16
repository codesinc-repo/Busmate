import "./tools.css";

export const ToolsCards = () => {
  const imgPath = "/images/curasol img2.jpg";
  return (
    <div className="untree_co-section pb-0">
      <div className="container">
        <div className="row mb-5 justify-content-center">
          <div className="col-lg-6 text-center">
            <h2 className="section-title text-center mb-3">Our Tools</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="service-item service-dianuj">
              <div className="service-single">
                <div className="service-img">
                  <img src={imgPath} alt="Service Frequency Calculator" />
                </div>
                <div className="service-content long-heading">
                  <h3>
                    <i>
                      <img
                        src="/images/icons/frcal.png"
                        width={120}
                        alt="Service Frequency Calculator"
                      />
                    </i>
                    <a className="text-light" href="/frequencycalculator">
                      Service Frequency Calculator
                    </a>
                  </h3>
                  <p>
                    Calculate and convert service frequency to trips per hour
                    and vice versa
                  </p>
                  <a href="/frequencycalculator">Check Now</a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="service-item service-dianuj">
              <div className="service-single">
                <div className="service-img">
                  <img src={imgPath} alt="Average Speed Calculator Tool" />
                </div>
                <div className="service-content long-heading">
                  <h3>
                    <i>
                      <img
                        src="/images/icons/speedcal.png"
                        width={120}
                        alt="Average Speed Calculator Tool"
                      />
                    </i>
                    <a className="text-light" href="/SpeedCalculator">
                      Average Speed Calculator Tool
                    </a>
                  </h3>
                  <p>Calculates the Average Speed based on time and distance</p>
                  <a href="/AverageSpeedCalculator">Check Now</a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="service-item service-dianuj">
              <div className="service-single">
                <div className="service-img">
                  <img src={imgPath} alt="Service Charter Cost Calculator" />
                </div>
                <div className="service-content long-heading">
                  <h3>
                    <i>
                      <img
                        src="/images/icons/costcal.png"
                        width={120}
                        alt="Service Charter Cost Calculator"
                      />
                    </i>
                    <a className="text-light" href="/chartercost">
                      Service Charter Cost Calculator
                    </a>
                  </h3>
                  <p>
                    Calculate the service cost based on time and distance
                    variables
                  </p>
                  <a href="/chartercost">Check Now</a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="service-item service-dianuj">
              <div className="service-single">
                <div className="service-img">
                  <img src={imgPath} alt="Peak Vehicle Estimator" />
                </div>
                <div className="service-content ">
                  <h3>
                    <i>
                      <img
                        src="/images/icons/vehicle.png"
                        width={120}
                        alt="Peak Vehicle Estimator"
                      />
                    </i>
                    <a className="text-light" href="/PeakVehicleEstimator">
                      Peak Vehicle Estimator
                    </a>
                  </h3>
                  <p>
                    Enter the travel time, layover time, service frequency and
                    we will estimate the number of vehicles required
                  </p>
                  <a href="/PeakVehicleEstimator">Check Now</a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="service-item service-dianuj">
              <div className="service-single">
                <div className="service-img">
                  <img src={imgPath} alt="Bus Stop Capacity Check" />
                </div>
                <div className="service-content long-heading">
                  <h3>
                    <i>
                      <img
                        src="/images/icons/busstop.png"
                        width={120}
                        alt="Bus Stop Capacity Check"
                      />
                    </i>
                    <a className="text-light" href="/BusStopCapacity">
                      Bus Stop Capacity Check
                    </a>
                  </h3>
                  <p>
                    This tool checks if all scheduled services can be
                    accommodated efficiently within the bus stop
                  </p>
                  <a href="/BusStopCapacity">Check Now</a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="service-item service-dianuj">
              <div className="service-single">
                <div className="service-img">
                  <img src={imgPath} alt="Average Fleet Age" />
                </div>
                <div className="service-content ">
                  <h3>
                    <i>
                      <img
                        src="/images/icons/fleetage.png"
                        width={120}
                        alt="Average Fleet Age"
                      />
                    </i>
                    <a className="text-light" href="/FleetAge">
                      Average Fleet Age
                    </a>
                  </h3>
                  <p>
                    Calculate the Average Age of your fleet and check you are
                    meeting any age requirements
                  </p>
                  <a href="/FleetAge">Check Now</a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="service-item service-dianuj">
              <div className="service-single">
                <div className="service-img">
                  <img src={imgPath} alt="Bus Stop Design & Sketch" />
                </div>
                <div className="service-content long-heading">
                  <h3>
                    <i>
                      <img
                        src="/images/icons/stopdesign.png"
                        width={120}
                        alt="Bus Stop Design & Sketch"
                      />
                    </i>
                    <a className="text-light" href="/busstopdesign">
                      Bus Stop Design &amp; Sketch
                    </a>
                  </h3>
                  <p>
                    Create a sketch of a bus stop including draw in &amp; out
                    and see how many buses it can accommodate
                  </p>
                  <a href="/busstopdesign">Check Now</a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="service-item service-dianuj">
              <div className="service-single">
                <div className="service-img">
                  <img src={imgPath} alt="Route Map" />
                </div>
                <div className="service-content ">
                  <h3>
                    <i>
                      <img
                        src="/images/icons/routemap.png"
                        width={120}
                        alt="Route Map"
                      />
                    </i>
                    <a className="text-light" href="/map">
                      Route Map
                    </a>
                  </h3>
                  <p>
                    This tool creates a route between two or more locations and
                    includes distances and time estimates
                  </p>
                  <a href="/map">Check Now</a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="service-item service-dianuj">
              <div className="service-single">
                <div className="service-img">
                  <img src={imgPath} alt="Timetable Creator" />
                </div>
                <div className="service-content ">
                  <h3>
                    <i>
                      <img
                        src="/images/icons/time.png"
                        width={120}
                        alt="Timetable Creator"
                      />
                    </i>
                    <a className="text-light" href="/timetablecreator">
                      Timetable Creator
                    </a>
                  </h3>
                  <p>
                    Create a transit timetable within minutes by entering a few
                    variables, no experience required
                  </p>
                  <a href="/timetablecreator">Check Now</a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="service-item service-dianuj">
              <div className="service-single">
                <div className="service-img">
                  <img src={imgPath} alt="Vehicle Block Creator" />
                </div>
                <div className="service-content ">
                  <h3>
                    <i>
                      <img
                        src="/images/icons/block.png"
                        width={120}
                        alt="Vehicle Block Creator"
                      />
                    </i>
                    <a className="text-light" href="/vehicleblockcreator">
                      Vehicle Block Creator
                    </a>
                  </h3>
                  <p>
                    Create Vehicle Shifts quickly and easily. Includes a
                    comprehensive breakdown of distance, hours, peak buses and
                    costs
                  </p>
                  <a href="/vehicleblockcreator">Check Now</a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="service-item service-dianuj">
              <div className="service-single">
                <div className="service-img">
                  <img src={imgPath} alt="Multiple Stop Timetable" />
                </div>
                <div className="service-content long-heading">
                  <h3>
                    <i>
                      <img
                        src="/images/icons/multistop.png"
                        width={120}
                        alt="Multiple Stop Timetable"
                      />
                    </i>
                    <a className="text-light" href="/multiple_stop_timetable">
                      Multiple Stop Timetable
                    </a>
                  </h3>
                  <p>
                    Create a detailed transit timetables with multiple stops and
                    variable running times easily and efficiently
                  </p>
                  <a href="/multiple_stop_timetable">Check Now</a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="service-item service-dianuj">
              <div className="service-single">
                <div className="service-img">
                  <img src={imgPath} alt="Travel Time Analyser" />
                </div>
                <div className="service-content ">
                  <h3>
                    <i>
                      <img
                        src="/images/icons/itravel.png"
                        width={120}
                        alt="Travel Time Analyser"
                      />
                    </i>
                    <a className="text-light" href="/TimeTravelAnalyser">
                      Travel Time Analyser
                    </a>
                  </h3>
                  <p>
                    Quickly identify how long it takes to travel between
                    multiple locations at different times of the day
                  </p>
                  <a href="/TimeTravelAnalyser">Check Now</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
