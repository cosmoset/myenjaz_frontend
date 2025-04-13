import React from "react";
import Header from "../../components/Header/Header";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Home.css"
import Footer from "../../components/Footer/Footer";
const Myenjaz = () => {
  return (
    <div className="wrapper">
      {localStorage.getItem("token") ? (
        ""
      ) : (
        <header className="bg-primary notlogged d-flex justify-content-between align-items-center p-3">
     
      
        <div className="d-flex align-items-center w-100">
          <div className="d-flex nameLogo align-items-center ml-3">
            <a href="/" className="text-white">
              Myenjaz
            </a>
          </div>
          <div className="ml-auto d-flex align-items-center">
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
              
                <a
                  className="nav-link homeLink text-white"
                  href="#"
                >
                  HOME
                </a>
              </li>
            </ul>
            <nav>
  
        <Dropdown.Toggle variant="outline-light" className="d-flex login user_login align-items-center gap-2">
        <Link
          
            to="/login" // Use Link to navigate
            className={` small cursor-pointer text-black`}
            
          >
        
          <i className="bi  bi-person" /> {localStorage.getItem("username") || "Login"}
          </Link>
        </Dropdown.Toggle>
 
            </nav>
          </div>
        </div>
      </header>
      )}

      <div className="content"></div>
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div
              className="dxisControl_Moderno"
              id="ImageSlider"
              style={{
                width: "100%",
                height: "600px",
                overflow: "hidden",
                display: "flex",
                justifyContent: "center", // Horizontally center the image
                alignItems: "center", // Vertically center the image
              }}
            >
              <img src="./ff.jpg" alt="afdfad" />
            </div>
          </div>
        </div>
        <div className="container">
          <section className="row text-center">
            <div className="col-md-12">
              <h3>Business Visa Application Requirements Platform</h3>
              <p className="mainText">...</p>
            </div>
            <div className="col-md-12 marginTop20">
              <a className="btn btn-primary btn-lg" href="#">
                <i className="glyphicon glyphicon-info-sign"></i> Help...
              </a>
            </div>
          </section>
          <section className="row features">
            <div className="col-md-4 media">
              <div className="media-left">
                <div className="media-object">
                  <i className="glyphicon glyphicon-wrench featureIcon text-primary"></i>
                </div>
              </div>
              <div className="media-body">
                <h6 className="media-heading">Passport</h6>
                <p>
                  You must provide your actual signed passport, including one
                  copy of the personal information page of your passport. Your
                  passport must:
                </p>
                <ul>
                  <li> Be valid for the next six months </li>
                  <li> Have at least two consecutive blank visa pages </li>
                  <li>
                    {" "}
                    Not be frayed, torn, separating, or altered in any other way{" "}
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-4 media">
              <div className="media-left">
                <div className="media-object">
                  <i className="glyphicon glyphicon-cog featureIcon text-primary"></i>
                </div>
              </div>
              <div className="media-body">
                <h6 className="media-heading">Visa Application Form</h6>
                <p>
                  You must provide one fully completed copy of the visa
                  application form found in this kit. The application form must:
                </p>
                <ul>
                  <li> Include answers for all fields </li>
                  <li>
                    {" "}
                    Display your full name as it appears in your passport{" "}
                  </li>
                  <li> Be signed </li>
                </ul>
              </div>
            </div>
            <div className="col-md-4 media">
              <div className="media-left">
                <div className="media-object">
                  <i className="glyphicon glyphicon-phone featureIcon text-primary"></i>
                </div>
              </div>
              <div className="media-body">
                <h6 className="media-heading">Easynjaz Registration</h6>
                <p>
                  An online registration must be completed in addition to your
                  visa application form. You must sign and date the Myenjaz
                  Registration Release Form found in this kit. The Myenjaz
                  Registration Release Form mentions all required entries in
                  order to process your CV, Contract, Biographic information,
                  the status of all registered candidates. These will give
                  transparent information both for the agency and your partner
                  foreign agent. You are not required to provide them as part of
                  your visa application.
                </p>
              </div>
            </div>
          </section>
          <section>
            <div className="row marginTop20">
              <div className="col-md-12">
                <h3>Our Goal</h3>
                <p>
                  No amount of marketing hype and hyperbole can mask a company's
                  ability to deliver products that meet and exceed customer
                  expectations. The following is a brief list of comments sent
                  to us from our end-users - agencies such as yourself who don't
                  have time and money to waste - agencies who need to get down
                  to business and address employee and foreign employer needs in
                  the shortest possible.
                </p>
              </div>
            </div>
            <div className="row customers">
              <div className="col-md-6">
                <div className="media">
                  <div className="media-left media-middle">
                    <div className="media-object"></div>
                  </div>
                  <div className="media-body">
                    <h6 className="media-heading">Scalable</h6>
                    <p>
                      <small>
                        An intelligent system is a machine with an embedded,
                        Internet-connected computer that has the capacity to
                        gather and analyze data and communicate with other
                        systems. Myenjaz has the capacity to learn from
                        experience, security, connectivity, the ability to adapt
                        according to current data, and the capacity for remote
                        monitoring and management.
                      </small>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="media">
                  <div className="media-left media-middle">
                    <div className="media-object"></div>
                  </div>
                  <div className="media-body">
                    <h6 className="media-heading">Simplification</h6>
                    <p>
                      <small>
                        Myenjaz acts as a central agent between Musaned and
                        Enjazit and simplifies the workloads by fetching already
                        registered data either through Musaned or Enjazit. By
                        making things simple, you can save your time, money, and
                        effort even if you are in distributed areas all over the
                        world 24/7.
                      </small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row customers">
              <div className="col-md-6">
                <div className="media">
                  <div className="media-left media-middle">
                    <div className="media-object"></div>
                  </div>
                  <div className="media-body">
                    <h6 className="media-heading">Compatible</h6>
                    <p>
                      <small>
                        Myenjaz is compatible with all internet-based devices
                        like the usual office desktop computers, laptops,
                        tablets, and even smartphones. Amazingly, Myenjaz can
                        work with Musaned and Enjazit in all directions by
                        receiving and giving required information.
                      </small>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="media">
                  <div className="media-left media-middle">
                    <div className="media-object"></div>
                  </div>
                  <div className="media-body">
                    <h6 className="media-heading">Secured</h6>
                    <p>
                      <small>
                        It seems like recently computers are more and more
                        vulnerable to viruses, and even the people around the
                        computer. Indeed, data corruption is the main and very
                        critical issue for you. That is why Myenjaz is on the
                        cloud. So if you want to go wherever you need, your data
                        is almost in your pocket.
                      </small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div id="btnBackToTop" className="btnBackToTop hidden">
        <i className="glyphicon glyphicon-circle-arrow-up"></i>
      </div>
      <Footer />
    </div>
  );
};

export default Myenjaz;
