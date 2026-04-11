import React, { useEffect, useState } from 'react';
import './FindDoctorSearch.css';
import { useSearchParams } from 'react-router-dom';
import FindDoctorSearchIC from './FindDoctorSearchIC/FindDoctorSearchIC';
import DoctorCardIC from './DoctorCardIC/DoctorCardIC';

const FindDoctorSearch = () => {
  const [searchParams] = useSearchParams();

  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [isSearched, setIsSearched] = useState(false);

  useEffect(() => {
    fetch('https://api.npoint.io/9a5543d36f1460da2f63')
      .then(res => res.json())
      .then(data => {
        setDoctors(data);

        const speciality = searchParams.get('speciality');

        if (speciality) {
          const filtered = data.filter(
            doctor =>
            doctor.speciality.toLowerCase().includes(speciality.toLowerCase())          );

          setFilteredDoctors(filtered);
          setIsSearched(true);
        } else {
          setIsSearched(false);
          setFilteredDoctors([]);
        }
      })
      .catch(err => console.log(err));
  }, [searchParams]);

  // ✅ Mostrar siempre algo
  const list = isSearched ? filteredDoctors : doctors;

  return (
      <div className="searchpage-container">
        <FindDoctorSearchIC />

        <div className="search-results-container">
          {list.length > 0 ? (
            <>
              <h2>{list.length} doctors available</h2>

              {list.map((doctor) => (
                <DoctorCardIC {...doctor} key={doctor.name} />
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