const express = require("express");
const router = express.Router();

const automation = require("../controllers/automationController");

// Root API
router.get("/", (req, res) => {
    res.json({
        success: true,
        message: "AI Facebook Factory API is running"
    });
});

// Health Check
router.get("/health", (req, res) => {
    res.json({
        success: true,
        status: "OK"
    });
});

// Generate AI Script
router.post("/automation/script", automation.generateScript);

// Run Full Automation (Script + Image + Voice + Video)
router.post("/automation/run", automation.run);

module.exports = router;
