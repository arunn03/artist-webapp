import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import client, { refreshToken } from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

import "../styles/Register.css";

const Login = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState(null);

  const passRef = useRef();
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

  if (isAuthenticated) {
    return navigate("/platform");
  }

  const handleLoginClick = async (e) => {
    e.preventDefault();
    try {
      const res = await client.post("/auth/token/", {
        email: emailRef.current.value,
        password: passRef.current.value,
      });
      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/platform");
      }
    } catch (err) {
      console.error("Error:", err);
      setErrors(err.response.data);
    }
  };

  return (
    <div className="register-container">
      <form id="msform" onSubmit={handleLoginClick}>
        <fieldset className="active">
          <h2 className="fs-title">Login</h2>
          <h3 className="fs-subtitle">Enter your credentials</h3>
          {errors &&
            errors.email &&
            errors.email.map((error) => (
              <p
                className="text-danger m-0 text-left"
                style={{ fontSize: "10px" }}
              >
                {error}
              </p>
            ))}
          <input type="text" name="email" placeholder="Email" ref={emailRef} />
          {errors &&
            errors.password &&
            errors.password.map((error) => (
              <p
                className="text-danger m-0 text-left"
                style={{ fontSize: "10px" }}
              >
                {error}
              </p>
            ))}
          <input
            type="password"
            name="password"
            placeholder="Password"
            ref={passRef}
          />
          {errors && errors.detail && (
            <p
              className="text-danger m-0 text-left"
              style={{ fontSize: "10px" }}
            >
              {errors.detail}
            </p>
          )}
          <input
            // type="button"
            type="submit"
            name="login"
            className="action-button"
            value="Login"
            // onClick={handleLoginClick}
          />
          <button
            className="resend-link mb-3"
            type="button"
            onClick={() => navigate("/platform/forgot-password")}
          >
            Forgot password?
          </button>

          <h3 className="fs-subtitle m-0">
            Don't have an account?
            <button
              className="resend-link"
              type="button"
              onClick={() => navigate("/platform/register")}
            >
              Sign Up
            </button>
          </h3>
          <h3
            className="fs-subtitle mt-3 mb-0"
            style={{ fontSize: "10px", lineHeight: 2 }}
          >
            <a className="mr-2" href="/privacy-policy">
              Privacy Policy
            </a>
            <a className="mr-2" href="/terms-of-use">
              Terms Of Use
            </a>
            <br />
            <a className="mr-2" href="/refund-policy">
              Refund Policy
            </a>
            <a className="mr-2" href="/customer-support">
              Customer Support
            </a>
          </h3>
        </fieldset>
      </form>
    </div>
  );
};

export default Login;
