import FaqBannner from "../../Components/FaqBanner";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import Subscribe from "../../Components/Subscribe";
import { TryToolkitFree } from "../../Components/TryToolkitFree";

export const FleetAge = () => {
  return (
    <>
      <Header />
      <FaqBannner
        title="Average Fleet Age"
        description="Calculate the Average Age of your fleet and check you are meeting any age requirements"
      />
      <div className="untree_co-section">
        <div className="container">
          <div className="row">
            <div className="col-lg text-center">
              <h2 className="section-title text-center mb-3" data-aos="fade-up">
                Average Fleet Age
              </h2>
              <p>
                Calculate the Average Age of your fleet and check you are
                meeting any age requirements
              </p>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md tools-container">
              <h1>Record and Manage Your Fleet Information</h1>

              <p>
                Record and manage your fleet information across multiple
                operations or contracts. Forecast when you need to replace
                assets that have reached any average age of maximum age
                requirements. Each operator or jurisdiction will have varying
                requirements and Transport Toolkit allows you to input and
                adjust these requirements.
              </p>

              <h2>Features:</h2>
              <ul>
                <li>
                  Easily add, delete, or amend asset records (Trucks, Buses,
                  Trains, Trams, Taxis, Ferries, etc.) within minutes.
                </li>
                <li>Project asset age across your fleet.</li>
                <li>
                  Perform "what-if" scenarios for asset movements or changes.
                </li>
                <li>Calculate the age of assets with the Average Age tool.</li>
              </ul>

              <h3>How Average Age is Calculated:</h3>
              <ul>
                <li>
                  All assets are not 1 until they reach their first birthday
                  based on the Make Date or Date of Birth.
                </li>
                <li>The age is calculated with no decimal places.</li>
              </ul>

              <p>
                For example, an asset with a Make Date or Date of Birth of 1
                January 2019 will be recorded as 0 age until 1 January 2020 when
                it turns 1. The calculation of age is consistent with how we
                determine our own age.
              </p>

              <p>
                Transport Toolkit acknowledges that there are various ways to
                calculate vehicle age and average age for fleets. For operators
                and regulators who would like different age calculations, please
                feel free to contact us to see what is possible.
              </p>

              <h3>How to Use the Average Fleet Age Calculator:</h3>
              <ol>
                <li>Create an account and go to My Profile.</li>
                <li>Click on My Fleet and add fleet information.</li>
                <li>
                  Go to My Vehicles and add new vehicles, specifying the Make
                  Date.
                </li>
                <li>Access the Average Vehicle Age tool from the Tool menu.</li>
                <li>
                  Select the fleet/s and enter the relevant information to
                  calculate the Average Age.
                </li>
              </ol>

              <p>
                You can save all of your calculations, which is perfect if you
                want to create a number of "What If" scenarios.
              </p>

              <p>
                This tool is available under our Silver, Gold, and Platinum
                packages. Refer to our Pricing page for more information.
              </p>
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
