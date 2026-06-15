const axios = require("axios");
const fs = require("fs");
const path = require("path");
const logger = require("./logger");

class ImageGenerator {

    constructor() {
        this.apiKey = process.env.HUGGINGFACE_API_KEY;
        this.model = "stabilityai/stable-diffusion-xl-base-1.0";
    }

    async generate(prompt, fileName) {

        try {

            const response = await axios({

                method: "POST",

                url: `https://api-inference.huggingface.co/models/${this.model}`,

                headers: {
                    Authorization: `Bearer ${this.apiKey}`
                },

                data: {
                    inputs: prompt
                },

                responseType: "arraybuffer"

            });

            const dir = path.join(__dirname, "../output/images");

            if (!fs.existsSync(dir))
                fs.mkdirSync(dir, { recursive: true });

            const output = path.join(dir, fileName);

            fs.writeFileSync(output, response.data);

            logger.info(`${fileName} Created`);

            return output;

        } catch (err) {

            logger.error(err.message);

            return null;

        }

    }

    async generateAll(sceneText) {

        try {

            let scenes;

            if (typeof sceneText === "string") {

                scenes = JSON.parse(sceneText);

            } else {

                scenes = sceneText;

            }

            let files = [];

            for (let i = 0; i < scenes.length; i++) {

                const file = await this.generate(

                    scenes[i].prompt,

                    `scene_${String(i + 1).padStart(2, "0")}.png`

                );

                files.push(file);

            }

            return {

                success: true,

                files

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

module.exports = new ImageGenerator();
