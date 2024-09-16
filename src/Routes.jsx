import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import T1Enroute from "./Pages/T1Enroute";
import T2Performance from "./Pages/T2Performance";
import About from "./Pages/About";
import Contact from "./Pages/ContactUs";
import Pricing from "./Pages/Pricing";
import T3Schedules from "./Pages/T3Schedules";
import T4GTFSStatic from "./Pages/T4GTFSStatic";
import T5GTFSRealtime from "./Pages/T5GTFSRealtime";
import T6Operations from "./Pages/T6Operations";
import T7Insights from "./Pages/T7Insights";
import T8Governance from "./Pages/T8Governance";
import SignIn from "./Pages/SignIn";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import PricingFaq from "./Pages/PricingFaq";
import UserFaq from "./Pages/UserFaq";
import DataGarenteeFaq from "./Pages/DataGarenteeFaq";
import TermsOfUse from "./Pages/TermofUse";
import Resources from "./Pages/Resources";
import Demo from "./Pages/Demo";
import ForAuthorities from "./Pages/ForAuthorities";
import ForOperators from "./Pages/ForOperators";
import Partner from "./Pages/Partner";
import { Map } from "./Pages/Map";
import { FrequencyCalculator } from "./Pages/FrequencyCalculator";
import { FleetAge } from "./Pages/FleetAge";
import { SpeedCalculator } from "./Pages/SpeedCalculator";
import { CharterCost } from "./Pages/CharterCost";
import { PeakVehicleEstimator } from "./Pages/PeakVehicleEstimator";
import { BusStopDesign } from "./Pages/BusStopDesign";
import { BusStopCapacity } from "./Pages/BusStopCapacity";
import { TimeTableCreater } from "./Pages/TimeTableCreator";
import ServiceFrequencyCalculator from "./Pages/ServiceFrequencyCalculator";
import AverageSpeedCalculator from "./Pages/AverageSpeedCalculator";
import { TimeTravelAnalyser } from "./Pages/TravelTimeAnalyser";
import { VehicleBlockCreator } from "./Pages/VehicleBlockCreator";
import { MultipleStopTimetable } from "./Pages/MultipleStopTimetable";
import { GTFSFiles } from "./Pages/GTFSFiles";
import { AddTransit } from "./Pages/AddTransit";
import Agnecies from "./Pages/Agencies";
import { ToastContainer } from "react-toastify";
import TimeTable from "./Pages/TimeTable";
import TimetableCreatorGTFS from "./Pages/TimetableCreatorGTFS";
// import Home from "./Pages/Home";

const ProjectRoutes = () => {
  return (
    <>
      <React.Suspense fallback={<>Loading...</>}>
        <Router>
          <ToastContainer />
          <Routes>
            <Route path="/t1enroute" element={<T1Enroute />} />
            <Route path="/" element={<Home />} />
            <Route path="/t2Performance" element={<T2Performance />} />
            <Route path="/About" element={<About />} />
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/Resources" element={<Resources />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/Pricing" element={<Pricing />} />
            <Route path="/t3Schedules" element={<T3Schedules />} />
            <Route path="/T4GTFSStatic" element={<T4GTFSStatic />} />
            <Route path="/T5GTFSRealtime" element={<T5GTFSRealtime />} />
            <Route path="/T6Operations" element={<T6Operations />} />
            <Route path="/T7Insights" element={<T7Insights />} />
            <Route path="/T8Governance" element={<T8Governance />} />
            <Route path="/Privacy&Policy" element={<PrivacyPolicy />} />
            <Route path="/PricingFaq" element={<PricingFaq />} />
            <Route path="/UserFaq" element={<UserFaq />} />
            <Route path="/DataGarenteeFaq" element={<DataGarenteeFaq />} />
            <Route path="/TermOfUse" element={<TermsOfUse />} />
            <Route path="/Demo" element={<Demo />} />
            <Route path="/ForAuthorities" element={<ForAuthorities />} />
            <Route path="/ForOperators" element={<ForOperators />} />
            <Route path="/Partner" element={<Partner />} />
            <Route path="/Map" element={<Map />} />
            <Route
              path="/FrequencyCalculator"
              element={<FrequencyCalculator />}
            />
            <Route path="/FleetAge" element={<FleetAge />} />
            <Route path="/SpeedCalculator" element={<SpeedCalculator />} />
            <Route path="/CharterCost" element={<CharterCost />} />
            <Route
              path="/PeakVehicleEstimator"
              element={<PeakVehicleEstimator />}
            />
            <Route path="/BusStopDesign" element={<BusStopDesign />} />
            <Route path="/BusStopCapacity" element={<BusStopCapacity />} />
            <Route path="/TimeTableCreater" element={<TimeTableCreater />} />
            <Route
              path="/Service-Frequency-Calculator"
              element={<ServiceFrequencyCalculator />}
            />
            <Route
              path="/Average-Speed-Calculator"
              element={<AverageSpeedCalculator />}
            />
            <Route
              path="/TimeTravelAnalyser"
              element={<TimeTravelAnalyser />}
            />
            <Route
              path="/VehicleBlockCreator"
              element={<VehicleBlockCreator />}
            />
            <Route
              path="/multiple_stop_timetable"
              element={<MultipleStopTimetable />}
            />
            <Route path="/GTFS_Files" element={<GTFSFiles />} />
            <Route path="/AddTransit" element={<AddTransit />} />
            <Route path="/Agencies/:id" element={<Agnecies />} />
            <Route path="/Time-Table" element={<TimeTable />} />
            <Route
              path="/timetable-creator"
              element={<TimetableCreatorGTFS />}
            />
          </Routes>
        </Router>
      </React.Suspense>
    </>
  );
};

export default ProjectRoutes;
