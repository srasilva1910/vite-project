import React, { useEffect, useState } from "react";
import "./MedicalReports.css";

const MedicalReports = () => {
  const [reports, setReports] = useState([]);
  console.log("TOKEN:", sessionStorage.getItem("auth-token"));

useEffect(() => {
  fetch("https://stayhealthy-dgz2.onrender.com/api/reports", {
    headers: {
      "auth-token": sessionStorage.getItem("auth-token"),
    },
  })
    .then((res) => {
      console.log("STATUS:", res.status);
      return res.json();
    })
    .then((data) => {
      console.log("DATA:", data);
      setReports(data);
    });
}, []);

  const handleDownload = async (id) => {
  try {
    const res = await fetch(`https://stayhealthy-dgz2.onrender.com/api/reports/${id}`, {
      headers: {
        "auth-token": sessionStorage.getItem("auth-token"),
      },
    });

    if (!res.ok) {
      throw new Error("Error downloading file");
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "report.pdf"; // puedes hacerlo dinámico si quieres
    document.body.appendChild(a);
    a.click();
    a.remove();

    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error(err);
  }
};

  return (
      <div className="reports-card">
        <h3>📄 Medical Reports</h3>

        {reports.length === 0 ? (
          <p className="no-reports">No reports available</p>
        ) : (
          reports.map((r) => (
<div key={r._id} className="report-item">
  <div className="report-left">
    <span className="file-icon">📄</span>
    <span className="file-name">
      {r.filename || "Report"}
    </span>

  <button
    className="download-btn"
    onClick={() => handleDownload(r._id, r.filename)}
  >
    Download
  </button>
    </div>

</div>          ))
        )}
      </div>
  );
};

export default MedicalReports;