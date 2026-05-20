import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MedicalReports from "./MedicalReports/MedicalReports";
import "./ProfilePage.css";

const ProfilePage = () => {
  return (
    <div className="profile-page">
      <h2>My Profile</h2>

      <div className="profile-grid">
        <ProfileInfo />
        <MedicalReports />
      </div>
    </div>
  );
};

export default ProfilePage;