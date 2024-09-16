import React, { useState } from "react";
import Header from "../../Components/Header";
import FaqBannner from "../../Components/FaqBanner";
import Subscribe from "../../Components/Subscribe";
import Footer from "../../Components/Footer";

const UserFaq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  const accordionData = [
    {
      title: "How many users can I have?",
      content: (
        <>
          <p>
            It doesn’t need to be a private show. Any paid Bus Mate account
            comes with unlimited users.
          </p>
        </>
      ),
    },
    {
      title: "What is Bus Mate?",
      content: (
        <>
          <p>
            Our goal is to give sales professionals all the information they
            could need to prospect effectively with just one click. We’re backed
            by decades of sales experience and data expertise, and a
            long-standing database that’s updated regularly to maintain its
            industry-leading accuracy. And best of all? We’re privy to all sorts
            of intimate details about business contacts across Australia and New
            Zealand, ready and waiting for you to explore.
          </p>
        </>
      ),
    },
    {
      title: "Can I try Bus Mate without having to pay for an account?",
      content: (
        <>
          <p>
            We believe that first dates ought to be low-stakes, and so should
            finding out more about our service. Our lowest-tier account is free,
            so you can try it out with one user account and 5 credits per
            month—no commitment required. It’s enough to whet the appetite.
          </p>
        </>
      ),
    },
    {
      title: "I can’t sign up using my email address",
      content: (
        <>
          <p>
            This problem could occur for a couple of reasons. Firstly, if your
            email address is already registered with Bus Mate, you don’t need to
            sign up again! Please reset your password (link) instead. Secondly…
            Like most of you, we prefer to feel confident in the identities of
            our partners to avoid heartbreak! If you try to join us using a
            commercial email address (for example, an @gmail.com or an
            @hotmail.com email address), we may reject your sign-up attempt. Try
            using an organisational email instead. If you don’t have one, there
            are other ways we can get to know one another—give us a call
            instead.
          </p>
        </>
      ),
    },
    {
      title: "I didn’t receive my email from Bus Mate",
      content: (
        <>
          <p>
            We absolutely did not mean to stand you up! Please first give it a
            few minutes, and then check to make sure our email hasn’t gotten
            caught up in your spam filter by accident. If you’re still having
            trouble, contact us with your email address, organisation name and
            contact number and let us know the details of the problem, and we’ll
            get back to you as soon as possible.
          </p>
        </>
      ),
    },
    {
      title: "I’ve forgotten the password to my account",
      content: (
        <>
          <p>
            Not to worry! Just click “forgot my password” on the Bus Mate login
            page.
          </p>
        </>
      ),
    },
    {
      title: "Is Bus Mate GDPR compliant?",
      content: (
        <>
          <p>
            Bus Mate is an Australian business and we aren’t established in the
            European Union or the European Economic Area. GDPR doesn’t generally
            apply to our activities, because they take place in Australia and
            New Zealand, and we don’t generally offer data about activities in
            the EU.
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
          <h1 className="mt-2">Account & User:</h1>
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
export default UserFaq;
