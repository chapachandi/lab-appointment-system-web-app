import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, MenuItem, Paper } from '@mui/material';
import './style.css'; 
import TableSortAndSelection from '../../components/tables/SortTable'
import { useSelector } from 'react-redux';

const AppointmentPage = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userId = useSelector((state) => state.auth.user?.id);

  const [open, setOpen] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState({
    customerId: userId,
    reservationDate: '',
    time: '',
    testId: '',
    timeSlotId: '',
  });
  const [errors, setErrors] = useState({});
  const [appointments, setAppointments] = useState([]); 
  const [timeSlots, setTimeSlots] = useState([]);

  console.log(appointments,'appointments')
  console.log(isAuthenticated,'isAuthenticated')


  useEffect(() => {
    console.log(userId,'userId')
    fetchAppointments();
  }, [userId]);
  

  useEffect(() => {
    const testId = "1";
    const reservingDate = "2024-04-01"; 
  
    const fetchTimeSlots = async () => {
      console.log('Before fetching time slots');
      try {
        const response = await axios.post('http://localhost:8080/api/timeslot/getAvailableTimeSlot', {
          testId,
          reservingDate,
        });
        const data = response.data;
        console.log(data);
        setTimeSlots(data);
      } catch (error) {
        console.error('Error fetching time slots:', error);
      }
      console.log('After fetching time slots');
    };
  
    fetchTimeSlots();
  }, []);

  const [allTests, setAllTests] = useState([]);

  useEffect(() => {
    // Fetch all tests when the component mounts
    console.log('+++++++++++++++++++++')
    const fetchAllTests = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/test/getAll');
        setAllTests(response.data);
      } catch (error) {
        console.error('Error fetching tests:', error);
      }
    };
    console.log(allTests,'+++++++++++++++++++++')
    fetchAllTests();
  }, []);

 

 

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/reservations/customerId/${userId}`);
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setErrors({});
  };
//   const selectedTest = tests.find((test) => test.id === appointmentDetails.testId);

// console.log(selectedTest)

  const handleDone = async () => {
  const validationErrors = {};

  if (!appointmentDetails.reservationDate) {
    validationErrors.reservationDate = 'Date is required.';
  }

  if (!appointmentDetails.timeSlotId) {
    validationErrors.timeSlotId = 'Time slot is required.';
  }

  if (!appointmentDetails.testId) {
    validationErrors.testId = 'Test selection is required.';
  }

  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }
  console.log('..................................');
  
  try {
    // Assuming you get user data from somewhere
    const user = { name: 'Chapa Chandi' };
   
    const selectedTest = allTests.find((test) => test.testId === appointmentDetails.testId);
    console.log(selectedTest,'hi');
    const newAppointment = {
      description: selectedTest ? selectedTest.name : 'No Test',
      reservationDate: appointmentDetails.reservationDate,
      isActive: true,
      isTested: false,
      isPayed: false,
      timeSlotId: appointmentDetails.timeSlotId,
      testId: appointmentDetails.testId,
      userId: userId, 
    };

    const response = await axios.post('http://localhost:8080/api/reservations', newAppointment);
  
    // Log or use the response data as needed
    console.log('Appointment submitted:', response.data);

    fetchAppointments(); // Assuming you want to fetch updated appointments after submission

    setOpen(false);
    setErrors({});
  } catch (error) {
    console.error('Error submitting appointment:', error);
  }
};

 const transformedAppointments = appointments.map((appointment) => {
  const timeSlot = timeSlots.find((slot) => slot.timeSlotId === appointment.timeSlotId);
  const displayText = timeSlot ? timeSlot.displayText : '';
  const status = appointment.isActive ? 'Accepted' : 'Pending';
  return { ...appointment, displayText, status };
});



console.log(transformedAppointments)
console.log(appointments)

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
          {/* <TextField
            margin="normal"
            id="patientId"
            label="Patient ID"
            fullWidth
            value={appointmentDetails.customerId}
            onChange={(e) => setAppointmentDetails({ ...appointmentDetails, customerId: e.target.value })}
            error={!!errors.customerId}
            helperText={errors.customerId}
            disabled
          /> */}
          <TextField
            margin="normal"
            id="date"
            type="date"
            fullWidth
            onChange={(e) => setAppointmentDetails({ ...appointmentDetails, reservationDate: e.target.value })}
            error={!!errors.reservationDate}
            helperText={errors.reservationDate}
          />
          <TextField
              margin="normal"
              id="time"
              type="time"
              fullWidth
              select
              label="Select Time"
              value={appointmentDetails.timeSlotId}  // Update this line
              onChange={(e) => setAppointmentDetails({ ...appointmentDetails, timeSlotId: e.target.value })}  // Update this line
              error={!!errors.timeSlotId}
              helperText={errors.timeSlotId}
            >
              {timeSlots.map((slot) => (
                <MenuItem key={slot.timeSlotId} value={slot.timeSlotId} disabled={!slot.isActive}>
                  {slot.displayText}
                </MenuItem>
              ))}
            </TextField>

            <TextField
                margin="normal"
                id="testDropdown"
                label="Test Dropdown"
                select
                fullWidth
                value={appointmentDetails.testId || ''}
                onChange={(e) => {
                  console.log('Selected value:', e.target.value);
                  console.log('appointmentDetails.testId before update:', appointmentDetails.testId);
                  setAppointmentDetails({ ...appointmentDetails, testId: e.target.value });
                }}
                error={!!errors.testId}
                helperText={errors.testId}
              >
                {allTests.map((test) => (
                  <MenuItem key={test.testId} value={test.testId}>
                    {test.name}
                  </MenuItem>
                ))}
              </TextField>


        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleDone} color="primary" className="doneButton">
            Done
          </Button>
        </DialogActions>
      </Dialog>

      {/* Display Appointment Details */}
      <h2>Appointment Page</h2>
     <TableSortAndSelection
          data={transformedAppointments}
          headCells={[
            { id: 'reservationId', numeric: false, disablePadding: true, label: 'Appointment Number' },
            { id: 'description', numeric: false, disablePadding: false, label: 'Test' },
            { id: 'reservationDate', numeric: false, disablePadding: false, label: 'Reservation Date' },
            { id: 'displayText', numeric: false, disablePadding: false, label: 'Time Slot' },
            { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
          ]}
          title="Appointment Details"
          initialOrder="asc"
          rowsPerPageOptions={[5, 10, 25]}
          densePadding={true}
          
        />

    </div>
  );
};

export default AppointmentPage;
