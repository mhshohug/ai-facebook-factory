require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");

const scheduler = require("./services/scheduler");
const logger = require("./services/logger");

const indexRoute = require("./routes/index");
const healthRoute = require("./routes/health");
const apiRoute = require("./routes/api");

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.static("public"));

// Routes
app.use("/", indexRoute);
app.use("/health", healthRoute);
app.use("/api", apiRoute);

// 404
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    logger.info(`AI Facebook Factory Started on Port ${PORT}`);

    scheduler.start();

    console.log(`🚀 Server running on port ${PORT}`);

});
