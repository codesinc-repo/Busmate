import React, { useEffect } from "react";

const Services = () => {
  return (
    <>
      <div className="untree_co-section">
        <div className="container">
          <div
            className="row mb-5 justify-content-center"
            data-aos="fade-right"
          >
            <div className="col-lg-6 text-center">
              <h2 className="section-title text-center mb-3" data-aos="fade-up">
                Our Services
              </h2>
            </div>
          </div>
          <div className="row align-items-stretch">
            <div className="col-lg-4 order-lg-1">
              <div className="h-100">
                <div className="frame h-100">
                  <div
                    className="feature-img-bg h-100"
                    data-aos="flip-up"
                    style={{ backgroundImage: 'url("images/5.jpg")' }}
                  />
                </div>
              </div>
            </div>
            <div
              className="col-6 col-sm-6 col-lg-4 feature-1-wrap d-md-flex flex-md-column order-lg-1"
              data-aos="fade-up"
              data-aos-duration="2000"
            >
              <div className="feature-1 d-md-flex">
                <div className="align-self-center">
                  {/* <span class="flaticon-house display-4 text-primary"></span> */}
                  <img
                    src="images/icons/shopping-cart.png"
                    width={70}
                    className="display-4 pb-1"
                    alt=""
                  />
                  <h3>Operators</h3>
                </div>
              </div>
              <div className="feature-1">
                <div className="align-self-center">
                  <img
                    src="images/icons/box.png"
                    width={70}
                    className="display-4 pb-3"
                    alt=""
                  />
                  <h3>Planners</h3>
                </div>
              </div>
            </div>
            <div
              className="col-6 col-sm-6 col-lg-4 feature-1-wrap d-md-flex flex-md-column order-lg-3"
              data-aos="fade-up"
              data-aos-duration="2000"
            >
              <div className="feature-1 d-md-flex">
                <div className="align-self-center">
                  <img
                    src="images/icons/plane.png"
                    width={70}
                    className="display-4 pb-1"
                    alt=""
                  />
                  <h3>Logistics</h3>
                </div>
              </div>
              <div className="feature-1 d-md-flex">
                <div className="align-self-center">
                  <img
                    src="images/icons/delivery.png"
                    width={70}
                    className="display-4 pb-1"
                    alt=""
                  />
                  <h3>Transport Scheduling</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
