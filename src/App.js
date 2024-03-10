import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/layouts/Sidebar';
import Login from './pages/login/Login';
import Registration from './pages/registration/Registration';
import Appointment from './pages/appointment/Appointment';
import Dashboard from './pages/dashboard/Dashboard';
import Account from './pages/account/User';
import Report from './pages/reports/Report';

function App() {
  return (
    <Router>
      <div className="App">
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/home/*" element={<Sidebar />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="appointment" element={<Appointment />} />
            <Route path="report" element={<Report />} />
            <Route path="account" element={<Account />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
