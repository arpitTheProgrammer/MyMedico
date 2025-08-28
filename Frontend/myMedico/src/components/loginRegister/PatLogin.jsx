import React from "react";
import "./PatLogin.css";
import loginLogo from "../../assets/medIcon.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const PatLogin = () => {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    phoneNumber: "",
  });

useEffect(() => {
  const storedPatUser = localStorage.getItem("user");
  if (storedPatUser) {
    navigate("/pat-home", { replace: true });
  }
}, [navigate]);
  if (user) {
     navigate("/pat-home");
  }
  const HandleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const HandleGoSignup = () => {
    navigate("/pat-signup");
  };
  const HandleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    const payload = {
      phoneNumber: Number(formData.phoneNumber),
    };
    try {
      const response = await fetch("http://localhost:8000/pat-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage("LOGIN SUCCESSFULLY");
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/pat-home");
      } else if (!payload.Number) {
        setErrorMessage("Please fill All the Block Correctly");
      } else {
        setErrorMessage("Unable to Signup");
        setSuccessMessage(null);
      }
    } catch (error) {
      setErrorMessage("An error occured, try again letter", error.message);
    }
  };
  return (
    <>
      <div className="patient-login">
        <div className="logo-section">
          <img src={loginLogo} className="login-logo" />
        </div>
        <form onSubmit={HandleSubmit}>
          <h1>Patient Login</h1>
          <div className="patient-form">
            <input
              type="text"
              placeholder="Enter Your Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={HandleChange}
              id=""
            />
            <button className="HandlePatLogin">Login</button>
          </div>
          <p className="create-acc" onClick={HandleGoSignup}>
            Create an account
          </p>
        </form>
        <div className="message-status">
          {errorMessage && (
            <p className="pat-login-error-message">{errorMessage}</p>
          )}
          {successMessage && (
            <p className="pat-login-success-message">{successMessage}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default PatLogin;
