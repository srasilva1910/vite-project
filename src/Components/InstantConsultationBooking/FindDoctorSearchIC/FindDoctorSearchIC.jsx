import React, { useState } from 'react';
import './FindDoctorSearchIC.css';
import { useNavigate } from 'react-router-dom';

const initSpeciality = [
  'Dentist',
  'Gynecologist/obstetrician',
  'General Physician',
  'Dermatologist',
  'Ear-nose-throat (ent) Specialist',
  'Homeopath',
  'Ayurveda'
];

const FindDoctorSearchIC = () => {
  const [doctorResultHidden, setDoctorResultHidden] = useState(true);
  const [searchDoctor, setSearchDoctor] = useState('');
  const [specialities] = useState(initSpeciality);

  const navigate = useNavigate();

  const handleDoctorSelect = (speciality) => {
    setSearchDoctor(speciality);
    setDoctorResultHidden(true);

    // ✅ SOLO navegar (SIN reload)
    navigate(`/instant-consultation?speciality=${speciality}`);
  };

  return (
    <div className='finddoctor'>
        <h1>Find a doctor and consult instantly</h1>

        <div className="home-search-container">
          <div className="doctor-search-box">

            <input
              type="text"
              className="search-doctor-input-box"
              placeholder="Search doctors, clinics, hospitals..."
              onFocus={() => setDoctorResultHidden(false)}
              onBlur={() => setDoctorResultHidden(true)}
              value={searchDoctor}
              onChange={(e) => setSearchDoctor(e.target.value)}
            />

            {/* ✅ Vite fix */}
            <div className="findiconimg">
              <img className='findIcon' src="/images/search.svg" alt="" />
            </div>

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

export default FindDoctorSearchIC;