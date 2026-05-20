import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './DoctorCardBA.css';
import AppointmentFormBA from '../AppointmentFormBA/AppointmentFormBA';
import { v4 as uuidv4 } from 'uuid';

const DoctorCardBA = ({ name, speciality, experience, ratings }) => {

  const [showModal, setShowModal] = useState(false);

  const [appointments, setAppointments] = useState([]);

  const [viewMode, setViewMode] = useState("form");

  // ✅ sincronizar localStorage
  useEffect(() => {

    const syncAppointments = () => {
      const storedAppointments =
        JSON.parse(localStorage.getItem('appointmentData')) || [];

      setAppointments(storedAppointments);
    };

    // 👇 cargar al iniciar
    syncAppointments();

    // 👇 escuchar cambios
    window.addEventListener(
      "appointmentCreated",
      syncAppointments
    );

    return () => {
      window.removeEventListener(
        "appointmentCreated",
        syncAppointments
      );
    };

  }, []);

  // ✅ citas SOLO de este doctor
  const doctorAppointments = appointments.filter(
    (a) => a.doctorName === name
  );

  const handleCancel = (appointmentId) => {

    const updated = appointments.filter(
      a => a.id !== appointmentId
    );

    setAppointments(updated);

    localStorage.setItem(
      'appointmentData',
      JSON.stringify(updated)
    );

    window.dispatchEvent(
      new Event("appointmentCreated")
    );
  };

  const handleFormSubmit = (appointmentData) => {

    const newAppointment = {
      id: uuidv4(),
      doctorName: name,
      doctorSpeciality: speciality,
      ...appointmentData,
    };

    const updated = [
      ...appointments,
      newAppointment
    ];

    setAppointments(updated);

    localStorage.setItem(
      'appointmentData',
      JSON.stringify(updated)
    );

    localStorage.setItem(
      'doctorData',
      JSON.stringify({
        name,
        speciality
      })
    );

    window.dispatchEvent(
      new Event("appointmentCreated")
    );
  };

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

  <h3 className="doctor-name">
    {name}
  </h3>

  <p className="doctor-speciality">
    {speciality}
  </p>

  <p className="doctor-experience">
    {experience} years experience
  </p>

  <p className="doctor-rating">
    ⭐ {ratings}
  </p>

</div>
      </div>

      <div className="doctor-card-options-container">
<button
  onClick={() => {
    setViewMode(
      doctorAppointments.length > 0 ? "details" : "form"
    );

    setShowModal(true);
  }}
  className="book-appointment-btn"
>
  <div>
    {doctorAppointments.length > 0
      ? 'View Appointment'
      : 'Book Appointment'}
  </div>

  <div>No Booking Fee</div>
</button>


<Popup
  modal
  open={showModal}
  onClose={() => setShowModal(false)}
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

<div className="doctor-card-details">

  <h3 className="doctor-name">
    {name}
  </h3>

  <p className="doctor-speciality">
    {speciality}
  </p>

  <p className="doctor-experience">
    {experience} years experience
  </p>

  <p className="doctor-rating">
    ⭐ {ratings}
  </p>

</div>
{viewMode === "details" ? (
doctorAppointments.length > 0 && (
    <div>
    <p>Booking confirmed</p>

    <button onClick={() => {
handleCancel(
  doctorAppointments[doctorAppointments.length - 1].id
);      setViewMode("form");
    }}>
      Cancel
    </button>

    <button onClick={() => setShowModal(false)}>
      Close
    </button>
  </div>
)) : (
  <AppointmentFormBA
    onSubmit={(data) => {
      handleFormSubmit(data);
      setViewMode("details"); // 👈 cambia a confirmación
    }}
  />
)}

    <button
      onClick={() => setShowModal(false)}
      style={{
        marginTop: "15px",
        padding: "10px 20px",
        cursor: "pointer"
      }}
    >
      Close
    </button>

    </div>
</Popup>
      </div>

    </div>
  );
};

export default DoctorCardBA;