import React, { useState } from 'react';
import { Box, OutlinedInput, InputAdornment, IconButton, Button, Typography, Container, Grid, Select, MenuItem, Link as MuiLink, } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Link as ReactRouterLink } from 'react-router-dom';
import './style.css';
import LaboratoryImage from '../../assets/cdc-XLhDvfz0sUM-unsplash.jpg';

const roles = [
  { id: 1, value: 'ROLE_USER', label: 'User' },
  { id: 2, value: 'ROLE_ADMIN', label: 'Admin' },
  // Add other roles as needed
];

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const [role, setRole] = useState({ id: 1, value: 'ROLE_USER', label: 'User' });

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };
  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    // Basic validation
    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }
    
    // Send login request to the backend
    fetch('http://localhost:8080/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, role }),
    })
      .then((response) => {
        if (response.status === 200) {
          // Successful login
          return response.json();
        } else {
          // Handle other response statuses (e.g., display an error message)
          throw new Error('Invalid credentials');
        }
      })
      .then((user) => {
        // Handle successful login (e.g., redirect to dashboard)
        console.log('Login successful:', user);
        navigate('/home'); // Redirect to the dashboard
      })
      .catch((error) => {
        // Handle login error
        setError('Invalid credentials');
      });
  };

  return (
    <Box>
      <Container maxWidth="100%" className="container">
        <Grid container>
          {/* Left Side */}
          <Grid item xs={6} className="leftSide">
            <Box
              sx={{
                width: '100%',
                height: '100%',
                backgroundImage: `url(${LaboratoryImage})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                filter: 'blur(1px)',
              }}
            />
          </Grid>

          {/* Right Side */}
          <Grid item xs={6} className="rightSide">
            <div className="formContainer">
              <Typography variant="h4" className="title">
                Sign In
              </Typography>
              {/* Role Dropdown */}
  
              <Select
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
                    {roleOption.label}
                  </MenuItem>
                ))}
              </Select>
              <OutlinedInput
                placeholder="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                className="input"
                dense
                onChange={handleEmailChange}
              />

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
                    <IconButton onClick={togglePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                onChange={handlePasswordChange}
              />

              <Typography variant="body2"  href="#" className="forgotPassword">
                Forgot Password?
              </Typography>

              {error && <Typography color="error">{error}</Typography>}

              <Button variant="contained" color="primary" fullWidth className="loginButton" onClick={handleLogin}>
                Sign in
              </Button>

              <Button variant="outlined" fullWidth className="googleLoginButton">
                Google Login
              </Button>

              <Typography variant="body2" className="paragraph">
              Don't have an account?{' '}
                {/* Use React Router's Link to navigate to the login page */}
                <MuiLink component={ReactRouterLink} to="/registration" className="signInLink">
                Sign Up
                </MuiLink>
                </Typography>
            </div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Login;