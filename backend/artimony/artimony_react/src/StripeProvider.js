// src/StripeProvider.js
import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// Replace with your own publishable key
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const StripeProvider = ({ children }) => {
  return <Elements stripe={stripePromise}>{children}</Elements>;
};

export default StripeProvider;
