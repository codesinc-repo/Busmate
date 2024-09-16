import React from "react";
// import "./t1.js"
import "./T8Governance.css";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import T1Banner from "../../Components/T1banner";
import TransitInformation from "../../Components/TransitInformation";
import TransitCards from "../../Components/TransitCards";
import FollowUs from "../../Components/FollowUs";
import TransitTwoImages from "../../Components/TransitTwoImages";

const T8Governance = () => {
  return (
    <>
      <Header />
      <T1Banner
        title="T8 GOVERNANCE TRANSIT SERVICE"
        subtitle="Access aggregated historical"
        subtitle2="insights into public transport"
        // subtitle3=""
        btnlink="#"
        btntext="Request a demo"
        imgsrc="/images/images-entour/T8.png"
      />
      <TransitInformation
        title="T8 Governance transit service"
        imgsrc="/images/images-entour/T8_Governance.png"
        detail="Our T8 Governance transit service provides public transport
                authorities with crucial insights into the performance of public
                transport services. These insights are vital for effective operator
                governance, scheduling, and planning within transport agencies and
                cities."
      />

      {/* cards */}
      <div className="cards-t2">
        <div className="container">
          <div className="row d-flex justify-content-evenly align-items-center">
            <div
              className="col-lg-4 text-center background-color-card"
              style={{ width: "33%" }}
            >
              <img src="images/images-entour/scedules.png" alt="" />
              <h4>Schedule adherence</h4>
              <p>
                Ensures punctual services, boosting passenger confidence,
                satisfaction, and operational efficiency. The more schedule is
                more punctual. The best in the punctuality.
              </p>
            </div>
            <div
              className="col-lg-4 text-center background-color-card"
              style={{ width: "33%" }}
            >
              <img src="images/images-entour/planning.png" alt="" />
              <h4>Frequency and departure</h4>
              <p>
                Provides insights availability and frequency, in adapting to
                changing demand patterns and improving accessibility. The
                frequency much important in the GTFs services
              </p>
            </div>
            <div
              className="col-lg-4 text-center background-color-card"
              style={{ width: "33%" }}
            >
              <img src="images/images-entour/operators (1).png" alt="" />
              <h4>Vehicle fleet efficiency</h4>
              <p>
                Offers essential data on registered vehicles, trips, and actual
                mileage to help authorities and operators optimize fleet size
                and deployment for cost-effective operations.
              </p>
            </div>
          </div>
          <div className="row row d-flex justify-content-evenly align-items-center mt-3">
            <div
              className="col-lg-4 text-center background-color-card"
              style={{ width: "33%" }}
            >
              <img src="images/images-entour/kpi.png" alt="" />
              <h4>control and efficiency</h4>
              <p>
                Detailed on vehicle usage, including revenue and non-revenue
                time and distance, accurate cost management and identifies
                potential savings.
              </p>
            </div>
            <div
              className="col-lg-4 text-center background-color-card"
              style={{ width: "33%" }}
            >
              <img src="images/images-entour/passengers.png" alt="" />
              <h4>control and efficiency</h4>
              <p>
                Detailed on vehicle usage, including revenue and non-revenue
                time and distance, accurate cost management and identifies
                potential savings.
              </p>
            </div>
            <div
              className="col-lg-4 text-center background-color-card"
              style={{ width: "33%" }}
            >
              <img src="images/images-entour/KPI_1.png" alt="" />
              <h4>control and efficiency</h4>
              <p>
                Detailed on vehicle usage, including revenue and non-revenue
                time and distance, accurate cost management and identifies
                potential savings.
              </p>
            </div>
          </div>
        </div>
      </div>

      <TransitTwoImages
        subtitle1="More riders. More revenue."
        title1="T5 GTFS Realtime"
        btn1link="/t5gtfsrealtime"
        subtitle2="Make transit data available"
        title2="For Authorities"
        btn2link="/forauthorities"
      />
      {/* two images */}

      {/* social media icons */}
      <FollowUs />

      <Footer />
    </>
  );
};

export default T8Governance;
