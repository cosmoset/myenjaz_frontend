import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Scale, Zap, User, ArrowUp, Phone, Wrench, Settings } from 'lucide-react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

function Home() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Header */}
      {/* <Header /> */}
      {/* {localStorage.getItem('token') ? null : 
      (
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

      {/* Hero Section */}
      <section
        className="relative w-full h-[600px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('./ff.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative text-center text-white z-10 px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Business Visa Application Requirements Platform
          </h1>
          <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">
            Streamline your visa application process with our comprehensive platform
            designed for agencies and employers worldwide.
          </p>
          <a
            href="#requirements"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-800 transition"
          >
            Learn More
          </a>
        </div>
      </section>

      {/* Requirements Section */}
      <section id="requirements" className="py-16 px-4 bg-white dark:bg-gray-800">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Visa Application Requirements
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Passport */}
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-lg transition transform hover:-translate-y-1">
              <div className="flex justify-center mb-4">
                <Wrench className="w-12 h-12 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Passport</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                You must provide your actual signed passport, including one copy of
                the personal information page of your passport. Your passport must:
              </p>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400 text-sm">
                <li>• Be valid for the next six months</li>
                <li>• Have at least two consecutive blank visa pages</li>
                <li>• Not be frayed, torn, separating, or altered in any other way</li>
              </ul>
            </div>

            {/* Visa Application Form */}
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-lg transition transform hover:-translate-y-1">
              <div className="flex justify-center mb-4">
                <Settings className="w-12 h-12 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Visa Application Form</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                You must provide one fully completed copy of the visa application
                form found in this kit. The application form must:
              </p>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400 text-sm">
                <li>• Include answers for all fields</li>
                <li>• Display your full name as it appears in your passport</li>
                <li>• Be signed</li>
              </ul>
            </div>

            {/* Easynjaz Registration */}
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-lg transition transform hover:-translate-y-1">
              <div className="flex justify-center mb-4">
                <Phone className="w-12 h-12 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Easynjaz Registration</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                An online registration must be completed in addition to your visa
                application form. You must sign and date the Myenjaz Registration
                Release Form found in this kit. The Myenjaz Registration Release
                Form mentions all required entries in order to process your CV,
                Contract, Biographic information, the status of all registered
                candidates. These will give transparent information both for the
                agency and your partner foreign agent. You are not required to
                provide them as part of your visa application.
              </p>
            </div>
          </div>
          <div className="text-center mt-8">
            {/* <a
              href="#"
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-800 transition"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Help...
            </a> */}
          </div>
        </div>
      </section>

      {/* Our Goal Section */}
      <section className="py-16 px-4 bg-gray-100 dark:bg-gray-700">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Our Goal
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-center mb-8">
            No amount of marketing hype and hyperbole can mask a company's ability
            to deliver products that meet and exceed customer expectations. The
            following is a brief list of comments sent to us from our end-users -
            agencies such as yourself who don't have time and money to waste -
            agencies who need to get down to business and address employee and
            foreign employer needs in the shortest possible.
          </p>
          <div className="grid gap-8 md:grid-cols-2">
            {/* Scalable */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-1 text-center">
              <div className="flex justify-center mb-4">
                <Scale className="w-12 h-12 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Scalable</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                An intelligent system is a machine with an embedded,
                Internet-connected computer that has the capacity to gather and
                analyze data and communicate with other systems. Myenjaz has the
                capacity to learn from experience, security, connectivity, the
                ability to adapt according to current data, and the capacity for
                remote monitoring and management.
              </p>
            </div>

            {/* Simplification */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-1 text-center">
              <div className="flex justify-center mb-4">
                <Zap className="w-12 h-12 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Simplification</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Myenjaz acts as a central agent between Musaned and Enjazit and
                simplifies the workloads by fetching already registered data either
                through Musaned or Enjazit. By making things simple, you can save
                your time, money, and effort even if you are in distributed areas
                all over the world 24/7.
              </p>
            </div>

            {/* Compatible */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-1 text-center">
              <div className="flex justify-center mb-4">
                <svg
                  className="w-12 h-12 text-blue-600 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Compatible</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Myenjaz is compatible with all internet-based devices like the
                usual office desktop computers, laptops, tablets, and even
                smartphones. Amazingly, Myenjaz can work with Musaned and Enjazit
                in all directions by receiving and giving required information.
              </p>
            </div>

            {/* Secured */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-1 text-center">
              <div className="flex justify-center mb-4">
                <Shield className="w-12 h-12 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Secured</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                It seems like recently computers are more and more vulnerable to
                viruses, and even the people around the computer. Indeed, data
                corruption is the main and very critical issue for you. That is
                why Myenjaz is on the cloud. So if you want to go wherever you
                need, your data is almost in your pocket.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Top Button */}
      <button
        id="btnBackToTop"
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-800 transition hidden"
      >
        <ArrowUp className="w-6 h-6" />
      </button>

      {/* <Footer /> */}
    </div>
  );
}

export default Home;