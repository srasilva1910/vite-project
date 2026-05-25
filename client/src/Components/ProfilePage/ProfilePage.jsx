import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MedicalReports from "./MedicalReports/MedicalReports";
import Appointments from "./Appointments/Appointments";

import "./ProfilePage.css";

const ProfilePage = () => {
  return (
    <section className="profile-page">

      {/* HERO */}
      <div className="profile-hero">

        <div className="profile-hero-left">
          <span className="profile-badge">
            Patient Dashboard
          </span>

          <h1>
            My 
            <span className="text-gradient">Profile</span>
          </h1>

          <p>
            Manage your personal information,
            appointments and medical reports
            in one place.
          </p>
        </div>

        <div className="profile-stats">

          <div className="stat-card">
            <h3>12</h3>
            <span>Appointments</span>
          </div>

          <div className="stat-card">
            <h3>3</h3>
            <span>Reports</span>
          </div>

        </div>

      </div>

      {/* CONTENT */}
      <div className="profile-grid">
        <ProfileInfo />
        <Appointments />
        <MedicalReports />
      </div>

    </section>
  );
};

export default ProfilePage;