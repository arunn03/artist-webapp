import React, { useState } from "react";
import client from "../api";

const CancelSubscription = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCancelSubscription = async () => {
    try {
      setLoading(true);
      const response = await client.post("/billing/cancel-subscription/");

      console.log(response);

      setMessage("Subscription cancelled successfully");
      setError("");
    } catch (error) {
      setError("Error cancelling subscription");
      setMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <form id="msform">
        <fieldset className="active">
          <h2 className="fs-title">Billing Details</h2>
          <h3 className="fs-subtitle">Enter your payment information</h3>
          {error && (
            <p
              className="text-danger m-0 text-left"
              style={{ fontSize: "10px" }}
            >
              {error}
            </p>
          )}
          {message && (
            <p
              className="text-success m-0 text-left"
              style={{ fontSize: "10px" }}
            >
              {message}
            </p>
          )}
          <button
            type="button"
            onClick={handleCancelSubscription}
            disabled={loading}
            className="action-button"
          >
            {loading ? "Processing…" : "Cancel Subscription"}
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default CancelSubscription;
