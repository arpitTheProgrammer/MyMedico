import React, { Profiler, useEffect, useState } from 'react'
import './PatLoggedIn.css'
import logo from '../../assets/medIcon.png'
import profile from '../../assets/profileIcon.png'
import fileLogo from '../../assets/fileLogo.png'
import { useNavigate } from 'react-router-dom'

const PatLoggedIn = () => {
  const [patuser, setPetUser] = useState(null);
  const navigate = useNavigate()
  useEffect(()=>{
    const storedUser = localStorage.getItem("user");
    if(storedUser){
      setPetUser(JSON.parse(storedUser))
    }
  }, [])
  if(!patuser){
    return <p>Please Login First</p>
  }
  return (
    <>
    <div className="pat-loggedin-container">
      <nav className="pat-navigation">
        <div className="pat-left-section">
          <img src={logo} alt="" />
          <h1>MyMedico</h1>
        </div>
        <div className="pat-center-section">
          <p className="navbar-btn">Home</p>
          <p className="navbar-btn">Search Doctor</p>
          <p className="navbar-btn">My Profile</p>
          <p className="navbar-btn">Appointment</p>
        </div>
        <div className="pat-right-section">
          <button>Logout</button>
        </div>
      </nav>
      <div className="pat-search-bar">
          <h1>Search Doctor</h1>
          <div className="doctor-search-option">
            <input type="text" placeholder='Search Doctor...' id="" />
            <button>Search</button>
          </div>
      </div>
      <div className="cards">
          <div className="card">
            <div className='card-div'>My Profile</div>
            <div className="profile-section">
              <img src={profile} alt="" />
              <div className="pat-detail">
                <h3>Arpit Srivastava</h3>
                <p className='pat-detail-problem'>Varanasi</p>
                <p className='pat-detail-gender'>Gender, Male</p>
              </div>
            </div>
            <p className='pat-email'>arpitsrivastava8863.9h@email.com</p>
            <button className='pat-edit-profile-btn'>Edit Profile</button>
          </div>
          <div className="card">
            <div className='card-div'>Appointments</div>
            <img className='fileLogo' src={fileLogo} alt="" />
            <h4>No Appointments Scheduled</h4>
          </div>
          <div className="card">
            <div className='card-div'>Report Card</div>
            <div className="card-report-section">
                <img src={fileLogo} alt="" />
                <button>See Your Reports</button>
                <button>Save Report Card</button>
            </div>
          </div>
      </div>
    </div>
    </>
  )
}

export default PatLoggedIn