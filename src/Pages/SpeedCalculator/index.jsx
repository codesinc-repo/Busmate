import FontAwesome from "react-fontawesome";
import FaqBannner from "../../Components/FaqBanner";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import Subscribe from "../../Components/Subscribe";
import { TryToolkitFree } from "../../Components/TryToolkitFree";

export const SpeedCalculator = () => {
  return (
    <>
      <Header />
      <FaqBannner
        title="Average Speed Calculator Tool"
        description="Calculates the Average Speed based on time and distance"
      />
      <div className="untree_co-section ">
        <div className="container">
          <div className="row">
            <div className="col-lg text-center">
              <h2 className="section-title text-center mb-3" data-aos="fade-up">
                Average Speed Calculator Tool
              </h2>
              <p>Calculates the Average Speed based on time and distance</p>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md tools-container">
              <>
                <p>
                  This tool will help you calculate the average speed based on
                  the time and distance of the service. Don’t waste time trying
                  to work out the formula, enter the distance of the trip and
                  the time it has or will take, and we will show you the
                  applicable average speed.
                </p>
                <p>
                  This tool can help in various ways, whether you are
                  calculating the average speed:
                </p>
                <ul>
                  <li className="my-2">of a walking in route,</li>
                  <li className="my-2"> for a cycling trip,</li>
                  <li className="my-2">
                    to validate the accuracy of time and distance date,
                  </li>
                  <li className="my-2">of a bus service,</li>
                  <li className="my-2"> it takes to travel on a train,</li>
                  <li className="my-2">a plane travel’s at, or</li>
                  <li className="my-2"> when using your car.</li>
                </ul>

                <p>
                  The best thing about our Average Speed Calculator is it{" "}
                  <b className="text-primary">free</b>.
                </p>
                <div className="formula">
                  <h3>Average Speed Formula</h3>
                  <p>Average Speed = Total Distance / Total Time</p>
                </div>
                <p>
                  The chart below shows the average speed using various
                  distances between 10 and 160 while the journey remains
                  constant at 50 minutes.
                </p>
                <div className="text-center mt-5 mb-4">
                  <img src="/images/avrgspeed.png" alt="" />
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
