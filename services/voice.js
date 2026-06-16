const fs = require("fs");
const path = require("path");
const axios = require("axios");
const logger = require("./logger");

const API_KEY = process.env.HUGGINGFACE_API_KEY;

const MODEL = "microsoft/speecht5_tts";

class VoiceService {

    async generate(text) {

        try {

            if (!API_KEY) {
                return {
                    success: false,
                    error: "HUGGINGFACE_API_KEY not found"
                };
            }

            if (!text || text.trim() === "") {
                return {
                    success: false,
                    error: "Text is empty"
                };
            }

            logger.info("Generating AI Voice...");

            const response = await axios.post(
                `https://api-inference.huggingface.co/models/...}`,
                {
                    inputs: text
                },
                {
                    headers: {
                        Authorization: `Bearer ${API_KEY}`,
                        "Content-Type": "application/json",
                        Accept: "audio/wav"
                    },
                    responseType: "arraybuffer",
                    timeout: 300000
                }
            );

            const outputDir = path.join(
                __dirname,
                "..",
                "output",
                "voice"
            );

            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir, {
                    recursive: true
                });
            }

            const outputFile = path.join(
                outputDir,
                "voice.wav"
            );

            fs.writeFileSync(outputFile, response.data);

            logger.info("Voice generated successfully.");

            return {
                success: true,
                file: outputFile
            };

        } catch (err) {

            logger.error(err.response?.data || err.message);

            return {
                success: false,
                error: err.response?.data?.error || err.message
            };

        }

    }

}

module.exports = new VoiceService();
