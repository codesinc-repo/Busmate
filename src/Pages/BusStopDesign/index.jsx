import FontAwesome from "react-fontawesome";
import FaqBannner from "../../Components/FaqBanner";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import Subscribe from "../../Components/Subscribe";
import { TryToolkitFree } from "../../Components/TryToolkitFree";

export const BusStopDesign = () => {
  return (
    <>
      <Header />
      <FaqBannner
        title="Bus Stop Design & Sketch"
        description="Create a sketch of a bus stop including draw in & out and see how many buses it can accommodate"
      />
      <div className="untree_co-section ">
        <div className="container">
          <div className="row">
            <div className="col-lg text-center">
              <h2 className="section-title text-center mb-3" data-aos="fade-up">
                Bus Stop Design & Sketch
              </h2>
              <p>
                Create a sketch of a bus stop including draw in & out and see
                how many buses it can accommodate
              </p>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md tools-container">
              <>
                <p>
                  Our unique Bus Stop Design and Sketch tool allows you to enter
                  various stop measurements and our tool will display these on
                  your screen for you to review instantly. The inputs include:
                </p>

                <ul>
                  <li className="my-2">
                    {" "}
                    The total available kerb space in metres (includes draw in &
                    out),
                  </li>
                  <li className="my-2">The size of the buses,</li>
                  <li className="my-2">Draw in space,</li>
                  <li className="my-2">Draw out space, and</li>
                  <li className="my-2">Distance between buses on the stop.</li>
                </ul>

                <p>
                  As you enter each of the parameters, the tool will draw, on
                  screen, the bus stop. When all parameters have been entered,
                  the tool will calculate how many buses can be accommodated at
                  the stop at any one time. These buses are also shown visually
                  on your screen as light blue rectangles. Below is an example:
                </p>
                <div className="text-center my-4">
                  <img src="/images/busdesign.png" width={"80%"} alt="" />
                </div>
                <p>
                  In the above example two (2) buses are able to use the stop
                  and any one time.
                </p>
                <p>
                  This tool allows you to alter the various inputs on screen
                  within seconds. Create the desired bus stop or stops, save and
                  share them with colleagues easily. The best thing is we will
                  keep a record of what and when you shared it. Keep all your
                  bus stop designs and changes in a single location for easy
                  reference.
                </p>
                <p>
                  Also see our Bus Stop Capacity Check Tool to see if the stop
                  is of sufficient length to efficiently handle the number of
                  services using the stop as a setup or pick up location.
                </p>
                <p>
                  <u>Bus Stop Capacity Tool Link</u> -{" "}
                  <a href=".#">https://gtfsbuilder.com/tools/bus_stop_check</a>
                </p>
                <p>
                  Need to explain how you would like a bus stop setup, simply
                  create it using this tool and send it to the right person for
                  implementation. Don’t leave any doubt about what is required
                  as our design tool provides you with a distance key across the
                  kerb.
                </p>
                <p>
                  This tool is available under our Silver, Gold and Platinum
                  packages. Refer to our <b>Pricing</b> page for more
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
