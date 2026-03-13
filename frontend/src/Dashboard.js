import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { FaLightbulb, FaFan, FaTv, FaBolt } from "react-icons/fa";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import { Line, Pie } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Tooltip,
  Legend
);

function Dashboard() {

  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn !== "true") {
      navigate("/Login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/Login");
  };

  /* ===== DEVICES ===== */

  const [devices, setDevices] = useState([
    { name: "Living Room AC", status: true },
    { name: "Bedroom Fan", status: false },
    { name: "Kitchen Lights", status: true },
    { name: "Water Heater", status: false }
  ]);

  const toggleDevice = (index) => {
    const updated = [...devices];
    updated[index].status = !updated[index].status;
    setDevices(updated);
  };

  /* ===== WEEKLY ENERGY DATA ===== */

  const [weeklyData, setWeeklyData] = useState([8, 12, 6, 14, 10, 9, 11]);

  const lineData = {
    labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
    datasets: [
      {
        label: "Energy Usage (kWh)",
        data: weeklyData,
        borderColor: "#4caf50",
        backgroundColor: "rgba(76,175,80,0.2)",
        tension: 0.4,
        fill: true
      }
    ]
  };

  /* ===== PIE CHART DATA ===== */

  const pieData = {
    labels: ["AC", "Fan", "Lights", "Heater"],
    datasets: [
      {
        data: [40, 20, 25, 15],
        backgroundColor: [
          "#ff6384",
          "#36a2eb",
          "#ffce56",
          "#4caf50"
        ]
      }
    ]
  };

  

  /* ===== ENERGY CALCULATOR ===== */

  const [watt, setWatt] = useState("");
  const [hours, setHours] = useState("");
  const [energy, setEnergy] = useState(null);
  const [cost, setCost] = useState(null);

  /* ===== ENERGY SAVING LOGIC ===== */

  const [normalUsage] = useState(15); 
  const [currentUsage, setCurrentUsage] = useState(12.5);
  const [savedPercent, setSavedPercent] = useState(0);

  useEffect(() => {

    const saved = ((normalUsage - currentUsage) / normalUsage) * 100;

    setSavedPercent(saved.toFixed(1));

  }, [currentUsage, normalUsage]);

  const calculateEnergy = () => {

    const energyUsed = (watt * hours) / 1000;
    const pricePerUnit = 8;

    setEnergy(energyUsed.toFixed(2));
    setCost((energyUsed * pricePerUnit).toFixed(2));

    setCurrentUsage(energyUsed);

    setWeeklyData(prev => {
      const newData = [...prev];
      newData[6] = energyUsed;
      return newData;
    });

  };

  /* ===== BILL PREDICTION ===== */

  const [dailyUsage, setDailyUsage] = useState("");
  const [predictedBill, setPredictedBill] = useState(null);

  const predictBill = () => {

    const pricePerUnit = 8;
    const days = 30;

    const bill = dailyUsage * pricePerUnit * days;

    setPredictedBill(bill.toFixed(2));

  };

  return (
    <div className="dashboard-container">

      <button className="logout-btn" onClick={handleLogout}>Logout</button>

      <h1 className="dashboard-title">Smart Home Energy Dashboard</h1>

      {/* ===== SERVICES ===== */}

      <div className="services-section">

        <h2>Smart Home Services</h2>

        <div className="services-grid">

          <div className="service-card">
            <FaLightbulb className="service-icon"/>
            <p>Smart Lighting</p>
          </div>

          <div className="service-card">
            <FaFan className="service-icon"/>
            <p>Fan Control</p>
          </div>

          <div className="service-card">
            <FaTv className="service-icon"/>
            <p>Appliance Monitoring</p>
          </div>

          <div className="service-card">
            <FaBolt className="service-icon"/>
            <p>Energy Tracking</p>
          </div>

        </div>

      </div>

      {/* ===== SUMMARY CARDS ===== */}

      <div className="summary-cards">

        <div className="card">
          <h2>{currentUsage.toFixed(1)} kWh</h2>
          <p>Total Energy Today</p>
        </div>

        <div className="card">
          <h2>₹{(currentUsage*8).toFixed(0)}</h2>
          <p>Estimated Cost</p>
        </div>

        <div className="card">
          <h2>{devices.filter(d=>d.status).length}</h2>
          <p>Active Devices</p>
        </div>

        <div className="card">
          <h2>{savedPercent}%</h2>
          <p>Energy Saved</p>
        </div>

      </div>

      {/* ===== LINE GRAPH ===== */}

      <div className="chart-section">

        <h2>Weekly Energy Consumption</h2>

        <Line data={lineData} />

      </div>

      {/* ===== PIE CHART ===== */}

      <div className="pie-section">

        <h2>Appliance Energy Usage</h2>

        <Pie data={pieData} />

      </div>

      {/* ===== AREA ENERGY CONSUMPTION ===== */}

<div className="area-energy">

  <h2>Electricity Consumption by Area</h2>

  <table className="energy-table">

    <thead>
      <tr>
        <th>Area</th>
        <th>Appliances</th>
        <th>Units / Day (kWh)</th>
        <th>Estimated Cost (₹)</th>
      </tr>
    </thead>

    <tbody>

      <tr>
        <td>Living Room</td>
        <td>TV, Lights, AC</td>
        <td>4.2</td>
        <td>₹33.6</td>
      </tr>

      <tr>
        <td>Bedroom</td>
        <td>Fan, Lights</td>
        <td>3.1</td>
        <td>₹24.8</td>
      </tr>

      <tr>
        <td>Kitchen</td>
        <td>Refrigerator, Lights</td>
        <td>2.6</td>
        <td>₹20.8</td>
      </tr>

      <tr>
        <td>Bathroom</td>
        <td>Water Heater</td>
        <td>1.4</td>
        <td>₹11.2</td>
      </tr>

    </tbody>

  </table>

</div>

      {/* ===== DEVICE CONTROL ===== */}

      <div className="device-section">

        <h2>Smart Devices</h2>

        <div className="device-grid">

          {devices.map((device, index) => (

            <div key={index} className="device-card">

              <h3>{device.name}</h3>

              <button
                className={device.status ? "on-btn" : "off-btn"}
                onClick={() => toggleDevice(index)}
              >
                {device.status ? "ON" : "OFF"}
              </button>

            </div>

          ))}

        </div>

      </div>

      {/* ===== ENERGY CALCULATOR ===== */}

      {/* ===== CALCULATOR + BILL SECTION ===== */}

<div className="energy-tools">

  {/* ENERGY CALCULATOR */}

  <div className="calculator-section">

    <h2>Energy Consumption Calculator</h2>

    <div className="calculator-box">

      <label>Appliance Wattage (W)</label>

      <input
        type="number"
        value={watt}
        onChange={(e)=>setWatt(e.target.value)}
      />

      <label>Usage Hours per Day</label>

      <input
        type="number"
        value={hours}
        onChange={(e)=>setHours(e.target.value)}
      />

      <button onClick={calculateEnergy}>
        Calculate Consumption
      </button>

      {energy && (

        <div className="result-box">

          <p>Energy Used: {energy} kWh/day</p>
          <p>Estimated Cost: ₹{cost}</p>

        </div>

      )}

    </div>

  </div>


  {/* BILL PREDICTION */}

  <div className="bill-section">

    <h2>Monthly Electricity Bill Prediction</h2>

    <div className="bill-box">

      <label>Average Daily Usage (kWh)</label>

      <input
        type="number"
        value={dailyUsage}
        onChange={(e)=>setDailyUsage(e.target.value)}
      />

      <button onClick={predictBill}>
        Predict Monthly Bill
      </button>

      {predictedBill && (

        <div className="bill-result">

          <h3>Estimated Monthly Bill</h3>
          <p>₹ {predictedBill}</p>

        </div>

      )}

    </div>

  </div>

</div>

      {/* ===== ENERGY TIPS ===== */}

      <div className="tips-section">

        <h2>Energy Saving Tips</h2>

        <ul>
          <li>Turn off appliances when not in use.</li>
          <li>Use LED lighting to reduce energy consumption.</li>
          <li>Monitor peak usage hours to lower electricity bills.</li>
        </ul>

      </div>

    </div>
  );
}

export default Dashboard;