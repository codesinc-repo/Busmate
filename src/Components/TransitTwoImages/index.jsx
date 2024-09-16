import React from "react";

const TransitTwoImages = ({
  title1,
  subtitle1,
  btn1link,
  title2,
  subtitle2,
  btn2link,
}) => {
  return (
    <>
      <div className="two-images-section overflow-hidden">
        <div className="row p-5 g-3">
          <div className="col-lg-6 performance text-light d-flex justify-content-center align-items-center flex-column">
            <h4>{subtitle1}</h4>
            <h1>{title1}</h1>
            <button className="btn-two-images-section">
              <a href={btn1link}>Learn more</a>
            </button>
            {/* <img src="images/images-entour/performance.png" alt=""> */}
          </div>
          <div className="col-lg-6 schedule text-light d-flex justify-content-center align-items-center flex-column">
            <h4>{subtitle2}</h4>
            <h1>{title2}</h1>
            <button className="btn-two-images-section">
              <a href={btn2link}>Learn more</a>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default TransitTwoImages;
