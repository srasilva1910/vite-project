// Following code has been commented with appropriate comments for your reference.
import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Notification.css'

// Function component Notification to display user notifications
const Notification = ({ children }) => {
  // State variables to manage user authentication, username, doctor data, and appointment data
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [doctorData, setDoctorData] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);    const [showNotification, setShowNotification] = useState(true);


const handleCancel = (appointmentId) => {
  const updated = appointmentData.filter(a => a.id !== appointmentId);

  setAppointmentData(updated);
  localStorage.setItem('appointmentData', JSON.stringify(updated));

  setShowNotification(false); // 👈 ocultar
};

  // useEffect hook to perform side effects in the component
useEffect(() => {
  const loadData = () => {
        console.log("🔥 evento recibido");

    const storedUsername = sessionStorage.getItem('email');
    const storedDoctorData = JSON.parse(localStorage.getItem('doctorData')) || null;
    const storedAppointmentData = JSON.parse(localStorage.getItem('appointmentData')) || null;

    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }


    setDoctorData(storedDoctorData);
    setAppointmentData(storedAppointmentData);

    setShowNotification(true);

  };

  loadData();


  // 👇 escuchar evento personalizado
  window.addEventListener("appointmentCreated", loadData);

  return () => {
    window.removeEventListener("appointmentCreated", loadData);
  };

}, []);

const lastAppointment = Array.isArray(appointmentData)
  ? appointmentData[appointmentData.length - 1]
  : appointmentData;

  // Return JSX elements to display Navbar, children components, and appointment details if user is logged in
  return (
    <div>
      <Navbar></Navbar>
      {/* Render children components */}
      {children}
      {/* Display appointment details if user is logged in and appointmentData is available */}
      {showNotification && lastAppointment && (          <div className="appointment-card">
            <div className="appointment-card__content">

              <h4 style={{ marginBottom: "8px", color: "#22c55e" }}>
                ✅ Appointment Confirmed
              </h4>

              <p><strong>👨‍⚕️ Doctor:</strong> {doctorData?.name}</p>
              <p><strong>📅 Date:</strong> {lastAppointment.date}</p>
              <p><strong>⏰ Time:</strong> {lastAppointment.slot}</p>
               <button
                  onClick={() => setShowNotification(false)}
                  style={{
                    position: "absolute",
                    top: "8px",
                    right: "10px",
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    fontSize: "16px"
                  }}
                >
                  ✖
                </button>
                  <button onClick={() => handleCancel(lastAppointment.id)}>
                    Cancel
                  </button>
            </div>
          </div>
        )}

    </div>
  );
};

// Export Notification component for use in other parts of the application
export default Notification;
