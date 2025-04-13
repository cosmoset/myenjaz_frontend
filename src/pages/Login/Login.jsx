import React, { useState, useContext, useEffect } from "react";
import axios from "../../Api/axios";
import { RefreshCw } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppState } from "../../App";
import { toast } from "react-toastify";
import "./globals.css";
import Header from "./Header";
import Footer from "../../components/Footer/Footer";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState("");

  const navigate = useNavigate();
  const navStateData = useLocation();
  const { setUser } = useContext(AppState);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate(navStateData.state?.redirect || "/", { replace: true });
    }
  }, [navigate, navStateData.state?.redirect]);

  function generateCaptcha() {
    return Math.floor(10000 + Math.random() * 90000).toString();
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCaptchaChange = (e) => {
    setCaptchaInput(e.target.value.toUpperCase());
  };

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
  
    // CAPTCHA Validation
    if (captcha !== captchaInput) {
      toast.error("Incorrect CAPTCHA. Try again.");
      setCaptcha(generateCaptcha()); // Reset CAPTCHA
      setLoading(false);
      return;
    }
  
    const { username, password } = formData;
    if (!username || !password) {
      toast.error("Username and password are required.");
      setLoading(false);
      return;
    }
  
    try {
      const response = await axios.post("/admin/login", { username, password });
  
      if (response.status === 200) {
        // Successful login
        toast.success("Login successful!");
        localStorage.setItem("loginSuccess", "true");
        const { token, username, userid, role } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        localStorage.setItem("userid", userid);
        localStorage.setItem("role", role);
        setUser({ id: userid, username, role });
        setTimeout(() => {
          navigate(navStateData.state?.redirect || "/", { replace: true });
          
        }, 0);
      } 
      
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Invalid username or password.");
      } 
      else
      {
      toast.error("An error occurred. Please try again.");}
    } finally {

      setLoading(false);
    }
  };

  
  return (<>
  <Header />
    <div className="flex flex-col min-h-screen login-page">
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-serif text-gray-800 mb-8 border-b pb-4">Log In</h1>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
          {/* Login Form */}
          <div className="space-y-0">
            <div className="mb-4">
              <label htmlFor="username" className="block mb-2 font-medium">User Name:</label>
              <input
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            <div className="mb-6">
              <div className="password-container">
                <label htmlFor="password" className="block mb-2 font-medium">Password:</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className="eye-button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "🙈" : "👁"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn bg-gray-200 submit hover:bg-gray-300 text-gray-800 px-8 py-2"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>

          {/* Captcha Section */}
          <div>
            <div className="bg-blue-600 w-48 h-16 flex items-center justify-center mb-2">
              <span style={{userSelect:"none"}} className="text-white text-2xl font-bold handwritten-text italic">{captcha}</span>
            </div>

            <div className="flex items-center mb-4 cursor-pointer" onClick={() => setCaptcha(generateCaptcha())}>
              <RefreshCw className="h-5 w-5 mr-2 text-gray-500" />
              <span className="text-gray-200 " style={{fontSize:"12px"}}>Show another code</span>
            </div>

            <div className="mb-4">
              <label htmlFor="captcha" className="block mb-2 font-medium">Type the code shown</label>
              <input
                id="captcha"
                type="text"
                value={captchaInput}
                onChange={handleCaptchaChange}
                className="form-input"
              />
            </div>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  </>
  
  );
};

export default Login;
