import "../styles/Register.css";
import FileUploader from "../components/FileUploader";
import SkinToneWheel from "../components/SkinToneWheel";
import client from "../api";

import avatar from "../assets/img/dp.jpg";

import { useRef, useState, useEffect } from "react";
import Select from "react-select";
import "react-profile/themes/default";
import { openEditor } from "react-profile";
import { useNavigate } from "react-router-dom";

const ProfileSettings = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState([]);
  //   const [showPopup, setShowPopup] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [profilePicURL, setprofilePicURL] = useState(avatar);
  const [galleryImages, setGalleryImages] = useState([]);
  const [skinTone, setSkinTone] = useState("");
  const [gender, setGender] = useState(null);
  const [profile, setProfile] = useState(null);

  const fnameRef = useRef();
  const lnameRef = useRef();
  const cityRef = useRef();
  const bioRef = useRef();
  const profilePicRef = useRef();

  const navigate = useNavigate();

  const skinTones = ["#FFDBAC", "#F1C27D", "#E0AC69", "#C68642", "#8D5524"];

  useEffect(() => {
    client.get("/current-profile/").then((response) => {
      setProfile((curProfile) => response.data);
      setGalleryImages((curGallery) =>
        response.data.gallery.map((file) => ({
          file: new File([], file.file),
          preview: file.file,
        }))
      );
      setGender((curGender) => response.data.gender);
      setSelectedOptions((curInterests) =>
        response.data.interests.map((int, ind) => ({
          value: int.name,
          label: int.name,
        }))
      );
      setSkinTone((curSkinTone) => response.data.skin_tone);
      setprofilePicURL((curProfilePic) => response.data.profile_picture);
    });
  }, []);

  if (!profile) {
    return <div>Loading...</div>;
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

  const handleGalleryClose = () => {
    setShowGallery(false);
  };

  const handleProfileUpdate = async () => {
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
      `${profile.email}_profile_picture.jpg`
    );

    // Append gallery images
    galleryImages.forEach((file, index) => {
      console.log(file);
      body.append("gallery", file.file);
    });

    try {
      const response = await client.patch(
        `/profile/update/${profile.email}/`,
        body,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        console.log("Profile updated successfully");
        navigate("/platform");
      } else {
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="register-container">
        {/* Multistep form */}
        <form id="msform" onSubmit={(e) => e.preventDefault()}>
          <fieldset className={currentStep === 1 ? "active" : undefined}>
            <h2 className="fs-title">Personal Information</h2>
            <h3 className="fs-subtitle">Edit your details</h3>
            <input
              type="text"
              name="fname"
              placeholder="First Name"
              defaultValue={profile.first_name}
              ref={fnameRef}
            />
            <input
              type="text"
              name="lname"
              placeholder="Last Name"
              defaultValue={profile.last_name}
              ref={lnameRef}
            />
            <SkinToneWheel
              selectedColor={skinTones.indexOf(skinTone)}
              setColor={setSkinTone}
            />
            <Select
              name="gender"
              options={genderOptions}
              className="react-select"
              styles={genderStyles}
              classNamePrefix="select"
              placeholder="Select Gender"
              value={genderOptions.find((option) => option.value === gender)}
              // styles={customStyles}
              onChange={(selected) => setGender(selected.value)}
              required
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
              value={selectedOptions}
              required
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              ref={cityRef}
              defaultValue={profile.city}
            />
            <input
              type="button"
              name="next"
              className="next action-button"
              value="Next"
              onClick={nextStep}
            />
          </fieldset>
          <fieldset className={currentStep === 2 ? "active" : undefined}>
            <h2 className="fs-title">Profile Settings</h2>
            <h3 className="fs-subtitle">Edit your profile</h3>
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
              value={profile.bio}
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
              onClick={handleProfileUpdate}
            />
          </fieldset>
        </form>
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
    </>
  );
};

export default ProfileSettings;
