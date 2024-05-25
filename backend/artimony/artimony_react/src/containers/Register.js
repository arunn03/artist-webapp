import "../styles/Register.css";
import FileUploader from "../components/FileUploader";
import SkinToneWheel from "../components/SkinToneWheel";
import Popup from "../components/Popup";
import client, { refreshToken } from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

import avatar from "../assets/img/dp.jpg";

import { useRef, useState, useEffect } from "react";
import Select from "react-select";
import "react-profile/themes/default";
import { openEditor } from "react-profile";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Register = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [profilePicURL, setprofilePicURL] = useState(avatar);
  const [galleryImages, setGalleryImages] = useState([]);
  const [skinTone, setSkinTone] = useState("#F1C27D");
  const [gender, setGender] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const mobileOtpRefs = useRef([]);
  const emailOtpRefs = useRef([]);
  const emailRef = useRef();
  const mobileRef = useRef();
  const passRef = useRef();
  const confirmPassRef = useRef();
  const fnameRef = useRef();
  const lnameRef = useRef();
  const cityRef = useRef();
  const bioRef = useRef();
  const profilePicRef = useRef();
  const ageRef = useRef();

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

  const interests = [
    { value: "Director", label: "Director" },
    { value: "Actor", label: "Actor" },
    { value: "Producer", label: "Producer" },
    { value: "DOP", label: "DOP" },
  ];

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  const customStyles = {
    valueContainer: (provided) => ({
      ...provided,
      maxHeight: "41px", // Set a maximum height
      overflow: "auto",
      "::-webkit-scrollbar": {
        display: "none", // Hide scrollbar for Chrome, Safari and Opera
      },
      "-ms-overflow-style": "none", // Hide scrollbar for IE and Edge
      "scrollbar-width": "none",
      textAlign: "left",
      fontSize: "13px",
      paddingLeft: "15px",
      paddingRight: "15px",
      //   padding: "0px 15px",
    }),
    control: (styles) => ({ ...styles, width: "100%" }),
    menu: (styles) => ({ ...styles, textAlign: "left" }),
  };

  const genderStyles = {
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

  const handleGalleryClose = () => {
    setShowGallery(false);
  };

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const previousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const onProfilePictureChange = async (e) => {
    const image = await openEditor({ src: e.target.files[0], square: true });
    if (image?.editedImage?.getDataURL)
      setprofilePicURL(image?.editedImage?.getDataURL);
    e.target.value = "";
  };

  const handleProfilePictureClick = () => {
    profilePicRef.current.click();
  };

  const handleGalleryClick = () => {
    setShowGallery(true);
  };

  const handleDropdownChange = (selected) => {
    setSelectedOptions(selected || []);
  };

  const handleVerifyClick = async () => {
    var mobileOTP = "",
      emailOTP = "";
    for (var i = 0; i < 6; i++) {
      mobileOTP += mobileOtpRefs.current[i].value;
      emailOTP += emailOtpRefs.current[i].value;
    }
    const body = {
      //   fname: fnameRef.current.value,
      //   lname: lnameRef.current.value,
      email: emailRef.current.value,
      //   city: cityRef.current.value,
      //   interests: selectedOptions.map((value, index) => {
      //     return { name: value.value };
      //   }),
      //   gender: genderRef.current.value,
      mobile_number: mobileRef.current.value,
      password: passRef.current.value,
      confirm_password: confirmPassRef.current.value,
      mobile_otp: mobileOTP,
      email_otp: emailOTP,
    };
    // nextStep();

    try {
      const response = await client.post("/auth/register/", body);
      if (response.status === 201) {
        console.log("User registered successfully");
        try {
          const loginResponse = await client.post("/auth/token/", {
            email: body.email,
            password: body.password,
          });
          console.log(loginResponse.status);
          if (loginResponse.status === 200) {
            console.log("User logged in successfully");
            localStorage.setItem(ACCESS_TOKEN, loginResponse.data.access);
            localStorage.setItem(REFRESH_TOKEN, loginResponse.data.refresh);
            nextStep();
          } else {
            console.log(response.data);
          }
        } catch (error) {
          console.error("Error:", error);
        }
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

  // const refreshToken = async () => {
  //   const refreshToken = localStorage.getItem(REFRESH_TOKEN);
  //   try {
  //     const res = await client.post("/auth/refresh", { refresh: refreshToken });
  //     if (res.status === 200) {
  //       localStorage.setItem(ACCESS_TOKEN, res.data.access);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const handleProfileCreate = async () => {
  //   const profileResponse = await fetch(profilePicURL);
  //   const profileBlob = await profileResponse.blob();
  //   const body = new FormData();

  //   const json = {
  //     first_name: fnameRef.current.value,
  //     last_name: lnameRef.current.value,
  //     bio: bioRef.current.value,
  //     skin_tone: skinTone,
  //     // profile_picture: profileBlob,
  //     gender: gender,
  //     city: cityRef.current.value,
  //     // interests: selectedOptions.map((value, index) => {
  //     //   return { name: value.value };
  //     // }),
  //   };
  //   for (const data of Object.entries(json)) {
  //     body.append(data[0], data[1]);
  //   }
  //   body.append(
  //     "interests",
  //     selectedOptions.map((value, index) => {
  //       return { name: value.value };
  //     })
  //   );
  //   body.append(
  //     "profile_picture",
  //     profileBlob,
  //     `${emailRef.current.value}_profile_picture.jpg`
  //   );
  //   body.append("gallery", galleryImages);
  //   try {
  //     // var token = localStorage.getItem(ACCESS_TOKEN);
  //     // const decoded = jwtDecode(token);
  //     // const expirationTime = decoded.exp;
  //     // const now = Date.now() / 1000;

  //     // if (now > expirationTime) {
  //     //   await refreshToken();
  //     //   token = localStorage.getItem(ACCESS_TOKEN);
  //     // }
  //     const response = await client.post("/profile/create/", body);
  //     if (response.status === 201) {
  //       console.log("Profile created successfully");
  //     } else {
  //       console.log(response.data);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  const handleProfileCreate = async () => {
    const profileResponse = await fetch(profilePicURL);
    const profileBlob = await profileResponse.blob();
    const body = new FormData();

    const json = {
      first_name: fnameRef.current.value,
      last_name: lnameRef.current.value,
      bio: bioRef.current.value,
      skin_tone: skinTone,
      gender: gender,
      city: cityRef.current.value,
      age: ageRef.current.value,
    };

    // Appending text fields to FormData
    for (const data of Object.entries(json)) {
      body.append(data[0], data[1]);
    }

    // Append interests in the correct format
    selectedOptions.forEach((option) => {
      body.append("interests", option.value);
    });

    // Append profile picture
    body.append(
      "profile_picture",
      profileBlob,
      `${emailRef.current.value}_profile_picture.jpg`
    );

    // Append gallery images
    galleryImages.forEach((file, index) => {
      body.append("gallery", file.file);
    });

    try {
      const response = await client.post("/profile/create/", body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 201) {
        console.log("Profile created successfully");
        navigate("/");
      } else {
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleRegisterClick = async () => {
    try {
      const mobileResponse = await client.post("/auth/mobile-otp/", {
        mobile_number: mobileRef.current.value,
      });
      const emailResponse = await client.post("/auth/email-otp/", {
        email: emailRef.current.value,
      });
      if (mobileResponse.status === 200 && emailResponse.status === 200) {
        console.log("OTP Generation successful");
        setShowPopup(true);
        document.body.classList.add("blur-background");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="register-container">
      {/* Multistep form */}
      <form id="msform" onSubmit={(e) => e.preventDefault()}>
        {/* Progressbar */}
        {/* <ul id="progressbar">
          <li className={currentStep >= 1 ? "active" : undefined}>
            Account Setup
          </li>
          <li className={currentStep >= 2 ? "active" : undefined}>
            Social Profiles
          </li>
          <li className={currentStep === 3 ? "active" : undefined}>
            Personal Details
          </li>
        </ul> */}
        {/* Fieldsets */}
        <fieldset className={currentStep === 1 ? "active" : undefined}>
          <h2 className="fs-title">Account Setup</h2>
          <h3 className="fs-subtitle">Setup your credentials</h3>
          <input type="text" name="email" placeholder="Email" ref={emailRef} />
          <input
            id="phone"
            type="tel"
            name="mobile_number"
            placeholder="Phone"
            ref={mobileRef}
          />
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
            ref={confirmPassRef}
          />
          <input
            type="button"
            name="next"
            className="next action-button"
            value="Next"
            onClick={handleRegisterClick}
          />
          <h3 className="fs-subtitle m-0">
            Already have an account?
            <button className="resend-link" onClick={() => navigate("/login")}>
              Login
            </button>
          </h3>
        </fieldset>
        <fieldset className={currentStep === 2 ? "active" : undefined}>
          <h2 className="fs-title">Personal Information</h2>
          <h3 className="fs-subtitle">Please share your details</h3>
          <input
            type="text"
            name="fname"
            placeholder="First Name"
            ref={fnameRef}
          />
          <input
            type="text"
            name="lname"
            placeholder="Last Name"
            ref={lnameRef}
          />
          <SkinToneWheel setColor={setSkinTone} />
          <input
            type="number"
            min="10"
            name="age"
            placeholder="Age"
            ref={ageRef}
          />
          <Select
            name="gender"
            options={genderOptions}
            className="react-select"
            styles={genderStyles}
            classNamePrefix="select"
            placeholder="Select Gender"
            // styles={customStyles}
            onChange={(selected) => setGender(selected.value)}
            required
            on
          />
          <Select
            isMulti
            name="interests"
            options={interests}
            className="react-select"
            classNamePrefix="select"
            placeholder="Your Interests"
            styles={customStyles}
            onChange={handleDropdownChange}
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            required
          />
          <input type="text" name="city" placeholder="City" ref={cityRef} />
          <input
            type="button"
            name="next"
            className="next action-button"
            value="Next"
            onClick={nextStep}
          />
        </fieldset>
        <fieldset className={currentStep === 3 ? "active" : undefined}>
          <h2 className="fs-title">Profile Settings</h2>
          <h3 className="fs-subtitle">Create your profile</h3>
          <input
            type="file"
            ref={profilePicRef}
            accept="image/jpeg;image/png"
            onChange={onProfilePictureChange}
            hidden
          />
          <div
            className="profile-pic-container"
            id="profilePicContainer"
            onClick={handleProfilePictureClick}
          >
            <img className="profile-pic" src={profilePicURL} />
            <div className="options-overlay">
              <div>
                <i className="fa-solid fa-camera"></i>
                <h3 className="fs-subtitle text-uppercase text-white mb-0">
                  Change
                </h3>
              </div>
            </div>
          </div>
          <textarea
            placeholder="Your Bio"
            maxLength={1000}
            ref={bioRef}
            rows={4}
            style={{ resize: "none" }}
          ></textarea>
          <input
            type="button"
            name="gallery"
            className="gallery action-button"
            value="Gallery"
            onClick={handleGalleryClick}
          />
          <input
            type="button"
            name="previous"
            className="previous action-button"
            value="Previous"
            onClick={previousStep}
          />
          <input
            type="button"
            name="submit"
            className="submit action-button"
            value="Submit"
            onClick={handleProfileCreate}
          />
        </fieldset>
      </form>
      {showPopup && (
        <Popup>
          <h2 className="fs-title mb-4">OTP Verification</h2>
          <div className="otp-container">
            <div className="form-group text-center mb-3">
              <h3 className="fs-subtitle mb-1">Mobile OTP</h3>
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
              <h3 className="fs-subtitle mb-1">Email OTP</h3>
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
            <div className="button-container d-flex justify-content-between">
              <button className="action-button" onClick={handleVerifyClick}>
                Verify OTP
              </button>
              <button className="resend-link" onClick={handleRegisterClick}>
                Resend OTP
              </button>
            </div>
          </div>
        </Popup>
      )}
      {showGallery && (
        <div className="popup gallery-popup">
          <button
            className="text-white close-button"
            onClick={handleGalleryClose}
          >
            <i class="fa-solid fa-xmark"></i>
          </button>
          <div className="popup-content">
            <h2 className="fs-title mb-4">Gallery</h2>
            <FileUploader files={galleryImages} setFiles={setGalleryImages} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
