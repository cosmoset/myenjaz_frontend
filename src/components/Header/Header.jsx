import { useState, useContext } from "react";
import { Dropdown } from "react-bootstrap";
import { AppState } from "../../App";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css";

export default function Header() {
  const [selectedTab, setSelectedTab] = useState("HOME");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, handleLogout } = useContext(AppState);
  const menuItems = [
    { name: "HOME", path: "/" },
    { name: "NEW APPLICATION", path: "/new_application" },
    { name: "APPLICANTS", path: "/applicants" },
    { name: "FLIGHT", path: "/flight" },
    { name: "PAYMENT", path: "/payment" },
    { name: "REPORTS", path: "/reports" },
    { name: "SETTINGS", path: "/settings" },
  ];

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="header text-white d-flex align-items-center justify-content-between px-4 py-2 border-bottom border-dark">
      <div className="d-flex align-items-center gap-2">
        <div className="text-white h4 fw-bold d-flex align-items-center gap-2">
          <div
            className="d-flex align-items-center justify-content-center rounded-circle bg-white text-secondary fw-bold logo"
          >
            MY
          </div>
          enjaz
        </div>
      </div>

      {/* Hamburger Icon for mobile view */}
      <div className="hamburger-icon d-block d-md-none" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      {/* Navigation Menu */}
      <div className={`left ${isMobileMenuOpen ? "open" : ""}`}>
        <nav className="d-flex align-items-center gap-4">
          <span className="small cursor-pointer">عربي</span>
          {menuItems.map(({ name, path }) => (
            <Link
              key={name}
              to={path}
              className={`small cursor-pointer ${selectedTab === name ? "selected fw-bold" : "text-white"}`}
              onClick={() => setSelectedTab(name)}
            >
              {name}
            </Link>
          ))}
        </nav>

        <Dropdown>
          <Dropdown.Toggle variant="outline-light" className="d-flex user_login align-items-center gap-2">
            <i className="bi bi-person" /> {localStorage.getItem("username") || "Login"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#">Settings</Dropdown.Item>
            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </header>
  );
}