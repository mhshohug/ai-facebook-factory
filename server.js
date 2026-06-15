const logger = require("./services/logger");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// Home Route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        project: "AI Facebook Factory",
        version: "1.0.0",
        status: "Running 🚀",
        developer: "Mh Shohug"
    });
});

// Health Check
app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        uptime: process.uptime(),
        timestamp: new Date(),
        environment: process.env.NODE_ENV || "development"
    });
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 AI Facebook Factory running on port ${PORT}`);
});
const healthRoute = require("./routes/health");

app.use("/health", healthRoute);

const apiRoute = require("./routes/api");
app.use("/api", apiRoute);
const logger = require("./services/logger");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    logger.info(`AI Facebook Factory Started on Port ${PORT}`);
    console.log(`🚀 AI Facebook Factory running on port ${PORT}`);
});
