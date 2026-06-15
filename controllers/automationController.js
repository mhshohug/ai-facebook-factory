const video = require("../services/video");
const gemini = require("../services/gemini");
const facebook = require("../services/facebook");
const logger = require("../services/logger");

class AutomationController {

    // শুধু AI Script Generate
    async generateScript(req, res) {

        try {

            const topic = req.body.topic || "বাংলাদেশের আজকের গুরুত্বপূর্ণ খবর";

            const result = await gemini.generateScript(topic);

            res.json(result);

        } catch (err) {

            logger.error(err.message);

            res.status(500).json({
                success: false,
                error: err.message
            });

        }

    }

    // টেস্ট Route
    async run(req, res) {

        res.json({
            success: true,
            message: "Automation route working",
            topic: req.body.topic || "No Topic"
        });

    }

}

module.exports = new AutomationController();
