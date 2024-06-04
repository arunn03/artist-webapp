import React from "react";

const PrivacyPolicy = () => {
  return (
    <>
      <h3 style={{ fontSize: "medium" }}>
        <a className="mr-2" href="/terms-of-use">
          Terms Of Use
        </a>
        <a className="mr-2" href="/refund-policy">
          Refund Policy
        </a>
        <a className="mr-2" href="/customer-support">
          Customer Support
        </a>
      </h3>
      <div className="privacy-policy">
        <h2>Privacy Policy</h2>
        <p>
          This Privacy Policy describes how [Your Company Name] ("we", "us", or
          "our") collects, uses, and discloses your personal information when
          you use our website ([website URL]) (the "Service") and the choices
          you have associated with that data.
        </p>
        <h3>Information We Collect</h3>
        <p>
          We collect several different types of information for various purposes
          to provide and improve our Service to you.
        </p>
        <ul>
          <li>
            <b>Personal Data</b>
            <p>
              While using our Service, we may ask you to provide us with certain
              personally identifiable information that can be used to contact or
              identify you ("Personal Data"). Personally identifiable
              information may include, but is not limited to:
            </p>
            <ul>
              <li>Email address</li>
              <li>Name (optional)</li>
            </ul>
          </li>
          <li>
            <b>Usage Data</b>
            <p>
              We may also collect information how the Service is accessed and
              used ("Usage Data"). This Usage Data may include information such
              as your device's IP address, browser type, browser version, the
              pages of our Service that you visit, the time and date of your
              visit, the time spent on those pages, unique device identifiers
              and other diagnostic data.
            </p>
          </li>
        </ul>
        <h3>Use of Your Information</h3>
        <p>We use the collected data for various purposes:</p>
        <ul>
          <li>To provide and maintain our Service</li>
          <li>To improve our Service</li>
          <li>To personalize your experience</li>
          <li>To respond to your inquiries and requests</li>
          <li>For security purposes</li>
        </ul>
        <h3>Disclosure of Your Information</h3>
        <p>
          We may disclose your Personal Information to third-party vendors and
          service providers who provide support for the operation of our
          Service, such as website hosting or data analysis. These third parties
          will only use your Personal Information for the specific purposes we
          instruct them to.
        </p>
        <p>
          We may also disclose your Personal Information to comply with legal
          obligations, enforce our policies, protect our rights, or protect the
          safety of others.
        </p>
        <h3>Your Rights</h3>
        <p>
          Depending on your location, you may have certain rights regarding your
          personal data. These rights may include the right to access, rectify,
          delete, or restrict the processing of your personal data.
        </p>
        <p>
          You can contact us to learn more about your rights. You can also
          contact your local data protection supervisory authority to learn more
          about your legal rights.
        </p>
        <h3>Data Security</h3>
        <p>
          The security of your data is important to us. We use commercially
          reasonable safeguards to protect your Personal Information against
          unauthorized access, use, disclosure, alteration, or destruction.
          However, no internet transmission or electronic storage method is
          completely secure, and we cannot guarantee absolute security.
        </p>
        <h3>Changes to This Privacy Policy</h3>
        <p>
          We may update our Privacy Policy from time to time. We will notify you
          of any changes by posting the new Privacy Policy on this page.
        </p>
        <p>
          We recommend you review this Privacy Policy periodically for any
          changes. Changes to this Privacy Policy are effective when they are
          posted on this page.
        </p>
        <h3>Contact Us</h3>
        <p>
          If you have any questions about this Privacy Policy, please contact us
          by email at: [email protected]
        </p>
      </div>
    </>
  );
};

export default PrivacyPolicy;
