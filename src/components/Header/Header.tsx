import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Menu, LogOut, Settings, Sun, Moon, User } from 'lucide-react';
import { AppState } from '../../App';
import { useTheme } from '../../Context/ThemeContext';

interface HeaderProps {}

function Header({}: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const { user, handleLogout } = useContext(AppState);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('HOME');

  const menuItems = [
    { name: 'HOME', path: '/' },
    { name: 'NEW APPLICATION', path: '/new_application' },
    { name: 'APPLICANTS', path: '/applicants' },
    { name: 'FLIGHT', path: '/flight' },
    { name: 'PAYMENT', path: '/payment' },
    { name: 'REPORTS', path: '/reports' },
    { name: 'SETTINGS', path: '/settings' },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold tracking-tight">
            MYenjaz
          </Link>

          {/* Right Side: Links, Menu, and User Actions */}
          {localStorage.getItem('token') ? (
            // Logged-in State
            <div className="flex items-center space-x-4">
              {/* Theme Toggle (Commented Out) */}
              {/* <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-blue-700"
              >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button> */}

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center space-x-4">
                <Link to="#" className="text-sm hover:underline">
                  عربي
                </Link>
                {menuItems.map(({ name, path }) => (
                  <Link
                    key={name}
                    to={path}
                    className={`text-sm hover:underline ${
                      selectedTab === name ? 'font-bold underline' : ''
                    }`}
                    onClick={() => setSelectedTab(name)}
                  >
                    {name}
                  </Link>
                ))}

                {user && (
                  <div className="relative">
                    <button
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                      className="flex items-center space-x-1"
                    >
                      <User size={20} />
                    </button>
                    {isMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10">
                        <Link
                          to="/settings"
                          className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <Settings size={16} className="mr-2" />
                          Settings
                        </Link>
                        <button
                          onClick={() => {
                            handleLogout();
                            setIsMenuOpen(false);
                          }}
                          className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                        >
                          <LogOut size={16} className="mr-2" />
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button onClick={toggleMenu} className="md:hidden">
                <Menu size={24} />
              </button>
            </div>
          ) : (
            // Not Logged-in State
            <div className="flex items-center space-x-6">
              <ul className="flex space-x-4">
                <li>
                  <a href="/Pages/ChangeCurrentLanguage?LanguageAbbreviation=ar-SA" className="text-sm hover:underline">
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
          )}
        </div>

        {/* Mobile Menu (Logged-in State) */}
        {localStorage.getItem('token') && isMenuOpen && (
          <div className="md:hidden mt-4 bg-blue-700 rounded-md shadow-lg">
            <div className="flex flex-col p-4 space-y-2">
              <Link
                to="#"
                className="text-sm hover:underline"
                onClick={toggleMenu}
              >
                عربي
              </Link>
              {menuItems.map(({ name, path }) => (
                <Link
                  key={name}
                  to={path}
                  className={`text-sm hover:underline ${
                    selectedTab === name ? 'font-bold underline' : ''
                  }`}
                  onClick={() => {
                    setSelectedTab(name);
                    toggleMenu();
                  }}
                >
                  {name}
                </Link>
              ))}
              {user && (
                <>
                  <Link
                    to="/settings"
                    className="text-sm hover:underline"
                    onClick={toggleMenu}
                  >
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleMenu();
                    }}
                    className="text-sm hover:underline text-left"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;