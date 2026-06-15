const facebook = require("../services/facebook");
const express = require("express");

const router = express.Router();

// API Status
router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "AI Facebook Factory API is working",
        version: "1.0.0",
        endpoints: [
            "/health",
            "/api",
            "/api/status",
            "/api/test"
        ]
    });
});

// API Status
router.get("/status", (req, res) => {
    res.status(200).json({
        success: true,
        status: "ONLINE",
        serverTime: new Date().toISOString()
    });
});

// API Test
router.get("/test", (req, res) => {
    res.status(200).json({
        success: true,
        message: "API Test Successful ✅"
    });
});

module.exports = router;
router.get("/facebook/health", async (req, res) => {

    const result = await facebook.health();

    res.json(result);

});
router.get("/facebook/post", async (req, res) => {

    const result = await facebook.postText(
        "🤖 AI Facebook Factory Test Post"
    );

    res.json(result);

});
