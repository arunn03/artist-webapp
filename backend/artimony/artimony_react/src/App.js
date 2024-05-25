import Register from "./containers/Register";
import Login from "./containers/Login";
import Home from "./containers/Home";
import ProfileSettings from "./containers/ProfileSettings";
import ResetPassword from "./containers/ResetPassword";
import ForgotPassword from "./containers/ForgotPassword";
import Pricing from "./containers/Pricing";
import ProtectedRoute from "./components/ProtectedRoute";
import StripeProvider from "./StripeProvider";
import BillingForm from "./containers/BillingForm";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./App.css";

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

function App() {
  const disableFeatures = (e) => {
    e.preventDefault();
  };

  return (
    <Router>
      <div
        onContextMenu={disableFeatures}
        onCopy={disableFeatures}
        onCut={disableFeatures}
        className="no-selection"
      >
        <Routes>
          <Route
            exact
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfileSettings />
              </ProtectedRoute>
            }
          />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/logout" element={<Logout />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route exact path="/forgot-password" element={<ForgotPassword />} />
          <Route exact path="/pricing" element={<Pricing />} />
          <Route
            exact
            path="/payment"
            element={
              <StripeProvider>
                <BillingForm />
              </StripeProvider>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
