import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Myenjaz from './pages/HOME/Home';
import Settings from './pages/Settings/Settings';
import Login from './pages/Login/Login';
import NewApplication from './pages/NewApplication/NewApplication';
import ApplicantList from './pages/Application/Applicants';
import EditApplicationForm from './pages/EditApplication/Edit';
import { ThemeProvider } from './Context/ThemeContext';
import axios from './Api/axios';



interface User {
  // Define user properties based on your API response
  username?: string;
  id?: string;
  // Add other fields as needed
}

interface AppStateValue {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  handleLogout: () => void;
}

export const AppState = createContext<AppStateValue>({
  user: null,
  setUser: () => {},
  handleLogout: () => {},
});

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    checkUser(token);
  }, []);

  async function checkUser(token: string) {
    try {
      const { data } = await axios.get('/admin/check', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(data);
    } catch (err: any) {
      console.error('API Error:', err?.response?.data || err.message);
      if (err.response?.status === 401) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userid');
    setUser(null);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">Loading...</div>;
  }

  return (
    <ThemeProvider>
      <AppState.Provider value={{ user, setUser, handleLogout }}>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 flex flex-col">
            {/* Show header only if user is logged in */}
            {<Header />}

            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Myenjaz />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/new_application" element={<NewApplication />} />
              <Route path="/edit_application/:passportNo" element={<EditApplicationForm />} />
              <Route path="/applicants" element={<ApplicantList />} />
              <Route path="/flight" element={<Myenjaz />} />
              <Route path="/payment" element={<Myenjaz />} />
              <Route path="/reports" element={<Myenjaz />} />
              <Route path="*" element={<Myenjaz />} />
            </Routes>

            <Footer />

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
          </div>
        </Router>
      </AppState.Provider>
    </ThemeProvider>
  );
}

export default App;