import React, { useEffect, useState } from "react";
import "./EditProfile.css";
import profile from "../../assets/profile.png";

const EditProfile = () => {
  const [docuser, setDocUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const [formData, setFormData] = useState({
    email: '',
    docPhoneNumber: '',
    docLocation: '',
    specialization: '',
    docBiography: ''
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("docuser");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setDocUser(parsedUser);
      setFormData({
        email: parsedUser.email || '',
        docPhoneNumber: parsedUser.docPhoneNumber || '',
        docLocation: parsedUser.docLocation || '',
        specialization: parsedUser.specialization || '',
        docBiography: parsedUser.docBiography || ''
      });
    }
  }, []);

  const HandleChange = (e) => {
    const { value, name } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const response = await fetch('http://localhost:8000/doc-update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json()
      
      if (response.ok) {
        const updatedUser = {...docuser , ...formData};
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setDocUser(updatedUser);
        setSuccessMessage("SAVE SUCCESSFULLY");
        setFormData({
          docPhoneNumber: "",
          docLocation: "",
          specialization: "",
          docBiography: "",
        })
      } else {
        setErrorMessage(data.message || "UNABLE TO FETCH USER!");
      }
    } catch (err) {
      setErrorMessage("UNABLE TO UPDATE USER");
      console.error(err);
    }
  };

  return (
    <div className="container-edit-profile">
      <div className="edit-profile-heading">
        <h1>Edit Profile</h1>
      </div>
      <form onSubmit={HandleSubmit}>
        <div className="edit-profile-image">
          <img src={profile} alt="" />
          <div className="phone-number">
            <label>Phone</label>
            <input
              name="docPhoneNumber"
              onChange={HandleChange}
              value={formData.docPhoneNumber}
              placeholder="Enter Your Phone Number"
              type="text"
            />
          </div>
        </div>
        <div className="bottum-section">
          <label>Location</label>
          <input
            name="docLocation"
            value={formData.docLocation}
            placeholder="Enter Your Location"
            onChange={HandleChange}
            type="text"
          />
          <label>Specialization</label>
          <input
            name="specialization"
            value={formData.specialization}
            placeholder="Enter Your Specialization"
            onChange={HandleChange}
            type="text"
          />
          <label>Biography</label>
          <input
            name="docBiography"
            value={formData.docBiography}
            placeholder="Enter Your Biography"
            onChange={HandleChange}
            type="text"
          />
          <button type="submit">Save</button>
        </div>
      </form>
      {errorMessage && <p className="error">{errorMessage}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
    </div>
  );
};

export default EditProfile;
