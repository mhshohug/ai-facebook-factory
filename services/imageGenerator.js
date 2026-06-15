const axios = require("axios");
const fs = require("fs");
const path = require("path");
const logger = require("./logger");

class ImageGenerator {

    constructor() {
        this.apiKey = process.env.HUGGINGFACE_API_KEY;

        // শুরুতে Stable Diffusion XL ব্যবহার করছি
        this.model =
            "stabilityai/stable-diffusion-xl-base-1.0";
    }

    async generate(prompt, fileName = "scene_01.png") {

        try {

            const response = await axios({
                url: `https://api-inference.huggingface.co/models/${this.model}`,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                    "Content-Type": "application/json"
                },
                data: {
                    inputs: prompt
                },
                responseType: "arraybuffer"
            });

            const outputDir = path.join(__dirname, "../output/images");

            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir, { recursive: true });
            }

            const output = path.join(outputDir, fileName);

            fs.writeFileSync(output, response.data);

            logger.info(`Image Saved: ${fileName}`);

            return {
                success: true,
                file: output
            };

        } catch (err) {

            logger.error(err.response?.data || err.message);

            return {
                success: false,
                error: err.message
            };

        }

    }

}

module.exports = new ImageGenerator();
