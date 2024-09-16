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
} from "firebase/firestore"; // Import the Firestore database
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Import from Firebase Authentication
import ViewFiles from "../../Components/ViewFiles";
// import ViewFiles from "../../vbvcb                                                                                                            "
import Header from "../../Components/Header";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import "./addtransit.css";
import { Container, Form, Button, Modal, ProgressBar } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "../../Components/Loader";
import useImportGTFS from "../../Components/useImportGTFS";
import Select from "react-select";
import countryList from "react-select-country-list";
import moment from "moment-timezone";
import JSZip from "jszip";
export const AddTransit = () => {
  const [show, setShow] = useState(false);
  const [companyInfo, setCompanyInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [formData, setFormData] = useState({
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
    compannyId: "",
    distanceUnit: "",
  });

  const db = getFirestore();
  const auth = getAuth();
  const options = countryList().getData();
  const [selectedFile, setSelectedFile] = useState(null);
  const { handleImport } = useImportGTFS();
  const [timezones, setTimezones] = useState([]);
  const [selectedTimezone, setSelectedTimezone] = useState(null);

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

    return () => {
      unsubscribe();
    };
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
          createdAt: data.createdAt.toDate(), // Convert Firestore timestamp to Date
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
    setFormData({
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
      compannyId: "",
      distanceUnit: "",
    });
  };

  const handleInputChange = (input) => {
    if (input && input.target) {
      const { name, value } = input.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      setFormData({ ...formData, timezone: input.value });
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Selected file type:", file.type); // Debugging line
      if (file.type === "application/zip" || file.name.endsWith(".zip")) {
        try {
          const zip = new JSZip();
          const contents = await zip.loadAsync(file);
          const files = [];

          for (const filename of Object.keys(contents.files)) {
            const fileData = await contents.files[filename].async("blob"); // Keeping file data as Blob
            files.push({ filename, fileData });
          }

          setFiles(files);
          toast.success("Zip file extracted successfully");
        } catch (error) {
          console.error("Failed to extract zip file:", error);
          toast.error("Failed to extract zip file");
        }
      } else {
        toast.error("Please select a valid zip file");
      }
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
        console.log("Company with this name already exists", snapshot);
        return;
      }

      const createdAt = serverTimestamp();
      const docData = {
        ...formData,
        createdAt: createdAt,
        userId: currentUser.uid,
      };
      const docRef = await addDoc(companiesRef, docData);

      // Save files in Firebase Storage and store metadata in Firestore
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
              createdAt: createdAt,
              fileURL: fileURL,
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
      <ToastContainer />
      <Header />
      <div className="container demo-1 mt-5">
        <header>
          <h1 style={{ float: "left" }} className="agency_head">
            Transit Companies
          </h1>
          <div className="col-sm-6 float-end ">
            <Link
              className="btn btn-default border-0 "
              onClick={handleDeleteSelected}
            >
              <i className="fa fa-trash">&nbsp;</i>
              Delete
            </Link>
            <Container className="mt-0">
              <Form onSubmit={handleFormSubmit}>
                <Form.Group controlId="companyName" className="mb-3">
                  <Form.Label>Company Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter company name"
                    value={formData.companyName}
                    onChange={(e) =>
                      setFormData({ ...formData, companyName: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Choose a .zip file to import</Form.Label>
                  <Form.Control
                    type="file"
                    accept=".zip"
                    onChange={handleFileChange}
                  />
                </Form.Group>
                {loading && (
                  <ProgressBar
                    now={uploadProgress}
                    label={`${Math.round(uploadProgress)}%`}
                  />
                )}
                <Button
                  variant="outline-dark"
                  type="submit"
                  className="rounded-2 px-3 py-2"
                  disabled={loading}
                >
                  Import GTFS
                </Button>
              </Form>
            </Container>
            <a
              href="#"
              className="btn btn-default border-0 "
              id="view_export_btn"
            >
              <i className="fa fa-file-text">&nbsp;</i>View Exports
            </a>
          </div>
        </header>
        <ul className="grid container-fluid p-0 cs-style-1">
          <div className="row w-100 p-0 gap-1 justify-content-start agency">
            <div className="col-md-3 col-sm-6 col-xs-12">
              <figure className="box_tab_add">
                <figcaption
                  id="btnaddagency"
                  data-toggle="modal"
                  data-target="#myModal"
                  style={{ cursor: "pointer" }}
                  onClick={handleShow}
                >
                  <i className="fa fa-plus" />
                  <span>
                    Add
                    <br />
                    Company
                  </span>
                </figcaption>
              </figure>
            </div>
            {companyInfo.map((company) => (
              <div
                className="col-md-3 col-sm-6 col-xs-12"
                id={`del_${company.id}`}
                key={company.id}
              >
                <figure>
                  <div
                    className="box_bg w-100"
                    style={{ cursor: "pointer" }}
                    title="Click to manage routes, schedules and trips"
                  >
                    <p style={{ float: "right" }}>
                      <input
                        type="checkbox"
                        className="agency_chk u_chk"
                        checked={selectedCompanies.includes(company.id)}
                        onChange={() => handleCheckboxChange(company.id)}
                      />{" "}
                    </p>
                    <h3>
                      <Link
                        className="box_bg_title"
                        style={{ wordWrap: "break-word" }}
                        to={`/Agencies/${company.id}`}
                      >
                        {company.companyName}
                      </Link>
                    </h3>
                    <p
                      className="cont_posi"
                      style={{ wordWrap: "break-word", width: "80%" }}
                    >
                      <br />
                      <small>
                        Created:{" "}
                        {moment(company.createdAt).format("MMMM Do YYYY,")}
                      </small>
                    </p>
                    <ViewFiles userId={currentUser ? currentUser.uid : ""} />
                  </div>
                </figure>
              </div>
            ))}
          </div>
        </ul>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        backdrop="static"
        size="md"
        responsive
        className="add_company_modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <b>
              {" "}
              <h3>Create Company</h3>
            </b>
          </Modal.Title>
        </Modal.Header>

        <form role="form" name="myForm" id="myform" onSubmit={handleFormSubmit}>
          <div className="modal-body p-4">
            <div className="row">
              <div className="form-group col-sm-9">
                <label htmlFor="name">
                  Company Name<span className="requ-left">Required</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="companyName"
                  placeholder="E.g. Brown's Buses"
                  autoComplete="organization"
                  required
                  value={formData.companyName}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-sm-12">
                <label htmlFor="website">
                  Website
                  <a
                    target="_blank"
                    className="test_link fetch_link"
                    href="#"
                    style={{ fontSize: 12, paddingLeft: 15, paddingTop: 6 }}
                  >
                    Test Link
                  </a>
                  <span className="requ-left">Required</span>
                </label>
                <input
                  type="url"
                  className="form-control"
                  id="website"
                  name="companyUrl"
                  placeholder="Your website URL (E.g. http://....)"
                  required
                  onblur="checkwebsiteurl();"
                  onChange={handleInputChange}
                  value={formData.companyUrl}
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-sm-12">
                <label htmlFor="tz_country">
                  Country<span className="requ-left">Required</span>
                </label>
                <div className="custom_search_parent">
                  <Select
                    name="country"
                    id="tz_country"
                    options={options}
                    onChange={handleInputChange}
                    value={options.find(
                      (option) => option.value === formData.country,
                    )}
                    isClearable
                    placeholder="Select One"
                    className="custom_search"
                    required
                  />
                  <span className="cont_arrow" />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="form-group col-sm-6">
                <label htmlFor="time_zone">
                  Time Zone<span className="requ-left">Required</span>
                </label>
                <div className="custom_search_parent">
                  <Select
                    name="timezone"
                    className="custom_search"
                    id="time_zone"
                    required
                    onChange={handleChange}
                    value={selectedTimezone}
                    options={timezones}
                    placeholder="Select One"
                  />
                  {formData.timezone && (
                    <div>
                      <p>Selected Timezone: {formData.timezone}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group col-sm-6">
                <label htmlFor="lang">
                  Language<span className="requ-left">Required</span>
                </label>
                <div className="custom_search_parent">
                  <select
                    id="lang"
                    name="language"
                    className="custom_search"
                    onChange={handleInputChange}
                    value={formData.language}
                  >
                    <option value="" disabled="disabled" selected="selected">
                      Select One
                    </option>
                    <option value="ab">Abkhazian (ab)</option>
                    <option value="aa">Afar (aa)</option>
                    <option value="af">Afrikaans (af)</option>
                    <option value="ak">Akan (ak)</option>
                    <option value="sq">Albanian (sq)</option>
                    <option value="am">Amharic (am)</option>
                    <option value="ar">Arabic (ar)</option>
                    <option value="an">Aragonese (an)</option>
                    <option value="hy">Armenian (hy)</option>
                    <option value="as">Assamese (as)</option>
                    <option value="av">Avaric (av)</option>
                    <option value="ae">Avestan (ae)</option>
                    <option value="ay">Aymara (ay)</option>
                    <option value="az">Azerbaijani (az)</option>
                    <option value="bm">Bambara (bm)</option>
                    <option value="ba">Bashkir (ba)</option>
                    <option value="eu">Basque (eu)</option>
                    <option value="be">Belarusian (be)</option>
                    <option value="bn">Bengali (bn)</option>
                    <option value="bh">Bihari languages (bh)</option>
                    <option value="bi">Bislama (bi)</option>
                    <option value="nb">
                      Bokmål, Norwegian; Norwegian Bokmål (nb)
                    </option>
                    <option value="bs">Bosnian (bs)</option>
                    <option value="br">Breton (br)</option>
                    <option value="bg">Bulgarian (bg)</option>
                    <option value="my">Burmese (my)</option>
                    <option value="ca">Catalan; Valencian (ca)</option>
                    <option value="km">Central Khmer (km)</option>
                    <option value="ch">Chamorro (ch)</option>
                    <option value="ce">Chechen (ce)</option>
                    <option value="ny">Chichewa; Chewa; Nyanja (ny)</option>
                    <option value="zh">Chinese (zh)</option>
                    <option value="cu">
                      Church Slavic; Old Slavonic; Church Slavonic; Old
                      Bulgarian; Old Church Slavonic (cu)
                    </option>
                    <option value="cv">Chuvash (cv)</option>
                    <option value="kw">Cornish (kw)</option>
                    <option value="co">Corsican (co)</option>
                    <option value="cr">Cree (cr)</option>
                    <option value="hr">Croatian (hr)</option>
                    <option value="cs">Czech (cs)</option>
                    <option value="da">Danish (da)</option>
                    <option value="dv">Divehi; Dhivehi; Maldivian (dv)</option>
                    <option value="nl">Dutch; Flemish (nl)</option>
                    <option value="dz">Dzongkha (dz)</option>
                    <option value="en">English (en)</option>
                    <option value="eo">Esperanto (eo)</option>
                    <option value="et">Estonian (et)</option>
                    <option value="ee">Ewe (ee)</option>
                    <option value="fo">Faroese (fo)</option>
                    <option value="fj">Fijian (fj)</option>
                    <option value="fi">Finnish (fi)</option>
                    <option value="fr">French (fr)</option>
                    <option value="ff">Fulah (ff)</option>
                    <option value="gd">Gaelic; Scottish Gaelic (gd)</option>
                    <option value="gl">Galician (gl)</option>
                    <option value="lg">Ganda (lg)</option>
                    <option value="ka">Georgian (ka)</option>
                    <option value="de">German (de)</option>
                    <option value="el">Greek, Modern (1453-) (el)</option>
                    <option value="gn">Guarani (gn)</option>
                    <option value="gu">Gujarati (gu)</option>
                    <option value="ht">Haitian; Haitian Creole (ht)</option>
                    <option value="ha">Hausa (ha)</option>
                    <option value="he">Hebrew (he)</option>
                    <option value="hz">Herero (hz)</option>
                    <option value="hi">Hindi (hi)</option>
                    <option value="ho">Hiri Motu (ho)</option>
                    <option value="hu">Hungarian (hu)</option>
                    <option value="is">Icelandic (is)</option>
                    <option value="io">Ido (io)</option>
                    <option value="ig">Igbo (ig)</option>
                    <option value="id">Indonesian (id)</option>
                    <option value="ia">
                      Interlingua (International Auxiliary Language Association)
                      (ia)
                    </option>
                    <option value="ie">Interlingue; Occidental (ie)</option>
                    <option value="iu">Inuktitut (iu)</option>
                    <option value="ik">Inupiaq (ik)</option>
                    <option value="ga">Irish (ga)</option>
                    <option value="it">Italian (it)</option>
                    <option value="ja">Japanese (ja)</option>
                    <option value="jv">Javanese (jv)</option>
                    <option value="kl">Kalaallisut; Greenlandic (kl)</option>
                    <option value="kn">Kannada (kn)</option>
                    <option value="kr">Kanuri (kr)</option>
                    <option value="ks">Kashmiri (ks)</option>
                    <option value="kk">Kazakh (kk)</option>
                    <option value="ki">Kikuyu; Gikuyu (ki)</option>
                    <option value="rw">Kinyarwanda (rw)</option>
                    <option value="ky">Kirghiz; Kyrgyz (ky)</option>
                    <option value="kv">Komi (kv)</option>
                    <option value="kg">Kongo (kg)</option>
                    <option value="ko">Korean (ko)</option>
                    <option value="kj">Kuanyama; Kwanyama (kj)</option>
                    <option value="ku">Kurdish (ku)</option>
                    <option value="lo">Lao (lo)</option>
                    <option value="la">Latin (la)</option>
                    <option value="lv">Latvian (lv)</option>
                    <option value="li">
                      Limburgan; Limburger; Limburgish (li)
                    </option>
                    <option value="ln">Lingala (ln)</option>
                    <option value="lt">Lithuanian (lt)</option>
                    <option value="lu">Luba-Katanga (lu)</option>
                    <option value="lb">
                      Luxembourgish; Letzeburgesch (lb)
                    </option>
                    <option value="mk">Macedonian (mk)</option>
                    <option value="mg">Malagasy (mg)</option>
                    <option value="ms">Malay (ms)</option>
                    <option value="ml">Malayalam (ml)</option>
                    <option value="mt">Maltese (mt)</option>
                    <option value="gv">Manx (gv)</option>
                    <option value="mi">Maori (mi)</option>
                    <option value="mr">Marathi (mr)</option>
                    <option value="mh">Marshallese (mh)</option>
                    <option value="mn">Mongolian (mn)</option>
                    <option value="na">Nauru (na)</option>
                    <option value="nv">Navajo; Navaho (nv)</option>
                    <option value="nd">
                      Ndebele, North; North Ndebele (nd)
                    </option>
                    <option value="nr">
                      Ndebele, South; South Ndebele (nr)
                    </option>
                    <option value="ng">Ndonga (ng)</option>
                    <option value="ne">Nepali (ne)</option>
                    <option value="se">Northern Sami (se)</option>
                    <option value="no">Norwegian (no)</option>
                    <option value="nn">
                      Norwegian Nynorsk; Nynorsk, Norwegian (nn)
                    </option>
                    <option value="oc">Occitan (post 1500) (oc)</option>
                    <option value="oj">Ojibwa (oj)</option>
                    <option value="or">Oriya (or)</option>
                    <option value="om">Oromo (om)</option>
                    <option value="os">Ossetian; Ossetic (os)</option>
                    <option value="pi">Pali (pi)</option>
                    <option value="pa">Panjabi; Punjabi (pa)</option>
                    <option value="fa">Persian (fa)</option>
                    <option value="pl">Polish (pl)</option>
                    <option value="pt">Portuguese (pt)</option>
                    <option value="pt-BR">Portuguese (Brazil) (pt-BR)</option>
                    <option value="ps">Pushto; Pashto (ps)</option>
                    <option value="qu">Quechua (qu)</option>
                    <option value="ro">
                      Romanian; Moldavian; Moldovan (ro)
                    </option>
                    <option value="rm">Romansh (rm)</option>
                    <option value="rn">Rundi (rn)</option>
                    <option value="ru">Russian (ru)</option>
                    <option value="sm">Samoan (sm)</option>
                    <option value="sg">Sango (sg)</option>
                    <option value="sa">Sanskrit (sa)</option>
                    <option value="sc">Sardinian (sc)</option>
                    <option value="sr">Serbian (sr)</option>
                    <option value="sn">Shona (sn)</option>
                    <option value="ii">Sichuan Yi; Nuosu (ii)</option>
                    <option value="sd">Sindhi (sd)</option>
                    <option value="si">Sinhala; Sinhalese (si)</option>
                    <option value="sk">Slovak (sk)</option>
                    <option value="sl">Slovenian (sl)</option>
                    <option value="so">Somali (so)</option>
                    <option value="st">Sotho, Southern (st)</option>
                    <option value="es">Spanish; Castilian (es)</option>
                    <option value="su">Sundanese (su)</option>
                    <option value="sw">Swahili (sw)</option>
                    <option value="ss">Swati (ss)</option>
                    <option value="sv">Swedish (sv)</option>
                    <option value="tl">Tagalog (tl)</option>
                    <option value="ty">Tahitian (ty)</option>
                    <option value="tg">Tajik (tg)</option>
                    <option value="ta">Tamil (ta)</option>
                    <option value="tt">Tatar (tt)</option>
                    <option value="te">Telugu (te)</option>
                    <option value="th">Thai (th)</option>
                    <option value="bo">Tibetan (bo)</option>
                    <option value="ti">Tigrinya (ti)</option>
                    <option value="to">Tonga (Tonga Islands) (to)</option>
                    <option value="ts">Tsonga (ts)</option>
                    <option value="tn">Tswana (tn)</option>
                    <option value="tr">Turkish (tr)</option>
                    <option value="tk">Turkmen (tk)</option>
                    <option value="tw">Twi (tw)</option>
                    <option value="ug">Uighur; Uyghur (ug)</option>
                    <option value="uk">Ukrainian (uk)</option>
                    <option value="ur">Urdu (ur)</option>
                    <option value="uz">Uzbek (uz)</option>
                    <option value="ve">Venda (ve)</option>
                    <option value="vi">Vietnamese (vi)</option>
                    <option value="vo">Volapük (vo)</option>
                    <option value="wa">Walloon (wa)</option>
                    <option value="cy">Welsh (cy)</option>
                    <option value="fy">Western Frisian (fy)</option>
                    <option value="wo">Wolof (wo)</option>
                    <option value="xh">Xhosa (xh)</option>
                    <option value="yi">Yiddish (yi)</option>
                    <option value="yo">Yoruba (yo)</option>
                    <option value="za">Zhuang; Chuang (za)</option>
                    <option value="zu">Zulu (zu)</option>
                  </select>
                  <span className="cont_arrow" />
                </div>
              </div>
            </div>
            <div className="panel-group" id="accordion">
              <div className="panel panel-default">
                <div className="panel-heading">
                  {/* h4 class="panel-title" */}
                  <a
                    data-toggle="collapse"
                    data-parent="#accordion"
                    href="#collapseOne"
                  >
                    Optional Fields (open/close)
                  </a>
                  {/*/h4 */}
                </div>
                <div
                  id="collapseOne"
                  className="panel-collapse collapse out mt-4"
                >
                  <div className="panel-body">
                    <div className="form-group">
                      <label htmlFor="about">
                        Agency/Company Description
                        <span className="requ-left">Informational Only</span>
                      </label>
                      <textarea
                        className="form-control"
                        name="companyDesc"
                        id="about"
                        style={{ lineHeight: "normal" }}
                        placeholder="Describe your agency/company"
                        defaultValue={""}
                        onChange={handleInputChange}
                        value={formData.companyDesc}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">
                        Telephone
                        <span className="requ-left">Informational Only</span>
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        name="telephone"
                        autoComplete="tel"
                        placeholder="Your customer contact telephone number"
                        onChange={handleInputChange}
                        value={formData.telephone}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="fare_url">
                        Fare URL
                        <a
                          target="_blank"
                          className="test_link fetch_link"
                          href="#"
                          style={{
                            fontSize: 12,
                            paddingLeft: 15,
                            paddingTop: 6,
                          }}
                        >
                          Test Link
                        </a>
                        <span className="requ-left">Informational Only</span>
                      </label>
                      <input
                        type="url"
                        className="form-control"
                        id="fare_url"
                        name="fareUrl"
                        placeholder="Your fare information URL"
                        onChange={handleInputChange}
                        value={formData.fareUrl}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="mail_address">
                        Postal Address
                        <span className="requ-left">Informational Only</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="mail_address"
                        name="postalAddress"
                        placeholder="Your postal/mailing address"
                        style={{
                          backgroundImage: 'url("data:image/png',
                          backgroundRepeat: "no-repeat",
                          backgroundSize: 20,
                          backgroundPosition: "97% center",
                          cursor: "auto",
                        }}
                        data-temp-mail-org={0}
                        onChange={handleInputChange}
                        value={formData.postalAddress}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">
                        Customer Support Email Address
                        <span className="requ-left">Informational Only</span>
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="supportemail"
                        autoComplete="email"
                        placeholder="Your customer support email address"
                        style={{
                          backgroundImage: 'url("data:image/png',
                          backgroundRepeat: "no-repeat",
                          backgroundSize: 20,
                          backgroundPosition: "97% center",
                          cursor: "auto",
                        }}
                        data-temp-mail-org={1}
                        onChange={handleInputChange}
                        value={formData.supportemail}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="taxnbr">
                        Company ID/Tax Number
                        <span className="requ-left">Informational Only</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="taxnbr"
                        name="compannyId"
                        placeholder="Your company identifier/tax number"
                        onChange={handleInputChange}
                        value={formData.compannyId}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="dist_units">
                        Distance Units
                        <span className="requ-left">Informational Only</span>
                      </label>
                      <div className="custom_search_parent">
                        <select
                          name="distanceUnit"
                          className="custom_search"
                          id="dist_units"
                          onChange={handleInputChange}
                          value={formData.distanceUnit}
                        >
                          <option
                            id="du_sel_one"
                            value=""
                            disabled="disabled"
                            selected="selected"
                          >
                            Select One
                          </option>
                          <option value="km">Kilometres (km)</option>
                          <option value="m">Metres (m)</option>
                          <option value="mi">Miles (mi)</option>
                          <option value="ft">Feet (ft)</option>
                        </select>
                        <span className="cont_arrow" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="clearfix" />
          <div className="modal-footer">
            <button
              data-dismiss="modal"
              className="btn btn-default"
              type="button"
              onClick={handleClose}
            >
              Cancel
            </button>
            <input type="hidden" name="action" defaultValue="insert" />
            <button
              className="btn btn-success"
              type="submit"
              name="add_submit"
              id="add_submit"
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};
