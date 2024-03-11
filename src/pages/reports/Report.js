import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import EnhancedTable from '../../components/tables/SortTable'; // Update the path accordingly
import './style.css'; // Import the CSS file
import axios from 'axios';

const ReportPage = () => {
  const [reportData, setReportData] = useState([
    { queueId: '12345', testedDate: '2022-03-01', paymentStatus: true, totalCost: 50 },
    { queueId: '67890', testedDate: '2022-03-05', paymentStatus: false, totalCost: 30 },
    // Add more data as needed
  ]);

  const [selectedRow, setSelectedRow] = useState(null);
  const [openPaymentPopup, setOpenPaymentPopup] = useState(false);

 const handleDownloadReport = async (queueId, paymentStatus) => {
  if (paymentStatus) {
    try {
      // Assuming you have a specific API endpoint for downloading reports
      const response = await axios.get(`http://localhost:8080/api/finalResult/${queueId}`, {
        responseType: 'blob', // Set the responseType to 'blob' for binary data
      });

      // Check if the request was successful
      if (response.status === 200) {
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);

        // Create a link element and trigger a download
        const a = document.createElement('a');
        a.href = url;
        a.download = `report_${queueId}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        // Release the object URL
        window.URL.revokeObjectURL(url);
      } else {
        console.error('Failed to download report:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching report:', error);
    }
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
  };

  // ... your existing code for payment popup ...

  const handleContinuePayment = () => {
    // ... your existing logic for continuing payment ...
  };

  const handlePaymentDone = () => {
    // ... your existing logic for marking payment as done ...
    handleClosePaymentPopup();
  };

  const headCells = [
    { id: 'queueId', numeric: false, disablePadding: true, label: 'Patient ID' },
    { id: 'testedDate', numeric: false, disablePadding: false, label: 'Tested Date' },
    { id: 'paymentStatus', numeric: false, disablePadding: false, label: 'Report' },
  ];

  return (
    <div className="report-page">
      <h1>Report Page</h1>

      <EnhancedTable
        data={reportData}
        headCells={headCells}
        title="Report Details"
        initialOrder="asc"
        initialOrderBy="queueId"
        rowsPerPageOptions={[5, 10, 25]}
        densePadding={true}
        renderRow={(row, index, labelId) => (
          <TableRow hover tabIndex={-1} key={row.queueId}>
            <TableCell component="th" id={labelId} scope="row" padding="checkbox">
              {row.queueId}
            </TableCell>
            <TableCell align="left">{row.testedDate}</TableCell>
            <TableCell align="left">
              {!row.paymentStatus ? (
                <Button onClick={() => handleDownloadReport(row.queueId, row.paymentStatus)}>
                  Download Report
                </Button>
              ) : (
                <>
                  <Button onClick={() => handlePayNow(row)}>Pay Now</Button>
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
        )}
      />
    </div>
  );
};

export default ReportPage;
