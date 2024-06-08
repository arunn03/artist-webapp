import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";

import client from "../api";

import "../styles/Register.css";

const ResetPassword = () => {
  const passRef = useRef();
  const confPassRef = useRef();

  const navigate = useNavigate();

  const { token } = useParams();

  console.log(token);

  if (!token) {
    return <Navigate exact to="/platform" />;
  }

  const handleResetClick = async (e) => {
    e.preventDefault();
    try {
      console.log(token);
      const res = await client.post("/auth/password_reset/confirm/", {
        password: passRef.current.value,
        confirm_password: confPassRef.current.value,
        token: token,
      });
      if (res.status === 200) {
        localStorage.clear();
        navigate("/platform");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="register-container">
      <form id="msform">
        <fieldset className="active">
          <h2 className="fs-title">Reset Password</h2>
          <h3 className="fs-subtitle">Enter new credentials</h3>
          <input
            type="password"
            name="password"
            placeholder="Password"
            ref={passRef}
          />
          <input
            type="password"
            name="confirm_password"
            placeholder="Confirm Password"
            ref={confPassRef}
          />
          <input
            type="button"
            name="login"
            className="action-button"
            value="Reset"
            onClick={handleResetClick}
          />
        </fieldset>
      </form>
    </div>
  );
};

export default ResetPassword;
