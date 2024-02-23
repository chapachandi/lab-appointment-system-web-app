// DashboardCard.js

import React from 'react';
import './style.css';

const DashboardCard = () => {
  return (
    <div className="dashboard-card">
      <h2 className='hedear'>Closed Labs</h2>
      <p className='pharagraph'>The following labs are CLOSED until further notice:</p>
      <p className='pharagraph'>St. Bartholomew's Health Centre Laboratory - Lytton, BC</p>

      <h2 className="hedear">Appointment Information</h2>
      <p className='pharagraph'>Bring your lab requisition, Provincial Healthcare Card, and/or a piece of government-issued photo ID and arrive 10 min prior to your appointment.</p>
      
      <h2 className="hedear">Special Tests</h2>
      <p className='pharagraph'>Select lab tests have specific time, location, or shipping requirements, i.e. holter monitors, semen analysis, sweat chloride, special out-of-province referral tests, etc. In these instances, appointments need to be booked by calling the laboratory directly. If you book online or through the call center, lab staff will inform you when you arrive for your appointment that you will need to reschedule.</p>

      <h2 className="hedear">Fasting Requirements</h2>
      <p className='pharagraph'>Some tests require fasting. Fast means nothing to eat or drink 8-12 hours before blood-work. Glucose tolerance tests can be booked up to 2 hours prior to lab close. Check our website for Patient Test Instructions or ask your physician for fasting requirements.</p>

      <h2 className="hedear">Naturopath Requisitions</h2>
      <p className='pharagraph'>Interior Health does not accept laboratory requisitions from naturopaths due to restrictions under the Lab Services Act of British Columbia. Please consult with a private lab for service.</p>

      <p className='note'>Note: If you are more than 10 minutes late, your appointment may be rescheduled.</p>
    </div>
  );
};

export default DashboardCard;
