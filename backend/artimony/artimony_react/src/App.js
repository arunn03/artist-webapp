import Register from "./containers/Register";
import Login from "./containers/Login";
import Home from "./containers/Home";
import StaticHome from "./static/Home";
import About from "./static/About";
import Services from "./static/Services";
import Contact from "./static/Contact";
import Pricing from "./static/Pricing";
import ProfileSettings from "./containers/ProfileSettings";
import ResetPassword from "./containers/ResetPassword";
import ForgotPassword from "./containers/ForgotPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import BillingForm from "./containers/BillingForm";
import CancelSubscription from "./containers/CancelSubscription";
import UpdateSubscription from "./containers/UpdateSubscription";
import PrivacyPolicy from "./legal/PrivacyPolicy";
import TermsOfUse from "./legal/TermsOfUse";
import CustomerSupport from "./legal/CustomerSupport";
import RefundPolicy from "./legal/RefundPolicy";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./App.css";

function Logout() {
  localStorage.clear();
  return <Navigate to="/platform/login" />;
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
            path="/platform"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/platform/profile"
            element={
              <ProtectedRoute>
                <ProfileSettings />
              </ProtectedRoute>
            }
          />
          <Route exact path="/platform/register" element={<Register />} />
          <Route exact path="/platform/login" element={<Login />} />
          <Route exact path="/platform/logout" element={<Logout />} />
          <Route
            exact
            path="/platform/reset-password/:token"
            element={
              <ProtectedRoute>
                <ResetPassword />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/platform/forgot-password"
            element={
              <ProtectedRoute>
                <ForgotPassword />
              </ProtectedRoute>
            }
          />
          {/* <Route exact path="/pricing" element={<Pricing />} /> */}
          <Route
            exact
            path="/platform/payment"
            element={
              <ProtectedRoute>
                <BillingForm />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/platform/payment/cancel"
            element={
              <ProtectedRoute>
                <CancelSubscription />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/platform/payment/update"
            element={
              <ProtectedRoute>
                <UpdateSubscription />
              </ProtectedRoute>
            }
          />
          <Route exact path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route exact path="/terms-of-use" element={<TermsOfUse />} />
          <Route exact path="/refund-policy" element={<RefundPolicy />} />
          <Route exact path="/customer-support" element={<CustomerSupport />} />

          <Route exact path="/" element={<StaticHome />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/services" element={<Services />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/pricing" element={<Pricing />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
