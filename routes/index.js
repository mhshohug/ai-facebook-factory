const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        project: "AI Facebook Factory",
        version: "1.0.0",
        status: "Running 🚀",
        developer: "Mh Shohug",
        time: new Date().toISOString()
    });
});

module.exports = router;
