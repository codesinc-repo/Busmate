import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const Carousel = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-7">
          <OwlCarousel
            className="owl-single dots-absolute owl-carousel"
            items={1}
            loop
            margin={10}
          >
            <div className="item">
              <img
                src="images/curasol img.jpg"
                alt="Free HTML Template by Untree.co"
                className="img-fluid rounded-20"
              />
            </div>
            <div className="item">
              <img
                src="images/curasol img1.jpg"
                alt="Free HTML Template by Untree.co"
                className="img-fluid rounded-20"
              />
            </div>
            {/* Add more items as needed */}
          </OwlCarousel>
        </div>
        <div className="col-lg-5 pl-lg-5 ml-auto">
          <h2 className="section-title mb-4">About Transport</h2>
          <p>
            Our innovative approach blends convenience with eco-friendly
            initiatives, ensuring sustainable travel solutions. From
            cutting-edge booking platforms to luxurious onboard amenities, we
            redefine bus travel for the modern explorer.
          </p>
          <ul className="list-unstyled two-col clearfix">
            <li>Bus</li>
            <li>Transit</li>
            <li>Commute</li>
            <li>Route</li>
            <li>Passenger</li>
            <li>Stop</li>
            <li>Schedule</li>
            <li>Package Tours</li>
            <li>Driver</li>
            <li>Terminal</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
