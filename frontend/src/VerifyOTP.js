import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function VerifyOTP() {

  const [otp, setOtp] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;
  const fromSignup = location.state?.fromSignup;

  const handleVerify = async () => {

    try {

      const response = await fetch("http://localhost:8080/api/otp/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, otp })
      });

      if (response.ok) {

        if (fromSignup) {

          alert("Signup successful! Please login.");

          navigate("/Login");

        } else {

          localStorage.setItem("isLoggedIn", "true");

          navigate("/Dashboard");

        }

      } else {

        alert("Invalid or Expired OTP");

      }

    } catch (error) {

      console.error(error);
      alert("Server error");

    }

  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>

      <h2>Enter OTP</h2>

      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <br /><br />

      <button onClick={handleVerify}>
        Verify OTP
      </button>

    </div>
  );
}

export default VerifyOTP;