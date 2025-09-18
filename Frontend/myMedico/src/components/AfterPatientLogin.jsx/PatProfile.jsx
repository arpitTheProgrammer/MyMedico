import React, { useEffect, useState } from "react";
import logo from "../../assets/medIcon.png";
import "./PatProfile.css";
import { useNavigate } from "react-router-dom";
const PatProfile = () => {
    const navigate = useNavigate();
  const [patuser, setPatUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  
  useEffect(()=> {
    const storedUser = localStorage.getItem("user")
    if(storedUser){
        setPatUser(JSON.parse(storedUser))
    }
  }, [])

  const HandleLogout = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    try{
      const response = await fetch("http://localhost:8000/pat-logout", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({phoneNumber: patuser.phoneNumber})
      })
      if(response.ok){
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        setSuccessMessage("Logout Successfull")
        setErrorMessage(null);
        navigate('/')
      }
    } catch(err){
        setErrorMessage("UNABLE TO LOGOUT", err)
    }
  };
  return (
    <>
      <div className="patEditNavbar">
        <div className="left-section">
          <img src={logo} alt="" />
          <h3>MyMedico</h3>
        </div>
        <div className="navbar-center">
          <ul>
            <li>Home</li>
            <li>Appointment</li>
            <li>Search Doctor</li>
            <button onClick={HandleLogout} className="edit-profile-logout-btn">
              Logout
            </button>
          </ul>
        </div>
      </div>
      <div className="container-details">
        <h1>Edit Profile</h1>
        <div className="input-detail-section">
          <div className="detail-input">
            <label htmlFor="">Name</label>
            <input type="text" placeholder="Enter Your Name" />
            <label htmlFor="">Location</label>
            <input type="text" placeholder="Enter Your Location" />
            <label htmlFor="">Gender</label>
            <input type="text" placeholder="Enter Your Gender" />
            <label htmlFor="">Email</label>
            <input type="email" placeholder="Enter Your Email" />
            <button>Save Changes</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PatProfile;
 