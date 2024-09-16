import React from "react";
import "./footer.css";
const Footer = () => {
  return (
    <>
      <div className="site-footer">
        <div className="inner first">
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-lg-4">
                <div className="widget">
                  <h3 className="heading">
                    <strong>About Tour</strong>
                  </h3>
                  <p className="text-dark">
                    Far far away, behind the word mountains, far from the
                    countries Vokalia and Consonantia, there live the blind
                    texts.
                  </p>
                </div>
                <div className="widget">
                  <ul className="list-unstyled social">
                    <li>
                      <a href="#">
                        <i className="fa-brands fa-youtube" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa-brands fa-instagram" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa-brands fa-facebook" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa-brands fa-linkedin" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa-brands fa-dribbble" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa-brands fa-pinterest" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa-brands fa-apple" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa-brands fa-google" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <>
                <div className="col-md-6 col-lg-2 pl-lg-5">
                  <div className="widget">
                    <h3 className="heading">
                      <strong>Pages</strong>
                    </h3>
                    <ul className="links list-unstyled">
                      <li>
                        <a href="/">GTFS</a>
                      </li>
                      <li>
                        <a href="/resources">Resources</a>
                      </li>
                      <li>
                        <a href="/signin">Login</a>
                      </li>
                      <li>
                        <a href="/Privacy&Policy">Privacy Policy</a>
                      </li>
                      <li>
                        <a href="/TermOfUse">Term of Use</a>
                      </li>
                    </ul>
                  </div>
                  <div className="widget">
                    <h3 className="heading">
                      <strong>FAQs</strong>
                    </h3>
                    <ul className="links list-unstyled">
                      <li>
                        <a href="/PricingFAQ">Pricing</a>
                      </li>
                      <li>
                        <a href="/UserFaq">Account &amp; Users</a>
                      </li>
                      <li>
                        <a href="/DataGarenteeFaq">Data Guarantee</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-6 col-lg-2">
                  <div className="widget">
                    <h3 className="heading">
                      <strong> Transit Services </strong>
                    </h3>
                    <ul className="links list-unstyled">
                      <li>
                        <a href="/t1enroute"> Enroute </a>
                      </li>
                      <li>
                        <a href="/t2performance"> Performance </a>
                      </li>
                      <li>
                        <a href="/t3Schedules"> Schedules </a>
                      </li>
                      <li>
                        <a href="/t4GTFSStatic"> GTFS Static </a>
                      </li>
                      <li>
                        <a href="/t5GTFSRealtime"> GTFS Realtime </a>
                      </li>
                      <li>
                        <a href="/t6Operations"> Operations </a>
                      </li>
                      <li>
                        <a href="/t7Insights"> Insights </a>
                      </li>
                      <li>
                        <a href="/t8Governance"> Governance </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4">
                  <div className="widget">
                    <h3 className="heading">
                      <strong>Contact</strong>
                    </h3>
                    <ul className="list-unstyled quick-info links">
                      <li className="email">
                        <a href="#">mail@example.com</a>
                      </li>
                      <li className="phone">
                        <a href="#">+1 222 212 3819</a>
                      </li>
                      <li className="address">
                        <a href="#">
                          43 Raymouth Rd. Baltemoer, Australia 3910
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </>
            </div>
          </div>
        </div>
        <div className="inner dark copy-right-color">
          <div className="container">
            <div className="row text-center">
              <div className="col-md-8 mb-3 mb-md-0 mx-auto">
                <p className="text-dark">
                  Copyright © . All Rights Reserved. —
                  <a href="/" target="_blank">
                    Bus Mate
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
