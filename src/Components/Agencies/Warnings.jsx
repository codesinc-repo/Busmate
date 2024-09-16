import React, { useState } from "react";

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="optional-Data">
      <div
        onClick={toggleAccordion}
        className="row d-flex align-items-center "
        style={{ cursor: "pointer", padding: "10px", border: "1px solid #ccc" }}
      >
        <div className="col-md-6">
          <h4 className="mb-0 pb-0">{title}</h4>
        </div>
        <div className="col-md-6 text-end ">
          <h3 className="mb-0 pb-0">
            <i className="fa-solid fa-check text-success"></i>
          </h3>
        </div>
      </div>
      {isOpen && (
        <div
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderTop: "none",
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export const Warnings = () => {
  return (
    <div>
      <Accordion title="Stops">
        <div
          className="d-flex flex-column flex-wrap align-items-center  justify-content-center gap-3 p-3  "
          style={{ border: "1px solid rgb(204, 204, 204)" }}
        >
          <h6 className="mb-0 pb-0">
            Stops at the same location (latitude/longitude)
          </h6>
          <p className="mb-0 pb-0">All ok</p>
        </div>
        <div
          className="d-flex flex-column flex-wrap align-items-center  justify-content-center gap-3 p-3  "
          style={{ border: "1px solid rgb(204, 204, 204)" }}
        >
          <h6>Stops with reversed names</h6>
          <p>All ok</p>
        </div>{" "}
        <div
          className="d-flex flex-column flex-wrap align-items-center  justify-content-center gap-3 p-3  "
          style={{ border: "1px solid rgb(204, 204, 204)" }}
        >
          <h6>Stops that are not used in a trip</h6>
          <p>All ok</p>
        </div>
      </Accordion>

      <Accordion title="Route Maps">
        <div
          className="d-flex flex-column flex-wrap align-items-center  justify-content-center gap-3 p-3  "
          style={{ border: "1px solid rgb(204, 204, 204)" }}
        >
          <h6 className="mb-0 pb-0">
            Stops at the same location (latitude/longitude)
          </h6>
          <p className="mb-0 pb-0">All ok</p>
        </div>
        <div
          className="d-flex flex-column flex-wrap align-items-center  justify-content-center gap-3 p-3  "
          style={{ border: "1px solid rgb(204, 204, 204)" }}
        >
          <h6>Stops with reversed names</h6>
          <p>All ok</p>
        </div>{" "}
        <div
          className="d-flex flex-column flex-wrap align-items-center  justify-content-center gap-3 p-3  "
          style={{ border: "1px solid rgb(204, 204, 204)" }}
        >
          <h6>Stops that are not used in a trip</h6>
          <p>All ok</p>
        </div>
      </Accordion>

      <Accordion title="Services">
        <div
          className="d-flex flex-column flex-wrap align-items-center  justify-content-center gap-3 p-3  "
          style={{ border: "1px solid rgb(204, 204, 204)" }}
        >
          <h6 className="mb-0 pb-0">
            Stops at the same location (latitude/longitude)
          </h6>
          <p className="mb-0 pb-0">All ok</p>
        </div>
        <div
          className="d-flex flex-column flex-wrap align-items-center  justify-content-center gap-3 p-3  "
          style={{ border: "1px solid rgb(204, 204, 204)" }}
        >
          <h6>Stops with reversed names</h6>
          <p>All ok</p>
        </div>{" "}
        <div
          className="d-flex flex-column flex-wrap align-items-center  justify-content-center gap-3 p-3  "
          style={{ border: "1px solid rgb(204, 204, 204)" }}
        >
          <h6>Stops that are not used in a trip</h6>
          <p>All ok</p>
        </div>
      </Accordion>
    </div>
  );
};
