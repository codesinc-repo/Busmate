import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const HomeSlider = () => {
  useEffect(() => {
    AOS.init({
      duration: 650,
      once: true,
    });
  }, []);

  return (
    <div className="container-fluid p-0 home-slider">
      <div className="row align-items-center">
        <div className="col-lg-12">
          <div
            id="carouselExampleIndicators"
            className="carousel slide"
            data-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="hero slider-1">
                  <div className="shadow"></div>
                  <div className="container">
                    <div className="row align-items-center">
                      <div className="col-lg-8">
                        <div className="intro-wrap" data-aos="fade-right">
                          <h1 className="mb-3">Making GTFS files simple</h1>
                          <h4>
                            Ideal for transport operators who need a GTFS file
                          </h4>
                          <p>General Transit Feed Specification (GTFS)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="carousel-item">
                <div className="hero slider-2">
                  <div className="container">
                    <div className="row align-items-center">
                      <div className="col-lg-8">
                        <div className="intro-wrap" data-aos="fade-right">
                          <h1 className="mb-3">Making GTFS files simple</h1>
                          <h4>Ideal for transport operators who need a GTFS file</h4>
                          <p>General Transit Feed Specification (GTFS)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="hero slider-3">
                  <div className="container">
                    <div className="row align-items-center">
                      <div className="col-lg-8">
                        <div className="intro-wrap" data-aos="fade-right">
                          <h1 className="mb-3">Making GTFS files simple</h1>
                          <h4>Ideal for transport operators who need a GTFS file</h4>
                          <p>General Transit Feed Specification (GTFS)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
            {/* <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="sr-only">Next</span>
            </a> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSlider;
