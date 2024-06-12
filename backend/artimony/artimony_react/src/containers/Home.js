import { useState, useEffect } from "react";
import client from "../api";

import ProfileCard from "../components/ProfileCard";
import CheckBox from "../components/CheckBox";
import ProfileFilterSideBar from "../components/ProfileFilterSideBar";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import "../styles/Home.css";

const Home = () => {
  const [response, setResponse] = useState({
    profiles: null,
    next: null,
    prev: null,
    count: null,
  });
  const [appliedFilters, setAppliedFilters] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedProfiles, setSelectedProfiles] = useState([]);

  useEffect(() => {
    client.post("/auth/user/").then((r) => {
      var url = "/profiles/";
      if (r.data.user.is_staff) {
        url = "/admin-profiles/";
      }
      client.get(url).then((res) => {
        setResponse((prevResponse) => {
          setSelectedProfiles(
            res.data.results
              .filter((profile) => profile.admin_verified)
              .map((profile) => profile.email)
          );
          return {
            count: res.data.count,
            next: res.data.next,
            prev: res.data.previous,
            profiles: res.data.results,
          };
        });
      });
      setUser((prevUser) => r.data.user);
    });
  }, []);

  const handleApplyFilters = (selectedFilters) => {
    setAppliedFilters(selectedFilters);
  };

  const getResponse = async () => {
    const res = await client.get("/profiles/");
    // console.log(res.data);
    return res.data;
  };

  const handlePageChange = async (event, page) => {
    var url = "/profiles/?page=";
    if (user.is_staff) {
      url = "/admin-profiles/?page=";
    }
    const res = await client.get(url + page);
    setResponse((prevResponse) => {
      return {
        count: res.data.count,
        next: res.data.next,
        prev: res.data.previous,
        profiles: res.data.results,
      };
    });
  };

  const handleFilterSearch = async () => {
    var url = "/profiles/";
    if (user.is_staff) {
      url = "/admin-profiles/";
    }
    const res = await client.get(url, {
      params: {
        gender__in: appliedFilters
          .filter((filter) => ["male", "female", "others"].includes(filter))
          .join(","),
        interests__name__in: appliedFilters
          .filter((filter) => !["male", "female"].includes(filter))
          .join(","),
      },
    });
    setResponse((prevResponse) => {
      return {
        count: res.data.count,
        next: res.data.next,
        prev: res.data.previous,
        profiles: res.data.results,
      };
    });
  };

  const handleCheckBoxChange = (isChecked, index) => {
    if (user.is_staff) {
      if (isChecked) {
        setSelectedProfiles((prevSelectedProfiles) => {
          return [...prevSelectedProfiles, response.profiles[index].email];
        });
      } else {
        setSelectedProfiles((prevSelectedProfiles) => {
          return prevSelectedProfiles.filter(
            (email) => email !== response.profiles[index].email
          );
        });
      }
    }
  };

  const handleVerifyProfiles = () => {
    const body = new FormData();
    body.append("emails", "iamsarunn03@gmail.com");
    selectedProfiles.forEach((email) => {
      body.append("emails", email);
    });
    client
      .post("/auth/verify-users/", body)
      .then((res) => {
        if (res.status === 200) {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  if (response.profiles == null) return <div>Loading...</div>;

  return (
    <>
      <ProfileFilterSideBar
        onSearch={handleFilterSearch}
        tags={appliedFilters}
        setTags={setAppliedFilters}
      />
      <div className="profile-card-container">
        <div
          className="d-flex p-5 w-md-75 mx-auto flex-wrap justify-content-center"
          style={{
            gap: "2rem",
          }}
        >
          {response.profiles.map((profile, index) => {
            return (
              <ProfileCard
                key={index}
                user={user}
                profile={profile}
                revealContactInfo={user.revealed_contacts
                  .map((contact) => contact.email)
                  .includes(profile.email)}
              >
                {user.is_staff && (
                  <CheckBox
                    checked={profile.admin_verified}
                    onChange={(value) => handleCheckBoxChange(value, index)}
                  />
                )}
              </ProfileCard>
            );
          })}
        </div>
      </div>
      {response.count > 30 && (
        <Stack
          spacing={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 2, // Margin top to add some spacing
          }}
        >
          <Pagination
            count={response.count / 30}
            defaultPage={1}
            boundaryCount={2}
            onChange={handlePageChange}
            sx={{
              "& .MuiPaginationItem-root": {
                color: "#ffc941", // Color for other page numbers
                "&:hover": {
                  backgroundColor: "#ffdd87", // Background color on hover
                  color: "#ffffff", // Text color on hover
                },
              },
              "& .Mui-selected": {
                backgroundColor: "#fcb603 !important", // Color for selected page
                color: "#ffffff", // Text color for selected page
              },
              "& .MuiPaginationItem-icon": {
                color: "#ffc941", // Color for next/prev icons
                "&:hover": {
                  backgroundColor: "#ffdd87", // Background color on hover
                  color: "#ffffff", // Text color on hover
                },
              },
            }}
          />
        </Stack>
      )}
      {user.is_staff && (
        <button
          className="action-button verify-profiles-button"
          onClick={() => handleVerifyProfiles()}
        >
          Verify Profiles
        </button>
      )}
    </>
  );
};

export default Home;
