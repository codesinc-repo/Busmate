import React, { useState } from "react";
import "./Pricing.css";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import FollowUs from "../../Components/FollowUs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Modal } from "bootstrap";
import PricingPlan from "../../Components/PricingPlan";

const Pricing = () => {
  return (
    <>
      <Header />
      <main>
        {/* pricing cards */}
        <div className="untree_co-section pricing-info pb-0 mb-0">
          <div className="row text-center justify-content-center mb-5">
            <div className="col-lg-7">
              <p className="mb-0 text-light">
                Affordable Tools &amp; Calculators
              </p>
              <h2 className="section-title text-center text-light">
                Our Pricing Plans
              </h2>
            </div>
          </div>
          <div className="demo">
            <PricingPlan />
          </div>
        </div>
        {/* pricing ends */}

        <FollowUs />
      </main>

      <Footer />
    </>
  );
};

export default Pricing;
