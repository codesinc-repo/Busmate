import React, { useEffect } from "react";
import Header from "../../Components/Header";
import HomeSlider from "../../Components/HomeSlider";
import Services from "../../Components/Services";
import RouteMap from "../../Components/RouteMap";
import Tools from "../../Components/Tools";
import PricingPlan from "../../Components/PricingPlan";
import Testimonials from "../../Components/Testimonials";
import ServiceVideo from "../../Components/ServiceVideo";
import Subscribe from "../../Components/Subscribe";
import Footer from "../../Components/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import UserHeader from "../../Components/UserHeader";
import { ToolsCards } from "../../Components/ToolsCards";
import { LoadScript } from "@react-google-maps/api";
import SavedRoutesMap from "../../Components/SavedRoutesMap";
import PaymentHistory from "../../Components/PaymentHistory";

const Home = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      {/* <Header /> */}
      <Header />
      <HomeSlider />
      <Services />
      {/* <PaymentHistory /> */}
      {/* <LoadScript googleMapsApiKey="AIzaSyBDDCT1y6vpC4jJ3_LGzRnMF6OclbkDEfU" libraries={['places', 'geometry']}>
      <SavedRoutesMap/>
      </LoadScript> */}
      {/* <ToolsCards /> */}
      {/* <Tools /> */}
      <>
        {/* counter 2 */}
        <div className="untree_co-section mt-0 pt-0">
          <div className="container">
            <div className="row  justify-content-center">
              <div className="col-lg-6 text-center">
                <h2 className="section-title text-center mb-3">Statistics</h2>
              </div>
            </div>
          </div>
        </div>
        <div id="projectFacts" className="sectionClass">
          <div className="fullWidth eight columns">
            <div className="projectFactsWrap">
              <div
                className="item wow fadeInUpBig animated animated"
                data-number={12}
                style={{ visibility: "visible" }}
              >
                <i className="fa fa-route" />
                <p id="number1" className="number" data-count={12}>
                  4440
                </p>
                <span />
                <p>Routes Created</p>
              </div>
              <div
                className="item wow fadeInUpBig animated animated"
                data-number={55}
                style={{ visibility: "visible" }}
              >
                <i className="fa fa-city" />
                <p id="number2" className="number" data-count={4440}>
                  4440
                </p>
                <span />
                <p>Registered Stops</p>
              </div>
              <div
                className="item wow fadeInUpBig animated animated"
                data-number={359}
                style={{ visibility: "visible" }}
              >
                <i className="fa fa-user" />
                <p id="number3" className="number" data-count={359}>
                  359
                </p>
                <span />
                <p>Satisfied Customers</p>
              </div>
              <div
                className="item wow fadeInUpBig animated animated"
                data-number={246}
                style={{ visibility: "visible" }}
              >
                <i className="fa fa-calendar" />
                <p id="number4" className="number" data-count={246}>
                  246
                </p>
                <span />
                <p>Timetables Built</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row text-center justify-content-center mb-3 mt-0 mt-md-5">
          <div className="col-lg-7 mt-0 md-mt-5" data-aos="fade-up">
            <p className="mb-0">Affordable Tools &amp; Calculators</p>
            <h2 className="section-title text-center">Our Pricing Plans</h2>
          </div>
        </div>
        <PricingPlan />
        <Testimonials />

        <ServiceVideo />
        <Subscribe />
        <Footer />
      </>
    </>
  );
};

export default Home;
