import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "./../../Api/axios";
import { toast, ToastContainer } from "react-toastify";
import "./Application.css";

const ApplicationList = () => {
  const [search, setSearch] = useState("");
  const [applicants, setApplicants] = useState([]);
  const [user, setUser] = useState("");
  const [selectedApplicants, setSelectedApplicants] = useState([]); // Changed to an array

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const token = localStorage.getItem("token");
        setUser(localStorage.getItem("username"));

        const response = await axios.get("/application/getallapplicants", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });


        if (Array.isArray(response.data.users)) {
          setApplicants(response.data.users);
        } else {
          console.error("Unexpected data format:", response.data);
          setApplicants([]);
        }
      } catch (error) {
        console.error("Error fetching applicants:", error);
        setApplicants([]);
      }
    };

    fetchApplicants();
  }, []);

  // from date of birth, calculatee age i have date of birth as applicant.dateOfBirth
  const calculateAge = (dateOfBirth) => {
    const dob = new Date(dateOfBirth);
    const diffMs = Date.now() - dob.getTime();
    const ageDt = new Date(diffMs);
    return Math.abs(ageDt.getUTCFullYear() - 1970);
  };
 

  const formatDate = (isoString) => {
    if (!isoString) return "";
    return isoString.split("T")[0];
  };

  // Filter data based on search input
  const filteredData = applicants.filter((user) => {
    if (!search) return true;
    return (
      user.fullName.toLowerCase().includes(search.toLowerCase()) ||
      user.applicationNo.includes(search) ||
      user.passportNo.includes(search) ||
      user.worksIn.toLowerCase().includes(search.toLowerCase())
    );
  });

  // Handle Checkbox Selection
  const handleCheckboxChange = (passportNo) => {
    setSelectedApplicants((prevSelected) =>
      prevSelected.includes(passportNo)
        ? prevSelected.filter((p) => p !== passportNo)
        : [...prevSelected, passportNo]
    );
  };

  // Generate PDF Request
  const generatePDF = async () => {
    if (selectedApplicants.length === 0) {
      toast.error("No applicants selected for PDF generation.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`/application/generate-report/${selectedApplicants[0]}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { applicants: selectedApplicants.join(",") }, // Send as comma-separated string
        responseType: "blob",
      });

      // Create a downloadable link for the PDF
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "document.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      toast.error("Error generating PDF:", error);
    }
  };

  return (
    <main className="applicationList">
      <div className="apps_search">
        <Dropdown>
          <Dropdown.Toggle variant="" id="dropdown-basic" className="w-100">
            Applicant List
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={generatePDF}>Print</Dropdown.Item>
            <Dropdown.Item href="#/print-summary">Print Summary</Dropdown.Item>
            <Dropdown.Item href="#/print-sticker">Print Sticker</Dropdown.Item>
            <Dropdown.Item href="#/export-applicants">
              Export Applicants for Tasheer
            </Dropdown.Item>
            <Dropdown.Item href="#/print-contract">Print Contract</Dropdown.Item>
            <Dropdown.Item href="#/print-cv">Print CV</Dropdown.Item>
            <Dropdown.Item href="#/print-forensic-letter">
              Print Forensic Letter
            </Dropdown.Item>
            <Dropdown.Item href="#/print-pre-departure">
              Print Pre Departure
            </Dropdown.Item>
            <Dropdown.Item href="#/print-letter-mol">
              Print Letter (MOL)
            </Dropdown.Item>
            <Dropdown.Item href="#/print-bio-data">Print Bio Data</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <div className="search">
          <p>Search</p>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Name, Passport No..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="container-fluid mt-3">
        <table
          className="table table-bordered table-striped text-center"
          style={{ fontWeight: "300" }}
        >
          <thead>
            <tr>
              <th>#</th>
              <th>
              <Link
                    to={"/new_application"}
                    
                  >
                    New
                  </Link></th>
              <th>Date</th>
              <th>Application No.</th>
              <th>Full Name</th>
              <th>Passport No.</th>
              <th>Age</th>
              <th>Exp</th>
              <th>Works In</th>
              <th>Sponsor Name</th>
              <th>Sponsor ID</th>
              <th>Visa Number</th>
              <th>Agent</th>
              <th>File No.</th>
              <th>COC</th>
              <th>MED</th>
              <th>M.Days</th>
              <th>MUS</th>
              <th>User</th>
              <th>Status</th>
              <th>Status Date</th>
              <th>LMIS</th>
              <th>Remark</th>
              <th>Labor ID</th>
              <th>Days</th>
              <th>Religion</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((applicant) => (
              <tr key={applicant.passportNo}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedApplicants.includes(applicant.passportNo)}
                    onChange={() => handleCheckboxChange(applicant.passportNo)}
                  />
                </td>
                <td>
                  <Link
                   to={`/edit_application/${applicant.passportNo}`}
                  
                  >
                    Edit
                  </Link>
                </td>
                <td>{formatDate(applicant.date)}</td>
                <td>{applicant.applicationNo}</td>
                <td>{applicant.fullName}</td>
                <td>{applicant.passportNo}</td>
                <td>{calculateAge(applicant.dateOfBirth)}</td>
                <td>{applicant.experienceAbroad}</td>
                <td>{applicant.worksIn}</td>
                <td>{applicant.sponsorName}</td>
                <td>{applicant.sponsorId}</td>
                <td>{applicant.visaNo}</td>
                <td>{applicant.agent}</td>
                <td>{applicant.fileNo}</td>
                <td>{applicant.coc}</td>
                <td>{applicant.med}</td>
                <td>{applicant.mDays}</td>
                <td>{applicant.mus}</td>
                <td>{user}</td>
                <td>{"SELECTED"}</td>
                <td>{applicant.statusDate}</td>
                <td>{applicant.lmis}</td>
                <td>{applicant.remark}</td>
                <td>{applicant.laborId}</td>
                <td>{applicant.days}</td>
                <td>{applicant.religion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default ApplicationList;
