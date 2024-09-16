import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Modal } from "bootstrap";

const PricingPlan = () => {
  const [selectedPlan, setSelectedPlan] = useState("");
  const [selectedAmount, setSelectedAmount] = useState(0);

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setSelectedAmount(plans[plan].amount);
    openStripePaymentWindow(plan);
  };

  const openStripePaymentWindow = (plan) => {
    const stripePaymentURL = getStripePaymentURL(plan);
    const stripePaymentWindow = window.open(stripePaymentURL, "_blank");
    if (stripePaymentWindow) {
      stripePaymentWindow.focus();
    } else {
      toast.error("Popup blocked by the browser");
    }
  };

  const getStripePaymentURL = (plan) => {
    // Mapping plans to their respective Stripe payment URLs
    const paymentURLs = {
      bronze: "https://buy.stripe.com/fZe17WfVv56peXu004",
      silver: "https://buy.stripe.com/5kA6sgeRraqJ3eM8wx",
      gold: "https://buy.stripe.com/9AQ3g44cN6at6qY6oq",
      platinum: "https://buy.stripe.com/4gwg2Q7oZcyRaHebIL",
    };

    // Return the corresponding URL for the plan
    return paymentURLs[plan];
  };

  // Define the plans object
  const plans = {
    bronze: {
      amount: 20.0,
      agencies: 1,
      stops: "Unlimited",
      routes: 2,
      import: "unlimited",
    },
    silver: {
      amount: 45.0,
      agencies: 1,
      stops: "Unlimited",
      routes: 5,
      import: "unlimited",
    },
    gold: {
      amount: 150.0,
      agencies: 2,
      stops: "Unlimited",
      routes: 20,
      import: "unlimited",
    },
    platinum: {
      amount: 300.0,
      agencies: 4,
      stops: "Unlimited",
      routes: 50,
      import: "unlimited",
    },
  };

  return (
    <>
      <>
        <div className="untree_co-section pb-0 mb-0 p-0">
          <div className="demo">
            <div className="container">
              <div className="row">
                {Object.keys(plans).map((planKey) => (
                  <div key={planKey} className="col-md-3 col-sm-6">
                    <div className="pricingTable">
                      <h3 className="title">
                        {planKey.charAt(0).toUpperCase() + planKey.slice(1)}
                      </h3>
                      <div className="price-value">
                        <span className="currency">AU$</span>
                        <span className="amount">{plans[planKey].amount}</span>
                        <span className="month">/month per user</span>
                      </div>
                      <ul className="pricing-content">
                        <li>
                          <b>Agencies:</b> {plans[planKey].agencies}
                        </li>
                        <li>
                          <b>Stops:</b> {plans[planKey].stops}
                        </li>
                        <li>
                          <b>Routes:</b> {plans[planKey].routes}
                        </li>
                        <li>
                          <b>Import/export:</b> {plans[planKey].import}
                        </li>
                      </ul>
                      <button
                        className="btn btn-success"
                        onClick={() => handleSelectPlan(planKey)}
                      >
                        Pay with Stripe
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};
export default PricingPlan;
