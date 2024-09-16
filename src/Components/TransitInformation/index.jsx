import React from "react";
import "./inform.css";
const TransitInformation = ({ title, imgsrc, detail }) => {
  return (
    <>
      <div className="t1-information-section">
        <div className="container mt-lg-5">
          <div className="img-heading d-flex justify-content-center align-items-center object-fit-cover">
            <img src={imgsrc} alt="" />
            <h1 className="ms-3">{title}</h1>
          </div>
          <p className="text-center fs-5 p-5">{detail}</p>
        </div>
      </div>
    </>
  );
};

export default TransitInformation;
