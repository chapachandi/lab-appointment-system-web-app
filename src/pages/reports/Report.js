import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from '@mui/material';
import './style.css'; // Import the CSS file
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PersonIcon from '@mui/icons-material/Person';

const ReportPage = () => {
  const [reportData, setReportData] = useState([
    { queueId: '12345', testedDate: '2022-03-01', paymentStatus: true, totalCost: 50 },
    { queueId: '67890', testedDate: '2022-03-05', paymentStatus: false, totalCost: 30 },
    // Add more data as needed
  ]);
// $("input[name='expiry-data']").mask("00 / 00");
  const [selectedRow, setSelectedRow] = useState(null);
  const [openPaymentPopup, setOpenPaymentPopup] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('creditCard');

  const handleDownloadReport = (queueId, paymentStatus) => {
    if (paymentStatus) {
      // Implement your logic to download the report
      console.log(`Downloading report for queue ID ${queueId}`);
    } else {
      console.log(`Payment not made for queue ID ${queueId}. Cannot download report.`);
    }
  };

  const handlePayNow = (row) => {
    setSelectedRow(row);
    setOpenPaymentPopup(true);
  };

  const handleClosePaymentPopup = () => {
    setOpenPaymentPopup(false);
    setSelectedRow(null);
    setPaymentMethod('creditCard');
  };

  const handleContinuePayment = () => {
    // Implement logic to handle payment continuation based on paymentMethod
    // For simplicity, just closing the payment popup in this example
    handleClosePaymentPopup();
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handlePaymentDone = () => {
    // Implement logic to mark the payment as done in your data
    setReportData((prevReportData) =>
      prevReportData.map((row) =>
        row.queueId === selectedRow.queueId ? { ...row, paymentStatus: true } : row
      )
    );

    handleClosePaymentPopup();
  };

  return (
    <div className="report-page">
      <h1>Report Page</h1>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Patient Queue ID</TableCell>
              <TableCell>Tested Date</TableCell>
              <TableCell>Report</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reportData.map((data) => (
              <TableRow key={data.queueId}>
                <TableCell>{data.queueId}</TableCell>
                <TableCell>{data.testedDate}</TableCell>
                <TableCell>
                  {!data.paymentStatus ? (
                    <Button onClick={() => handleDownloadReport(data.queueId, data.paymentStatus)}>
                      Download Report
                    </Button>
                  ) : (
                    <>
                      <Button onClick={() => handlePayNow(data)}>Pay Now</Button>
                      {/* Payment Popup */}
                      <Dialog open={openPaymentPopup} onClose={handleClosePaymentPopup} className="paymentPopup">
                       
                       <div class="wrapper">
                          <div class="payment">
                            <h2>Payment Gateway</h2>
                            <div class="form">
                              <div class="card space icon-relative">
                                <label class="label">Card holder:</label>
                                <input type="text" class="input" placeholder="Coding Market"/>
                                <i class="fas fa-user"></i>
                                {/* <CreditCardIcon className=''/>
                                <PersonIcon/> */}
                              </div>
                              <div class="card space icon-relative">
                                <label class="label">Card number:</label>
                                <input type="text" class="input" data-mask="0000 0000 0000 0000" placeholder="Card Number"/>
                                <i class="far fa-credit-card"></i>
                              </div>
                              <div class="card-grp space">
                                <div class="card-item icon-relative">
                                  <label class="label">Expiry date:</label>
                                  <input type="text" name="expiry-data" class="input"  placeholder="00 / 00"/>
                                  <i class="far fa-calendar-alt"></i>
                                  {/* <CreditCardIcon/> */}
                                </div>
                                <div class="card-item icon-relative">
                                  <label class="label">CVC:</label>
                                  <input type="text" class="input" data-mask="000" placeholder="000"/>
                                  <i class="fas fa-lock"></i>
                                </div>
                              </div>
                                
                              <div class="btn">
                                Pay
                              </div> 
                              
                            </div>
                          </div>
                        </div>
                      </Dialog>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ReportPage;
