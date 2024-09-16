import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import {
  addDoc,
  collection,
  getFirestore,
  getDocs,
  doc,
  deleteDoc,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ViewFiles from "../../Components/ViewFiles";
import Header from "../../Components/Header";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  Container,
  Form,
  Button,
  Modal,
  ProgressBar,
  Card,
  Row,
  Col,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "../../Components/Loader";
import useImportGTFS from "../../Components/useImportGTFS";
import Select from "react-select";
import countryList from "react-select-country-list";
import moment from "moment-timezone";
import FaqBanner from "../../Components/FaqBanner";
import Subscribe from "../../Components/Subscribe";
import Footer from "../../Components/Footer";
import JSZip from "jszip";
import "./gtfsfilestables.css";

export const GTFSFiles = () => {
  const [show, setShow] = useState(false);
  const [companyInfo, setCompanyInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const { handleImport } = useImportGTFS();
  const [timezones, setTimezones] = useState([]);
  const [selectedTimezone, setSelectedTimezone] = useState(null);

  const db = getFirestore();
  const auth = getAuth();
  const options = countryList().getData();

  const initialFormData = {
    companyName: "",
    country: "",
    timezone: "",
    language: "",
    companyDesc: "",
    companyUrl: "",
    telephone: "",
    postalAddress: "",
    supportemail: "",
    fareUrl: "",
    companyId: "",
    distanceUnit: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    const tz = moment.tz.names().map((tz) => ({ value: tz, label: tz }));
    setTimezones(tz);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        fetchCompanies(user.uid);
      } else {
        setCurrentUser(null);
      }
    });
    return () => unsubscribe();
  }, [auth]);

  const fetchCompanies = async (userId) => {
    try {
      const companiesRef = collection(db, "created_agencies");
      const q = query(companiesRef, where("userId", "==", userId));
      const snapshot = await getDocs(q);
      const companyList = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt.toDate(),
        };
      });
      setCompanyInfo(companyList);
    } catch (error) {
      console.error("Error fetching companies:", error);
      toast.error("Error fetching companies");
    }
  };

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setFormData(initialFormData);
  };

  const handleInputChange = (input) => {
    const { name, value } = input.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (
      file &&
      (file.type === "application/zip" || file.name.endsWith(".zip"))
    ) {
      try {
        const zip = new JSZip();
        const contents = await zip.loadAsync(file);
        const extractedFiles = [];
        for (const filename of Object.keys(contents.files)) {
          const fileData = await contents.files[filename].async("blob");
          extractedFiles.push({ filename, fileData });
        }
        setFiles(extractedFiles);
        toast.success("Zip file extracted successfully");
      } catch (error) {
        console.error("Failed to extract zip file:", error);
        toast.error("Failed to extract zip file");
      }
    } else {
      toast.error("Please select a valid zip file");
    }
  };

  const handleChange = (selectedOption) => {
    setSelectedTimezone(selectedOption);
    setFormData({ ...formData, timezone: selectedOption.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.companyName) {
      toast.error("Please enter a company name");
      return;
    }

    try {
      setLoading(true);
      setUploadProgress(0);
      if (!currentUser || !currentUser.emailVerified) {
        toast.error("Please login and verify your email.");
        return;
      }

      const companiesRef = collection(db, "created_agencies");
      const q = query(
        companiesRef,
        where("companyName", "==", formData.companyName),
      );
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        setFormData({ companyName: "" });
        setTimeout(() => {
          toast.error("Company with this name already exists.");
        }, 1000);
        return;
      }

      const createdAt = serverTimestamp();
      const docData = {
        ...formData,
        createdAt,
        userId: currentUser.uid,
      };
      const docRef = await addDoc(companiesRef, docData);

      const storage = getStorage();
      const filesRef = collection(db, "imported_files");

      for (const file of files) {
        const storageRef = ref(storage, `files/${docRef.id}/${file.filename}`);
        const uploadTask = uploadBytesResumable(storageRef, file.fileData);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress);
          },
          (error) => {
            console.error("File upload error:", error);
            toast.error("Failed to upload file");
          },
          async () => {
            const fileURL = await getDownloadURL(uploadTask.snapshot.ref);
            const fileDoc = {
              companyId: docRef.id,
              userId: currentUser.uid,
              filename: file.filename,
              createdAt,
              fileURL,
            };
            await addDoc(filesRef, fileDoc);
          },
        );
      }

      toast.success("Company and files added successfully");
      fetchCompanies(currentUser.uid);
      handleClose();
    } catch (error) {
      toast.error("Failed to add company and files");
      console.error("Failed to add company and files", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedCompanies((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((companyId) => companyId !== id)
        : [...prevSelected, id],
    );
  };

  const handleDeleteSelected = async () => {
    if (window.confirm("Are you sure you want to delete selected companies?")) {
      try {
        setLoading(true);
        await Promise.all(
          selectedCompanies.map((id) =>
            deleteDoc(doc(db, "created_agencies", id)),
          ),
        );
        setCompanyInfo(
          companyInfo.filter(
            (company) => !selectedCompanies.includes(company.id),
          ),
        );
        setSelectedCompanies([]);
        toast.success("Selected companies deleted successfully");
      } catch (error) {
        console.error("Error deleting companies:", error);
        toast.error("Failed to delete companies");
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Header />
      <FaqBanner
        title="Manage Your GTFS Files Here"
        description="Add, Delete, & Edit your GTFS Files"
      />
      <Container className="mt-5">
        <header className="d-flex justify-content-between align-items-center mb-4">
          <h1>Transit Companies</h1>
          <Button variant="danger" onClick={handleDeleteSelected}>
            <i className="fa fa-trash"></i>&nbsp;Delete
          </Button>
        </header>
        <Row>
          <Col md={3} sm={6} xs={12} className="mb-4">
            <Card
              className="h-100"
              onClick={handleShow}
              style={{ cursor: "pointer" }}
            >
              <Card.Body className="d-flex align-items-center justify-content-center">
                <div className="text-center">
                  <i className="fa fa-plus fa-3x"></i>
                  <p className="mt-3">Add Company</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
          {companyInfo.map((company) => (
            <Col md={3} sm={6} xs={12} className="mb-4" key={company.id}>
              <Card className="h-100">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <Form.Check
                      type="checkbox"
                      checked={selectedCompanies.includes(company.id)}
                      onChange={() => handleCheckboxChange(company.id)}
                    />
                    <Link
                      className="btn btn-link p-0"
                      to={`/Agencies/${company.id}`}
                    >
                      <Card.Title className="m-0">
                        {company.companyName}
                      </Card.Title>
                    </Link>
                  </div>
                  <Card.Text>
                    <small>
                      Created:{" "}
                      {moment(company.createdAt).format("MMMM Do YYYY")}
                    </small>
                  </Card.Text>
                  <ViewFiles userId={currentUser ? currentUser.uid : ""} />
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Company</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter company name"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Country</Form.Label>
              <Select
                options={options}
                name="country"
                value={options.find(
                  (option) => option.value === formData.country,
                )}
                onChange={(selectedOption) =>
                  setFormData({ ...formData, country: selectedOption.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Timezone</Form.Label>
              <Select
                options={timezones}
                name="timezone"
                value={timezones.find(
                  (option) => option.value === formData.timezone,
                )}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Upload Files</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
              <ProgressBar
                now={uploadProgress}
                label={`${uploadProgress}%`}
                className="mt-2"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add Company
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Subscribe />
      <Footer />
      <ToastContainer />
    </>
  );
};
