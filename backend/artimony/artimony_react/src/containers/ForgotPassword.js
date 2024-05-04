import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import client from "../api";

import "../styles/Register.css";

const ForgotPassword = () => {
  const emailRef = useRef();

  const navigate = useNavigate();

  const handleSubmitClick = async (e) => {
    e.preventDefault();
    try {
      const res = await client.post("/auth/password_reset/", {
        email: emailRef.current.value,
      });
      if (res.status === 200) {
        console.log("Password reset link sent successfully");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="register-container">
      <form id="msform">
        <fieldset className="active">
          <h2 className="fs-title">Forgot Password</h2>
          <h3 className="fs-subtitle">Enter your email ID</h3>
          <input
            type="email"
            name="email"
            placeholder="Email ID"
            ref={emailRef}
          />
          <input
            type="button"
            name="login"
            className="action-button"
            value="Send Reset Link"
            onClick={handleSubmitClick}
          />
        </fieldset>
      </form>
    </div>
  );
};

export default ForgotPassword;
