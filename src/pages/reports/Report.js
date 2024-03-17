import React, { useState, useEffect } from 'react';
import { Button, IconButton } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import EnhancedTable from '../../components/tables/SortTable'; // Update the path accordingly
import './style.css'; // Import the CSS file
import axios from 'axios';
import { useSelector } from 'react-redux';

import FileDownloadIcon from '@mui/icons-material/FileDownload';

const ReportPage = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userId = useSelector((state) => state.auth.user?.id);
  const [appointments, setAppointments] = useState([]);
  const [reportData, setReportData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openPaymentPopup, setOpenPaymentPopup] = useState(false);
  const [customerReservations, setCustomerReservations] = useState([]);
  const [tableData, setTableData] = useState([]);
  console.log(isAuthenticated, 'isAuthenticated');
  console.log(userId, 'userId');

  useEffect(() => {
    console.log(userId, 'userId');
    // fetchAppointments();
  }, [userId]);

  useEffect(() => {
    // Fetch customer reservations when the component mounts
    const fetchCustomerReservations = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/reservations/customerId/${userId}`);
        setCustomerReservations(response.data);
        console.log(response.data, 'response.data');
      } catch (error) {
        console.error('Error fetching customer reservations:', error);
      }
    };
    console.log(customerReservations);
    fetchCustomerReservations();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/reservations/customerId/${userId}`);
        setAppointments(response.data);
        console.log(appointments, 'appointments5555');
        console.log(response.data, 'response.data');

        // Logging after setting state
        console.log('Appointments after setting state:', appointments);

        const newData = response.data.map((appointment) => ({
          ...appointment,
          status: (
            <TableCell align="left">
              {appointment.isActive ? (
                <IconButton color="secondary" onClick={() => handleDownloadReport(appointment.reservationId, appointment.paymentStatus)}>
                  <FileDownloadIcon />
                </IconButton>
              ) : (
                <>
                  <Button onClick={() => handlePayNow(appointment)}>Pay Now</Button>
                  {/* Payment Popup */}
                  <Dialog open={openPaymentPopup} onClose={handleClosePaymentPopup} className="paymentPopup">
                    <div class="wrapper">
                      <div class="payment">
                        <h2>Payment Gateway</h2>
                        <div class="form">
                          <div class="card space icon-relative">
                            <label class="label">Card holder:</label>
                            <input type="text" class="input" placeholder="Coding Market" />
                            <i class="fas fa-user"></i>
                          </div>
                          <div class="card space icon-relative">
                            <label class="label">Card number:</label>
                            <input type="text" class="input" data-mask="0000 0000 0000 0000" placeholder="Card Number" />
                            <i class="far fa-credit-card"></i>
                          </div>
                          <div class="card-grp space">
                            <div class="card-item icon-relative">
                              <label class="label">Expiry date:</label>
                              <input type="text" name="expiry-data" class="input" placeholder="00 / 00" />
                              <i class="far fa-calendar-alt"></i>
                            </div>
                            <div class="card-item icon-relative">
                              <label class="label">CVC:</label>
                              <input type="text" class="input" data-mask="000" placeholder="000" />
                              <i class="fas fa-lock"></i>
                            </div>
                          </div>
                          <div class="btn">Pay</div>
                        </div>
                      </div>
                    </div>
                  </Dialog>
                </>
              )}
            </TableCell>
          ),
        }));
        setTableData(newData);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };
    console.log(appointments, 'appointments/wwww');
    fetchData();
  }, []);

  const handleDownloadReport = async (reservationId, paymentStatus) => {
    console.log(customerReservations);
    if (!paymentStatus) {
      try {
        // Replace '1' with the actual report ID or parameter needed for your API
        const reportId = 1;

        // Assuming you have a specific API endpoint for downloading reports
        const response = await axios.post(`http://localhost:8080/api/finalResult/${reservationId}`, {
          responseType: 'blob', // Set the responseType to 'blob' for binary data
        });

        // Check if the request was successful
        if (response.status === 200) {
          const blob = new Blob([response.data], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);

          // Create a link element and trigger a download
          const a = document.createElement('a');
          a.href = url;
          a.download = `report_${reservationId}.pdf`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);

          // Release the object URL
          window.URL.revokeObjectURL(url);

          // Show successful alert
          alert('Report downloaded successfully!');
        } else {
          console.error('Failed to download report:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching report:', error);
      }
    } else {
      console.log(`Payment not made for reservation ID ${reservationId}. Cannot download report.`);
    }
  };

  const handlePayNow = (row) => {
    setSelectedRow(row);
    setOpenPaymentPopup(true);
  };

  const handleClosePaymentPopup = () => {
    setOpenPaymentPopup(false);
    setSelectedRow(null);
  };

  const headCells = [
    { id: 'reservationId', numeric: false, disablePadding: true, label: 'Reservation Id ' },
    { id: 'reservationDate', numeric: false, disablePadding: false, label: 'Tested Date' },
    { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
  ];

  return (
    <div className="report-page">
      <h1>Report Page</h1>

      <CustomTable data={tableData} headCells={headCells} />
    </div>
  );
};

// Define a custom table component to wrap EnhancedTable
const CustomTable = ({ data, headCells }) => {
  const handleRowClick = (event, rowData) => {
    // Prevent row selection
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <EnhancedTable
      data={data}
      headCells={headCells}
      title="Report Details"
      initialOrder="asc"
      initialOrderBy="reservationId"
      rowsPerPageOptions={[5, 10, 25]}
      densePadding={true}
      hideCheckboxes={true}
      onRowClick={handleRowClick} // Intercept row click events to prevent row selection
    />
  );
};

export default ReportPage;
