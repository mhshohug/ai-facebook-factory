const express = require("express");
const router = express.Router();

const automation = require("../controllers/automationController");
const gemini = require("../services/gemini");
const imageGenerator = require("../services/imageGenerator");

// Root API
router.get("/", (req, res) => {
    res.json({
        success: true,
        message: "AI Facebook Factory API is running"
    });
});

// Health
router.get("/health", (req, res) => {
    res.json({
        success: true,
        status: "OK"
    });
});

// ===============================
// Full System Test
// ===============================
router.get("/test/all", async (req, res) => {

    const report = {
        success: true,
        environment: {},
        gemini: {},
        huggingface: {}
    };

    // ENV Check
    report.environment.GEMINI_API_KEY =
        !!process.env.GEMINI_API_KEY;

    report.environment.HUGGINGFACE_API_KEY =
        !!process.env.HUGGINGFACE_API_KEY;

    // Gemini Test
    try {

        const result =
            await gemini.generateScript("বাংলাদেশ");

        report.gemini = result;

    } catch (err) {

        report.success = false;

        report.gemini = {
            success: false,
            error: err.message
        };

    }

    // HuggingFace Test
    try {

        const result =
            await imageGenerator.generateImage(
                "A beautiful sunset over Bangladesh",
                0
            );

        report.huggingface = result;

    } catch (err) {

        report.success = false;

        report.huggingface = {
            success: false,
            error: err.message
        };

    }

    res.json(report);

});

// Generate Script
router.post(
    "/automation/script",
    automation.generateScript
);

// Run Automation
router.post(
    "/automation/run",
    automation.run
);

module.exports = router;
