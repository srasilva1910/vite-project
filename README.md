# Frontend Capstone Project - App Name: 🏥 StayHealthy 

A full-stack web application built with **React + Vite** for the frontend, **Node.js + Express** for the backend, and **MongoDB Atlas** as the database. Developed as a frontend capstone project for the course Frontend Development, from IBM in Coursera.

🔗 Live Demo: https://stayhealthyf.onrender.com/

---

## 🚀 Tech Stack

### Frontend

* React
* Vite
* Axios
* React Router

### Backend

* Node.js
* Express
* MongoDB Atlas
* Mongoose

---

## 📁 Project Structure

```
vite-project/
│
├── client/        # Frontend (React + Vite)
├── server/        # Backend (Node + Express)
└── README.md
```

---

## ⚙️ Prerequisites

Make sure you have installed:

* Node.js (v18 or higher recommended)
* npm or yarn
* A MongoDB Atlas account

---

## 🔧 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/srasilva1910/vite-project.git
cd vite-project
```

---

### 2. Backend Setup

```bash
cd server
npm install
```

#### Create a `.env` file inside `/server`

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
```

#### Run the backend server

```bash
npm run dev
```

Backend will run on:

```
http://localhost:5000
```

---

### 3. Frontend Setup

```bash
cd ../client
npm install
```

#### Create a `.env` file inside `/client`

```env
VITE_API_URL=http://localhost:5000
```

#### Run the frontend

```bash
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

---

## 🌐 Environment Variables

### Backend (`/server/.env`)

* `PORT` – Server port
* `MONGO_URI` – MongoDB Atlas connection string

### Frontend (`/client/.env`)

* `VITE_API_URL` – Backend API URL

---

## 📦 Available Scripts

### Backend

```bash
npm run dev     # Run with nodemon
npm start       # Run in production
```

### Frontend

```bash
npm run dev     # Development mode
npm run build   # Production build
npm run preview # Preview build
```

---

## 🚀 Deployment

The app is deployed on **Render**.

For deployment:

* Configure environment variables properly
* Update the frontend API URL to point to the production backend

---

## 🧪 Future Improvements

* Appointments agenda
* Add testing (Jest / React Testing Library)
* Improve UI/UX
* Docker support

---

## 👨‍💻 Author

S. R. A. da Silva

---

## 📄 License

MIT


## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
