// Sidebar.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import Appointment from '../pages/appointment/Appointment'

const drawerWidth = 240;

const pages = [
  { label: 'Appointment', icon: <InboxIcon />, path: '/appointment' },
  { label: 'Starred', icon: <MailIcon />, path: '/starred' },
  // Add more pages as needed
];

export default function PermanentDrawerLeft() {
  const [selectedPage, setSelectedPage] = useState('/appointment');
  const navigate = useNavigate();

  const handlePageChange = (path) => {
    setSelectedPage(path);
    navigate(path);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Permanent drawer
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
        <Toolbar />
        <Divider />
        <List>
          {pages.map((page) => (
            <ListItem
              key={page.label}
              disablePadding
              selected={selectedPage === page.path}
              onClick={() => handlePageChange(page.path)}
            >
              <ListItemButton>
                <ListItemIcon>{page.icon}</ListItemIcon>
                <ListItemText primary={page.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        {/* Render content based on the selectedPage */}
        {selectedPage === '/appointment' && <Appointment />}
        {selectedPage === '/starred' && <div>Starred Page Content</div>}
        {/* Add more conditions for additional pages */}
      </Box>
    </Box>
  );
}
