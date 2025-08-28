import React from 'react'
import './DocLoggedIn.css'
import profile from '../../assets/profile.png'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'

const DocLoggedIn = () => {
    const [docuser, setDocUser] = useState(null)
    const navigate = useNavigate();
    const HandleProfile = () => {
        navigate('/doc-profile')
    }
    useEffect(()=>{
        const storedUser = localStorage.getItem("docuser")
        if(storedUser){
            setDocUser(JSON.parse(storedUser))
            // navigate('/doc-profile')
        } 
    }, [navigate])

    if(!docuser){
        return <p>Please Login First</p>
    }
  return (
    <>
    <div className="doc-loggedin-container">
        <nav className="doc-navbar">
            <div className="left-section">
                <h1 className='head'>MyMedico</h1>
            </div>
            <div className="center-section">
                <button>View Patient List</button>
            </div>
            <div className="input-search">
                <input type="text" placeholder='Search by name'/>
                <button className='search-pat-btn'>Search</button>
            </div>
        </nav>
            <div className="right-section">
                <img onClick={HandleProfile} src={profile} alt="" />
                <p>{docuser?.docFullName}</p>
            </div>
            <h1 className='head-booked'>Booked Appointments</h1>
            <div className="patient-list">
                <div className="lists">
                    <div className='pat-name'>
                    <p>Arpit Srivastava</p>
                    </div>
                    <div className="accept-reject-option">
                    <button className='btn-done'>Done</button>
                    <button className='btn-reject'>X</button>
                    </div>
                </div>
                <div className="lists">
                    <div className='pat-name'>
                    <p>Arpit Srivastava</p>
                    </div>
                    <div className="accept-reject-option">
                    <button className='btn-done'>Done</button>
                    <button className='btn-reject'>X</button>
                    </div>
                </div>
                <div className="lists">
                    <div className='pat-name'>
                    <p>Arpit Srivastava</p>
                    </div>
                    <div className="accept-reject-option">
                    <button className='btn-done'>Done</button>
                    <button className='btn-reject'>X</button>
                    </div>
                </div>
                <div className="lists">
                    <div className='pat-name'>
                    <p>Arpit Srivastava</p>
                    </div>
                    <div className="accept-reject-option">
                    <button className='btn-done'>Done</button>
                    <button className='btn-reject'>X</button>
                    </div>
                </div>
                <div className="lists">
                    <div className='pat-name'>
                    <p>Arpit Srivastava</p>
                    </div>
                    <div className="accept-reject-option">
                    <button className='btn-done'>Done</button>
                    <button className='btn-reject'>X</button>
                    </div>
                </div>
                <div className="lists">
                    <div className='pat-name'>
                    <p>Arpit Srivastava</p>
                    </div>
                    <div className="accept-reject-option">
                    <button className='btn-done'>Done</button>
                    <button className='btn-reject'>X</button>
                    </div>
                </div>
                <div className="lists">
                    <div className='pat-name'>
                    <p>Arpit Srivastava</p>
                    </div>
                    <div className="accept-reject-option">
                    <button className='btn-done'>Done</button>
                    <button className='btn-reject'>X</button>
                    </div>
                </div>
            </div>
    </div>
    </>
  )
}

export default DocLoggedIn