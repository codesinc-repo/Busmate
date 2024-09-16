import React from "react";

const T1Accordian = () => {
  return (
    <>
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
            <div className="container">
              <ul className="accordion">
                <li className="accordion__item">
                  <a
                    href="#"
                    className="accordion__link accordion__link_active"
                  >
                    Performance package
                  </a>
                  <ul className="sub-accordion">
                    <li className="sub-accordion__item">
                      In our Performance package, you have access to both T1
                      Enroute and T2 Performance transit services. These
                      services enable the digitalization of your transit network
                      and connect vehicles to collect performance data along
                      routes. You can then visualize and analyze this data,
                      gaining vital insights into your transit network's
                      topology, fleet performance, and service efficiency.
                    </li>
                  </ul>
                </li>
                <li className="accordion__item">
                  <a href="#" className="accordion__link">
                    {" "}
                    Schedules package{" "}
                  </a>
                  <ul className="sub-accordion">
                    <li className="sub-accordion__item">
                      Our Schedules package gives you the advantages of not only
                      T1 Enroute and T2 Performance transit services, but also
                      our T3 Schedules transit service. This allows you to
                      create Dynamic GTFS Schedules and adjust frequency time
                      bands and vehicle counts to customize your schedules
                      according to current passenger demand and traffic
                      conditions.
                    </li>
                  </ul>
                </li>
                <li className="accordion__item">
                  <a href="#" className="accordion__link">
                    {" "}
                    GTFS Static package{" "}
                  </a>
                  <ul className="sub-accordion">
                    <li className="sub-accordion__item">
                      In our GTFS Static package, you'll discover T1 Enroute, T2
                      Performance, T3 Schedules, and T4 GTFS Static transit
                      services. This comprehensive package equips you with the
                      necessary tools to effortlessly generate GTFS Static
                      files, laying the groundwork for the creation of GTFS
                      Realtime data.
                    </li>
                  </ul>
                </li>
                <li className="accordion__item">
                  <a href="#" className="accordion__link">
                    GTFS Realtime package
                  </a>
                  <ul className="sub-accordion">
                    <li className="sub-accordion__item">
                      Within our GTFS Realtime package, you will find a range of
                      transit services, including T1 Enroute, T2 Performance, T3
                      Schedules, T4 GTFS Static, and T5 GTFS Realtime. This
                      comprehensive package provides you with all the essential
                      tools required to easily create and distribute GTFS
                      Realtime feeds.
                    </li>
                  </ul>
                </li>
                <li className="accordion__item">
                  <a href="#" className="accordion__link">
                    {" "}
                    Operations package{" "}
                  </a>
                  <ul className="sub-accordion">
                    <li className="sub-accordion__item">
                      Our Operations package offers the full spectrum of our
                      transit services, encompassing T1 Enroute, T2 Performance,
                      T3 Schedules, T4 GTFS Static, T5 GTFS Realtime, and T6
                      Operations. These services are essential for effective
                      operations control, enabling you to manage your entire
                      vehicle fleet successfully.
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default T1Accordian;
