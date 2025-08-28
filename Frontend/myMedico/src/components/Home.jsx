import React, {useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { useEffect } from "react";
const Home = () => {
  const navigate = useNavigate()
  const [docuser, setDocUser] = useState(null);
  const [patuser, setPetUser] = useState(null);
  const HandleLogin = () => {
    navigate("/doctor-login")
  }
  const HandlePatLogin = () => {
    navigate("/pat-login")
  }
  const HandlePatRegister = () =>{
    navigate('/pat-signup')
  }

  useEffect(()=>{
    const storedUser = localStorage.getItem("docuser")
    if(storedUser){
      setDocUser(JSON.parse(storedUser))
      console.log("user", storedUser);
    }
  }, [navigate])

  if(docuser){
    navigate('/doc-home')
  }
  useEffect(()=>{
    const storedUser = localStorage.getItem("user")
    if(storedUser){
      setPetUser(JSON.parse(storedUser));
    }
  }, [])

  if(patuser){
    navigate('/pat-home')
  }
  return (
    <>
      <div className="container-left">
        <h1 className="heading">
          Welcome to <span>MyMedico</span>
        </h1>
        <p>Please choose your role to continue.</p>
      </div>
      <div className="container-right">
        <div className="docter-section">
          <label>For Doctor</label>
          <button onClick={HandleLogin} className="doc-login">Doctor Login</button>
          <button className="doc-register" onClick={() => navigate("/doctor-signup")}>Register</button>
        </div>
        <div className="patient-section">
          <label>For Patients</label>
          <button className="pat-login" onClick={HandlePatLogin}>Patients Login</button>
          <button className="pat-register" onClick={HandlePatRegister}>Register</button>
        </div>
      </div>
    </>
  );
};

export default Home;
