import React, { useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { getFirestore, addDoc, collection, doc } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";

const Contact = () => {
  const db = getFirestore();
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = addDoc(collection(db, "ContactInfo"), {
        firstname,
        lastname,
        email,
        message,
      });
      toast.success(
        "Your message has been sent, we will get in touch with you soon!",
      );

      setFirstName("");
      setLastName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      toast.error(
        "An error has occurred while sending the message",
        error.message,
      );
      console.log(
        "An error has occurred while sending the message",
        error.message,
      );
    }
  };

  return (
    <>
      <ToastContainer />
      <Header />
      <>
        <div className="hero hero-inner">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 mx-auto text-center">
                <div className="intro-wrap">
                  <h1 className="mb-0">Contact Us</h1>
                  <p className="text-white">
                    Reach out to us today and let's start a conversation about
                    how we can help you achieve your goals
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="untree_co-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 mb-5 mb-lg-0">
                <form
                  className="contact-form"
                  data-aos="fade-up"
                  data-aos-delay={200}
                  onSubmit={handleSubmit}
                >
                  <div className="row">
                    <div className="col-6">
                      <div className="form-group">
                        <label className="text-black" htmlFor="fname">
                          First name
                        </label>
                        <input
                          type="text"
                          placeholder="first name"
                          className="form-control"
                          id="fname"
                          required
                          value={firstname}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <label className="text-black" htmlFor="lname">
                          Last name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="last name"
                          required
                          id="lname"
                          value={lastname}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="text-black" htmlFor="email">
                      Email address
                    </label>
                    <input
                      type="email"
                      placeholder="name@gmail.com"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="text-black" htmlFor="message">
                      Message
                    </label>
                    <textarea
                      name=""
                      className="form-control"
                      id="message"
                      cols={30}
                      rows={5}
                      defaultValue={""}
                      placeholder="enter your message"
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Send Message
                  </button>
                </form>
              </div>
              <div className="col-lg-5 ml-auto">
                <div className="quick-contact-item d-flex align-items-center mb-4">
                  <i className="fa-solid fa-house flaticon-house" />
                  <address className="text mb-0">
                    155 Market St #101, Paterson, NJ 07505, United States
                  </address>
                </div>
                <div className="quick-contact-item d-flex align-items-center mb-4">
                  <i className="fa-solid fa-phone flaticon-phone-call" />
                  <address className="text mb-0">+1 202 2020 200</address>
                </div>
                <div className="quick-contact-item d-flex align-items-center mb-4">
                  <i className="fa-solid fa-envelope flaticon-mail" />
                  <address className="text mb-0">@info@mydomain.com</address>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="untree_co-section testimonial-section mt-5 bg-white">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-7 text-center">
                <h2 className="section-title text-center mb-5">Testimonials</h2>
                <div className="owl-single owl-carousel no-nav">
                  <div className="testimonial mx-auto">
                    <figure className="img-wrap">
                      <img
                        src="images/person_2.jpg"
                        alt="Image"
                        className="img-fluid"
                      />
                    </figure>
                    <h3 className="name">Adam Aderson</h3>
                    <blockquote>
                      <p>
                        “There live the blind texts. Separated they live in
                        Bookmarksgrove right at the coast of the Semantics, a
                        large language ocean.”
                      </p>
                    </blockquote>
                  </div>
                  <div className="testimonial mx-auto">
                    <figure className="img-wrap">
                      <img
                        src="images/person_3.jpg"
                        alt="Image"
                        className="img-fluid"
                      />
                    </figure>
                    <h3 className="name">Lukas Devlin</h3>
                    <blockquote>
                      <p>
                        “There live the blind texts. Separated they live in
                        Bookmarksgrove right at the coast of the Semantics, a
                        large language ocean.”
                      </p>
                    </blockquote>
                  </div>
                  <div className="testimonial mx-auto">
                    <figure className="img-wrap">
                      <img
                        src="images/person_4.jpg"
                        alt="Image"
                        className="img-fluid"
                      />
                    </figure>
                    <h3 className="name">Kayla Bryant</h3>
                    <blockquote>
                      <p>
                        “There live the blind texts. Separated they live in
                        Bookmarksgrove right at the coast of the Semantics, a
                        large language ocean.”
                      </p>
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>

      <Footer />
    </>
  );
};

export default Contact;
