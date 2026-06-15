require("dotenv").config();

const { GoogleGenerativeAI } = require("@google/generative-ai");
const logger = require("./logger");

class GeminiService {

    constructor() {
        if (!process.env.GEMINI_API_KEY) {
            throw new Error("GEMINI_API_KEY not found in .env");
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

        this.model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash"
        });
    }

    async generateScript(topic) {

        try {

            const prompt = `
তুমি একজন Professional Facebook Video Script Writer।

বিষয়:
${topic}

নিয়ম:
- বাংলা ভাষায় লিখবে।
- ১-২ মিনিটের ভিডিওর জন্য হবে।
- আকর্ষণীয় শুরু থাকবে।
- পরিষ্কার ও সহজ ভাষা ব্যবহার করবে।
- শুধুমাত্র স্ক্রিপ্ট দেবে।
- কোনো Markdown বা Bullet Point ব্যবহার করবে না।
`;

            const result = await this.model.generateContent(prompt);

            const response = await result.response;

            const text = response.text();

            return {
                success: true,
                text
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

module.exports = new GeminiService();
