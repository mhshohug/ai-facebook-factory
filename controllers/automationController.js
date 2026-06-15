const video = require("../services/video");
const gemini = require("../services/gemini");
const facebook = require("../services/facebook");
const logger = require("../services/logger");

class AutomationController {

    // AI Script Generate
    async generateScript(req, res) {

        try {

            const topic =
                req.body.topic ||
                "বাংলাদেশের আজকের গুরুত্বপূর্ণ খবর";

            const result = await gemini.generateScript(topic);

            return res.json(result);

        } catch (err) {

            logger.error(err);

            return res.status(500).json({
                success: false,
                error: err.message
            });

        }

    }

    // Full Automation
    async run(req, res) {

        try {

            const topic =
                req.body.topic ||
                "বাংলাদেশ";

            logger.info(`Automation Started: ${topic}`);

            const result =
                await video.createVideo(topic);

            if (!result.success) {

                return res.status(500).json(result);

            }

            // ভবিষ্যতে Facebook Upload
            /*
            if(result.video){
                await facebook.postVideo(result.video);
            }
            */

            return res.json({
                success: true,
                message: "Automation completed successfully",
                data: result
            });

        } catch (err) {

            logger.error(err);

            return res.status(500).json({
                success: false,
                error: err.message
            });

        }

    }

}

module.exports = new AutomationController();
