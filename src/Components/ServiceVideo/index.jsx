import React from "react";

const ServiceVideo = () => {
  return (
    <>
      <div className="untree_co-section">
        <div className="container">
          <div className="row justify-content-between align-items-center">
            <div className="col-lg-6">
              <figure className="img-play-video" data-aos="zoom-in">
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
            <div className="col-lg-5" data-aos="fade-left">
              <h2 className="section-title text-left mb-4">
                Take a look at our service
              </h2>
              <p>
                Take a moment to explore our range of services designed to
                enhance your travel experience. From convenient booking options
                to luxurious onboard amenities, we prioritize your comfort and
                satisfaction every step of the way. Discover how Bus Mate can
                elevate your journey and create unforgettable travel memories.
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
                <a href="/resources" className="btn btn-primary">
                  Get Started
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ServiceVideo;
