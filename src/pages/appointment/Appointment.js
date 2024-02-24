// AppointmentPage.js
import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, MenuItem, Paper } from '@mui/material';
import './style.css'; // Import common styles
import TableSortAndSelection from '../../components/tables/SortTable'

const AppointmentPage = () => {
  const [open, setOpen] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState({
    date: '',
    time: '',
    doctorReceiptImage: null,
    testDropdown: '',
  });
  const [errors, setErrors] = useState({});
  const [appointments, setAppointments] = useState([]); // State to store appointment data

  const timeSlots = [
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
  ];

  const tests = [
    'Blood',
    'Urine',
    'ECG',
    'Lab Test'
  ];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // Clear errors when closing the dialog
    setErrors({});
  };

  const handleDone = () => {
    // Validate before submitting appointment
    const validationErrors = {};

    if (!appointmentDetails.date) {
      validationErrors.date = 'Date is required.';
    }

    if (!appointmentDetails.time) {
      validationErrors.time = 'Time is required.';
    }

    if (!appointmentDetails.testDropdown) {
      validationErrors.testDropdown = 'Test selection is required.';
    }

    // If there are validation errors, set them and prevent submission
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Handle appointment submission and show success message
    const newAppointment = {
      patientName: 'John Doe', // You can replace this with actual patient name
      dateTime: `${appointmentDetails.date} ${appointmentDetails.time}`,
      status: 'Pending',
    };

    setAppointments((prevAppointments) => [...prevAppointments, newAppointment]);

    console.log('Appointment submitted:', appointmentDetails);
    setOpen(false);
    // Clear errors after successful submission
    setErrors({});
  };


  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen} className="newAppointmentButton">
        New Appointment
      </Button>

      {/* Dialog for New Appointment */}
      <Dialog open={open} onClose={handleClose} className="appointmentPopup">
        <DialogTitle>New Appointment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill in the details for the new appointment.
          </DialogContentText>
          <TextField
            margin="normal"
            id="patientId"
            label="Patient ID"
            fullWidth
            value={appointmentDetails.patientId}
            onChange={(e) => setAppointmentDetails({ ...appointmentDetails, patientId: e.target.value })}
            error={!!errors.patientId}
            helperText={errors.patientId}
          />
          <TextField
            margin="normal"
            id="date"
            // label="Appointment Date"
            type="date"
            fullWidth
            onChange={(e) => setAppointmentDetails({ ...appointmentDetails, date: e.target.value })}
            error={!!errors.date}
            helperText={errors.date}
          />
          <TextField
        margin="normal"
        id="time"
        type="time"
        fullWidth
        select
        label="Select Time"
        value={appointmentDetails.time}
        onChange={(e) => setAppointmentDetails({ ...appointmentDetails, time: e.target.value })}
        error={!!errors.time}
        helperText={errors.time}
      >
        {timeSlots.map((slot) => (
          <MenuItem key={slot} value={slot} disabled={/* Add your logic to disable specific time slots */ false}>
            {slot}
          </MenuItem>
        ))}
      </TextField>
          <TextField
            margin="normal"
            id="testDropdown"
            label="Test Dropdown"
            select
            fullWidth
            value={appointmentDetails.testDropdown}
            onChange={(e) => setAppointmentDetails({ ...appointmentDetails, testDropdown: e.target.value })}
            error={!!errors.testDropdown}
            helperText={errors.testDropdown}
          >
             {tests.map((test) => (
               <MenuItem key={test} value={test} disabled={/* Add your logic */ false}>
                {test}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleDone} color="primary"  className="doneButton">
            Done
          </Button>
        </DialogActions>
      </Dialog>

      {/* Display Appointment Details */}
      <h2>Appointment Details</h2>
      <TableSortAndSelection 
       data={appointments}
       headCells={[
         { id: 'patientId', numeric: false, disablePadding: true, label: 'Patient ID' },
         { id: 'date', numeric: false, disablePadding: false, label: 'Date' },
         { id: 'time', numeric: false, disablePadding: false, label: 'Time' },
         { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
         { id: 'appointmentNumber', numeric: false, disablePadding: false, label: 'Appointment Number' },
       ]}
       title="Appointment Details"
       initialOrder="asc"
      //  initialOrderBy="dateTime"
       rowsPerPageOptions={[5, 10, 25]}
       densePadding={true}
     
      />
      
      {/* <TableContainer component={Paper} className="appointmentTable">
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
            {/* <TableRow>
              <TableCell>John Doe</TableCell>
              <TableCell>{appointmentDetails.date} {appointmentDetails.time}</TableCell>
              <TableCell>Pending</TableCell>
              <TableCell>
                <Button color="secondary">Cancel</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      // </TableContainer> */} 
    </div>
  );
};

export default AppointmentPage;
