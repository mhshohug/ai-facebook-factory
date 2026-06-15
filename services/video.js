const voice = require("./voice");
const imageGenerator = require("./imageGenerator");
const subtitle = require("./subtitle");
const image = require("./image");
const logger = require("./logger");
const gemini = require("./gemini");

class VideoService {

    async createVideo(topic) {

        try {

            logger.info(`Creating video for: ${topic}`);

            // ১. স্ক্রিপ্ট তৈরি
            const script = await gemini.generateScript(topic);

            if (!script.success) 
            const scenes = await image.generateScenes(script.text);

if (!scenes.success) {
    return scenes;
}
            {
                return script;
            }

            const subtitleFile = await subtitle.generate(script.text);

if (!subtitleFile.success) {
    return subtitleFile;
}
            await imageGenerator.generate(
    "A cinematic view of Dhaka city at sunrise, ultra realistic, 8k",
    "scene_01.png"
);
const voiceFile = await voice.generate(script.text);

if (!voiceFile.success) {
    return voiceFile;
}
            // ৪. ভবিষ্যতে এখানে FFmpeg ভিডিও বানাবে

return {
    success: true,
    topic,
    script: script.text,
    scenes: scenes.scenes,
    subtitle: subtitleFile.file,
    voice: voiceFile.file,
    status: "VOICE_CREATED"
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
