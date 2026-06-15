const logger = require("./logger");

class VoiceService {

    async generate(script) {

        try {

            logger.info("Voice Generation Started");

            // পরে এখানে Edge TTS বা Google TTS লাগাব

            return {
                success: true,
                file: "output/voice.mp3",
                message: "Voice placeholder created"
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

module.exports = new VoiceService();
