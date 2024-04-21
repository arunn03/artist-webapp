import { useState, useRef } from "react";
import Select from "react-select";
import "./RegisterForm.css";
import axios from "axios";

function RegisterForm() {
  const [selectedOptions, setSelectedOptions] = useState([]);
  // const [mobileOTP, setmobileOTP] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const mobileOtpRefs = useRef([]);
  const emailOtpRefs = useRef([]);
  const nameRef = useRef("");
  const emailRef = useRef("");
  const mobileRef = useRef("");
  const genderRef = useRef("");
  const cityRef = useRef("");
  const passRef = useRef("");
  const confPassRef = useRef("");
  const formRef = useRef();

  const interests = [
    { value: "director", label: "Director" },
    { value: "actor", label: "Actor" },
    { value: "producer", label: "Producer" },
    { value: "dop", label: "DOP" },
  ];

  const customStyles = {
    valueContainer: (provided) => ({
      ...provided,
      maxHeight: "38px", // Set a maximum height
      overflow: "auto",
      "::-webkit-scrollbar": {
        display: "none", // Hide scrollbar for Chrome, Safari and Opera
      },
      "-ms-overflow-style": "none", // Hide scrollbar for IE and Edge
      "scrollbar-width": "none",
      textAlign: "left", // Enable scrolling
    }),
    control: (styles) => ({ ...styles, width: "100%" }),
    menu: (styles) => ({ ...styles, textAlign: "left" }),
  };

  const handleDropdownChange = (selected) => {
    console.log(selected);
    setSelectedOptions(selected || []);
  };

  const handleRegisterClick = async (event) => {
    event.preventDefault();
    try {
      // const mobileResponse = await axios.post(
      //   "http://localhost:8000/mobile-otp/",
      //   {
      //     mobile_number: mobileRef.current.value,
      //   }
      // );
      // const emailResponse = await axios.post(
      //   "http://localhost:8000/email-otp/",
      //   {
      //     email: emailRef.current.value,
      //   }
      // );
      // if (mobileResponse.status === 200 && emailResponse.status === 200) {
      //   console.log("OTP Generation successful");
      // }
    } catch (error) {
      console.error("Error:", error);
    }
    setShowPopup(true);
    document.body.classList.add("blur-background");
  };

  const handleVerifyClick = async () => {
    var mobileOTP = "",
      emailOTP = "";
    for (var i = 0; i < 6; i++) {
      mobileOTP += mobileOtpRefs.current[i].value;
      emailOTP += emailOtpRefs.current[i].value;
    }
    console.log(mobileOTP, emailOTP);
    const body = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      city: cityRef.current.value,
      interests: selectedOptions.map((value, index) => {
        return { name: value.value };
      }),
      gender: genderRef.current.value,
      mobile_number: mobileRef.current.value,
      password: passRef.current.value,
      confirm_password: confPassRef.current.value,
      mobile_otp: mobileOTP,
      email_otp: emailOTP,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/register/",
        body
      );
      if (response.status === 201) {
        console.log("User registered successfully");
      } else {
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setShowPopup(false);
    document.body.classList.remove("blur-background");
  };

  const handleOtpInput = (index, refs, event) => {
    const value = event.target.value;
    if (value && index < refs.current.length - 1) {
      refs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (index, refs, event) => {
    if (event.keyCode === 8 && !event.target.value && index > 0) {
      refs.current[index - 1].focus();
    }
  };

  return (
    <div className="body">
      <div className="jumbotron">
        <h1>SIGN UP</h1>
        <form ref={formRef} onSubmit={handleRegisterClick}>
          <div className="form-group">
            {/* <label htmlFor="name">First Name</label> */}
            <input
              type="text"
              name="first_name"
              ref={nameRef}
              id="name"
              placeholder="First Name"
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            {/* <label htmlFor="city">Last Name</label> */}
            <input
              type="text"
              name="city"
              ref={cityRef}
              id="city"
              placeholder="Last Name"
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            {/* <label htmlFor="email">Email</label> */}
            <input
              type="email"
              name="email"
              ref={emailRef}
              id="email"
              placeholder="Email ID"
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            {/* <label htmlFor="mobile">Mobile Number</label> */}
            <input
              type="text"
              name="mobile_number"
              ref={mobileRef}
              id="mobile"
              placeholder="Mobile No."
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            {/* <label htmlFor="password">Password</label> */}
            <input
              type="password"
              name="password"
              ref={passRef}
              id="password"
              placeholder="Password"
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            {/* <label htmlFor="retypepassword">Confirm Password</label> */}

            <input
              type="password"
              name="confirm_password"
              ref={confPassRef}
              id="retypepassword"
              placeholder="Confirm Password"
              className="form-control"
              required
            />
          </div>
          {/* <div className="row">
            <div className="col-md-6">
              
            </div>
            <div className="col-md-6">
              
              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <div className="gender">
                  <input
                    type="radio"
                    name="gender"
                    ref={genderRef}
                    id="male"
                    value="male"
                    required
                  />
                  <label htmlFor="male">Male</label>
                  <input
                    style={{ marginLeft: "20px" }}
                    type="radio"
                    name="gender"
                    ref={genderRef}
                    id="female"
                    value="female"
                    required
                  />
                  <label htmlFor="female">Female</label>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="position">Interests</label>
                <div style={{ width: "100%" }}>
                  <Select
                    isMulti
                    name="interests"
                    options={interests}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    placeholder="Your Interests"
                    styles={customStyles}
                    onChange={handleDropdownChange}
                    closeMenuOnSelect={false}
                    hideSelectedOptions={false}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              
            </div>
            <div className="col-md-6">
              
            </div>
          </div> */}
          <div className="form-group-btn">
            <button className="btn btn-warning">Register</button>
          </div>
        </form>
        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <h1>OTP Verification</h1>
              <div className="form-group">
                <label>Mobile OTP:</label>
                <div className="otp-input-container">
                  {Array.from({ length: 6 }, (_, i) => (
                    <input
                      key={i}
                      type="text"
                      maxLength="1"
                      className="otp-input"
                      ref={(el) => (mobileOtpRefs.current[i] = el)}
                      onInput={(e) => handleOtpInput(i, mobileOtpRefs, e)}
                      onKeyDown={(e) => handleOtpKeyDown(i, mobileOtpRefs, e)}
                    />
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label>Email OTP:</label>
                <div className="otp-input-container">
                  {Array.from({ length: 6 }, (_, i) => (
                    <input
                      key={i}
                      type="text"
                      maxLength="1"
                      className="otp-input"
                      ref={(el) => (emailOtpRefs.current[i] = el)}
                      onInput={(e) => handleOtpInput(i, emailOtpRefs, e)}
                      onKeyDown={(e) => handleOtpKeyDown(i, emailOtpRefs, e)}
                    />
                  ))}
                </div>
              </div>
              {/* hi */}
              <div className="button-container">
                <button className="btn btn-warning" onClick={handleVerifyClick}>
                  Verify OTP
                </button>
                <a href="#" className="resend-link">
                  Resend OTP
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RegisterForm;
