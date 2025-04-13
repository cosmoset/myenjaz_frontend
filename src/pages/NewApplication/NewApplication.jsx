"use client";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import "./NewApplication.css";
import axios from "../../Api/axios";
import countries from "./country"

import Footer from "../../components/Footer/Footer";
import {
  Button,
  Form,
  Row,
  Col,
  Tabs,
  Tab,
  Card,
  InputGroup,
  FormControl,
} from "react-bootstrap";
// Helper function to convert file to Base64 string
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default function ApplicationForm() {
  const [key, setKey] = useState("photo");
  const [loading, setLoading] = useState(false);

  // States for photos and previews
  const [photos, setPhotos] = useState({
    regular: null,
    fullSize: null,
    passport: null,
  });
  const [previews, setPreviews] = useState({
    regular: null,
    fullSize: null,
    passport: null,
  });
  const [defaultData, setDefaultData] = useState({
    maritalStatus: "",
    gender: "",
    applicationNo: "",
    fullName: "",
    date: "2000-01-01",
    passportNo: "",
    placeOfIssue: "",
    dateOfIssue: "",
    dateOfBirth: "",
    religion: "",
    qualification: "",
    city: "",
    woreda: "",
    phoneNo: "",
    visaNo: "",
    sponsorId: "",
    sponsorAddress: "",
    nationalId: "",
    email: "",
    fileNo: "",
    wakala: "",
    signedOn: "2000-01-01",
    biometricId: "",
    sponsorName: "",
    sponsorPhone: "",
    houseNo: "",
    agent: "00000000-0000-0000-0000-000000000000",
    sponsorArabic: "",
    visaType: "",
    contractNo: "",
    stickerVisaNo: "",
    currentNationality: "",
    laborId: "",
    relativeName: "",
    relativePhone: "",
    relativeCity: "",
    relativeWoreda: "",
    relativeGender: "",
    addressRegion: "",
    relativeKinship: "",
    subcity: "",
    relativeHouseNo: "",
    relativeBirthDate: "2000-01-01",
    contactPerson2: "",
    cocCenterName: "N",
    certificateNo: "",
    contactPhone2: "",
    passportType: "",
    placeOfBirth: "",
    dateOfExpiry: "",
    occupation: "",
    region: "",
    certifiedDate: "2000-01-01",
    medicalPlace: "",
    twoPhotographs: 0,
    idCard: 0,
    relativeIdCard: 0,
    english: "",
    experienceAbroad: "",
    worksIn: "",
    height: 0.0,
    referenceNo: "",
    ironing: 0,
    sewing: 0,
    babysitting: 0,
    carCare: 0,
    cleaning: 0,
    washing: 0,
    cooking: 0,
    arabic: "",
    salary: 0.0,
    numberOfChildren: 0,
    weight: 0,
    remark: "",
  });

  const [formData, setFormData] = useState(defaultData);
  // Check if the formData state has values
  useEffect(() => {
    if (localStorage.getItem("loginSuccess")) {
      toast.success("Login successful!"); // Show the success toast
      localStorage.removeItem("loginSuccess"); // Remove the flag after displaying
    }
  }, []);

  const handlePhotoUpload = (e, type) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setPhotos((prev) => ({ ...prev, [type]: file }));
    setPreviews((prev) => ({ ...prev, [type]: objectUrl }));
  };

  const handleChange = (e) => {
    const { name, value, type: inputType, checked } = e.target;
    
    setFormData((prev) => ({
      ...prev,
      [name]: inputType === "checkbox" ? (checked ? 1 : 0) : value,
    }));
  };
  
  const showConfirmationToast = (onConfirm) => {
    toast.info(
      ({ closeToast }) => (
        <div>
          <p>Are you sure you want to submit the application?</p>
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <button
              style={{
                background: "green",
                color: "white",
                padding: "5px 10px",
                border: "none",
                cursor: "pointer",
                borderRadius: "5px",
              }}
              onClick={() => {
                onConfirm(); // Call submit function
                closeToast();
              }}
            >
              Yes
            </button>
            <button
              style={{
                background: "red",
                color: "white",
                padding: "5px 10px",
                border: "none",
                cursor: "pointer",
                borderRadius: "5px",
              }}
              onClick={closeToast}
            >
              No
            </button>
          </div>
        </div>
      ),
      { autoClose: false, closeOnClick: false, position: "top-right" } // Keep it interactive
    );
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
  
    // Show confirmation toast before submitting
    showConfirmationToast(async () => {
      setLoading(true);
  
      try {
        const formDataObj = new FormData();
  
        // Append text inputs
        Object.entries(formData).forEach(([key, value]) => {
          formDataObj.append(key, value);
        });
  
        // Append images if available
        if (photos.regular) formDataObj.append("regularPhoto", photos.regular);
        if (photos.fullSize) formDataObj.append("fullSizePhoto", photos.fullSize);
        if (photos.passport) formDataObj.append("passportPhoto", photos.passport);
  
        const token = localStorage.getItem("token");
  
        const response = await axios.post(
          "/application/new_application",
          formDataObj,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        if (response.status === 201 || response.status === 200) {
          toast.success("Application submitted successfully!", { position: "top-right" });
  
          setTimeout(() => {
            window.location.reload();
          }, 5000);
        } else {
          toast.error("Submission failed.", { position: "top-right" });
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.error("Error submitting application.", { position: "top-right" });
      } finally {
        setLoading(false);
      }
    });
  };
  

  return (
    <>
      <main className="form application_form">
        <div className="container py-4">
          <Form onSubmit={handleSubmit}>
            {/* Applicant Section */}
            <Card className="mb-4">
              <Card.Header className="d-flex justify-content-between align-items-center bg-light applicationTitle">
                <h5 className="mb-0 text-primary">Applicant</h5>
                <Button variant="link">Open Photo Editor</Button>
              </Card.Header>
              <Card.Body>
                <Row>
                  {/* Left: Photo Tabs */}
                  <Col md={6} style={{ border: "1px solid lightgray" }}>
                    <Tabs
                      activeKey={key}
                      onSelect={(k) => setKey(k)}
                      className="mb-3"
                    >
                      <Tab eventKey="photo" title="PHOTO">
                        <div className="text-center  border photo_frame p-3">
                          {previews.regular &&
                          typeof previews.regular === "string" ? (
                            <div
                              className="w-100 h-180"
                              style={{
                                width: "100%",
                                position: "relative",
                                height: "180px",
                              }}
                            >
                              <img
                                height="180"
                                width="170"
                                src={previews.regular}
                                alt="Regular photo"
                                layout="fill"
                                objectfit="cover"
                                className="rounded"
                                onError={(e) =>
                                  console.error("Image load error:", e)
                                }
                              />
                            </div>
                          ) : (
                            <div
                              className="bg-light d-flex justify-content-center align-items-center"
                              style={{
                                width: "100%",
                                height: "200px",
                                margin: "0 auto",
                              }}
                            >
                              <span className="text-muted">
                                No photo selected
                              </span>
                            </div>
                          )}

                          <Form.Group controlId="regularPhoto" className="mt-3">
                            <Form.Control
                              type="file"
                              accept="image/*"
                              required
                              onChange={(e) => handlePhotoUpload(e, "regular")}
                            />
                          </Form.Group>
                        </div>
                      </Tab>

                      <Tab eventKey="fullsize" title="FULL SIZE">
                        <div className="text-center border   p-3">
                          {previews.fullSize ? (
                            <div className="text-center border photo_frame">
                              <img
                                src={previews.fullSize}
                                alt="Full size photo"
                                layout="fill"
                                objectFit="cover"
                                className="rounded"
                              />
                            </div>
                          ) : (
                            <div
                              className="bg-light d-flex justify-content-center align-items-center"
                              style={{
                                width: "100%",
                                height: "200px",
                                margin: "0 auto",
                              }}
                            >
                              <span className="text-muted">
                                No full size photo selected
                              </span>
                            </div>
                          )}
                          <Form.Group
                            controlId="fullSizePhoto"
                            className="mt-3"
                          >
                            <Form.Control
                              type="file"
                              accept="image/*"
                              onChange={(e) => handlePhotoUpload(e, "fullSize")}
                            />
                          </Form.Group>
                        </div>
                      </Tab>
                      <Tab eventKey="passport" title="PASSPORT">
                        <div className="text-center  border p-3">
                          {previews.passport ? (
                            <div>
                              <img
                                height="180"
                                width="170"
                                src={previews.passport}
                                alt="Passport photo"
                                layout="fill"
                                objectFit="cover"
                                className="rounded"
                              />
                            </div>
                          ) : (
                            <div
                              className="bg-light d-flex justify-content-center align-items-center"
                              style={{
                                width: "100%",
                                height: "200px",
                                margin: "0 auto",
                              }}
                            >
                              <span className="text-muted">
                                No passport photo selected
                              </span>
                            </div>
                          )}
                          <Form.Group
                            controlId="passportPhoto"
                            className="mt-3"
                          >
                            <Form.Control
                              type="file"
                              accept="image/*"
                              onChange={(e) => handlePhotoUpload(e, "passport")}
                            />
                          </Form.Group>
                        </div>
                      </Tab>
                    </Tabs>
                  </Col>

                  {/* Right: Basic Application Fields */}
                </Row>
              </Card.Body>
            </Card>

            <Card>
              <Card.Body>
                <Row>
                  <Col md={12}>
                    <Row className="mb-3 apps_no">
                      <Col md={4} className="apps_no_cont">
                        <Form.Group className="mb-3 ">
                          <Form.Label>Application No:</Form.Label>{" "}
                          <InputGroup className="apps_no_input">
                            <FormControl
                              className="apps_no"
                              placeholder="Enter Application No."
                              name="applicationNo"
                              value={formData.applicationNo}
                              onChange={handleChange}
                            />
                          </InputGroup>
                        </Form.Group>
                      </Col>

                      <Col md={3}>
                        <Form.Group className="mb-3 flex">
                          <Form.Label>Date:</Form.Label>{" "}
                          <Form.Control
                            className="date_input"
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={2} className="paste">
                        <Button variant="outline-secondary">Paste (M)</Button>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3 required label-input">
                      <Form.Label>Full Name: </Form.Label>{" "}
                      <Form.Control
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Enter Full Name"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3 label-input">
                      <Form.Label>ሙሉ ስም: </Form.Label>{" "}
                      <Form.Control
                        name="fullNameAmharic"
                        value={formData.fullNameAmharic}
                        onChange={handleChange}
                        placeholder="Enter Full Name"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            {/* Personal Information */}

            <Card className="mb-4 personal_information">
              <Card.Body>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Passport No.</Form.Label>
                      <Form.Control
                        type="text"
                        required
                        name="passportNo"
                        value={formData.passportNo}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Passport Type</Form.Label>
                      <Form.Select
                        name="religion"
                        required
                        value={formData.passportType}
                        onChange={handleChange}
                      >
                        <option value="normal">Normal</option>
                        <option value="dipplomatic">Dipplomatic</option>
                        <option value="special">Special</option>
                        <option value="haji cert">Haji Cert</option>
                        <option value="travel cert">Travel Cert</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Place of Issue</Form.Label>
                      <Form.Control
                        type="text"
                        required
                        name="placeOfIssue"
                        value={formData.placeOfIssue}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Place of Birth</Form.Label>
                      <Form.Control
                        type="text"
                        name="placeOfBirth"
                        required
                        value={formData.placeOfBirth}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Date of Issue</Form.Label>
                      <Form.Control
                        type="date"
                        required
                        name="dateOfIssue"
                        value={formData.dateOfIssue}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Date of Expiry</Form.Label>
                      <Form.Control
                        type="date"
                        name="dateOfExpiry"
                        required
                        value={formData.dateOfExpiry}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Date of Birth</Form.Label>
                      <Form.Control
                        type="date"
                        name="dateOfBirth"
                        required
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Phone No.</Form.Label>
                      <Form.Control
                        type="text"
                        name="phoneNo"
                        value={formData.phoneNo}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <Card className="mb-4 personal_information">
              <Card.Body>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Religion</Form.Label>
                      <Form.Select
                        name="religion"
                        required
                        value={formData.religion}
                        onChange={handleChange}
                      >
                        <option value="">Select</option>
                        <option value="islam">Islam</option>
                        <option value="christian">Christian</option>
                        <option value="orthodox">Orthodox</option>
                        <option value="catholic">Catholic</option>
                        <option value="protestant">Protestand</option>
                        <option value="buddhism">Buddhism</option>
                        <option value="other">other</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Marital Status</Form.Label>
                      <Form.Select
                        name="maritalStatus"
                        required
                        value={formData.maritalStatus}
                        onChange={handleChange}
                      >
                        <option value="">Select</option>
                        <option value="single">Single</option>
                        <option value="married">Married</option>
                        <option value="divorsed">Divorsed</option>
                        <option value="widow">Widow</option>
                        <option value="other">Other</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Gender</Form.Label>
                      <Form.Select
                        name="gender"
                        required
                        value={formData.gender}
                        onChange={handleChange}
                      > 
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Occupation</Form.Label>
                      <Form.Select
                        name="occupation"
                        required
                        value={formData.occupation}
                        onChange={handleChange}
                      >
                        <option value="">Select </option>
                        <option value="house maid">HOUSE MAID</option>
                        <option value="nanny">NANNY</option>
                        <option value="female nurse">FEMALE NURSE</option>
                        <option value="female cooker">FEMALE COOKER</option>
                        <option value="female physiotherapist">
                          FEMALE PHYSIOTHERAPIST
                        </option>
                        <option value="driver">DRIVER</option>
                        <option value="house worker">HOUSE WORKER</option>
                        <option value="male cooker">MALE COOKER</option>
                        <option value="male nurse">MALE NURSE</option>
                        <option value="male personal helper">
                          MALE PERSONAL HELPER
                        </option>
                        <option value="cook / waiter">COOK / WAITER</option>
                        <option value="male physiotherapist">
                          MALE PHYSIOTHERAPIST
                        </option>
                        <option value="sales representative">
                          SALES REPRESENTATIVE
                        </option>
                        <option value="home farmer">HOME FARMER</option>
                        <option value="other">OTHER</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Qualification</Form.Label>
                      <Form.Control
                        type="text"
                        name="qualification"
                        value={formData.qualification}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Region</Form.Label>
                      <Form.Select
                        name="region"
                        value={formData.region}
                        onChange={handleChange}
                      >

                        <option value="">Select </option>
                        <option value="addis ababa">Addis Ababa</option>
                        <option value="afar">Afar</option>
                        <option value="amhara">Amhara</option>
                        <option value="benishangul-gumuz">
                          Benishangul-Gumuz
                        </option>
                        <option value="dire dawa">Dire Dawa</option>
                        <option value="gambela">Gambela</option>
                        <option value="harari">Harari</option>
                        <option value="oromia">Oromia</option>
                        <option value="sidama">Sidama</option>
                        <option value="somalia">Somalia</option>
                        <option value="tigray">Tigray</option>
                        <option value="south west ethiopia">
                          South West Ethiopia
                        </option>
                        <option value="snnp">SNNP</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Subcity/Zone</Form.Label>
                      <Form.Control
                        type="text"
                        name="subcity"
                        value={formData.subcity}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Woreda</Form.Label>
                      <Form.Control
                        type="text"
                        name="woreda"
                        value={formData.woreda}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>House No.</Form.Label>
                      <Form.Control
                        type="text"
                        name="houseNo"
                        value={formData.houseNo}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <h2 style={{ fontWeight: "bold", fontSize: "20px" }}>
              {" "}
              Sponsor &amp; Visa Information
            </h2>
            {/* Sponsor & Visa Information */}
            <Card className="mb-4">
              <Card.Body>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Visa No.</Form.Label>
                      <Form.Control
                        type="text"
                        name="visaNo"
                        value={formData.visaNo}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Sponsor ID</Form.Label>
                      <Form.Control
                        type="text"
                        name="sponsorId"
                        value={formData.sponsorId}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Sponsor Address</Form.Label>
                      <Form.Control
                        type="text"
                        name="sponsorAddress"
                        value={formData.sponsorAddress}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>National ID</Form.Label>
                      <Form.Control
                        type="text"
                        name="nationalId"
                        value={formData.nationalId}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>File No.</Form.Label>
                      <Form.Control
                        type="text"
                        name="fileNo"
                        value={formData.fileNo}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Wakala #</Form.Label>
                      <Form.Control
                        type="text"
                        name="wakala"
                        value={formData.wakala}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Signed On</Form.Label>
                      <Form.Control
                        type="date"
                        name="signedOn"
                        value={formData.signedOn}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Biometric ID</Form.Label>
                      <Form.Control
                        type="text"
                        name="biometricId"
                        value={formData.biometricId}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Sponsor Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="sponsorName"
                        value={formData.sponsorName}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Sponsor Phone</Form.Label>
                      <Form.Control
                        type="text"
                        name="sponsorPhone"
                        value={formData.sponsorPhone}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Agent</Form.Label>
                      <Form.Select
                        name="agent"
                        value={formData.agent}
                        onChange={handleChange}
                      >
                        <option value="000000000-0000-0000-0000-000000000000">000000000-0000-0000-0000-000000000000</option>
                        <option value="ALSAFA RECRUITMENT OFFICE">ALSAFA RECRUITMENT OFFICE</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Sponsor Arabic</Form.Label>
                      <Form.Control
                        type="text"
                        name="sponsorArabic"
                        value={formData.sponsorArabic}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Visa Type</Form.Label>
                      <Form.Select
                        name="visaType"
                        value={formData.visaType}
                        onChange={handleChange}
                      >
                        <option>Work</option>
                        <option>Visit</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Contract #</Form.Label>
                      <Form.Control
                        type="text"
                        name="contractNo"
                        value={formData.contractNo}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Sticker Visa #</Form.Label>
                      <Form.Control
                        type="text"
                        name="stickerVisaNo"
                        value={formData.stickerVisaNo}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Current Nationality</Form.Label>
                      <Form.Select
                    name="currentNationality"
                    value={formData.currentNationality}
                    onChange={handleChange}
                  >
                    {countries.map(country => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Labor ID</Form.Label>
                      <Form.Control
                        type="text"
                        name="laborId"
                        value={formData.laborId}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Relative Information */}
            <h2 style={{ fontWeight: "bold", fontSize: "20px" }}>
              {" "}
              Relative Information
            </h2>
            <Card className="mb-4">
              <Card.Body>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Relative Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="relativeName"
                        value={formData.relativeName}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Relative Phone</Form.Label>
                      <Form.Control
                        type="text"
                        name="relativePhone"
                        value={formData.relativePhone}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type="text"
                        name="relativeCity"
                        value={formData.relativeCity}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Relative Woreda</Form.Label>
                      <Form.Control
                        type="text"
                        name="relativeWoreda"
                        value={formData.relativeWoreda}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Relative Gender</Form.Label>
                      <Form.Select
                        name="relativeGender"
                        value={formData.relativeGender}
                        onChange={handleChange}
                      >
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Address Region</Form.Label>
                      <Form.Control
                        type="text"
                        name="addressRegion"
                        value={formData.addressRegion}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Relative Kinship</Form.Label>
                      <Form.Control
                        type="text"
                        name="relativeKinship"
                        value={formData.relativeKinship}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Subcity/Zone</Form.Label>
                      <Form.Control
                        type="text"
                        name="subcity"
                        value={formData.subcity}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Relative House #</Form.Label>
                      <Form.Control
                        type="text"
                        name="relativeHouseNo"
                        value={formData.relativeHouseNo}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Relative Birth Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="relativeBirthDate"
                        value={formData.relativeBirthDate}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Other Information */}
            <h2 style={{ fontWeight: "bold", fontSize: "20px" }}>
              Other Information
            </h2>
            <Card className="mb-4">
              <Card.Body>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Contact Person (2nd)</Form.Label>
                      <Form.Control
                        type="text"
                        name="contactPerson2"
                        value={formData.contactPerson2}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Coc Center Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="cocCenterName"
                        value={formData.cocCenterName}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Certificate No.</Form.Label>
                      <Form.Control
                        type="text"
                        name="certificateNo"
                        value={formData.certificateNo}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Contact Phone (2nd)</Form.Label>
                      <Form.Control
                        type="text"
                        name="contactPhone2"
                        value={formData.contactPhone2}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Certified Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="certifiedDate"
                        value={formData.certifiedDate}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Medical Place</Form.Label>
                      <Form.Select
                        name="medicalPlace"
                        value={formData.medicalPlace}
                        onChange={handleChange}
                      >
                        <option value="">Select place</option>
                        <option value="Yekatit">Yekatit</option>
                        <option value="Tikur Anbessa">Tikur Anbessa</option>
                        <option value="Halelluyah">Halelluyah</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group className="d-flex gap-3">
                      <Form.Check
                        type="checkbox"
                        id="twoPhotographs"
                        label="Two Photographs"
                        name="twoPhotographs"
                        value={1}
                        checked={formData.twoPhotographs}
                        onChange={handleChange}
                      />
                      <Form.Check
                        type="checkbox"
                        id="idCard"
                        label="ID Card"
                        name="idCard"
                        checked={formData.idCard}
                        onChange={handleChange}
                      />
                      <Form.Check
                        type="checkbox"
                        id="relativeIdCard"
                        label="Relative ID Card"
                        name="relativeIdCard"
                        checked={formData.relativeIdCard}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Skills & Experience */}
            <h2 style={{ fontWeight: "bold", fontSize: "20px" }}>
              {" "}
              Skills & Experience
            </h2>
            <Card className="mb-4">
              <Card.Body>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>English</Form.Label>
                      <Form.Select
                        name="english"
                        value={formData.english}
                        onChange={handleChange}
                      >
                        <option value="">Select level</option>
                        <option value="basic">Basic</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Experience Abroad</Form.Label>
                      <Form.Select
                        name="experienceAbroad"
                        value={formData.experienceAbroad}
                        onChange={handleChange}
                      >
                        <option value="">Select experience</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Works In</Form.Label>
                      <Form.Control
                        type="text"
                        name="worksIn"
                        value={formData.worksIn}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Height</Form.Label>
                      <Form.Control
                        type="text"
                        name="height"
                        value={formData.height}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Reference No.</Form.Label>
                      <Form.Control
                        type="text"
                        name="referenceNo"
                        value={formData.referenceNo}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Arabic</Form.Label>
                      <Form.Select
                        name="arabic"
                        value={formData.arabic}
                        onChange={handleChange}
                      >
                        <option value="">Select level</option>
                        <option value="basic">Basic</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Salary</Form.Label>
                      <InputGroup>
                        <FormControl
                          type="number"
                          name="salary"
                          value={formData.salary}
                          onChange={handleChange}
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>No. of Children</Form.Label>
                      <InputGroup>
                        <FormControl
                          type="number"
                          name="numberOfChildren"
                          value={formData.numberOfChildren}
                          onChange={handleChange}
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Weight</Form.Label>
                      <Form.Control
                        type="text"
                        name="weight"
                        value={formData.weight}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Remark</Form.Label>
                      <Form.Control
                        type="text"
                        name="remark"
                        value={formData.remark}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={12} >
                    <Form.Group className="d-flex gap-3 check-bx-cont align-items-center" style={{display: "flex", flexWrap:"wrap"}}>
                      <Form.Check
                        type="checkbox"
                        id="ironing"
                        label="Ironing"
                        name="ironing"
                        checked={formData.ironing}
                        onChange={handleChange}
                      />
                      <Form.Check
                        type="checkbox"
                        id="sewing"
                        label="Sewing"
                        name="sewing"
                        checked={formData.sewing}
                        onChange={handleChange}
                      />
                      <Form.Check
                        type="checkbox"
                        id="babysitting"
                        label="B.Sitting"
                        name="babysitting"
                        checked={formData.babysitting}
                        onChange={handleChange}
                      />
                      <Form.Check
                        type="checkbox"
                        id="carCare"
                        label="Cr.Care"
                        name="carCare"
                        checked={formData.carCare}
                        onChange={handleChange}
                      />
                      <Form.Check
                        type="checkbox"
                        id="cleaning"
                        label="Cleaning"
                        name="cleaning"
                        checked={formData.cleaning}
                        onChange={handleChange}
                      />
                      <Form.Check
                        type="checkbox"
                        id="washing"
                        label="Washing"
                        name="washing"
                        checked={formData.washing}
                        onChange={handleChange}
                      />
                      <Form.Check
                        type="checkbox"
                        id="cooking"
                        label="Cooking"
                        name="cooking"
                        checked={formData.cooking}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Save Button */}
            <div className="text-end">
              <Button
                variant="success"
                size="s"
                type="submit"
                style={{ backgroundColor: "#286090", borderRadius: "2px" }}
                disabled={loading} // Disable while loading
              >
                {loading ? "Saving..." : "Save Application"}
              </Button>
            </div>
          </Form>
        </div>
      </main>
      <br />
      <br />
      <br />
      <ToastContainer />
      <Footer />
    </>
  );
}
