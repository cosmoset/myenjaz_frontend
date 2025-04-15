import React from 'react';

function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-md mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Central Agent</h3>
            <p className="text-gray-600 dark:text-gray-400">
              An online registration process must be completed in addition to your visa application form. You must sign and date the Easyenjaz Registration Release Form found in this kit.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="https://enjazit.com.sa" className="text-blue-600 dark:text-blue-400 hover:underline">Enjazit: Kingdom of Saudi Arabia Visa</a></li>
              <li><a href="https://musaned.com.sa" className="text-blue-600 dark:text-blue-400 hover:underline">Musaned: Domestic Labour Service</a></li>
              <li><a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Ethiopian Labor Market Information System</a></li>
              <li><a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Wafid: Medical Examinations</a></li>
              <li><a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Nyala Insurance Certificate</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Contact Us</h3>
            <p className="text-gray-600 dark:text-gray-400">Phone: +251 911 454176</p>
            <p className="text-gray-600 dark:text-gray-400">Mail: easyenjaz.sa@gmail.com</p>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-4 text-center">
          <p className="text-gray-600 dark:text-gray-400">2025 © All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;