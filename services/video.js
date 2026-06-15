const gemini = require("./gemini");
const image = require("./image");
const imageGenerator = require("./imageGenerator");
const subtitle = require("./subtitle");
const voice = require("./voice");
const ffmpeg = require("./ffmpeg");
const logger = require("./logger");

class VideoService {

    async createVideo(topic) {

        try {

            logger.info(`Creating AI Video: ${topic}`);

            // 1. Generate Script
            const script = await gemini.generateScript(topic);

            if (!script.success) {
                return script;
            }

            // 2. Generate Scenes
            const scenes = await image.generateScenes(script.text);

            if (!scenes.success) {
                return scenes;
            }

            // 3. Generate Images
            const images = await imageGenerator.generateAll(
                scenes.scenes
            );

            if (!images.success) {
                return images;
            }

            // 4. Generate Subtitle
            const subtitleFile = await subtitle.generate(
                script.text
            );

            if (!subtitleFile.success) {
                return subtitleFile;
            }

            // 5. Generate Voice
            const voiceFile = await voice.generate(
                script.text
            );

            if (!voiceFile.success) {
                return voiceFile;
            }

            // 6. Render Final Video
            //const video = await ffmpeg.render(
               // images.files,
               // voiceFile.file,
               // subtitleFile.file
          //  );

           // if (!video.success) {
              //  return video;
  // }

            logger.info("AI Video Created Successfully");

            return {

                success: true,

                topic,

                script: script.text,

                scenes: scenes.scenes,

                images: images.files,

                subtitle: subtitleFile.file,

                voice: voiceFile.file,

            

                status: "ASSETS_CREATED"

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
