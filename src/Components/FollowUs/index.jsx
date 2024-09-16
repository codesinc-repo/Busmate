import React from "react";
import "./followus.css";
const FollowUs = () => {
  return (
    <>
      <div className="follow-us">
        <div className="container text-center social-icons">
          <h3>Stay connected with Bus Mate</h3>
          <p>Follow us in all our channels</p>
          <div className="icons mt-4">
            <ul className="list-unstyled d-flex justify-content-center gap-3 align-items-center fs-2">
              <a href="javascript:void(0)">
                <li>
                  <i className="fa-brands fa-facebook" />
                </li>
              </a>
              <a href="javascript:void(0)">
                <li>
                  <i className="fa-brands fa-instagram" />
                </li>
              </a>
              <a href="javascript:void(0)">
                <li>
                  <i className="fa-brands fa-twitter" />
                </li>
              </a>
              <a href="javascript:void(0)">
                <li>
                  <i className="fa-brands fa-linkedin" />
                </li>
              </a>
              <a href="javascript:void(0)">
                <li>
                  <i className="fa-brands fa-youtube" />
                </li>
              </a>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default FollowUs;
