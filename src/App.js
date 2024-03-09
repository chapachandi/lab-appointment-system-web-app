import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/layouts/Sidebar';
import Login from './pages/login/Login';
import Registration from './pages/registration/Registration';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route
            path="/home/*"
            element={
              // Use the Navigate component to redirect to the login page if no valid route is matched
              <Navigate to="/" replace />
            }
          />
          <Route path="/home" element={<Sidebar />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
