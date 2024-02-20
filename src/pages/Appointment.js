// AppointmentPage.js
import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, MenuItem, Paper } from '@mui/material';

const AppointmentPage = () => {
  const [open, setOpen] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState({
    date: '',
    time: '',
    doctorReceiptImage: null,
    testDropdown: '',
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDone = () => {
    // Handle appointment submission and show success message
    console.log('Appointment submitted:', appointmentDetails);
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen} style={{ float: 'right', marginTop: '10px' }}>
        New Appointment
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Appointment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill in the details for the new appointment.
          </DialogContentText>
          <TextField
            margin="normal"
            id="date"
            label="Appointment Date"
            type="date"
            fullWidth
            onChange={(e) => setAppointmentDetails({ ...appointmentDetails, date: e.target.value })}
          />
          <TextField
            margin="normal"
            id="time"
            label="Appointment Time"
            type="time"
            fullWidth
            onChange={(e) => setAppointmentDetails({ ...appointmentDetails, time: e.target.value })}
          />
          <TextField
            margin="normal"
            id="testDropdown"
            label="Test Dropdown"
            select
            fullWidth
            value={appointmentDetails.testDropdown}
            onChange={(e) => setAppointmentDetails({ ...appointmentDetails, testDropdown: e.target.value })}
          >
            <MenuItem value="test1">Test 1</MenuItem>
            <MenuItem value="test2">Test 2</MenuItem>
          </TextField>
          <TextField
            margin="normal"
            id="doctorReceiptImage"
            label="Doctor Receipt Image (upload)"
            type="file"
            fullWidth
            InputLabelProps={{ shrink: true }}
            onChange={(e) => setAppointmentDetails({ ...appointmentDetails, doctorReceiptImage: e.target.files[0] })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDone} color="primary">
            Done
          </Button>
        </DialogActions>
      </Dialog>

      {/* Display Appointment Details */}
      <h2>Appointment Details</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Patient Name</TableCell>
              <TableCell>Date Time</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Cancel</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Map over actual appointment data */}
            <TableRow>
              <TableCell>John Doe</TableCell>
              <TableCell>{appointmentDetails.date} {appointmentDetails.time}</TableCell>
              <TableCell>Pending</TableCell>
              <TableCell>
                <Button color="secondary">Cancel</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AppointmentPage;
