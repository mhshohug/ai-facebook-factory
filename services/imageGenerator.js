const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const logger = require("./logger");

const API_KEY = process.env.HUGGINGFACE_API_KEY;

const MODEL = "black-forest-labs/FLUX.1-schnell";   // ← ভালো ও ফাস্ট মডেল

class ImageGenerator {

    constructor() {
        this.outputDir = path.join(__dirname, "..", "output", "images");
        fs.ensureDirSync(this.outputDir);
    }

    async generateImage(prompt, index) {
        try {
            logger.info(`Generating Image ${index + 1} with FLUX`);

            const response = await axios.post(
                `https://router.huggingface.co/hf-inference/models/${MODEL}`,
                {
                    inputs: prompt,
                    parameters: {
                        num_inference_steps: 15,
                        guidance_scale: 7.5,
                        width: 512,
                        height: 512
                    }
                },
                {
                    headers: {
                        Authorization: `Bearer ${API_KEY}`,
                        "Content-Type": "application/json",
                        Accept: "image/png"
                    },
                    responseType: "arraybuffer",
                    timeout: 45000   // 45 সেকেন্ড
                }
            );

            const fileName = `scene_${index + 1}.png`;
            const filePath = path.join(this.outputDir, fileName);

            await fs.writeFile(filePath, response.data);

            logger.info(`✅ Saved ${fileName}`);
            
            return {
                success: true,
                file: filePath
            };

        } catch (err) {
            logger.error(err.response?.data || err.message);
            return {
                success: false,
                error: err.response?.data?.error || err.message
            };
        }
    }

    async generateAll(scenes) {
        try {
            if (!Array.isArray(scenes)) {
                return {
                    success: false,
                    error: "Scenes must be an array"
                };
            }

            const files = [];

            for (let i = 0; i < scenes.length; i++) {
                const prompt = scenes[i].prompt || scenes[i].description || scenes[i];
                
                const image = await this.generateImage(prompt, i);
                
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
