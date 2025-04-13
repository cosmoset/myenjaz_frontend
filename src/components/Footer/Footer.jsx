import React from "react";
import "./Footer.css"
export default function Footer() {
  return (
    <footer className="bg-gray-200 text-gray-800 py-6 footer">
      <div className="container mx-auto px-6">
        <div className="grid container  flex grid-cols-1 md:grid-cols-3 gap-6">
          {/* Central Agent Section */}
          <div>
            <p className="font-semibold text-lg">Central Agent</p>
            <p className="text-sm mt-2">
              An online registration process must be completed in addition to
              your visa application form. You must sign and date the Easyenjaz
              Registration Release Form found in this kit.
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <p className="font-semibold text-lg">Quick Links</p>
            <ul className="mt-2 space-y-1 quick_link">
              <li>
                <a
                  href="#"
                  className="text-blue-600 hover:underline"
                >
                  Enjazit: Kingdom of Saudi Arabia Visa
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-blue-600 hover:underline"
                >
                  Musaned: Domestic Labour Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-blue-600 hover:underline"
                >
                  Ethiopian Labor Market Information System
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-blue-600 hover:underline"
                >
                  Wafid: Medical Examinations
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-blue-600 hover:underline"
                >
                  Nyala Insurance Certificate
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Us Section */}
          <div>
            <p className="font-semibold text-lg">Contact Us</p>
            <p className="text-sm mt-2">
              <strong>Phone:</strong> +251 911 454176
            </p>
            <p className="text-sm">
              <strong>Mail:</strong>{" "}
              <a
                href="mailto:easyenjaz.sa@gmail.com"
                className="text-blue-600 hover:underline"
              >
                easyenjaz.sa@gmail.com
              </a>
            </p>
          </div>
        </div>

        {/* Bottom Copyright Section */}
       
      </div> <div className="mt-6 copy text-center bg-blue-900 text-white py-3">
          <p className="text-sm">2025 © All Rights Reserved.</p>
        </div>
    </footer>
  );
}
