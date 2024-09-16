import FontAwesome from "react-fontawesome";
import FaqBannner from "../../Components/FaqBanner";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import Subscribe from "../../Components/Subscribe";
import { TryToolkitFree } from "../../Components/TryToolkitFree";

export const VehicleBlockCreator = () => {
  return (
    <>
      <Header />
      <FaqBannner
        title="Vehicle Block Creator"
        description="Create Vehicle Shifts quickly and easily. Includes a comprehensive breakdown of distance, hours, peak buses and costs"
      />
      <div className="untree_co-section ">
        <div className="container">
          <div className="row">
            <div className="col-lg text-center">
              <h2 className="section-title text-center mb-3" data-aos="fade-up">
                Vehicle Block Creator
              </h2>
              <p>
                Create Vehicle Shifts quickly and easily. Includes a
                comprehensive breakdown of distance, hours, peak buses and costs
              </p>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md tools-container">
              <>
                <p>
                  Linking trips together, creating vehicle blocks or shift, is a
                  complex and time-consuming task. Creating Vehicle Shifts is an
                  important step in creating a Transport schedule. Due to the
                  various options and variables, achieving an efficient solution
                  can be very time consuming, especially if you are completing
                  the task manually.
                </p>
                <p>
                  Our Vehicle Block Creator tool will turn your timetables into
                  Vehicle Shifts quickly and easily. Our algorithms and logic
                  will identify interlining options and when to break a block
                  and send the vehicle back to the depot.
                </p>
                <p>
                  Our tool will also provide you with a comprehensive breakdown
                  of the hours and kilometres required to operate the schedule.
                  This breakdown includes the following:
                </p>
                <ul className="formula">
                  <h3>HOURS</h3>
                  <li className="my-2"> In Service</li>
                  <li className="my-2"> Dead Running</li>
                  <li className="my-2">Layover</li>
                  <li className="my-2">Pull In</li>
                  <li className="my-2"> Pull Out</li>
                </ul>
                <ul className="formula">
                  <h3>KILOMETRES</h3>
                  <li className="my-2"> In Service</li>
                  <li className="my-2"> Dead/Special Running</li>
                  <li className="my-2"> Pull Out</li>
                  <li className="my-2">Pull In</li>
                </ul>

                <p>
                  A comprehensive costing is also available which is ideal for
                  tenders and testing cost changes when a timetable is altered.
                  Out tool also provides information on the number of Peak
                  Vehicles required. A chart showing the number of vehicles by
                  time is also available.
                </p>
                <p>Peak Vehicle Chart example:</p>
                <div className="text-center mt-5 mb-4">
                  <img src="/images/vehicleblock.png" width={"90%"} alt="" />
                </div>
                <p>
                  The tool captures and uses Depot Pulls and Dead Running
                  variables (kilometres and time) information entered by the
                  user to generate the solution. Perform “what ifs” quickly and
                  compare the results. This will help you optimise the timetable
                  to make sure your schedule is satisfactory.
                </p>
                <p>
                  It is important to remember, a bad or inefficient timetable
                  cannot be turned into an efficient vehicle block solution. The
                  key to creating efficient and cost-effective schedules starts
                  with a great timetable.
                </p>
                <p>
                  For more information on transport scheduling, please refer to
                  the Resources section of our site.
                </p>
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
