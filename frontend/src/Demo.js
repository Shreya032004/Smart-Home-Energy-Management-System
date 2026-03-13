import { Link } from "react-router-dom";
import "./Demo.css";

function Demo() {
  return (
    <div className="demo-container">

      <h1>Smart Home Dashboard Demo</h1>
      <p>
        This is a demonstration of how the Smart Home Energy 
        Management Dashboard works with real-time analytics 
        and smart device monitoring.
      </p>

      {/* Demo Preview Section */}
      <div className="demo-preview">
        <div className="demo-card">
          <h2>12.5 kWh</h2>
          <p>Today's Usage</p>
        </div>

        <div className="demo-card">
          <h2>₹145</h2>
          <p>Estimated Cost</p>
        </div>

        <div className="demo-card">
          <h2>30%</h2>
          <p>Energy Saved</p>
        </div>
      </div>

      <div className="demo-buttons">
        <Link to="/login" className="primary1-btn">
          Login to Access Full Dashboard
        </Link>

        <Link to="/" className="secondary1-btn">
          Back to Home
        </Link>
      </div>

    </div>
  );
}

export default Demo;