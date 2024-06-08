import "./About.css";

import talentShowCaseImg from "../assets/img/talent-showcase.jpg";
import aboutImg from "../assets/img/about.jpg";

const About = () => {
  return (
    <div className="bg-white position-relative">
      <nav className="navbar navbar-expand-lg bg-white navbar-light py-3 py-lg-0">
        <a href="/" className="navbar-brand text-secondary">
          <h1 className="display-4 text-uppercase">cinemathoothu</h1>
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
            <a href="/" className="nav-item nav-link">
              Home
            </a>
            <a href="#" className="nav-item nav-link active">
              About
            </a>
            <a href="/services" className="nav-item nav-link">
              Services
            </a>
            <a href="/pricing" className="nav-item nav-link">
              Prices
            </a>
            {/* <a href="project.html" className="nav-item nav-link">
              Message from the Founder
            </a> */}
            <a href="login" className="nav-item nav-link">
              Login
            </a>
            <a href="/contact" className="nav-item nav-link">
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Page Header */}
      <div className="page-header container-fluid bg-primary d-flex flex-column align-items-center justify-content-center">
        <h1 className="display-3 text-uppercase mb-3">About</h1>
        <div className="d-inline-flex text-white">
          <h6 className="text-uppercase m-0">
            <a className="text-white" href="">
              Home
            </a>
          </h6>
          <h6 className="m-0 px-3">/</h6>
          <h6 className="text-uppercase m-0">About</h6>
        </div>
      </div>

      {/* About Section */}
      <div className="container-fluid pt-5">
        <div className="container pt-5">
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
            </div>
          </div>
        </div>
      </div>

      {/* About Info */}
      <div className="container-fluid py-5">
        <div className="container pb-3">
          <div className="row">
            <div className="col-lg-5 mb-2">
              <div
                className="d-flex align-items-center bg-light rounded mb-4 px-5"
                style={{ height: "150px" }}
              >
                <i className="fa fa-3x fa-map-marker-alt text-primary mr-3"></i>
                <div className="d-flex flex-column">
                  <h5 className="text-uppercase">Our Office</h5>
                  <p className="m-0">
                    45/1 Balaji Nagar, Phase 2, Krishnaswamy Nagar, Coimbatore
                    South, Coimbatore- 641045, Tamil Nadu
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-2">
              <div
                className="d-flex align-items-center bg-light rounded mb-4 px-5"
                style={{ height: "150px" }}
              >
                <i className="fa fa-3x fa-envelope-open text-primary mr-3"></i>
                <div className="d-flex flex-column">
                  <h5 className="text-uppercase">Email Us</h5>
                  <p className="m-0">support@cinemathoothu.com</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 mb-2">
              <div
                className="d-flex align-items-center bg-light rounded mb-4 px-5"
                style={{ height: "150px" }}
              >
                <i className="fas fa-3x fa-phone-alt text-primary mr-3"></i>
                <div className="d-flex flex-column">
                  <h5 className="text-uppercase">Call Us</h5>
                  <p className="m-0">8870816455</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Talent Showcase */}
      <div className="container-fluid bg-light pt-5 pb-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 order-lg-2">
              <img
                className="img-fluid mb-4 mb-lg-0"
                src={talentShowCaseImg}
                alt="Talent Showcase"
              />
            </div>
            <div className="col-lg-6 order-lg-1">
              <h2 className="display-4 text-uppercase mb-4">Talent Showcase</h2>
              <p className="mb-4">
                Step onto the stage of opportunity and endless possibility,
                where every dream has the chance to unfold in the vibrant world
                of cinema. In this dynamic realm of storytelling and expression,
                talents abound, waiting to be discovered and celebrated.
              </p>
              <p className="mb-4">
                Yet, amidst the dazzle of lights and camera, there exists a
                profound truth: for many aspiring actors and actresses,
                especially women hailing from remote corners of the world, the
                journey to stardom can seem like an elusive dream.
              </p>
              <p className="mb-4">
                But fear not, for in the heart of this narrative lies a beacon
                of hope, a secure platform poised to redefine the landscape of
                opportunity and empowerment.
              </p>
              <p className="mb-4">
                Welcome to a realm where talent knows no bounds and where every
                woman, regardless of her origins, can step into the spotlight
                and shine.
              </p>
              <a href="#" className="btn btn-primary text-uppercase py-3 px-5">
                Explore Talent Showcase
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        className="container-fluid bg-dark text-white-50 py-5 px-sm-3 px-md-5"
        style={{ marginTop: "90px" }}
      >
        <div className="row pt-5">
          <div className="col-lg-4 col-md-6 mb-5">
            <a href="/" className="navbar-brand">
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
              <a className="text-white-50 mb-2" href="/">
                <i className="fa fa-angle-right text-white mr-2"></i>Home
              </a>
              <a className="text-white-50 mb-2" href="#">
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
                use
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
          Designed by <a href="bogarcs.com">@bogarcs</a>
        </p>
      </div>

      {/* Back to Top */}
      <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top">
        <i className="fa fa-angle-up"></i>
      </a>
    </div>
  );
};

export default About;
