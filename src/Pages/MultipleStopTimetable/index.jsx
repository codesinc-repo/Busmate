import { React, useState } from "react";
import FontAwesome from "react-fontawesome";
import FaqBannner from "../../Components/FaqBanner";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import Subscribe from "../../Components/Subscribe";
import { TryToolkitFree } from "../../Components/TryToolkitFree";
import "bootstrap/dist/css/bootstrap.min.css";

export const MultipleStopTimetable = () => {
  return (
    <>
      <Header />
      <FaqBannner
        title="Multiple Stop Timetable"
        description="Create a detailed transit timetables with multiple stops and variable running times easily and efficiently"
      />
      <div className="untree_co-section ">
        <div className="container">
          <div className="row">
            <div className="col-lg text-center">
              <h2 className="section-title text-center mb-3" data-aos="fade-up">
                Multiple Stop Timetable
              </h2>
              <p>
                Create a detailed transit timetables with multiple stops and
                variable running times easily and efficiently
              </p>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md tools-container">
              <>
                <p>
                  Our Multiple Stop Timetable creator is based off our Timetable
                  Creator tool with some additional functionality and features.
                  Unlike the Timetable Creator, this tool allows you to nominate
                  multiple stops and variable travel times by time of day and
                  between each of the stops you enter. The tool also allows you
                  to add, delete and edit individual trips with ease.
                </p>
                <p>
                  Our tool takes the complexity out of creating a detailed
                  transit timetable and enables you to perform this task within
                  minutes. Most importantly, you don’t need years of experience
                  or to spend thousands of dollars on overly complex software
                  that is difficult to learn and use.
                </p>
                <p>
                  The image below provides an insight as to what you can produce
                  using this tool.
                </p>
                <div className="text-center mt-5 mb-4">
                  <img
                    src="/images/multiplestoptimetable.png"
                    width={"70%"}
                    alt=""
                  />
                </div>
                <p>
                  This tool is available under our Gold and Platinum packages.
                  Refer to our <b>Pricing</b> page for more information.
                </p>
              </>
            </div>
          </div>
          <TryToolkitFree />
        </div>
      </div>

      <Subscribe />
      <Footer />
    </>
  );
};
