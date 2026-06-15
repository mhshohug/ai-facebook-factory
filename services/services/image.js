const gemini = require("./gemini");
const logger = require("./logger");

class ImageService {

    // ভিডিওর জন্য Scene Prompt তৈরি
    async generateScenes(script) {

        try {

            const prompt = `
তুমি একজন Professional Cinematic Director।

নিচের বাংলা স্ক্রিপ্ট থেকে
১০টি Scene তৈরি করো।

JSON format এ Return করবে।

Format:

[
 {
   "scene":1,
   "duration":6,
   "prompt":"Ultra realistic..."
 }
]

Script:

${script}

`;

            const result = await gemini.generate(prompt);

            if (!result.success) {
                return result;
            }

            return {
                success: true,
                scenes: result.text
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

module.exports = new ImageService();
