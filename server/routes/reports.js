const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Report = require("../models/Report");
const path = require("path");
const fs = require("fs");

router.get("/", fetchuser, async (req, res) => {
  console.log("👉 GET /api/reports HIT");

  try {
    const reports = await Report.find({
      $or: [
        { user: req.user.id },
        { isGlobal: true }
      ]
    });

    console.log("📦 Reports encontrados:", reports);

    res.json(reports);

  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

router.get("/:id", fetchuser, async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).send("Report not found");
    }

    const filePath = path.join(__dirname, "..", report.filepath);

    if (!fs.existsSync(filePath)) {
      return res.status(404).send("File not found");
    }

    res.download(filePath, report.filename);

  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});


router.post("/create", fetchuser, async (req, res) => {
  const report = await Report.create({
    user: req.user.id, // 🔥 clave
    filename: "patient_report.pdf",
    filepath: "reports/patient_report.pdf",
  });

  res.json(report);
});

router.post("/seed", async (req, res) => {

  const reports = [
    {
      filename: "mock_report_cardiology.pdf",
      filepath: "reports/mock_report_cardiology.pdf",
      isGlobal: true,
    },
    {
      filename: "mock_report_dermatology.pdf",
      filepath: "reports/mock_report_dermatology.pdf",
      isGlobal: true,
    },
  ];

  await Report.insertMany(reports);

  res.json({
    success: true,
    reports,
  });
});

module.exports = router;