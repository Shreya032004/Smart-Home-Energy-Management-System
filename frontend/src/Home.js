import { Link } from "react-router-dom";
import "./Home.css";
import { useState } from "react";



function Home() {

  const [activeIndex, setActiveIndex] = useState(null);

const toggleFAQ = (index) => {
  setActiveIndex(activeIndex === index ? null : index);
};

const faqData = [
  {
    question: "How does the Smart Home Energy System work?",
    answer:
      "The system tracks real-time energy consumption of connected devices and provides analytics to optimize usage."
  },
  {
    question: "Can I control devices remotely?",
    answer:
      "Yes, you can turn devices ON/OFF and monitor their energy usage from anywhere using the dashboard."
  },
  {
    question: "Does it help reduce electricity bills?",
    answer:
      "Yes, by identifying high energy-consuming devices and suggesting optimizations, it reduces overall power consumption."
  },
  {
    question: "Is my data secure?",
    answer:
      "All user data is encrypted and securely stored to ensure privacy and protection."
  }
];
  return (
    <div className="home-container">

      {/* ===== NAVBAR ===== */}
      <nav className="navbar">
        <div className="logo">SmartHome</div>

        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#testimonials">Testimonials</a></li>
          <li><a href="#faqs">FAQs</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

        <div className="nav-buttons">
          <Link to="/login" className="login-btn">
            Login
          </Link>

          <Link to="/signup" className="signup-btn">
            Signup
          </Link>
        </div>
      </nav>
      


      {/* ===== HERO SECTION ===== */}
      <section id="home" className="hero">
        <h1>Smart Home Energy Management</h1>
        <p>
          Monitor and optimize your home electricity usage
          with intelligent real-time analytics and smart device control.
        </p>

        <div className="hero-buttons">
          <button className="primary-btn">Explore Features</button>
          <Link to="/demo" className="secondary-btn">View Dashboard Demo</Link>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
<section id="features" className="features">
  <h2>Key Features</h2>
  <div className="feature-grid">
    <div className="feature-card">
      <h3>Real-Time Monitoring</h3>
      <p>Track live electricity usage and monitor energy consumption instantly.</p>
    </div>

    <div className="feature-card">
      <h3>Smart Device Control</h3>
      <p>Turn devices ON/OFF remotely and manage home appliances efficiently.</p>
    </div>

    <div className="feature-card">
      <h3>Energy Analytics</h3>
      <p>View monthly usage reports and analyze power consumption trends.</p>
    </div>

    <div className="feature-card">
      <h3>Cost Optimization</h3>
      <p>Reduce electricity bills by identifying high power usage devices.</p>
    </div>
  </div>
</section>

{/* ===== HOW IT WORKS ===== */}
<section id="about" className="how-it-works">
  <h2>How It Works</h2>
  <div className="steps">
    <div className="step">
      <h4>1. Register Account</h4>
      <p>Create your SmartHome account securely.</p>
    </div>

    <div className="step">
      <h4>2. Connect Devices</h4>
      <p>Add your smart devices to the system.</p>
    </div>

    <div className="step">
      <h4>3. Monitor & Control</h4>
      <p>Track energy usage and manage devices easily.</p>
    </div>
  </div>
</section>

{/* ===== STATS SECTION ===== */}
<section id="testimonials" className="stats">
  <div className="stat-box">
    <h2>30%</h2>
    <p>Energy Savings</p>
  </div>
  <div className="stat-box">
    <h2>24/7</h2>
    <p>Monitoring</p>
  </div>
  <div className="stat-box">
    <h2>100+</h2>
    <p>Supported Devices</p>
  </div>
</section>

<section id="faqs" className="faq-section">
      <h2>Frequently Asked Questions</h2>

      <div className="faq-container">
        {faqData.map((item, index) => (
          <div key={index} className="faq-item">
            <div
              className="faq-question"
              onClick={() => toggleFAQ(index)}
            >
              {item.question}
              <span>{activeIndex === index ? "-" : "+"}</span>
            </div>

            {activeIndex === index && (
              <div className="faq-answer">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>



      {/* ===== FOOTER ===== */}
      <footer id="contact" className="footer">
        <div>
          <h3>SmartHome</h3>
          <p>Efficient energy monitoring and smart automation system.</p>
        </div>

        <div>
          <h4>Quick Links</h4>
          <p>Home</p>
          <p>About</p>
          <p>Features</p>
        </div>
        
        <div className="footer-links">
          <h4>Privacy</h4>
          <p>Privacy Policy</p>
          <p>Terms & Conditions</p>
          <p>Refund Policy</p>
        </div>

        <div>
          <h4>Contact</h4>
          <p>+91 9876543210</p>
          <p>shreyadubey@gmail.com</p>
        </div>
      </footer>

    </div>
  );
}

export default Home;
