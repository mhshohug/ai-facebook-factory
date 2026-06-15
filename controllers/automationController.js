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

    // ভবিষ্যতে এখানেই Video + Facebook Post হবে
    async run(req, res) {

        try {

            const topic = req.body.topic || "বাংলাদেশ";

            const result = await video.createVideo(topic);

            // ভবিষ্যতে চাইলে Facebook পোস্টও করা যাবে
            // await facebook.postVideo(result.videoPath);

            res.json({
                success: true,
                data: result
            });

        } catch (err) {

            logger.error(err.message);

            res.status(500).json({
                success: false,
                error: err.message
            });

        }

    }

}

module.exports = new AutomationController();
