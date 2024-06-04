const CustomerSupport = () => {
  return (
    <>
      <h3 style={{ fontSize: "medium" }}>
        <a className="mr-2" href="/privacy-policy">
          Privacy Policy
        </a>
        <a className="mr-2" href="/terms-of-use">
          Terms Of Use
        </a>
        <a className="mr-2" href="/refund-policy">
          Refund Policy
        </a>
      </h3>
      <div className="customer-support">
        <h2>Customer Support</h2>
        <p>We're here to help! Choose your preferred contact method:</p>
        <div className="contact-methods">
          <div className="contact-method">
            <div>
              <h3>Email</h3>
              <p>
                For detailed inquiries or to attach documents, send us an email
                at:
              </p>
              <a href="mailto:support@bogarcs.com">support@bogarcs.com</a>
            </div>
          </div>
          {/* <div className="contact-method">
          <AiOutlineMessage className="icon" />
          <div>
            <h3>Live Chat</h3>
            <p>Chat with a customer support representative for immediate assistance.</p>
            <button>Start Chat</button>
          </div>
        </div> */}
          <div className="contact-method">
            <div>
              <h3>Phone</h3>
              <p>Call us for urgent inquiries or personalized support.</p>
              <a href="tel:+1234567890">+91 93456 84879</a>
            </div>
          </div>
        </div>
        <p className="additional-info">
          Our support team is available Monday-Friday, 9:00 AM to 5:00 PM PST.
          You can also browse our extensive FAQ section for answers to common
          questions.
        </p>
      </div>
    </>
  );
};

export default CustomerSupport;
