const Pricing = () => {
  return (
    <div className="bg-white position-relative">
      <nav className="navbar navbar-expand-lg bg-white navbar-light py-3 py-lg-0">
        <a href="/" className="navbar-brand text-secondary">
          <h1 className="display-4 text-uppercase">Cinemathoothu</h1>
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
            <a href="/about" className="nav-item nav-link">
              About
            </a>
            <a href="/services" className="nav-item nav-link">
              Services
            </a>
            <a href="/pricing" className="nav-item nav-link active">
              Prices
            </a>
            {/* <a href="project.html" className="nav-item nav-link">
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

      {/* Page Header Start */}
      <div className="page-header container-fluid bg-primary d-flex flex-column align-items-center justify-content-center">
        <h1 className="display-3 text-uppercase mb-3">Prices</h1>
        <div className="d-inline-flex text-white">
          <h6 className="text-uppercase m-0">
            <a className="text-white" href="/">
              Home
            </a>
          </h6>
          <h6 className="m-0 px-3">/</h6>
          <h6 className="text-uppercase m-0">Prices</h6>
        </div>
      </div>

      {/* Pricing Plan Start */}
      <div className="container-fluid py-5">
        <div className="container pt-5 pb-3">
          <h1 className="display-4 text-uppercase text-center mb-5">
            Competitive Pricing
          </h1>
          <div className="row">
            <div className="col-lg-4 mb-2">
              <div className="bg-light rounded text-center pt-5 mt-lg-5 mb-4">
                <h2 className="text-uppercase">Silver </h2>
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
                  <p>Conatct - 5</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Pricing Plan End */}

      <div
        className="container-fluid bg-dark text-white-50 py-5 px-sm-3 px-md-5"
        style={{ marginTop: "90px" }}
      >
        <div className="row pt-5">
          <div className="col-lg-4 col-md-6 mb-5">
            <a href="index.html" className="navbar-brand">
              <h1 className="m-0 mt-n2 text-white display-4">Cinemathoothu</h1>
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
              <a className="text-white-50 mb-2" href="/about">
                <i className="fa fa-angle-right text-white mr-2"></i>About Us
              </a>
              <a className="text-white-50 mb-2" href="/services">
                <i className="fa fa-angle-right text-white mr-2"></i>Our
                Services
              </a>
              <a className="text-white-50 mb-2" href="#">
                <i className="fa fa-angle-right text-white mr-2"></i>Pricing
                Plan
              </a>
              <a className="text-white-50" href="/terms-of-use">
                <i className="fa fa-angle-right text-white mr-2"></i>Contact Us
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
          &copy; <a href="#">Cinemathoothu</a>. All Rights Reserved.
        </p>
        <p className="m-0 text-center text-white-50">
          Designed by <a href="https://www.bogarcs.com/">@bogarcs</a>
        </p>
      </div>

      <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top">
        <i className="fa fa-angle-up"></i>
      </a>
    </div>
  );
};

export default Pricing;
