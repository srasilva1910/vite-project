import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './DoctorCardIC.css';
import AppointmentFormIC from '../AppointmentFormIC/AppointmentFormIC';
import { v4 as uuidv4 } from 'uuid';

const DoctorCardIC = ({ name, speciality, experience, ratings }) => {
  const [showModal, setShowModal] = useState();
  const [appointments, setAppointments] = useState(() => {
  return JSON.parse(localStorage.getItem('appointmentData')) || [];
});

  const handleCancel = (appointmentId) => {
  const updated = appointments.filter(a => a.id !== appointmentId);

  setAppointments(updated);

  localStorage.setItem('appointmentData', JSON.stringify(updated));
    window.dispatchEvent(new Event("appointmentCreated")); // 👈 importante

};

  const handleFormSubmit = (appointmentData) => {
  const newAppointment = {
    id: uuidv4(),
    doctorName: name,
    doctorSpeciality: speciality,
    ...appointmentData,
  };

  const updated = [...appointments, newAppointment];

  setAppointments(updated);
  localStorage.setItem('appointmentData', JSON.stringify(updated));

  localStorage.setItem('doctorData', JSON.stringify({
    name,
    speciality
  }));

  window.dispatchEvent(new Event("appointmentCreated"));

  //setShowModal(false);
};

const [viewMode, setViewMode] = useState("form"); 
// "form" | "details"

const doctorAppointments = appointments.filter(
  a => a.doctorName === name
);

  return (
    <div className="doctor-card-container">

      <div className="doctor-card-details-container">
        <div className="doctor-card-profile-image-container">
          <img
            src={`https://ui-avatars.com/api/?name=${name}&background=2190FF&color=fff`}
            alt={name}
            style={{ width: "60px", height: "60px", borderRadius: "50%" }}
          />
        </div>

        <div className="doctor-card-details">
          
          <div>{name}</div>
          <div>{speciality}</div>
          <div>{experience} years experience</div>
          <div>Ratings: {ratings}</div>
        </div>
      </div>

      <div className="doctor-card-options-container">
  <button
  onClick={() => setShowModal(true)}
  className="book-appointment-btn"
>
  <div>
    {appointments.length > 0 ? 'View Appointment' : 'Book Appointment'}
  </div>
  <div>No Booking Fee</div>
</button>


<Popup
modal 
open={showModal}
  onClick={() => {
  setViewMode(appointments.length > 0 ? "details" : "form");
  setShowModal(true);
}}
>
    <div style={{ padding: '20px', textAlign: 'center' }}>

      <img
        src={`https://ui-avatars.com/api/?name=${name}&background=2190FF&color=fff`}
        alt={name}
        style={{
          width: "90px",
          height: "90px",
          borderRadius: "50%",
          marginBottom: "10px"
        }}
      />

      <h3>{name}</h3>
      <p>{speciality}</p>
      <p>{experience} years experience</p>
      <p>Ratings: {ratings}</p>

{viewMode === "details" ? (
appointments.length > 0 && (
  <div>
    <p>Booking confirmed</p>

    <button onClick={() => {
      handleCancel(appointments[appointments.length - 1].id);
      setViewMode("form");
    }}>
      Cancel
    </button>

    <button onClick={() => setShowModal(false)}>
      Close
    </button>
  </div>
)) : (
  <AppointmentFormIC
    onSubmit={(data) => {
      handleFormSubmit(data);
      setViewMode("details"); // 👈 cambia a confirmación
    }}
  />
)}
    </div>
</Popup>
      </div>

    </div>
  );
};

export default DoctorCardIC;