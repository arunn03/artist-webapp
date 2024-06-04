import React from "react";

const RefundPolicy = () => {
  return (
    <>
      <h3 style={{ fontSize: "medium" }}>
        <a className="mr-2" href="/privacy-policy">
          Privacy Policy
        </a>
        <a className="mr-2" href="/terms-of-use">
          Terms Of Use
        </a>
        <a className="mr-2" href="/customer-support">
          Customer Support
        </a>
      </h3>
      <div className="refund-policy">
        <h2>Refund Policy for cinemathoothu.com</h2>
        <p>
          This refund policy outlines the conditions under which
          Cinemathoothu.com will issue refunds for movie ticket purchases made
          on our website.
        </p>
        <ul>
          <li>
            <b>Full Refunds:</b> A full refund will be issued in the following
            cases:
            <ul>
              <li>The movie show is cancelled by the cinema.</li>
              <li>
                There is a technical issue with the online ticketing platform
                that prevents you from completing your purchase.
              </li>
              <li>
                You receive a duplicate ticket purchase confirmation for the
                same show.
              </li>
            </ul>
          </li>
          <li>
            <b>Partial Refunds (within 24 hours of purchase):</b> A partial
            refund, excluding the convenience fee, will be issued in the
            following cases:
            <ul>
              <li>
                You mistakenly purchase a ticket for the wrong show or date.
              </li>
              <li>
                You are unable to attend the movie due to a medical emergency
                (proof required).
              </li>
            </ul>
          </li>
          <li>
            <b>No Refunds:</b> No refunds will be issued in the following cases:
            <ul>
              <li>You miss the movie show.</li>
              <li>You change your mind about watching the movie.</li>
              <li>
                You request a refund after the 24-hour window for partial
                refunds.
              </li>
            </ul>
          </li>
        </ul>
        <p>
          <b>Processing Time:</b> Refunds will be processed within 5-7 business
          days of receiving your request. The refunded amount will be credited
          back to the original payment method used for the purchase.
        </p>
        <p>
          <b>Contact Us:</b> If you have any questions about this refund policy
          or need to request a refund, please contact our customer support team
          at [email protected]
        </p>
      </div>
    </>
  );
};

export default RefundPolicy;
