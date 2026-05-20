import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing_Page from './Components/Landing_Page/Landing_page';
import Login from './Components/login/login';
import Signup from './Components/signup/signup';
import InstantConsultation from './Components/InstantConsultationBooking/InstantConsultation';
import Setauthtoken from './Setauthtoken';
import FindDoctorSearch from './Components/FindDoctorSearch/FindDoctorSearch';
import Notification from './Components/Notifications/Notification';
import ReviewsPage from './Components/Review/Review';
import AddReviewPage from './Components/Review/AddReview';
import MedicalReports from './Components/ProfilePage/MedicalReports/MedicalReports';
import ProfilePage from './Components/ProfilePage/ProfilePage';


function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Notification>
          <Routes>
            <Route path="/" element={<Landing_Page />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/instant-consultation" element={<InstantConsultation />} />
            <Route path="/find-doctor" element={<FindDoctorSearch />} />
            <Route path="/reviewspage" element={<ReviewsPage />} />
            <Route path="/add-review" element={<AddReviewPage />} />
            <Route path="/setauthtoken/:authtoken" element={<Setauthtoken />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/reports" element={<MedicalReports />} />
          </Routes>                 
           </Notification>

        </BrowserRouter>
    </div>
  );
}

export default App;
