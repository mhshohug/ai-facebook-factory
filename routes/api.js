const express = require("express");
const router = express.Router();

const automation = require("../controllers/automationController");
const gemini = require("../services/gemini");
const imageGenerator = require("../services/imageGenerator");
const video = require("../services/video");

// ===============================
// Root API
// ===============================
router.get("/", (req, res) => {

    res.json({
        success: true,
        message: "AI Facebook Factory API is running"
    });

});

// ===============================
// Health Check
// ===============================
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

    report.environment.GEMINI_API_KEY =
        !!process.env.GEMINI_API_KEY;

    report.environment.HUGGINGFACE_API_KEY =
        !!process.env.HUGGINGFACE_API_KEY;

    try {

        const script =
            await gemini.generateScript("বাংলাদেশ");

        report.gemini = script;

    } catch (err) {

        report.success = false;

        report.gemini = {
            success: false,
            error: err.message
        };

    }

    try {

        const image =
            await imageGenerator.generateImage(
                "A beautiful sunset over Bangladesh",
                0
            );

        report.huggingface = image;

    } catch (err) {

        report.success = false;

        report.huggingface = {
            success: false,
            error: err.message
        };

    }

    res.json(report);

});

// ===============================
// Video Test
// ===============================
router.get("/test/video", async (req, res) => {

    try {

        const result =
            await video.createVideo("বাংলাদেশ");

        res.json(result);

    } catch (err) {

        res.status(500).json({

            success: false,

            error: err.message,

            stack: err.stack

        });

    }

});

// ===============================
// Generate Script
// ===============================
router.post(
    "/automation/script",
    automation.generateScript
);

// ===============================
// Run Full Automation
// ===============================
router.post(
    "/automation/run",
    automation.run
);

module.exports = router;
