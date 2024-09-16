import FontAwesome from "react-fontawesome";
import FaqBannner from "../../Components/FaqBanner";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import Subscribe from "../../Components/Subscribe";
import { TryToolkitFree } from "../../Components/TryToolkitFree";

export const TimeTravelAnalyser = () => {
  return (
    <>
      <Header />
      <FaqBannner
        title="Travel Time Analyser"
        description="Quickly identify how long it takes to travel between multiple locations at different times of the day"
      />
      <div className="untree_co-section ">
        <div className="container">
          <div className="row">
            <div className="col-lg text-center">
              <h2 className="section-title text-center mb-3" data-aos="fade-up">
                Travel Time Analyser
              </h2>
              <p>
                Quickly identify how long it takes to travel between multiple
                locations at different times of the day
              </p>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md tools-container">
              <>
                <p>
                  Understanding the anticipated travel time between multiple
                  locations at various times across the day can take hours to
                  calculate. Our Travel Time Analyser allows you to nominate
                  multiple addresses/locations as well as the time you want to
                  start and finish the travel time analysis. Simply select how
                  frequent you want to get the expected travel time and we will
                  calculate all the various travel times for you within seconds.
                </p>
                <p>
                  To do this via Google Maps will take you hours, with the
                  Travel Time Analyser you will have the information within
                  minutes. You can also select if you want to know the
                  Optimistic, Best Guess or Pessimistic times from Google.
                </p>
                <p>
                  Don’t waste time, entering each origin and destination as well
                  as the departure time for each scenario, give our Travel Time
                  Analyser a try now for Free. We are sure you won’t be
                  disappointed with how much time it saves you.
                </p>
                <p>
                  Our tool will present information in the following format:
                </p>
                <div className="text-center mt-5 mb-4">
                  <img src="/images/traveltimeanalyser.png" alt="" />
                </div>
                <p>
                  This tool is available under our Gold and Platinum packages.
                  Refer to our <b>Pricing</b> page for more information.
                </p>
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
