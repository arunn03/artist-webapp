import "./Home.css";

import headerImg from "../assets/img/header.png";
import aboutImg from "../assets/img/about.jpg";

const StaticHome = () => {
  return (
    <div className="bg-white position-relative">
      <nav className="navbar navbar-expand-lg bg-white navbar-light py-3 py-lg-0">
        <a href="#" className="navbar-brand text-secondary">
          <h1 className="display-4 text-uppercase">CinemaThoothu</h1>
        </a>
        <button
          type="button"
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ml-auto py-0 pr-3 border-right">
            <a href="#" className="nav-item nav-link active">
              Home
            </a>
            <a href="/about" className="nav-item nav-link">
              About
            </a>
            <a href="/services" className="nav-item nav-link">
              Services
            </a>
            <a href="/pricing" className="nav-item nav-link">
              Prices
            </a>
            {/* <a href="#" onClick={() => navigate("/pricing")} className="nav-item nav-link">
              Message from the Founder
            </a> */}
            <a href="/platform" className="nav-item nav-link">
              Login
            </a>
            <a href="/contact" className="nav-item nav-link">
              Contact
            </a>
          </div>
        </div>
      </nav>

      <div
        className="container-fluid bg-primary py-5 px-0"
        style={{ marginBottom: "90px" }}
      >
        <div className="row mx-0 align-items-center">
          <div className="col-lg-6 px-md-5 text-center text-lg-left">
            <h1 className="display-2 text-uppercase mb-3">
              Cinema Thoothu! Empowering Talents in Cinema!
            </h1>
            <button className="attractive-button">Login</button>
          </div>
          <div className="col-lg-6 px-0 text-right">
            <img className="img-fluid mt-5 mt-lg-0" src={headerImg} alt="" />
          </div>
        </div>
      </div>

      <div className="container-fluid py-5">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <img className="img-fluid mb-4 mb-lg-0" src={aboutImg} alt="" />
            </div>
            <div className="col-lg-6">
              <h1 className="display-4 text-uppercase mb-4">ABOUT US</h1>
              <h5 className="text-uppercase text-primary mb-3">
                We believe that talent has no boundaries and that every
                individual, regardless of age or background, deserves to explore
                their opportunity to stage their talents to get their shine in
                the cinematic spotlight. Our mission is to create a secure and
                inclusive platform where aspiring actors and actresses of all
                ages, especially young adults, can showcase their talents to the
                cinema industry.
              </h5>
              <a
                href="/about"
                className="btn btn-primary text-uppercase py-3 px-5"
              >
                Read More
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid py-5">
        <div className="container">
          <h1 className="display-4 text-uppercase text-center mb-5">
            Our Services
          </h1>
          <div className="row">
            <div className="col-lg-4 mb-4">
              <div className="service-card">
                <div className="card-body">
                  <h3 className="card-title text-center">
                    Secure Registration and Profile Management
                  </h3>
                  <p className="card-text text-center">
                    Our platform ensures a secure registration process,
                    safeguarding the personal information of aspiring talents.
                    Users can create and manage their profiles, highlighting
                    their skills, experiences, and portfolios in a safe and
                    user-friendly environment.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="service-card">
                <div className="card-body">
                  <h3 className="card-title text-center">Talent Showcase</h3>
                  <p className="card-text text-center">
                    The platform provides a dedicated space for aspiring actors
                    and actresses to showcase their talents through video
                    auditions, monologues, demo reels, and portfolios. Talent
                    profiles are categorized and easily searchable, allowing
                    industry professionals to discover new talents efficiently.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="service-card">
                <div className="card-body">
                  <h3 className="card-title text-center">
                    Opportunities and Networking
                  </h3>
                  <p className="card-text text-center">
                    We facilitate connections between aspiring talents and
                    industry professionals, including casting directors,
                    producers, cinema directors, TV program directors,
                    advertisement agencies, and talent agencies. Regular updates
                    on casting calls, auditions, workshops, and networking
                    events are provided to members, ensuring they stay informed
                    about potential opportunities.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="service-card">
                <div className="card-body">
                  <h3 className="card-title text-center">
                    Mentorship and Guidance
                  </h3>
                  <p className="card-text text-center">
                    Experienced professionals in the cinema industry offer
                    mentorship and guidance to aspiring talents, providing
                    valuable insights, advice, and support. Mentorship programs
                    focus on various aspects of the industry, including acting
                    techniques, audition preparation, career development, and
                    navigating challenges in the cine-field.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="service-card">
                <div className="card-body">
                  <h3 className="card-title text-center">
                    Safe and Inclusive Community
                  </h3>
                  <p className="card-text text-center">
                    Our platform fosters a supportive and inclusive community
                    where aspiring talents can interact, collaborate, and share
                    experiences in a safe and respectful environment. We
                    prioritize the well-being and safety of our members,
                    implementing strict guidelines and measures to prevent
                    harassment, discrimination, and exploitation.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="service-card">
                <div className="card-body">
                  <h3 className="card-title text-center">
                    Empowerment and Inspiration
                  </h3>
                  <p className="card-text text-center">
                    Access to a supportive community, mentorship programs, and
                    networking opportunities empowers women from remote areas to
                    pursue their dreams with confidence and determination. By
                    sharing success stories and experiences of trailblazing
                    women in the industry, we inspire and motivate aspiring
                    talents to overcome obstacles and strive for excellence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid py-5">
        <div className="container pt-5 pb-3">
          <h1 className="display-4 text-uppercase text-center mb-5">
            Competitive Pricing
          </h1>
          <div className="row">
            <div className="col-lg-4 mb-2">
              <div className="bg-light rounded text-center pt-5 mt-lg-5 mb-4">
                <h2 className="text-uppercase">Silver</h2>
                <h6 className="text-uppercase text-body mb-5"></h6>
                <div className="text-center bg-dark rounded-circle p-4 mb-2">
                  <h1 className="display-4 text-white mb-0">
                    <small
                      className="align-top"
                      style={{ fontSize: "22px", lineHeight: "45px" }}
                    >
                      ₹
                    </small>
                    499
                    <small
                      className="align-bottom"
                      style={{ fontSize: "16px", lineHeight: "40px" }}
                    ></small>
                  </h1>
                </div>
                <div className="text-center py-4">
                  <p>Validity - 1 Day</p>
                  <p>Contact - 1</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-2">
              <div className="bg-dark rounded text-center pt-5 mb-4">
                <h2 className="text-uppercase text-white">Gold</h2>
                <h6 className="text-uppercase text-secondary mb-5"></h6>
                <div className="text-center bg-primary rounded-circle p-4 mb-2">
                  <h1 className="display-4 mb-0">
                    <small
                      className="align-top"
                      style={{ fontSize: "22px", lineHeight: "45px" }}
                    >
                      ₹
                    </small>
                    999
                    <small
                      className="align-bottom"
                      style={{ fontSize: "16px", lineHeight: "40px" }}
                    ></small>
                  </h1>
                </div>
                <div className="text-center text-secondary py-4">
                  <p>Validity - 15 Days</p>
                  <p>Contact 3</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-2">
              <div className="bg-light rounded text-center pt-5 mt-lg-5 mb-4">
                <h2 className=" text-uppercase">Platinum</h2>
                <h6 className="text-uppercase text-body mb-5"></h6>
                <div className="text-center bg-dark rounded-circle p-4 mb-2">
                  <h1 className="display-4 text-white mb-0">
                    <small
                      className="align-top"
                      style={{ fontSize: "22px", lineHeight: "45px" }}
                    >
                      ₹
                    </small>
                    1499
                    <small
                      className="align-bottom"
                      style={{ fontSize: "16px", lineHeight: "40px" }}
                    ></small>
                  </h1>
                </div>
                <div className="text-center py-4">
                  <p>Validity - 15 Days</p>
                  <p>Contact - 5</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="container-fluid bg-dark text-white-50 py-5 px-sm-3 px-md-5"
        style={{ marginTop: "90px" }}
      >
        <div className="row pt-5">
          <div className="col-lg-4 col-md-6 mb-5 ">
            <a href="index.html" className="navbar-brand">
              <h1 className="m-0 mt-n2 text-white display-4">CinemaThoothu</h1>
            </a>
            <h6 className="text-uppercase text-white py-2">Follow Us</h6>
            <div className="d-flex justify-content-start">
              <a className="btn btn-lg btn-primary btn-lg-square mr-2" href="#">
                <i className="fab fa-twitter"></i>
              </a>
              <a className="btn btn-lg btn-primary btn-lg-square mr-2" href="#">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                className="btn btn-lg btn-primary btn-lg-square mr-2"
                href="https://www.linkedin.com/company/bogarcs/"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a className="btn btn-lg btn-primary btn-lg-square" href="#">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-5">
            <h4 className="text-uppercase text-white mb-4">Get In Touch</h4>
            <p>
              <i className="fa fa-map-marker-alt text-white mr-2"></i>45/1
              Balaji Nagar, Phase 2, Krishnaswamy Nagar, Coimbatore South,
              Coimbatore- 641045, Tamil Nadu
            </p>
            <p>
              <i className="fa fa-phone-alt text-white mr-2"></i>8870816455
            </p>
            <p>
              <i className="fa fa-envelope text-white mr-2"></i>
              support@cinemathoothu.com
            </p>
          </div>
          <div className="col-lg-3 col-md-6 mb-5">
            <h4 className="text-uppercase text-white mb-4">Quick Links</h4>
            <div className="d-flex flex-column justify-content-start">
              <a className="text-white-50 mb-2" href="#">
                <i className="fa fa-angle-right text-white mr-2"></i>Home
              </a>
              <a className="text-white-50 mb-2" href="/about">
                <i className="fa fa-angle-right text-white mr-2"></i>About Us
              </a>
              <a className="text-white-50 mb-2" href="/services">
                <i className="fa fa-angle-right text-white mr-2"></i>Our
                Services
              </a>
              <a className="text-white-50 mb-2" href="/pricing">
                <i className="fa fa-angle-right text-white mr-2"></i>Pricing
                Plan
              </a>
              <a className="text-white-50 mb-2" href="/terms-of-use">
                <i className="fa fa-angle-right text-white mr-2"></i>Terms of
                Use
              </a>
              <a className="text-white-50" href="/contact">
                <i className="fa fa-angle-right text-white mr-2"></i>Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
      <div
        className="container-fluid py-4 px-sm-3 px-md-5"
        style={{ background: "#111111" }}
      >
        <p className="mb-2 text-center text-white-50">
          &copy; <a href="#">cinemathoothu</a>. All Rights Reserved.
        </p>
        <p className="m-0 text-center text-white-50">
          Designed by <a href="https://bogarcs.com">@bogarcs</a>
        </p>
      </div>

      <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top">
        <i className="fa fa-angle-up"></i>
      </a>
    </div>
  );
};

export default StaticHome;
