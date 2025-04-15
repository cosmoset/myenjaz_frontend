"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../../Api/axios.js";
import Footer from "../../components/Footer/Footer";
import countries from "./country.js";
import { Upload, CheckSquare } from "lucide-react";

interface FormData {
  maritalStatus: string;
  gender: string;
  applicationNo: string;
  fullName: string;
  fullNameAmharic: string;
  date: string;
  passportNo: string;
  placeOfIssue: string;
  dateOfIssue: string;
  dateOfBirth: string;
  religion: string;
  qualification: string;
  city: string;
  woreda: string;
  phoneNo: string;
  visaNo: string;
  sponsorId: string;
  sponsorAddress: string;
  nationalId: string;
  email: string;
  fileNo: string;
  wakala: string;
  signedOn: string;
  biometricId: string;
  sponsorName: string;
  sponsorPhone: string;
  houseNo: string;
  agent: string;
  sponsorArabic: string;
  visaType: string;
  contractNo: string;
  stickerVisaNo: string;
  currentNationality: string;
  laborId: string;
  relativeName: string;
  relativePhone: string;
  relativeCity: string;
  relativeWoreda: string;
  relativeGender: string;
  addressRegion: string;
  relativeKinship: string;
  subcity: string;
  relativeHouseNo: string;
  relativeBirthDate: string;
  contactPerson2: string;
  cocCenterName: string;
  certificateNo: string;
  contactPhone2: string;
  passportType: string;
  placeOfBirth: string;
  dateOfExpiry: string;
  occupation: string;
  region: string;
  certifiedDate: string;
  medicalPlace: string;
  twoPhotographs: number;
  idCard: number;
  relativeIdCard: number;
  english: string;
  experienceAbroad: string;
  worksIn: string;
  height: number;
  referenceNo: string;
  ironing: number;
  sewing: number;
  babysitting: number;
  carCare: number;
  cleaning: number;
  washing: number;
  cooking: number;
  arabic: string;
  salary: number;
  numberOfChildren: number;
  weight: number;
  remark: string;
}

interface Photos {
  regular: File | null;
  fullSize: File | null;
  passport: File | null;
}

