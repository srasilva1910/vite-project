import React, { useEffect, useState } from 'react';
import './FindDoctorSearch.css';
import { useSearchParams } from 'react-router-dom';
import FindDoctorSearchBA from './FindDoctorSearchBA/FindDoctorSearchBA';
import DoctorCardBA from './DoctorCardBA/DoctorCardBA';

const FindDoctorSearch = () => {
  const [searchParams] = useSearchParams();

  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  // FETCH SOLO UNA VEZ
  useEffect(() => {
    fetch('https://api.npoint.io/9a5543d36f1460da2f63')
      .then(res => res.json())
      .then(data => {
        setDoctors(data);
      })
      .catch(err => console.log(err));
  }, []);

  // FILTRAR CUANDO CAMBIA LA URL O LOS DOCTORS
  useEffect(() => {
    const speciality = searchParams.get('speciality');

    if (speciality) {
      const filtered = doctors.filter((doctor) =>
        doctor.speciality
          .toLowerCase()
          .includes(speciality.toLowerCase())
      );

      setFilteredDoctors(filtered);
    } else {
      setFilteredDoctors(doctors);
    }
  }, [searchParams, doctors]);

  return (
    <div className="searchpage-container">
      <FindDoctorSearchBA />

      <div className="search-results-container">
        {filteredDoctors.length > 0 ? (
          <>
            <h2>{filteredDoctors.length} doctors available</h2>

            {filteredDoctors.map((doctor) => (
              <DoctorCardBA {...doctor} key={doctor.name} />
            ))}
          </>
        ) : (
          <p>No doctors found.</p>
        )}
      </div>
    </div>
  );
};

export default FindDoctorSearch;