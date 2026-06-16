require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const scheduler = require("./services/scheduler");
const logger = require("./services/logger");

const indexRoute = require("./routes/index");
const healthRoute = require("./routes/health");
const apiRoute = require("./routes/api");

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static Files
app.use(express.static("public"));

// Routes
app.use("/api", apiRoute);
app.use("/health", healthRoute);
app.use("/", indexRoute);

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

// Start Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    logger.info(`🚀 AI Facebook Factory Started on Port ${PORT}`);

    scheduler.start();

    console.log(`🚀 Server running on port ${PORT}`);

});
