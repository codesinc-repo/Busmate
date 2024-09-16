import React from "react";

const FaqBannner = ({ title, description, description2 }) => {
  return (
    <>
      <div className="container-heading top-heading-banner text-center mb-4">
        <h1>{title}</h1>
        <p className="fs-5 mx-5  font-weight-normal">{description}</p>
        <p className="fs-5 mx-5  font-weight-normal">{description2}</p>
      </div>
    </>
  );
};

export default FaqBannner;
