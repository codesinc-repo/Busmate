import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import FaqBannner from "../../Components/FaqBanner";
import TransitTwoImages from "../../Components/TransitTwoImages";
import FollowUs from "../../Components/FollowUs";
import Footer from "../../Components/Footer";
import "./partner.css";
const Partner = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleAccordionClick = (index) => {
    if (index === activeIndex) {
      setActiveIndex(-1);
    } else {
      setActiveIndex(index);
    }
  };
  return (
    <>
      <Header />
      <FaqBannner
        title="Bus Mate PARTNERS"
        description="Together we build a more attractive
        and connected public transport"
      />
      <div className="t2-information-section">
        <div className="container mt-lg-5">
          <div className="img-heading text-center">
            <h1 className="ms-3">Building partnerships around the world </h1>
          </div>
          <p className="text-center fs-5 p-5 text-secondary">
            We believe in the value of collaborations and partnerships. We work
            closely with all our customers to make public transport more
            efficient, reliable and affordable. Together with our global and
            local partners, we are committed to long-term customer success and
            partnerships - helping each client in their digital transformation
            journey.
          </p>
        </div>
      </div>
      {/*  */}
      <div className="transit-services">
        <div className="Transit-service-packages overflow-hidden ">
          <div className="row p-5">
            <div className="col-lg-5">
              <div className="container">
                <ul className="accordion">
                  <li className="accordion__item">
                    <a
                      href="javascript:void(0)"
                      className={`accordion__link ${
                        activeIndex === 0 ? "accordion__link_active" : ""
                      }`}
                      onClick={() => handleAccordionClick(0)}
                    >
                      NGOs
                    </a>
                    <ul
                      className={`sub-accordion ${
                        activeIndex === 0 ? "open" : "close"
                      }`}
                    >
                      <li className="sub-accordion__item">
                        In collaboration with NGOs, we strive to digitalize
                        cities’ public transport network, aiming to provide safe
                        transportation access for all. The data generated
                        through this process serves as a valuable tool for the
                        city, enabling them to restructure the public transport
                        network and plan for the implementation of new dedicated
                        backbone lines such as Bus Rapid Transit (BRT) systems.
                      </li>
                    </ul>
                  </li>
                  <li className="accordion__item">
                    <a
                      href="javascript:void(0)"
                      className={`accordion__link ${
                        activeIndex === 1 ? "accordion__link_active" : ""
                      }`}
                      onClick={() => handleAccordionClick(1)}
                    >
                      Private companies
                    </a>
                    <ul
                      className={`sub-accordion ${
                        activeIndex === 1 ? "open" : "close"
                      }`}
                    >
                      <li className="sub-accordion__item">
                        We partner with companies and private sector
                        organisations, such as CAD/AVL, mobility-as-a-service
                        providers, software applications and consultants for
                        trip planning, ridesharing, timetable creation, mobile
                        data, visualization, accessibility, and analysis tools
                        for planning.
                      </li>
                    </ul>
                  </li>
                  <li className="accordion__item">
                    <a
                      href="javascript:void(0)"
                      className={`accordion__link ${
                        activeIndex === 2 ? "accordion__link_active" : ""
                      }`}
                      onClick={() => handleAccordionClick(2)}
                    >
                      Automotive
                    </a>
                    <ul
                      className={`sub-accordion ${
                        activeIndex === 2 ? "open" : "close"
                      }`}
                    >
                      <li className="sub-accordion__item">
                        In partnership with the automotive industry, we
                        collaborate to deliver enhanced value to their customers
                        by making route and real-time data accessible for a
                        wider range of users.
                      </li>
                    </ul>
                  </li>
                  <li className="accordion__item">
                    <a
                      href="javascript:void(0)"
                      className={`accordion__link ${
                        activeIndex === 3 ? "accordion__link_active" : ""
                      }`}
                      onClick={() => handleAccordionClick(3)}
                    >
                      Trip planning
                    </a>
                    <ul
                      className={`sub-accordion ${
                        activeIndex === 3 ? "open" : "close"
                      }`}
                    >
                      <li className="sub-accordion__item">
                        We share transit network data, including routes, stops,
                        and schedules, along with GTFS Realtime feeds on arrival
                        predictions, vehicle positions, and service alerts. This
                        data enables app developers and third-party companies to
                        create their own trip planning applications, fostering a
                        dynamic ecosystem of transportation solutions.
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="row">
                <div className="col-lg-6">
                  <img
                    src="/images/images-entour/un-global-compact-banner.jpeg"
                    alt="Image"
                    height="150px"
                  />
                </div>
                <div className="col-lg-6">
                  <img
                    src="/images/images-entour/Logo-AMAM.png"
                    alt="Image"
                    height="100px"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <img
                    src="/images/images-entour/GIZ.jpeg"
                    alt="Image"
                    height="100px"
                  />
                </div>
                <div className="col-lg-6">
                  <img
                    src="/images/images-entour/MOBILTYDATA_logo_dark_blue.png"
                    alt="Image"
                    height="100px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*  */}
      <div className="Apply-partner images-text p-5 mt-5">
        <div className="row ">
          <div className="col-lg-12 text-light fs-6 text-center">
            <h2 className="">Become a partner</h2>
            <p>
              We’re always interested in talking to well-qualified companies
              about joining our
            </p>
            <p>
              {" "}
              team. We encourage you to become a partner and enjoy the benefits
              of working
            </p>
            <p>with Bus Mateq.</p>
            <a href="/demo">
              <button className="Apply"> Apply Now</button>
            </a>
          </div>
        </div>
      </div>
      {/*  */}
      <div className="container-image-text mt-5 overflow-hidden partner-img-text">
        <div className="row">
          <div className="col-lg-6 p-5">
            <img
              src="/images/images-entour/Santiago+HD+-+Press+.jpeg"
              className="w-100"
              alt=""
            />
          </div>
          <div
            className="col-lg-6 text-box d-flex align-items-center justify-content-center flex-column fs-5 p-3
           "
          >
            <p>
              <span>
                “With this partnership and joint efforts, we look forward to
                contributing to more sustainable and people-centric transport
                for Chile and other countries in the region.”
              </span>
            </p>
            <p>— Mr. Name, Commercial Manager at Name</p>
          </div>
        </div>
      </div>

      <TransitTwoImages
        subtitle1="Optimize operations"
        title1="For Operations"
        btn1link="/foroperations"
        subtitle2="Make transit data available"
        title2="For Authorities"
        btn2link="/ForAuthorities"
      />
      <FollowUs />
      <Footer />
    </>
  );
};
export default Partner;
