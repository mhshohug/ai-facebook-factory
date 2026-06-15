const fs = require("fs");
const path = require("path");
const axios = require("axios");
const logger = require("./logger");

const API_KEY = process.env.HUGGINGFACE_API_KEY;
const MODEL =
    "stabilityai/stable-diffusion-xl-base-1.0";

class ImageGenerator {

    async generateImage(prompt, index) {

        try {

            const response = await axios.post(
                `https://api-inference.huggingface.co/models/${MODEL}`,
                {
                    inputs: prompt
                },
                {
                    responseType: "arraybuffer",
                    headers: {
                        Authorization: `Bearer ${API_KEY}`,
                        Accept: "image/png",
                        "Content-Type": "application/json"
                    },
                    timeout: 180000
                }
            );

            const outputDir = path.join(
                __dirname,
                "..",
                "output",
                "images"
            );

            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir, {
                    recursive: true
                });
            }

            const fileName = `scene_${index + 1}.png`;

            const filePath = path.join(
                outputDir,
                fileName
            );

            fs.writeFileSync(filePath, response.data);

            return {
                success: true,
                file: filePath
            };

        } catch (err) {

            logger.error(err.response?.data || err.message);

            return {
                success: false,
                error: err.message
            };

        }

    }

    async generateAll(scenes) {

        try {

            const files = [];

            for (let i = 0; i < scenes.length; i++) {

                logger.info(
                    `Generating Image ${i + 1}/${scenes.length}`
                );

                const image = await this.generateImage(
                    scenes[i].prompt,
                    i
                );

                if (!image.success) {
                    return image;
                }

                files.push(image.file);

            }

            return {
                success: true,
                files
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

module.exports = new ImageGenerator();
