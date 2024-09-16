import FontAwesome from "react-fontawesome";
import FaqBannner from "../../Components/FaqBanner";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import Subscribe from "../../Components/Subscribe";
import { TryToolkitFree } from "../../Components/TryToolkitFree";

export const FrequencyCalculator = () => {
  return (
    <>
      <Header />
      <FaqBannner
        title="Service Frequency Calculator"
        description="Calculate and convert service frequency to trips per hour and vice versa"
      />
      <div className="untree_co-section">
        <div className="container tools-container">
          <div className="row">
            <div className="col-lg text-center">
              <h2 className="section-title text-center mb-3" data-aos="fade-up">
                Service Frequency Calculator
              </h2>
              <p>
                Calculate and convert service frequency to trips per hour and
                vice versa
              </p>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md tools-container">
              <>
                <h1>Our Service Frequency Calculator</h1>
                <p>
                  The frequency of a service is a term often used in the
                  transport industry. It is a term that is also regularly
                  confused with the number of services in an hour. For example:
                  a 6 minute frequency means 10 services an hour while 6
                  services an hour means a 10 minute frequency.
                </p>
                <p>This tool will help you calculate:</p>
                <ul>
                  <li className="my-2">
                    Trips per hour (Service Frequency To Trips Per Hour)
                  </li>
                  <li className="my-2">
                    Service Frequency (Trips Per Hour To Service)
                  </li>
                </ul>
                <div className="text-center mb-4">
                  <img src="/images/service_frequency.jpg" alt="" />
                </div>
                <p>
                  Determining the service frequency for a transport operation is
                  a key component of the planning process. There are various
                  approaches to determining the appropriate level of frequency,
                  these include:
                </p>
                <ul>
                  <li>
                    <strong>Policy:</strong> Some jurisdictions have policy
                    positions that establish a minimum level of service
                    frequency, these are often referred to as Minimum Service
                    Levels (MSL’s).
                  </li>
                  <li>
                    <strong>Loading Analysis:</strong> This approach identifies
                    the actual or expected number of passengers per hour or half
                    that will use the service. Based on patronage, a calculation
                    using an average number of passengers per bus can be used to
                    derive the number of services within that time period.
                  </li>
                  <li>
                    <strong>Frequencies:</strong> Are often referred to as
                    headways, meaning the time between services. In some
                    jurisdictions, headway is measured to understand contractual
                    compliance. This is an alternate approach to measuring
                    on-time running from a point or points (Start, mid, and/or
                    end).
                  </li>
                </ul>
                <p>
                  The term “Turn Up and Go” is becoming more and more used to
                  describe services. It’s a customer term used to inform the
                  customer that no timetable is required, simply turn up and the
                  next service will arrive within a short period of time.
                  Essentially, turn up and go services will have a maximum wait
                  time expectation. For example, no greater than 10 minutes.
                </p>
                <p>
                  This tool is available under our Free, Silver, Gold, and
                  Platinum packages. Refer to our Pricing page for more
                  information.
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
