import "./Services.css";

const Services = () => {
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
            <a href="/about" className="nav-item nav-link">
              About
            </a>
            <a href="#" className="nav-item nav-link active">
              Services
            </a>
            <a href="/pricing" className="nav-item nav-link">
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
        <h1 className="display-3 text-uppercase mb-3">Services</h1>
        <div className="d-inline-flex text-white">
          <h6 className="text-uppercase m-0">
            <a className="text-white" href="">
              Home
            </a>
          </h6>
          <h6 className="m-0 px-3">/</h6>
          <h6 className="text-uppercase m-0">Services</h6>
        </div>
      </div>

      {/* Services Start */}
      <div className="container-fluid py-5">
        <div className="container">
          <h1 className="display-4 text-uppercase text-center mb-5">
            Our Creative Services
          </h1>
          <div className="row">
            {/* Service 1 */}
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
            {/* Service 2 */}
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
            {/* Service 3 */}
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
            {/* Service 4 */}
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
            {/* Service 5 */}
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
            {/* Service 6 */}
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

      {/* Footer Start */}
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
              <a className="text-white-50 mb-2" href="/about">
                <i className="fa fa-angle-right text-white mr-2"></i>About Us
              </a>
              <a className="text-white-50 mb-2" href="#">
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
          &copy; <a href="#">Cinemathoothu</a>. All Rights Reserved.
        </p>
        <p className="m-0 text-center text-white-50">
          Designed by <a href="https://www.bogarcs.com/">@bogarcs</a>
        </p>
      </div>

      {/* Back to Top */}
      <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top">
        <i className="fa fa-angle-up"></i>
      </a>
    </div>
  );
};

export default Services;
