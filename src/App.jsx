import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Settings from "./pages/Settings/Settings";
import { ToastContainer } from "react-toastify";
import AdminPanel from "./pages/Application/Application";
import ApplicantList from "./pages/Application/Application";
import Login from "./pages/Login/Login";
import NewApplication from "./pages/NewApplication/NewApplication";
import axios from "./Api/axios";
import Myenjaz from "./pages/HOME/Home";
import EditApplicationForm from "./pages/EditApplication/Edit";

export const AppState = createContext();

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Prevent logout loop
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("No token found, redirecting to login...");
      navigate("/");
      setLoading(false);
      return;
    }

    checkUser(token);
  }, []);

  async function checkUser(token) {
    try {
      const { data } = await axios.get("/admin/check", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(data);
    } catch (err) {
      console.error("API Error:", err?.response?.data || err.message);
      if (err.response?.status === 401) {
        // Logout only if API explicitly returns 401 (Unauthorized)
        console.log("Invalid token, logging out...");
        handleLogout();
      } else {
        console.warn("Temporary issue with auth check, NOT logging out.");
      }
    } finally {
      setLoading(false);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userid");
    setUser(null);
    navigate("/");
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading state while checking auth
  }

  return (
    <AppState.Provider value={{ user, setUser, handleLogout }}>
      {user ? (
        <>
          <Header />
          <Routes>
            <Route path="/" element={<Myenjaz />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/new_application" element={<NewApplication />} />
            <Route path="/edit_application/:passportNo" element={<EditApplicationForm/>} />
            <Route path="/applicants" element={<ApplicantList />} />
            <Route path="/flight" element={<Myenjaz />} />
            <Route path="/payment" element={<Myenjaz />} />
            <Route path="/reports" element={<Myenjaz />} />
            <Route path="*" element={<Myenjaz />} />
          </Routes>
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
        </>
      ) : (
        <>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Myenjaz />} />
        </Routes>
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
        </>
      )}
      
      {/* ToastContainer outside routes */}
      
    </AppState.Provider>
  );
}  

export default App;
