// UserPage.js
import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import './style.css'; // Import the CSS file

const UserPage = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    phoneNumber: '',
    email: '',
    nic: '',
    gender: '',
    dateOfBirth: '',
    recommendedDoctor: '',
  });

  const [uniqueID, setUniqueID] = useState(null);
  const [errors, setErrors] = useState({});

  const handleSave = () => {
    // Validate required fields
    const validationErrors = {};
    const requiredFields = [
      'firstName',
      'address',
      'phoneNumber',
      'email',
      'nic',
      'gender',
      'dateOfBirth',
      'recommendedDoctor',
    ];

    requiredFields.forEach((field) => {
      if (!userData[field]) {
        validationErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`;
      }
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Here you can save the user data and generate a unique ID
    const generatedID = generateUniqueID(); // You can implement this function

    setUniqueID(generatedID);
    setErrors({});
  };

  const generateUniqueID = () => {
    // You can implement your logic to generate a unique ID
    // For simplicity, I'm using a random number in this example
    return Math.floor(Math.random() * 1000000).toString();
  };

  return (
    <div className="">
      <h1>User Page</h1>

      {uniqueID && <div className="unique-id">Your Unique ID: {uniqueID}</div>}

      <div className="user-form">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <label>
                  First Name:
                  <input
                    type="text"
                    value={userData.firstName}
                    onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                  />
                  {errors.firstName && <span className="error">{errors.firstName}</span>}
                </label>
              </Grid>

              <Grid item xs={12} sm={4}>
                <label>
                  Last Name:
                  <input
                    type="text"
                    value={userData.lastName}
                    onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
                  />
                </label>
              </Grid>

              <Grid item xs={12} sm={4}>
                <label>
                  Address:
                  <input
                    type="text"
                    value={userData.address}
                    onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                  />
                  {errors.address && <span className="error">{errors.address}</span>}
                </label>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={4}>
            <label>
              Phone Number:
              <input
                type="tel"
                value={userData.phoneNumber}
                onChange={(e) => setUserData({ ...userData, phoneNumber: e.target.value })}
              />
              {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
            </label>
          </Grid>

          <Grid item xs={12} sm={4}>
            <label>
              Email:
              <input
                type="email"
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </label>
          </Grid>

          <Grid item xs={12} sm={4}>
            <label>
              NIC:
              <input
                type="text"
                value={userData.nic}
                onChange={(e) => setUserData({ ...userData, nic: e.target.value })}
              />
              {errors.nic && <span className="error">{errors.nic}</span>}
            </label>
          </Grid>

          <Grid item xs={12} sm={4}>
            <label>
              Gender:
              <select
                value={userData.gender}
                onChange={(e) => setUserData({ ...userData, gender: e.target.value })}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && <span className="error">{errors.gender}</span>}
            </label>
          </Grid>

          <Grid item xs={12} sm={4}>
            <label>
              Date of Birth:
              <input
                type="date"
                value={userData.dateOfBirth}
                onChange={(e) => setUserData({ ...userData, dateOfBirth: e.target.value })}
              />
              {errors.dateOfBirth && <span className="error">{errors.dateOfBirth}</span>}
            </label>
          </Grid>

          <Grid item xs={12} sm={4}>
            {/* <label>
              Recommended Doctor:
              <input
                type="text"
                value={userData.recommendedDoctor}
                onChange={(e) => setUserData({ ...userData, recommendedDoctor: e.target.value })}
              />
              {errors.recommendedDoctor && (
                <span className="error">{errors.recommendedDoctor}</span>
              )}
            </label> */}
          </Grid>

          <Grid item xs={12}>
            <button onClick={handleSave}>Save</button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default UserPage;
