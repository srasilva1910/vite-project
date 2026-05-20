import React, { useEffect, useState } from "react";
import "./InstantConsultation.css";
import { useSearchParams } from "react-router-dom";
import FindDoctorSearchIC from "./FindDoctorSearchIC/FindDoctorSearchIC";
import DoctorCardIC from "./DoctorCardIC/DoctorCardIC";

const InstantConsultation = () => {
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
    <div className="consultation-page">

      <section className="consultation-hero">

        <span className="consultation-badge">
          Instant Healthcare Access
        </span>

        <h1>
          Find a doctor and <span>consult instantly</span>
        </h1>

        <p>
          Connect with trusted healthcare professionals anytime,
          anywhere.
        </p>

        <FindDoctorSearchIC />

      </section>

      <section className="consultation-stats">

        <div className="stat-box">
          <h2>{filteredDoctors.length}+</h2>
          <p>Doctors Available</p>
        </div>

        <div className="stat-box">
          <h2>24/7</h2>
          <p>Online Consultation</p>
        </div>

        <div className="stat-box">
          <h2>98%</h2>
          <p>Patient Satisfaction</p>
        </div>

      </section>

      <section className="doctors-section">

        <div className="section-header">
          <h2>Available Doctors</h2>
          <p>
            Choose from experienced specialists.
          </p>
        </div>

        <div className="search-results-container">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <DoctorCardIC {...doctor} key={doctor.name} />
            ))
          ) : (
            <p>No doctors found.</p>
          )}
        </div>

      </section>
    </div>
  );
};

export default InstantConsultation;