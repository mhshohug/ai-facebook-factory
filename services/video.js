const logger = require("./logger");
const gemini = require("./gemini");

class VideoService {

    async createVideo(topic) {

        try {

            logger.info(`Creating video for: ${topic}`);

            // ১. স্ক্রিপ্ট তৈরি
            const script = await gemini.generateScript(topic);

            if (!script.success) {
                return script;
            }

            // ২. ভবিষ্যতে এখানে Scene Generator হবে

            // ৩. ভবিষ্যতে এখানে AI Image Generator হবে

            // ৪. ভবিষ্যতে এখানে FFmpeg ভিডিও বানাবে

            return {
                success: true,
                topic,
                script: script.text,
                status: "SCRIPT_CREATED"
            };

        } catch (err) {

            logger.error(err.message);

            return {
                success: false,
                error: err.message
            };

        }

    }

}

module.exports = new VideoService();
