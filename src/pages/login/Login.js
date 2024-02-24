import React, { useState } from 'react';
import { Box, OutlinedInput, InputAdornment, IconButton, Button, Typography, Container, Grid, Link } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material'; // Import the visibility icons
import './style.css';
import LaboratoryImage from '../../assets/cdc-XLhDvfz0sUM-unsplash.jpg'; // Replace with the actual path to your laboratory image

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
              <Typography variant="h4" className="title">Sign In</Typography>

              <OutlinedInput placeholder="Email" variant="outlined"  fullWidth margin="normal" className="input" dense /*sx={{ height: '30px',}}*//>
              <OutlinedInput
                placeholder="Password"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                fullWidth
                margin="normal"
                className="input"
                dense
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={togglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {/* Forgot Password Link */}
              <Typography variant="body2" component={Link} href="#" className="forgotPassword">Forgot Password?</Typography>

              {/* Login Button */}
              <Button variant="contained" color="primary" fullWidth className="loginButton">
                Sign in
              </Button>

              {/* Google Login Button */}
              <Button variant="outlined" fullWidth className="googleLoginButton">
                Google Login
              </Button>

              {/* Forgot Password Link */}
              <Typography className="pharagraph">Do you haven't account please sign up</Typography>

              {/* <Button variant="contained" fullWidth className="signUpButton">
                Sign Up
              </Button> */}
              <Typography variant="body2" className="paragraph">
                Don't have an account? <Link href="#" className="signUpLink">Sign Up</Link>
              </Typography>

            </div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Login;
