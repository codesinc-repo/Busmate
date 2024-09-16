import React from "react";

import "./About.css";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import Subscribe from "../../Components/Subscribe";
import { Carousel } from "react-bootstrap";

const About = () => {
  return (
    <>
      <Header />
      <>
        <div className="hero hero-inner">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 mx-auto text-center">
                <div className="intro-wrap">
                  <h1 className="mb-0">About Us</h1>
                  <p className="text-white">
                    Bus Mate is a renowned travel agency committed to
                    facilitating hassle-free and enjoyable bus journeys. With a
                    focus on passenger comfort and safety, we offer a diverse
                    selection of routes and services.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="untree_co-section">
          <Carousel />
        </div>
        <div className="untree_co-section">
          <div className="container">
            <div className="row justify-content-center mb-5">
              <div className="col-md-6 text-center">
                <h6 className="section-title mb-3 text-center">
                  Affordable Transport
                </h6>
                <h2>Our Mission</h2>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4 mb-4">
                <div className="team">
                  <img
                    src="images/image 1.jpg"
                    alt="Image"
                    className="img-fluid mb-4 rounded-20"
                  />
                  <div className="px-3">
                    <h3 className="mb-0">Be Affordable</h3>
                    <p>
                      At Bus Mate, we strive to make exploring destinations
                      accessible to everyone, ensuring memorable journeys at
                      affordable prices.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 mb-4">
                <div className="team">
                  <img
                    src="images/image 2.jpg"
                    alt="Image"
                    className="img-fluid mb-4 rounded-20"
                  />
                  <div className="px-3">
                    <h3 className="mb-0">Reduce Complexity</h3>
                    <p>
                      Our commitment, streamlining your bus travel experience
                      with straightforward booking processes and clear
                      communication, ensuring a hassle-free journey from start
                      to finish with Bus Mate.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 mb-4">
                <div className="team">
                  <img
                    src="images/image 3 (2).jpg"
                    alt="Image"
                    className="img-fluid mb-4 rounded-20"
                  />
                  <div className="px-3">
                    <h3 className="mb-0">Save your Time</h3>
                    <p>
                      We prioritize streamlining travel experiences, ensuring
                      our passengers make the most of their valuable time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="untree_co-section">
          <div className="container">
            <div className="row justify-content-between align-items-center">
              <div className="col-lg-6">
                <figure className="img-play-video">
                  <a
                    id="play-video"
                    className="video-play-button"
                    href="https://www.youtube.com/watch?v=IeardDdWcQk"
                    data-fancybox=""
                  >
                    <span />
                  </a>
                  <img
                    src="images/abt.jpg"
                    alt="Image"
                    className="img-fluid rounded-20 h-100"
                  />
                </figure>
              </div>
              <div className="col-lg-5">
                <h2 className="section-title text-left mb-4">
                  Take a look at our service
                </h2>
                <p>
                  Take a moment to explore our range of services designed to
                  enhance your travel experience. From convenient booking
                  options to luxurious onboard amenities, we prioritize your
                  comfort and satisfaction every step of the way. Discover how
                  Bus Mate can elevate your journey and create unforgettable
                  travel memories.
                </p>
                <ul className="list-unstyled two-col clearfix">
                  <li>Service Frequency Calculator</li>
                  <li>Average Speed Calculator Tool</li>
                  <li>Service Charter Cost Calculator</li>
                  <li>Peak Vehicle Estimator</li>
                  <li>Bus Stop Capacity Check</li>
                  <li>Average Fleet Age</li>
                  <li>Route Map</li>
                  <li>Timetable Creator</li>
                  {/* <li>Insurance</li>
        <li>Guide Books</li> */}
                </ul>
                <p>
                  <a href="#" className="btn btn-primary">
                    Get Started
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </>

      <Subscribe />
      <Footer />
    </>
  );
};

export default About;
