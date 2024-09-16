import React, { useState } from "react";
import Header from "../../Components/Header";
import FaqBannner from "../../Components/FaqBanner";
import Subscribe from "../../Components/Subscribe";
import Footer from "../../Components/Footer";

const DataGarenteeFaq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  const accordionData = [
    {
      title: "What is the Bus Mate Data Guarantee?",
      content: (
        <>
          <p>
            We’re proud of our data quality and we want everyone to know it. If
            you find an error, let us know, and you can claim your credits back
            up to a maximum of 15% of your monthly credit subscription.
          </p>
        </>
      ),
    },
    {
      title: "How does Bus Mate collect and maintain all this data?",
      content: (
        <>
          <p>
            Our data is collected by expert researchers in Australia and
            delivered in compliance with our relevant privacy regulations, so
            you know you’re in safe hands.
          </p>
        </>
      ),
    },
    {
      title: "When will my credits be returned?",
      content: (
        <>
          <p>
            All good relationships are built on trust, and we don’t like to keep
            you waiting. Any credits claimed under the Data Guarantee (up to a
            maximum of 15% of your total monthly credit subscription) will be
            credited in the following billing cycle.
          </p>
        </>
      ),
    },
  ];

  return (
    <>
      <Header />
      <FaqBannner
        title="Get the FAQs"
        description="Get all the answers to your questions so you have 100% confidence Bus Mate
        is right for you and your business."
      />
      <hr />
      <div className="container-pricing mb-5">
        <div className="container-privacy-detail mb-5">
          <h1 className="mt-2">Data Guarantee:</h1>
        </div>
        <div className="faq__accordion-wrapper">
          <div className="container">
            <ul className="accordion">
              {accordionData.map((item, index) => (
                <li className="accordion__item" key={index}>
                  <a
                    href="javascript:void(0)"
                    className={
                      "accordion__link" +
                      (activeIndex === index ? " accordion__link_active" : "")
                    }
                    onClick={() => toggleAccordion(index)}
                  >
                    {item.title}
                  </a>
                  {activeIndex === index && (
                    <ul className="sub-accordion">
                      <li className="sub-accordion__item">{item.content}</li>
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Subscribe />
      <Footer />
    </>
  );
};
export default DataGarenteeFaq;
