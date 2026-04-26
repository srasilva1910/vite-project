import React, { useState, useEffect } from "react";
import "./ProfileInfo.css"


const ProfileInfo = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
  });

  const [editing, setEditing] = useState(false);
 
  useEffect(() => {
  fetch("https://stayhealthy-dgz2.onrender.com/api/user/me", {
    headers: {
      "auth-token": sessionStorage.getItem("auth-token"),
    },
  })
    .then((res) => res.json())
.then((data) =>
  setUser((prev) => ({
    ...prev,
    ...(data.user || data),
  }))
);}, []);


  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };


  const handleSave = async () => {
  const res = await fetch("https://stayhealthy-dgz2.onrender.com/api/user/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "auth-token": sessionStorage.getItem("auth-token"),
    },
    body: JSON.stringify({
      name: user.name,
      phone: user.phone,
    }),
  });

  const data = await res.json();
  setUser(data);
  setEditing(false);
};

return (
  <div className="profile-card">
    <h3>👤 Personal Info</h3>

    <div className="profile-field">
      <label>Name</label>
      <input
        name="name"
        value={user.name}
        disabled={!editing}
        onChange={handleChange}
      />
    </div>

    <div className="profile-field">
      <label>Email</label>
      <input name="email" value={user.email} disabled />
    </div>

    <div className="profile-field">
      <label>Phone</label>
      <input
        name="phone"
        value={user.phone}
        disabled={!editing}
        onChange={handleChange}
      />
    </div>

    <div className="profile-field">
      <label>Role</label>
      <input name="role" value={user.role} disabled />
    </div>

    {!editing ? (
      <button className="profile-btn" onClick={() => setEditing(true)}>
        ✏️ Edit
      </button>
    ) : (
      <button className="profile-btn save" onClick={handleSave}>
        💾 Save
      </button>
    )}
  </div>
);
};

export default ProfileInfo;