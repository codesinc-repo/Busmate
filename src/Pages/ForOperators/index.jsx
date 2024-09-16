import React from "react";
import Header from "../../Components/Header";
import T1Banner from "../../Components/T1banner";
import TransitCards from "../../Components/TransitCards";
import Accordion from "../../Components/Accordion";
import TransitTwoImages from "../../Components/TransitTwoImages";
import FollowUs from "../../Components/FollowUs";
import Footer from "../../Components/Footer";
import "./foroperators.css";
const ForOperators = () => {
  return (
    <>
      <Header />
      <T1Banner
        title="PUBLIC TRANSPORT OPERATORS"
        subtitle="Digitilize, optimize and"
        subtitle2="visualize"
        subtitle3="your daily operations with
        GTFS data"
        btntext="Request a demo"
        imgsrc="/images/images-entour/enrouteq.jpg"
      />

      <div className="t2-information-section">
        <div className="container mt-lg-5">
          <div className="img-heading text-center">
            <h1 className="ms-3">Manage your buses in real-time and improve</h1>
            <h1>operational efficiency..</h1>
          </div>
          <p className="text-center fs-5 p-5 text-secondary">
            Create and visualize your transit network and connect buses in
            real-time with our eQconnect® platform. Oversee the daily
            operations of assigned vehicles on routes or schedules. The platform
            allows the seamless export of GTFS Realtime data and service alerts,
            providing essential performance statistics crucial for effective
            operations governance.
          </p>
        </div>
      </div>

      <div className="cards-container operators-card" style={{ padding: 22 }}>
        <div className="row">
          <div className="col-lg card-img cards p-2 text-center">
            <div className="card" style={{ width: "14rem" }}>
              <div className="card-body d-flex justify-content-center align-items-center flex-column">
                <h3>T1 Enroute</h3>
                <p className="card-text">
                  Digitalize the transit network and connect vehicles to collect
                  performance data along routes.
                </p>
                <a href="/t1enroute">Learn more &gt; </a>
                <img
                  className="card-img-top object-fit-cover"
                  src="/images/images-entour/ak.png"
                  alt="Card image cap"
                />
              </div>
            </div>
          </div>
          <div className="col-lg card-img cards p-2 text-center">
            <div className="card" style={{ width: "14rem" }}>
              <div className="card-body d-flex justify-content-center align-items-center flex-column">
                <h3>T2 Performance</h3>
                <p className="card-text">
                  Visualize and analyze collected transit data from vehicle
                  performances on operating routes.
                </p>
                <a href="/t2performance">Learn more &gt; </a>
                <img
                  className="card-img-top object-fit-cover"
                  src="/images/images-entour/Frequency+and+vehicles+1.0.png"
                  alt="Card image cap"
                />
              </div>
            </div>
          </div>
          <div className="col-lg card-img cards p-2 text-center">
            <div className="card" style={{ width: "14rem" }}>
              <div className="card-body d-flex justify-content-center align-items-center flex-column">
                <h3>T3 Schedules</h3>
                <p className="card-text">
                  Create Dynamic GTFS Schedules and adjust frequency needs based
                  on the number of vehicles.
                </p>
                <a href="/t3schedule">Learn more &gt; </a>
                <img
                  className="card-img-top object-fit-cover"
                  src="/images/images-entour/Frequency+and+vehicles+2.0.png"
                  alt="Card image cap"
                />
              </div>
            </div>
          </div>
          <div className="col-lg card-img cards p-2 text-center">
            <div className="card" style={{ width: "14rem" }}>
              <div className="card-body d-flex justify-content-center align-items-center flex-column">
                <h3>T6 Operations</h3>
                <p className="card-text">
                  Optimize assignments and dispatch, as well as make necessary
                  changes in real-time. Optimize schedule.
                </p>
                <a href="/t6operations">Learn more &gt; </a>
                <img
                  className="card-img-top object-fit-cover"
                  src="/images/images-entour/parked.png"
                  alt="Card image cap"
                />
              </div>
            </div>
          </div>
          <div className="col-lg card-img cards p-2 text-center">
            <div className="card" style={{ width: "14rem" }}>
              <div className="card-body d-flex justify-content-center align-items-center flex-column">
                <h3>T7 Insights</h3>
                <p className="card-text">
                  Understand your fleet performance and effectively visualize
                  and analyze historical data. Insight services.
                </p>
                <a href="/t7insights">Learn more &gt; </a>
                <img
                  className="card-img-top object-fit-cover"
                  src="/images/images-entour/insights.png"
                  alt="Card image cap"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

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
      <>
        {/* image with text */}
        <div className="images-text p-5 mt-5">
          <div className="row p-4">
            <div className="col-lg-6 text-light fs-6">
              <h3 className="">Real-time data</h3>
              <p>
                Real-time data empowers operations management to optimize
                assignments, dispatch, and make changes in real-time. This
                enables better business-making by monitoring the balance between
                buses and passengers, while also identifying the most efficient
                and essential routes.
              </p>
            </div>
            <div className="col-lg-6 side-image-one align-content-end">
              <img
                src="/images/images-entour/denden.png"
                alt="Image"
                style={{ height: 350 }}
              />
            </div>
          </div>
          <div className="row p-4">
            <div className="col-lg-6 image-2">
              <img
                src="/images/images-entour/connect2route (1).png"
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
        </div>
      </>

      <TransitTwoImages
        subtitle1="Optimize operations"
        title1="T6 Operations"
        btn1link="/T6Operations"
        subtitle2="Cost control and efficiency"
        title2="T7 Insights"
        btn2link="/T7Insights"
      />
      <FollowUs />
      <Footer />
    </>
  );
};
export default ForOperators;
