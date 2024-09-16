import React, { useState } from "react";

const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const accordionData = [
    {
      title: "Performance package",
      content:
        "In our Performance package, you have access to both T1 Enroute and T2 Performance transit services. These services enable the digitalization of your transit network and connect vehicles to collect performance data along routes. You can then visualize and analyze this data, gaining vital insights into your transit network's topology, fleet performance, and service efficiency.",
    },
    {
      title: "Schedules package",
      content:
        "Our Schedules package gives you the advantages of not only T1 Enroute and T2 Performance transit services, but also our T3 Schedules transit service. This allows you to create Dynamic GTFS Schedules and adjust frequency time bands and vehicle counts to customize your schedules according to current passenger demand and traffic conditions.",
    },
    {
      title: "GTFS Static package",
      content:
        "In our GTFS Static package, you'll discover T1 Enroute, T2 Performance, T3 Schedules, and T4 GTFS Static transit services. This comprehensive package equips you with the necessary tools to effortlessly generate GTFS Static files, laying the groundwork for the creation of GTFS Realtime data.",
    },
    {
      title: "GTFS Realtime package",
      content:
        "Within our GTFS Realtime package, you will find a range of transit services, including T1 Enroute, T2 Performance, T3 Schedules, T4 GTFS Static, and T5 GTFS Realtime. This comprehensive package provides you with all the essential tools required to easily create and distribute GTFS Realtime feeds.",
    },
    {
      title: "Operations package",
      content:
        "Our Operations package offers the full spectrum of our transit services, encompassing T1 Enroute, T2 Performance, T3 Schedules, T4 GTFS Static, T5 GTFS Realtime, and T6 Operations. These services are essential for effective operations control, enabling you to manage your entire vehicle fleet successfully.",
    },
  ];

  return (
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
  );
};

export default Accordion;
