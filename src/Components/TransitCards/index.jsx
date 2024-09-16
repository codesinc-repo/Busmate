import React from "react";

const TransitCards = ({
  card1title,
  card1dec,
  card2title,
  card2des,
  card3title,
  card3des,
}) => {
  return (
    <>
      <div className="cards-t2">
        <div className="container">
          <div className="row d-flex justify-content-evenly align-items-center">
            <div
              className="col-lg-4 text-center background-color-card"
              style={{ width: "33%" }}
            >
              <h4>{card1title}</h4>
              <p>{card1dec}</p>
            </div>
            <div
              className="col-lg-4 text-center background-color-card"
              style={{ width: "33%" }}
            >
              <h4>{card2title}</h4>
              <p>{card2des}</p>
            </div>
            <div
              className="col-lg-4 text-center background-color-card"
              style={{ width: "33%" }}
            >
              <h4>{card3title}</h4>
              <p>{card3des}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransitCards;
