import { useState } from "react";
import client from "../api";
import Select from "react-select";

const UpdateSubscription = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState("");

  const handleCancelSubscription = async () => {
    try {
      setLoading(true);
      const response = await client.post("/billing/update-subscription/", {
        plan: plan.name,
      });

      console.log(response);

      setMessage("Subscription updated successfully");
      setError("");
    } catch (error) {
      console.log(error);
      setError("Error updating subscription");
      setMessage("");
    } finally {
      setLoading(false);
    }
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
          <button
            type="button"
            onClick={handleCancelSubscription}
            disabled={loading}
            className="action-button"
          >
            {loading ? "Processing…" : "Update Subscription"}
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default UpdateSubscription;
