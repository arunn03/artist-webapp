import React, { useState, useEffect } from "react";
import client, { refreshToken } from "../api";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN } from "../constants"; // Adjust import path as needed
import Select from "react-select";
// import { useRazorpay } from "react-razorpay";

import "../styles/Register.css"; // Adjust path as needed

const BillingForm = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [plan, setPlan] = useState(null);
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

  const navigate = useNavigate();
  // const Razorpay = useRazorpay();

  useEffect(() => {
    let token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      const decoded = jwtDecode(token);
      const expirationTime = decoded.exp;
      const now = Date.now() / 1000;

      if (now > expirationTime) {
        refreshToken();
        token = localStorage.getItem(ACCESS_TOKEN);
      }
      setIsAuthenticated(true);
      client.post("/auth/user/").then((r) => {
        setUser(r.data.user);
      });
    } else {
      navigate("/platform/login");
    }
  }, []);

  if (!isAuthenticated) {
    navigate("/platform/login");
  }

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handlePaymentSuccess = async () => {
    try {
      setLoading(true);

      const scriptLoaded = await loadRazorpayScript();

      if (!scriptLoaded) {
        setError("Failed to load Razorpay script");
        setLoading(false);
        return;
      }
      // Send card token and other information to backend
      const response = await client.post("/billing/create-subscription/", {
        name: user.first_name + " " + user.last_name,
        email: user.email,
        contact: "+91" + user.mobile_number,
        address: address,
        plan: plan.name,
      });

      // console.log(response.data);
      if (response.status === 201) {
        var options = {
          key: process.env.REACT_APP_RAZORPAY_KEY_ID,
          subscription_id: response.data.id,
          name: "CinemaThoothu Premium",
          description: "Authentication for Recurring Payments",
          handler: function (response) {
            navigate("/platform");
          },
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.open();
      }
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleError = (error) => {
    setError(error.description);
    setLoading(false);
  };

  const openRazorpayCheckout = async () => {
    // const options = {
    //   key: "rzp_test_mle0ILLcwrgpqs", // Replace with your Razorpay key ID
    //   amount: 100, // Amount in smallest currency unit (like paise for INR)
    //   currency: "INR",
    //   name: "Arunkumar S",
    //   description: "Test Subscription",
    //   prefill: {
    //     email,
    //     contact,
    //   },
    //   notes: {
    //     address: `${address.line1}, ${address.line2}, ${address.city}, ${address.state}, ${address.postal_code}, ${address.country}`,
    //   },
    //   theme: {
    //     color: "#3399cc",
    //   },
    //   handler: handlePaymentSuccess,
    // };

    // const rzp = new Razorpay(options);
    // rzp.open();
    await handlePaymentSuccess();
  };

  const planList = [
    { name: "plan_OKY2KAyIniksj7", label: "Silver" },
    { name: "plan_OKY2n03khLtGXm", label: "Gold" },
    { name: "plan_OKY3XCRSbnODw7", label: "Platinum" },
  ];

  const planInputStyles = {
    valueContainer: (provided) => ({
      ...provided,
      maxHeight: "41px",
      textAlign: "left",
      fontSize: "13px",
      paddingLeft: "15px",
      paddingRight: "15px",
    }),
    control: (styles) => ({ ...styles, width: "100%" }),
    menu: (styles) => ({ ...styles, textAlign: "left" }),
  };

  console.log(plan);

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
          <Select
            name="plan"
            options={planList}
            className="react-select"
            styles={planInputStyles}
            classNamePrefix="select"
            placeholder="Select Plan"
            onChange={(selectedPlan) => setPlan(selectedPlan)}
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
          <button
            type="button"
            onClick={openRazorpayCheckout}
            disabled={loading}
            className="action-button"
          >
            {loading ? "Processing…" : "Subscribe"}
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default BillingForm;
