import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../../components/Footer/Footer";

export default function Settings() {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header */}
      <div className="border-bottom border-primary pb-2">
        <h2 className="text-dark mt-3 ms-4">Manage your account settings</h2>
        <ul className="ms-5">
          <li>Password: <a href="#" className="text-primary">Change your password</a></li>
          <li><a href="#" className="text-primary">Add New User</a></li>
          <li><a href="#" className="text-primary">Manage Subusers</a></li>
        </ul>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

