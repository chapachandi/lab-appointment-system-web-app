import React, { useState } from 'react';
import {
  Box,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
  Typography,
  Container,
  Alert,
  Grid,
  Select,
  MenuItem,
  Link as MuiLink, // Rename Link to avoid conflict with React Router's Link
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link as ReactRouterLink } from 'react-router-dom';
import './style.css'; // Import common styles
import LaboratoryImage from '../../assets/experiment-biotechnology-with-chemistry-science.jpg'; // Replace with the actual path to your laboratory image

const roles = [
  { id: 1, value: 'ROLE_USER' },
  { id: 2, value: 'ROLE_ADMIN' },
  // Add other roles as needed
];

const Registration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  // const [role, setRole] = useState( { id: 1, value: 'ROLE_USER' });

  // const handleRoleChange = (event) => {
  //   console.log(event.target.value);
  //   setRole(event.target.value);
  // };  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleMobileNumberChange = (event) => {
    setMobileNumber(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleRegister = () => {
    // Basic validation
    if ( !email || !username || !mobileNumber || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }

    // Check if the email is in a valid format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email format.');
      return;
    }

    // Check if the password meets certain criteria (e.g., minimum length)
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    // Check if the confirmed password matches the original password
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Clear error state if everything is valid
    setError('');

    // Prepare the user data for the API request
    const userData = {
      name,
      username,
      email,
      mobileNumber,
      password,
    };

    console.log(userData);

    fetch('http://localhost:8080/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (response.status === 201) {
          // Successful registration
          console.log('Registration successful:', userData);
          // Optionally, redirect to the login page or handle success
        } else {
          // Handle other response statuses (e.g., display an error message)
          throw new Error('Registration failed');
        }
      })
      .catch((error) => {
        // Handle registration error
        setError('Registration failed');
      });
  };

  return (
    <Box>
      <Container maxWidth="100%" className="container">
        <Grid container>
          {/* Left Side - Blue Background */}
          <Grid item xs={6} className="leftSide">
            {/* You can add any additional styling for the left side here */}
            <Box
              sx={{
                width: '100%',
                height: '100%',
                backgroundImage: `url(${LaboratoryImage})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                filter: 'blur(1px)', // Adjust the blur intensity as needed
              }}
            />
          </Grid>

          {/* Right Side - White Background */}
          <Grid item xs={6} className="rightSide">
            <div className="formContainer">
              {/* Title */}
              <Typography variant="h4" className="title">
                Sign Up
              </Typography>

              {/* Name Input */}
              <OutlinedInput
                placeholder="Full Name"
                variant="outlined"
                fullWidth
                margin="normal"
                className="input"
                onChange={handleNameChange}
              />

              {/* Email Input */}
              <OutlinedInput
                placeholder="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                className="input"
                onChange={handleEmailChange}
              />

              {/* Username Input */}
              <OutlinedInput
                placeholder="Username"
                variant="outlined"
                fullWidth
                margin="normal"
                className="input"
                onChange={handleUsernameChange}
              />

              {/* Mobile Number Input */}
              <OutlinedInput
                placeholder="Mobile Number"
                variant="outlined"
                fullWidth
                margin="normal"
                className="input"
                onChange={handleMobileNumberChange}
              />

              {/* Password Input */}
              <OutlinedInput
                placeholder="Create Password"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                fullWidth
                margin="normal"
                className="input"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                onChange={handlePasswordChange}
              />

              {/* Confirm Password Input */}
              <OutlinedInput
                placeholder="Confirm Password"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                fullWidth
                margin="normal"
                className="input"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                onChange={handleConfirmPasswordChange}
              />
              {/* Role Dropdown */}
              {/* <Select
                placeholder="Select Role"
                variant="outlined"
                fullWidth
                margin="normal"
                className="input"
                select
                value={role}
                onChange={handleRoleChange}
              >
                {roles.map((roleOption) => (
                  <MenuItem key={roleOption.id} value={roleOption}>
                    {roleOption.value === 'ROLE_USER' ? 'User' : 'Admin'}
                  </MenuItem>
                ))}
              </Select> */}


              {/* Display validation error */}
              {error && <Alert severity="error">{error}</Alert>}

              {/* Registration Button */}
              <Button
                variant="contained"
                color="primary"
                fullWidth
                className="loginButton"
                onClick={handleRegister}
              >
                Sign Up
              </Button>

              {/* Already have an account? Login Link */}
              <Typography variant="body2" className="paragraph">
                Already have an account?{' '}
                {/* Use React Router's Link to navigate to the login page */}
                <MuiLink component={ReactRouterLink} to="/" className="signInLink">
                  Sign In
                </MuiLink>
          </Typography>
            </div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Registration;
