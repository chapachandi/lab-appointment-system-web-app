// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Login from './pages/login/Login';

const Inbox = () => <div></div>;
const Starred = () => <div></div>;

function App() {
  return (
    <Router>
      <div className="App">
        <Login />
        <Routes>
          {/* <Route path="/" element={<Login />} /> */}
          <Route path="/appointment" element={<Inbox />} />
          <Route path="/starred" element={<Starred />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
