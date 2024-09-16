import FontAwesome from "react-fontawesome";
import FaqBannner from "../../Components/FaqBanner";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import Subscribe from "../../Components/Subscribe";
import { TryToolkitFree } from "../../Components/TryToolkitFree";

export const PeakVehicleEstimator = () => {
  return (
    <>
      <Header />
      <FaqBannner
        title="Peak Vehicle Estimator"
        description="Enter the travel time, layover time, service frequency and we will estimate the number of vehicles required"
      />
      <div className="untree_co-section ">
        <div className="container">
          <div className="row">
            <div className="col-lg text-center">
              <h2 className="section-title text-center mb-3" data-aos="fade-up">
                Peak Vehicle Estimator
              </h2>
              <p>
                Enter the travel time, layover time, service frequency and we
                will estimate the number of vehicles required
              </p>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md tools-container">
              <>
                <p>
                  Ever wanted to quickly understand how many vehicles you would
                  need to operate a service without the need to complete a
                  scheduling exercise. We have the tool for you.
                </p>
                <p>
                  With three simple inputs, we will estimate the number of
                  vehicles required to deliver the intended service. Our Peak
                  Vehicle Estimator will calculate the number of vehicles you
                  require based on the following user inputs:
                </p>

                <ul>
                  <li className="my-2">Service Duration (mins),</li>
                  <li className="my-2">
                    Recovery/layover duration (mins), and
                  </li>
                  <li className="my-2">Service Frequency (mins).</li>
                </ul>

                <p>
                  The estimator assumes a two way operation to determine the
                  vehicles required. If you are interlining the service with
                  another route, the total number of vehicles required may
                  differ based on a number of factors. Refer to our Timetable
                  Creator and Vehicle Block Creator for more information on
                  scheduling vehicles and calculating peak buses when
                  interlining is required.
                </p>
                <p>
                  We will also provide you with a sensitivity analysis based on
                  varying Service Durations. The estimator automatically
                  provides you with will the number of vehicles required if the
                  Service Duration is increased by 10%, 20% and 40%. This helps
                  you understand the implications and sensitivity of increased
                  travel times.
                </p>
                <p>
                  Don’t waste hours creating a timetable and vehicle shifts to
                  work out how many vehicles you need when it’s not necessary.
                  This tool is essential for:
                </p>
                <ul>
                  <li className="my-2"> Transport Planners,</li>
                  <li className="my-2">Bus Schedulers,</li>
                  <li className="my-2"> Train Planners,</li>
                  <li className="my-2">Transport Consultants, and</li>
                  <li className="my-2">Fixed route Freight Operators</li>
                </ul>
                <p>
                  You can save and share your results with clients and
                  colleagues easily while maintaining an appropriate record for
                  future reference.
                </p>
              </>
            </div>
            <div className="text-center my-4">
              <img src="/images/peakvehicle.png" width={"80%"} alt="" />
            </div>
            <p>
              This tool is available under our Silver, Gold and Platinum
              packages. Refer to our <b>Pricing</b> page for more information.
            </p>
          </div>
          <TryToolkitFree />
        </div>
      </div>

      <Subscribe />
      <Footer />
    </>
  );
};
