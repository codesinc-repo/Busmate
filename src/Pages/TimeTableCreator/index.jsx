import FontAwesome from "react-fontawesome";
import FaqBannner from "../../Components/FaqBanner";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import Subscribe from "../../Components/Subscribe";
import { TryToolkitFree } from "../../Components/TryToolkitFree";

export const TimeTableCreater = () => {
  return (
    <>
      <Header />
      <FaqBannner
        title="Timetable Creator"
        description="Create a transit timetable within minutes by entering a few variables, no experience required"
      />
      <div className="untree_co-section ">
        <div className="container">
          <div className="row">
            <div className="col-lg text-center">
              <h2 className="section-title text-center mb-3" data-aos="fade-up">
                Timetable Creator
              </h2>
              <p>
                Create a transit timetable within minutes by entering a few
                variables, no experience required
              </p>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md tools-container">
              <>
                <p>
                  Transport scheduling is a complex and time-consuming task
                  requiring multiple iterations to achieve an optimal result.
                  The complexity of this activity has given rise to expensive
                  software that is unaffordable for many transit operators.
                </p>
                <p>
                  Transport Toolkit has a range of user-friendly tools that help
                  you achieve sound scheduling outcomes. These include:
                </p>
                <ul>
                  <li className="my-2">Timetable creation,</li>
                  <li className="my-2">Run time assessments,</li>
                  <li className="my-2">Service costings, and</li>
                  <li className="my-2">Vehicle shift creation</li>
                </ul>
                <p>
                  Our timetable creator allows you to generate a comprehensive
                  service schedule in minutes. By nominating the number of time
                  periods required, entering the service frequency, travel time,
                  recovery time and distance our tool will create you a
                  timetable making a time consuming task easy.
                </p>
                <p>
                  You can save all your timetables and use them to create
                  Vehicle Blocks using our Vehicle Block Creator.
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
