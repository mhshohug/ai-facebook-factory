const { exec } = require("child_process");
const path = require("path");
const logger = require("./logger");

class FFmpegService {

    async createVideo(imagesPath, audioPath, subtitlePath, outputName = "video.mp4") {

        return new Promise((resolve) => {

            const output = path.join(__dirname, "../output", outputName);

            const command = `
ffmpeg \
-r 1/5 \
-i ${imagesPath}/scene_%02d.png \
-i ${audioPath} \
-vf subtitles=${subtitlePath} \
-c:v libx264 \
-pix_fmt yuv420p \
-c:a aac \
-shortest \
${output}
`;

            exec(command, (error) => {

                if (error) {

                    logger.error(error.message);

                    return resolve({
                        success: false,
                        error: error.message
                    });

                }

                logger.info("Video Created Successfully");

                resolve({
                    success: true,
                    file: output
                });

            });

        });

    }

}

module.exports = new FFmpegService();
