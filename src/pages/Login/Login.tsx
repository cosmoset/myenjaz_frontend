import React, { useState, useContext, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "../../Api/axios";
import { RefreshCw } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppState } from "../../App";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';

interface FormData {
  username: string;
  password: string;
}

function generateCaptcha(): string {
  return Math.floor(10000 + Math.random() * 90000).toString();
}

const Login = () => {
  const [formData, setFormData] = useState<FormData>({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const navStateData = useLocation();
  const { setUser } = useContext(AppState);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate(navStateData.state?.redirect || "/", { replace: true });
    }
  }, [navigate, navStateData.state?.redirect]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCaptchaChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCaptchaInput(e.target.value.toUpperCase());
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
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


  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap"
        rel="stylesheet"
      />
      {/* Header */}
      {/* {localStorage.getItem('token') ? null : (
        <header className="bg-blue-600 text-white py-4 px-6 flex justify-between items-center shadow-md">
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold tracking-tight">
              Myenjaz
            </a>
          </div>
          <div className="flex items-center space-x-6">
            <ul className="flex space-x-4">
              <li>
                <a
                  href="/Pages/ChangeCurrentLanguage?LanguageAbbreviation=ar-SA"
                  className="text-sm hover:underline"
                >
                  عربي
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:underline">
                  HOME
                </a>
              </li>
            </ul>
            <nav className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center bg-white text-black px-4 py-2 rounded-md hover:bg-gray-100 transition"
              >
                <User className="w-5 h-5 mr-2" />
                <span>{localStorage.getItem('username') || 'Login'}</span>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10">
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Login
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </header>
      )} */}
      <div className="min-h-screen flex flex-col items-center bg-gray-50 dark:bg-gray-900 pt-4">
        <main className="w-full max-w-3xl mx-auto px-4 py-4">
          <h1 className="text-3xl font-serif text-gray-800 dark:text-gray-100 mb-8 border-b border-gray-300 pb-4 text-left">
            Log In
          </h1>
          <div>
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
              {/* Left Column: User Name, Password, Log In Button */}
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 font-medium text-gray-700 dark:text-gray-300"
                  >
                    User Name:
                  </label>
                  <input
                    id="username"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 font-medium text-gray-700 dark:text-gray-300"
                  >
                    Password:
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-lg"
                    >
                      {showPassword ? "🙈" : "👁"}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-8 py-2 rounded-none text-base font-medium disabled:bg-gray-400 dark:disabled:bg-gray-500"
                >
                  {loading ? "Logging in..." : "Log In"}
                </button>
              </div>

              {/* Right Column: CAPTCHA Section */}
              <div className="space-y-4">
                <div className="bg-blue-600 w-48 h-16 flex items-center justify-center mx-auto">
                  <span
                    style={{ userSelect: "none" }}
                    className="text-white text-2xl font-bold font-[Patrick Hand]"
                  >
                    {captcha}
                  </span>
                </div>
                <div
                  className="flex items-center justify-center cursor-pointer"
                  onClick={() => setCaptcha(generateCaptcha())}
                >
                  <RefreshCw className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" />
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    Show another code
                  </span>
                </div>
                <div>
                  <label
                    htmlFor="captcha"
                    className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-center"
                  >
                    Type the code shown
                  </label>
                  <input
                    id="captcha"
                    type="text"
                    value={captchaInput}
                    onChange={handleCaptchaChange}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  />
                </div>
              </div>
            </form>
          </div>
        </main>
        {/* <Footer /> */}
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      </div>
    </>
  );
};

export default Login;