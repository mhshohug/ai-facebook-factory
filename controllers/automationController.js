const video = require("../services/video");
const gemini = require("../services/gemini");
const facebook = require("../services/facebook");
const logger = require("../services/logger");

class AutomationController {

    async generateScript(req, res) {
        try {
            const topic = req.body.topic || "বাংলাদেশ";

            const result = await gemini.generateScript(topic);

            res.json(result);

        } catch (err) {

            logger.error(err);

            res.status(500).json({
                success: false,
                error: err.message
            });

        }
    }

    async run(req, res) {

        try {

            const topic = req.body.topic || "বাংলাদেশ";

            const result = await video.createVideo(topic);

            res.json(result);

        } catch (err) {

            logger.error(err);

            res.status(500).json({
                success: false,
                error: err.message
            });

        }

    }

}

module.exports = new AutomationController();
