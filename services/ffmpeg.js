const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs-extra");
const path = require("path");
const logger = require("./logger");

class FFmpegService {

    async render(images, voice, subtitle) {

        try {

            if (!Array.isArray(images) || images.length === 0) {
                return {
                    success: false,
                    error: "No images found"
                };
            }

            if (!await fs.pathExists(voice)) {
                return {
                    success: false,
                    error: "Voice file not found"
                };
            }

            const outputDir = path.join(
                __dirname,
                "..",
                "output",
                "video"
            );

            await fs.ensureDir(outputDir);

            const videoFile = path.join(
                outputDir,
                "final.mp4"
            );

            const listFile = path.join(
                outputDir,
                "images.txt"
            );

            let content = "";

            images.forEach(file => {

                content += `file '${path.resolve(file)}'\n`;
                content += "duration 5\n";

            });

            content += `file '${path.resolve(images[images.length - 1])}'`;

            await fs.writeFile(listFile, content);

            return new Promise((resolve) => {

                ffmpeg()

                    .input(listFile)
                    .inputOptions([
                        "-f concat",
                        "-safe 0"
                    ])

                    .input(voice)

                    .videoCodec("libx264")
                    .audioCodec("aac")

                    .outputOptions([
                        "-pix_fmt yuv420p",
                        "-shortest"
                    ])

                    .output(videoFile)

                    .on("end", () => {

                        logger.info("Video Render Complete");

                        resolve({

                            success: true,

                            file: videoFile

                        });

                    })

                    .on("error", (err) => {

                        logger.error(err);

                        resolve({

                            success: false,

                            error: err.message

                        });

                    })

                    .run();

            });

        } catch (err) {

            logger.error(err);

            return {

                success: false,

                error: err.message

            };

        }

    }

}

module.exports = new FFmpegService();
