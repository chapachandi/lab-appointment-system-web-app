// src/Registration.js
import React, { useState } from 'react';
import { Box, OutlinedInput, InputAdornment, IconButton, Button, Typography, Container, Alert, Grid, Link } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import './style.css'; // Import common styles
import LaboratoryImage from '../../assets/experiment-biotechnology-with-chemistry-science.jpg'; // Replace with the actual path to your laboratory image

const Registration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleRegister = () => {
    // Basic validation
    if (!email || !password || !confirmPassword) {
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

    // Registration logic (submit the form, API call, etc.)
    console.log('Registering...', { email, password });
    // Reset error state after successful registration
    setError('');
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
      <Typography variant="h4" className="title">Sign Up</Typography>

      {/* Email Input */}
      <OutlinedInput
        placeholder="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        className="input"
        onChange={handleEmailChange}
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

      {/* Display validation error */}
      {error && <Alert severity="error">{error}</Alert>}

      {/* Registration Button */}
      <Button variant="contained" color="primary" fullWidth className="loginButton" onClick={handleRegister}>
        Sign Up
      </Button>

      {/* Already have an account? Login Link */}
      <Typography variant="body2" className="paragraph">
        Already have an account? <Link href="#" className="signInLink">Sign In</Link>
      </Typography>
    </div>
          </Grid>
        </Grid>
      </Container>
    </Box>
   
  );
};

export default Registration;
