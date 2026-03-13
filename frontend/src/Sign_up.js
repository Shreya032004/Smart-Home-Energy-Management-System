import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Sign_up.css";

function Signup() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    fname: "",
    lname: "",
    email: "",
    address: "",
    phone: "",
    gender: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {

      const response = await fetch("http://localhost:8080/api/otp/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: form.email })
      });

      if (response.ok) {

        alert("OTP sent to your email");

        navigate("/verify-otp", { state: { email: form.email, fromSignup: true } });

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

        {/* Left Info Section */}
        <div className="info-section">
          <h2>Smart Home Energy Management System</h2>
          <p>This system helps monitor and control electricity usage in homes.</p>
          <p>It reduces power wastage and helps users save energy and money.</p>
        </div>

        {/* Right Form Section */}
        <div className="form-section">
          <h1>Register Here</h1>

          <form onSubmit={handleSubmit}>

            <label>First Name</label>
            <input
              type="text"
              name="fname"
              placeholder="Enter your first name"
              value={form.fname}
              onChange={handleChange}
              required
            />

            <label>Last Name</label>
            <input
              type="text"
              name="lname"
              placeholder="Enter your last name"
              value={form.lname}
              onChange={handleChange}
              required
            />

            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="example@gmail.com"
              value={form.email}
              onChange={handleChange}
              required
            />

            <label>Address</label>
            <input
              type="text"
              name="address"
              placeholder="Enter your home address"
              value={form.address}
              onChange={handleChange}
              required
            />

            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="10-digit mobile number"
              value={form.phone}
              onChange={handleChange}
              required
            />

            <div className="gender-group">
              <label>Gender</label>

              <div className="gender-options">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    onChange={handleChange}
                  /> Male
                </label>

                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    onChange={handleChange}
                  /> Female
                </label>

                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Other"
                    onChange={handleChange}
                  /> Other
                </label>
              </div>
            </div>

            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={form.password}
              onChange={handleChange}
              required
            />

            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Re-enter your password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />

            <div className="btn-group">

              <button type="submit" className="submit-btn">
                Sign Up
              </button>

              <button type="reset" className="reset-btn">
                Reset
              </button>

            </div>

            <p>
              Already have an account <Link to="/Login">Login</Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;