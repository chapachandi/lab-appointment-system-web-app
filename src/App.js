import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { restoreUser } from './app/store/authSlice';
import Sidebar from './components/layouts/Sidebar';
import Login from './pages/login/Login';
import Registration from './pages/registration/Registration';
import Appointment from './pages/appointment/Appointment';
import Dashboard from './pages/dashboard/Dashboard';
import Account from './pages/account/User';
import Report from './pages/reports/Report';

// Define USER_ID_KEY
const USER_ID_KEY = 'user_id';

function App() {
  const dispatch = useDispatch(); 
  useEffect(() => {
    // Check sessionStorage or localStorage for the user ID on app initialization
    const storedUserId = sessionStorage.getItem(USER_ID_KEY);
    if (storedUserId) {
      // Dispatch an action to restore the user with the stored user ID
      dispatch(restoreUser({ id: storedUserId }));
    }
  }, [dispatch]);
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
