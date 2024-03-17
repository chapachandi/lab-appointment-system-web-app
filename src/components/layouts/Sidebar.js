// Sidebar.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from '../../app/store/authSlice';

import './style.css';
import Logo from '../../assets/images (1).png'; 

import Appointment from '../../pages/appointment/Appointment';
import Dashboard from '../../pages/dashboard/Dashboard';
import Account from '../../pages/account/User';
import Report from '../../pages/reports/Report';

import DashboardIcon from '@mui/icons-material/Dashboard';
import EventIcon from '@mui/icons-material/Event';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import PersonIcon from '@mui/icons-material/Person';

const drawerWidth = 240;

const pages = [
  { label: 'Dashboard', icon: <DashboardIcon style={{ color: '#999999 !important'}}/>, path: '/dashboard' },
  { label: 'Appointment', icon: <EventIcon style={{ color: '#999999 !important'}}/>, path: '/appointment' },
  { label: 'Reports', icon: <FileDownloadIcon style={{ color: '#999999'}}/>, path: '/report' },
  { label: 'Account', icon: <PersonIcon style={{ color: '#999999'}}/>, path: '/account' },
  // Add more pages as needed
];

export default function Sidebar() {
  const [selectedPage, setSelectedPage] = useState('/dashboard');
  const navigate = useNavigate();
  const dispatch = useDispatch(); 

  const handlePageChange = (path) => {
    setSelectedPage(path.replace('/home', '')); 
    navigate(path);
  };
   
   const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, backgroundColor: '#14A3C7' }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Laboratory System
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar sx={{ s: 'true' }}>
        <img src={Logo} alt="logo" style={{width:'200px'}}/>
          {/* <Box
            sx={{
              width: '100%',
              height: '100%',
              backgroundImage: `url(${Logo})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              // filter: 'blur(1px)', // Adjust the blur intensity as needed
            }}
          /> */}
        </Toolbar>
        <Divider />
        <List className='list'>
          {pages.map((page) => (
            <ListItem
              key={page.label}
              disablePadding
              selected={selectedPage === page.path}
              onClick={() => handlePageChange(`/home${page.path}`)}
              component={Link}
              to={`/home${page.path}`}
            >
              <ListItemButton>
                <ListItemIcon>{page.icon}</ListItemIcon>
                <ListItemText primary={page.label} />
              </ListItemButton>
            </ListItem>
          ))}
           {/* Add logout button */}
           <ListItem
            disablePadding
            onClick={handleLogout}
            sx={{ mt: 'auto', cursor: 'pointer' }}
          >
            <ListItemButton>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      <Box
         component="main"
         sx={{ flexGrow: 1, bgcolor: 'rgb(243 243 243)', p: 3, height: '100vh' }}
      >
        <Toolbar />
        {/* Render content based on the selectedPage */}
        {selectedPage === '/dashboard' && <Dashboard/>}
        {selectedPage === '/appointment' && <Appointment />}
        {selectedPage === '/report' && <Report/>}
        {selectedPage === '/account' && <Account />}

        {/* Add more conditions for additional pages */}
      </Box>
    </Box>
  );
}
