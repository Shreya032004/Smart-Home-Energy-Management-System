import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./Home";
import Login from "./Login";
import VerifyOTP from "./VerifyOTP";
import Sign_up from "./Sign_up";
import Dashboard from "./Dashboard";
import Demo from "./Demo";

function App() {
  return (
    <Routes>

      {/* Home Page */}
      <Route path="/" element={<Home />} />

      {/* Login Page */}
      <Route path="/Login" element={<Login />} />

      {/* OTP Verification */}
      <Route path="/verify-otp" element={<VerifyOTP />} />

      {/* Signup Page */}
      <Route path="/signup" element={<Sign_up />} />

      {/* Dashboard */}
      <Route path="/Dashboard" element={<Dashboard />} />

      {/* Demo Page */}
      <Route path="/Demo" element={<Demo />} />

    </Routes>
  );
}

export default App;