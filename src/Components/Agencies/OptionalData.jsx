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
        <div className="col-md-4 d-flex  justify-content-between align-items-center  ">
          <h4 className="mb-0 pb-0">{title}</h4>
          <h3 className="mb-0 pb-0">0 Entries</h3>
        </div>
        <div className="col-md-4"></div>
        <div className="col-md-4 text-end d-flex justify-content-end gap-4 align-items-center">
          <h3 className="mb-0 pb-0">Optional</h3>
          <button
            id="add_stop_btn"
            className="btn btn-outline-dark  px-2 py-1"
            style={{ marginTop: 0 }}
          >
            <i className="fa fa-plus mr-1"></i>Add
          </button>
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

export const OptionalData = () => {
  return (
    <div>
      <Accordion title="Blocks">
        <table className="table table-striped table-bordered w-100">
          <thead>
            <tr>
              <th>Block Id</th>
              <th>Name</th>
              <th>Edit</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            <tr></tr>
          </tbody>
        </table>
      </Accordion>

      <Accordion title="Fare Attributes">
        <table className="table table-striped table-bordered w-100">
          <thead>
            <tr>
              <th>Block Id</th>
              <th>Name</th>
              <th>Edit</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            <tr></tr>
          </tbody>
        </table>
      </Accordion>

      <Accordion title="Fare Rules">
        <table className="table table-striped table-bordered w-100">
          <thead>
            <tr>
              <th>Block Id</th>
              <th>Name</th>
              <th>Edit</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            <tr></tr>
          </tbody>
        </table>
      </Accordion>

      <Accordion title="Transfers">
        <table className="table table-striped table-bordered w-100">
          <thead>
            <tr>
              <th>Block Id</th>
              <th>Name</th>
              <th>Edit</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            <tr></tr>
          </tbody>
        </table>
      </Accordion>

      <Accordion title="Fare Zones">
        <table className="table table-striped table-bordered w-100">
          <thead>
            <tr>
              <th>Block Id</th>
              <th>Name</th>
              <th>Edit</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            <tr></tr>
          </tbody>
        </table>
      </Accordion>
    </div>
  );
};
