import React from "react";
import "./t1banner.css";
const T1Banner = ({
  title,
  subtitle,
  subtitle2,
  subtitle3,
  btnlink,
  btntext,
  imgsrc,
}) => {
  return (
    <>
      <div className="t1-banner overflow-hidden">
        <div className="row">
          <div className="col-lg-6 text-light p-5">
            <h6>{title}</h6>
            <h1>{subtitle}</h1>
            <h1>{subtitle2}</h1>
            <h1>{subtitle3}</h1>
            <a href="/demo">
              <button className="banner-btn">{btntext}</button>
            </a>
          </div>
          <div className="col-lg-4">
            <div className="map-circle">
              <img
                //   src="images/images-entour/lots-of-blue-buses.png"
                src={imgsrc}
                className="object-fit-cover"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default T1Banner;
