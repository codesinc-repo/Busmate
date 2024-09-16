import React from "react";
import Header from "../../Components/Header";
import FaqBannner from "../../Components/FaqBanner";
import Footer from "../../Components/Footer";
import FollowUs from "../../Components/FollowUs";
import { PartnerRegister } from "../../Components/ParnterRegisteration";

const Demo = () => {
  return (
    <>
      <Header />
      <FaqBannner title="Curious to know more?" description="Contact Us" />
      <div className="container p-5">
        <div className="info-section text-center">
          <h1>Let’s talk!</h1>
          <p>
            Our cloud-based platforms have short deployment times and yield
            results almost immediately. From mapping routes and stops to
            connecting buses, we measure vehicle performances to offer cities or
            operators a transit health-check. Our transit services simplify GTFS
            data creation and sharing, improving connectivity, accessibility,
            and passenger experience. Experience the power of real-time data
            firsthand!
          </p>
          <p>hello(at)gtfsbuilder.com</p>
        </div>
      </div>
      <hr />
      <PartnerRegister />
      <FollowUs />
      <Footer />
    </>
  );
};
export default Demo;
