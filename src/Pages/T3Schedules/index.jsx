import React from "react";
import "./T3Schedules.css";
import Header from "../../Components/Header";

import Footer from "../../Components/Footer";
import Accordion from "../../Components/Accordion";
import T1Banner from "../../Components/T1banner";
import TransitInformation from "../../Components/TransitInformation";
import TransitCards from "../../Components/TransitCards";
import TransitTwoImages from "../../Components/TransitTwoImages";
import Subscribe from "../../Components/Subscribe";
import FollowUs from "../../Components/FollowUs";

const T3Schedules = () => {
  return (
    <>
      <Header />
      <T1Banner
        title="T3 Schedules transit service"
        subtitle="Create Dynamic Schedules"
        subtitle2="and adjust frequency needs"
        subtitle3="to collect data"
        btnlink="#"
        btntext="Request a demo"
        imgsrc="/images/images-entour/Frequency+and+vehicles+1.0.png"
      />
      {/* information section */}
      <TransitInformation
        title="T3 Schedules transit service"
        imgsrc="/images/images-entour/T3_Schedules.png"
        detail=" With our T1 Enroute transit service you easily start the
              digitalization process of your public transport system. This service
                 is the first step in creating GTFS Static feeds. It will help you to
             understand the static topology data of your transit network, and
              serve as the foundation for collecting data from vehicles operating
              on routes. This data, when combined with our T2 Performance transit
             service, empowers you to gain insights into the performance of
                vehicles assigned to specific routes, as well as visualize time
              bands and start creating schedules."
      />
      {/* <!-- image with text --> */}
      <div className="images-text p-5 mt-5">
        <div className="row p-4">
          <div className="col-lg-6 text-light fs-6">
            <h3>Create new schedules with dynamic schedule data</h3>
            <p>
              Our system analyzes historical trip data to identify significant
              trip counts in 15-minute intervals throughout the day for
              different day types and route directions. It highlights time bands
              with consistent departure frequencies.
            </p>
            <p>
              Additionally, the system tracks real-time vehicle counts and
              visualizes them for different routes during the day. It calculates
              and displays the Passenger Capacity for each route direction based
              on the maximum registered passenger capacity for each vehicle.
            </p>
          </div>
          <div className="col-lg-6 side-image">
            <img src="/images/images-entour/Passenger+capacity.png" alt="" />
          </div>
        </div>
        <div className="row p-4">
          <div className="col-lg-6 image-2">
            <img
              src="/images/images-entour/lots-of-blue-buses (1).png"
              className=""
              style={{ height: 300, width: "auto" }}
              alt=""
            />
          </div>
          <div className="col-lg-6 text-light fs-6">
            <h3>Edit the dynamic schedule</h3>
            <p>
              During peak hours, you can prioritize departure frequencies in the
              Dynamic Schedule for outbound or inbound directions. Time band
              editing allows adjustments to departure frequencies by altering
              the time band's upper level.
            </p>
            <p>
              For more significant changes, vehicle blocks can be modified, and
              the system will update trip expectations and frequency time bands.
              Export the dynamic schedules as GTFS Static files covering the
              entire transit network.
            </p>
          </div>
        </div>
      </div>

      {/* transit services packages */}
      <div className="Transit-service-packages overflow-hidden mt-5">
        <div className="row p-5">
          <div className="col-lg-6 image-insight d-flex">
            <img src="images/images-entour/insights.png" alt="" />
          </div>
          <div className="col-lg-5">
            <h1>Transit service packages</h1>
            <p className="mt-5 fs-5">
              For high utilization, check our transit service packages with T1
              Enroute.
            </p>
            <Accordion />
          </div>
        </div>
      </div>

      <>
        {/* two images */}
        <TransitTwoImages
          subtitle1="Learn more about GTFS data"
          title1="T4 GTFS Static"
          btn1link="/t4gtfsstatic"
          subtitle2="More riders. More revenue."
          title2="T5 GTFS Realtime"
          btn2link="/t5gtfsrealtime"
        />
        {/* social media icons */}
        <FollowUs />
        <Subscribe />
      </>
      <Footer />
    </>
  );
};
export default T3Schedules;
