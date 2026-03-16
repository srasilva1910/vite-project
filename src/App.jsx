import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from './Components/Navbar/Navbar';
import Landing_Page from './Components/Landing_Page/Landing_page';
import Login from './Components/login/login';
import Signup from './Components/signup/signup';
import Setauthtoken from './Setauthtoken';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Landing_Page />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/setauthtoken/:authtoken" element={<Setauthtoken />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
