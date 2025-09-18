import React from 'react'
import './SearchDoctors.css'
import logo from '../../assets/medIcon.png'
import { useNavigate } from 'react-router-dom'

const SearchDoctor = () => {
  const navigate = useNavigate()
  return (
    <>
        <div className="container">
          <div className="navbar">
                      <nav className="pat-navigation">
                        <div className="pat-left-section">
                          <img src={logo} alt="" />
                          <h1>MyMedico</h1>
                        </div>
                        <div className="pat-center-section">
                          <p className="navbar-btn" onClick={()=>navigate('/pat-home')}>Home</p>
                          <p className="navbar-btn">Search Doctor</p>
                          <p className="navbar-btn">My Profile</p>
                          <p className="navbar-btn">Appointment</p>
                        </div>
                        <div className="pat-right-section">
                          <button>Logout</button>
                        </div>
                      </nav>
          </div>
            <div className="search-input-bar">
                <input type="text" className='search-doctor' placeholder='Search Doctor...'/>
                <button>Search</button>
            </div>
        </div>
    </>
  )
}

export default SearchDoctor