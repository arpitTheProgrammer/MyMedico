import React, { useEffect } from "react";
import loginLogo from "../../assets/medIcon.png";
import emailProfile from "../../assets/profileIcon.png";
import './DocLogin.css'
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

const DocLogin = () => {
  const navigate = useNavigate()
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [docuser, setDocUser] = useState(null)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

  useEffect(() => {
    const storedUser = localStorage.getItem("docuser"); // using same key everywhere
    if (storedUser) {
      setDocUser(JSON.parse(storedUser));
      navigate("/doc-home", { replace: true }); // auto-redirect if logged in
    }
  }, [navigate]);
  const HandleGoSignUp = () => {
    navigate('/doctor-signup')
  }
  const HandleChange = (e) => {
    const {name, value} = e.target
    setFormData({
      ...formData,
      [name]: value
  })
  }
    const HandleSubmit = async(e) => {
        e.preventDefault();
        setErrorMessage(null)
        setSuccessMessage(null)
        if(!formData.email || !formData.password){
            setErrorMessage('Please Enter All the boxes correctly');
            return;
        }
        try{
          const response = await fetch('http://localhost:8000/doc-login', {
            method: 'POST',
            headers: {
              'Content-Type' : 'application/json'
            },
            body: JSON.stringify(formData)
          })
          const data = await response.json()
          if(response.ok){
            localStorage.setItem("token", data.token)
            localStorage.setItem("docuser", JSON.stringify(data.user))
            setSuccessMessage('Login SUCCESSFULLY')
            navigate('/doc-home')
          } else{
              setErrorMessage('Unable To Login')
          }
        } catch(err){
            setErrorMessage('Error Occured While Login', err);
        }
    };


  return (
    <>
      <div className="container-doc-login">
        <div className="logo-section">
          <img src={loginLogo} className="login-logo" />
        </div>
        <form onSubmit={HandleSubmit} className="login-form">
          <h1>Doctor Login</h1>
          <div className="login-input-section">
            <img src={emailProfile} className="input-logo" />
            <input type="text" name="email" onChange={HandleChange} value={formData.email} src={emailProfile} placeholder="Email" />
            <input type="password" name="password" onChange={HandleChange} value={formData.password} placeholder="Password" className="password"/>
            <button className="login-btn" type="submit">Login</button>
          </div>
          <p onClick={HandleGoSignUp} className="register-option">Create an account</p>
          <p className="forget-password">Forget Password</p>
        </form>
        <div className="result-message">
          {errorMessage && <p className=' login-error-message'>{errorMessage}</p>}
          {successMessage && <p className='login-success-message'>{successMessage}</p>}
          </div>
      </div>
    </>
  );
};

export default DocLogin;
