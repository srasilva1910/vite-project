import React from "react";
import "./Appointments.css";

const appointments = [
  {
    id: 1,
    doctor: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    date: "May 28, 2026",
    time: "10:30 AM",
  },
  {
    id: 2,
    doctor: "Dr. Michael Lee",
    specialty: "Dermatologist",
    date: "June 02, 2026",
    time: "2:00 PM",
  },
];

const Appointments = () => {
  return (
    <div className="appointments-card">

      <h3>📅 Upcoming Appointments</h3>

      {appointments.map((appt) => (
        <div
          className="appointment-item"
          key={appt.id}
        >

          <div>
            <h4>{appt.doctor}</h4>

            <p>{appt.specialty}</p>
          </div>

          <div className="appointment-date">
            <span>{appt.date}</span>
            <strong>{appt.time}</strong>
          </div>

        </div>
      ))}

    </div>
  );
};

export default Appointments;