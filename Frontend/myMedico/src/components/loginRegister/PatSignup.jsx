import React, { useState } from 'react'
import loginLogo from "../../assets/medIcon.png";
import { useNavigate } from 'react-router-dom';
import './PatSignup.css'
const PatSignup = () => {
    const navigate = useNavigate();
        const [successMessage, setSuccessMessage] = useState(null);
        const [errorMessage, setErrorMessage] = useState(null);
    const [formData, setFormData] = useState({
        patName: '',
        phoneNumber: ''
    })
    const HandleChange = (e) => {
      const {name, value} = e.target;
      setFormData({
        ...formData,
        [name]: value
    })
    }
    const HandleGoLogin = () => {
        navigate('/pat-login')
    }

    const HandleSubmit = async(e) =>{
        e.preventDefault();
        setErrorMessage(null);
        setSuccessMessage(null);
        const payload = {
          fullName: formData.patName,
          phoneNumber: Number(formData.phoneNumber)
        }
        if(!payload.fullName || !payload.Number){
          setErrorMessage('Please fill All the Block Correctly')
        }
        try {
      const response = await fetch('http://localhost:8000/pat-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
          if(response.ok){
            setSuccessMessage('REGISTERED SUCCESSFULLY')
            setErrorMessage(null);
          } else if(!payload.fullName || !payload.Number){
          setErrorMessage('Please fill All the Block Correctly')
        } 
          else{
          setErrorMessage('Unable to Signup')
          setSuccessMessage(null)
        }
      } catch(error){
        setErrorMessage('An error occured, try again letter', error.message)
      }
        }
  return (
      <div className="patient-login">
            <div className="logo-section">
              <img src={loginLogo} className="login-logo" />
            </div>
            <form onSubmit={HandleSubmit}>
              <h1>Patient Signup</h1>
              <div className="patient-form">
                <input
                    type='text'
                    placeholder='Enter Your Name'
                    name='patName'
                    id='pat-name'
                    onChange={HandleChange}
                    value={formData.patName}
                ></input>
                <input
                  type="text"
                  placeholder="Enter Your Phone Number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={HandleChange}
                />
                <button className="HandlePatLogin" type='submit'>Signup</button>
              </div>
                <p className="create-acc" onClick={HandleGoLogin}>Have an account?</p>
            </form>
              <div className="message-status">
                  {errorMessage && <p className='pat-error-message'>{errorMessage}</p>}
                  {successMessage && <p className='pat-success-message'>{successMessage}</p>}
              </div>
          </div>
  )
}

export default PatSignup