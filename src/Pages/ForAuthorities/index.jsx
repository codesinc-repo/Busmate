import React from "react";
import Header from "../../Components/Header";
import T1Banner from "../../Components/T1banner";
import TransitCards from "../../Components/TransitCards";
import Accordion from "../../Components/Accordion";
import TransitTwoImages from "../../Components/TransitTwoImages";
import FollowUs from "../../Components/FollowUs";
import Footer from "../../Components/Footer";

const ForAuthorities = () => {
  return (
    <>
      <Header />
      <T1Banner
        title="PUBLIC TRANSPORT AUTHORITIES"
        subtitle="Improve accessibility and"
        subtitle2="passenger convenience"
        subtitle3="with GTFS data"
        btntext="Request a demo"
        imgsrc="/images/images-entour/mobiletransit.png"
      />

      <div className="t2-information-section">
        <div className="container mt-lg-5">
          <div className="img-heading text-center">
            <h1 className="ms-3">
              Empower your transit network with GTFS data for
            </h1>
            <h1>transparency and real-time updates.</h1>
          </div>
          <p className="text-center fs-5 p-5 text-secondary">
            Create and edit your public transport network and schedules with our
            eQrepository platform, tailored specifically for public transport
            authorities. The data, structured in GTFS format, ensures easy
            editing and ongoing maintenance, ensuring accurate and up-to-date
            information. Share GTFS Static data seamlessly with passengers,
            researchers, and other stakeholders in the mobility landscape for
            enhanced collaboration, informed decision-making, and a more
            connected and efficient public transport ecosystem.
          </p>
        </div>
      </div>

      <TransitCards
        card1title="Transit network"
        card1dec="Set up and populate the transit network with its terminals, stops, routes and depots manually or by importing latitude/longitude stop data; or existing GTFS Static data files into the eQrepository transit cloud dashboard."
        card2title="Schedules"
        card2des="Easily generate GTFS-based schedules to ensure current information. Manage routes, stops, departure, and arrival times for keeping schedules up-to-date according to current passenger demand and traffic conditions"
        card3title="GTFS Static"
        card3des="Create GTFS Static feeds including information about the transit network topology, time schedules and frequencies for specific calendar periods. The data, structured in GTFS format, ensures easy editing."
      />

      <div className="images-text p-5 mt-5 image-text-section">
        <div className="row p-4">
          <div className="col-lg-12 text-light fs-6 text-center">
            <h1 className="">Benefits of GTFS transit data</h1>
            <p className="">
              Access to real-time information enhances public transport usage
              and inclusivity. It allows people to smoothly plan their journey
              and manage their time more efficiently. Real-time transit data can
              be used to create optimized routes, prioritizing the needs of the
              public and contributing to a more people-centered public transport
              system, as well as to reduce CO2 emissions.
            </p>
          </div>
          <div className="Transit-service-packages overflow-hidden w-100 mt-5">
            <div className="row p-5 align-items-center">
              <div className="col-lg-6 image-insight d-flex ">
                <img src="/images/images-entour/insights.png" alt="" />
              </div>
              <div className="col-lg-5">
                <Accordion />
              </div>
            </div>
          </div>
        </div>
      </div>

      <TransitTwoImages
        subtitle1="Insights into public transport"
        title1="T8 Governance"
        btn1link="/t8governance"
        subtitle2="More riders. More revenue."
        title2="T5 GTFS Realtime"
        btn2link="/T5GTFSRealtime"
      />
      <FollowUs />
      <Footer />
    </>
  );
};
export default ForAuthorities;
