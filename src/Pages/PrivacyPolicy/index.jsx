import React, { useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import Subscribe from "../../Components/Subscribe";
import FaqBannner from "../../Components/FaqBanner";

const PrivacyPolicy = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  const accordionData = [
    {
      title: "What personal information we collect",
      content: (
        <>
          <p className="mb-2">
            Bus Mate collects information about you and your interactions with
            us when you purchase or use any of Bus Mate’s products or services,
            call us or visit Bus Mate’s website. Bus Mate collects information
            on Australian and New Zealand businesses in a lawful manner both
            from organisations directly and from publicly available sources in
            order to maintain the Bus Mate database.
          </p>
          <p className="mb-2">
            Bus Mate takes reasonable steps to ensure individuals listed in the
            database are aware of its identity, the purpose of collection and
            possible use of their personal information and, to the extent
            practicable, obtains consent to such use.
          </p>
          <p className="mb-2">
            The business information Bus Mate captures on Australian and New
            Zealand organisations can include: <br />
          </p>
          <ul>
            <li>Official Job Titles</li>
            <li>Company Name</li>
            <li>Division Names</li>
            <li>Ultimate Parent Company Name</li>
            <li>Postal Address</li>
            <li>General Switchboard Telephone Number</li>
            <li>General Email Address</li>
            <li>General Facsimile</li>
            <li>URL</li>
            <li>Publicly Listed / Private</li>
            <li>Number of Employees</li>
            <li>Sales / Operating Revenue</li>
            <li>Business Activity (Industry Codes and Keywords)</li>
          </ul>
          <p />
          <p className="mb-2">
            Bus Mate uses cookies, and cookie replacements, available via Google
            to count visitors to its web site and understand how they access and
            use it. These cookies do not identify visitors and are used only to
            improve the site’s effectiveness and relevance.
          </p>
          <p className="mb-2">
            Bus Mate does not collect sensitive information about an individual.
          </p>
        </>
      ),
    },
    {
      title: "Why we collect, hold and use personal information",
      content: (
        <>
          <p class="mb-2">
            The purpose of the Bus Mate database is to facilitate effective
            contact between buyers and sellers in the Australian and New Zealand
            business-to-business or B2B marketplace. The Bus Mate database
            covers companies and organisations in Australia and New Zealand. It
            contains firmographic data on the companies and organisations and
            relevant decision makers within them.
          </p>
          <p class="mb-2">
            Bus Mate collects, holds and uses personal information only for the
            purposes for which it was collected which are directly related to
            Bus Mate’s functions and activities, namely:
            <ul>
              <li>maintenance of the quality of the Bus Mate database; </li>
              <li>
                provision of business information to clients for marketing
                purposes;
              </li>
              <li>
                to provide you with products and services, or manage our
                relationship with you;
              </li>
              <li>
                contacting or responding to you, or if we need to tell you
                something important; or
              </li>
              <li>complying with our legal obligations.</li>
            </ul>
          </p>
          <p class="mb-2">
            If you do not provide us with your personal information we may not
            be able to provide our services to you, or communicate with you, or
            respond to your enquiries.
          </p>
        </>
      ),
    },
    {
      title: " How we collect your personal information",
      content: (
        <>
          <p class="mb-2">
            We will collect your personal information directly from you when you
            interact with us.
          </p>
          <p class="mb-2">
            {" "}
            Bus Mate also collects personal information when it collects company
            information which is used by Bus Mate to maintain its database and
            by Bus Mate clients for marketing purposes. An individual may opt
            out of receiving further contact or request access to their
            information (see below).
          </p>
          <p class="mb-2">
            {" "}
            Most of the information in Bus Mate’s database, such as names of
            individuals or company information is sourced from publicly
            available third-party sources. For example:
            <ul class="d-flex flex-column">
              <il>1: Business Directories</il>
              <il>2: Business Media</il>
              <il>3: Press Clippings</il>
              <il>4: Websites</il>
            </ul>
          </p>
        </>
      ),
    },
    {
      title: "How we store and hold personal information",
      content: (
        <>
          <p class="mb-2">
            Bus Mate employs security procedures to protect information from
            misuse, interference or loss, unauthorised access, modification or
            disclosure. Bus Mate supplies data only to authorised users who have
            contracted to provide an appropriate level of data security.
          </p>

          <p class="mb-2">
            Bus Mate maintains stringent updating procedures to ensure that data
            is accurate, complete and up-to-date. To maintain data accuracy,
            information is verified on a regular basis by telephone.
          </p>
          <p class="mb-2">
            {" "}
            Bus Mate does not use government identifiers on an individual.
          </p>
          <p>
            Bus Mate will also take reasonable steps to destroy or de-identify
            personal information once we no longer require it for the purposes
            for which it was collected or for any secondary purpose permitted
            under the Privacy Act.
          </p>
        </>
      ),
    },
    {
      title: "Who we disclose your personal information to and why",
      content: (
        <>
          <p>
            We may transfer or disclose your personal information to our related
            companies or to external service providers so that they may perform
            services for us or on our behalf. We may also disclose your personal
            information to others where:
            <ul>
              <li> we are required or authorised to do so by law;</li>
              <li>
                you expressly consented to the disclosure or the consent may be
                reasonably inferred from the circumstances; or
              </li>
              <li>
                we are otherwise permitted to disclose the information under the
                Privacy Act.
              </li>
            </ul>
          </p>
        </>
      ),
    },
    // Add more accordion items here
  ];

  return (
    <>
      <Header />
      <FaqBannner
        title="Privacy Policy"
        description="Bus Mate supports privacy protection as a fundamental part of its
     business and has, since launch in 2023, been committed to maintaining
     the highest standards of data integrity and security for the Bus Mate
     database. Bus Mate is a member of the Association for Data-driven
     Marketing & Advertising (ADMA). It adheres to the Code of Practice
     established by ADMA to regulate and guide best practice in marketing."
        description2=" Bus Mate is bound by the Privacy Act 1988 (Cth) (the Privacy Act), the
     Australian Privacy Principles (APPs) as well as other applicable laws
     protecting privacy. This policy describes how Bus Mate collects, uses,
     holds and discloses personal information."
      />
      <hr />
      <div className="container-pricing mb-5">
        <div className="container-privacy-detail mb-5">
          <h1 className="mt-2">In this Privacy Policy</h1>
          <p className="text-secondary">
            Bus Mate means Sarb Management Group Pty Ltd trading as Bus Mate.
          </p>
          <p className="text-secondary">
            Personal information means information or an opinion about an
            identified individual, or about an individual who is reasonably
            identifiable. You consent to us collecting, holding, using and
            disclosing your personal information in accordance with this policy.
          </p>
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

export default PrivacyPolicy;
