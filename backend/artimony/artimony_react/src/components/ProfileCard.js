import "../styles/ProfileCard.css";
import maleImg from "../assets/img/male.png";
import femaleImg from "../assets/img/female.png";
// import femaleImg from "../assets/img/female.png";
import locationImg from "../assets/img/location.png";
import lockImg from "../assets/img/lock.png";
import heightImg from "../assets/img/height.png";

import Carousel from "./Carousel";

import { useRef, useEffect, useState } from "react";

const ProfileCard = ({ profile, user, children }) => {
  const [showCarousel, setShowCarousel] = useState(false);

  const skinToneRef = useRef();
  // console.log(profile);

  useEffect(() => {
    skinToneRef.current.style.backgroundColor = profile.skin_tone;
  });

  var interests = "";
  for (var interest of profile.interests) {
    interests += interest.name + ", ";
  }

  interests = interests.slice(0, interests.length - 2);

  return (
    <>
      <div className="actor-card shadow mx-auto mx-md-0">
        {children}
        <div className="text-center p-2 left">
          <div id="dp" onClick={() => setShowCarousel(true)}>
            <img src={profile.profile_picture} />
          </div>
          <img
            className="gender mt-3"
            // src={maleImg}
            src={profile.gender == "male" ? maleImg : femaleImg}
            alt={profile.gender}
          />
          <div id="city">
            <span className="mr-1 location-icon">
              <i className="fa-solid fa-location-dot"></i>
            </span>
            <h3 className="fs-subtitle d-inline-block m-0">{profile.city}</h3>
          </div>
        </div>
        <div className="p-2 pt-4 middle">
          <h2 className="fs-title d-inline mr-2">{`${profile.first_name} ${profile.last_name}`}</h2>
          <h3 className="fs-subtitle d-inline">{`${profile.age} Years`}</h3>
          {/* <div className="mb-3"></div> */}
          <p className="m-0 mb-2 interests">{interests}</p>
          <p>
            {user.is_staff ? (
              profile.email
            ) : (
              <abbr id="blur" className="prevent-select tooltip">
                {profile.email}
                <span className="tooltiptext">
                  <button>
                    <img id="lock" src={lockImg} alt="" /> Premium
                  </button>
                </span>
              </abbr>
            )}
          </p>
          <p>
            {user.is_staff ? (
              profile.mobile_number
            ) : (
              <abbr id="blur" className="prevent-select tooltip">
                {profile.mobile_number}
                <span className="tooltiptext">
                  <button>
                    <img id="lock" src={lockImg} alt="" /> Premium
                  </button>
                </span>
              </abbr>
            )}
          </p>
          <div className="mb-3"></div>
          <div className="skin-tone d-inline-block" ref={skinToneRef}></div>
          {/* <span>
            <img class="map" src={heightImg} alt="Location" /> 180 cms
          </span> */}
        </div>
      </div>
      {showCarousel && profile.gallery.length > 0 && (
        <Carousel closable={true} onClose={() => setShowCarousel(false)}>
          {profile.gallery.map((file, index) => (
            <div key={index}>
              {file.is_video ? (
                <video
                  className="carousel-file video-no-controls video-hover-controls"
                  src={file.file}
                  onMouseEnter={(e) => (e.target.controls = true)}
                  onMouseLeave={(e) => (e.target.controls = false)}
                  // preload="none"
                  controlsList="nodownload"
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img className="carousel-file" src={file.file} />
              )}
            </div>
          ))}
        </Carousel>
      )}

      {/* <div class="actor-card">
        <div id="images">
          <div id="dp">
            <img src={profile.profile_picture} />
          </div>
          <p>
            <img
              class="gender"
              src={maleImg}
              //   src={profile.gender == "male" ? maleImg : femaleImg}
              alt={profile.gender}
            />
          </p>
          <p id="city">
            <img class="map" src={locationImg} alt="Location" /> {profile.city}
          </p>
        </div>
        <div class="actor-details">
          <div id="main">
            <h1>{`${profile.first_name} ${profile.last_name}`}</h1>
            <span>30 years old</span>
          </div>
          <p>
            <abbr id="blur" class="prevent-select tooltip">
              {profile.email}
              <span class="tooltiptext">
                <button onclick="upgrade()">
                  <img id="lock" src={lockImg} alt="" /> Premium
                </button>
              </span>
            </abbr>
          </p>
          <p>
            <abbr id="blur" class="prevent-select tooltip">
              {profile.mobile_number}
              <span class="tooltiptext">
                <button onclick="upgrade()">
                  <img id="lock" src={lockImg} alt="" /> Premium
                </button>
              </span>
            </abbr>
          </p>
          <br />
          <p>
            <img class="map" src={heightImg} alt="Location" /> 180 cms
          </p>
          <br />
          <div class="circle"></div>
        </div>
      </div> */}
      {/* <div class="expanded-img" id="expandedImg">
        <img src="dp.jpg" alt="" />
      </div> */}
    </>
  );
};

export default ProfileCard;
