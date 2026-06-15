const gemini = require("./gemini");
const logger = require("./logger");

class ImageService {

    async generateScenes(script) {

        try {

            const prompt = `
তুমি একজন ভিডিও সিন ডিজাইনার।

নিচের বাংলা স্ক্রিপ্ট থেকে ৫টি Scene তৈরি করো।

শুধুমাত্র JSON Array দেবে।

Format:

[
  {
    "id":1,
    "title":"Scene 1",
    "prompt":"Ultra realistic ..."
  }
]

Script:
${script}
`;

            const result = await gemini.generate(prompt);

            if (!result.success) {
                return result;
            }

            let text = result.text.trim();

            // Remove markdown if Gemini returns ```json
            text = text
                .replace(/```json/g, "")
                .replace(/```/g, "")
                .trim();

            let scenes;

            try {
                scenes = JSON.parse(text);
            } catch (err) {

                logger.error("Scene JSON Parse Error");

                return {
                    success: false,
                    error: "Gemini returned invalid JSON",
                    raw: text
                };
            }

            return {
                success: true,
                scenes
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

module.exports = new ImageService();
