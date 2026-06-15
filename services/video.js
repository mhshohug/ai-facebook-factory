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

            if (!script.success) {
                return script;
            }

            // ২. সিন তৈরি
            const scenes = await image.generateScenes(script.text);

            if (!scenes.success) {
                return scenes;
            }

            // ৩. সাবটাইটেল তৈরি
            const subtitleFile = await subtitle.generate(script.text);

            if (!subtitleFile.success) {
                return subtitleFile;
            }

            // ৪. ইমেজ তৈরি
            const images = await imageGenerator.generateAll(scenes.scenes);

            if (!images.success) {
                return images;
            }

            // ৫. ভয়েস তৈরি
            const voiceFile = await voice.generate(script.text);

            if (!voiceFile.success) {
                return voiceFile;
            }

            // ৬. রেজাল্ট
            return {
                success: true,
                topic,
                script: script.text,
                scenes: scenes.scenes,
                images: images.files,
                subtitle: subtitleFile.file,
                voice: voiceFile.file,
                status: "IMAGES_CREATED"
            };

        } catch (err) {

            logger.error(err);

            return {
                success: false,
                error: err.message
            };

        }

    }

}

module.exports = new VideoService();
