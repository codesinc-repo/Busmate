import React, { useState, useEffect } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import {
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [emailVerificationMessage, setEmailVerificationMessage] = useState("");
  const [show, setShow] = useState(false);
  const auth = getAuth();
  const db = getFirestore();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        checkEmailVerificationStatus(user);
      } else {
        setEmailVerificationMessage("");
      }
    });

    const unsubscribeNotifications = onSnapshot(
      collection(db, "notifications"),
      (snapshot) => {
        const notificationData = snapshot.docs.map((doc) => doc.data());
        setNotifications(notificationData);
      },
    );

    return () => {
      unsubscribe();
      unsubscribeNotifications();
    };
  }, [auth, db]);

  const checkEmailVerificationStatus = async (user) => {
    try {
      const registeredUserRef = doc(db, "RegisteredUsers", user.email);
      const docSnap = await getDoc(registeredUserRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.verified) {
          setEmailVerificationMessage(
            `Your email is verified. You are logged in for the next 30 days.`,
          );
        } else if (data.trialExpiration) {
          const currentDate = new Date();
          if (currentDate.getTime() < data.trialExpiration) {
            const remainingDays = Math.ceil(
              (data.trialExpiration - currentDate.getTime()) /
                (1000 * 60 * 60 * 24),
            );
            setEmailVerificationMessage(
              `Your email is not verified yet. You have ${remainingDays} days remaining for verification. Please check your inbox for the email or resend the verification email.`,
            );
          } else {
            setEmailVerificationMessage(
              `Your trial period has expired. Please verify your email.`,
            );
          }
        } else {
          setEmailVerificationMessage(
            `Your email is not verified yet. Please check your inbox for the email or resend the verification email.`,
          );
        }
      } else {
        setEmailVerificationMessage(
          `Your email is not verified yet. Please check your inbox for the email or resend the verification email.`,
        );
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Error fetching user data. Please try again later.");
    }
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        toast.success("Successfully signed out.");
      })
      .catch((error) => {
        console.error("Sign out error:", error);
        toast.error("Failed to sign out.");
      });
  };

  const handleResendVerificationEmail = () => {
    if (user) {
      sendEmailVerification(auth.currentUser)
        .then(() => {
          toast.success("Verification email sent.");
        })
        .catch((error) => {
          toast.error("Error sending verification email: " + error.message);
        });
    }
  };

  const handleClearAll = async () => {
    try {
      await Promise.all(
        notifications.map(async (notification) => {
          if (notification.id) {
            const notificationRef = doc(db, "notifications", notification.id);
            await deleteDoc(notificationRef);
            toast.success("Notification deleted.");
          } else {
            toast.warn("Notification ID is missing.");
          }
        }),
      );
      setNotifications([]);
      toast.success("All notifications cleared successfully.");
    } catch (error) {
      toast.error("Error clearing notifications: " + error.message);
    }
  };

  const handleFileClick = () => {
    if (user) {
      navigate("/GTFS_Files");
    } else {
      toast.error("Please login to manage your GTFS filesystem");
      setTimeout(() => {
        navigate("/signin");
      }, 1000);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="verify-email d-flex justify-content-center">
        {emailVerificationMessage && (
          <div className="email-verification-message">
            {emailVerificationMessage}{" "}
            {user && !user.emailVerified && (
              <a href="#" onClick={handleResendVerificationEmail}>
                Resend verification email
              </a>
            )}
          </div>
        )}
      </div>
      <nav className="site-nav">
        <div className="container-fluid px-2 px-md-2">
          <div className="site-navigation">
            <a href="/" className="logo m-0">
              <img src="/images/logo white.png" width={200} alt="" />
              <span className="text-primary" />
            </a>
            <ul className="js-clone-nav d-none d-lg-inline-block text-left site-menu float-right">
              <li className="active" onClick={handleFileClick}>
                <a href="#">GTFS</a>
              </li>
              <li>
                <a href="/Resources">Resources</a>
              </li>
              <li>
                <a href="/Pricing">Pricing</a>
              </li>
              <li className="dropdown">
                <a
                  href="#"
                  className="dropdown-toggle"
                  data-toggle="dropdown"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  About GTFS <span className="caret" />
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a href="/T1Enroute"> Enroute </a>
                  </li>
                  <li>
                    <a href="/T2Performance"> Performance </a>
                  </li>
                  <li>
                    <a href="/T3Schedules"> Schedules </a>
                  </li>
                  <li>
                    <a href="/T4GTFSStatic"> GTFS Static </a>
                  </li>
                  <li>
                    <a href="/T5GTFSRealtime"> GTFS Realtime </a>
                  </li>
                  <li>
                    <a href="/T6Operations"> Operations </a>
                  </li>
                  <li>
                    <a href="/T7Insights"> Insights </a>
                  </li>
                  <li>
                    <a href="/T8Governance"> Governance </a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="/Partner">How it Works</a>
              </li>
              <li className="dropdown">
                <a
                  href="#"
                  className="dropdown-toggle"
                  data-toggle="dropdown"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Company <span className="caret" />
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a href="/About">About</a>
                  </li>
                  <li>
                    <a href="/Contact">Contact Us</a>
                  </li>
                </ul>
              </li>
              <li className="dropdown">
                <a
                  href="#"
                  className="dropdown-toggle"
                  data-toggle="dropdown"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  FAQs <span className="caret" />
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a href="/PricingFaq">Pricing FAQs</a>
                  </li>
                  <li>
                    <a href="/UserFaq">Account & User FAQs</a>
                  </li>
                  <li>
                    <a href="/DataGarenteeFaq">Data Guarantee </a>
                  </li>
                </ul>
              </li>
              {user ? (
                <li className="dropdown dropstart">
                  <a
                    href="#"
                    className="dropdown-toggle"
                    data-toggle="dropdown"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {user.email.split("@")[0]} <span className="caret" />
                  </a>
                  <ul className="dropdown-menu " style={{ minWidth: "7rem" }}>
                    <li>
                      <a href="/AddTransit">Add Transit</a>
                    </li>
                    <li>
                      <a href={""} onClick={handleSignOut}>
                        Logout
                      </a>
                    </li>
                  </ul>
                </li>
              ) : (
                <>
                  <li>
                    <a href="/signin"> Login </a>
                  </li>
                </>
              )}
              <li>
                <a>
                  <i
                    className="fas fa-bell"
                    onClick={handleShow}
                    style={{ cursor: "pointer" }}
                  ></i>
                  {notifications.length > 0 && (
                    <span className="badge">{notifications.length}</span>
                  )}
                </a>
              </li>
            </ul>
            <a
              href="#"
              className="burger ml-auto float-right site-menu-toggle js-menu-toggle d-inline-block d-lg-none light"
              data-toggle="collapse"
              data-target="#main-navbar"
            >
              <span />
            </a>
          </div>
        </div>
      </nav>

      <Modal
        show={show}
        onHide={handleClose}
        centered
        backdrop="static"
        size="lg"
        responsive
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <b>
              <i className="fas fa-bell" /> All Notifications{" "}
            </b>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Message Title</th>
                  <th>Message Detail</th>
                </tr>
              </thead>
              <tbody>
                {notifications.map((notification, index) => (
                  <tr key={index}>
                    <td>{notification.title}</td>
                    <td>{notification.body}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleClearAll}>
            Clear All
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Header;
