import React, { useEffect, useState } from "react";
import "./FindDoctorSearch.css";
import { useSearchParams } from "react-router-dom";
import FindDoctorSearchBA from "./FindDoctorSearchBA/FindDoctorSearchBA";
import DoctorCardBA from "./DoctorCardBA/DoctorCardBA";

const FindDoctorSearch = () => {
  const [searchParams] = useSearchParams();

  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  useEffect(() => {
    fetch("https://api.npoint.io/9a5543d36f1460da2f63")
      .then((res) => res.json())
      .then((data) => setDoctors(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const speciality = searchParams.get("speciality");

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
    <div className="appointments-page">

      <section className="appointments-hero">

        <span className="appointments-badge">
          Healthcare Appointments
        </span>

        <h1>
          Find a doctor and <span>book instantly</span>
        </h1>

        <p>
          Schedule appointments with trusted healthcare
          professionals near you.
        </p>

        <FindDoctorSearchBA />

      </section>

      <section className="appointments-stats">

        <div className="stat-card">
          <h2>{filteredDoctors.length}+</h2>
          <p>Doctors Available</p>
        </div>

        <div className="stat-card">
          <h2>24/7</h2>
          <p>Booking Support</p>
        </div>

        <div className="stat-card">
          <h2>10k+</h2>
          <p>Appointments Completed</p>
        </div>

      </section>

      <section className="doctors-section">

        <div className="section-header">
          <h2>Available Doctors</h2>
          <p>
            Browse specialists and schedule appointments easily.
          </p>
        </div>

        <div className="search-results-container">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <DoctorCardBA {...doctor} key={doctor.name} />
            ))
          ) : (
            <p>No doctors found.</p>
          )}
        </div>

      </section>

    </div>
  );
};

export default FindDoctorSearch;