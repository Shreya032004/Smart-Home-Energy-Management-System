import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import bg from "./assets/image.png";

function Login() {

  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await fetch("http://localhost:8080/api/otp/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: email })
      });

      if (response.ok) {
        navigate("/Verify-OTP", { state: { email: email } });
      } else {
        alert("Failed to send OTP");
      }

    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <div className="wrapper">

      <div className="container">

        <h1>Login</h1>

        <form onSubmit={handleSubmit}>

          <label>Email Address</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <small>Enter the email you used during registration.</small>

          <br /><br />

          <button type="submit">Send OTP</button>

          <div className="link">
            <p>
              Don’t have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </div>

        </form>

      </div>

    </div>
  );
}

export default Login;