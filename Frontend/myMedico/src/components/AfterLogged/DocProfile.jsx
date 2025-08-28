import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DocProfile.css";
import profile from "../../assets/profile.png";

const DocProfile = () => {
  const [docuser, setDocUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const storedUser = localStorage.getItem("docuser");
    if (storedUser) {
      setDocUser(JSON.parse(storedUser));
    }
  }, []);
  if (!docuser) {
    return <p>Please Logged in first</p>;
  }
  const HandleLogout = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    try {
      const response = await fetch("http://localhost:8000/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: docuser.email }),
      });
      if (response.ok) {
        localStorage.removeItem("docuser");
        localStorage.removeItem("token");
        setSuccessMessage("LOGOUT SUCCESSFULL");
        setErrorMessage(null);
        navigate("/");
      }
    } catch (err) {
      setErrorMessage("UNABLE TO LOGOUT", err);
    }
  };

  const HandleEditProfile = () =>{
    navigate('/edit-profile')
  }
  return (
    <>
      <div className="container-profile">
        <div className="profile-image">
          <img src={profile} alt="" />
        </div>
        <div className="container-center">
          <h1 className="doc-name">{docuser?.docFullName}</h1>
          <p>Specialization:- {docuser?.specialization}</p>
          <p>Phone:- +91-{docuser?.docPhoneNumber}</p>
          <p>Gmail:- {docuser?.email}</p>
          <p>Location:- {docuser?.docLocation}</p>
        </div>
        <div className="btn-section">
          <button onClick={HandleLogout}>Logout</button>
          <button onClick={HandleEditProfile}>Edit Profile</button>
        </div>
      </div>
      <div className="biography">
        <h2>Biography</h2>
        <p>
          {docuser?.docBiography}
        </p>
      </div>
      <div className="status-message">
        {errorMessage && (
          <p className="profile-error-message">{errorMessage}</p>
        )}
        {successMessage && (
          <p className="profile-success-message">{successMessage}</p>
        )}
      </div>
    </>
  );
};

export default DocProfile;
