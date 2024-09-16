import React from "react";
// import "./t1.js"
import "./T7Insights.css";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import T1Banner from "../../Components/T1banner";
import TransitInformation from "../../Components/TransitInformation";
import TransitCards from "../../Components/TransitCards";
import FollowUs from "../../Components/FollowUs";
import TransitTwoImages from "../../Components/TransitTwoImages";

const T7Insights = () => {
  return (
    <>
      <Header />
      <T1Banner
        title="T7 ENROUTE TRANSIT SERVICE"
        subtitle="Gain insights into your fleet’s"
        subtitle2="performance to enhance"
        subtitle3="operational efficiency"
        btnlink="#"
        btntext="Request a demo"
        imgsrc="/images/images-entour/insights.png"
      />
      {/* information section */}
      <TransitInformation
        title="T7 Insights transit service"
        imgsrc="/images/images-entour/t1enroute.png"
        detail=" Our T7 Insights offer operators in-depth insights on operational
                performance and trends, improving decision-making, cost control, and
                compliance. These insights help optimize resource use, cost control,
                uphold service quality, and make informed decisions for better
                financial health and operational efficiency."
      />

      {/* cards section */}
      <TransitCards
        card1title="control and efficiency"
        card1dec=" Detailed on vehicle usage, including revenue and
                non-revenue time and distance, accurate cost management
                and identifies potential savings."
        card2title="Schedule adherence"
        card2des="Evaluating trip adherence, frequency, and timeliness is vital
                for service quality, passenger satisfaction, and meeting agency
                standards."
        card3title="Runtime analytics"
        card3des="Detailed runtime variability data aids in cost-effective route
                and schedule planning, promoting efficient asset utilization and
                adherence to schedules."
      />

      <>
        {/* image with text */}
        <div className="images-text p-5 mt-5">
          <div className="row p-4">
            <div className="col-lg-6 text-light fs-6">
              <h3 className="">Minimize dwell and idle times</h3>
              <p>
                Analyzing dwell times improves bus turnarounds, enhances
                efficiency, and cuts costs. Assessing historical idle times
                helps identify areas for better scheduling or vehicle
                reassignment, further boosting operational efficiency.
              </p>
              <h3 className="">Fleet and vehicle utilization</h3>
              <p>
                Evaluating fleet and vehicle utilization, service stability, and
                downtime helps in identifying maintenance or replacement
                requirements.
              </p>
            </div>
            <div className="col-lg-6 side-image-one">
              <img src="/images/images-entour/Fleet+capacity.png" alt="" />
            </div>
          </div>
          <div className="row p-4">
            <div className="col-lg-6 image-2">
              <img
                src="/images/images-entour/Layover.png"
                className=""
                style={{ height: 300, width: "auto" }}
                alt=""
              />
            </div>
            <div className="col-lg-6 text-light fs-6">
              <h3>Risk management and contingency planning</h3>
              <p>
                Comprehensive data enables risk identification, such as variable
                runtimes, frequent vehicle issues, schedule deviations, or
                unusual fuel consumption.
              </p>
              <h3>Performance benchmarking</h3>
              <p>
                Access to detailed data enables operators to benchmark
                performance, identify improvement areas, and stay competitive.
              </p>
            </div>
          </div>
        </div>
      </>
      <TransitTwoImages
        subtitle1="Real-Time Fleet Monitoring"
        title1="T8 Governance"
        btn1link="/t8governance"
        subtitle2="Optimize operations"
        title2="For Operators"
        btn2link="/foroperators"
      />
      {/* social media icons */}
      <FollowUs />

      <Footer />
    </>
  );
};
export default T7Insights;
