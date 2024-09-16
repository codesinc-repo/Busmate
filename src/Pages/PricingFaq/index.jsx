import React, { useState } from "react";
import Header from "../../Components/Header";
import FaqBannner from "../../Components/FaqBanner";
import Subscribe from "../../Components/Subscribe";
import Footer from "../../Components/Footer";

const PricingFaq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  const accordionData = [
    {
      title: "How much does Bus Mate cost?",
      content: (
        <>
          <p>
            Everyone’s relationship is different, which is why Bus Mate offers a
            range of price points and account types to make sure that our
            customers get maximum satisfaction. Check out our pricing and plans{" "}
            <a href="pricing.html">here</a>.
          </p>
        </>
      ),
    },
    {
      title: "How often will I be billed and when?",
      content: (
        <>
          <p>
            We’re flexible, so it all depends on your appetite for commitment.
            If you like to keep things casual, you can take out a monthly
            subscription. We’ll charge you on the date of purchase every month.
            If you purchase on the 1st, we’ll renew on the first of the
            following month.
          </p>
        </>
      ),
    },
    {
      title: "Can I upgrade or downgrade my plan?",
      content: (
        <>
          <p>
            Absolutely! We’re flexible. Head over to the Change Your Plan option
            on the Bus Mate application and select your new plan. You’ll be
            given the opportunity to update your payment and company details,
            and then you’ll need to confirm the change via email.
          </p>
        </>
      ),
    },
    {
      title: "What payment methods are accepted by Bus Mate?",
      content: (
        <>
          <p>
            Bus Mate accepts payments via Visa and MasterCard. We also accept
            AMEX, however there is a small transaction fee. For Enterprise
            clients we offer direct deposit or bank transfer.{" "}
            <a href="contact.html">Contact us</a> and we’ll supply you with the
            required details.
          </p>
        </>
      ),
    },
    {
      title: "What are Bus Mate credits?",
      content: (
        <>
          <p>
            Credits are what allows you to strip down your network with Bus
            Mate. When you click to take a peek at your prospects’ contact
            information, it uses a credit. The type of account you have
            determines how many credits you have per month to use however you
            wish. A free account comes with 5 credits to try, so you can get
            started right away and see just how fast Bus Mate can expose your
            network and get you selling smarter, faster.
          </p>
        </>
      ),
    },
    {
      title: "What if I need more credits than I have?",
      content: (
        <>
          <p>
            We know that part of any strong relationship is finding a partner
            willing and able to meet your individual needs. So if you’re worried
            about running out of credits early this month, our plans are
            flexible enough to accommodate you. For any paid account type,
            current subscribers can purchase a top up to their credits. If you
            find this is happening a lot, though, you might need to break it off
            and start seeing other Bus Mate plans. Give our team a call. We aim
            for maximum satisfaction, so we’d be happy to help tailor your
            account to meet your needs.
          </p>
        </>
      ),
    },
    {
      title: "What happens if I don't use my credits in the month?",
      content: (
        <>
          <p>
            Haven’t been in the mood? For any paid account type, current
            subscribers can roll them over to the next month. This also applies
            to top-up credits. If it’s on your account that month, you can roll
            it over to the next month.
          </p>
        </>
      ),
    },
    {
      title: "Can I cancel my subscription?",
      content: (
        <>
          <p>
            Want to cool things down and break it off? We’ll be sad to see you
            go, but we know you don’t like messy break-ups, and we don’t either.
            You can cancel your subscription with just a 14 business days
            notice.
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
          <h1 className="mt-2">Pricing:</h1>
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
export default PricingFaq;
