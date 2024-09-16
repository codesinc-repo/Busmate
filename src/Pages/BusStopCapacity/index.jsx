import FontAwesome from "react-fontawesome";
import FaqBannner from "../../Components/FaqBanner";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import Subscribe from "../../Components/Subscribe";
import { TryToolkitFree } from "../../Components/TryToolkitFree";
export const BusStopCapacity = () => {
  return (
    <>
      <Header />
      <FaqBannner
        title="Bus Stop Capacity Check"
        description="Create a sketch of a bus stop including draw in & out and see how many buses it can accommodate"
      />
      <div className="untree_co-section ">
        <div className="container">
          <div className="row">
            <div className="col-lg text-center">
              <h2 className="section-title text-center mb-3" data-aos="fade-up">
                Bus Stop Capacity Check
              </h2>
              <p>
                This tool checks if all scheduled services can be accommodated
                efficiently within the bus stop
              </p>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md tools-container">
              <>
                <p>
                  Whether you are a traffic or transport planner, Transport
                  Toolkit is a must. Don’t waste time manually calculating:
                </p>

                <ul>
                  <li className="my-2">
                    {" "}
                    The total available kerb space in metres (includes draw in &
                    out),
                  </li>
                  <li className="my-2">
                    {" "}
                    If a bus stop is the correct length,
                  </li>
                  <li className="my-2">
                    {" "}
                    How many vehicles you require to deliver a service, or
                  </li>
                  <li className="my-2">
                    If you have allocated enough time to safely complete a
                    service
                  </li>
                </ul>

                <p>Let Transport Toolkit help</p>
                <p>
                  Our tools are designed to save you time and remove complexity
                  from various transport tasks.
                </p>
                <p>
                  o ensure you have a record of what you have shared, we will
                  save this under My Shared Reports.
                </p>
                <p>
                  The Bus Stop Capacity Check Tool identifies if sufficient
                  space is available to reasonable accommodate the volume of
                  buses scheduled to use the stop. The tool randomly allocates
                  arrival times of vehicles across a 60 minute window and adds
                  the nominated dwell time.
                </p>
                <p>
                  The Bus Stop Capacity Check Tool identifies if sufficient
                  space is available to reasonable accommodate the volume of
                  buses scheduled to use the stop. The tool randomly allocates
                  arrival times of vehicles across a 60 minute window and adds
                  the nominated dwell time.
                </p>
                <p>
                  We then calculate how many vehicles are at the stop at any one
                  time across the hour and compare it to the number of vehicles
                  that can fit on the stop. Where the number of buses at the
                  stop at any onetime (modal intervals) is greater than the
                  number that can physically fit on the stop, it is considered a
                  failure.
                </p>
                <p>
                  The total number of failures is presented as a percentage of
                  the time periods checks (model intervals). You can adjust the
                  result parameters to match your expectations. The table below
                  shows the default settings for measuring compliance levels.
                </p>
                <div className="text-center my-4">
                  <img src="/images/busstop1.png" width={"60%"} alt="" />
                </div>
                <p>
                  This tool is available under our Silver, Gold and Platinum
                  packages. Refer to our <b>Pricing</b> page for more
                  information.
                </p>
                <p>An example of our results page is shown below:</p>

                <div className="text-center my-4">
                  <img src="/images/busstop2.png" width={"60%"} alt="" />
                </div>
              </>
            </div>
          </div>
          <TryToolkitFree />
        </div>
      </div>

      <Subscribe />
      <Footer />
    </>
  );
};
