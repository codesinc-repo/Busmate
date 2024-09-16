import React from "react";
import "./T5GTFSRealtime.css";
import Header from "../../Components/Header";

import Footer from "../../Components/Footer";
import Accordion from "../../Components/Accordion";
import T1Banner from "../../Components/T1banner";
import TransitInformation from "../../Components/TransitInformation";
import TransitCards from "../../Components/TransitCards";
import FollowUs from "../../Components/FollowUs";
import TransitTwoImages from "../../Components/TransitTwoImages";

const T5GTFSRealtime = () => {
  return (
    <>
      <Header />
      <T1Banner
        title="T5 GTFS REALTIME TRANSIT SERVICE"
        subtitle="Empowering you with GTFS"
        subtitle2="Realtime data to improve"
        subtitle3="urban mobility"
        btnlink="#"
        btntext="Request a demo"
        imgsrc="/images/images-entour/For+operators.png"
      />
      {/* information section */}
      <TransitInformation
        title="T4 GTFS Static transit service"
        imgsrc="/images/images-entour/T5_Gtfs+Realtime.png"
        detail="   GTFS Realtime serves as an extension to GTFS Static, offering
                real-time information about the status of a service journey. The
                primary benefits include reduced wait times, as passengers can time
                their arrival at stops or stations more precisely, reduced travel
                time through informed trip choices, and ultimately increased public
                transit use due to improved efficiency. The higher-order impact
                stands to be even greater: envisioning a future where integrated
                real-time data from all transportation options enables a true
                mobility system that rivals the convenience of private car usage."
      />

      <>
        {/* image with text */}
        <div className="images-text p-5 mt-5">
          <div className="row p-4">
            <div className="col-lg-6 text-light fs-6">
              <h3 className="">
                Formalize the dynamic service journey data and create GTFS
                Realtime data feeds
              </h3>
              <p>
                Make data-driven decisions, optimize transit services, and
                enhance operational efficiency with our T5 GTFS Realtime transit
                service. To generate GTFS Realtime feeds and arrival
                predictions, we use live vehicle location data from a variety of
                onboard units, such as existing GPS tracking devices.
              </p>
            </div>
            <div className="col-lg-6 side-image-one">
              <img
                src="/images/images-entour/lots-of-blue-buses (1).png"
                alt=""
              />
            </div>
          </div>
          <div className="row p-4">
            <div className="col-lg-6 image-2">
              <img
                src="/images/images-entour/settings-devices (1).png"
                className=""
                style={{ height: 250, width: "auto" }}
                alt=""
              />
            </div>
            <div className="col-lg-6 text-light fs-6">
              <h3>Generate and validate GTFS Realtime data</h3>
              <p>
                Generate GTFS Realtime feeds by using GPS device updates from
                the vehicles. The system constantly monitors and aligns the
                vehicle's location with its scheduled service journey in
                real-time. Service alerts can be managed either within the
                eQconnect® dashboard or through a partner dashboard.
              </p>
            </div>
          </div>
          <div className="row p-4">
            <div className="col-lg-6 text-light fs-6">
              <h3>Publish GTFS Realtime feeds</h3>
              <p>
                Publish the GTFS Realtime data feeds, including live vehicle
                positions, trip updates and service alerts from our eQconnect®
                cloud transit dashboard to a local city server or external
                repository. This facilitates the sharing of real-time updates
                with relevant 3rd party stakeholders, urban mobility platforms
                and trip planning apps, and even integrates seamlessly with
                platforms like Google Maps.
              </p>
            </div>
            <div className="col-lg-6 side-image">
              <img src="/images/images-entour/TRANSIT+APP.png" alt="" />
            </div>
          </div>
        </div>
      </>
      <div className="transit-services">
        <div className="container text-center mt-5">
          <h1>Transit service packages</h1>
          <p>
            Our transit service packages are designed to facilitate high
            utilization of your data, catering to your needs.
          </p>
          <Accordion />
        </div>
      </div>

      <TransitTwoImages
        subtitle1="Insights into public transport"
        title1="T6 Operations"
        btn1link="/t6operations"
        subtitle2="Make transit data available"
        title2="For Authorities"
        btn2link="/forauthorities"
      />
      {/* social media icons */}
      <FollowUs />
      <Footer />
    </>
  );
};

export default T5GTFSRealtime;
