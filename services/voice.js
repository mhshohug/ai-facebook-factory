const { ElevenLabsClient } = require("@elevenlabs/elevenlabs-js");
const fs = require("fs-extra");
const path = require("path");
const logger = require("./logger");

const client = new ElevenLabsClient({
    apiKey: process.env.ELEVENLABS_API_KEY
});

const VOICE_ID = "XrLABIfXO4hqnpiG2b6E";

class VoiceService {

    async generate(text) {

        try {

            if (!process.env.ELEVENLABS_API_KEY) {

                return {
                    success: false,
                    error: "ELEVENLABS_API_KEY not found"
                };

            }

            logger.info("Generating Voice...");

            const audio = await client.textToSpeech.convert(
                VOICE_ID,
                {
                    text,
                    modelId: "eleven_multilingual_v2",
                    outputFormat: "mp3_44100_128"
                }
            );

            const outputDir = path.join(
                __dirname,
                "..",
                "output",
                "voice"
            );

            await fs.ensureDir(outputDir);

            const filePath = path.join(
                outputDir,
                "voice.mp3"
            );

            const chunks = [];

            for await (const chunk of audio) {
                chunks.push(Buffer.from(chunk));
            }

            await fs.writeFile(
                filePath,
                Buffer.concat(chunks)
            );

            logger.info("Voice Generated");

            return {
                success: true,
                file: filePath
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

module.exports = new VoiceService();
