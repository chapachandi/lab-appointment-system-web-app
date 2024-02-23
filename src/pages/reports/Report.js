import React from 'react';
import TableSortAndSelection from '../../components/tables/SortTable'
import { Button, TableCell } from '@mui/material';

const ReportPage = () => {
  // Mock data for the report table
  const reportData = [
    { queueId: '12345', testedDate: '2022-03-01', paymentStatus: true },
    { queueId: '67890', testedDate: '2022-03-05', paymentStatus: false },
    // Add more data as needed
  ];

  const handleDownloadReport = (queueId, paymentStatus) => {
    if (paymentStatus) {
      // Implement your logic to download the report
      console.log(`Downloading report for queue ID ${queueId}`);
    } else {
      console.log(`Payment not made for queue ID ${queueId}. Cannot download report.`);
    }
  };

  // Define the headCells for the reusable table
  const headCells = [
    { id: 'queueId', numeric: false, disablePadding: false, label: 'Patient Queue ID' },
    { id: 'testedDate', numeric: false, disablePadding: false, label: 'Tested Date' },
    { id: 'report', numeric: false, disablePadding: false, label: 'Report' },
  ];

  return (
    <div className="report-page">
      <h1>Report Page</h1>

      <TableSortAndSelection
        data={reportData}
        headCells={headCells}
        title="Report"
        initialOrder="asc"
        initialOrderBy="queueId"
        rowsPerPageOptions={[5, 10, 25]}
      >
        {(row, isSelected) => (
          <>
            <TableCell>{row.queueId}</TableCell>
            <TableCell>{row.testedDate}</TableCell>
            <TableCell>
              {row.paymentStatus ? (
                <Button onClick={() => handleDownloadReport(row.queueId, row.paymentStatus)}>
                  Download Report
                </Button>
              ) : (
                'Payment not made'
              )}
            </TableCell>
          </>
        )}
      </TableSortAndSelection>
    </div>
  );
};

export default ReportPage;
