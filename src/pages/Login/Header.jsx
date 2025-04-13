import { useState, useContext } from "react";
import { Dropdown } from "react-bootstrap";
import { AppState } from "../../App";
import { Link, useNavigate } from "react-router-dom"; // Import Link from react-router-dom
import "./Header.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Header() {
  const [selectedTab, setSelectedTab] = useState("APPLICANTS");
  const { user, handleLogout } = useContext(AppState);

  return (
    <header className="text-white d-flex align-items-center justify-content-between px-4 py-2 border-bottom border-dark">
      <div className="d-flex align-items-center gap-2">
        <div className="text-white h4 fw-bold d-flex align-items-center gap-2">
          <div
            className="d-flex align-items-center justify-content-center rounded-circle bg-white text-primary fw-bold"
            style={{ width: "32px", height: "32px" }}
          >
            E
          </div>
          asyenjaz
        </div>
      </div>
      <div className="left">
        <ul className="nav">
          <li className="nav-item">
            <a
              className="nav-link text-white"
              href="/Pages/ChangeCurrentLanguage?LanguageAbbreviation=ar-SA"
            >
              عربي
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link homeLink text-white" href="#">
              HOME
            </a>
          </li>
        </ul>
        <Dropdown>
          <Dropdown.Toggle
            variant="outline-light"
            className="d-flex user_login align-items-center gap-2"
          >
            <i className="bi bi-person" />{" "}
            {localStorage.getItem("username") || "Login"}
          </Dropdown.Toggle>
        </Dropdown>
      </div>
    </header>
  );
}
