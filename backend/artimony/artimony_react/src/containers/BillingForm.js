import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import client, { refreshToken } from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

import "../styles/Register.css"; // Adjust path as needed

const BillingForm = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState({
    line1: "",
    line2: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const emailRef = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    var token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      const decoded = jwtDecode(token);
      const expirationTime = decoded.exp;
      const now = Date.now() / 1000;

      if (now > expirationTime) {
        refreshToken();
        token = localStorage.getItem(ACCESS_TOKEN);
      }
      setIsAuthenticated(true);
    }
  }, []);

  if (!isAuthenticated) {
    return navigate("/login");
  }

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: {
          email,
          address,
        },
      });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      const response = await client.post("/billing/create-subscription/", {
        email,
        paymentMethodId: paymentMethod.id,
        address,
      });

      console.log(response);

      const subscription = await response.data;

      if (subscription.error) {
        setError(subscription.error.message);
        setLoading(false);
        return;
      }

      if (subscription.status === "incomplete") {
        const { error: confirmError } = await stripe.confirmCardPayment(
          subscription.client_secret
        );
        console.log("required action");

        if (confirmError) {
          setError(confirmError.message);
          setLoading(false);
          return;
        }
        console.log("successful");

        // alert("Subscription successful!");
        // navigate("/");
      } else {
        // alert("Subscription successful!");
        // navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  };

  const cardElementOptions = {
    style: {
      base: {
        color: "#2C3E50",
        fontSize: "13px",
        "::placeholder": {
          color: "#aab7c4",
        },
        ":focus": {
          color: "#424770",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  return (
    <div className="register-container">
      <form id="msform" onSubmit={handleSubmit}>
        <fieldset className="active">
          <h2 className="fs-title">Billing Details</h2>
          <h3 className="fs-subtitle">Enter your payment information</h3>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            ref={emailRef}
            required
          />
          <input
            type="text"
            name="line1"
            placeholder="Address Line 1"
            value={address.line1}
            onChange={handleAddressChange}
            required
          />
          <input
            type="text"
            name="line2"
            placeholder="Address Line 2"
            value={address.line2}
            onChange={handleAddressChange}
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={address.city}
            onChange={handleAddressChange}
            required
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={address.state}
            onChange={handleAddressChange}
            required
          />
          <input
            type="text"
            name="postal_code"
            placeholder="Postal Code"
            value={address.postal_code}
            onChange={handleAddressChange}
            required
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={address.country}
            onChange={handleAddressChange}
            required
          />
          <div className="stripe-element">
            <CardElement options={cardElementOptions} />
          </div>
          <button
            type="submit"
            disabled={!stripe || loading}
            className="action-button"
          >
            {loading ? "Processing…" : "Subscribe"}
          </button>
          {error && <div>{error}</div>}
        </fieldset>
      </form>
    </div>
  );
};

export default BillingForm;