interface Previews {
  regular: string | null;
  fullSize: string | null;
  passport: string | null;
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

export default function ApplicationForm() {
  const [key, setKey] = useState<"photo" | "fullsize" | "passport">("photo");
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState<Photos>({
    regular: null,
    fullSize: null,
    passport: null,
  });
  const [previews, setPreviews] = useState<Previews>({
    regular: null,
    fullSize: null,
    passport: null,
  });
  const [formData, setFormData] = useState<FormData>({
    maritalStatus: "",
    gender: "",
    applicationNo: "",
    fullName: "",
    fullNameAmharic: "",
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
    height: 0,
    referenceNo: "",
    ironing: 0,
    sewing: 0,
    babysitting: 0,
    carCare: 0,
    cleaning: 0,
    washing: 0,
    cooking: 0,
    arabic: "",
    salary: 0,
    numberOfChildren: 0,
    weight: 0,
    remark: "",
  });

  useEffect(() => {
    if (localStorage.getItem("loginSuccess")) {
      toast.success("Login successful!", { position: "top-right" });
      localStorage.removeItem("loginSuccess");
    }
  }, []);

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>, type: keyof Photos) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setPhotos((prev) => ({ ...prev, [type]: file }));
    setPreviews((prev) => ({ ...prev, [type]: objectUrl }));
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    }));
  };

  const showConfirmationToast = (onConfirm: () => Promise<void>) => {
    toast.info(
      ({ closeToast }) => (
        <div>
          <p>Are you sure you want to submit the application?</p>
          <div className="flex gap-2 mt-2">
            <button
              className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
              onClick={async () => {
                await onConfirm();
                closeToast();
              }}
            >
              Yes
            </button>
            <button
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              onClick={closeToast}
            >
              No
            </button>
          </div>
        </div>
      ),
      { autoClose: false, closeOnClick: false, position: "top-right" }
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    showConfirmationToast(async () => {
      setLoading(true);

      try {
        const formDataObj = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          formDataObj.append(key, value.toString());
        });

        if (photos.regular) formDataObj.append("regularPhoto", photos.regular);
        if (photos.fullSize) formDataObj.append("fullSizePhoto", photos.fullSize);
        if (photos.passport) formDataObj.append("passportPhoto", photos.passport);

        const token = localStorage.getItem("token");

        const response = await axios.post("/application/new_application", formDataObj, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });

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
      <main className="max-w-4xl mx-auto py-6 px-4">
        <form onSubmit={handleSubmit}>
          {/* Applicant Section */}
          <div className="border rounded-none shadow-sm mb-4">
            <div className="bg-gray-100 flex justify-between items-center px-4 py-2">
              <h5 className="text-blue-700 font-bold">Applicant</h5>
              <button type="button" className="text-blue-700 font-bold hover:underline">
                Open Photo Editor
              </button>
            </div>
            <div className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Left: Photo Tabs */}
                <div className="md:w-1/2 border border-gray-300 p-4">
                  <div className="flex border-b border-gray-300 mb-3">
                    {["photo", "fullsize", "passport"].map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        className={`px-4 py-2 font-medium text-sm ${
                          key === tab
                            ? "bg-gray-200 text-black"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                        onClick={() => setKey(tab as "photo" | "fullsize" | "passport")}
                      >
                        {tab.toUpperCase()}
                      </button>
                    ))}
                  </div>
                  <div className="text-center">
                    {key === "photo" && (
                      <div>
                        {previews.regular ? (
                          <img
                            src={previews.regular}
                            alt="Regular photo"
                            className="w-full h-48 object-cover rounded mb-3"
                          />
                        ) : (
                          <div className="bg-gray-100 flex items-center justify-center h-48 mb-3">
                            <span className="text-gray-500">No photo selected</span>
                          </div>
                        )}
                        <label className="block">
                          <input
                            type="file"
                            accept="image/*"
                            required
                            onChange={(e) => handlePhotoUpload(e, "regular")}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-none file:border-0 file:text-sm file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                          />
                        </label>
                      </div>
                    )}
                    {key === "fullsize" && (
                      <div>
                        {previews.fullSize ? (
                          <img
                            src={previews.fullSize}
                            alt="Full size photo"
                            className="w-full h-48 object-cover rounded mb-3"
                          />
                        ) : (
                          <div className="bg-gray-100 flex items-center justify-center h-48 mb-3">
                            <span className="text-gray-500">No full size photo selected</span>
                          </div>
                        )}
                        <label className="block">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handlePhotoUpload(e, "fullSize")}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-none file:border-0 file:text-sm file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                          />
                        </label>
                      </div>
                    )}
                    {key === "passport" && (
                      <div>
                        {previews.passport ? (
                          <img
                            src={previews.passport}
                            alt="Passport photo"
                            className="w-full h-48 object-cover rounded mb-3"
                          />
                        ) : (
                          <div className="bg-gray-100 flex items-center justify-center h-48 mb-3">
                            <span className="text-gray-500">No passport photo selected</span>
                          </div>
                        )}
                        <label className="block">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handlePhotoUpload(e, "passport")}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-none file:border-0 file:text-sm file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                          />
                        </label>
                      </div>
                    )}
                  </div>
                </div>
                {/* Right: Basic Application Fields */}
                <div className="md:w-1/2 p-4">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col sm:flex-row gap-4 items-center">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700">
                          Application No:
                        </label>
                        <input
                          type="text"
                          name="applicationNo"
                          value={formData.applicationNo}
                          onChange={handleChange}
                          placeholder="Enter Application No."
                          className="mt-1 block w-3/4 border border-gray-300 rounded-none p-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700">Date:</label>
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          className="mt-1 block w-3/4 border border-gray-300 rounded-none p-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <button
                        type="button"
                        className="bg-blue-600 text-white px-4 py-2 rounded-none hover:bg-blue-800 text-sm"
                      >
                        Paste (M)
                      </button>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Full Name: <span className="text-orange-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Enter Full Name"
                        className="mt-1 block w-3/4 border border-orange-500 rounded-none p-2 text-sm focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">ሙሉ ስም:</label>
                      <input
                        type="text"
                        name="fullNameAmharic"
                        value={formData.fullNameAmharic}
                        onChange={handleChange}
                        placeholder="Enter Full Name"
                        className="mt-1 block w-3/4 border border-gray-300 rounded-none p-2 text-sm focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="border rounded-none shadow-sm mb-4">
            <div className="bg-gray-100 px-4 py-2">
              <h5 className="text-blue-700 font-bold">Personal Information</h5>
            </div>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Passport No. <span className="text-orange-500">*</span>
                </label>
                <input
                  type="text"
                  name="passportNo"
                  required
                  value={formData.passportNo}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-orange-500 rounded-none p-2 text-sm focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Passport Type <span className="text-orange-500">*</span>
                </label>
                <select
                  name="passportType"
                  required
                  value={formData.passportType}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-orange-500 rounded-none p-2 text-sm focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50"
                >
                  <option value="normal">Normal</option>
                  <option value="diplomatic">Diplomatic</option>
                  <option value="special">Special</option>
                  <option value="haji cert">Haji Cert</option>
                  <option value="travel cert">Travel Cert</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Place of Issue <span className="text-orange-500">*</span>
                </label>
                <input
                  type="text"
                  name="placeOfIssue"
                  required
                  value={formData.placeOfIssue}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-orange-500 rounded-none p-2 text-sm focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Place of Birth <span className="text-orange-500">*</span>
                </label>
                <input
                  type="text"
                  name="placeOfBirth"
                  required
                  value={formData.placeOfBirth}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-orange-500 rounded-none p-2 text-sm focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date of Issue <span className="text-orange-500">*</span>
                </label>
                <input
                  type="date"
                  name="dateOfIssue"
                  required
                  value={formData.dateOfIssue}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-orange-500 rounded-none p-2 text-sm focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date of Expiry <span className="text-orange-500">*</span>
                </label>
                <input
                  type="date"
                  name="dateOfExpiry"
                  required
                  value={formData.dateOfExpiry}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-orange-500 rounded-none p-2 text-sm focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date of Birth <span className="text-orange-500">*</span>
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  required
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-orange-500 rounded-none p-2 text-sm focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone No.</label>
                <input
                  type="text"
                  name="phoneNo"
                  value={formData.phoneNo}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-none p-2 text-sm focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Religion <span className="text-orange-500">*</span>
                </label>
                <select
                  name="religion"
                  required
                  value={formData.religion}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-orange-500 rounded-none p-2 text-sm focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50"
                >
                  <option value="">Select</option>
                  <option value="islam">Islam</option>
                  <option value="christian">Christian</option>
                  <option value="orthodox">Orthodox</option>
                  <option value="catholic">Catholic</option>
                  <option value="protestant">Protestant</option>
                  <option value="buddhism">Buddhism</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Marital Status <span className="text-orange-500">*</span>
                </label>
                <select
                  name="maritalStatus"
                  required
                  value={formData.maritalStatus}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-orange-500 rounded-none p-2 text-sm focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50"
                >
                  <option value="">Select</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="divorced">Divorced</option>
                  <option value="widow">Widow</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Gender <span className="text-orange-500">*</span>
                </label>
                <select
                  name="gender"
                  required
                  value={formData.gender}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-orange-500 rounded-none p-2 text-sm focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50"
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Occupation <span className="text-orange-500">*</span>
                </label>
                <select
                  name="occupation"
                  required
                  value={formData.occupation}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-orange-500 rounded-none p-2 text-sm focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50"
                >
                  <option value="">Select</option>
                  <option value="house maid">HOUSE MAID</option>
                  <option value="nanny">NANNY</option>
                  <option value="female nurse">FEMALE NURSE</option>
                  <option value="female cooker">FEMALE COOKER</option>
                  <option value="female physiotherapist">FEMALE PHYSIOTHERAPIST</option>
                  <option value="driver">DRIVER</option>
                  <option value="house worker">HOUSE WORKER</option>
                  <option value="male cooker">MALE COOKER</option>
                  <option value="male nurse">MALE NURSE</option>
                  <option value="male personal helper">MALE PERSONAL HELPER</option>
                  <option value="cook / waiter">COOK / WAITER</option>
                  <option value="male physiotherapist">MALE PHYSIOTHERAPIST</option>
                  <option value="sales representative">SALES REPRESENTATIVE</option>
                  <option value="home farmer">HOME FARMER</option>
                  <option value="other">OTHER</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Qualification</label>
                <input
                  type="text"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-none p-2 text-sm focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Region</label>
                <select
                  name="region"
                  value={formData.region}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-none p-2 text-sm focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50"
                >
                  <option value="">Select</option>
                  <option value="addis ababa">Addis Ababa</option>
                  <option value="afar">Afar</option>
                  <option value="amhara">Amhara</option>
                  <option value="benishangul-gumuz">Benishangul-Gumuz</option>
                  <option value="dire dawa">Dire Dawa</option>
                  <option value="gambela">Gambela</option>
                  <option value="harari">Harari</option>
                  <option value="oromia">Oromia</option>
                  <option value="sidama">Sidama</option>
                  <option value="somalia">Somalia</option>
                  <option value="tigray">Tigray</option>
                  <option value="south west ethiopia">South West Ethiopia</option>
                  <option value="snnp">SNNP</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-none p-2 text-sm focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Subcity/Zone</label>
                <input
                  type="text"
                  name="subcity"
                  value={formData.subcity}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-none p-2 text-sm focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Woreda</label>
                <input
                  type="text"
                  name="woreda"
                  value={formData.woreda}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-none p-2 text-sm focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">House No.</label>
                <input
                  type="text"
                  name="houseNo"
                  value={formData.houseNo}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-none p-2 text-sm focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50"
                />
              </div>
            </div>
          </div>

          {/* Sponsor & Visa Information */}
          <h2 className="text-lg font-bold text-gray-900 mb-2">Sponsor & Visa Information</h2>
          <div className="border rounded-none shadow-sm mb-4">
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Visa No.</label>
                <input
                  type="text"
                  name="visaNo"
                  value={formData.visaNo}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-none p-2 text-sm focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Sponsor ID</label>
                <input
                  type="text"
                  name="sponsorId"
                  value={formData.sponsorId}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-none p-2 text-sm focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Sponsor Address</label>
                <input
                  type="text"
                  name="sponsorAddress"
                  value={formData.sponsorAddress}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-none p-2 text-sm focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">National ID</label>
                <input
                  type="text"
                  name="nationalId"
                  value={formData.nationalId}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-none p-2 text-sm focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-none p-2 text-sm focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">File No.</label>
                <input
                  type="text"
                  name="fileNo"
                  value={formData.fileNo}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-none p-2 text-sm focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Wakala #</label>
                <input
                  type="text"
                  name="wakala"
                  value={formData.wakala}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-none p-2 text-sm focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Signed On</label>
                <input
                  type="date"
                  name="signedOn"
                  value={formData.signedOn}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-none p-2 text-sm focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Biometric ID</label>
                <input
                  type="text"
                  name="biometricId"
                  value={formData.biometricId}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-none p-2 text-sm focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Sponsor Name</label>
                <input
                  type="text"
                  name="sponsorName"
                  value={formData.sponsorName}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-none p-2 text-sm focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Sponsor Phone</label>
                <input
                  type="text"
                  name="sponsorPhone"
                  value={formData.sponsorPhone}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-none p-2 text-sm focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Agent</label>
                <select
                  name="agent"
                  value={formData.agent}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-none p-2 text-sm focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50"
                >
                  <option value="00000000-0000-0000-0000-000000000000">
                    00000000-0000-0000-0000-000000000000
                  </option>
                  <option value="ALSAFA RECRUITMENT OFFICE">ALSAFA RECRUITMENT OFFICE</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Sponsor Arabic</label>
                <input
                  type="text"
                  name="sponsorArabic"
                  value={formData.sponsorArabic}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-none p-2 text-sm focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Visa Type</label>
                <select
                  name="visaType"
                  value={formData.visaType}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-none p-2 text-sm focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50"
                >
                  <option value="Work">Work</option>
                  <option value="Visit">Visit</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Contract #</label>
                <input
                  type="text"
                  name="contractNo"
                  value={formData.contractNo}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-none p-2 text-sm focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Sticker Visa #</label>
                <input
                  type="text"
                  name="stickerVisaNo"
                  value={formData.stickerVisaNo}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-none p-2 text-sm focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Current Nationality
                </label>
                <select
                  name="currentNationality"
                  value={formData.currentNationality}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-none p-2 text-sm focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50"
                >
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Labor ID</label>
                <input
                  type="text"
                  name="laborId"
                  value={formData.laborId}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-none p-2 text-sm focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50"
                />
              </div>
            </div>
          </div>

          {/* Relative Information */}
          <h2 className="text-lg font-bold text-gray-900 mb-2">Relative Information</h2>
          <div className="border rounded-none shadow-sm mb-4">
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Relative Name</label>
                <input
                  type="text"
                  name="relativeName"
                  value={formData.relativeName}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-none p-2 text-sm focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Relative Phone</label>
                <input
                  type="text"
                  name="relativePhone"
                  value={formData.relativePhone}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-none p-2 text-sm focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">City</label>
                <input
                  type="text"
                  name="relativeCity"
                  value={formData.relativeCity}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-none p-2 text-sm focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Relative Woreda
                </label>
                <input
                  type="text"
                  name="relativeWoreda"
                  value={formData.relativeWoreda}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-none p-2 text-sm focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Relative Gender
                </label>
                <select
                  name="relativeGender"
                  value={formData.relativeGender}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-none p-2 text-sm focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50"
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Address Region</label>
                <input
                  type="text"
                  name="addressRegion"
                  value={formData.addressRegion}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-none p-2 text-sm focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Relative Kinship
                </label>
                <input
                  type="text"
                  name="relativeKinship"
                  value={formData.relativeKinship}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-none p-2 text-sm focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Subcity/Zone</label>
                <input
                  type="text"
                  name="subcity"
                  value={formData.subcity}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-none p-2 text-sm focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Relative House #
                </label>
                <input
                  type="text"
                  name="relativeHouseNo"
                  value={formData.relativeHouseNo}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-none p-2 text-sm focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Relative Birth Date
                </label>
                <input
                  type="date"
                  name="relativeBirthDate"
                  value={formData.relativeBirthDate}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-none p-2 text-sm focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50"
                />
              </div>
            </div>
          </div>

          {/* Other Information */}
          <h2 className="text-lg font-bold text-gray-900 mb-2">Other Information</h2>
          <div className="border rounded-none shadow-sm mb-4">
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Contact Person (2nd)
                </label>
                <input
                  type="text"
                  name="contactPerson2"
                  value={formData.contactPerson2}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-none p-2 text-sm focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Coc Center Name</label>
                <input
                  type="text"
                  name="cocCenterName"
                  value={formData.cocCenterName}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-none p-2 text-sm focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Certificate No.</label>
                <input
                  type="text"
                  name="certificateNo"
                  value={formData.certificateNo}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-none p-2 text-sm focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Contact Phone (2nd)
                </label>
                <input
                  type="text"
                  name="contactPhone2"
                  value={formData.contactPhone2}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-none p-2 text-sm focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Certified Date</label>
                <input
                  type="date"
                  name="certifiedDate"
                  value={formData.certifiedDate}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-none p-2 text-sm focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Medical Place</label>
                <select
                  name="medicalPlace"
                  value={formData.medicalPlace}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-none p-2 text-sm focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50"
                >
                  <option value="">Select place</option>
                  <option value="Yekatit">Yekatit</option>
                  <option value="Tikur Anbessa">Tikur Anbessa</option>
                  <option value="Halelluyah">Halelluyah</option>
                </select>
              </div>
              <div className="col-span-2">
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="twoPhotographs"
                      checked={formData.twoPhotographs === 1}
                      onChange={handleChange}
                      className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="text-sm">Two Photographs</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="idCard"
                      checked={formData.idCard === 1}
                      onChange={handleChange}
                      className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="text-sm">ID Card</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="relativeIdCard"
                      checked={formData.relativeIdCard === 1}
                      onChange={handleChange}
                      className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="text-sm">Relative ID Card</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Skills & Experience */}
          <h2 className="text-lg font-bold text-gray-900 mb-2">Skills & Experience</h2>
          <div className="border rounded-none shadow-sm mb-4">
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">English</label>
                <select
                  name="english"
                  value={formData.english}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-none p-2 text-sm focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50"
                >
                  <option value="">Select level</option>
                  <option value="basic">Basic</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Experience Abroad
                </label>
                <select
                  name="experienceAbroad"
                  value={formData.experienceAbroad}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-none p-2 text-sm focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50"
                >
                  <option value="">Select experience</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Works In</label>
                <input
                  type="text"
                  name="worksIn"
                  value={formData.worksIn}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-none p-2 text-sm focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Height</label>
                <input
                  type="text"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-none p-2 text-sm focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Reference No.</label>
                <input
                  type="text"
                  name="referenceNo"
                  value={formData.referenceNo}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-none p-2 text-sm focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Arabic</label>
                <select
                  name="arabic"
                  value={formData.arabic}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-none p-2 text-sm focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50"
                >
                  <option value="">Select level</option>
                  <option value="basic">Basic</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Salary</label>
                <input
                  type="number"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-none p-2 text-sm focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  No. of Children
                </label>
                <input
                  type="number"
                  name="numberOfChildren"
                  value={formData.numberOfChildren}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-none p-2 text-sm focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Weight</label>
                <input
                  type="text"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-none p-2 text-sm focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Remark</label>
                <input
                  type="text"
                  name="remark"
                  value={formData.remark}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-none p-2 text-sm focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50"
                />
              </div>
              <div className="col-span-2">
                <div className="flex flex-wrap gap-4">
                  {[
                    { name: "ironing", label: "Ironing" },
                    { name: "sewing", label: "Sewing" },
                    { name: "babysitting", label: "B.Sitting" },
                    { name: "carCare", label: "Cr.Care" },
                    { name: "cleaning", label: "Cleaning" },
                    { name: "washing", label: "Washing" },
                    { name: "cooking", label: "Cooking" },
                  ].map((skill) => (
                    <label key={skill.name} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name={skill.name}
                        checked={formData[skill.name as keyof FormData] === 1}
                        onChange={handleChange}
                        className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="text-sm">{skill.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-none hover:bg-blue-800 disabled:bg-gray-400 text-sm"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Application"}
            </button>
          </div>
        </form>
      </main>
      <div className="h-16" />
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
      {/* <Footer /> */}
    </>
  );
}