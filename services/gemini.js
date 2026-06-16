const { GoogleGenerativeAI } = require("@google/generative-ai");
const logger = require("./logger");

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    throw new Error("GEMINI_API_KEY not found in .env");
}

const genAI = new GoogleGenerativeAI(apiKey);

// সবচেয়ে স্থিতিশীল ও পুরানো মডেল (যেটা বেশিরভাগ API Key এ কাজ করে)
const model = genAI.getGenerativeModel({
    model: "gemini-pro"
});

class GeminiService {

    async generateScript(topic) {
        try {
            const prompt = `
তুমি একজন পেশাদার বাংলা ভিডিও স্ক্রিপ্ট রাইটার।

বিষয়: ${topic}

নিয়ম:
- শুধুমাত্র বাংলা ভাষায় লিখবে।
- ১-২ মিনিটের ভিডিওর জন্য স্ক্রিপ্ট লিখবে।
- শুরুতে আকর্ষণীয় Hook থাকবে।
- শেষে Call To Action থাকবে।
- Markdown ব্যবহার করবে না।
`;

            const result = await model.generateContent(prompt);
            const text = result.response.text();

            return {
                success: true,
                text
            };

        } catch (err) {
            logger.error(err);
            return {
                success: false,
                error: err.message
            };
        }
    }

    async generate(prompt) {
        try {
            const result = await model.generateContent(prompt);
            const text = result.response.text();

            return {
                success: true,
                text
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

module.exports = new GeminiService();
