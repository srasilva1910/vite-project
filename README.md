# 🏥 StayHealthy

Modern full-stack medical appointment management platform built with React, Node.js, Express, and MongoDB Atlas.

StayHealthy allows users to browse healthcare services, manage appointments, and interact with a responsive healthcare-focused interface designed with modern frontend development practices.

---

## 🚀 Live Demo

Frontend: https://stayhealthyf.onrender.com/

---

## ✨ Features

✨ Features

* Responsive healthcare-focused UI
* Appointment scheduling system
* Secure frontend-backend communication
* REST API integration
* MongoDB Atlas cloud database
* Dynamic routing with React Router
* Scalable client-server architecture
* Environment-based configuration

---

## 🛠 Tech Stack

### Frontend
- React
- Vite
- React Router
- Axios
- CSS

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas
- Mongoose

---

## 🏗 Architecture

StayHealthy follows a full-stack client-server architecture:

- The frontend is built with React + Vite
- The backend API is powered by Express.js
- MongoDB Atlas handles cloud data persistence
- Mongoose is used as the ODM layer
- Axios manages frontend-backend communication

---

## 📁 Project Structure

```bash
stayhealthy/
│
├── client/        # React + Vite frontend
├── server/        # Express backend API
└── README.md
```

---

## ⚙️ Prerequisites

Before running the project locally, make sure you have:

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB Atlas account

---

## 🔧 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/srasilva1910/med_appt.git
cd med_appt
```

---

### 2. Backend Setup

Navigate to the server folder:

```bash
cd server
npm install
```

Create a `.env` file inside `/server`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Run the backend server:

```bash
npm start
```

Backend will run at:

```bash
http://localhost:5000
```

---

### 3. Frontend Setup

Navigate to the client folder:

```bash
cd ../client
npm install
```

Create a `.env` file inside `/client`:

```env
VITE_API_URL=http://localhost:5000
```

Run the frontend:

```bash
npm run dev
```

Frontend will run at:

```bash
http://localhost:5173
```

---

## 📡 API Overview

| Method | Endpoint | Description |
|---|---|---|
| GET | /appointments | Fetch appointments |
| POST | /appointments | Create appointment |
| GET | /doctors | Fetch doctors |
| POST | /users | Register user |

---

## 🌱 Future Improvements

- Role-based access
- Calendar integration
- Notifications system
- Docker support
- Automated testing
- CI/CD pipeline

---

## 📚 Learning Goals

This project was developed as part of the IBM Frontend Development Professional Certificate on Coursera, with the goal of strengthening:

- Full-stack development skills
- REST API integration
- React application architecture
- Backend development with Express
- Database modeling with MongoDB

---

## 👨‍💻 Author

Developed by Suellen Silva.

GitHub:
https://github.com/srasilva1910

## 📸 Screenshots

### Homepage
![Homepage](./screenshots/home.png)
