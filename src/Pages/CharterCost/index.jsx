import FontAwesome from "react-fontawesome";
import FaqBannner from "../../Components/FaqBanner";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import Subscribe from "../../Components/Subscribe";
import { TryToolkitFree } from "../../Components/TryToolkitFree";

export const CharterCost = () => {
  return (
    <>
      <Header />
      <FaqBannner
        title="Service Charter Cost Calculator"
        description="Calculate the service cost based on time and distance variables"
      />
      <div className="untree_co-section ">
        <div className="container">
          <div className="row">
            <div className="col-lg text-center">
              <h2 className="section-title text-center mb-3" data-aos="fade-up">
                Service Charter Cost Calculator
              </h2>
              <p>
                Calculate the service cost based on time and distance variables
              </p>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md tools-container">
              <>
                <p>
                  Our Service Charter Cost Calculator is a handy tool to help
                  you determine the cost of a charter or proposed service based
                  on your cost per hour and or cost per kilometre. Ideal for any
                  business that uses time and distance to cost their services.
                  Some users include:
                </p>
                <ul>
                  <li className="my-2">Charter businesses,</li>
                  <li className="my-2">Freight activities,</li>
                  <li className="my-2">Contract Service Providers,</li>
                  <li className="my-2">Bus Operators,</li>
                  <li className="my-2">Traffic Planners,</li>
                  <li className="my-2"> Schedulers, and</li>
                  <li className="my-2">Transport Planners</li>
                </ul>

                <p>
                  If you need to prepare a quote based on time and distance,
                  this tool is for you. Enter the kilometres you will travel and
                  the time it will take you along with your costs for each (Time
                  & Distance) and the calculator will provide you with the
                  costing.
                </p>
                <p>
                  You can save the costing and then share it with a client or
                  customer. Your customer will receive an email with a link to
                  the costing for them to review. When you share costing with a
                  client a record of this is saved under the My Profile section
                  for future reference.
                </p>
                <p>
                  This tool is available under our Silver, Gold and Platinum
                  packages. Refer to our <b className="text-primary">Pricing</b>
                  . page for more information.
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
