import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import axios from "../../Api/axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Applicant {
  passportNo: string;
  date: string;
  applicationNo: string;
  fullName: string;
  dateOfBirth: string;
  experienceAbroad: string;
  worksIn: string;
  sponsorName: string;
  sponsorId: string;
  visaNo: string;
  agent: string;
  fileNo: string;
  coc: string;
  med: string;
  mDays: string;
  mus: string;
  statusDate: string;
  lmis: string;
  remark: string;
  laborId: string;
  days: string;
  religion: string;
}

export default function Applicants() {
  const [search, setSearch] = useState('');
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [user, setUser] = useState('');
  const [selectedApplicants, setSelectedApplicants] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const token = localStorage.getItem('token');
        setUser(localStorage.getItem('username') || '');

        const response = await axios.get('/application/getallapplicants', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (Array.isArray(response.data.users)) {
          setApplicants(response.data.users);
        } else {
          console.error('Unexpected data format:', response.data);
          setApplicants([]);
        }
      } catch (error) {
        console.error('Error fetching applicants:', error);
        setApplicants([]);
        toast.error('Failed to fetch applicants');
      }
    };

    fetchApplicants();
  }, []);

  const calculateAge = (dateOfBirth: string) => {
    const dob = new Date(dateOfBirth);
    const diffMs = Date.now() - dob.getTime();
    const ageDt = new Date(diffMs);
    return Math.abs(ageDt.getUTCFullYear() - 1970);
  };

  const formatDate = (isoString: string) => {
    if (!isoString) return '';
    return isoString.split('T')[0];
  };

  const filteredApplicants = applicants.filter((applicant) => {
    if (!search) return true;
    const searchLower = search.toLowerCase();
    return (
      applicant.fullName.toLowerCase().includes(searchLower) ||
      applicant.applicationNo.includes(search) ||
      applicant.passportNo.includes(search) ||
      applicant.worksIn.toLowerCase().includes(searchLower)
    );
  });

  const handleCheckboxChange = (passportNo: string) => {
    setSelectedApplicants((prev) =>
      prev.includes(passportNo) ? prev.filter((p) => p !== passportNo) : [...prev, passportNo]
    );
  };

  const generatePDF = async () => {
    if (selectedApplicants.length === 0) {
      toast.error('No applicants selected for PDF generation.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/application/generate-report/${selectedApplicants[0]}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { applicants: selectedApplicants.join(',') },
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'document.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error: any) {
      toast.error('Error generating PDF: ' + (error.message || 'Unknown error'));
    }
  };

  const dropdownActions = [
    { label: 'Print', action: generatePDF },
    { label: 'Print Summary', href: '#/print-summary' },
    { label: 'Print Sticker', href: '#/print-sticker' },
    { label: 'Export Applicants for Tasheer', href: '#/export-applicants' },
    { label: 'Print Contract', href: '#/print-contract' },
    { label: 'Print CV', href: '#/print-cv' },
    { label: 'Print Forensic Letter', href: '#/print-forensic-letter' },
    { label: 'Print Pre Departure', href: '#/print-pre-departure' },
    { label: 'Print Letter (MOL)', href: '#/print-letter-mol' },
    { label: 'Print Bio Data', href: '#/print-bio-data' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="relative w-full md:w-64 mb-4 md:mb-0">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 text-left flex justify-between items-center"
          >
            <span>Applicant List</span>
            <Menu className="h-5 w-5" />
          </button>
          {isDropdownOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg">
              {dropdownActions.map(({ label, action, href }) => (
                <div
                  key={label}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={action ? action : undefined}
                >
                  {href ? <a href={href} className="block w-full">{label}</a> : label}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="w-full md:w-96">
          <input
            type="text"
            placeholder="Search by name, passport no..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedApplicants(applicants.map((a) => a.passportNo));
                    } else {
                      setSelectedApplicants([]);
                    }
                  }}
                  checked={selectedApplicants.length === applicants.length && applicants.length > 0}
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                <Link
                  to="/new_application"
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
                >
                  New
                </Link>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Application No.</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Full Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Passport No.</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Age</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Exp</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Works In</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Sponsor Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Sponsor ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Visa Number</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Agent</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">File No.</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">COC</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">MED</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">M.Days</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">MUS</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">LMIS</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Remark</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Labor ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Days</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Religion</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {filteredApplicants.map((applicant) => (
              <tr key={applicant.passportNo} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedApplicants.includes(applicant.passportNo)}
                    onChange={() => handleCheckboxChange(applicant.passportNo)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link
                    to={`/edit_application/${applicant.passportNo}`}
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
                  >
                    Edit
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{formatDate(applicant.date)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{applicant.applicationNo}</td>
                <td className="px-6 py-4 whitespace-nowrap">{applicant.fullName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{applicant.passportNo}</td>
                <td className="px-6 py-4 whitespace-nowrap">{calculateAge(applicant.dateOfBirth)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{applicant.experienceAbroad}</td>
                <td className="px-6 py-4 whitespace-nowrap">{applicant.worksIn}</td>
                <td className="px-6 py-4 whitespace-nowrap">{applicant.sponsorName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{applicant.sponsorId}</td>
                <td className="px-6 py-4 whitespace-nowrap">{applicant.visaNo}</td>
                <td className="px-6 py-4 whitespace-nowrap">{applicant.agent}</td>
                <td className="px-6 py-4 whitespace-nowrap">{applicant.fileNo}</td>
                <td className="px-6 py-4 whitespace-nowrap">{applicant.coc}</td>
                <td className="px-6 py-4 whitespace-nowrap">{applicant.med}</td>
                <td className="px-6 py-4 whitespace-nowrap">{applicant.mDays}</td>
                <td className="px-6 py-4 whitespace-nowrap">{applicant.mus}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    SELECTED
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{formatDate(applicant.statusDate)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{applicant.lmis}</td>
                <td className="px-6 py-4 whitespace-nowrap">{applicant.remark}</td>
                <td className="px-6 py-4 whitespace-nowrap">{applicant.laborId}</td>
                <td className="px-6 py-4 whitespace-nowrap">{applicant.days}</td>
                <td className="px-6 py-4 whitespace-nowrap">{applicant.religion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}