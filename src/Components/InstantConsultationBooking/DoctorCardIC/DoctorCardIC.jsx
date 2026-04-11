import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './DoctorCardIC.css';
import AppointmentFormIC from '../AppointmentFormIC/AppointmentFormIC';
import { v4 as uuidv4 } from 'uuid';

const DoctorCardIC = ({ name, speciality, experience, ratings }) => {
  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState([]);

  const handleCancel = (appointmentId) => {
    setAppointments(prev =>
      prev.filter(a => a.id !== appointmentId)
    );
  };

  const handleFormSubmit = (appointmentData) => {
    const newAppointment = {
      id: uuidv4(),
      ...appointmentData,
    };

    setAppointments(prev => [...prev, newAppointment]);
    setShowModal(false);
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
          
          <div>{name}</div>
          <div>{speciality}</div>
          <div>{experience} years experience</div>
          <div>Ratings: {ratings}</div>
        </div>
      </div>

      <div className="doctor-card-options-container">
        <Popup
          trigger={
            <button
              onClick={() => setShowModal(true)}
              className="book-appointment-btn"
            >
              <div>
                {appointments.length > 0 ? 'View Appointment' : 'Book Appointment'}
              </div>
              <div>No Booking Fee</div>
            </button>
          }
          modal
          open={showModal}
          onClose={() => setShowModal(false)}
        >
        <div style={{ padding: '20px', textAlign: 'center' }}>
  
                    {/* ✅ IMAGEN DEL DOCTOR */}
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

                    {/* ✅ INFO */}
                    <h3>{name}</h3>
                    <p>{speciality}</p>
                    <p>{experience} years experience</p>
                    <p>Ratings: {ratings}</p>
            
            {appointments.length > 0 ? (
              appointments.map((a) => (
                <div key={a.id}>
                  <p>Booking confirmed</p>

                  <button onClick={() => handleCancel(a.id)}>
                    Cancel
                  </button>
                </div>
              ))
            ) : (
              <AppointmentFormIC
                doctorName={name}
                doctorSpeciality={speciality}
                onSubmit={handleFormSubmit}
              />
            )}
          </div>
        </Popup>
      </div>

    </div>
  );
};

export default DoctorCardIC;