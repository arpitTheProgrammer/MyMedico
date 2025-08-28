import React from 'react'
import loginLogo from "../../assets/medIcon.png";
import emailProfile from "../../assets/profileIcon.png";
import './DocSignup.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
const DocSignup = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
            docFullName: '',
            hospitalName: '',
            email: '',
            password: ''
  })
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const HandleChange = (e) => {
    const {name, value} = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }
    const HandleSubmit = async(e) => {
e.preventDefault();
      if(!formData.docFullName || !formData.email || !formData.hospitalName || !formData.password){
        setErrorMessage('Please fill all the Information')
        return;
      }
      try{
        const response = await fetch('http://localhost:8000/doc-signup', {
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify(formData)
        })
        if(response.ok){
          setSuccessMessage('Signup Successfully')
          setErrorMessage('')
        } else{
          setErrorMessage('Unable to Signup')
          setSuccessMessage('')
        }
      } catch(error){
        setErrorMessage('An error occured, try again letter', error)
      }
    }
    const HandleGoLogin = () => {
      navigate('/doctor-login')
    }
  return (
              <div className="container-doc-signup">
                <div className="logo-section">
                  <img src={loginLogo} className="login-logo" />
                </div>
                <form onSubmit={HandleSubmit} className="signup-form">
                  <h1>Doctor SignUp</h1>
                  <div className="signup-input-section">
                    <input type="text" name='docFullName' value={formData.docFullName} onChange={HandleChange} className='fullname' placeholder='FullName'/>
                    <input type="text" name='hospitalName' value={formData.hospitalName} onChange={HandleChange} className='hospital-name' placeholder='Hospital Name'/>
                    <input type="email" className='signup-email' value={formData.email} name='email' onChange={HandleChange} placeholder="Email" />
                    <img src={emailProfile} className="input-logo" />
                    <input type="password" name='password' value={formData.password} onChange={HandleChange} placeholder="Password" className="signup-password"/>
                    <input type="password" name='confirmPassword' placeholder="confirm-Password" className="confirm-password"/>
                    <button className="signup-btn" type="submit">Register</button>
                  </div>
                  <p onClick={HandleGoLogin} className="login-option">Have an account?</p>
                </form>
                <div className="result-message">
                  {errorMessage && <p className='error-message'>{errorMessage}</p>}
                  {successMessage && <p className='success-message'>{successMessage}</p>}
                  </div>
              </div>
  )
}

export default DocSignup