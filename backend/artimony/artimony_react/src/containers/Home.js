import { useState, useEffect } from "react";
import client from "../api";

import ProfileCard from "../components/ProfileCard";
import ProfileFilterSideBar from "../components/ProfileFilterSideBar";

import "../styles/Home.css";

const Home = () => {
  const filterOptions = [
    "Admin Verified",
    "New Users",
    "Top Rated",
    "Active Recently",
  ];
  const [profiles, setProfiles] = useState(null);
  const [appliedFilters, setAppliedFilters] = useState([]);

  useEffect(() => {
    getProfiles().then((data) => setProfiles(data));
  }, []);

  const handleApplyFilters = (selectedFilters) => {
    setAppliedFilters(selectedFilters);
  };

  const getProfiles = async () => {
    const res = await client.get("/profiles/");
    // console.log(res.data);
    return res.data;
  };

  if (profiles == null) return <div>Loading...</div>;

  return (
    <>
      <ProfileFilterSideBar
      // filters={filterOptions}
      // onApplyFilters={handleApplyFilters}
      />
      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{
          display: "none",
          position: "relative",
          zIndex: 1,
        }}
        version="1.1"
      >
        <defs>
          <filter id="blur-filter" x="0" y="0">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
          </filter>
        </defs>
      </svg> */}
      <div className="profile-card-container">
        <div
          className="d-flex p-5 w-md-75 mx-auto flex-wrap"
          style={{
            gap: "1.2rem",
          }}
        >
          {profiles.map((profile, index) => {
            return <ProfileCard key={index} profile={profile}></ProfileCard>;
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
