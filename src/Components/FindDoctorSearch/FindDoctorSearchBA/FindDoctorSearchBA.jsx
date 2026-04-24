import React, { useState } from 'react';
import './FindDoctorSearchBA.css';
import { useNavigate } from 'react-router-dom';
import searchIcon from '../../../assets/searchIcon.png';

const initSpeciality = [
  'Dentist',
  'Gynecologist/obstetrician',
  'General Physician',
  'Dermatologist',
  'Ear-nose-throat (ent) Specialist',
  'Homeopath',
  'Ayurveda'
];

const FindDoctorSearchBA = () => {
  const [doctorResultHidden, setDoctorResultHidden] = useState(true);
  const [searchDoctor, setSearchDoctor] = useState('');
  const [specialities] = useState(initSpeciality);

  const navigate = useNavigate();

  const handleDoctorSelect = (speciality) => {
    setSearchDoctor(speciality);
    setDoctorResultHidden(true);

    // ✅ SOLO navegar (SIN reload)
    navigate(`/find-doctor?speciality=${speciality}`);
  };

  return (
    <div className='finddoctor'>
        <h1>Find a doctor and book an appointment</h1>

<div className="home-search-container">
  <div className="search-wrapper">

    <input
      type="text"
      className="search-input"
      placeholder="Search doctors, clinics, hospitals..."
      onFocus={() => setDoctorResultHidden(false)}
      onBlur={() => setDoctorResultHidden(true)}
      value={searchDoctor}
      onChange={(e) => setSearchDoctor(e.target.value)}
    />

    <img
      src={searchIcon}
      alt="search"
      className="search-icon"
      onMouseDown={(e) => e.preventDefault()}
      onClick={() => {
        if (searchDoctor.trim()) {
          navigate(`/find-doctor?speciality=${searchDoctor}`);
        }
      }}
    />

    <div className="search-doctor-input-results" hidden={doctorResultHidden}>
      {specialities.map((speciality) => (
        <div
          className="search-doctor-result-item"
          key={speciality}
          onMouseDown={() => handleDoctorSelect(speciality)}
        >
          <span>{speciality}</span>
          <span>SPECIALITY</span>
        </div>
      ))}
    </div>

  </div>
</div>
    </div>
  );
};

export default FindDoctorSearchBA;