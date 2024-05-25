// CustomCheckbox.js
import React, { useState } from "react";
import "../styles/CheckBox.css"; // Import your CSS file for styling

const CheckBox = ({ checked = false, onChange = (value) => {} }) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    onChange(!isChecked);
  };

  return (
    <label className="custom-checkbox">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <span className="checkbox"></span>
    </label>
  );
};

export default CheckBox;
