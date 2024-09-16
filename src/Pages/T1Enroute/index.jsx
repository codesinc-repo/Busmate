import React from "react";
// import "./t1.js"
import "./t1enroute.css";
import Header from "../../Components/Header";
import Subscribe from "../../Components/Subscribe";
import Footer from "../../Components/Footer";
import Accordion from "../../Components/Accordion";
import T1Banner from "../../Components/T1banner";
import TransitInformation from "../../Components/TransitInformation";
import TransitCards from "../../Components/TransitCards";
import TransitTwoImages from "../../Components/TransitTwoImages";
import FollowUs from "../../Components/FollowUs";
const T1Enroute = () => {
  return (
    <>
      <Header />
      <T1Banner
        title="T1 ENROUTE TRANSIT SERVICE"
        subtitle="Digitalize the transit network"
        subtitle2="and connect vehicles"
        subtitle3="to collect data"
        btnlink="#"
        btntext="Request a demo"
        imgsrc="/images/images-entour/lots-of-blue-buses.png"
      />
      {/* information section */}
      <TransitInformation
        title="T1 Enroute transit service"
        imgsrc="/images/images-entour/t1enroute.png"
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
      {/* cards section */}
      <TransitCards
        card1title="Create GTFS static data"
        card1dec=" Create a detailed transit network map in our eQconnect® cloud
        transit dashboard, showing terminals, routes and stops. Add
        schedule information to generate GTFS Static feeds."
        card2title="Import GTFS Static Data"
        card2des="Import existing GTFS Static datasets into our eQconnect®
        dashboard for convenient accessibility. This enables simple
        editing and ongoing data maintenance, guaranteeing up-to-date
        and accurate information."
        card3title="Export GTFS Static Data"
        card3des="  The data generated is structured in GTFS Static format, making
        it available for export to city authorities for governance. It
        can also be integrated into third-party trip planning
        applications like Google Maps."
      />

      {/* Connect vehicles section start */}
      <div className="Connect-vehicles p-5 mt-5">
        <div className="row">
          <div className="col-lg-6 text-light p-3">
            <h1>Connect vehicles</h1>
            <p>
              Register vehicles and add relevant vehicle information. Connect
              the GPS tracking devices that are already installed or planned for
              installation in the vehicles. Vehicle location is automatically
              updated and visualized in real-time in the transit cloud
              dashboard.
            </p>
          </div>
          <div className="col-lg-6">
            <img
              src="images/images-entour/settings-devices.png"
              alt="This is an image"
            />
          </div>
        </div>
      </div>
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
      {/* two-images-section start */}
      <TransitTwoImages
        subtitle1="Analyze transit data"
        subtitle2="Create GTFS schedules"
        title1="T2 Performance"
        title2="T3 Schedules"
        btn1link="/t2Performance"
        btn2link="/t3Schedules"
      />
      {/* social media icons */}
      <FollowUs />
      <Subscribe />
      <Footer />
    </>
  );
};

export default T1Enroute;
