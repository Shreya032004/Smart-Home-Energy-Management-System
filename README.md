# Smart-Home-Energy-Management-System

## 📌 Overview
The Smart Home System is a web application designed to control and monitor smart devices in a home environment. It allows users to manage devices, view their status, and automate home operations.

## 🚀 Features
- User Authentication
- Device Monitoring
- Smart Device Control
- Real-time Updates
- Responsive Web Interface

## 🛠️ Technologies Used
- Frontend: React.js
- Backend: Java / Spring Boot
- Database: MySQL
- Version Control: Git & GitHub

## 📂 Project Structure
Smart-Home-Energy-Management-System
│
├── frontend/ (React)
│   ├── src/
│   │   ├── components
│   │   ├── Dashboard.js
│   │   ├── Login.js
│   │   ├── Sign_up.js
│   │   ├── VerifyOTP.js
│
├── backend/ (Spring Boot)
│   ├── controller
│   ├── service
│   ├── repository
│   ├── model
│
├── database
│   └── MySQL schema

🔄 API Endpoints
🔐 Auth APIs
Method	Endpoint	Description
POST	/api/auth/send-otp	Send OTP
POST	/api/auth/verify-otp	Verify OTP
POST	/api/auth/signup	Register user
POST	/api/auth/login	Login

⚡ Device APIs
Method	Endpoint	Description
GET	/api/devices/{userId}	Get user devices
POST	/api/devices	Add device
PUT	/api/devices/{id}	Toggle device

📸 Screens
Signup & OTP Verification
Dashboard with charts
Device control panel
Energy calculator

🔥 Future Enhancements
Real-time IoT integration
Mobile app support
AI-based energy prediction
User-specific analytics
Notifications & alerts

📌 License

This project is licensed under the MIT License.
