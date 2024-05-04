import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import client, { refreshToken } from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

import "../styles/Register.css";

const Login = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
    return navigate("/");
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
        navigate("/");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="register-container">
      <form id="msform" onSubmit={handleLoginClick}>
        <fieldset className="active">
          <h2 className="fs-title">Login</h2>
          <h3 className="fs-subtitle">Enter your credentials</h3>
          <input type="text" name="email" placeholder="Email" ref={emailRef} />
          <input
            type="password"
            name="password"
            placeholder="Password"
            ref={passRef}
          />
          <input
            type="button"
            name="login"
            className="action-button"
            value="Login"
            onClick={handleLoginClick}
          />
          <button
            className="resend-link mb-3"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot password?
          </button>

          <h3 className="fs-subtitle m-0">
            Don't have an account?
            <button
              className="resend-link"
              onClick={() => navigate("/register")}
            >
              Sign Up
            </button>
          </h3>
        </fieldset>
      </form>
    </div>
  );
};

export default Login;
